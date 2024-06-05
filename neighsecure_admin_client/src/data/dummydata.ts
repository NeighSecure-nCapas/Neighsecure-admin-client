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
  }
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
      dui: "00000000-0",
      assignedTerminal: "Terminal vehicular",
    },
    {
      id: "4",
      fullName: "Pamela Rosales",
      email: "pamelarosales@gmail.com",
      roles: ["vigilante", "visitante"],
      dui: "00000000-0",
      assignedTerminal: "Terminal vehicular",
    },
    {
      id: "5",
      fullName: "Diego Viana",
      email: "diegoviana@gmail.com",
      roles: ["vigilante", "visitante"],
      dui: "00000000-0",
      assignedTerminal: "Terminal peatonal",
    },
];

export const visitors: Visitor[] = [
    {
      id: "1",
      date: "2021-08-20",
      visitType: "Visita múltiple",
      visitorName: "Juan Perez",
      homeNumber: "65 A",
    },
    {
      id: "2",
      date: "2021-08-20",
      visitType: "Visita múltiple",
      visitorName: "Maria Perez",
      homeNumber: "90 A",
    },
    {
      id: "3",
      date: "2021-08-20",
      visitType: "Visita múltiple",
      visitorName: "Jose Perez",
      homeNumber: "12 A",
    },
    {
      id: "4",
      date: "2021-08-20",
      visitType: "Visita única",
      visitorName: "Pedro Perez",
      homeNumber: "43 A",
    },
    {
      id: "5",
      date: "2021-08-20",
      visitType: "Visita única",
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
      comment: "Comentario de la entrada",
    },
    {
      id: "2",
      date: "2021-08-20",
      entryType: "Veicular",
      name: "Maria Perez",
      homeNumber: "90 A",
      comment: "Comentario de la entrada",
    },
    {
      id: "3",
      date: "2021-08-20",
      entryType: "Veicular",
      name: "Jose Perez",
      homeNumber: "12 A",
      comment: "Comentario de la entrada",
    },
    {
      id: "4",
      date: "2021-08-20",
      entryType: "Peatonal",
      name: "Pedro Perez",
      homeNumber: "43 A",
      comment: "Comentario de la entrada",
    },
    {
      id: "5",
      date: "2021-08-20",
      entryType: "Entrada",
      name: "Maria Perez",
      homeNumber: "48 A",
      comment: "Comentario de la entrada",
    }
];
