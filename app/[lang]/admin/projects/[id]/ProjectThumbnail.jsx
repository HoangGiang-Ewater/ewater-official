import { emptyProjectThumbnail } from "@/api/projects";
import { Button } from "@/components/ui/button";
import { FileUpload } from "@/components/ui/file-upload";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useMutation } from "@tanstack/react-query";
import { Loader2, XIcon } from "lucide-react";
import Image from "next/image";
import React from "react";
import { toast } from "sonner";

function ProjectThumbnail({
  projectData,
  file,
  setFile,
  uploadedUrl,
  setUploadedUrl,
  invalidateQuery,
}) {
  const [uploading, setUploading] = React.useState(false);
  const [removing, setRemoving] = React.useState(false);

  const projectId = projectData?.data.id;

  const projectThumbnailMutation = useMutation({
    mutationKey: ["empty-project-thumbnail", projectId],
    mutationFn: () => emptyProjectThumbnail(projectId),
    onSuccess: () => {
      toast.success("Success", {
        description: "Project thumbnail removed successfully.",
      });
      invalidateQuery();
    },
    onError: () => {
      toast.error("Error", {
        description: "Failed to remove project thumbnail.",
      });
    },
  });

  async function removeThumbnail() {
    const confirmed = window.confirm(
      "Are you sure you want to remove the project thumbnail?"
    );

    if (!confirmed) return null;

    if (projectData?.data.thumbnail) {
      setFile(null);
      setUploadedUrl("");
      setUploading(false);
      projectThumbnailMutation.mutate();
    }
  }

  // console.log("Project thumbnail: ", projectData?.data.thumbnail);

  if (!projectData) return null;

  return (
    <>
      {projectData?.data.thumbnail ? (
        <div className="relative flex-center gap-2">
          <Image
            src={projectData.data.thumbnail}
            alt="Project thumbnail"
            width={480}
            height={100}
            className="rounded-md"
          />
          {projectThumbnailMutation.isLoading && (
            <div className="absolute inset-0 flex-center bg-black/50 rounded-md">
              <Loader2 className="animate-spin" />
            </div>
          )}
          <div className="absolute top-0 right-0">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="destructive"
                  size={"icon"}
                  type="button"
                  aria-label="Remove image"
                  onClick={removeThumbnail}
                  disabled={projectThumbnailMutation.isLoading}
                >
                  <XIcon className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent
                className={"bg-destructive text-destructive-foreground"}
              >
                Remove image
              </TooltipContent>
            </Tooltip>
          </div>
        </div>
      ) : (
        <FileUpload
          label={"Upload project's banner"}
          file={file}
          uploading={uploading}
          uploadedUrl={uploadedUrl}
          setFile={setFile}
          setUploading={setUploading}
          setUploadedUrl={setUploadedUrl}
        />
      )}
    </>
  );
}

export default ProjectThumbnail;
