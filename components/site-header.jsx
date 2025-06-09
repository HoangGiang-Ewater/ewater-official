"use client";

import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { ModeToggle } from "@/app/_components/ModeToggle";

export function SiteHeader() {
  const pathname = usePathname();
  // console.log("pathname: ", pathname);
  const isRoot = pathname === "/";
  const isDashboard =
    pathname.startsWith("/admin/dashboard") ||
    pathname.startsWith("/en/admin/dashboard");
  const isAdminProjects =
    pathname.startsWith("/admin/projects") ||
    pathname.startsWith("/en/admin/projects");
  const isAdminCategories =
    pathname.startsWith("/admin/categories") ||
    pathname.startsWith("/en/admin/categories");
  const isAdminUsers =
    pathname.startsWith("/admin/users") ||
    pathname.startsWith("/en/admin/users");
  const isAdminSettings =
    pathname.startsWith("/admin/settings") ||
    pathname.startsWith("/en/admin/settings");
  const isAdminMedia =
    pathname.startsWith("/admin/media") ||
    pathname.startsWith("/en/admin/media");
  const isAdminFacilities =
    pathname.startsWith("/admin/facilities") ||
    pathname.startsWith("/en/admin/facilities");
  const isAdminContacts =
    pathname.startsWith("/admin/contacts") ||
    pathname.startsWith("/en/admin/contacts");

  return (
    <header className="group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 flex h-12 shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        <motion.h1
          initial={{ opacity: 0, filter: "blur(10px)", y: 0 }}
          animate={{ opacity: 1, filter: "blur(0px)", y: -5 }}
          className="text-base font-medium -translate-y-1"
        >
          {isRoot && "Home"}
          {isDashboard && "Dashboard"}
          {isAdminProjects && "Projects"}
          {isAdminCategories && "Categories"}
          {isAdminUsers && "Users"}
          {isAdminSettings && "Settings"}
          {isAdminMedia && "Media"}
          {isAdminFacilities && "Facilities"}
          {isAdminContacts && "Contacts"}
        </motion.h1>
      </div>
      <ModeToggle />
    </header>
  );
}
