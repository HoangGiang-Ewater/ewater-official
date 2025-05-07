"use client";

import { motion } from "motion/react";
import Link from "next/link";
import Logo from "../reusable/Logo";
import { blur } from "@/lib/animate";

function Footer() {
  return (
    <div className="bg-[#111827]">
      <TopFooter />
      <BottomFooter />
    </div>
  );
}

export default Footer;

// TOP
function TopFooter() {
  return (
    <footer className="py-16 px-5 bg-repeat bg-[url('/backgrounds/footer-bg.svg')] bg-cover bg-center">
      <div className="max-w-5xl mx-auto">
        <div className="w-full flex flex-col md:flex-row justify-between gap-20">
          <Logo mode="dark" />
          <FooterContent />
        </div>
      </div>
    </footer>
  );
}

function FooterContent() {
  const columns = [
    {
      heading: "Trao đổi với chúng tôi",
      headLink: [
        {
          title: "ewater.corp@gmail.com",
          href: "#",
        },
        {
          title: "028 2210 9676",
          href: "#",
        },
      ],
      navItems: [
        {
          title: "Trang chủ",
          link: "/",
        },
        {
          title: "Dự án",
          link: "/projects",
        },
        {
          title: "Lĩnh vực hoạt động",
          link: "/fields",
        },
        {
          title: "Trang thiết bị",
          link: "/facilities",
        },
      ],
    },
    {
      heading: "Địa chỉ liên hệ",
      headLink: [
        {
          title:
            "21 Lô K, KDC Phú Nhuận, Đường 659, Phường Phước Long B, Tp. Thủ Đức, Tp.HCM",
          href: "#",
        },
      ],
      navItems: [
        {
          title: "Về chúng tôi",
          link: "/about-us",
        },
        {
          title: "Tin tức",
          link: "/news",
        },
        {
          title: "Đánh giá phản hồi",
          link: "/feedback",
        },
        {
          title: "Liên hệ",
          link: "/contact",
        },
      ],
    },
  ];

  return (
    <div>
      <motion.h2 className="text-2xl font-semibold text-white" {...blur}>
        Công ty Cổ phần Ewater
      </motion.h2>
      <div className="grid grid-cols-1 gap-20 md:gap-5 md:grid-cols-2 mt-20">
        {columns.map((col, index) => (
          <div className="text-foreground" key={col.heading + index}>
            <motion.h4
              {...blur}
              className="text-xl font-semibold text-gray-500"
            >
              {col.heading}
            </motion.h4>
            {col.headLink.map((item, index) => (
              <Link
                key={index + item.title + item.href}
                href={item.href}
                className="text-white block mt-3 text-xl font-semibold"
              >
                <motion.span
                  {...blur}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                >
                  {item.title}
                </motion.span>
              </Link>
            ))}

            <nav className="mt-16">
              {col.navItems.map((item, index) => (
                <Link
                  key={index + item.title + item.link}
                  href={item.link}
                  className="text-white block mt-3 underline mb-5"
                >
                  <motion.span
                    {...blur}
                    transition={{ duration: 0.5, delay: index * 0.2 }}
                  >
                    {item.title}
                  </motion.span>
                </Link>
              ))}
            </nav>
          </div>
        ))}
      </div>
    </div>
  );
}

// BOTTOM
function BottomFooter() {
  return (
    <div className="p-5 border-t border-gray-200 flex justify-between items-center">
      <motion.p className="text-white" {...blur}>
        © 2024 Ewater Tech Team. All rights reserved.
      </motion.p>
      <motion.p className="text-right text-white" {...blur}>
        Design by HoDuyHoangGiang
      </motion.p>
    </div>
  );
}
