import Heading from "@/components/features/home/Heading";
import ShippingCalculator from "@/components/features/home/ShippingCalculator/ShippingCalculator";
import { productService } from "@/features/products/service";
import { getQueryClient } from "@/lib/queryClient";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import React from "react";
import Tarrifs from "@/components/features/home/Tariffs";
import Services from "@/components/features/home/Services";
import News from "@/components/features/home/News";
import InfiniteCarousel from "@/components/features/home/InfiniteCarousel";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { commentsService } from "@/features/comments/service";
const Home = () => {
  const queryClient = getQueryClient();
  queryClient.prefetchQuery({
    queryKey: ["comments", "list"],
    queryFn: () => commentsService.getPosts(),
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Heading>
        <ShippingCalculator />
      </Heading>
      <div className="sm:container">
        <div className="h-[310] md:h-auto"></div>
        <Tarrifs />
        <Services />
      </div>
      <InfiniteCarousel />
      <div className="lg:container">
        <News />
      </div>
      <Footer />
    </HydrationBoundary>
  );
};

export default Home;
