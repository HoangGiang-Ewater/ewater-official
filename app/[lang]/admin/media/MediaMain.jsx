"use client";

import { getPaginatedMediaFromBucket } from "@/api/media";
import { TablePagination } from "@/app/_components/reusable/data-table/TablePagination";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { blur } from "@/lib/animate";
import { supabase } from "@/lib/supabaseClient";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Loader2Icon, XIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import placeholder from "@/public/image-placeholder.svg";

function MediaMain() {
  const [page, setPage] = React.useState(1);
  const queryClient = useQueryClient();
  const [pageSize, setPageSize] = React.useState(12);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["media", page, pageSize],
    queryFn: () =>
      getPaginatedMediaFromBucket("project-media", {
        prefix: "tiptap",
        page,
        pageSize,
      }),
    keepPreviousData: true,
  });

  const totalPages = Math.ceil(data?.total / pageSize);

  const deleteMutation = useMutation({
    mutationFn: (filePath) => {
      return supabase.storage.from("project-media").remove([filePath]);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["media"]);
    },
    onError: (error) => {
      console.error("Error deleting file:", error);
    },
  });

  const onDelete = async (filePath) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this file? This action cannot be undone."
    );

    if (!confirmed) return;

    deleteMutation.mutate(filePath);
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <div className="">
      <div className="flex items-center justify-between">
        <h1>Media Manager</h1>
        <div className="flex items-center gap-4">
          <label htmlFor="pageSize" className="text-muted-foreground">
            Items per page:
          </label>
          <Select
            value={pageSize}
            onValueChange={setPageSize}
            disabled={deleteMutation.isLoading}
            id="pageSize"
          >
            <SelectTrigger className="w-[80px]">
              <SelectValue placeholder={`Items per page`} />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {[6, 12, 24, 36, 48].map((size) => (
                  <SelectItem
                    key={size}
                    value={size}
                    onClick={() => {
                      setPageSize(size);
                      setPage(1);
                    }}
                  >
                    {size}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="columns-3 gap-4 ">
        {data?.data?.map((file) => (
          <motion.div
            {...blur}
            key={
              file.id +
              file.name +
              file.filePath +
              file.publicUrl +
              new Date().getMilliseconds()
            }
            className="mb-4 break-all relative"
          >
            <div className="relative">
              {deleteMutation.isLoading && (
                <>
                  <motion.div className="abs-full bg-black/80 flex-center">
                    <Loader2Icon className="animate-spin text-blue-500 relative z-10" />
                  </motion.div>
                </>
              )}
              <Image
                src={file.publicUrl}
                alt={file.name}
                width={300}
                height={300}
                className="w-full rounded"
                loading="lazy"
                placeholder="blur"
                blurDataURL={"/image-placeholder.svg"}
              />
              <Link
                href={file.publicUrl}
                className="abs-full"
                target="_blank"
                rel="noopener noreferrer"
              ></Link>
              <Button
                // className="block text-red-500 mt-2"
                size={"icon"}
                variant="destructive"
                className="absolute top-2 right-2 bg-red-500/80 hover:bg-red-500/90 text-white"
                onClick={() => onDelete(file.filePath)}
                disabled={deleteMutation.isLoading}
              >
                <XIcon className="w-4 h-4" />
              </Button>
            </div>
          </motion.div>
        ))}
      </div>
      {data && (
        <div className="flex items-center justify-between">
          <TablePagination
            page={page}
            setPage={setPage}
            totalPages={totalPages}
          ></TablePagination>

          <div className="flex">
            {data.data.length} of {data.total} items
          </div>
        </div>
      )}
    </div>
  );
}

export default MediaMain;
