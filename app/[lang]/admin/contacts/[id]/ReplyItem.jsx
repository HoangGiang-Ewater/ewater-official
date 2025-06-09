import { Button } from "@/components/ui/button";
import { XIcon } from "lucide-react";

function ReplyItem({ reply, deleteMutation }) {
  return (
    <div className="rounded-xl border bg-background p-6 shadow-sm flex flex-col gap-4 max-w-xl">
      <div className="flex items-center gap-2">
        <span className="inline-flex items-center rounded-full bg-green-100 text-green-700 px-2 py-0.5 text-xs font-semibold">
          <svg
            className="w-3 h-3 mr-1"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
          Replied
        </span>
        <span className="text-xs text-muted-foreground w-max block shrink-0">
          {new Date(reply.created_at).toLocaleString()}
        </span>
        <div className="flex w-full justify-end">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {
              deleteMutation.mutate();
            }}
          >
            <XIcon className="h-4 w-4 text-muted-foreground" />
          </Button>
        </div>
      </div>
      <div>
        <div className="text-xs uppercase text-muted-foreground font-medium mb-1">
          Subject
        </div>
        <div className="font-semibold text-foreground">{reply.subject}</div>
      </div>
      <div>
        <div className="text-xs uppercase text-muted-foreground font-medium mb-1">
          Message
        </div>
        <div className="whitespace-pre-line rounded-lg border bg-muted px-4 py-3 text-sm text-foreground">
          {reply.message}
        </div>
      </div>
    </div>
  );
}

export default ReplyItem;
