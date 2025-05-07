"use client";

import HeaderTag from "@/app/_components/reusable/HeaderTag";
import { Timeline } from "./Timeline";

function Milestone() {
  const timelineItems = [
    {
      date: "23 / 4 / 2015",
      description:
        "Tiền thân của Công ty là Công ty Cổ phần Đầu tư và Xây dựng Không gian (thành lập ngày 23/4/2015).",
      images: [
        "/images/timeline1.jpg",
        "/images/timeline2.jpg",
        "/images/timeline3.jpg",
      ],
    },
    {
      date: "19 / 6 / 2018",
      description:
        "Sau đó tách ra phát triển với tên gọi Công ty TNHH Tư vấn Tài nguyên nước và Môi trường Minh Long vào ngày 19/6/2018.",
      images: ["/images/timeline4.jpg", "/images/timeline5.jpg"],
    },
    {
      date: "26 / 11 / 2020",
      description:
        "Đến ngày 26/11/2020, Công ty TNHH Tư vấn Tài nguyên nước và Môi trường Minh Long chuyển đổi thành Công ty Cổ phần EWATER",
      images: [
        "/images/timeline6.jpg",
        "/images/timeline7.jpg",
        "/images/timeline8.jpg",
      ],
    },
    {
      date: "HIỆN TẠI",
      description: `Công ty cổ phần Ewater đang hoạt động tại Thành Phố Hồ Chí Minh.
MST: 0315118703
Liên hệ:
21 Lô K, KDC Phú Nhuận, Đường 659, Phường Phước Long B, Tp. Thủ Đức, Tp.HCM.
028 2210 9676
ewater.corp@gmail.com`,
      images: [
        "/images/timeline6.jpg",
        "/images/timeline7.jpg",
        "/images/timeline8.jpg",
      ],
    },
  ];

  return (
    <div className="max-w-5xl mx-auto py-16">
      <div className="mb-20">
        <HeaderTag className="text-foreground">
          EWATER - PROCCESS OF OPERATION
        </HeaderTag>
        <h4 className="text-xl font-semibold uppercase mt-3">
          QUÁ TRÌNH HÌNH THÀNH VÀ HOẠT ĐỘNG
        </h4>
      </div>
      <Timeline items={timelineItems} />
    </div>
  );
}

export default Milestone;
