import { cn } from "@/lib/utils";

function HeaderTag({ children, className = "", lineClassName = "" }) {
  return (
    <div className={cn("flex items-center text-foreground gap-5", className)}>
      <span
        className={`w-[50px] h-[1px] bg-foreground shrink-0 ${lineClassName}`}
      ></span>
      <span className="uppercase text-base font-light tracking-[6.4px]">
        {children}
      </span>
    </div>
  );
}

export default HeaderTag;
