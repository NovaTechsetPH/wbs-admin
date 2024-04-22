import * as React from "react";
import {
  flexRender,
  getCoreRowModel,
  // getFacetedRowModel,
  // getFacetedUniqueValues,
  // getFilteredRowModel,
  // getPaginationRowModel,
  // getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@ui/table";

import { DataTablePagination } from "./data-table-pagination";
import { DataTableToolbar } from "./data-table-toolbar";

export function DataTable({ columns, data, total, perPage, currentPage }) {
  // eslint-disable-next-line no-unused-vars
  const [rowSelection, setRowSelection] = React.useState({});
  // eslint-disable-next-line no-unused-vars
  const [columnVisibility, setColumnVisibility] = React.useState({
    created_at: false,
  });
  // eslint-disable-next-line no-unused-vars
  const [columnFilters, setColumnFilters] = React.useState([]);
  // eslint-disable-next-line no-unused-vars
  const [sorting, setSorting] = React.useState([]);

  // const table = useReactTable({
  //   data,
  //   columns,
  //   state: {
  //     sorting,
  //     columnVisibility,
  //     rowSelection,
  //     columnFilters,
  //   },
  //   enableRowSelection: true,
  //   onRowSelectionChange: setRowSelection,
  //   onSortingChange: setSorting,
  //   onColumnFiltersChange: setColumnFilters,
  //   onColumnVisibilityChange: setColumnVisibility,
  //   getCoreRowModel: getCoreRowModel(),
  //   // rowCount: 100,
  //   getFilteredRowModel: getFilteredRowModel(),
  //   getPaginationRowModel: getPaginationRowModel(),
  //   // manualPagination: true,
  //   getSortedRowModel: getSortedRowModel(),
  //   getFacetedRowModel: getFacetedRowModel(),
  //   getFacetedUniqueValues: getFacetedUniqueValues(),
  // });

  const table = useReactTable({
    data,
    columns,
    pageCount: Math.floor(total / perPage) ?? -1, //you can now pass in `rowCount` instead of pageCount and `pageCount` will be calculated internally (new in v8.13.0)
    rowCount: total, // new in v8.13.0 - alternatively, just pass in `pageCount` directly
    state: {
      pagination: {
        pageIndex: (currentPage ?? 1) - 1,
        pageSize: perPage,
      },
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
    },
    // onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true, //we're doing manual "server-side" pagination
    // getPaginationRowModel: getPaginationRowModel(), // If only doing manual pagination, you don't need this
    debugTable: true,
  });

  return (
    <div className="space-y-4">
      <DataTableToolbar table={table} />
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} colSpan={header.colSpan}>
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
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.original.status === "Pending" && "selected"}
                  // className={row.original.status == "Pending" && "font-bold"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
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
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination table={table} />
    </div>
  );
}
