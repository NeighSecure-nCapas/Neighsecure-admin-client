import { DataTable } from '@/components/ui/DataTable';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { ColumnDef } from '@tanstack/react-table';
import { MdKeyboardArrowDown, MdMoreHoriz } from 'react-icons/md';
import {useNavigate} from 'react-router-dom';
import AnimationWrap from '@/components/ui/AnimationWraper.tsx';
import useSWR from 'swr';
import {GET} from '@/hooks/Dashboard.tsx';
import LoadingSpinner from '@/components/LoadingSpinner.tsx';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card.tsx';

const VisitorViews = () => {

  const navigate = useNavigate();
  const { data, isLoading } = useSWR('/admin/users/role/Visitante', GET);

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
      accessorKey: 'email',
      header: ({ column }) => {
        return (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            >
              Fecha
              <MdKeyboardArrowDown className="ml-2 h-4 w-4" />
            </Button>
        );
      }
    },
    {
      accessorKey: 'name',
      header: ({ column }) => {
        return (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            >
              Nombre
              <MdKeyboardArrowDown className="ml-2 h-4 w-4" />
            </Button>
        );
      }
    },
    {
      accessorKey: 'dui',
      header: ({ column }) => {
        return (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            >
              DUI
              <MdKeyboardArrowDown className="ml-2 h-4 w-4" />
            </Button>
        );
      }
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
      id: 'actions',
      header: 'Actions',
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
                    className="cursor-pointer"
                    onClick={() => { navigate(`/admin/visitantes/${cell.row.original.id}`); }}
                >
                  {'Ver mas informacion'}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
        );
      }
    }
  ];

    return (
      <AnimationWrap
          className="container lg:w-[80%] h-full min-h-dvh py-12 flex flex-col justify-center items-center gap-12"
          position={-50}
      >
        <h1 className="self-start text-3xl ">{'Lista de Visitantes'}</h1>
        {isLoading && (<LoadingSpinner />)}
        {data && (
        <DataTable
          columns={columns}
          data={data}
          shearchValue="name"
          searhValuePlaceholder="Buscar por nombre..."
        />)}
      </AnimationWrap>
    );
};

export default VisitorViews;
