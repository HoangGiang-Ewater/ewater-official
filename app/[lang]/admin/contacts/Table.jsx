"use client";

import {
  createProjectCategory,
  deleteProjectCategory,
  fetchPaginatedProjectCategoriesWithCount,
  updateProjectCategory,
} from "@/api/projectCategories";
import { DataTable } from "@/app/_components/reusable/data-table/data-table";
import DataTableHeader from "@/app/_components/reusable/data-table/data-table-header";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  ArrowUpDown,
  FilterIcon,
  MoreHorizontalIcon,
  PlusIcon,
} from "lucide-react";
// import AddForm from "./AddForm";
import { columns as baseColumns, getOptions } from "./columns";

import { DataTableRowActions } from "@/app/[lang]/admin/categories/data-table-row-actions";
import { TablePagination } from "@/app/_components/reusable/data-table/TablePagination";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React from "react";
import {
  deleteContact,
  getContactList,
  getContactListByStatus,
  updateContactStatus,
} from "@/api/contacts";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Loader from "@/app/_components/reusable/Loader";
import Error from "@/app/_components/reusable/Error";

const status = [
  { value: "new", label: "New" },
  { value: "replied", label: "replied" },
  { value: "archived", label: "Archived" },
];

function Table() {
  const [page, setPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(12);
  const [statusFilter, setStatusFilter] = React.useState("all");

  const queryClient = useQueryClient();

  // fetch data
  const { data, isLoading, isError } = useQuery({
    queryKey: ["contact-list", page, pageSize, statusFilter],
    queryFn: () => {
      if (statusFilter === "all") {
        return getContactList(page, pageSize);
      } else {
        return getContactListByStatus(page, pageSize, statusFilter);
      }
    },
  });

  // Define your mutation handlers
  const archiveMutation = useMutation({
    mutationFn: ({ id }) => updateContactStatus(id, "archived"),
    onSuccess: () => {
      queryClient.invalidateQueries(["contact-list"]);
      toast.success("Archived successfully", {
        description: "The contact has been archived.",
      });
    },
    onError: (error) => {
      toast.error("Error archiving contact", {
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const unarchiveMutation = useMutation({
    mutationFn: ({ id }) => updateContactStatus(id, "new"),
    onSuccess: () => {
      queryClient.invalidateQueries(["contact-list"]);
      toast.success("Unarchived successfully", {
        description: "The contact has been unarchived.",
      });
    },
    onError: (error) => {
      toast.error("Error unarchiving contact", {
        description: error.message,
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => deleteContact(id),
    onSuccess: () => {
      queryClient.invalidateQueries(["contact-list"]);
      toast.success("Deleted successfully", {
        description: "The contact has been deleted.",
      });
    },
    onError: (error) => {
      toast.error("Error deleting contact", {
        description: error.message,
      });
    },
  });

  // Pass them to getOptions
  const options = getOptions({
    onArchive: (id) => archiveMutation.mutate({ id }),
    onUnarchive: (id) => unarchiveMutation.mutate({ id }),
    onReply: (id) => replyMutation.mutate({ id }),
    onDelete: (id) => {
      const confirmed = window.confirm(
        "Are you sure you want to delete this contact? This action cannot be undone."
      );

      if (!confirmed) return;

      deleteMutation.mutate(id);
    },
  });

  React.useEffect(() => {
    console.log(data);
  }, [data]);

  const totalPages = Math.ceil(data?.count / pageSize || 1);

  const columns = React.useMemo(() => {
    return baseColumns.map((column) => {
      if (column.accessorKey === "status") {
        return {
          ...column,
          id: "status",
          header: ({ column }) => {
            return (
              <Button
                variant="ghost"
                onClick={() =>
                  column.toggleSorting(column.getIsSorted() === "asc")
                }
              >
                Status
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            );
          },
          cell: ({ row }) => {
            return (
              <Badge
                className={cn(
                  "border w-fit",
                  "ml-4",
                  row.getValue("status") === "new"
                    ? "bg-yellow-600/10 border-yellow-600 text-yellow-600 hover:bg-yellow-600/20"
                    : row.getValue("status") === "replied"
                      ? "bg-teal-600/10 border-teal-600 text-teal-600 hover:bg-teal-600/20"
                      : row.getValue("status") === "archived"
                        ? "bg-gray-600/10 border-gray-600 text-gray-600 hover:bg-gray-600/20"
                        : "bg-red-600/10 border-red-600 text-red-600 hover:bg-red-600/20"
                )}
              >
                {row.getValue("status").toUpperCase()}
              </Badge>
            );
          },
        };
      }

      if (column.accessorKey === "actions") {
        return {
          ...column,
          cell: ({ row }) => {
            return (
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontalIcon className="h-4 w-4" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-40 p-2">
                  {options
                    .filter((option) => (option.show ? option.show(row) : true))
                    .map((option, index) =>
                      option.render ? (
                        option.render(row)
                      ) : (
                        <div key={option.label + index} className="w-full">
                          <Button
                            variant="ghost"
                            className={cn(
                              "w-full justify-start text-sm p-2 hover:bg-gray-100/10 rounded-md"
                            )}
                            onClick={() => option.action(row.getValue("id"))}
                          >
                            {option.icon}
                            {option.label}
                          </Button>
                        </div>
                      )
                    )}
                </PopoverContent>
              </Popover>
            );
          },
        };
      }

      return column;
    });
  }, []);

  if (isLoading) {
    return <Loader content="Loading contacts..." />;
  }

  if (isError) {
    return <Error content="Error loading contacts." />;
  }

  return (
    <>
      {" "}
      <DataTable
        columns={columns}
        data={data.data || []}
        header={
          <DataTableHeader
            searchColumnId={"name"}
            searchInputPlaceholder={"Tìm theo tên..."}
          >
            <div className="flex items-center w-full justify-end gap-4">
              <PageSizeSelect pageSize={pageSize} setPageSize={setPageSize} />
              <StatusFilterSelect
                statusFilter={statusFilter}
                setStatusFilter={setStatusFilter}
              />
            </div>
          </DataTableHeader>
        }
      />
      <TablePagination page={page} setPage={setPage} totalPages={totalPages} />
    </>
  );
}

export default Table;

const PageSizeSelect = ({ pageSize, setPageSize }) => {
  return (
    <div className="flex items-center gap-4">
      <span className="text-sm text-muted-foreground">Items per page:</span>
      <Select value={pageSize} onValueChange={setPageSize} id="pageSize">
        <SelectTrigger className="w-[80px]">
          <SelectValue placeholder={`Items per page`} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {[6, 12, 24, 36, 48].map((size, index) => (
              <SelectItem
                key={size}
                value={size}
                onClick={() => {
                  setPageSize(size);
                  setPage(1);
                }}
              >
                {size}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

const StatusFilterSelect = ({ statusFilter, setStatusFilter }) => {
  return (
    <Select
      value={statusFilter}
      onValueChange={setStatusFilter}
      id="statusFilter"
    >
      <SelectTrigger className="w-[140px]">
        <SelectValue placeholder="Filter by status" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem
            key={"all"}
            value={"all"}
            onClick={() => {
              setStatusFilter("all");
              setPage(1); // Reset to first page when showing all
              setPageSize(12); // Reset page size to default when showing all
            }}
          >
            ALL
          </SelectItem>
          {status.map((s) => (
            <SelectItem
              key={s.value}
              value={s.value}
              onClick={() => {
                setStatusFilter(s.value);
                setPage(1); // Reset to first page when changing status
                if (s.value === "all") {
                  setPageSize(12); // Reset page size to default when showing all
                }
              }}
            >
              {s.label.toUpperCase()}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
