import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { GoogleOAuthProvider } from "@react-oauth/google";
import './index.css'
import { AuthContextProvider } from './providers/AuthContext.tsx';
import { Toaster } from './components/ui/toaster.tsx';

ReactDOM.createRoot(document.getElementById("root")!).render(
  <GoogleOAuthProvider clientId="266523106449-pojfcjr5r4gtmlontuhfuc3ram9a54l7.apps.googleusercontent.com">
    <AuthContextProvider>
      <React.StrictMode>
        <App />
        <Toaster />
      </React.StrictMode>
    </AuthContextProvider>
  </GoogleOAuthProvider>
);
