"use client";

import { motion } from "motion/react";
import CallToActionButton from "../reusable/CallToActionButton";
import CustomImage from "../reusable/CustomImage";
import HeaderTag from "../reusable/HeaderTag";
import { blur, blurSlideUp } from "@/lib/animate";

function FeatureProject() {
  return (
    <div className="py-8 px-5 md:py-16 md:px-16 xl:px-52">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 max-w-5xl mx-auto">
        <motion.div className="" role="content" {...blur}>
          <HeaderTag>EWATER - DỰ ÁN NỔI BẬT</HeaderTag>
          <motion.h2 className="text-4xl font-bold mt-8" role="title">
            Lập quy hoạch vùng Đồng bằng sông Cửu Long, giai đoạn 2021 – 2030,
            tầm nhìn đến năm 2050
          </motion.h2>
          <motion.p className="text-base mt-8" role="description">
            {/* Nội dung chính bao gồm: (i) Dữ liệu GIS không gian trên các cấu trúc
            và đối tượng hiện có. (ii) Dữ liệu GIS không gian (Khí tượng, thủy
            văn và chất lượng nước) trên các cấu trúc và đối tượng quy hoạch đến
            năm 2025, 2030 và 2050. (iii) Điều kiện hiện tại và quá khứ như đã
            biết qua các nghiên cứu khảo sát đo lường trước đó. (iv) Điều kiện
            hiện trạng được mô phỏng theo các mô hình thủy văn và thủy động lực
            hiện tại. (v) Dự đoán trong tương lai cho năm 2030 và 2050 sử dụng
            các mô hình thủy văn và thủy động lực hiện có. */}

            {"Nội dung chính bao gồm: (i) Dữ liệu GIS không gian trên các cấu trúc và đối tượng hiện có. (ii) Dữ liệu GIS không gian (Khí tượng, thủy văn và chất lượng nước) trên các cấu trúc và đối tượng quy hoạch đến năm 2025, 2030 và 2050. (iii) Điều kiện hiện tại và quá khứ như đã biết qua các nghiên cứu khảo sát đo lường trước đó. (iv) Điều kiện hiện trạng được mô phỏng theo các mô hình thủy văn và thủy động lực hiện tại. (v) Dự đoán trong tương lai cho năm 2030 và 2050 sử dụng các mô hình thủy văn và thủy động lực hiện có."
              .split(/(?=\(\w+\))/g)
              .map((text, index) => {
                return (
                  <span key={index} className="block mt-3">
                    {text}
                  </span>
                );
              })}
          </motion.p>
          <p className="text-base mt-8">
            Điều tra, thu thập và đánh giá dữ liệu, đánh giá, kiểm tra, xây dựng
            bộ cơ sở dữ liệu.
          </p>
          <CallToActionButton className="mt-8"></CallToActionButton>
        </motion.div>

        <motion.div
          {...blur}
          className="flex flex-col items-center gap-3"
          role="banner-wrapper"
        >
          <div className="relative flex-1 w-full min-h-[600px]" role="banner">
            <CustomImage
              src={"/images/feature-project-placeholder.png"}
              alt="feature project banner"
            />
          </div>
          <span role="banner-title" className="text-center text-sm">
            Lorem ipsum dolor sit amet consectetur adipisicing elit
          </span>
        </motion.div>
      </div>
    </div>
  );
}

export default FeatureProject;
