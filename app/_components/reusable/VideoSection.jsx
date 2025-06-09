"use client";

import { getAboutVideoUrl } from "@/api/media";

function VideoSection() {
  const aboutUsVideo = getAboutVideoUrl();

  return (
    <div className="py-16 pl-0 md:pl-28 lg:pl-52 pr-0">
      <div className="relative h-[300px] md:h-[500px] w-full overflow-hidden">
        <video
          src={aboutUsVideo}
          className="object-cover absolute top-0 left-0 w-full h-full"
          autoPlay
          loop
          muted
        ></video>
      </div>
    </div>
  );
}

export default VideoSection;
