import './App.css'
import LoginView from "@/views/LoginView.tsx";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import PrivateRoute from "@/routes/PrivateRoute.tsx";
import PublicRoute from "@/routes/PublicRoute.tsx";
import {PRIVATE} from "@/routes/Paths.tsx";
import DashboardView from "@/views/DashboardView.tsx";
import HomesView from './views/Home/HomesView';
import ResidentsView from './views/Residentes/ResidentsView';
import VisitorViews from './views/Visitors/VisitorsView';
import EntriesView from './views/Entries/EntriesView';
import AddNewHome from './views/Home/AddNewHome';

const router = createBrowserRouter([
  {
    path: PRIVATE,
    element: <PrivateRoute />,
    children: [
      {
        index: true,
        element: <DashboardView />,
      },
      {
        path: "hogares",
        element: <HomesView />,
      },
      {
        path: "hogares/agregar",
        element: <AddNewHome />,
      },
      {
        path: "hogares/:id",
        element: <AddNewHome />,
      },
      {
        path: "residentes",
        element: <ResidentsView />,
      },
      {
        path: "visitantes",
        element: <VisitorViews />,
      },
      {
        path: "entradas",
        element: <EntriesView />,
      },
    ],
  },
  {
    path: "/",
    element: <PublicRoute />,
    children: [
      {
        index: true,
        element: <LoginView />,
      },
    ],
  },
]);

function App() {
  return (
      <RouterProvider router={router} />
  )
}

export default App
