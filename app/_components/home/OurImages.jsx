"use client";

import { motion } from "motion/react";
import HeaderTag from "../reusable/HeaderTag";
import Image from "next/image";
import { blur } from "@/lib/animate";

const image = "/about-us/image.png";
const image1 = "/about-us/image-1.png";
const image2 = "/about-us/image-2.png";
const image3 = "/about-us/image-3.png";
const image4 = "/about-us/image-4.png";
const image5 = "/about-us/image-5.png";
const image6 = "/about-us/image-6.png";
const image7 = "/about-us/image-7.png";
const image8 = "/about-us/image-8.png";
const image9 = "/about-us/image-9.png";
const image10 = "/about-us/image-10.png";

function OurImages() {
  const images = [
    image,
    image1,
    image2,
    image3,
    image4,
    image5,
    image6,
    image7,
    image8,
    image9,
    image10,
  ];

  return (
    <div className="py-8 px-5 md:py-16 md:px-16 xl:px-52">
      <div className="max-w-5xl mx-auto">
        <HeaderTag>EWATER - HÌNH ẢNH</HeaderTag>
        <h2 className="text-4xl font-semibold mt-8">
          Một số hình ảnh về chúng tôi
        </h2>
        <div className="columns-3 gap-5 mt-12">
          {images.map((image) => (
            <motion.div key={image.toString()} {...blur}>
              <Image
                src={image}
                sizes="400"
                width={300}
                height={300}
                alt="image"
                className="object-contain rounded-lg mb-5"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default OurImages;
