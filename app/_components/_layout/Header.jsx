"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  ArrowRightIcon,
  ChevronDown,
  HomeIcon,
  MailIcon,
  PhoneIcon,
} from "lucide-react";
import leftSidebarIcon from "@/public/icons/left-sidebar-icon.svg";
import leftSidebarIconDark from "@/public/icons/left-sidebar-icon-dark.svg";
import Image from "next/image";
import Link from "next/link";
import { ModeToggle } from "../ModeToggle";
import { Button } from "@/components/ui/button";
import LanguageSwitcher from "../LanguageSwitcher";
import Logo from "../reusable/Logo";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";

function Header({ mode }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 w-full z-[1000]">
      <TopHeader isScrolled={isScrolled} mode={mode} pathname={pathname} />
      <MainHeader isScrolled={isScrolled} mode={mode} pathname={pathname} />
    </div>
  );
}

function TopHeader({ isScrolled, mode, pathname }) {
  const items = [
    {
      icon: PhoneIcon,
      text: "028 2210 9676",
    },
    {
      icon: MailIcon,
      text: "ewater.corp@gmail.com",
    },
    {
      icon: HomeIcon,
      text: "21 Lô K, KDC Phú Nhuận, Đường 659, Phường Phước Long B, Tp. Thủ Đức, Tp.HCM",
    },
  ];

  return (
    <div
      className={cn(
        `transition-all duration-300 ease-in-out gap-14 w-full border-white bg-transparent flex items-center md:hidden xl:flex 
        ${
          isScrolled ? "opacity-0 h-0" : "opacity-100 h-auto px-8 py-3 border-b"
        }`
      )}
    >
      <div className={cn("flex items-center overflow-x-auto")}>
        {items.map((item, index) => (
          <div
            key={index}
            className={cn("flex items-center mr-4 min-w-fit overflow-hidden", {
              "text-white": isScrolled || pathname === "/",
              "text-gray-800":
                !isScrolled && pathname !== "/" && mode === "light",
            })}
          >
            <item.icon className="w-4 h-4" />
            <span className="ml-2 block min-w-fit">{item.text}</span>
          </div>
        ))}
      </div>
      <div className="w-full flex-1 justify-end flex items-center gap-5">
        <ModeToggle isScrolled={isScrolled} pathname={pathname} mode={mode} />
        <LanguageSwitcher />
      </div>
    </div>
  );
}

function MainHeader({ isScrolled, mode, pathname }) {
  const { theme } = useTheme();

  const navItems = [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Projects",
      href: "/projects",
    },
    {
      label: "Fields",
      href: "/fields-of-operation",
    },
    {
      label: "About Us",
      href: "/about-us",
    },
  ];

  const dropdownItems = [
    {
      label: "Facilities",
      href: "/facilities",
    },
    {
      label: "Our Images",
      href: "/our-images",
    },
    {
      label: "Organization Chart",
      href: "/organization-chart",
    },
  ];

  const drawerItems = [
    {
      label: "Fields",
      href: "/fields-of-operation",
    },
    {
      label: "Equipments",
      href: "/equipments",
    },
    {
      label: "Services",
      href: "/services",
    },
    {
      label: "Gallery",
      href: "/gallery",
    },
    {
      label: "News",
      href: "/news",
    },
  ];

  return (
    <div
      className={`${
        isScrolled
          ? "bg-black/20 backdrop-blur-md shadow-md py-2"
          : "bg-transparent py-3"
      } transition-all duration-300 ease-in-out flex justify-between px-8`}
    >
      <Logo mode={isScrolled || pathname === "/" ? "dark" : theme} />
      <nav
        className={cn(
          {
            "text-white": isScrolled || pathname === "/", // Always white on home page or when scrolled
            "text-gray-800":
              !isScrolled && pathname !== "/" && mode === "light", // Dark gray on other pages when not scrolled
          },
          "justify-center items-center gap-8 flex-1",
          "hidden sm:hidden md:hidden", // Hide on sm and md screens
          "lg:flex", // Show on lg screens
          "xl:flex" // Show on xl screens
        )}
      >
        {navItems.map((item, index) => (
          <Link
            key={index}
            href={item.href}
            className={`${
              pathname === item.href
                ? "underline underline-offset-2 text-primary font-semibold "
                : "hover:underline"
            } h-full flex items-center`}
          >
            {item.label}
          </Link>
        ))}

        <DropdownMenu>
          <DropdownMenuTrigger>
            <div className="flex items-center gap-2">
              More <ChevronDown />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="z-[3000]">
            {dropdownItems.map((item, index) => (
              <Link key={index} href={item.href}>
                <DropdownMenuItem className="hover:underline">
                  {item.label}
                </DropdownMenuItem>
              </Link>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </nav>
      <nav
        className={cn("flex gap-8 items-center", {
          "text-white": isScrolled || pathname === "/",
          "text-gray-800": !isScrolled && pathname !== "/" && mode === "light",
        })}
      >
        <Link href={"/contact-us"} className="uppercase hover:underline">
          CONTACT US
        </Link>
        {isScrolled && <ModeToggle />}
        <Sheet>
          <SheetTrigger>
            <Image
              src={
                isScrolled || pathname === "/" || theme === "dark"
                  ? leftSidebarIcon
                  : leftSidebarIconDark
              }
              alt="sidebar toggle"
              width={24}
              height={24}
              className="cursor-pointer"
            />
          </SheetTrigger>
          <SheetContent className="z-[3000]">
            <SheetHeader className={"hidden"}>
              <SheetTitle>Menu</SheetTitle>
              <SheetDescription>Explore our website</SheetDescription>
            </SheetHeader>
            <div className="flex-center h-full">
              <nav className="flex flex-col w-full">
                {drawerItems.map((item, index) => (
                  <Link
                    key={index}
                    href={item.href}
                    className="hover:underline px-3 py-6 text-primary text-2xl border-b border-primary/15"
                  >
                    {item.label}
                  </Link>
                ))}
                <Link href={"/contact-us"}>
                  <Button
                    className={"mt-8 w-full"}
                    effect="expandIcon"
                    icon={ArrowRightIcon}
                    iconPlacement="right"
                  >
                    Contact Us
                  </Button>
                </Link>
              </nav>
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </div>
  );
}

export default Header;
