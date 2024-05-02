import './App.css'
import LoginView from "@/views/LoginView.tsx";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import PrivateRoute from "@/routes/PrivateRoute.tsx";
import PublicRoute from "@/routes/PublicRoute.tsx";
import {PRIVATE} from "@/routes/Paths.tsx";
import DashboardView from "@/views/DashboardView.tsx";

const router = createBrowserRouter([
    {
        path: PRIVATE,
        element: <PrivateRoute />,
        children: [
            {
                index: true,
                element: <DashboardView/>
            }
        ]
    },
    {
        path: '/',
        element: <PublicRoute />,
        children: [
            {
                index: true,
                element:<LoginView/>
            }
        ]
    }
]);

function App() {
  return (
      <RouterProvider router={router} />
  )
}

export default App
