"use client";

import { fetchProjectCategoryById } from "@/api/projectCategories";
import { Badge } from "@/components/ui/badge";
import GoesOutComesInUnderline from "@/fancy/components/text/underline-goes-out-comes-in";
import placeholder from "@/public/image-placeholder.svg";
import { useQuery } from "@tanstack/react-query";
import { EyeClosedIcon, EyeIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

function Project({
  project,
  truncate = false,
  link,
  linkText,
  isAdmin = false,
}) {
  const id = project["id-category"];

  const { data, isLoading, isError, isPending } = useQuery({
    queryKey: ["categories", id],
    queryFn: () => fetchProjectCategoryById(project["id-category"]),
    enabled: !!id,
  });

  return (
    <div className="min-w-0 relative group" title={project?.title}>
      <Link
        href={link || `/projects/${project.id}`}
        className="absolute inset-0"
      ></Link>
      <div className="overflow-hidden">
        <Image
          src={project?.thumbnail || placeholder}
          alt={project?.title}
          width={600}
          height={400}
          className="group-hover:scale-125 transition-transform duration-1000 ease-in-out"
        />
      </div>
      <div className="flex items-center justify-between">
        <Badge variant={"outline"} className="mt-3">
          {data?.data.name}
        </Badge>
        <span className="text-slate-400">{project?.date || "--/--/--"}</span>
      </div>
      <h3
        className={`text-xl font-semibold mt-3 ${
          truncate ? "line-clamp-2" : ""
        }`}
      >
        {project?.title.trim()}
      </h3>
      <p className={`${truncate && "truncate"} mt-3`}>{project?.description}</p>
      {isAdmin ? (
        <div className="flex items-center justify-between mt-3">
          <Link
            href={link || `/projects/${project?.id}`}
            className={"p-0 relative z-10"}
          >
            <GoesOutComesInUnderline
              label={linkText || "Edit project"}
              className={"text-blue-500 font-bold"}
            />
          </Link>
          <div className="flex gap-2 items-center">
            {project?.is_hidden ? (
              <EyeClosedIcon className="w-4 h-4 text-slate-600" />
            ) : (
              <EyeIcon className="w-4 h-4 text-slate-600" />
            )}
          </div>
        </div>
      ) : (
        <Link
          href={link || `/projects/${project?.id}`}
          className={"mt-3 p-0 relative z-10"}
        >
          <GoesOutComesInUnderline
            label={linkText || "Find out more"}
            className={"text-blue-500 font-bold"}
          />
        </Link>
      )}
    </div>
  );
}

export default Project;
