import { useAuthContext } from "@/providers/AuthContext";
import LoginImage from "../assets/loginImage.svg";
import NeighLogo from "../assets/NeighLogo.svg";
import { Button } from "@/components/ui/button.tsx";

import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import {TokenResponse, useGoogleLogin} from "@react-oauth/google";
import axios from "axios";


export default function LoginView() {

  const { login } = useAuthContext();
  const navigate = useNavigate();

  const handleLogin = useGoogleLogin({
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
        console.log(payload);
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

  return (
    <>
      <section
        className={"flex flex-row  gap-16 h-dvh justify-center items-center"}
      >
        <div className={"relative w-1/2"}>
          <img
            src={LoginImage}
            alt={"Login Image"}
            className={"h-dvh w-full object-cover object-center"}
          />
          <div
            className={
              "absolute flex flex-col justify-center items-center gap-4 text-2xl text-white -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
            }
          >
            <img src={NeighLogo} alt={"Logo"} />
            <p>{"Neigh Secure"}</p>
          </div>
        </div>
        <div className={"flex flex-col gap-8 items-start w-1/2"}>
          <h1 className={"text-2xl"}>{"Bienvenido"}/a</h1>
          <p className={"text-secondaryText text-xl font-light w-1/2"}>
            {
              "Modulo de administración de NeighSecure, por favor inicia sesión."
            }
          </p>
          <Button onClick={() => handleLogin()} size={"lg"}>
            <FcGoogle className={"h-[32px] w-[32px] mr-4"} />
            {"Continuar con Google"}
          </Button>
        </div>
      </section>
    </>
  );
}

