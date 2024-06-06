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
import HomesAddNew from './views/Home/HomesAddNew.tsx';
import SecurityView from "@/views/Security/SecurityView.tsx";
import SecurityDetails from "@/views/Security/SecurityDetails.tsx";
import EntriesDetail from "@/views/Entries/EntriesDetail.tsx";
import VisitorsDetails from "@/views/Visitors/VisitorDetails.tsx";

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
        element: <HomesAddNew />,
      },
      {
        path: "hogares/:id",
        element: <HomesAddNew />,
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
        path: "visitantes/:id",
        element: <VisitorsDetails />,
      },
      {
        path: "entradas",
        element: <EntriesView />,
      },
      {
        path: "entradas/:id",
        element: <EntriesDetail />,
      },
      {
        path: "vigilantes",
        element: <SecurityView />,
      },
      {
        path: "vigilantes/:id",
        element: <SecurityDetails />,
      },
      {
        path: "vigilantes/agregar",
        element: <SecurityDetails />,
      }
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
