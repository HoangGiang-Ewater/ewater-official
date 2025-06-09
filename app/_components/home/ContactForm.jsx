"use client";

import { submitContactForm } from "@/api/contacts";
import HeaderTag from "@/app/_components/reusable/HeaderTag";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Loader2Icon, LoaderIcon, MailIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z.object({
  name: z
    .string({
      message: "Please enter your name!",
    })
    .min(1, { message: "Please enter your name!" })
    .max(50),
  email: z
    .string({
      message: "Please enter your email!",
    })
    .min(2, { message: "Please enter your email!" })
    .max(50)
    .email({ message: "Please enter a valid email!" }),
  message: z
    .string({
      message: "Please enter your service that you need our help",
    })
    .min(2, { message: "Please enter your service that you need our help" })
    .max(50),
});

function ContactForm() {
  // 1. Define your form.
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const submitMutation = useMutation({
    mutationKey: ["submitContactForm"],
    mutationFn: (data) => submitContactForm(data),
    onSuccess: () => {
      toast.success("Success", {
        description: "Your message has been sent successfully!",
      });
      form.reset();
    },
    onError: (error) => {
      toast.error("Error", {
        description: error.message,
      });
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values) {
    submitMutation.mutate(values);
  }

  return (
    <>
      {/* {!submitMutation.isLoading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
          <div className="relative z-10 flex flex-col items-center gap-4 text-blue-500">
            <Loader2Icon className="animate-spin w-8 h-8" />
            <span>Sending your message...</span>
          </div>
        </div>
      )} */}
      <div className="shrink-0" role="contact-form">
        <FormHeader />
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 mt-8"
          >
            <div className="flex items-center gap-5 w-full">
              <FormField
                control={form.control}
                name="name"
                className="flex-1"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormControl>
                      <Input
                        placeholder="Full name"
                        {...field}
                        className="h-11 rounded-none"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                className="flex-1"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormControl>
                      <Input
                        placeholder="Email"
                        {...field}
                        className="h-11 rounded-none"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      placeholder="Tell us what you need help with"
                      className="resize-none h-60 rounded-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="rounded-none min-w-[160px] min-h-[48px]"
              effect="gooeyRight"
              icon={() =>
                submitMutation.isLoading ? (
                  <Loader2Icon className="animate-spin" />
                ) : (
                  <MailIcon />
                )
              }
              iconPlacement="right"
              disabled={submitMutation.isLoading}
            >
              {submitMutation.isLoading ? "Sending..." : "Send now"}
            </Button>
          </form>
        </Form>
      </div>
    </>
  );
}

export default ContactForm;

function FormHeader() {
  return (
    <>
      <HeaderTag>EWATER - CONTACT US</HeaderTag>
      <h2 className="text-xl uppercase font-semibold text-foreground mt-5">
        LIÊN HỆ VỚI CHÚNG TÔI
      </h2>
      <p className="mt-5 text-base">Chúng tôi luôn sẵn lòng hỗ trợ bạn!</p>
    </>
  );
}
