import { SearchX } from "lucide-react";

export default function NotFound({
  message = "No result found.",
  className = "",
}) {
  return (
    <div
      className={`flex flex-col items-center gap-2 p-6 bg-muted border border-muted-foreground/10 text-muted-foreground rounded shadow-sm ${className}`}
      role="status"
    >
      <SearchX className="w-8 h-8 text-muted-foreground" />
      <span className="font-semibold text-base">Not Found</span>
      <span className="text-sm">{message}</span>
    </div>
  );
}
