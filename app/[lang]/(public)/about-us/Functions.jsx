"use client";

import HeaderTag from "@/app/_components/reusable/HeaderTag";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import React from "react";

function Functions() {
  const functions = [
    {
      title: "Tư vấn và Hỗ trợ",
      description:
        "Tư vấn để hỗ trợ khai thác và phân phối nước để phát triển nông nghiệp, nuôi trồng thủy sản và nghiên cứu, đánh giá chất lượng nước ở một số tỉnh, thành phố và lưu vực sông.",
    },
    {
      title: "Thiết lập công cụ mô phỏng",
      description:
        "Thiết lập các công cụ mô phỏng về tài nguyên nước như lũ lụt, hạn hán và xâm nhập mặn; chú trọng trong công tác phát triển dự báo về mưa, dòng chảy trong sông và các lưu vực sông.",
    },
    {
      title: "Khách hàng",
      description:
        "EWATER đã làm việc với một số khách hàng quốc gia như MONRE, MARD. Đến nay, chúng tôi cũng đã làm việc với các tổ chức quốc tế bao gồm MRC, JICA.",
    },
    {
      title: "Đội ngũ",
      description:
        "EWATER có đội ngũ nghiên cứu và tư vấn có kinh nghiệm trong việc cung cấp dịch vụ trong các lĩnh vực phát triển tài nguyên nước bao gồm hồ, đập, sông, phòng chống thiên tai, cấp và thoát nước, các hệ thống thủy lợi, quản lý chất thải và môi trường.",
    },
  ];

  const [api, setApi] = React.useState();

  return (
    <div className="max-w-5xl mx-auto py-16">
      <div className="mb-8">
        <HeaderTag className="text-foreground">EWATER - ABOUT US</HeaderTag>
        <h4 className="text-xl font-semibold uppercase mt-3">
          CHÚNG TÔI CUNG CẤP CÁC DỊCH VỤ
        </h4>
      </div>

      <Carousel role="carousel" className="mt-8" setApi={setApi}>
        <CarouselContent className="mt-8 -ml-8" role="carousel-content">
          {functions.map((item) => (
            <CarouselItem
              key={`${functions?.id} ${item?.title}`}
              className="md:basis-[300px] lg:basis-[400px] pl-8"
            >
              <div className="flex flex-col gap-8 mt-8">
                <h4 className="text-xl font-bold">{item?.title}</h4>
                <p>{item?.description}</p>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}

export default Functions;
