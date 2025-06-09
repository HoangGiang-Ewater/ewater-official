"use client";

import { fetchProjectCategories } from "@/api/projectCategories";
import { createProject } from "@/api/projects";
import TextEditor from "@/app/_components/reusable/text-editor/TextEditor";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { FileUpload } from "@/components/ui/file-upload";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { format, set } from "date-fns";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z.object({
  title: z.string().min(2, "Title must have at least 2 characters!"),
  "id-category": z.string().min(2, "Select a category!"),
  investor: z.string().min(2, "Enter investor name!"),
  budget: z.string().min(2, "Enter budget!"),
  location: z.string().min(2, "Enter location!"),
  date: z.string().regex(/^\d{2}-\d{4}$/, "Please select a month and year!"),
});

export default function CreatePost() {
  const [content, setContent] = React.useState(``);
  const [file, setFile] = React.useState(null);
  const [uploading, setUploading] = React.useState(false);
  const [uploadedUrl, setUploadedUrl] = React.useState("");

  const createMutation = useMutation({
    mutationKey: ["projects"],
    mutationFn: async (project) => createProject(project),
    onSuccess: (data) => {
      // console.log(data);

      toast.success("Success", {
        description: "Project created successfully.",
      });

      setContent(``);
      form.reset({
        title: "",
        "id-category": "",
        investor: "",
        budget: "",
        location: "",
        date: undefined,
      });
    },

    onError: () => {
      toast.error("Error", {
        description: "Failed to create project.",
      });
    },
  });

  const { data, isLoading, isSuccess, isError } = useQuery({
    queryKey: ["categories"],
    queryFn: () => fetchProjectCategories(),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      category: "",
      investor: "",
      budget: "",
      location: "",
      date: undefined,
    },
  });

  async function onSubmit(projectDetail) {
    if (!content) {
      toast.error("Error", {
        description: "Please enter content for the project.",
      });
      return;
    }

    // Convert MM-YYYY to YYYY-MM-01 for Supabase
    let supabaseDate = null;
    if (projectDetail.date) {
      const [month, year] = projectDetail.date.split("-");
      supabaseDate = `${year}-${month}-01`;
    }

    const category = data?.data.find((category) => {
      return category.name === projectDetail["id-category"];
    });

    // console.log("category: ", category);

    const project = {
      ...projectDetail,
      "id-category": category?.id,
      content: content,
      date: supabaseDate,
      thumbnail: uploadedUrl,
    };

    createMutation.mutate(project);
  }

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4 max-w-4xl mx-auto py-4"
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <div className="grid grid-cols-4 items-center gap-4">
                  <FormLabel htmlFor="title" className="text-left">
                    Name
                  </FormLabel>
                  <div className="col-span-3">
                    <FormControl>
                      <Input id="title" value="" {...field} />
                    </FormControl>
                    <FormMessage className={"mt-2"} />
                  </div>
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="id-category"
            render={({ field }) => (
              <FormItem>
                <div className="grid grid-cols-4 items-center gap-4">
                  <FormLabel htmlFor="id-category" className="text-left">
                    Category
                  </FormLabel>
                  <div className="col-span-3">
                    <FormControl>
                      {isLoading ? (
                        <Select disabled>
                          <SelectTrigger className="w-[220px]">
                            <SelectValue placeholder="Loading..." />
                          </SelectTrigger>
                        </Select>
                      ) : (
                        <Select onValueChange={field.onChange}>
                          <SelectTrigger className="w-[220px]">
                            <SelectValue placeholder="Select a category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              {data?.data.map((category) => (
                                <SelectItem
                                  key={category.id + category.name}
                                  value={category.name}
                                >
                                  {category.name}
                                </SelectItem>
                              ))}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      )}
                    </FormControl>
                    <FormMessage className={"mt-2"} />
                  </div>
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="investor"
            render={({ field }) => (
              <FormItem>
                <div className="grid grid-cols-4 items-center gap-4">
                  <FormLabel htmlFor="investor" className="text-left">
                    Investor
                  </FormLabel>
                  <div className="col-span-3">
                    <FormControl>
                      <Input id="investor" value="" {...field} />
                    </FormControl>
                    <FormMessage className={"mt-2"} />
                  </div>
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="budget"
            render={({ field }) => (
              <FormItem>
                <div className="grid grid-cols-4 items-center gap-4">
                  <FormLabel htmlFor="budget" className="text-left">
                    Budget
                  </FormLabel>
                  <div className="col-span-3">
                    <FormControl>
                      <Input id="budget" value="" {...field} />
                    </FormControl>
                    <FormMessage className={"mt-2"} />
                  </div>
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <div className="grid grid-cols-4 items-center gap-4">
                  <FormLabel htmlFor="location" className="text-left">
                    Location
                  </FormLabel>
                  <div className="col-span-3">
                    <FormControl>
                      <Input id="location" value="" {...field} />
                    </FormControl>
                    <FormMessage className={"mt-2"} />
                  </div>
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem>
                <div className="grid grid-cols-4 items-center gap-4">
                  <FormLabel htmlFor="date" className="text-left">
                    Date
                  </FormLabel>
                  <div className="col-span-3">
                    <FormControl>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            type="button"
                            variant="outline"
                            className={cn(
                              "w-[220px] justify-start text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              typeof field.value === "string" ? (
                                field.value
                              ) : (
                                format(field.value, "MM-yyyy")
                              )
                            ) : (
                              <span>Pick a date</span>
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={
                              field.value
                                ? new Date(`01-${field.value}`) // MM-YYYY to Date
                                : undefined
                            }
                            onSelect={(date) => {
                              if (date) {
                                field.onChange(format(date, "MM-yyyy")); // <-- convert to string
                              }
                            }}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </FormControl>
                    <FormMessage className={"mt-2"} />
                  </div>
                </div>
              </FormItem>
            )}
          />

          <FileUpload
            label={"Upload project's banner"}
            file={file}
            uploading={uploading}
            uploadedUrl={uploadedUrl}
            setFile={setFile}
            setUploading={setUploading}
            setUploadedUrl={setUploadedUrl}
          />

          <TextEditor
            content={content}
            onChange={(html) => setContent(html)}
            title={"Create new project post"}
            onSubmit={onSubmit}
          />
        </form>
      </Form>
    </>
  );
}
