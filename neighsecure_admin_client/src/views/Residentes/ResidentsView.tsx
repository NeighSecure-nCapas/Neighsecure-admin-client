import { DataTable } from "@/components/ui/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import {
  MdMoreHoriz,
  MdKeyboardArrowDown,
  MdDeleteSweep,
} from "react-icons/md";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { homes, users } from "@/data/dummydata";
import {useState} from "react";
import {toast} from "sonner";
import AnimationWrap from "@/components/ui/AnimationWraper.tsx";


export default function ResidentsView() {

  const [usersState, setUsersState] = useState(users); // Initialize state with imported homes

  const handleRemoveHome = (user: User) => {
    const updatedUsers = usersState.filter((u) => u.id !== user.id);
    setUsersState(updatedUsers); // Update state with the new homes array
    toast.success("Listo!.", {
      description: `Haz eleminado al usuario <span class="font-semibold"> ${user.fullName}</span> con exito.`
    });
  };

  const columns: ColumnDef<User>[] = [
    {
      accessorKey: "id",
      header: "ID",
    },
    {
      accessorKey: "homeId",
      cell: ({ row }) => {
        const homeNumber = homes.find(
            (home) => home.id === row.getValue('homeId')
        )?.homeNumber;
        return <span>{homeNumber}</span>;
      },
      header: ({ column }) => {
        return (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
              # de casa
              <MdKeyboardArrowDown className="ml-2 h-4 w-4" />
            </Button>
        );
      },
    },
    {
      accessorKey: "fullName",
      header: "Residente",
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({cell}) => {
        return (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <MdMoreHoriz className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                {/*<DropdownMenuItem*/}
                {/*    className="cursor-pointer"*/}
                {/*    //onClick={() => homes.find((home) => home.id === row.original.id)}*/}
                {/*>*/}
                {/*  {"Ver mas informacion"}*/}
                {/*</DropdownMenuItem>*/}
                <DropdownMenuSeparator />
                <DropdownMenuItem
                    onClick={() => handleRemoveHome(cell.row.original)}
                    className="bg-red-500 cursor-pointer text-white">
                  <MdDeleteSweep className="w-5 h-5 mr-2" /> {"Eliminar"}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
        );
      },
    },
  ];

  const residentUsers = usersState.filter(user => user.roles.includes('residente'));

  return (
    <AnimationWrap
        className="container lg:w-[80%] flex flex-col justify-center items-center gap-12"
        position={-50}
    >
      <h1 className="self-start text-3xl ">
        {"Lista de residentes registrados"}
      </h1>
      <DataTable
        columns={columns}
        data={residentUsers}
        shearchValue="fullName"
        searhValuePlaceholder="Buscar por nombre..."
      />
    </AnimationWrap>
  );
}
