"use client";

import {
  createProjectCategory,
  deleteProjectCategory,
  fetchPaginatedProjectCategoriesWithCount,
  fetchProjectCategoriesWithCount,
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
import { PlusIcon } from "lucide-react";
import AddForm from "./AddForm";
import { columns as baseColumns } from "./columns";

import { DataTableRowActions } from "@/app/[lang]/admin/categories/data-table-row-actions";
import React from "react";
import { TablePagination } from "@/app/_components/reusable/data-table/TablePagination";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Loader from "@/app/_components/reusable/Loader";
import Error from "@/app/_components/reusable/Error";
import { toast } from "sonner";

function Table() {
  const [page, setPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(6);

  const queryClient = useQueryClient();

  // mutate & invalidate data
  const createMutation = useMutation({
    mutationFn: createProjectCategory,
    onMutate: () => {
      window.createCategoryToastId = toast.loading("Creating category...", {
        description: "Please wait while we create the category.",
      });
    },
    onSuccess: () => {
      toast.dismiss(window.createCategoryToastId);
      toast.success("Create success", {
        description: "Category created successfully",
      });
      queryClient.invalidateQueries({ queryKey: ["project-categories"] });
    },
    onError: () => {
      toast.dismiss(window.createCategoryToastId);
      toast.error("Create failed", {
        description: "Failed to create category",
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => deleteProjectCategory(id),
    onSuccess: () => {
      toast.success("Delete success", {
        description: "Category deleted successfully",
      });
      queryClient.invalidateQueries({ queryKey: ["project-categories"] });
    },
    onError: () => {
      toast.error("Delete failed", {
        description: "Failed to delete category",
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, category }) => updateProjectCategory(id, category),
    onSuccess: () => {
      toast.success("Update success", {
        description: "Category updated successfully",
      });
      queryClient.invalidateQueries({ queryKey: ["project-categories"] });
    },
    onError: () => {
      toast.error("Update failed", {
        description: "Failed to update category",
      });
    },
  });

  // fetch data
  const { data, isLoading, isError } = useQuery({
    queryKey: ["project-categories", page, pageSize],
    queryFn: () => fetchPaginatedProjectCategoriesWithCount(page, pageSize),
  });

  // React.useEffect(() => {
  //   console.log(data);
  // }, [data]);

  const totalPages = Math.ceil(data?.count / pageSize || 1);

  const onDeleteCategory = async (id) => {
    const confirmed = confirm(
      "Are you sure to delete this category? Action cannot be undone."
    );
    if (!confirmed) return;

    try {
      await deleteMutation.mutateAsync(id);
    } catch (error) {
      console.error("Error deleting category:", error);
      toast.error("Failed to delete category", {
        description: "Please try again later.",
      });
    }
  };

  const onUpdateCategory = async (id, category) => {
    updateMutation.mutate({ id, category });
  };

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
                  onDeleteCategory={onDeleteCategory}
                  onUpdateCategory={onUpdateCategory}
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
    return <Loader content="Loading project categories..." />;
  }

  if (isError) {
    return <Error />;
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
            <AddDialog createMutation={createMutation} />
            <PageSizeSelect pageSize={pageSize} setPageSize={setPageSize} />
          </DataTableHeader>
        }
      />
      <TablePagination page={page} setPage={setPage} totalPages={totalPages} />
    </>
  );
}

export default Table;

const AddDialog = ({ createMutation }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size={"icon"} variant="outline" className={"shrink-0"}>
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
  );
};

const PageSizeSelect = ({ pageSize, setPageSize }) => {
  return (
    <div className="flex items-center gap-4 w-full justify-end">
      <span className="text-sm text-muted-foreground">Items per page:</span>
      <Select value={pageSize} onValueChange={setPageSize} id="pageSize">
        <SelectTrigger className="w-[80px]">
          <SelectValue placeholder={`Items per page`} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {[1, 6, 12, 24, 36, 48].map((size, index) => (
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
