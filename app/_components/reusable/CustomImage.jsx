"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog";
import { RotateCw, ZoomIn, ZoomOut, X } from "lucide-react";
import Image from "next/image";

function CustomImage({ src, alt }) {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [scale, setScale] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });
  const imageRef = useRef(null);

  // Calculate image size when the dialog opens
  useEffect(() => {
    if (isPreviewOpen && src) {
      const img = new window.Image();
      img.src = src;
      img.onload = () => {
        setImageSize({ width: img.width, height: img.height });
      };
    }
  }, [isPreviewOpen, src]);

  const handleZoomIn = () => setScale((prev) => prev + 0.25);
  const handleZoomOut = () => setScale((prev) => Math.max(0.25, prev - 0.25));
  const handleRotate = () => setRotation((prev) => prev + 90);

  const resetTransformations = () => {
    setScale(1);
    setRotation(0);
  };

  return (
    <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
      {/* Thumbnail Image */}
      <DialogTrigger asChild>
        <motion.div
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
          className="cursor-pointer w-full h-full relative" // Parent container with fixed height
        >
          <Image
            src={src}
            alt={alt}
            fill // Fill the parent container
            className="rounded-lg shadow-md object-cover" // Adjust object-fit
            placeholder="blur" // Optional: Add a blur placeholder
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/wcAAgAB/1h1ZAAAAABJRU5ErkJggg==" // Optional: Add a blur placeholder
          />
        </motion.div>
      </DialogTrigger>

      {/* Preview Modal */}
      <DialogContent
        className="flex items-center justify-center p-0 overflow-hidden"
        style={{
          width: `${Math.min(
            imageSize.width * scale,
            window.innerWidth * 0.9
          )}px`,
          height: `${Math.min(
            imageSize.height * scale,
            window.innerHeight * 0.9
          )}px`,
        }}
      >
        {/* DialogTitle for accessibility */}
        <DialogTitle className="sr-only">Image Preview</DialogTitle>

        <div className="relative w-full h-full p-8">
          {/* Image with Transformations */}
          <motion.div
            style={{ scale, rotate: rotation }}
            drag
            dragConstraints={{ top: 0, left: 0, right: 0, bottom: 0 }}
            dragTransition={{ bounceStiffness: 600, bounceDamping: 20 }}
            className="w-full h-full"
          >
            <div className="w-full h-full relative">
              <Image
                src={src}
                alt={alt}
                fill // Fill the parent container
                className="rounded-lg object-contain" // Adjust object-fit
              />
            </div>
          </motion.div>

          {/* Controls */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 bg-background/80 p-2 rounded-lg shadow-md">
            <Button size="icon" onClick={handleZoomIn}>
              <ZoomIn className="h-4 w-4" />
            </Button>
            <Button size="icon" onClick={handleZoomOut}>
              <ZoomOut className="h-4 w-4" />
            </Button>
            <Button size="icon" onClick={handleRotate}>
              <RotateCw className="h-4 w-4" />
            </Button>
            <Button size="icon" onClick={resetTransformations}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default CustomImage;
