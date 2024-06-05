import { DataTable } from "@/components/ui/DataTable";
import { Button } from "@/components/ui/button";
import { visitors } from "@/data/dummydata";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ColumnDef } from "@tanstack/react-table";
import { MdKeyboardArrowDown, MdMoreHoriz } from "react-icons/md";

export const columns: ColumnDef<Visitor>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "date",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Fecha
          <MdKeyboardArrowDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "visitType",
    header: "Tipo de visita",
  },
  {
    accessorKey: "visitorName",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Nombre
          <MdKeyboardArrowDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
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
    id: "actions",
    header: "Actions",
    cell: () => {
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
              //onClick={() => homes.find((home) => home.id === row.original.id)}
            >
              {"Ver mas informacion"}
            </DropdownMenuItem>
            {/*<DropdownMenuSeparator />*/}
            {/*<DropdownMenuItem className="bg-red-500 cursor-pointer text-white">*/}
            {/*  <MdDeleteSweep className="w-5 h-5 mr-2" /> {"Eliminar"}*/}
            {/*</DropdownMenuItem>*/}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

const VisitorViews = () => {
    return (
      <div className="container lg:w-[80%] flex flex-col justify-center items-center gap-12">
        <h1 className="self-start text-3xl ">{"Lista de Visitantes"}</h1>
        <DataTable
          columns={columns}
          data={visitors}
          shearchValue="visitorName"
          searhValuePlaceholder="Buscar por nombre..."
        />
      </div>
    );
};

export default VisitorViews
