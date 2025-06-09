"use client";

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
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
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
  amount: z
    .string()
    .min(1, "Amount must have at least 1 character!")
    .max(50, "Too long, max 50 characters!"),
  description: z.string().max(200, "Too long, max 200 characters").optional(),
});

function AddForm({ mutation }) {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      amount: "",
      description: "",
    },
  });

  async function onSubmit(facility) {
    mutation?.mutate(facility);
  }

  React.useEffect(() => {
    if (mutation?.isPending) {
      toast.loading("Creating facility...", {
        description: "Please wait a moment.",
      });
    }

    if (mutation?.isError) {
      toast.error("Somethings went wrong!", {
        description: mutation.error.message,
      });
    }

    if (mutation?.isSuccess && !mutation?.isPending) {
      form.reset();

      toast.success("Facility created!", {
        description: "You can create more facilities.",
      });

      mutation.reset();
    }
  }, [mutation?.isPending, mutation?.isError, mutation?.isSuccess]);

  return (
    <Form {...form}>
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
                    <Input id="amount" value="" {...field} />
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
                <FormLabel htmlFor="name" className="text-right">
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
              className={"w-fit bg-red-400/10 text-red-500 hover:bg-red-400/5"}
            >
              Discard
            </Button>
          </DialogClose>
          <Button type="submit" className={"w-fit"}>
            {mutation?.isPending ? (
              <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
            ) : null}
            Submit
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
}

export default AddForm;
