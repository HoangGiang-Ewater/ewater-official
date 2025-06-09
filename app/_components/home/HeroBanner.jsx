"use client";

import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import ComesInGoesOutUnderline from "@/fancy/components/text/underline-comes-in-goes-out";
import { blurSlideUp } from "@/lib/animate";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import CallToActionButton from "../reusable/CallToActionButton";
import { useQuery } from "@tanstack/react-query";
import { getHeroVideoUrl } from "@/api/media";

function HeroBanner() {
  const heroVideoUrl = getHeroVideoUrl();

  return (
    <div className="relative">
      <motion.video
        src={heroVideoUrl}
        className="w-full h-screen object-cover"
        autoPlay
        loop
        muted
        initial={{
          filter: "blur(10px)",
        }}
        whileInView={{
          filter: "blur(0)",
        }}
        transition={{
          delay: 0.3,
        }}
      />

      <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center">
        <HeroText />

        <HeroInfoBoxes />
      </div>
    </div>
  );
}

export default HeroBanner;

function HeroText() {
  const words =
    "Strive to create modern solutions for preserving natural resources and nature";

  return (
    <motion.div
      {...blurSlideUp}
      className={cn("max-w-[90%] mb-28", "md:max-w-[80%]")}
    >
      <h4 className="flex items-center gap-3">
        <span className="w-[80px] h-[1px] bg-white"></span>
        <span className="text-white font-light uppercase">EWATER</span>
      </h4>
      <TextGenerateEffect
        className={{
          text: cn(
            "text-[40px] leading-[48px] text-white font-bold",
            "md:text-[48px] md:leading-[56px]",
            "lg:text-[64px] lg:leading-[72px]"
          ),
        }}
        words={words}
      />
      <CallToActionButton className="mt-8" />
    </motion.div>
  );
}

function HeroInfoBoxes() {
  const items = [
    {
      icon: "/icons/experiences.svg",
      title: "Experience",
      description:
        "Support for water exploitation and distribution for agricultural development",
    },
    {
      icon: "/icons/partner.svg",
      title: "Partners",
      description:
        "We have collaborated with many major partners both domestically and internationally.",
    },
    {
      icon: "/icons/expert.svg",
      title: "Experts",
      description: "A team of experienced and passionate experts.",
    },
  ];

  const container = {
    hidden: { opacity: 0, filter: "blur(10px)", y: 50 },
    show: {
      opacity: 1,
      filter: "blur(0)",
      y: 0,
      transition: {
        duration: 0.8,
        staggerChildren: 0.5,
        ease: "easeInOut",
      },
    },
  };

  const itemAnimate = {
    hidden: { opacity: 0, filter: "blur(10)", y: 50 },
    show: { opacity: 1, filter: "blur(0)", y: 0 },
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="show"
      className="absolute bottom-0 left-0 right-0 flex text-white"
      viewport={{ once: true }}
    >
      {/*  */}
      {items.map((item, index) => (
        <motion.div
          variants={itemAnimate}
          viewport={{ once: true }}
          key={index}
          className={cn(
            {
              "border-r": index !== items.length - 1,
            },
            "px-8 py-8 flex flex-center border-t border-white flex-1",
            "md:px-8 md:py-8"
          )}
        >
          <div
            className={cn(
              "max-w-full flex gap-5 flex-col",
              "sm:max-w-full sm:flex-row",
              "lg:max-w-[70%]"
            )}
          >
            <motion.div className="icon relative w-[48px] h-[48px] aspect-square">
              <Image src={item.icon} alt="expert icons" fill sizes={56} />
            </motion.div>
            <div className="flex-col gap-5 min-w-0 hidden md:flex">
              <h4>{item.title}</h4>
              <p className="text-base">{item.description}</p>
              {/* <Button
                effect={"underline"}
                variant={"link"}
                className={""}
              ></Button> */}
              <Link className="" href={""}>
                <ComesInGoesOutUnderline
                  label={"Find out more"}
                  direction="left"
                  className={"text-blue-500"}
                />
              </Link>
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
