"use client";

import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import React, { createContext, useContext } from "react";

const tableContext = createContext();

export default function TableContextProvider({ children, data, columns }) {
  const [sorting, setSorting] = React.useState([]);
  const [columnFilters, setColumnFilters] = React.useState([]);
  const [rowSelection, setRowSelection] = React.useState({});
  const [columnVisibility, setColumnVisibility] = React.useState({});
  // const [pagination, setPagination] = React.useState({
  //   pageIndex: 0,
  //   pageSize: 10,
  // });

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange: setRowSelection,
    // getPaginationRowModel: getPaginationRowModel(),
    // onPaginationChange: setPagination,
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      // pagination,
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <tableContext.Provider
      value={{
        sorting,
        setSorting,
        columnFilters,
        setColumnFilters,
        rowSelection,
        setRowSelection,
        table,
      }}
    >
      {children}
    </tableContext.Provider>
  );
}

export const useTableContext = () => {
  const context = useContext(tableContext);

  if (!context) {
    throw new Error(
      "useTableContext must be used within a TableContextProvider"
    );
  }

  return context;
};
