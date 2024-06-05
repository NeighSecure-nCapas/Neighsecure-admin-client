import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { GoogleOAuthProvider } from "@react-oauth/google";
import './index.css'
import { AuthContextProvider } from './providers/AuthContext.tsx';
import { Toaster } from "@/components/ui/sonner"
import axios from "axios";

axios.defaults.baseURL = import.meta.env.VITE_APIENDPOINT || "http://localhost:8080/neighSecure";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <GoogleOAuthProvider clientId={"266523106449-pojfcjr5r4gtmlontuhfuc3ram9a54l7.apps.googleusercontent.com"}>
    <AuthContextProvider>
      <React.StrictMode>
        <App />
        <Toaster richColors closeButton />
      </React.StrictMode>
    </AuthContextProvider>
  </GoogleOAuthProvider>
);
