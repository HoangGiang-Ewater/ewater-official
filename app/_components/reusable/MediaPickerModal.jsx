import { getPaginatedMediaFromBucket } from "@/api/media";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { XIcon } from "lucide-react";
import Image from "next/image";

export function MediaPickerModal({ open, onClose, onSelect }) {
  const {
    data: mediaList,
    error,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["mediaList"],
    queryFn: () =>
      getPaginatedMediaFromBucket("project-media", {
        prefix: "tiptap",
        page: 1,
        pageSize: 40,
      }),
    enabled: open,
  });

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
      <div className="bg-white dark:bg-neutral-900 rounded-lg p-6 max-w-2xl w-full relative">
        <h2 className="font-bold mb-4">Select an image</h2>
        {isLoading ? (
          <div>Loading...</div>
        ) : isError ? (
          <div className="text-red-500">
            Error loading media: {error.message}
          </div>
        ) : (
          <div className="grid grid-cols-4 gap-4 max-h-96 overflow-y-auto">
            {mediaList?.data.map((media) => (
              <div
                key={media.filePath}
                className="cursor-pointer border rounded hover:ring-2 ring-blue-500"
                onClick={() => {
                  onSelect(media);
                  onClose();
                }}
              >
                <Image
                  src={media.publicUrl}
                  alt={media.name}
                  width={120}
                  height={80}
                  className="object-cover rounded"
                />
                <div className="truncate text-xs mt-1">{media.name}</div>
              </div>
            ))}
          </div>
        )}
        <Button
          type="button"
          variant="ghost"
          className="absolute top-2 right-2"
          onClick={onClose}
        >
          <XIcon className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
