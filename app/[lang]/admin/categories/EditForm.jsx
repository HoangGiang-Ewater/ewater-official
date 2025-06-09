"use client";

import { motion } from "framer-motion";
import { fetchProjectCategoryById } from "@/api/projectCategories";
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
import { IconExclamationCircle } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import { Loader2Icon, MessageCircleWarningIcon } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";

const formSchema = z.object({
  name: z
    .string()
    .min(2, "Name must have at least 2 characters!")
    .max(50, "Too long, max 50 characters!"),
  description: z.string().max(200, "Too long, max 200 characters").optional(),
});

function EditForm({ onUpdateCategory, id, mutation }) {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      amount: "",
      description: "",
    },
  });

  // fetch category data and set default values
  const { data, isLoading, isSuccess, isError } = useQuery({
    queryKey: ["category", id],
    queryFn: () => fetchProjectCategoryById(id),
  });

  React.useEffect(() => {
    if (isSuccess) {
      form.setValue("name", data?.data?.name);
      form.setValue("description", data?.data?.description || "");
      form.setValue("amount", data?.data?.amount || "");
    }

    if (isError) {
      toast.error("Error fetching category", {
        description: "Please try again later.",
      });
    }
  }, [isSuccess, isError, data]);

  async function onSubmit(category) {
    // console.log("category: ", category);
    // console.log("data: ", data?.data);

    if (!id) {
      toast.error("Error", {
        description: "Category ID is missing.",
      });
      return;
    }

    if (
      category.name === data?.data?.name &&
      category.description === data?.data?.description
    ) {
      toast.error("No changes made", {
        description: "Please make some changes to the category.",
      });
      return;
    }

    await onUpdateCategory(id, category);
  }

  return (
    <Form {...form}>
      {isSuccess ? (
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 grid gap-4 py-4 relative"
        >
          {isLoading && (
            <div className="fixed inset-0 z-40 bg-black/10 flex items-center justify-center w-full h-full">
              <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
            </div>
          )}
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
              {mutation?.isPending ? (
                <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                "Submit"
              )}
            </Button>
          </DialogFooter>
        </form>
      ) : isLoading ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="bg-black/10 flex flex-col items-center justify-center w-full h-full min-h-80"
        >
          <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
          <p className="text-muted-foreground">Loading...</p>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="bg-black/10 flex items-center justify-center w-full h-full flex-col min-h-80 gap-4"
        >
          <IconExclamationCircle className="w-8 h-8 text-red-500" />
          <p className="text-red-500">Error fetching category data</p>
          <p className="text-red-500">Please try again later.</p>
        </motion.div>
      )}
    </Form>
  );
}

export default EditForm;
