import { TrendingDownIcon, TrendingUpIcon } from "lucide-react";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { useQuery } from "@tanstack/react-query";
import { getProjectCount, getProjectsByMonth } from "@/api/projects";
import { Badge } from "./ui/badge";
import ComesInGoesOutUnderline from "@/fancy/components/text/underline-comes-in-goes-out";
import Link from "next/link";

function ProjectCard() {
  // Fetch the total project count
  const {
    data: projectCountData,
    isLoading: projectCountLoading,
    isError: projectCountError,
  } = useQuery({
    queryKey: ["projects"],
    queryFn: getProjectCount,
  });

  // Trending this month feature
  /**
   * get current month
   * get current month projects count
   * get last month
   * get last month projects count
   * compare the two months
   * if current month is greater than last month, show trending up
   * if current month is less than last month, show trending down
   * if current month is equal to last month, show no trend
   * get the total projects count
   * then calculate the percentage of the current month projects count to the total projects count
   * if the percentage is greater than 50%, show trending up
   * if the percentage is less than 50%, show trending down
   * if the percentage is equal to 50%, show no trend
   * if the current month projects count is 0, show no trend
   * if the last month projects count is 0, show no trend
   * if the current month projects count is greater than 0 and the last month projects count is greater than 0, show trending up
   * if the current month projects count is less than 0 and the last month projects count is less than 0, show trending down
   * if the current month projects count is equal to 0 and the last month projects count is equal to 0, show no trend
   */

  const now = new Date();
  const { data: currentMonthProjects } = useQuery({
    queryKey: ["projects", now.getFullYear(), now.getMonth() + 1],
    queryFn: () => getProjectsByMonth(now.getFullYear(), now.getMonth() + 1),
  });

  const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  const { data: lastMonthProjects } = useQuery({
    queryKey: ["projects", lastMonth.getFullYear(), lastMonth.getMonth() + 1],
    queryFn: () =>
      getProjectsByMonth(lastMonth.getFullYear(), lastMonth.getMonth() + 1),
  });

  const currentMonthCount = currentMonthProjects?.length || 0;
  const lastMonthCount = lastMonthProjects?.length || 0;
  const isTrendingUp = currentMonthCount > lastMonthCount;
  const totalProjectsCount = projectCountData?.count || 0;
  const percentage = totalProjectsCount
    ? ((currentMonthCount / totalProjectsCount) * 100).toFixed(0)
    : 0;

  return (
    <Card className="@container/card">
      <CardHeader className="relative">
        <CardDescription>Total Projects</CardDescription>
        <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
          {projectCountLoading ? "..." : projectCountData?.count}
          {projectCountError && "$"}
        </CardTitle>
        {isTrendingUp ? (
          <div className="absolute right-4 top-4">
            <Badge variant="outline" className="flex gap-1 rounded-lg text-xs">
              <TrendingUpIcon className="size-3" />+
              {currentMonthCount - lastMonthCount}
            </Badge>
          </div>
        ) : (
          <div className="absolute right-4 top-4">
            <Badge variant="outline" className="flex gap-1 rounded-lg text-xs">
              <TrendingDownIcon className="size-3" />
              {lastMonthCount - currentMonthCount}
            </Badge>
          </div>
        )}
      </CardHeader>
      <CardFooter className="flex-col items-start gap-1 text-sm">
        {isTrendingUp ? (
          <div className="line-clamp-1 flex gap-2 font-medium">
            Up {percentage}% this period <TrendingUpIcon className="size-4" />
          </div>
        ) : (
          <div className="line-clamp-1 flex gap-2 font-medium">
            Down {percentage}% this period{" "}
            <TrendingDownIcon className="size-4" />
          </div>
        )}
        <Link href={"/admin/projects"}>
          <ComesInGoesOutUnderline
            label={"Add more project to increase visibility"}
            className="text-muted-foreground"
          />
        </Link>
      </CardFooter>
    </Card>
  );
}

export default ProjectCard;
