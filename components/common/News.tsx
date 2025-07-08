import React from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { getDictionary } from "@/i18n/dictionaries";

type Lang = "en" | "ka";

interface NewsSectionProps {
  lang: Lang;
  data: any[];
}

export const NewsSection = async ({ lang, data }: NewsSectionProps) => {
  const fullDictionary = await getDictionary(lang);


  return (
    <section className="w-full ml-0">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-20 gap-x-12 justify-items-center">
        {data.map((item: any) => (
          <Card
            key={item.id}
            className="w-full relative max-w-sm rounded-lg border bg-card text-card-foreground shadow-lg overflow-visible"
          >
            <CardContent className="pt-4 h-52">
              <div className="absolute -top-10 -left-6 w-full h-full max-h-65 overflow-hidden rounded-lg shadow-xl">
                <Image
                  fill
                  src={item.imgSrc}
                  alt={item.imgAlt}
                  className="h-full w-full object-cover transition-transform duration-500 ease-in-out hover:scale-120"
                />
              </div>
              <div
                className={`${item.color} h-16 w-16 absolute -left-6 bottom-6 flex justify-center items-center rounded-lg`}
              >
                <Image
                  alt="label"
                  width={24}
                  height={24}
                  className="flex h-6 w-6"
                  src={item.image}
                />
              </div>
            </CardContent>
            <CardFooter className="ml-10 mb-5">
              <p className="font-semibold">{item.title}</p>
            </CardFooter>
          </Card>
        ))}
      </div>
      <div className="flex py-12">
        <Button className="mx-auto h-12 bg-space-blue-light">
          {fullDictionary.home["news.buttonText"]}
        </Button>
      </div>
    </section>
  );
};

export default NewsSection;
