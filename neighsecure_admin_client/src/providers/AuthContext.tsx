import React, { useState, useEffect } from "react";
// import { useConfigContext } from "./ConfigContext";
import axios from "axios";
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
  login: () => void;
  logout: () => void;
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


  const login = useGoogleLogin({
    // onSuccess: async (response: TokenResponse) => {
    //   console.log("User redirecting:", response);
    //   // setUser(response);
    //
    //   const paylaod = await axios.get(
    //       `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${response?.access_token}`,
    //       {
    //         headers: {
    //           Authorization: `Bearer ${response?.access_token}`,
    //           Accept: "application/json",
    //         },
    //       }
    //   );
    //
    //   console.log('Fetching user data...');
    //   console.log(paylaod);
    // },
    onSuccess: async (codeResponse) => {
      console.log('Getting access authorization code..', codeResponse);

      const payload = await axios.get(
          '/auth/google/redirect',
          {
            params: {
              code: codeResponse.code
            }
          }
      )

      if (payload) {
        const _token = payload.data.token;
        setToken(_token);
        setTokenLS(_token);
      }
    },
    flow: "auth-code",
    scope: "profile email",
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

  const logout = () => {
    removeTokenLS();
    setToken(null);
    setUser(null);
    window.location.href = "https://localhost:5173/";
  };

  const state: AuthContextProviderProps = {
    token,
    user,
    login,
    logout,
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
