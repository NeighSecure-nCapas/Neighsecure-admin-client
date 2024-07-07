import { DataTable } from '@/components/ui/DataTable';
import { ColumnDef } from '@tanstack/react-table';
import {
    MdMoreHoriz,
    MdDeleteSweep, MdKeyboardArrowDown
} from 'react-icons/md';
import {Button} from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { useNavigate, useSearchParams } from 'react-router-dom';
import AnimationWrap from '@/components/ui/AnimationWraper.tsx';
import useSWR from 'swr';
import {deleteUser, GET} from '@/hooks/Dashboard.tsx';
import LoadingSpinner from '@/components/LoadingSpinner.tsx';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card.tsx';

const SecurityView = () => {

    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const page = searchParams.get('page') || 0;
    const { data, isLoading } = useSWR(`/admin/users/role/vigilante?page=${page}&size=10`, GET);

    const columns: ColumnDef<User>[] = [
        {
            accessorKey: 'id',
            header: 'ID',
            cell: ({ cell }) => {
                return (
                  <HoverCard>
                      <HoverCardTrigger>
                          {cell.row.original.id && cell.row.original.id.length > 20
                            ? `${cell.row.original.id.substring(0, 20)}..`
                            : cell.row.original.id}
                      </HoverCardTrigger>
                      <HoverCardContent>
                          {cell.row.original.id}
                      </HoverCardContent>
                  </HoverCard>
                );
            }
        },
        {
            accessorKey: 'name',
            header: 'Nombre'
        },
        {
            accessorKey: 'email',
            header: 'Correo electronico'
        },
        {
            accessorKey: 'phone',
            header: 'Numero de telefono'
        },
        {
            accessorKey: 'dui',
            header: ({column}) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                    >
                        DUI
                        <MdKeyboardArrowDown className="ml-2 h-4 w-4"/>
                    </Button>
                );
            }
        },
        {
            id: 'actions',
            header: 'Actions',
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
                                    navigate(`/admin/visitantes/${cell.row.original.id}`);
                                }}
                            >
                                {'Ver mas informacion'}
                            </DropdownMenuItem>
                            <DropdownMenuSeparator/>
                            <DropdownMenuItem
                                onClick={ async () => {
                                    await deleteUser(`/admin/users/delete/${cell.row.original.id}`, 'Vigilante');
                                }
                            }
                                className="bg-red-500 cursor-pointer text-white">
                                <MdDeleteSweep className="w-5 h-5 mr-2"/> {'Eliminar'}
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                );
            }
        }
    ];

    return (
        <AnimationWrap
            className="container lg:w-[80%] min-h-dvh py-12 flex flex-col justify-center items-center gap-12"
            position={-50}
        >
            <h1 className="self-start text-3xl ">
                {'Lista de Vigilantes'}
            </h1>
            {isLoading && (<LoadingSpinner />)}
            {data && (
            <DataTable
                columns={columns}
                data={data.users}
                totalPages={data.totalPages}
                shearchValue="name"
                searhValuePlaceholder="Buscar por nombre..."
                addValue
                onAddValue={() => {
                        navigate('/admin/vigilantes/agregar');
                }}
            />
            )}
        </AnimationWrap>
    );
};

export default SecurityView;
