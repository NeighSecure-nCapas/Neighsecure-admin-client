import dashboardIcon from '@/assets/dashboardIcon.svg';
import hogaresIcon from '@/assets/hogaresIcon.svg';
import residentesIcon from '@/assets/residentesIcon.svg';
import visitantesIcon from '@/assets/visitantesIcon.svg';
import entradasIcon from '@/assets/entradasIcon.svg';
import vigilantesIcon from '@/assets/vigilantesIcon.svg';

export const routes = [
    { name: 'Dashboard', route: '/admin', icon: dashboardIcon },
    { name: 'Hogares', route: '/admin/hogares', icon: hogaresIcon },
    { name: 'Residentes', route: '/admin/residentes', icon: residentesIcon },
    { name: 'Visitantes', route: '/admin/visitantes', icon: visitantesIcon },
    { name: 'Entradas', route: '/admin/entradas', icon: entradasIcon },
    { name: 'Vigilantes', route: '/admin/vigilantes', icon: vigilantesIcon }
];
