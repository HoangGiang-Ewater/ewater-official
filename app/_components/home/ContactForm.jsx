"use client";

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
import { MailIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  fullname: z
    .string({
      message: "Please enter your name!",
    })
    .min(2, { message: "Please enter your name!" })
    .max(50),
  email: z
    .string({
      message: "Please enter your email!",
    })
    .min(2, { message: "Please enter your email!" })
    .max(50)
    .email({ message: "Please enter a valid email!" }),
  service: z
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
      fullname: "", // Change this to match your schema
      email: "", // Add this to match your schema
      service: "", // Add this to match your schema
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values) {
    console.log(values);
  }

  return (
    <div className="shrink-0" role="contact-form">
      <FormHeader />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mt-8">
          <div className="flex items-center gap-5 w-full">
            <FormField
              control={form.control}
              name="fullname"
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
            name="service"
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
            className={"rounded-none min-w-[160px] min-h-[48px]"}
            effect={"gooeyRight"}
            icon={MailIcon}
            iconPlacement={"right"}
          >
            Send now
          </Button>
        </form>
      </Form>
    </div>
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
