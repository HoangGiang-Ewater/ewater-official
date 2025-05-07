"use client";

import { motion } from "motion/react";
import dynamic from "next/dynamic";
import ContactForm from "./ContactForm";
import { blur } from "@/lib/animate";
const ContactMap = dynamic(() => import("./ContactMap"));

function ContactSection() {
  return (
    <div className="py-16 px-5 md:px-24 lg:px-52">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16">
        <motion.div {...blur}>
          <ContactMap />
        </motion.div>
        <motion.div {...blur}>
          <ContactForm />
        </motion.div>
      </div>
    </div>
  );
}

export default ContactSection;
