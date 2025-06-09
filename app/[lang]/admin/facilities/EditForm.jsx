"use client";

import { getFacilityById } from "@/api/facilities";
import { Button } from "@/components/ui/button";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { Loader2Icon } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z.object({
  name: z
    .string()
    .min(2, "Name must have at least 2 characters!")
    .max(50, "Too long, max 50 characters!"),
  amount: z.number().gt(0, "Amount must be greater than 0").lt(1000000),
  description: z.string().max(200, "Too long, max 200 characters").optional(),
});

function EditForm({ onUpdateFacility, id, mutation }) {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      amount: "",
      description: "",
    },
  });

  // fetch facility data and set default values
  const { data, isLoading, isSuccess, isError } = useQuery({
    queryKey: ["facility", id],
    queryFn: () => getFacilityById(id),
  });

  React.useEffect(() => {
    if (isSuccess) {
      form.setValue("name", data?.data?.name);
      form.setValue("amount", data?.data?.amount || "");
      form.setValue("description", data?.data?.description || "");
    }

    if (isError) {
      toast.error("Error fetching facility", {
        description: "Please try again later.",
      });
    }
  }, [isSuccess, isError, data]);

  async function onSubmit(facility) {
    // console.log("facility: ", facility);
    // console.log("data: ", data?.data);

    if (!id) {
      toast.error("Error", {
        description: "Facility ID is missing.",
      });
      return;
    }

    if (
      facility.name === data?.data?.name &&
      facility.description === data?.data?.description &&
      facility.amount === data?.data?.amount
    ) {
      toast.error("No changes made", {
        description: "Please make some changes before submitting.",
      });
      return;
    }

    await onUpdateFacility(id, facility);
  }

  React.useEffect(() => {
    if (mutation?.isPending) {
      toast.loading("Updating facility...", {
        description: "Please wait a moment.",
      });
    }

    if (mutation?.isError) {
      toast.loading("Somethings went wrong!", {
        description: mutation.error.message,
      });
    }

    if (mutation?.isSuccess && !mutation?.isPending) {
      toast.loading("Facility updated!", {
        description: "You can create more facilities.",
      });

      mutation.reset();
    }
  }, [mutation?.isPending, mutation?.isError, mutation?.isSuccess]);

  return (
    <Form {...form}>
      {isLoading && (
        <div className="fixed inset-0 z-[100] bg-black/10 blur-md flex items-center justify-center w-full h-full">
          <Skeleton className="h-4 w-4 animate-spin" />
        </div>
      )}
      {isSuccess && (
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 grid gap-4 py-4"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <div className="grid grid-cols-4 items-center gap-4">
                  <FormLabel htmlFor="name" className="text-right">
                    Name
                  </FormLabel>
                  <div className="col-span-3">
                    <FormControl>
                      <Input id="name" value="" {...field} />
                    </FormControl>
                    <FormMessage className={"mt-2"} />
                  </div>
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem>
                <div className="grid grid-cols-4 items-center gap-4">
                  <FormLabel htmlFor="amount" className="text-right">
                    Amount
                  </FormLabel>
                  <div className="col-span-3">
                    <FormControl>
                      <Input
                        id="amount"
                        type="number"
                        value={field.value}
                        {...field}
                        onChange={(e) =>
                          field.onChange(
                            e.target.value === "" ? "" : Number(e.target.value)
                          )
                        }
                      />
                    </FormControl>
                    <FormMessage className={"mt-2"} />
                  </div>
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <div className="grid grid-cols-4 items-center gap-4">
                  <FormLabel htmlFor="description" className="text-right">
                    Description
                  </FormLabel>
                  <div className="col-span-3">
                    <FormControl>
                      <Textarea id="description" value="" {...field} />
                    </FormControl>
                    <FormMessage className={"mt-2"} />
                  </div>
                </div>
              </FormItem>
            )}
          />

          <DialogFooter>
            <DialogClose asChild>
              <Button
                className={
                  "w-fit bg-red-400/10 text-red-500 hover:bg-red-400/5"
                }
              >
                Discard
              </Button>
            </DialogClose>
            <Button type="submit" className={"w-fit"}>
              {form.formState.isSubmitting ? (
                <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                "Submit"
              )}
            </Button>
          </DialogFooter>
        </form>
      )}
      {isError && (
        <div className="fixed inset-0 z-40 bg-black/10 blur-md flex items-center justify-center w-full h-full">
          <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
          <p className="text-red-500">Error fetching facility data</p>
          <p className="text-red-500">Please try again later.</p>
        </div>
      )}
    </Form>
  );
}

export default EditForm;
