import Heading from "@/components/features/home/Heading";
import ShippingCalculator from "@/components/features/home/ShippingCalculator/ShippingCalculator";
import React from "react";
import Tarrifs from "@/components/features/home/Tariffs";
import Services from "@/components/features/home/Services";
import News from "@/components/common/News";
import InfiniteCarousel from "@/components/features/home/InfiniteCarousel";
import { getDictionary } from "@/i18n/dictionaries";
import EmailConfirmationModal from "@/components/common/CustomModal";
interface HomePageProps {
  params: Promise<{ lang: Lang }>
}

const Home = async ({ params }: HomePageProps) => {
  const { lang } = await params;
  const fullDictionary = await getDictionary(lang);
  const newsData = [
    {
      id: 1,
      imgSrc: "/images/1.webp",
      imgAlt: fullDictionary.home["news.card1.title"],
      title: fullDictionary.home["news.card1.title"],
      footerText: fullDictionary.home["news.card1.footerText"],
      color: "bg-space-orange",
      image: "/icons/airplane-white.svg",
    },
    {
      id: 2,
      imgSrc: "/images/2.webp",
      imgAlt: fullDictionary.home["news.card2.title"],
      title: fullDictionary.home["news.card2.title"],
      footerText: fullDictionary.home["news.card2.footerText"],
      color: "bg-space-blue-standard",
      image: "/icons/truck-white.svg",
    },
    {
      id: 3,
      imgSrc: "/images/3.webp",
      imgAlt: fullDictionary.home["news.card3.title"],
      title: fullDictionary.home["news.card3.title"],
      footerText: fullDictionary.home["news.card3.footerText"],
      color: "bg-space-green",
      image: "/icons/receipt-edit.svg",
    },
  ];

  return (
    <>
      <EmailConfirmationModal isOpen={true} />
      <Heading lang={lang}>
        <div
          style={{
            filter: "drop-shadow(0px 8px 16px rgba(0, 0, 0, 0.25))",
          }}
          className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-full md:w-11/12 lg:w-10/14 z-50 px-4 md:px-0 h-[200px]"
        >
          <ShippingCalculator lang={lang} />
        </div>
      </Heading>
      <div className="sm:container">
        <div className="h-[310] md:h-auto"></div>
        <Tarrifs lang={lang} />
        <Services lang={lang} />
      </div>
      <InfiniteCarousel />
      <div className="lg:container md:ml-5 px-10">
        <h1 className="mb-24 text-center text-2xl font-bold">
          {fullDictionary.home["news.title"]}
        </h1>
        <News data={newsData} lang={lang} />
      </div>
    </>
  );
};

export default Home;
