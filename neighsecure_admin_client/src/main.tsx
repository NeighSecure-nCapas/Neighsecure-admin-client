import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import {GoogleOAuthProvider} from '@react-oauth/google';
import './index.css';
import {Toaster} from '@/components/ui/sonner';
import axios from 'axios';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import {PRIVATE} from '@/routes/Paths.tsx';
import PrivateRoute from '@/routes/PrivateRoute.tsx';
import DashboardView from '@/views/DashboardView.tsx';
import HomesView from '@/views/Home/HomesView.tsx';
import HomesAddNew from '@/views/Home/HomesAddNew.tsx';
import ResidentsView from '@/views/Residentes/ResidentsView.tsx';
import VisitorViews from '@/views/Visitors/VisitorsView.tsx';
import VisitorsDetails from '@/views/Visitors/VisitorDetails.tsx';
import EntriesView from '@/views/Entries/EntriesView.tsx';
import EntriesDetail from '@/views/Entries/EntriesDetail.tsx';
import SecurityView from '@/views/Security/SecurityView.tsx';
import SecurityDetails from '@/views/Security/SecurityDetails.tsx';
import LoginView from '@/views/LoginView.tsx';
import HomesUpdateInfo from "@/views/Home/HomesUpdateInfo.tsx";

axios.defaults.baseURL = import.meta.env.VITE_APIENDPOINT || 'http://localhost/';

const router = createBrowserRouter([
    {
        path: '/',
        element: <App/>,
        children: [
            {
                index: true,
                element: <LoginView/>
            },
            {
                path: PRIVATE,
                element: <PrivateRoute/>,
                children: [
                    {
                        index: true,
                        element: <DashboardView/>
                    },
                    {
                        path: 'hogares',
                        element: <HomesView/>
                    },
                    {
                        path: 'hogares/agregar',
                        element: <HomesAddNew/>
                    },
                    {
                        path: 'hogares/:id',
                        element: <HomesUpdateInfo/>
                    },
                    {
                        path: 'residentes',
                        element: <ResidentsView/>
                    },
                    {
                        path: 'visitantes',
                        element: <VisitorViews/>
                    },
                    {
                        path: 'visitantes/:id',
                        element: <VisitorsDetails/>
                    },
                    {
                        path: 'entradas',
                        element: <EntriesView/>
                    },
                    {
                        path: 'entradas/:id',
                        element: <EntriesDetail/>
                    },
                    {
                        path: 'vigilantes',
                        element: <SecurityView/>
                    },
                    {
                        path: 'vigilantes/:id',
                        element: <VisitorsDetails/>
                    },
                    {
                        path: 'vigilantes/agregar',
                        element: <SecurityDetails/>
                    }
                ]
            }
        ]
    }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <GoogleOAuthProvider clientId={'266523106449-pojfcjr5r4gtmlontuhfuc3ram9a54l7.apps.googleusercontent.com'}>
      <React.StrictMode>
          <RouterProvider router={router} />
          <Toaster richColors closeButton position={'top-right'} />
      </React.StrictMode>
  </GoogleOAuthProvider>
);
