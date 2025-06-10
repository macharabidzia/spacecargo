"use client";
import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

const InfiniteCarousel = () => {
  const plugin = React.useRef(
    Autoplay({ delay: 1000, stopOnInteraction: true })
  );

  return (
    <Carousel
      opts={{
        align: "start",
        loop: true,
        slidesToScroll: 1,
      }}
      plugins={[plugin.current]}
      className="w-full my-20"
    >
      <CarouselContent>
        {[
          "/images/dubai.webp",
          "/images/gulf.webp",
          "/images/tuig.webp",
          "/images/turkish.webp",
          "/images/dubai.webp",
          "/images/gulf.webp",
          "/images/tuig.webp",
          "/images/turkish.webp",
        ].map((src, idx) => (
          <CarouselItem
            key={idx}
            className="sm:basis-1/2 md:basis-1/3 lg:basis-1/5 flex items-center justify-center"
          >
            <img className="w-60 mx-auto" src={src} alt={`slide-${idx}`} />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};

export default InfiniteCarousel;
