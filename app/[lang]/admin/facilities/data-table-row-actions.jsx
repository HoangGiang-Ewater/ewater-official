"use client";

import EditForm from "@/app/[lang]/admin/facilities/EditForm";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { SquarePen, Trash2 } from "lucide-react";

export function DataTableRowActions({
  row,
  onDeleteFacility,
  onUpdateFacility,
  mutation,
}) {
  const { id } = row.original;
  return (
    <div className="flex items-center space-x-2">
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="ghost" size="icon">
            <SquarePen />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogTitle>Edit Category</DialogTitle>
          <EditForm
            id={id}
            onUpdateFacility={onUpdateFacility}
            mutation={mutation}
          />
        </DialogContent>
      </Dialog>
      <Separator
        orientation="vertical"
        className={"h-[20px] w-[1px] bg-slate-600"}
      />
      <Button
        variant={"ghost"}
        size={"icon"}
        onClick={() => onDeleteFacility(id)}
      >
        <Trash2 className="h-4 w-4 text-red-500" />
      </Button>
    </div>
  );
}
