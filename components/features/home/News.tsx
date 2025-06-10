import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const newsData = [
  {
    id: 1,
    imgSrc: "/images/1.webp",
    imgAlt: "A descriptive alt text for the first news image.",
    title: "The Future of Sustainable Tech",
    footerText: "Published on June 10, 2025",
    color: "bg-space-orange",
    image: "/icons/airplane-white.svg",
  },
  {
    id: 2,
    imgSrc: "/images/2.webp",
    imgAlt: "A descriptive alt text for the second news image.",
    title: "New Breakthroughs in AI",
    footerText: "Published on June 9, 2025",
    color: "bg-space-blue-standard",
    image: "/icons/truck-white.svg",
  },
  {
    id: 3,
    imgSrc: "/images/3.webp",
    imgAlt: "A descriptive alt text for the third news image.",
    title: "Exploring the Deep Sea",
    footerText: "Published on June 8, 2025",
    color: "bg-space-green",
    image: "/icons/receipt-edit.svg",
  },
];

const NewsSection = () => {
  return (
    <>
      <section className="w-full ml-0 md:ml-5 px-10">
        <h1 className="mb-24 text-center text-2xl font-bold">სიახლეები</h1>

        <div className="flex flex-col items-center gap-y-20 md:flex-row md:items-start md:justify-center ml-10 sm:ml-0 md:gap-x-12">
          {newsData.map((item) => (
            <Card
              key={item.id}
              className="w-full relative max-w-sm rounded-lg border bg-card text-card-foreground shadow-lg overflow-visible"
            >
              <CardContent className="pt-4 h-52">
                <div className="absolute -top-10 -left-6 w-full h-full max-h-65 overflow-hidden rounded-lg shadow-xl">
                  <img
                    src={item.imgSrc}
                    alt={item.imgAlt}
                    className="h-full w-full object-cover transition-transform duration-500 ease-in-out hover:scale-120"
                  />
                </div>
                <div
                  className={`${item.color} h-16 w-16 absolute -left-6 bottom-10 flex justify-center items-center rounded-lg`}
                >
                  <img className="flex h-6 w-6" src={item.image} />
                </div>
              </CardContent>
              <CardFooter className="ml-10 mb-5">
                <p className="font-semibold">
                  ლორემ იპსუმ მიუხვდები პალტიკა ფროიდს ტრაგედიით
                </p>
              </CardFooter>
            </Card>
          ))}
        </div>
        <div className="flex py-12">
          <Button className="mx-auto h-12 bg-space-blue-light">
            ყველას ნახვა
          </Button>
        </div>
      </section>
    </>
  );
};

export default NewsSection;
