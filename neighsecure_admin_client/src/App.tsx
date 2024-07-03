import './App.css'
import { Outlet } from "react-router-dom";
import {AuthContextProvider} from "@/providers/AuthContext.tsx";

function App() {
  return (
      <AuthContextProvider>
        <Outlet />
      </AuthContextProvider>
  )
}

export default App
