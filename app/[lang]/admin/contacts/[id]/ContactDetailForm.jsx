"use client";

import { updateContactDetails } from "@/api/contacts";
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
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useMutation } from "@tanstack/react-query";
import { ArrowRightIcon, Loader2Icon } from "lucide-react";
import { useParams } from "next/navigation";
import React from "react";
import { toast } from "sonner";

function ContactDetailForm({ contactQuery, detailForm, onInvalidate }) {
  const {
    data: contactData,
    isLoading: contactLoading,
    isError: contactError,
  } = contactQuery;
  const params = useParams();
  const { id } = params;

  const updateDetailMutation = useMutation({
    mutationFn: () =>
      updateContactDetails(id, {
        status: detailForm.getValues("status"),
        notes: detailForm.getValues("notes"),
      }),
    onSuccess: () => {
      onInvalidate();
      toast.success("Contact updated successfully!", {
        description: "Contact details have been updated.",
      });
    },
    onError: (error) => {
      toast.error("Failed to update contact", {
        description:
          error.message || "An error occurred while updating contact.",
      });
    },
  });

  const onUpdateSubmit = async () => {
    updateDetailMutation.mutate();
  };

  React.useEffect(() => {
    if (contactData?.data) {
      detailForm.reset({
        notes: contactData.data.notes || "",
        status: contactData.data.status || "new",
      });
    }
  }, [contactData?.data, detailForm]);

  return (
    <div className="mt-6">
      {contactLoading && <Loader content="Loading contact details..." />}
      {contactError && (
        <p className="text-red-500">
          Error loading contact: {contactError.message}
        </p>
      )}
      {contactData && (
        <Form {...detailForm}>
          <form
            onSubmit={detailForm.handleSubmit(onUpdateSubmit)}
            className="space-y-4"
          >
            <div className="grid w-full grid-cols-3 items-center p-4">
              <Label className="col-span-1 font-semibold">Fullname</Label>
              <Input
                className={
                  "col-span-2 read-only:bg-muted/20 focus-visible:ring-transparent cursor-not-allowed"
                }
                defaultValue={contactData.data.name}
                readOnly
              />
            </div>
            <div className="grid w-full grid-cols-3 items-center p-4">
              <Label className="col-span-1 font-semibold">Email</Label>
              <Input
                className={
                  "col-span-2 read-only:bg-muted/20 focus-visible:ring-transparent cursor-not-allowed"
                }
                defaultValue={contactData.data.email}
                readOnly
              />
            </div>
            <div className="grid w-full grid-cols-3 items-center p-4">
              <Label className="col-span-1 font-semibold">Message</Label>
              <Textarea
                className={
                  "col-span-2 read-only:bg-muted/20 focus-visible:ring-transparent cursor-not-allowed"
                }
                defaultValue={contactData.data.message}
                readOnly
              />
            </div>
            <div className="grid w-full grid-cols-3 items-center p-4">
              <Label className="col-span-1 font-semibold">Created at</Label>
              <Input
                className={
                  "col-span-2 read-only:bg-muted/20 focus-visible:ring-transparent cursor-not-allowed"
                }
                defaultValue={new Date(
                  contactData.data.created_at
                ).toLocaleString()}
                readOnly
              />
            </div>
            <FormField
              control={detailForm.control}
              name="notes"
              render={({ field }) => (
                <FormItem className="grid w-full grid-cols-3 items-center p-4">
                  <FormLabel className={"font-semibold"} htmlFor="notes">
                    Note
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      id="notes"
                      className="col-span-2"
                      placeholder="Optional notes for your reference..."
                      rows={6}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={detailForm.control}
              name="status"
              render={({ field }) => (
                <FormItem className="grid w-full grid-cols-3 items-center p-4">
                  <FormLabel className={"font-semibold"} htmlFor="status">
                    Status
                  </FormLabel>
                  <FormControl>
                    <Select
                      {...field}
                      value={field.value}
                      onValueChange={field.onChange}
                      id="status"
                    >
                      <SelectTrigger className="col-span-2">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem key="new" value="new">
                          New
                        </SelectItem>
                        <SelectItem key="replied" value="replied">
                          Replied
                        </SelectItem>
                        <SelectItem key="archived" value="archived">
                          Archived
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end p-4">
              <Button
                effect="expandIcon"
                icon={ArrowRightIcon}
                type="submit"
                className="w-fit"
              >
                {updateDetailMutation.isLoading ? (
                  <>
                    Updating...
                    <Loader2Icon className="animate-spin" />
                  </>
                ) : (
                  "Update Contact"
                )}
              </Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  );
}

export default ContactDetailForm;
