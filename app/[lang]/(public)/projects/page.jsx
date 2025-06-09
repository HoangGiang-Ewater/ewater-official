import ContactSection from "@/app/_components/home/ContactSection";
import PageHeader from "@/app/_components/reusable/PageHeader";
import ProjectsTab from "./ProjectsTab";
import VideoSection from "@/app/_components/reusable/VideoSection";

export const metadata = {
  title: "Dự án",
  description: "Dự án của chúng tôi",
};

function page() {
  return (
    <div className="min-h-screen mt-52">
      <div className="max-w-5xl mx-auto">
        <PageHeader
          title={"projects"}
          description={"Dự án của chúng tôi"}
          headerTagText={"ewater - dự án của chúng tôi"}
        />
        <ProjectsTab />
      </div>
      <VideoSection />
      <ContactSection />
    </div>
  );
}

export default page;
