import { Outlet } from 'react-router-dom';
import Header from '@/components/ui/Header.tsx';

export default function PrivateRoute() {

    return (
        <div className={'md:flex-row flex flex-col'}>
            <Header/>
            <Outlet />
        </div>
    );
}
