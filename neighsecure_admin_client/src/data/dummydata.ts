import dashboardIcon from "@/assets/dashboardIcon.svg";
import hogaresIcon from "@/assets/hogaresIcon.svg";
import residentesIcon from "@/assets/residentesIcon.svg";
import visitantesIcon from "@/assets/visitantesIcon.svg";
import entradasIcon from "@/assets/entradasIcon.svg";
import vigilantesIcon from "@/assets/vigilantesIcon.svg";

export const homes: Home[] = [
  {
    id: "1",
    homeNumber: 135,
    address: "Calle 4,Ave 5, San Salvador, El Salvador",
    admin: {
      id: "1",
      fullName: "John Doe",
      email: "jhondoe@gmail.com",
      roles: ["residente"],
      homeId: "1",
      dui: "00000000-0",
    },
    users: [],
  },
  {
    id: "2",
    homeNumber: 22,
    address: "Calle 4,Ave 5, San Salvador, El Salvador",
    admin: {
      id: "2",
      fullName: "Karla Khon",
      email: "karlakhon@gmail.com",
      roles: ["residente"],
      homeId: "2",
      dui: "00000000-0",
    },
    users: [],
  },
  {
    id: "3",
    homeNumber: 175,
    address: "Calle 4,Ave 5, San Salvador, El Salvador",
    admin: {
      id: "3",
      fullName: "Mario Diaz",
      email: "mariodiaz@gmail.com",
      roles: ["residente"],
      homeId: "3",
      dui: "00000000-0",
    },
    users: [],
  },

];

export const users: User[] = [
    {
      id: "1",
      fullName: "John Doe",
      email: "jhondoe@gmail.com",
      roles: ["residente", "visitante"],
      homeId: "1",
      dui: "00000000-0",
    },
    {
      id: "2",
      fullName: "Karla Khon",
      email: "karlakhon@gmail.com",
      roles: ["residente", "visitante"],
      homeId: "2",
      dui: "00000000-0",
    },
    {
      id: "3",
      fullName: "Carlos Gomez",
      email: "carlosgomez@gmail.com",
      roles: ["vigilante", "visitante"],
      dui: "00000000-0"
    },
    {
      id: "4",
      fullName: "Pamela Rosales",
      email: "pamelarosales@gmail.com",
      roles: ["vigilante", "visitante"],
      dui: "00000000-0"
    },
    {
      id: "5",
      fullName: "Diego Viana",
      email: "diegoviana@gmail.com",
      roles: ["vigilante", "visitante"],
      dui: "00000000-0"
    },
];

export const visitors: Visitor[] = [
    {
      id: "1",
      date: "2021-08-20",
      visitorName: "Juan Perez",
      homeNumber: "65 A",
    },
    {
      id: "2",
      date: "2021-08-20",
      visitorName: "Maria Perez",
      homeNumber: "90 A",
    },
    {
      id: "3",
      date: "2021-08-20",
      visitorName: "Jose Perez",
      homeNumber: "12 A",
    },
    {
      id: "4",
      date: "2021-08-20",
      visitorName: "Pedro Perez",
      homeNumber: "43 A",
    },
    {
      id: "5",
      date: "2021-08-20",
      visitorName: "Maria Perez",
      homeNumber: "48 A",
    }
];

export const entries: Entries[] = [
    {
      id: "1",
      date: "2021-08-20",
      entryType: "Peatonal",
      name: "Juan Perez",
      homeNumber: "65 A",
      comment: "El visitante se presentó en la puerta de entrada a las 19:55 CST. El visitante proporcionó la siguiente información Nombre: Fernando Figueroa DUI: 989761-1 Motivo de la visita: Domicilio Pedidos YA",
    },
    {
      id: "2",
      date: "2021-08-20",
      entryType: "Veicular",
      name: "Maria Perez",
      homeNumber: "90 A",
      comment: "El visitante se presentó en la puerta de entrada a las 19:55 CST. El visitante proporcionó la siguiente información Nombre: Fernando Figueroa DUI: 989761-1 Motivo de la visita: Domicilio Pedidos YA",
    },
    {
      id: "3",
      date: "2021-08-20",
      entryType: "Veicular",
      name: "Jose Perez",
      homeNumber: "12 A",
      comment: "El visitante se presentó en la puerta de entrada a las 19:55 CST. El visitante proporcionó la siguiente información Nombre: Fernando Figueroa DUI: 989761-1 Motivo de la visita: Domicilio Pedidos YA",
    },
    {
      id: "4",
      date: "2021-08-20",
      entryType: "Peatonal",
      name: "Pedro Perez",
      homeNumber: "43 A",
      comment: "El visitante se presentó en la puerta de entrada a las 19:55 CST. El visitante proporcionó la siguiente información Nombre: Fernando Figueroa DUI: 989761-1 Motivo de la visita: Domicilio Pedidos YA",
    },
    {
      id: "5",
      date: "2021-08-20",
      entryType: "Entrada",
      name: "Maria Perez",
      homeNumber: "48 A",
      comment: "El visitante se presentó en la puerta de entrada a las 19:55 CST. El visitante proporcionó la siguiente información Nombre: Fernando Figueroa DUI: 989761-1 Motivo de la visita: Domicilio Pedidos YA",
    }
];

export const routes = [
    { name: "Dashboard", route: "/admin", icon: dashboardIcon },
    { name: "Hogares", route: "/admin/hogares", icon: hogaresIcon },
    { name: "Residentes", route: "/admin/residentes", icon: residentesIcon },
    { name: "Visitantes", route: "/admin/visitantes", icon: visitantesIcon },
    { name: "Entradas", route: "/admin/entradas", icon: entradasIcon },
    { name: "Vigilantes", route: "/admin/vigilantes", icon: vigilantesIcon },
];
