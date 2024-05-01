import {Navigate, Outlet} from 'react-router-dom';
import NavBar from "@/components/ui/NavBar.tsx";

export default function PrivateRoute() {
    /*const {user} = UseUserContext();

    if (!user) {
        return <Navigate to={LOGIN} />;
    }*/

    return (
        <div>
            <NavBar/>
            <Outlet />
        </div>
    );
}
