"use client";

import GoesOutComesInUnderline from "@/fancy/components/text/underline-goes-out-comes-in";
import Image from "next/image";
import Link from "next/link";
import HeaderTag from "./HeaderTag";

function Project({ project, truncate = false }) {
  return (
    <div className="min-w-0 relative group">
      <Link
        href={`/projects/${project.id}`}
        className="absolute inset-0"
      ></Link>
      <div className="overflow-hidden">
        <Image
          src={project?.image}
          alt={project?.title}
          width={600}
          height={400}
          className="group-hover:scale-125 transition-transform duration-1000 ease-in-out"
        />
      </div>
      <HeaderTag className="mt-3">{project?.category}</HeaderTag>
      <h3 className="text-2xl font-semibold mt-3">{project?.title}</h3>
      <p className={`${truncate && "truncate"} mt-3`}>{project?.description}</p>
      <Link
        href={`/projects/${project?.id}`}
        className={"mt-3 p-0 relative z-10"}
      >
        <GoesOutComesInUnderline
          label={"Find out more"}
          className={"text-blue-500 mt-3 font-bold"}
        />
      </Link>
    </div>
  );
}

export default Project;
