import {DataTable} from '@/components/ui/DataTable';
import {Button} from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import {ColumnDef} from '@tanstack/react-table';
import {MdDeleteSweep, MdKeyboardArrowDown, MdMoreHoriz} from 'react-icons/md';
import { useNavigate, useSearchParams } from 'react-router-dom';
import AnimationWrap from '@/components/ui/AnimationWraper.tsx';
import useSWR from 'swr';
import {deleteEntries, GET} from '@/hooks/Dashboard.tsx';
import { format} from 'date-fns';
import {es} from 'date-fns/locale';
import LoadingSpinner from '@/components/LoadingSpinner.tsx';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card.tsx';

const VisitorViews = () => {

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const page = searchParams.get('page') || 0;
  const { data, isLoading } = useSWR(`/admin/entries?page=${page}&size=10`, GET);

  const columns: ColumnDef<Entries>[] = [
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
      accessorKey: 'date',
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
      },
      cell: ({cell}) => {
        if (!cell.row.original.date) {return ('-');}
        const date = new Date(cell.row.original.date);
        return format(date, 'PPP, p', {locale: es});
      }
    },
    {
      accessorKey: 'entryType',
      header: 'Tipo de entrada',
      cell: ({cell}) => {
        if (!cell.row.original.entryType) {return ('-');}
        return cell.row.original.entryType;
      }
    },
    {
      accessorKey: 'user',
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
                    onClick={() => navigate(`/admin/entradas/${cell.row.original.id}`)}
                >
                  {'Ver mas informacion'}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                    onClick={ async () => {
                      await deleteEntries(`/admin/entries/delete/${cell.row.original.id}`);
                    }
                }
                    className="bg-red-500 cursor-pointer text-white">
                  <MdDeleteSweep className="w-5 h-5 mr-2" /> {'Eliminar'}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
        );
      }
    }
  ];

  return (
    <AnimationWrap
        className="container lg:w-[80%] min-h-dvh h-full py-12 flex flex-col justify-center items-center gap-12"
        position={-50}
    >
      <h1 className="self-start text-3xl ">{'Lista de Entradas'}</h1>
      {isLoading && (<LoadingSpinner />)}
      {data && (
              <DataTable
                  columns={columns}
                  data={data.entries}
                  totalPages={data.totalPages}
                  shearchValue="user"
                  searhValuePlaceholder="Buscar por nombre..."
              />
        )}
    </AnimationWrap>
  );
};

export default VisitorViews;
