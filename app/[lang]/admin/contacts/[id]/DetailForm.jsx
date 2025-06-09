"use client";

import { getContactById } from "@/api/contacts";

import { zodResolver } from "@hookform/resolvers/zod";
import { Separator } from "@radix-ui/react-separator";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import ContactDetailForm from "./ContactDetailForm";
import ReplyForm from "./ReplyForm";

const mailFormSchema = z.object({
  from: z.string().email("Invalid email address!"),
  to: z.string().email("Invalid email address!"),
  subject: z.string().min(2, "Subject must have at least 2 characters!"),
  reply: z.string().min(5, "Reply must have at least 5 characters!"),
});

const detailFormSchema = z.object({
  notes: z.string().optional(),
  status: z.enum(["new", "replied", "archived"], {
    errorMap: () => ({ message: "Please select a valid status!" }),
  }),
});

function DetailForm() {
  const params = useParams();
  const { id } = params;

  const queryClient = useQueryClient();

  if (!id) {
    return <p>No contact ID provided.</p>;
  }

  const contactQuery = useQuery({
    queryKey: ["contact", id],
    queryFn: () => getContactById(id),
    enabled: !!id,
    refetchOnWindowFocus: false,
  });

  const mailForm = useForm({
    resolver: zodResolver(mailFormSchema),
    defaultValues: {
      from: "hohoanggiang80@gmail.com" || "",
      to: "",
      subject: "",
      reply: "",
    },
  });

  const detailForm = useForm({
    resolver: zodResolver(detailFormSchema),
    defaultValues: {
      notes: "",
      status: "",
    },
  });

  const invalidateQueries = () => {
    queryClient.invalidateQueries(["contact", id]);
    queryClient.invalidateQueries(["contact-reply", id]);
  };

  React.useEffect(() => {
    if (contactQuery?.data) {
      mailForm.reset({
        from: "hohoanggiang80@gmail.com",
        to: "",
      });
    }
  }, [contactQuery?.data, mailForm]);

  return (
    <div className="rounded-lg">
      <ContactDetailForm
        contactQuery={contactQuery}
        detailForm={detailForm}
        onInvalidate={invalidateQueries}
      />
      <Separator className="my-6 bg-border h-[1px]" />
      <ReplyForm
        mailForm={mailForm}
        contactQuery={contactQuery}
        onInvalidate={invalidateQueries}
      />
    </div>
  );
}

export default DetailForm;
