import { DataTable } from '@/components/ui/DataTable';
import { ColumnDef } from '@tanstack/react-table';
import {
  MdMoreHoriz,
  MdKeyboardArrowDown
} from 'react-icons/md';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import AnimationWrap from '@/components/ui/AnimationWraper.tsx';
import { useNavigate, useSearchParams } from 'react-router-dom';
import useSWR from 'swr';
import { GET } from '@/hooks/Dashboard.tsx';
import LoadingSpinner from '@/components/LoadingSpinner.tsx';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card.tsx';

export default function ResidentsView() {

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const page = searchParams.get('page') || 0;
  const { data, isLoading } = useSWR(`/admin/users/role/residente?page=${page}&size=10`, GET);

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
      accessorKey : 'email',
      header: 'Correo electronico'
    },
    {
      accessorKey: 'homeNumber',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
              # de casa
            <MdKeyboardArrowDown className="ml-2 h-4 w-4" />
          </Button>
        );
      }
    },
    {
      accessorKey: 'phone',
      header: 'Numero de telefono'
    },
    {
      accessorKey: 'name',
      header: 'Residente'
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
                <MdMoreHoriz className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Acciones</DropdownMenuLabel>
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => { navigate(`/admin/visitantes/${cell.row.original.id}`); }}
              >
                {'Ver mas informacion'}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
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
        {'Lista de residentes registrados'}
      </h1>
      {isLoading && (<LoadingSpinner />)}
      {data && (
        <DataTable
          columns={columns}
          data={data.users}
          totalPages={data.totalPages}
          shearchValue="name"
          searhValuePlaceholder="Buscar por nombre..."
        />)}
    </AnimationWrap>
  );
}
