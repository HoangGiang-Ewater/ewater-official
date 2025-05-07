"use client";

import {
  createProjectCategory,
  deleteProjectCategory,
  fetchProjectCategories,
} from "@/api/projectCategories";
import { DataTable } from "@/app/_components/reusable/data-table";
import DataTableHeader from "@/app/_components/reusable/data-table-header";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Loader2Icon, PencilIcon, PlusIcon, TrashIcon } from "lucide-react";
import AddForm from "./AddForm";
import { columns as baseColumns } from "./columns";
import { useToast } from "@/hooks/use-toast";
import { useTableContext } from "@/contexts/TableContext";
import { DataTablePagination } from "@/app/_components/reusable/data-table-pagination";

function Table() {
  const { toast } = useToast();

  const queryClient = useQueryClient();

  // mutate & invalidate data
  const createMutation = useMutation({
    mutationFn: createProjectCategory,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["project-categories"] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => deleteProjectCategory(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["project-categories"] });
    },
  });

  // Insert category
  const { data, isLoading, isError } = useQuery({
    queryKey: ["project-categories"],
    queryFn: fetchProjectCategories,
  });

  const columns = baseColumns.map((column) => {
    if (column.accessorKey === "actions") {
      return {
        ...column,
        cell: ({ row }) => {
          return (
            <div className="flex gap-2 items-center">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  console.log("edit id: ", row.getValue("id"));
                }}
              >
                <PencilIcon className="h-4 w-4" />
              </Button>
              <Separator orientation="vertical" className="h-6" />
              <Button
                size="icon"
                className="text-red-500 bg-transparent hover:bg-red-500/10"
                onClick={async () => {
                  const confirmed = confirm(
                    "Are you sure to delete this category? Action cannot be undone."
                  );
                  if (!confirmed) return;

                  try {
                    await deleteMutation.mutateAsync(row.getValue("id"));
                    toast({
                      title: "Delete success",
                      description: "Category deleted successfully",
                    });
                  } catch (error) {
                    toast({
                      title: "Delete failed",
                      description: "Failed to delete category",
                    });
                  }
                }}
                disabled={deleteMutation.isPending}
              >
                {deleteMutation.isPending ? (
                  <Loader2Icon className="h-4 w-4 animate-spin" />
                ) : (
                  <TrashIcon className="h-4 w-4" />
                )}
              </Button>
            </div>
          );
        },
      };
    }
    return column;
  });

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
        header={
          <DataTableHeader
            searchColumnId={"name"}
            searchInputPlaceholder={"Tìm theo tên..."}
          >
            <Dialog>
              <DialogTrigger asChild>
                <Button size={"icon"} variant="outline">
                  <PlusIcon className="h-4 w-4" />
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Add project category</DialogTitle>
                  <DialogDescription>
                    Enter your project category informations and submit.
                  </DialogDescription>
                </DialogHeader>
                <AddForm mutation={createMutation} />
              </DialogContent>
            </Dialog>
          </DataTableHeader>
        }
      />
      <DataTablePagination />
    </>
  );
}

export default Table;
