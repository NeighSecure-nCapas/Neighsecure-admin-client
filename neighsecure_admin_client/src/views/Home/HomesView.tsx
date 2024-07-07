import { DataTable } from '@/components/ui/DataTable';
import { ColumnDef } from '@tanstack/react-table';
import {
  MdMoreHoriz,
  MdKeyboardArrowDown,
  MdDeleteSweep
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
import { useNavigate, useSearchParams } from 'react-router-dom';
import AnimationWrap from '@/components/ui/AnimationWraper.tsx';
import useSWR from 'swr';
import { deleteHome, GET } from '@/hooks/Dashboard.tsx';
import LoadingSpinner from '@/components/LoadingSpinner.tsx';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card.tsx';

export default function HomesView() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const page = searchParams.get('page') || 0;
  const { data, isLoading } = useSWR(`/admin/homes?page=${page}&size=10`, GET);

  const columns: ColumnDef<Home>[] = [
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
      accessorKey: 'homeBoss',
      header: 'Residente encargado'
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
                onClick={() => {
                  navigate(`/admin/hogares/${cell.row.original.id}`);
                }}
                className="cursor-pointer"
              >
                {'Ver mas informacion'}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                  onClick={async () => {
                    await deleteHome(`/admin/homes/delete/${cell.row.original.id}`);
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
      className="container lg:w-[80%] min-h-dvh py-12 flex flex-col justify-center items-center gap-12"
      position={-50}
    >
      <h1 className="self-start text-3xl ">{'Lista de hogares registrados'}</h1>
      {isLoading && (<LoadingSpinner />)}
      {data && (
        <DataTable
          columns={columns}
          data={data.homes}
          totalPages={data.totalPages}
          shearchValue="homeBoss"
          searhValuePlaceholder="Buscar por residente encargado..."
          addValue={true}
          onAddValue={() => navigate('/admin/hogares/agregar')}
        />
      )}
    </AnimationWrap>
  );
}
