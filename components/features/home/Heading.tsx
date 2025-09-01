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
    <div className="relative w-full z-20">
      <div className="relative w-full min-h-[600px] ">
        <Image
          src="/images/home-heading.webp"
          blurDataURL={img}
          alt="heading"
          fill
          style={{ objectFit: "initial" }}
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 100vw, calc(100vw - 288px)"
          priority
          fetchPriority="high"
          placeholder="blur"
        />
        <div className="absolute inset-0 bg-black opacity-30"></div>
      </div>
      <div className="absolute top-25 inset-0 text-center rounded-md">
        <div className="opacity-0 animate-fade-slide-in gap-6 flex flex-col space-y-4">
          <h1 className="text-white text-5xl font-bold md:text-6xl lg:text-7xl text-center z-10 font-georgian">
            {dictionary["heading.title"]}
          </h1>
          <h2 className="text-white/90 text-3xl font-bold md:text-3xl lg:text-4xl text-center z-10 font-georgian">
            {dictionary["heading.subtitle"]}
          </h2>
          <p className="text-white/80 text-sm md:text-md lg:text-xl text-center z-10">
            {dictionary["heading.description"]}
          </p>
        </div>
      </div>
      {children}

    </div>
  );
};

export default Heading;
