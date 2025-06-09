import ContactSection from "@/app/_components/home/ContactSection";
import PageHeader from "@/app/_components/reusable/PageHeader";
import ProjectsTab from "./ProjectsTab";

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

function VideoSection() {
  return (
    <div className="py-md:pl-28 lg:pl-[444px] py-8">
      <div className="relative min-h-[300px] md:min-h-[500px] w-full overflow-hidden">
        <video
          src={"/videos/about-us-video.mp4"}
          className="object-cover absolute top-0 left-0 w-full h-full"
          autoPlay
          loop
          muted
        ></video>
      </div>
    </div>
  );
}
