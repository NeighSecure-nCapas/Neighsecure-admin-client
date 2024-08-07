import React, { useEffect } from 'react';
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  SortingState,
  getSortedRowModel,
  getFilteredRowModel,
  useReactTable,
  VisibilityState
} from '@tanstack/react-table';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Button } from './button';
import { Input } from './input';
import {MdAdd, MdErrorOutline, MdSearch} from 'react-icons/md';
import { VscSettings } from 'react-icons/vsc';
import { useSearchParams } from 'react-router-dom';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  totalPages: number;
  data: TData[];
  shearchValue: string;
  searhValuePlaceholder: string;
  addValue?: boolean;
  onAddValue?: () => void;
}

export function DataTable<TData, TValue>({
  columns,
  totalPages,
  data,
  shearchValue,
  searhValuePlaceholder,
  addValue,
  onAddValue
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);

  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );

  const [searchParams, setSearchParams] = useSearchParams();
  const initialPage = parseInt(searchParams.get('page') || '0', 10); // Convertir a índice base 0

  const [pagination, setPagination] = React.useState({
    pageIndex: initialPage,
    pageSize: 10
  });

  // Actualizar el estado de paginación y la URL cuando se monta el componente
  useEffect(() => {
    setPagination({ ...pagination, pageIndex: initialPage });
  }, [initialPage]);

  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    // getPaginationRowModel: getPaginationRowModel(),
    manualPagination: true,
    rowCount: data.length,
    pageCount: totalPages,
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    autoResetPageIndex: false,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      pagination
    }
  });

  return (
    <div className="space-y-4 w-full bg-gray-50 p-4 min-h-[50dvh] rounded-xl">
      <div className="flex items-center py-4">
        <MdSearch className="h-5 w-5 mr-3 text-muted-foreground" />
        <Input
          placeholder={searhValuePlaceholder}
          value={
            (table.getColumn(shearchValue)?.getFilterValue() as string) ?? ''
          }
          onChange={(event) =>
            table.getColumn(shearchValue)?.setFilterValue(event.target.value)
          }
          className="w-[300px]"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="ml-auto">
              <VscSettings className="mr-3 h-4 w-4" />
              Columnas
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
        {
          addValue && (
            <Button className="ml-4 py-6" size={'icon'} onClick={onAddValue}>
              <MdAdd className="h-5 w-5" />
            </Button>
          )
        }
      </div>
      <div>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className="bg-primaryColor text-center font-normal text-white py-3"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row ) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell className="text-center py-4" key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  <div className={'flex flex-col items-center justify-center gap-4'}>
                    <MdErrorOutline className={'h-7 w-7 font-light'}/>
                    {'No hay resultados disponibles'}
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            const newPageIndex = Math.max(0, pagination.pageIndex - 1);
            setPagination({ ...pagination, pageIndex: newPageIndex });
            setSearchParams({ page: (newPageIndex).toString() });
          }}
          disabled={!table.getCanPreviousPage()}
        >
          Anterior
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            const newPageIndex = pagination.pageIndex + 1;
            setPagination({ ...pagination, pageIndex: newPageIndex });
            setSearchParams({ page: (newPageIndex).toString() });
          }}
          disabled={!table.getCanNextPage()}
        >
          Siguiente
        </Button>
      </div>
    </div>
  );
}
