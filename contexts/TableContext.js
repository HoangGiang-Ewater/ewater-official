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

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange: setRowSelection,
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      sorting,
      columnFilters,
      rowSelection,
      pagination: {
        pageIndex: 0,
        pageSize: 10,
      },
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
