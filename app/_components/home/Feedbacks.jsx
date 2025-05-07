"use client";

import Feedback from "@/app/_components/reusable/Feedback";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import React from "react";

function Feedbacks() {
  const feedbacks = [
    {
      id: 1,
      name: "John Doe",
      image: "/images/user-feedback-placeholder.png",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
      user_title: "CEO, Company Name",
      dateTime: "2021-01-01",
    },
    {
      id: 2,
      name: "Jane Doe",
      image: "/images/user-feedback-placeholder.png",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
      user_title: "CEO, Company Name",
      dateTime: "2021-02-01",
    },
    {
      id: 3,
      name: "Tran Thu Ha",
      image: "/images/user-feedback-placeholder.png",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      user_title: "CEO, Company Name",
      dateTime: "2021-03-01",
    },
    {
      id: 4,
      name: "Tuan Ngoc",
      image: "/images/user-feedback-placeholder.png",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      user_title: "CEO, Company Name",
      dateTime: "2021-04-01",
    },
  ];

  const [api, setApi] = React.useState();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  const scrollPrev = () => {
    if (api) api.scrollPrev();
  };

  const scrollNext = () => {
    if (api) api.scrollNext();
  };

  // Carousel controls
  React.useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <div className="py-16 px-5 md:pl-28 md:pr-0 lg:pl-52">
      <Carousel setApi={setApi} className="relative">
        <CarouselContent className="-ml-8">
          {feedbacks.map((feedback) => (
            <CarouselItem
              key={feedback.id}
              className="flex gap-6 basis-full md:basis-3/4 pl-8"
            >
              <Feedback feedback={feedback} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      <div className="flex items-center mt-4 gap-5 !text-foreground">
        <button onClick={scrollPrev}>
          <svg
            width="71"
            height="8"
            viewBox="0 0 71 8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0.646447 3.64645C0.451184 3.84171 0.451184 4.15829 0.646447 4.35355L3.82843 7.53553C4.02369 7.7308 4.34027 7.7308 4.53553 7.53553C4.7308 7.34027 4.7308 7.02369 4.53553 6.82843L1.70711 4L4.53553 1.17157C4.7308 0.976311 4.7308 0.659728 4.53553 0.464466C4.34027 0.269204 4.02369 0.269204 3.82843 0.464466L0.646447 3.64645ZM1 4.5H71V3.5H1V4.5Z"
              fill="#1F2937"
            />
          </svg>
        </button>
        {current} / {count}
        <button onClick={scrollNext}>
          <svg
            width="72"
            height="8"
            viewBox="0 0 72 8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1 3.5C0.723858 3.5 0.5 3.72386 0.5 4C0.5 4.27614 0.723858 4.5 1 4.5V3.5ZM71.3536 4.35355C71.5488 4.15829 71.5488 3.84171 71.3536 3.64645L68.1716 0.464466C67.9763 0.269204 67.6597 0.269204 67.4645 0.464466C67.2692 0.659728 67.2692 0.976311 67.4645 1.17157L70.2929 4L67.4645 6.82843C67.2692 7.02369 67.2692 7.34027 67.4645 7.53553C67.6597 7.7308 67.9763 7.7308 68.1716 7.53553L71.3536 4.35355ZM1 4.5H71V3.5H1V4.5Z"
              fill="#1F2937"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default Feedbacks;
