"use client"; // Required for Framer Motion and interactivity

import React from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"; // ShadCN UI components
import Image from "next/image";

// Helper function to generate random positions within a container
const getRandomPosition = (maxX, maxY) => {
  return {
    x: Math.floor(Math.random() * maxX),
    y: Math.floor(Math.random() * maxY),
  };
};

export function Timeline({ items }) {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]); // Adjust scroll animation

  return (
    <div className="relative space-y-8">
      {items.map((item, index) => (
        <motion.div
          key={index}
          className="flex items-start gap-8"
          style={{ y }}
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5, delay: index * 0.2 }}
        >
          {/* Left Side: Date and Description */}
          <div className="flex-1">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold">
                  {item.date}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{item.description}</p>
              </CardContent>
            </Card>
          </div>

          {/* Dot Connector */}
          <div className="absolute left-1/2 top-0 h-full w-1 -translate-x-1/2 bg-primary/20">
            {/* Dot */}
            <motion.div
              className="h-4 w-4 rounded-full bg-primary absolute -left-1.5 -top-2"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            />
          </div>

          {/* Right Side: Images with Random Positioning */}
          <div className="flex-1 relative h-64 w-full">
            {item.images.map((image, imageIndex) => {
              const { x, y } = getRandomPosition(200, 200); // Adjust maxX and maxY as needed
              return (
                <motion.div
                  key={imageIndex}
                  className="absolute"
                  style={{ left: x, top: y }}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.5, delay: imageIndex * 0.2 }}
                >
                  <div className="relative h-32 w-32 overflow-hidden rounded-lg shadow-lg">
                    <Image
                      src={image}
                      alt={`Timeline image ${imageIndex + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      ))}

      {/* End-up Item */}
      <div className="flex justify-center items-center relative">
        {/* End-up Content */}
        <div className="flex-1 text-center mt-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold">
                {
                  // get current year
                  new Date().getFullYear()
                }
              </CardTitle>
            </CardHeader>
          </Card>
        </div>
      </div>
    </div>
  );
}
