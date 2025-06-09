import { Loader2 } from "lucide-react";

function Loader({ content = "Loading..." }) {
  return (
    <div className="flex items-center flex-col gap-2 text-muted-foreground animate-pulse py-8 justify-center">
      <Loader2 className="h-5 w-5 animate-spin" />
      <span>{content}</span>
    </div>
  );
}

export default Loader;
