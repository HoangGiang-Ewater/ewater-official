import PageHeader from "@/app/_components/reusable/PageHeader";
import ProjectDetail from "./ProjectDetail";

export const metadata = {
  title: "Dự án",
  description: "Dự án của chúng tôi",
};

async function page({ params }) {
  const { id } = await params;

  return (
    <div className="mt-52">
      <div role="post" className="max-w-5xl mx-auto py-10 px-5 lg:px-0">
        <PageHeader title={"project"} />
        <ProjectDetail id={id}></ProjectDetail>
      </div>
    </div>
  );
}

export default page;
