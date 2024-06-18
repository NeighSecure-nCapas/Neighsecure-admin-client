import { DataTable } from "@/components/ui/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import {
  MdMoreHoriz,
  MdKeyboardArrowDown,
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
import AnimationWrap from "@/components/ui/AnimationWraper.tsx";
import {useNavigate} from "react-router-dom";
import useSWR from "swr";
import {GET} from "@/hooks/Dashboard.tsx";
import LoadingSpinner from "@/components/LoadingSpinner.tsx";

export default function ResidentsView() {

  const navigate = useNavigate();
  const  { data, isLoading } = useSWR('/admin/users/role/Residente', GET);

  const columns: ColumnDef<User>[] = [
    {
      accessorKey: "id",
      header: "ID",
    },
    {
      accessorKey : 'email',
      header: 'Correo electronico',
    },
    {
      accessorKey: "homeNumber",
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
      accessorKey: "phone",
      header: "Numero de telefono",
    },
    {
      accessorKey: "name",
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
                  <DropdownMenuItem
                      className="cursor-pointer"
                      onClick={() => { navigate(`/admin/visitantes/${cell.row.original.id}`) }}
                  >
                    {"Ver mas informacion"}
                  </DropdownMenuItem>
                <DropdownMenuSeparator />
              </DropdownMenuContent>
            </DropdownMenu>
        );
      },
    },
  ];

  return (
    <AnimationWrap
        className="container lg:w-[80%] flex flex-col justify-center items-center gap-12"
        position={-50}
    >
      <h1 className="self-start text-3xl ">
        {"Lista de residentes registrados"}
      </h1>
      {isLoading && (<LoadingSpinner />)}
      {data && (
      <DataTable
        columns={columns}
        data={data}
        shearchValue="fullName"
        searhValuePlaceholder="Buscar por nombre..."
      />)}
    </AnimationWrap>
  );
}
