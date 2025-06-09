"use client";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { useQuery } from "@tanstack/react-query";
import { getProjects, getProjectsPaginated } from "@/api/projects";
import { fetchProjectCategories } from "@/api/projectCategories";
import Project from "@/app/_components/reusable/Project";
import Link from "next/link";
import { PlusIcon, CalendarIcon, SearchIcon } from "lucide-react";
import { useParams } from "next/navigation";
import React from "react";
import { format } from "date-fns";
import Loading from "../../loading";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import Loader from "@/app/_components/reusable/Loader";
import Error from "@/app/_components/reusable/Error";
import NotFound from "@/app/_components/reusable/NotFound";

function page() {
  const params = useParams();
  const { lang } = params;
  const [page, setPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(10);

  // Filters state
  const [selectedDate, setSelectedDate] = React.useState(null);
  const [selectedCategory, setSelectedCategory] = React.useState("");
  const [search, setSearch] = React.useState("");

  // Fetch projects and categories
  const { data, isLoading, isError } = useQuery({
    queryKey: ["projects", page, pageSize],
    queryFn: () => getProjectsPaginated(page, pageSize),
    keepPreviousData: true,
  });

  const totalProjects = data?.count || 0;
  const totalPages = Math.ceil(totalProjects / pageSize);

  const { data: categoriesData } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchProjectCategories,
  });

  // Filtering logic
  const filteredProjects = React.useMemo(() => {
    if (!data?.data) return [];
    return data.data.filter((project) => {
      // Filter by day
      let matchDate = true;
      if (selectedDate) {
        const projectDate = new Date(project.created_at);
        matchDate = projectDate.toDateString() === selectedDate.toDateString();
      }
      // Filter by category
      let matchCategory = true;
      if (selectedCategory && selectedCategory !== "__all__") {
        matchCategory = project["id-category"] === selectedCategory;
      }
      // Filter by name
      let matchName = true;
      if (search) {
        matchName = project.title.toLowerCase().includes(search.toLowerCase());
      }
      return matchDate && matchCategory && matchName;
    });
  }, [data, selectedDate, selectedCategory, search]);

  return (
    <div className="max-w-5xl mx-auto p-4 min-w-[300px] md:min-w-[600px] lg:min-w-[900px] xl:min-w-[1200px]">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold mb-4">Projects</h1>
        <div className="flex items-center">
          <Link href={`/${lang}/admin/projects/create`}>
            <Button className="mb-4" variant="default">
              <PlusIcon className="w-4 h-4" />
              Create New Project
            </Button>
          </Link>
        </div>
      </div>

      <div className="flex items-center justify-between">
        {/* Filter Bar */}
        <div className="flex flex-wrap gap-4 mb-6 items-end">
          {/* Date Picker */}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-[200px] h-[40px] justify-start text-left font-normal"
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {selectedDate ? (
                  format(selectedDate, "PPP")
                ) : (
                  <span>Pick a day</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>

          {/* Category Select */}
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-[180px] h-[40px]">
              <SelectValue placeholder="All categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="__all__">All categories</SelectItem>
              {categoriesData?.data?.map((cat) => (
                <SelectItem key={cat?.id + cat?.name} value={cat?.id || ""}>
                  {cat?.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Name Search */}
          <div className="relative w-[220px] ">
            <Input
              placeholder="Search by name"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-8 h-[40px]"
            />
            <SearchIcon className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          </div>

          {/* Reset Filters Button */}
          <Button
            variant="secondary"
            onClick={() => {
              setSelectedDate(null);
              setSelectedCategory("");
              setSearch("");
            }}
          >
            Reset
          </Button>
        </div>

        {/* Per page select */}
        <div className="flex items-center mb-4">
          <span className="text-sm text-muted-foreground mr-2">
            Projects per page:
          </span>
          <Select
            value={pageSize.toString()}
            onValueChange={(value) => setPageSize(Number(value))}
          >
            <SelectTrigger className="w-[100px] h-[40px]">
              <SelectValue placeholder={pageSize.toString()} />
            </SelectTrigger>
            <SelectContent>
              {[1, 5, 10, 15, 20, 40, 50].map((size) => (
                <SelectItem
                  key={size}
                  value={size.toString()}
                  defaultValue={pageSize.toString()}
                >
                  {size}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Projects */}
      <div className="h-[70vh] overflow-y-auto">
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredProjects.map((project) => (
              <Project
                key={project.id}
                project={project}
                truncate={true}
                link={`/admin/projects/${project.id}`}
                linkText="Edit project"
                isAdmin={true}
              />
            ))}
          </div>
        ) : isLoading ? (
          <Loader content="Loading projects, please wait..." />
        ) : isError ? (
          <Error message="An error occurred while fetching projects. Please try again later." />
        ) : (
          <NotFound message="No projects found matching your criteria." />
        )}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-6">
        <ProjectPagination
          page={page}
          setPage={setPage}
          totalPages={totalPages}
          pageSize={pageSize}
          totalProjects={totalProjects}
          setSelectedDate={setSelectedDate}
          setSelectedCategory={setSelectedCategory}
          setSearch={setSearch}
        />
      </div>
    </div>
  );
}

export default page;

function ProjectPagination({ page, setPage, totalPages }) {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href="#"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
          />
        </PaginationItem>
        {[...Array(totalPages)].map((_, idx) => (
          <PaginationItem key={idx}>
            <PaginationLink
              href="#"
              isActive={page === idx + 1}
              onClick={() => setPage(idx + 1)}
            >
              {idx + 1}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationNext
            href="#"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
