import { Loader2Icon } from "lucide-react";

function Loading() {
  return (
    <div className="fixed inset-0 bg-white/10 dark:bg-black/10 flex-center">
      <div className="flex items-center justify-center h-screen">
        <Loader2Icon className="mr-2 h-4 w-4 animate-spin text-primary" />
      </div>
    </div>
  );
}

export default Loading;
