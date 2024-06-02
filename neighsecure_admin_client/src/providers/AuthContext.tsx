import React, { useState, useEffect } from "react";
// import { toast } from "react-toastify";
// import { useConfigContext } from "./ConfigContext";
import axios, { AxiosError } from "axios";
import { TokenResponse, useGoogleLogin } from "@react-oauth/google";

const TOKEN_KEY = "neigh_secure_token";
const AuthContext = React.createContext({} as AuthContextProviderProps);

export interface User {
  id: string;
  username: string;
  email: string;
  access_token: string;
}

export interface AuthContextProviderProps {
  token: string | null;
  user: User | TokenResponse | null;
  login: () => Promise<void>;
  logout: () => void;
  register: (
    username: string,
    email: string,
    password: string
  ) => Promise<void>;
}

export const AuthContextProvider = (props: any) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | TokenResponse | null>(null);

  useEffect(() => {
    const _token = getTokenLS();

    if (_token) {
      setToken(_token);
    }
  }, []);

  // useEffect(() => {
  //   fetchUserInfo();
  // }, [token]);

  // const fetchUserInfo = async () => {
  //   if (!token) {
  //     return;
  //   }

  //   axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  //   try {
  //     const { data } = await axios.get<User>("/auth/whoami");
  //     setUser(data);
  //   } catch (error) {
  //     logout();
  //   }
  // };

  const login = async () => {
    try {
      console.log("Login..");

      useGoogleLogin({
        onSuccess: (response: TokenResponse) => {
          console.log("Login Success:", response);
          // setUser(response);
        },
        onError: (
          errorResponse: Pick<
            TokenResponse,
            "error" | "error_description" | "error_uri"
          >
        ) =>
          console.log(
            "Login Failed:",
            errorResponse.error,
            errorResponse.error_description
          ),
      });
      
      // const response = await axios.get(
      //   `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user?.access_token}`,
      //   {
      //     headers: {
      //       Authorization: `Bearer ${user?.access_token}`,
      //       Accept: "application/json",
      //     },
      //   }
      // );
      //
      // setUser(response.data);

      // How to involve Spring Boot backend:

      // Authorization Code Flow:  Instead of directly fetching user info from Google's API, use the Authorization Code Flow. This flow involves:

      // User clicking the Google login button.
      // Redirecting the user to Google's login page.
      // After successful login, Google redirects back to your application with an authorization code.
      // Your React application sends this code to your Spring Boot backend for token exchange.
      // Spring Security Configuration: Configure Spring Security in your Spring Boot application to handle OAuth:

      // Add spring-boot-starter-security and spring-boot-starter-oauth2-client dependencies.
      // Configure a bean for OAuth2ClientProperties with your Google Client ID and Secret obtained from the Google Cloud Console.
      // Token Endpoint: Create a Spring Boot endpoint to receive the authorization code and exchange it for access and refresh tokens using the Google OAuth library.

      // User Information: In the same endpoint, after successful token exchange, fetch user information from Google's API using the access token.

      // Token Validation: Spring Security can be configured to validate JWT tokens issued by your backend on subsequent requests.

      // const _token = response.data.token;
      // setToken(_token);
      // setTokenLS(_token);
    } catch (error) {
      const axiosError = error as AxiosError;
      const { status } = axiosError.response || { status: 500 };
      const msgs = {
        "404": "User not found",
        "401": "Unauthorized",
        "500": "Unexpected error",
      };

      logout();
    }
  };

  const logout = () => {
    removeTokenLS();
    setToken(null);
    setUser(null);
    window.location.href = "https://localhost:5173/";
  };

  const register = async (
    username: string,
    email: string,
    password: string
  ) => {
    try {
      await axios.post("/auth/signup", { username, email, password });
    } catch (error) {
      const axiosError = error as AxiosError;
      const { status } = axiosError.response || { status: 500 };
      const msgs = {
        "400": "Wrong Fields",
        "409": "User already exists",
        "500": "Unexpected error",
      };
    }
  };

  const state: AuthContextProviderProps = {
    token,
    user,
    login,
    logout,
    register,
  };

  return <AuthContext.Provider value={state} {...props} />;
};

export const useAuthContext = () => {
  const context = React.useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useUserContext must be call inside of a UserContextProvider component"
    );
  }

  return context;
};

const setTokenLS = (token: string) => localStorage.setItem(TOKEN_KEY, token);
const getTokenLS = () => localStorage.getItem(TOKEN_KEY);
const removeTokenLS = () => localStorage.removeItem(TOKEN_KEY);
