"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import React from "react";

function Features() {
  const items = React.useMemo(
    () => [
      {
        id: 1,
        num: "01",
        title: "Tư vấn",
        content: "Cung cấp dịch vụ tư vấn các vấn đề về tài nguyên nước",
      },
      {
        id: 2,
        num: "02",
        title: "Tài nguyên nước",
        content: "Lĩnh vực hoạt động chính của công ty",
      },
      {
        id: 3,
        num: "03",
        title: "Quy trình vận hành",
        content: "Xây dựng quy trình vận hành cho các công trình thủy lợi",
      },
      {
        id: 4,
        num: "04",
        title: "Kinh nghiệm",
        content: "Đội ngũ kỹ sư giàu kinh nghiệm kinh qua nhiều dự án quy mô",
      },
    ],
    []
  );

  const container = {
    hidden: { opacity: 0, filter: "blur(10px)", y: 100 },
    show: {
      opacity: 1,
      filter: "blur(0)",
      y: 0,
      transition: {
        duration: 0.8,
        staggerChildren: 0.5,
        ease: "easeInOut",
        delayChildren: 0.3,
        delay: 0.3,
      },
    },
  };

  const itemAnimate = {
    hidden: { opacity: 0, filter: "blur(10)", y: 100 },
    show: { opacity: 1, filter: "blur(0)", y: 0 },
  };

  return (
    <div className="p-16 flex flex-center">
      <motion.div
        variants={container}
        viewport={{ once: true }}
        initial="hidden"
        whileInView="show"
        className={cn(
          "flex flex-wrap justify-center items-center gap-8 space-x-16 w-full mt-[100px]",
          "md:justify-between"
        )}
      >
        {items.map((item, index) => (
          <motion.div
            variants={itemAnimate}
            viewport={{ once: true }}
            key={item.id}
            className={cn("relative", index != 0 && "translate-x-[-60px]")}
            role={`feature-${item.id}`}
          >
            <h2 className="text-[170px] font-bold text-stroke-1-gray text-transparent">
              {item.num}
            </h2>
            <div className="max-w-[250px] translate-x-[20%] translate-y-[-120%] ">
              <div className="text-lg font-bold">{item.title}</div>
              <div>{item.content}</div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

export default Features;
