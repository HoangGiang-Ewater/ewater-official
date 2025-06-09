import { blurSlideUp } from "@/lib/animate";
import { cn, uploadImageToSupabase } from "@/lib/utils";
import { IconUpload } from "@tabler/icons-react";
import { XIcon } from "lucide-react";
import { motion } from "motion/react";
import Image from "next/image";
import React from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "./button";
import { MediaPickerModal } from "@/app/_components/reusable/MediaPickerModal";
import { toast } from "sonner";

export const FileUpload = ({
  onChange,
  label,
  file,
  setFile,
  uploading,
  setUploading,
  uploadedUrl,
  setUploadedUrl,
}) => {
  const fileInputRef = React.useRef(null);
  const [showMediaModal, setShowMediaModal] = React.useState(false);

  // Handler for uploading the file
  const handleFileChange = async (newFiles) => {
    const selectedFile = newFiles[0];
    try {
      const publicUrl = await uploadImageToSupabase(selectedFile);
      setFile(selectedFile);
      setUploadedUrl(publicUrl);
      onChange && onChange(publicUrl); // Pass the URL up if needed
      toast.success("Upload successful", {
        description: "Your file has been uploaded successfully.",
      });
    } catch (error) {
      toast.error("Upload failed", {
        description: "There was an error uploading your file.",
      });
    }
  };

  // Handler for clicking the file input
  const handleClick = () => {
    fileInputRef.current?.click();
  };

  // Handler for selecting media from modal
  const handleSelectMedia = (media) => {
    setUploadedUrl(media.publicUrl);
    setFile({ name: media.name, size: 0, type: "image/*" });
    onChange && onChange(media.publicUrl);
  };

  // Handler for removing the file
  const handleRemove = () => {
    setFile(null);
    setUploadedUrl("");
    setUploading(false);
    onChange && onChange(null); // Pass null up if needed
  };

  const { getRootProps, isDragActive } = useDropzone({
    multiple: false,
    accept: { "image/*": [] },
    noClick: true,
    onDrop: handleFileChange,
    onDropRejected: (error) => {
      alert("Only image files are allowed.");
    },
  });

  return (
    <div
      className="w-full border border-dashed border-border rounded-md"
      {...getRootProps()}
    >
      <motion.div
        onClick={handleClick}
        whileHover="animate"
        className="p-10 group/file block rounded-lg cursor-pointer w-full relative overflow-hidden"
      >
        <input
          ref={fileInputRef}
          id="file-upload-handle"
          type="file"
          accept="image/*"
          onChange={(e) => {
            if (e.target.files && e.target.files[0]) {
              handleFileChange([e.target.files[0]]);
            }
          }}
          className="hidden"
        />
        <div className="flex flex-col items-center justify-center">
          <p className="relative z-20 font-sans font-bold text-neutral-700 dark:text-neutral-300 text-base">
            {label || "Upload your banner image"}
          </p>
          <p className="relative z-20 font-sans font-normal text-neutral-400 dark:text-neutral-400 text-base mt-2">
            Drag or drop your image here or click to upload
          </p>
          <div className="relative w-full mt-10 max-w-xl mx-auto">
            {file && (
              <>
                <motion.div
                  className={cn(
                    "relative overflow-hidden z-40 border border-border flex flex-col items-start justify-start md:h-24 p-4 mt-4 w-full mx-auto rounded-md",
                    "shadow-sm"
                  )}
                >
                  <div className="flex justify-between w-full items-center gap-4">
                    <motion.p className="text-base text-neutral-700 dark:text-neutral-300 truncate max-w-xs">
                      {file.name}
                    </motion.p>
                    <motion.p className="rounded-lg px-2 py-1 w-fit shrink-0 text-sm text-neutral-600 dark:bg-neutral-800 dark:text-white shadow-input">
                      {(file.size / (1024 * 1024)).toFixed(2)} MB
                    </motion.p>
                  </div>
                  <div className="flex text-sm md:flex-row flex-col items-start md:items-center w-full mt-2 justify-between text-neutral-600 dark:text-neutral-400">
                    <motion.p className="px-1 py-0.5 rounded-md bg-gray-100 dark:bg-neutral-800 ">
                      {file.type}
                    </motion.p>
                    <motion.p>
                      modified{" "}
                      {new Date(file.lastModified).toLocaleDateString()}
                    </motion.p>
                  </div>

                  {uploading && (
                    <span className="text-blue-500 mt-2">Uploading...</span>
                  )}
                </motion.div>
                <motion.div
                  {...blurSlideUp}
                  className="w-full flex-center rounded-lg overflow-hidden mt-4"
                >
                  <motion.div {...blurSlideUp} className="">
                    <Image
                      src={uploadedUrl}
                      width={300}
                      height={300}
                      alt={"project banner"}
                      className="rounded-lg"
                    />
                  </motion.div>
                  <div className="absolute top-0 right-0">
                    <Button
                      type="button"
                      variant="destructive"
                      onClick={handleRemove}
                    >
                      <XIcon className="h-4 w-4" />
                    </Button>
                  </div>
                </motion.div>
              </>
            )}
            {!file && (
              <motion.div
                layoutId="file-upload"
                className={cn(
                  "relative group-hover/file:shadow-2xl z-40 bg-white dark:bg-neutral-900 flex items-center justify-center h-32 mt-4 w-full max-w-[8rem] mx-auto rounded-md",
                  "shadow-[0px_10px_50px_rgba(0,0,0,0.1)]"
                )}
              >
                {isDragActive ? (
                  <motion.p className="text-neutral-600 flex flex-col items-center">
                    Drop it
                    <IconUpload className="h-4 w-4 text-neutral-600 dark:text-neutral-400" />
                  </motion.p>
                ) : (
                  <IconUpload className="h-4 w-4 text-neutral-600 dark:text-neutral-300" />
                )}
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>
      <div className="flex-center flex-col mb-6">
        or
        <Button
          type="button"
          variant="outline"
          className="mt-4 relative z-20 w-fit"
          onClick={(e) => {
            e.stopPropagation();
            setShowMediaModal(true);
          }}
        >
          Choose from existing media
        </Button>
        <MediaPickerModal
          open={showMediaModal}
          onClose={() => setShowMediaModal(false)}
          onSelect={handleSelectMedia}
        />
      </div>
    </div>
  );
};

export function GridPattern() {
  const columns = 41;
  const rows = 11;
  return (
    <div className="flex bg-gray-100 dark:bg-neutral-900 shrink-0 flex-wrap justify-center items-center gap-x-px gap-y-px  scale-105">
      {Array.from({ length: rows }).map((_, row) =>
        Array.from({ length: columns }).map((_, col) => {
          const index = row * columns + col;
          return (
            <div
              key={`${col}-${row}`}
              className={`w-10 h-10 flex shrink-0 rounded-[2px] ${
                index % 2 === 0
                  ? "bg-gray-50 dark:bg-neutral-950"
                  : "bg-gray-50 dark:bg-neutral-950 shadow-[0px_0px_1px_3px_rgba(255,255,255,1)_inset] dark:shadow-[0px_0px_1px_3px_rgba(0,0,0,1)_inset]"
              }`}
            />
          );
        })
      )}
    </div>
  );
}
