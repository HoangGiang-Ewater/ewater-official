"use client";

import { getProjectById } from "@/api/projects";
import { useQuery } from "@tanstack/react-query";

function ProjectDetail({ id }) {
  const { data, error, isLoading, iError } = useQuery({
    queryKey: ["project", id],
    queryFn: () => getProjectById(id),
  });

  if (isLoading) {
    return <div>loading...</div>;
  }

  if (iError) {
    return <div>error: {iError.message}</div>;
  }

  return (
    <div className="mt-44">
      <h1>{data.data.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: data?.data?.content || "" }} />
    </div>
  );
}

export default ProjectDetail;
