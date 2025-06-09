import { AlertTriangle } from "lucide-react";

export default function Error({
  message = "Something went wrong.",
  className = "",
}) {
  return (
    <div
      className={`flex items-center gap-2 p-4 bg-red-50 border border-red-200 text-red-700 rounded ${className}`}
      role="alert"
    >
      <AlertTriangle className="w-5 h-5 text-red-500" />
      <span className="font-medium">Error:</span>
      <span>{message}</span>
    </div>
  );
}
