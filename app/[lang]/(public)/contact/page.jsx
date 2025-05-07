import HeaderTag from "@/app/_components/reusable/HeaderTag";
import { cn } from "@/lib/utils";
import ContactInformations from "./ContactInformations";
import ContactSection from "@/app/_components/home/ContactSection";

function page() {
  return (
    <div>
      <Hero />
      <ContactInformations />
      <ContactSection />
    </div>
  );
}

export default page;

function Hero() {
  return (
    <div className="mt-44">
      <div
        className={cn(
          "w-full h-[300px] md:h-[450px] bg-cover bg-center bg-no-repeat relative"
        )}
        style={{
          backgroundImage: "url('/backgrounds/contact-bg.png')",
        }}
      >
        <div className="absolute max-w-5xl w-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white px-5">
          <HeaderTag className="text-white" lineClassName="bg-white">
            EWATER
          </HeaderTag>
          <h1 className="[text-shadow:_0_4px_4px_rgb(0_0_0_/_0.8)] text-3xl md:text-6xl font-bold text-white my-5 shadow-2xl">
            LIÊN HỆ
          </h1>
          <p className="[text-shadow:_0_4px_4px_rgb(0_0_0_/_0.8)] max-w-xl text-sm md:text-base">
            Nếu quý khách có nhu cầu hợp tác, đừng ngần ngại liên hệ với chúng
            tôi!
          </p>
        </div>
      </div>
    </div>
  );
}
