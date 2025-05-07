import { cn } from "@/lib/utils";

function TextStroke({ className = "", children }) {
  return (
    <h2
      className={`${className} text-[170px] font-bold text-transparent text-stroke-1-gray`}
    >
      {children}
    </h2>
  );
}

export default TextStroke;
