import AboutUs from "@/app/_components/home/AboutUs";
import Features from "@/app/_components/home/Features";
import HeroBanner from "@/app/_components/home/HeroBanner";
import Overview from "@/app/_components/home/Overview";
import Projects from "@/app/_components/home/Projects";
import ContactSection from "@/app/_components/home/ContactSection";
import FeatureProject from "@/app/_components/home/FeatureProject";
import Feedbacks from "@/app/_components/home/Feedbacks";
import OurImages from "@/app/_components/home/OurImages";
import VideoSection from "@/app/_components/reusable/VideoSection";

function page() {
  return (
    <div>
      <HeroBanner />
      <Features />
      <AboutUs />
      <Projects />
      <Overview />
      <FeatureProject />
      <OurImages />
      <VideoSection />
      <Feedbacks />
      <ContactSection />
    </div>
  );
}

export default page;
