import {DataTable} from "@/components/ui/DataTable";
import {ColumnDef} from "@tanstack/react-table";
import {
    MdMoreHoriz,
    MdDeleteSweep, MdKeyboardArrowDown,
} from "react-icons/md";

import {Button} from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {users} from "@/data/dummydata";
import {useNavigate} from "react-router-dom";
import {toast} from "sonner";
import {useState} from "react";

const SecurityView = () => {

    const navigate = useNavigate();

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
            accessorKey: "fullName",
            header: "Nombre",
        },
        {
            accessorKey: "dui",
            header: ({column}) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        DUI
                        <MdKeyboardArrowDown className="ml-2 h-4 w-4"/>
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
                                <MdMoreHoriz className="h-4 w-4"/>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                            <DropdownMenuItem
                                className="cursor-pointer"
                                onClick={() => {
                                    navigate(`/admin/vigilantes/${cell.row.original.id}`);
                                }}
                            >
                                {"Ver mas informacion"}
                            </DropdownMenuItem>
                            <DropdownMenuSeparator/>
                            <DropdownMenuItem
                                onClick={() => handleRemoveHome(cell.row.original)}
                                className="bg-red-500 cursor-pointer text-white">
                                <MdDeleteSweep className="w-5 h-5 mr-2"/> {"Eliminar"}
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                );
            },
        },
    ];

    // Filtrar los usuarios que tienen el rol de "vigilante"
    const securityUsers = usersState.filter(user => user.roles.includes('vigilante'));

    return (
        <div className="container lg:w-[80%] flex flex-col justify-center items-center gap-12">
            <h1 className="self-start text-3xl ">
                {"Lista de Vigilantes"}
            </h1>
            <DataTable
                columns={columns}
                data={securityUsers}
                shearchValue="fullName"
                searhValuePlaceholder="Buscar por nombre..."
                addValue
                onAddValue={
                    () => {
                        navigate("/admin/vigilantes/agregar");
                    }
                }
            />
        </div>
    );
}

export default SecurityView;
