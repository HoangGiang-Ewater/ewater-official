"use client";

import Image from "next/image";
import CallToActionButton from "../reusable/CallToActionButton";
import HeaderTag from "../reusable/HeaderTag";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";

function AboutUs() {
  return (
    <div className={cn("grid grid-cols-1", "md:grid-cols-2")}>
      <motion.div
        className="relative h-[600px] w-full overflow-hidden"
        initial={{
          scale: 0.8,
          radius: 12,
          rotate: -30,
          filter: "blur(10px)",
        }}
        whileInView={{
          scale: 1,
          radius: 0,
          rotate: 0,
          filter: "blur(0)",
        }}
        transition={{
          duration: 0.8,
          ease: [0, 0.71, 0.2, 1.01],
          delay: 0.3,
          when: "beforeChildren",
        }}
        viewport={{ once: true }}
      >
        <Image
          src="/images/about-us-banner.jpg"
          alt="About Us"
          fill
          sizes="(min-width: 1024px) 1024px, 100vw"
          className="object-cover rounded-md"
        />
      </motion.div>
      <div className="p-12">
        <div className="w-full flex flex-col max-w-[500px]">
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <HeaderTag>EWATER - TÀI NGUYÊN NƯỚC</HeaderTag>
          </motion.div>

          <motion.h2
            className="text-2xl font-semibold leading-10 mt-8"
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            viewport={{ once: true }}
          >
            NƯỚC LÀ NGUỒN SỐNG, LÀ TÀI NGUYÊN THIẾT YẾU CỦA CON NGƯỜI
          </motion.h2>

          <motion.p
            className="text-base mt-8"
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            viewport={{ once: true }}
          >
            It amet consectetur adipiscing elit duis tristique. Nulla aliquet
            enim tortor at. Eget nulla facilisi etiam sumitut est dignissim diam
            quis. Varius duis at consecteturer lorem. Quis varius quam quisque
            id diam vitae turpis.
          </motion.p>
          <motion.p
            className="text-base mt-8"
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            viewport={{ once: true }}
          >
            Turpis egestas pretium aenean pharetra magna ac placerat amet. Sit
            amet luctus venenatis lectus magna fringilla urna quis blandit
            turpis cursus cras. 
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            viewport={{ once: true }}
          >
            <CallToActionButton text="Find out more" className="mt-8" />
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
