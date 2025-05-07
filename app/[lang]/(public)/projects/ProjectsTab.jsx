"use client";

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
import SearchForm from "./SearchForm";

function ProjectsTab() {
  // LATER: Fetch project categories from API
  const projectCategories = [
    {
      id: 1,
      name: "Tất cả",
      slug: "tat-ca",
    },
    {
      id: 2,
      name: "Môi trường",
      slug: "moi-truong",
    },
    {
      id: 3,
      name: "Tài nguyên nước",
      slug: "tai-nguyen-nuoc",
    },
  ];

  const projects = [
    {
      id: 1,
      title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat,molestie ipsum et, consequat nibh. Etiam non est auctor, semper est a, suscipit",
      image:
        "https://s3-alpha-sig.figma.com/img/4def/2f6e/338dd5c73facbebb55bd66803abfb4a2?Expires=1737331200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=G4r8BOVjVLNyYRm9zQtpdKpMX8oDQsR9gcV2Dz-L1HJF~nNLQqfihfbgPFQAlxKEOQUIKYkWLAEiBQxoN6NJLxlfM7tg59I8w1bjFk4yAy-hyMwtGO9MLzGmrlcXAylAobE4Aa2MgePNUDjw32IwKAAtpfOkkjvOREodGZRtkYqybOllQhCtlt25x529OK0BWOfa58medseUJ0yxuAtxu3faL6GGUD-~FBN8h7LZZWt3eLptzL5mHozlqYAOSykbxRY1h6uT6CBGoEk2ztSzv14hD47aeovDEURYYeyj9dAGKQ0Wc4qq1AFmFuviyTiHlGoUl5YbsPIqhRZaWSL0iA__",
      dateTime: "April 1, 2021",
      category: "Tài nguyên nước",
    },
    {
      id: 2,
      title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat,molestie ipsum et, consequat nibh. Etiam non est auctor, semper est a, suscipit",
      image:
        "https://s3-alpha-sig.figma.com/img/4def/2f6e/338dd5c73facbebb55bd66803abfb4a2?Expires=1737331200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=G4r8BOVjVLNyYRm9zQtpdKpMX8oDQsR9gcV2Dz-L1HJF~nNLQqfihfbgPFQAlxKEOQUIKYkWLAEiBQxoN6NJLxlfM7tg59I8w1bjFk4yAy-hyMwtGO9MLzGmrlcXAylAobE4Aa2MgePNUDjw32IwKAAtpfOkkjvOREodGZRtkYqybOllQhCtlt25x529OK0BWOfa58medseUJ0yxuAtxu3faL6GGUD-~FBN8h7LZZWt3eLptzL5mHozlqYAOSykbxRY1h6uT6CBGoEk2ztSzv14hD47aeovDEURYYeyj9dAGKQ0Wc4qq1AFmFuviyTiHlGoUl5YbsPIqhRZaWSL0iA__",
      dateTime: "April 1, 2021",
      category: "Môi trường",
    },
    {
      id: 3,
      title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat,molestie ipsum et, consequat nibh. Etiam non est auctor, semper est a, suscipit",
      image:
        "https://s3-alpha-sig.figma.com/img/4def/2f6e/338dd5c73facbebb55bd66803abfb4a2?Expires=1737331200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=G4r8BOVjVLNyYRm9zQtpdKpMX8oDQsR9gcV2Dz-L1HJF~nNLQqfihfbgPFQAlxKEOQUIKYkWLAEiBQxoN6NJLxlfM7tg59I8w1bjFk4yAy-hyMwtGO9MLzGmrlcXAylAobE4Aa2MgePNUDjw32IwKAAtpfOkkjvOREodGZRtkYqybOllQhCtlt25x529OK0BWOfa58medseUJ0yxuAtxu3faL6GGUD-~FBN8h7LZZWt3eLptzL5mHozlqYAOSykbxRY1h6uT6CBGoEk2ztSzv14hD47aeovDEURYYeyj9dAGKQ0Wc4qq1AFmFuviyTiHlGoUl5YbsPIqhRZaWSL0iA__",
      dateTime: "April 1, 2021",
      category: "Môi trường",
    },
    {
      id: 4,
      title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat,molestie ipsum et, consequat nibh. Etiam non est auctor, semper est a, suscipit",
      image:
        "https://s3-alpha-sig.figma.com/img/4def/2f6e/338dd5c73facbebb55bd66803abfb4a2?Expires=1737331200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=G4r8BOVjVLNyYRm9zQtpdKpMX8oDQsR9gcV2Dz-L1HJF~nNLQqfihfbgPFQAlxKEOQUIKYkWLAEiBQxoN6NJLxlfM7tg59I8w1bjFk4yAy-hyMwtGO9MLzGmrlcXAylAobE4Aa2MgePNUDjw32IwKAAtpfOkkjvOREodGZRtkYqybOllQhCtlt25x529OK0BWOfa58medseUJ0yxuAtxu3faL6GGUD-~FBN8h7LZZWt3eLptzL5mHozlqYAOSykbxRY1h6uT6CBGoEk2ztSzv14hD47aeovDEURYYeyj9dAGKQ0Wc4qq1AFmFuviyTiHlGoUl5YbsPIqhRZaWSL0iA__",
      dateTime: "April 1, 2021",
      category: "Tài nguyên nước",
    },
    {
      id: 5,
      title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat,molestie ipsum et, consequat nibh. Etiam non est auctor, semper est a, suscipit",
      image:
        "https://s3-alpha-sig.figma.com/img/4def/2f6e/338dd5c73facbebb55bd66803abfb4a2?Expires=1737331200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=G4r8BOVjVLNyYRm9zQtpdKpMX8oDQsR9gcV2Dz-L1HJF~nNLQqfihfbgPFQAlxKEOQUIKYkWLAEiBQxoN6NJLxlfM7tg59I8w1bjFk4yAy-hyMwtGO9MLzGmrlcXAylAobE4Aa2MgePNUDjw32IwKAAtpfOkkjvOREodGZRtkYqybOllQhCtlt25x529OK0BWOfa58medseUJ0yxuAtxu3faL6GGUD-~FBN8h7LZZWt3eLptzL5mHozlqYAOSykbxRY1h6uT6CBGoEk2ztSzv14hD47aeovDEURYYeyj9dAGKQ0Wc4qq1AFmFuviyTiHlGoUl5YbsPIqhRZaWSL0iA__",
      dateTime: "April 1, 2021",
      category: "Tài nguyên nước",
    },
    {
      id: 6,
      title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat,molestie ipsum et, consequat nibh. Etiam non est auctor, semper est a, suscipit",
      image:
        "https://s3-alpha-sig.figma.com/img/4def/2f6e/338dd5c73facbebb55bd66803abfb4a2?Expires=1737331200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=G4r8BOVjVLNyYRm9zQtpdKpMX8oDQsR9gcV2Dz-L1HJF~nNLQqfihfbgPFQAlxKEOQUIKYkWLAEiBQxoN6NJLxlfM7tg59I8w1bjFk4yAy-hyMwtGO9MLzGmrlcXAylAobE4Aa2MgePNUDjw32IwKAAtpfOkkjvOREodGZRtkYqybOllQhCtlt25x529OK0BWOfa58medseUJ0yxuAtxu3faL6GGUD-~FBN8h7LZZWt3eLptzL5mHozlqYAOSykbxRY1h6uT6CBGoEk2ztSzv14hD47aeovDEURYYeyj9dAGKQ0Wc4qq1AFmFuviyTiHlGoUl5YbsPIqhRZaWSL0iA__",
      dateTime: "April 1, 2021",
      category: "Môi trường",
    },
    {
      id: 7,
      title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat,molestie ipsum et, consequat nibh. Etiam non est auctor, semper est a, suscipit",
      image:
        "https://s3-alpha-sig.figma.com/img/4def/2f6e/338dd5c73facbebb55bd66803abfb4a2?Expires=1737331200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=G4r8BOVjVLNyYRm9zQtpdKpMX8oDQsR9gcV2Dz-L1HJF~nNLQqfihfbgPFQAlxKEOQUIKYkWLAEiBQxoN6NJLxlfM7tg59I8w1bjFk4yAy-hyMwtGO9MLzGmrlcXAylAobE4Aa2MgePNUDjw32IwKAAtpfOkkjvOREodGZRtkYqybOllQhCtlt25x529OK0BWOfa58medseUJ0yxuAtxu3faL6GGUD-~FBN8h7LZZWt3eLptzL5mHozlqYAOSykbxRY1h6uT6CBGoEk2ztSzv14hD47aeovDEURYYeyj9dAGKQ0Wc4qq1AFmFuviyTiHlGoUl5YbsPIqhRZaWSL0iA__",
      dateTime: "April 1, 2021",
      category: "Tài nguyên nước",
    },
    {
      id: 8,
      title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat,molestie ipsum et, consequat nibh. Etiam non est auctor, semper est a, suscipit",
      image:
        "https://s3-alpha-sig.figma.com/img/4def/2f6e/338dd5c73facbebb55bd66803abfb4a2?Expires=1737331200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=G4r8BOVjVLNyYRm9zQtpdKpMX8oDQsR9gcV2Dz-L1HJF~nNLQqfihfbgPFQAlxKEOQUIKYkWLAEiBQxoN6NJLxlfM7tg59I8w1bjFk4yAy-hyMwtGO9MLzGmrlcXAylAobE4Aa2MgePNUDjw32IwKAAtpfOkkjvOREodGZRtkYqybOllQhCtlt25x529OK0BWOfa58medseUJ0yxuAtxu3faL6GGUD-~FBN8h7LZZWt3eLptzL5mHozlqYAOSykbxRY1h6uT6CBGoEk2ztSzv14hD47aeovDEURYYeyj9dAGKQ0Wc4qq1AFmFuviyTiHlGoUl5YbsPIqhRZaWSL0iA__",
      dateTime: "April 1, 2021",
      category: "Môi trường",
    },
    {
      id: 9,
      title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat,molestie ipsum et, consequat nibh. Etiam non est auctor, semper est a, suscipit",
      image:
        "https://s3-alpha-sig.figma.com/img/4def/2f6e/338dd5c73facbebb55bd66803abfb4a2?Expires=1737331200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=G4r8BOVjVLNyYRm9zQtpdKpMX8oDQsR9gcV2Dz-L1HJF~nNLQqfihfbgPFQAlxKEOQUIKYkWLAEiBQxoN6NJLxlfM7tg59I8w1bjFk4yAy-hyMwtGO9MLzGmrlcXAylAobE4Aa2MgePNUDjw32IwKAAtpfOkkjvOREodGZRtkYqybOllQhCtlt25x529OK0BWOfa58medseUJ0yxuAtxu3faL6GGUD-~FBN8h7LZZWt3eLptzL5mHozlqYAOSykbxRY1h6uT6CBGoEk2ztSzv14hD47aeovDEURYYeyj9dAGKQ0Wc4qq1AFmFuviyTiHlGoUl5YbsPIqhRZaWSL0iA__",
      dateTime: "April 1, 2021",
      category: "Môi trường",
    },
  ];

  return (
    <div className="mb-10 p-5">
      <Tabs defaultValue="tat-ca">
        <TabsList className="w-full !bg-transparent p-2">
          {projectCategories.map((category) => (
            <TabsTrigger
              key={category.id}
              value={category.slug}
              className={cn(
                "border-b-2 border-transparent rounded-none font-bold text-lg px-8 !shadow-none",
                "data-[state='active']:border-gray-800"
              )}
            >
              {category.name}
            </TabsTrigger>
          ))}

          <SearchForm />
        </TabsList>
        {
          // LATER: Fetch projects by category from API
          projectCategories.map((category) => (
            <TabsContent
              key={category.id}
              value={category.slug}
              className="mt-10"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {projects.map((project) => (
                  <Project key={project.id} project={project} />
                ))}
              </div>
              <Pagination className={"mt-10"}>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious href="#" />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#">1</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#" isActive>
                      2
                    </PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#">3</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationNext href="#" />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </TabsContent>
          ))
        }
      </Tabs>
    </div>
  );
}

export default ProjectsTab;
