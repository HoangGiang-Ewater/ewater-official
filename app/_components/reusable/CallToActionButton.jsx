import { Button } from "@/components/ui/button";
import clsx from "clsx";
import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";

function CallToActionButton({
  icon,
  text = "Find out more",
  showIcon = true,
  href = "",
  className = "",
}) {
  return (
    <Button
      className={clsx(
        "uppercase bg-primary text-white mt-5 rounded-none px-5 py-4 text-md w-[200px] h-[60px]",
        className
      )}
      effect="expandIcon"
      icon={icon || ArrowRightIcon}
      iconPlacement="left"
    >
      {href ? <Link href={href}>{text}</Link> : text}
    </Button>
  );
}

export default CallToActionButton;
