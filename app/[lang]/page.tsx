import Heading from "@/components/features/home/Heading";
import ShippingCalculator from "@/components/features/home/ShippingCalculator/ShippingCalculator";
import React, { Suspense } from "react";
import Tarrifs from "@/components/features/home/Tariffs";
import Services from "@/components/features/home/Services";
import News from "@/components/features/home/News";
import InfiniteCarousel from "@/components/features/home/InfiniteCarousel";
import Footer from "@/components/layout/Footer";
interface HomePageProps {
  params: Promise<{ lang: Lang }> | { lang: Lang };
}

const Home = async ({ params }: HomePageProps) => {
  const { lang } = await params;
  return (
    <>
      <Heading lang={lang}>
        <ShippingCalculator lang={lang} />
      </Heading>
      
      <div className="sm:container">
        <div className="h-[310] md:h-auto"></div>
        <Suspense fallback={<div className="w-40 h-40">LOADING</div>}>
          <Tarrifs lang={lang} />
        </Suspense>
        <Services lang={lang} />
      </div>
      <InfiniteCarousel />
      <div className="lg:container">
        <News lang={lang} />
      </div>
    </>
  );
};

export default Home;
