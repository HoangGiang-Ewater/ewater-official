"use client";

import { motion } from "motion/react";
import HeaderTag from "../reusable/HeaderTag";
import { blurSlideUp } from "@/lib/animate";

function ProjectsSectionTitle() {
  return (
    <div>
      <motion.h1
        className="uppercase absolute -rotate-90 text-stroke-1-gray text-[170px] font-bold text-transparent -left-80 top-80 hidden md:block"
        {...{
          ...blurSlideUp,
          initial: { opacity: 0, y: 100, rotate: -90 },
          whileInView: { opacity: 1, y: 0, rotate: -90 },
        }}
      >
        PROJECTS
      </motion.h1>

      <motion.div {...blurSlideUp}>
        <HeaderTag>EWATER - PROJECTS</HeaderTag>
      </motion.div>
    </div>
  );
}

export default ProjectsSectionTitle;
