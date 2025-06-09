"use client";

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
import { PlusIcon } from "lucide-react";
import AddForm from "./AddForm";
import { columns as baseColumns } from "./columns";

import {
  createFacility,
  deleteFacility,
  getPaginatedFacilities,
  updateFacility,
} from "@/api/facilities";
import { DataTableRowActions } from "@/app/[lang]/admin/facilities/data-table-row-actions";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React from "react";
import { TablePagination } from "@/app/_components/reusable/data-table/TablePagination";
import { toast } from "sonner";

function Table() {
  const [page, setPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(10);
  const queryClient = useQueryClient();

  // mutate & invalidate data
  const createMutation = useMutation({
    mutationFn: createFacility,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["facilities"] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => deleteFacility(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["facilities"] });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, facility }) => updateFacility(id, facility),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["facilities"] });
    },
  });

  // fetch data
  const { data, isLoading, isError } = useQuery({
    queryKey: ["facilities", page, pageSize],
    queryFn: () => getPaginatedFacilities(page, pageSize),
    keepPreviousData: true,
  });

  const totalFacilities = data?.count || 0;
  const totalPages = Math.ceil(totalFacilities / pageSize);

  const onDeleteFacility = async (id) => {
    const confirmed = confirm(
      "Are you sure to delete this facility? Action cannot be undone."
    );
    if (!confirmed) return;

    try {
      await deleteMutation.mutateAsync(id);
      toast.success("Delete success", {
        description: "Facility deleted successfully",
      });
    } catch (error) {
      toast.error("Delete failed", {
        description: "Failed to delete facility",
      });
    }
  };

  const onUpdateFacility = async (id, facility) =>
    updateMutation.mutateAsync({ id, facility });

  const columns = React.useMemo(
    () =>
      baseColumns.map((column) => {
        if (column.accessorKey === "actions") {
          return {
            ...column,
            cell: ({ row }) => {
              return (
                <DataTableRowActions
                  row={row}
                  onDeleteFacility={onDeleteFacility}
                  onUpdateFacility={onUpdateFacility}
                  mutation={updateMutation}
                />
              );
            },
          };
        }
        return column;
      }),
    []
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error...</div>;
  }

  return (
    <>
      {" "}
      <DataTable
        columns={columns}
        data={data.data || []}
        pageSize={pageSize}
        header={
          <DataTableHeader
            searchColumnId={"name"}
            searchInputPlaceholder={"Tìm theo tên..."}
          >
            <div className="flex items-center justify-between w-full">
              <Dialog>
                <DialogTrigger asChild>
                  <Button size={"icon"} variant="outline">
                    <PlusIcon className="h-4 w-4" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Add facility</DialogTitle>
                    <DialogDescription>
                      Enter your facility informations and submit.
                    </DialogDescription>
                  </DialogHeader>
                  <AddForm mutation={createMutation} />
                </DialogContent>
              </Dialog>
              {/* Per page select */}
              <div className="flex items-center mb-4">
                <span className="text-sm text-muted-foreground mr-2">
                  Projects per page:
                </span>
                <Select
                  value={pageSize.toString()}
                  onValueChange={(value) => setPageSize(Number(value))}
                >
                  <SelectTrigger className="w-[100px] h-[40px]">
                    <SelectValue placeholder={pageSize.toString()} />
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 5, 10, 15, 20, 40, 50].map((size) => (
                      <SelectItem
                        key={size}
                        value={size.toString()}
                        defaultValue={pageSize.toString()}
                      >
                        {size}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </DataTableHeader>
        }
      />
      <div className="flex items-center justify-between">
        <TablePagination
          page={page}
          setPage={setPage}
          totalPages={totalPages}
        />
        <div className="text-sm text-muted-foreground">
          {data.data.length}/{totalFacilities} items
        </div>
      </div>
    </>
  );
}

export default Table;
