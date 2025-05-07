"use client";

import useCarousel from "@/hooks/useCarousel";
import { motion } from "motion/react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Project from "../reusable/Project";
import { blurSlideUp } from "@/lib/animate";

function ProjectsCarousel({ projects }) {
  const { setApi, current, count, scrollPrev, scrollNext } = useCarousel();

  return (
    <>
      <motion.div
        className="flex items-start justify-between gap-6 mt-8 flex-col sm:flex-col md:flex-row sm:gap-16"
        role="carousel-header"
      >
        <motion.h2
          className="text-4xl font-bold leading-normal text-foreground"
          role="carousel-title"
          {...blurSlideUp}
          transition={{ ...blurSlideUp.transition, delay: 0.2 }}
        >
          Những dự án chúng tôi tham gia
        </motion.h2>

        <motion.div
          {...blurSlideUp}
          transition={{ ...blurSlideUp.transition, delay: 0.4 }}
          className="carousel-controls relative flex items-center
          justify-center"
          role="carousel-controls"
        >
          <div className="flex items-center mt-4 gap-5">
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
            <div className="flex">
              <span>{current}</span> / <span>{count}</span>
            </div>
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
        </motion.div>
      </motion.div>
      <Carousel role="carousel" className="mt-8" setApi={setApi}>
        <CarouselContent className="mt-8 -ml-8">
          {projects.map((project, index) => (
            <CarouselItem
              key={project.id}
              className="md:basis-[300px] lg:basis-[400px] pl-8"
            >
              <motion.div
                initial={{ opacity: 0, y: 50, filter: "blur(10px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0)" }}
                viewport={{ margin: "500px 0px -100px 0px", once: true }}
                transition={{ delay: index * 0.3, duration: 0.5 }}
              >
                <Project project={project} />
              </motion.div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </>
  );
}

export default ProjectsCarousel;
