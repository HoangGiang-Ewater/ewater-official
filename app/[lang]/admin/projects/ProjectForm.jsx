"use client";

import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { FileUpload } from "@/components/ui/file-upload";
import React from "react";

const formSchema = z.object({
  title: z.string().min(2).max(255),
  description: z.string().min(2).max(5000),
  slug: z.string().min(2).max(255),
  "id-category": z.string().min(2).max(255),
  investor: z.string().min(2).max(255),
  budget: z.string().min(2).max(255),
  location: z.string().min(2).max(255),
});

function ProjectForm() {
  const [files, setFiles] = React.useState([]);
  const handleFileUpload = (files) => {
    setFiles(files);
    // console.log(files);
  };

  // 1. Define your form.
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      slug: "",
      "id-category": "",
      investor: "",
      budget: "",
      location: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  const formFields = [
    {
      name: "title",
      label: "Title",
      placeholder: "Project Title",
      type: "text",
    },
    {
      name: "description",
      label: "Description",
      placeholder: "Project Description",
      type: "textarea",
    },
    {
      name: "id-category",
      label: "Category",
      placeholder: "Project Category",
      type: "select",
    },
    {
      name: "investor",
      label: "Investor",
      placeholder: "Investor Name",
      type: "text",
    },
    {
      name: "budget",
      label: "Budget",
      placeholder: "Project Budget",
      type: "number",
    },
    {
      name: "location",
      label: "Location",
      placeholder: "Project Location",
      type: "text",
    },
  ];

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-12 max-w-3xl mx-auto"
      >
        {formFields.map((field) => (
          <FormField
            key={field.name}
            control={form.control}
            name={field.name}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{field.label}</FormLabel>
                <FormControl>
                  {field.type === "textarea" ? (
                    <textarea
                      {...field}
                      placeholder={field.placeholder}
                      className="w-full border rounded-md p-2"
                    />
                  ) : field.type === "select" ? (
                    <select {...field} className="w-full border rounded-md p-2">
                      <option value="">Select Category</option>
                    </select>
                  ) : (
                    <Input
                      {...field}
                      placeholder={field.placeholder}
                      type={field.type}
                    />
                  )}
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}
        <FileUpload onChange={handleFileUpload} />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}

export default ProjectForm;
