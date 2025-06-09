"use client";

import React from "react";
import { motion } from "framer-motion";
import Loader from "@/app/_components/reusable/Loader";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ArrowRightIcon, Loader2Icon, XIcon } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import useContactReply from "@/hooks/useContactReply";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  deleteContactReply,
  getContactReply,
  replyContact,
} from "@/api/contactReplied";
import { sendMail } from "@/api/mail";
import { useToast } from "@/hooks/use-toast";
import { useParams } from "next/navigation";
import { updateContactStatus } from "@/api/contacts";
import { toast } from "sonner";
import ReplyItem from "./ReplyItem";

function ReplyForm({ mailForm, contactQuery, onInvalidate }) {
  const [sent, setSent] = React.useState(false);
  const [sending, setSending] = React.useState(false);
  const params = useParams();
  const { id } = params;

  const { data: replyData, isLoading: replyLoading } = useQuery({
    queryKey: ["contact-reply", id],
    queryFn: () => getContactReply(id),
    enabled: !!id,
  });

  React.useEffect(() => {
    console.log(replyData);
  }, [replyData]);

  const replyMutation = useMutation({
    mutationFn: async (data) => {
      // 1. Store reply in Supabase
      const { data: insertData, error: insertError } = await replyContact(id, {
        subject: mailForm.getValues("subject"),
        message: mailForm.getValues("reply"),
      });

      if (insertError) throw new Error(insertError.message);

      // 2. Send email via API route
      // console.log("Sending email with data:", {
      //   ...data,
      //   name: contactQuery?.data?.data.name,
      // });
      const {
        success,
        message,
        data: emailData,
      } = await sendMail({
        ...data,
        name: contactQuery?.data?.data?.name || "User",
      });

      console.log("success:", success);
      console.log("message:", message);
      console.log("emailData:", emailData);

      if (!success) {
        toast.error("Failed to send email", {
          description: message || "An error occurred while sending the email.",
        });
      } else {
        toast.success("Email sent successfully", {
          description: message || "Your reply has been sent successfully.",
        });
      }

      // 3. Update contact status
      await updateContactStatus(id, "replied");
    },
    onSuccess: () => {
      toast.success("Reply sent successfully", {
        description: "Your reply has been sent and the contact status updated.",
      });
      setSent(true);
      onInvalidate();
    },
    onError: (error) => {
      console.log(error);

      toast.error("Error sending reply", {
        description:
          error.message || "An error occurred while sending the reply.",
      });
    },
    onSettled: () => {
      setSending(false);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: () => deleteContactReply(id),
    onSuccess: () => {
      toast.success("Reply deleted successfully", {
        description: "The reply has been removed from the contact.",
      });
      setSent(false);
      onInvalidate();
    },
    onError: (error) => {
      toast.error("Error deleting reply", {
        description:
          error.message || "An error occurred while deleting the reply.",
      });
    },
  });

  const onReplySubmit = (data) => {
    setSending(true);
    replyMutation.mutate(data);
  };

  return (
    <div>
      <h3 className="text-xl font-semibold mb-2">Reply to Contact</h3>
      {replyLoading && <Loader content="Loading contact replied..." />}
      {Array.isArray(replyData) && replyData.length > 0 ? (
        <div className="grid grid-cols-2 items-center p-4 gap-4">
          {replyData.map((reply) => (
            <ReplyItem
              key={reply.id}
              reply={reply}
              deleteMutation={deleteMutation}
            />
          ))}
        </div>
      ) : (
        !replyLoading && (
          <Form {...mailForm}>
            <form
              className="space-y-4"
              onSubmit={mailForm.handleSubmit(onReplySubmit)}
            >
              <FormField
                control={mailForm.control}
                name="from"
                render={({ field }) => (
                  <FormItem className="grid w-full grid-cols-3 items-center p-4">
                    <FormLabel className={"font-semibold"} htmlFor="from">
                      From
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        id="from"
                        className="col-span-2 read-only:bg-muted/20 read-only:cursor-not-allowed focus-visible:ring-transparent"
                        // readOnly
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={mailForm.control}
                name="to"
                render={({ field }) => (
                  <FormItem className="grid w-full grid-cols-3 items-center p-4">
                    <FormLabel className={"font-semibold"} htmlFor="to">
                      To
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        id="to"
                        className="col-span-2 read-only:bg-muted/20 read-only:cursor-not-allowed focus-visible:ring-transparent"
                        // readOnlyl
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={mailForm.control}
                name="subject"
                render={({ field }) => (
                  <FormItem className="grid w-full grid-cols-3 items-center p-4">
                    <FormLabel className={"font-semibold"} htmlFor="subject">
                      Subject
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        id="subject"
                        className="col-span-2"
                        placeholder="Subject"
                        required
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={mailForm.control}
                name="reply"
                render={({ field }) => (
                  <FormItem className="grid w-full grid-cols-3 items-center p-4">
                    <FormLabel className={"font-semibold"} htmlFor="message">
                      Message
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        id="message"
                        className="col-span-2"
                        placeholder="Write your reply here..."
                        rows={6}
                        required
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-end p-4">
                <Button
                  effect="expandIcon"
                  icon={
                    sending ? (
                      <Loader2Icon className="animate-spin" />
                    ) : (
                      ArrowRightIcon
                    )
                  }
                  type="submit"
                  disabled={sending || sent}
                  className="w-fit"
                >
                  {sending ? "Sending..." : sent ? "Sent!" : "Send Reply"}
                </Button>
              </div>
            </form>
          </Form>
        )
      )}
    </div>
  );
}

export default ReplyForm;
