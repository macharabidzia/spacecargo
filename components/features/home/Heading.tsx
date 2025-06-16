import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";

const Heading: React.FC<{ children?: React.ReactNode; className?: string }> = ({
  children,
  className,
}) => {
  return (
    <div className="relative w-full xl:px-36">
      <div className="relative w-full h-[600px] overflow-hidden lg:rounded-4xl">
        <Image
          src="/images/home-heading.webp"
          alt="heading"
          fill
          style={{ objectFit: "cover" }}
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 100vw, calc(100vw - 288px)"
          priority
          fetchPriority="high"
        />
        <div className="absolute w-full h-full opacity-0 dark:opacity-50 bg-black"></div>
      </div>
      <div className="absolute top-10 inset-0 space-y-7 text-center gap-6 p-4 sm:p-6 md:p-8">
        <h1 className="text-white text-5xl font-bold md:text-6xl lg:text-7xl text-center z-10 font-georgian">
          SPACE CARGO
        </h1>
        <h2 className="text-white/90 text-3xl font-bold md:text-3xl lg:text-4xl text-center z-10 font-georgian">
          საერთაშორისო საჰაერო გადაზიდვები
        </h2>
        <p className="text-white/80 text-sm md:text-md lg:text-xl text-center z-10">
          სწრაფი და უსაფრთხო გადაზიდვები მსოფლიოს ნებისმიერ წერტილში
        </p>
        <Button
          variant="ghost"
          className="border border-white hover:border-none hover:bg-space-blue-light hover:text-white text-white cursor-pointer px-6 py-3 h-13"
        >
          დაიწყე გადაზიდვა
        </Button>
        {children}
      </div>
    </div>
  );
};

export default Heading;
