"use client";

import GoesOutComesInUnderline from "@/fancy/components/text/underline-goes-out-comes-in";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";

function Overview() {
  const data = [
    {
      id: 1,
      title: "TƯ VẤN ĐẤU THẦU - LẬP DỰ ÁN ĐẦU TƯ",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum, fuga nostrum officia quia eligen",
    },
    {
      id: 2,
      title: "TƯ VẤN THIẾT KẾ CÔNG TRÌNH DÂN DỤNG & THỦY LỢI",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum, fuga nostrum officia quia eligen",
    },
    {
      id: 3,
      title: "TƯ VẤN QUẢN LÝ VỀ TÀI NGUYÊN NƯỚC VÀ MÔI TRƯỜNG",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum, fuga nostrum officia quia eligen",
    },
    {
      id: 4,
      title: "KHOA HỌC VÀ KỸ THUẬT VỀ TÀI NGUYÊN NƯỚC VÀ MÔI TRƯỜNG",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum, fuga nostrum officia quia eligen",
    },
  ];

  return (
    <div className="w-full h-screen relative overflow-hidden">
      {/* Full screen banner */}
      <Image
        src="/images/overview-banner.jpg"
        fill
        objectFit="cover"
        alt="overview"
      />

      {/* Content */}
      <motion.div
        initial={{
          opacity: 0,
          filter: "blur(10px)",
        }}
        whileInView={{
          opacity: 1,
          filter: "blur(0px)",
        }}
        transition={{
          duration: 1,
          ease: "easeInOut",
        }}
        viewport={{ margin: "0px -600px 0px 0px", once: true }}
        className="absolute inset-0 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
      >
        {data.map((item) => (
          <motion.div
            initial={{
              opacity: 0,
              y: 100,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.5,
              ease: "easeInOut",
              delay: 0.3 * item.id,
            }}
            viewport={{ margin: "0px 100px 0px 0px", once: true }}
            key={item.id + item.title}
            className="relative p-6 flex flex-col justify-end h-full border-r-2 border-gray-200 group text-white"
            whileHover="hover"
          >
            {/* Background overlay */}
            <motion.span
              className="absolute inset-0 bg-black/60"
              variants={{
                initial: { scaleX: 0, originX: 1 }, // Start from the right
                hover: { scaleX: 1, originX: 1 }, // Expand to fill the parent
              }}
              transition={{
                duration: 0.3,
                ease: "easeInOut",
              }}
              layout
            ></motion.span>

            <h2 className="font-bold text-xl uppercase relative z-10">
              {item.title}
            </h2>
            <motion.p
              className="mt-4 overflow-hidden relative z-10"
              variants={{
                initial: { height: 0, opacity: 0 },
                hover: { height: "auto", opacity: 1 },
              }}
              transition={{ duration: 0.3 }}
            >
              {item.description}
            </motion.p>
            <Link href={"/"} className={"mt-4 p-0 w-fit relative z-10"}>
              <GoesOutComesInUnderline label={"Find out more"} />
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

export default Overview;
