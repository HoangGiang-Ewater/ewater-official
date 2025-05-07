import HeaderTag from "@/app/_components/reusable/HeaderTag";
import { cn } from "@/lib/utils";
import Functions from "./Functions";
import TextStroke from "@/app/_components/reusable/TextStroke";
import Milestone from "./Milestone";

export const metadata = {
  title: "About Us",
};

function page() {
  return (
    <div className="relative">
      <Hero />
      <Functions />
      <TextStroke className="absolute rotate-90 -right-[400px] tracking-[34px] top-2/3 z-10 kw-max opacity-50">
        ABOUT US
      </TextStroke>
      <Milestone />
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
          backgroundImage: "url('/backgrounds/about-us-bg.png')",
        }}
      >
        <div className="absolute max-w-5xl w-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white px-5">
          <HeaderTag className="text-white" lineClassName="bg-white">
            EWATER
          </HeaderTag>
          <h1 className="[text-shadow:_0_4px_4px_rgb(0_0_0_/_0.8)] text-3xl md:text-6xl font-bold text-white my-5 shadow-2xl">
            VỀ CHÚNG TÔI
          </h1>
          <p className="[text-shadow:_0_4px_4px_rgb(0_0_0_/_0.8)] max-w-xl text-sm md:text-base">
            EWATER là đơn vị có tư cách pháp nhân, con dấu riêng, đã được tách
            ra từ Công ty Cổ phần Đầu tư và Xây dựng Không gian. Trụ sở của
            EWATER đặt tại Thành phố Hồ Chí Minh.
          </p>
        </div>
      </div>
    </div>
  );
}
