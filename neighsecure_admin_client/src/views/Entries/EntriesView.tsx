import { DataTable } from "@/components/ui/DataTable";
import { Button } from "@/components/ui/button";
import {entries} from "@/data/dummydata";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ColumnDef } from "@tanstack/react-table";
import { MdDeleteSweep, MdKeyboardArrowDown, MdMoreHoriz } from "react-icons/md";
import {useState} from "react";
import {toast} from "sonner";

const VisitorViews = () => {

  const [entriesState, setEntriesState] = useState(entries); // Initialize state with imported homes

  const handleRemoveEntry = (entry: Entries) => {
    const updatedEntries = entriesState.filter((e) => e.id !== entry.id);
    setEntriesState(updatedEntries); // Update state with the new homes array
    toast.success("Listo!.", {
      description: `Haz eleminado la entrada <span class="font-semibold"> ${entry.id}</span> con exito.`
    });
  };

  const columns: ColumnDef<Entries>[] = [
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
      accessorKey: "entryType",
      header: "Tipo de entrada",
    },
    {
      accessorKey: "name",
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
                    //onClick={() => homes.find((home) => home.id === row.original.id)}
                >
                  {"Ver mas informacion"}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                    onClick={() => handleRemoveEntry(cell.row.original)}
                    className="bg-red-500 cursor-pointer text-white">
                  <MdDeleteSweep className="w-5 h-5 mr-2" /> {"Eliminar"}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
        );
      },
    },
  ];

  return (
    <div className="container lg:w-[80%] flex flex-col justify-center items-center gap-12">
      <h1 className="self-start text-3xl ">{"Lista de Entradas"}</h1>
      <DataTable
        columns={columns}
        data={entriesState}
        shearchValue="name"
        searhValuePlaceholder="Buscar por nombre..."
      />
    </div>
  );
};

export default VisitorViews;
