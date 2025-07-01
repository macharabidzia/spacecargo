import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";
import { getDictionary } from "@/i18n/dictionaries";
import { HomeDictionary } from "@/types/dictionary";
import getBase64 from "@/lib/get-base64";

interface HeadingProps {
  children?: React.ReactNode;
  className?: string;
  lang: Lang;
}

const Heading = async ({ children, lang }: HeadingProps) => {
  const fullDictionary = await getDictionary(lang);
  const dictionary: HomeDictionary = fullDictionary.home;
  const img = await getBase64("/images/home-heading.webp");
  return (
    <div className="relative w-full xl:px-36">
      <div className="relative w-full h-[600px] ">
        <Image
          src="/images/home-heading.webp"
          blurDataURL={img}
          alt="heading"
          fill
          style={{ objectFit: "cover" }}
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 100vw, calc(100vw - 288px)"
          priority
          className="lg:rounded-4xl"
          fetchPriority="high"
          placeholder="blur"
        />
        <div className="absolute w-full h-full opacity-0 dark:opacity-50 bg-black"></div>
      </div>
      <div className="absolute top-10 inset-0 space-y-7 text-center gap-6 p-4 sm:p-6 md:p-8 rounded-md">
        <h1 className="text-white text-5xl font-bold md:text-6xl lg:text-7xl text-center z-10 font-georgian">
          {dictionary["heading.title"]}
        </h1>
        <h2 className="text-white/90 text-3xl font-bold md:text-3xl lg:text-4xl text-center z-10 font-georgian">
          {dictionary["heading.subtitle"]}
        </h2>
        <p className="text-white/80 text-sm md:text-md lg:text-xl text-center z-10">
          {dictionary["heading.description"]}
        </p>
        <Button
          variant="ghost"
          className="border border-white hover:border-none hover:bg-space-blue-light hover:text-white text-white cursor-pointer px-6 py-3 h-13"
        >
          {dictionary["heading.buttonText"]}
        </Button>
        {children}
      </div>
    </div>
  );
};

export default Heading;
