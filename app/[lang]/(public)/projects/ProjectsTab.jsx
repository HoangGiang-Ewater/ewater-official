"use client";

import { fetchProjectCategories } from "@/api/projectCategories";
import {
  getProjectByCategory,
  getProjects,
  getProjectsPaginated,
} from "@/api/projects";
import Error from "@/app/_components/reusable/Error";
import Loader from "@/app/_components/reusable/Loader";
import Project from "@/app/_components/reusable/Project";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import React from "react";

function ProjectsTab() {
  const [currentTab, setCurrentTab] = React.useState("tat-ca");
  const [page, setPage] = React.useState(1);
  const pageSize = 6;

  const handleTabChange = (tab) => {
    setCurrentTab(tab);
    setPage(1); // Reset to first page when tab changes
  };

  // LATER: Fetch project categories from API
  const categoriesData = useQuery({
    queryKey: ["projectCategories"],
    queryFn: fetchProjectCategories,
  });

  console.log("categoriesData: ", categoriesData?.data?.data);

  const projectsData = useQuery({
    queryKey: ["projects", currentTab],
    queryFn:
      currentTab === "tat-ca"
        ? () => getProjectsPaginated(page, pageSize)
        : () => getProjectByCategory(currentTab),
    enabled: !!currentTab,
  });

  const totalProjects = projectsData?.data?.count || 0;
  const totalPages = Math.ceil(totalProjects / pageSize);

  if (categoriesData.isLoading) {
    return <Loader content="Loading categories..." />;
  }

  if (categoriesData.isError) {
    return <Error content="Failed to load categories" />;
  }

  return (
    <div className="mt-36 mb-10 ">
      <Tabs defaultValue="tat-ca">
        <TabsList className="w-full !bg-transparent p-2">
          <TabsTrigger
            key={"tat-ca"}
            value={"tat-ca"}
            onClick={() => {
              handleTabChange("tat-ca");
            }}
            className={cn(
              "border-b-2 border-transparent rounded-none font-bold text-lg px-8 !shadow-none",
              "data-[state='active']:border-gray-800"
            )}
          >
            Tất cả
          </TabsTrigger>
          {categoriesData?.data?.data.map((category) => (
            <TabsTrigger
              key={category.id}
              value={category.id}
              onClick={() => {
                handleTabChange(category.id);
              }}
              className={cn(
                "border-b-2 border-transparent rounded-none font-bold text-lg px-8 !shadow-none",
                "data-[state='active']:border-gray-800"
              )}
            >
              {category.name}
            </TabsTrigger>
          ))}

          {/* <SearchForm /> */}
        </TabsList>
        <TabsContent key={"tat-ca"} value="tat-ca" className="mt-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {projectsData?.data?.data.map((project) => (
              <Project key={project.id} project={project} truncate />
            ))}
          </div>
          <ProjectPagination
            page={page}
            setPage={setPage}
            totalPages={totalPages}
          />
        </TabsContent>
        {
          // LATER: Fetch projects by category from API
          categoriesData?.data?.data.map((category) => (
            <TabsContent
              key={category.id}
              value={category.id}
              className="mt-10"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {projectsData?.data?.data.map((project) => (
                  <Project key={project.id} project={project} truncate />
                ))}
              </div>
              <ProjectPagination
                page={page}
                setPage={setPage}
                totalPages={totalPages}
              />
            </TabsContent>
          ))
        }
      </Tabs>
    </div>
  );
}

export default ProjectsTab;

function ProjectPagination({ page, setPage, totalPages }) {
  return (
    <Pagination className="mt-10">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href="#"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            aria-disabled={page === 1}
          />
        </PaginationItem>
        {totalPages > 1 ? (
          [...Array(totalPages)].map((_, idx) => (
            <PaginationItem key={idx + 1}>
              <PaginationLink
                href="#"
                isActive={page === idx + 1}
                onClick={() => setPage(idx + 1)}
              >
                {idx + 1}
              </PaginationLink>
            </PaginationItem>
          ))
        ) : (
          <PaginationItem>
            <PaginationLink href="#" isActive>
              1
            </PaginationLink>
          </PaginationItem>
        )}
        <PaginationItem>
          <PaginationNext
            href="#"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            aria-disabled={page === totalPages}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
