import Heading from "@/components/features/home/Heading";
import ShippingCalculator from "@/components/features/home/ShippingCalculator/ShippingCalculator";
import React from "react";
import Tarrifs from "@/components/features/home/Tariffs";
import Services from "@/components/features/home/Services";
import News from "@/components/common/News";
import InfiniteCarousel from "@/components/features/home/InfiniteCarousel";
import { getDictionary } from "@/i18n/dictionaries";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getNews } from "@/actions/news.actions";
import { cache } from "react";
import type { Metadata } from "next";

const cachedGetNews = cache(getNews);

interface HomePageProps {
  params: Promise<{ lang: Lang }>;
}

export const metadata: Metadata = {
  title: "SpaceCargo - Fast & Reliable Shipping",
  description: "Calculate shipping, explore tariffs, read news, and enjoy our services. Your trusted partner for deliveries worldwide.",
  openGraph: {
    title: "SpaceCargo - Fast & Reliable Shipping",
    description: "Calculate shipping instantly and explore our services.",
    url: "https://spacecargo.ge",
    siteName: "SpaceCargo",
    images: [
      {
        url: "https://spacecargo.ge/og-image.png",
        width: 1200,
        height: 630,
        alt: "SpaceCargo - Shipping",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  alternates: {
    canonical: "https://spacecargo.ge",
  },
};

const Home = async ({ params }: HomePageProps) => {
  const { lang } = await params;

  const [fullDictionary, newsResult] = await Promise.all([
    getDictionary(lang),
    cachedGetNews({ chanel: "desktop", news_number: 3, page: 1 }),
  ]);

  const newsData = newsResult.data;

  return (
    <>
      <Heading lang={lang}>
        <div
          style={{
            filter: "drop-shadow(0px 8px 16px rgba(0, 0, 0, 0.25))",
          }}
          className="relative bottom-40 container"
        >
          <ShippingCalculator />
        </div>
      </Heading>

      <div className="sm:container">
        <Tarrifs lang={lang} />
        <Services lang={lang} />
      </div>
      <div className="pt-10">
        <InfiniteCarousel />
      </div>
      <div className="lg:container md:ml-5 px-10">
        <h1 className="my-30 text-center text-4xl font-bold">
          {fullDictionary.home["news.title"]}
        </h1>
        <News newsData={newsData} lang={lang} />
        <div className="flex mt-16">
          <Link className="mx-auto" href={"/"}>
            <Button className="h-12 min-w-[225px] bg-space-blue-muted dark:text-white shadow-md hover:bg-space-blue-muted/90 dark:hover:bg-black">
              {fullDictionary.home["news.buttonText"]}
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Home;
