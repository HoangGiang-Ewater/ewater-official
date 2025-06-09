"use client";

import { fetchProjectCategories } from "@/api/projectCategories";
import { getProjectById, updateProject } from "@/api/projects";
import TextEditor from "@/app/_components/reusable/text-editor/TextEditor";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
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
import { cn, slugifyVietnamese } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { useParams } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import ProjectThumbnail from "./ProjectThumbnail";
import { toast } from "sonner";

const formSchema = z.object({
  title: z.string().min(2, "Title must have at least 2 characters!"),
  "id-category": z.string().regex(/^\d+$/, "Select a category!"),
  investor: z.string().min(2, "Enter investor name!"),
  budget: z.string().min(2, "Enter budget!"),
  location: z.string().min(2, "Enter location!"),
  date: z.string().regex(/^\d{2}-\d{4}$/, "Please select a month and year!"),
});

export default function PostDetail() {
  const [content, setContent] = React.useState(``);
  const params = useParams();
  const { lang, id } = params;
  const [file, setFile] = React.useState(null);
  const [uploadedUrl, setUploadedUrl] = React.useState("");

  const invalidateQuery = () => {
    queryClient.invalidateQueries(["project", id]);
    queryClient.invalidateQueries(["projects"]);
  };

  const updateMutation = useMutation({
    mutationKey: ["projects", id],
    mutationFn: ({ id, project }) => updateProject(id, project),
    onSuccess: () => {
      toast.success("Success", {
        description: "Project updated successfully.",
      });

      invalidateQuery();
    },
    onError: (error) => {
      toast.error("Error", {
        description: "Failed to update project.",
      });
    },
  });

  const {
    data: categoriesData,
    isLoading,
    isSuccess,
    isError,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: () => fetchProjectCategories(),
  });

  const queryClient = useQueryClient();

  const { data: projectData, status: projectStatus } = useQuery({
    queryKey: ["project", id],
    queryFn: () => {
      if (!id) {
        return null;
      }
      return getProjectById(Number(id));
    },
    enabled: !!id,
  });

  React.useEffect(() => {
    if (projectStatus === "success") {
      const project = projectData?.data;

      if (project) {
        form.reset({
          title: project.title || "",
          investor: project.investor || "",
          budget: project.budget || "",
          location: project.location || "",
          "id-category": String(project["id-category"] || ""),
          date: project.date
            ? `${String(new Date(project.date).getMonth() + 1).padStart(
                2,
                "0"
              )}-${new Date(project.date).getFullYear()}`
            : "",
        });
        setContent(project.content || "fail to load content");
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectStatus]);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      "id-category": "",
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

    const slug = slugifyVietnamese(projectDetail.title);

    const project = {
      ...projectDetail,
      "id-category": Number(projectDetail["id-category"]),
      content: content,
      slug,
      date: supabaseDate,
      thumbnail: uploadedUrl,
    };

    updateMutation.mutate({ id, project });
  }

  React.useEffect(() => {
    if (updateMutation.isError) {
      toast.error("Error", {
        description: "Failed to update project.",
      });
    }

    if (updateMutation.isSuccess) {
      toast.success("Success", {
        description: "Project updated successfully.",
      });
    }

    if (updateMutation.isLoading) {
      toast.success("Loading", {
        description: "Updating project...",
      });
    }
  }, [
    updateMutation.isSuccess,
    updateMutation.isError,
    updateMutation.isLoading,
  ]);

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
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Loading..." />
                          </SelectTrigger>
                        </Select>
                      ) : (
                        <Select
                          value={String(field.value)}
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger className="w-[220px]">
                            <SelectValue placeholder="Select a category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              {categoriesData?.data.map((category) => (
                                <SelectItem
                                  key={category.id}
                                  value={String(category.id)}
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

          <ProjectThumbnail
            projectData={projectData}
            file={file}
            setFile={setFile}
            uploadedUrl={uploadedUrl}
            setUploadedUrl={setUploadedUrl}
            invalidateQuery={invalidateQuery}
          />

          <div>
            {projectData?.data?.is_hidden ? (
              <Badge variant={"destructive"}>Hidden</Badge>
            ) : (
              <Badge variant="default">Published</Badge>
            )}
          </div>

          <TextEditor
            defaultValue={content}
            content={content}
            onChange={(html) => setContent(html)}
            onSubmit={onSubmit}
            invalidateQueries={invalidateQuery}
          />
        </form>
      </Form>
    </>
  );
}
