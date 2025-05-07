// components/LanguageSwitcher.js
"use client"; // Mark this as a Client Component

import { useCurrentLocale } from "next-i18n-router/client";
import i18nConfig from "@/i18nConfig";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import UKFlag from "@/public/langs/united-kingdom.png";
import vietnameseFlag from "@/public/langs/vietnamese.svg";
import { useRouter } from "next/navigation";
import React from "react";

export default function LanguageSwitcher() {
  const locale = useCurrentLocale(i18nConfig);
  const router = useRouter();

  const changeLanguage = (locale) => {
    router.push(`/${locale}`); // Navigate to the selected locale
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        {locale === "vi" ? (
          <Image src={vietnameseFlag} alt="Vietnamese languague" />
        ) : (
          <Image src={UKFlag} alt="English languague" className="w-[44px]" />
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={() => changeLanguage("vi")}>
          <Image src={vietnameseFlag} alt="Vietnamese languague" />
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => changeLanguage("en")}>
          <Image src={UKFlag} alt="English languague" className="w-[36px]" />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
