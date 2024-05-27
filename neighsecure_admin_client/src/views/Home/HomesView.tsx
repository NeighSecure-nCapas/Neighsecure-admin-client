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
import { homes } from "@/data/dummydata";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function HomesView() {
  const navigate = useNavigate();
  
  const [homesState, setHomesState] = useState(homes); // Initialize state with imported homes

  const handleRemoveHome = (home: Home) => {
    const updatedHomes = homesState.filter((h) => h.id !== home.id);
    setHomesState(updatedHomes); // Update state with the new homes array
  };

  const columns: ColumnDef<Home>[] = [
    {
      accessorKey: "id",
      header: "ID",
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
      accessorKey: "admin.fullName",
      id: "admin",
      header: "Residente encargado",
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ cell }) => {
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
                onClick={() => {
                  navigate("/admin/hogares/1");
                }}
                className="cursor-pointer"
              >
                {"Ver mas informacion"}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => handleRemoveHome(cell.row.original)}
                className="bg-red-500 cursor-pointer text-white"
              >
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
      <h1 className="self-start text-3xl ">{"Lista de hogares registrados"}</h1>
      <DataTable
        columns={columns}
        data={homesState}
        shearchValue="admin"
        searhValuePlaceholder="Buscar por residente encargado..."
        addValue={true}
        onAddValue={() => navigate("/admin/hogares/agregar")}
      />
    </div>
  );
}
