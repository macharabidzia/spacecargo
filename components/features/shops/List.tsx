import React from "react";
import BrandCard from "./BrandCard"; // Adjust the import path if BrandCard is in a different directory
import Pagination from "@/components/common/Pagination";
import Filters from "./Filters";
const List = async () => {
  const items = [
    {
      id: 1,
      imageUrl: "/images/1.webp", // Ensure you have this image in your public folder
      title: "Zara Brand",
      description:
        "ლორემ იპსუმ გაგრძელებულმა ქანდაკებას ადვილია გაქცეოდათ თავაზიან, თამაშობით ჰჟუტავს პირებად.",
      linkText: "იხილეთ საიტი",
      href: "https://www.zara.com",
    },
    {
      id: 2,
      imageUrl: "/images/2.webp", // Example new image
      title: "Fashion Hub",
      description:
        "Another exciting product description goes here. Discover amazing new arrivals and trends in fashion.",
      linkText: "Explore Now",
      href: "https://www.fashionhub.com",
    },
    {
      id: 3,
      imageUrl: "/images/3.webp", // Example new image
      title: "Trend Setter",
      description:
        "A third captivating description for your item, enticing users with unique features and style that stand out.",
      linkText: "View Collection",
      href: "https://www.trendsetter.com",
    },
    {
      id: 5,
      imageUrl: "/images/dubai.webp",
      title: "Zara Home",
      description:
        "A selection of home decor items from Zara. Find furniture, textiles, and accessories to style your home.",
      linkText: "Shop Home",
      href: "https://www.zarahome.com",
    },
    {
      id: 6,
      imageUrl: "/images/dubai.webp",
      title: "Zara Home",
      description:
        "A selection of home decor items from Zara. Find furniture, textiles, and accessories to style your home.",
      linkText: "Shop Home",
      href: "https://www.zarahome.com",
    },
    {
      id: 7,
      imageUrl: "/images/dubai.webp",
      title: "Zara Home",
      description:
        "A selection of home decor items from Zara. Find furniture, textiles, and accessories to style your home.",
      linkText: "Shop Home",
      href: "https://www.zarahome.com",
    },
    {
      id: 8,
      imageUrl: "/images/dubai.webp",
      title: "Zara Home",
      description:
        "A selection of home decor items from Zara. Find furniture, textiles, and accessories to style your home.",
      linkText: "Shop Home",
      href: "https://www.zarahome.com",
    },
    {
      id: 9,
      imageUrl: "/images/dubai.webp",
      title: "Zara Home",
      description:
        "A selection of home decor items from Zara. Find furniture, textiles, and accessories to style your home.",
      linkText: "Shop Home",
      href: "https://www.zarahome.com",
    },
    {
      id: 10,
      imageUrl: "/images/dubai.webp",
      title: "Zara Home",
      description:
        "A selection of home decor items from Zara. Find furniture, textiles, and accessories to style your home.",
      linkText: "Shop Home",
      href: "https://www.zarahome.com",
    },
  ];

  const fruitOptions = [
    { value: "apple", label: "Apple" },
    { value: "banana", label: "Bananaaaaaa" },
    { value: "grape", label: "Grape" },
    { value: "orange", label: "Orange", disabled: true },
  ];
  const initialSelectedFruit = "banana";

  return (
    <>
      <Filters
        initialSelectedFruit={initialSelectedFruit}
        fruitOptions={fruitOptions}
        
      />
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 auto-rows-fr place-items-stretch pb-5 lg:px-4">
        {items.map((item) => (
          <BrandCard
            key={item.id}
            logoSrc={item.imageUrl}
            brandName={item.title}
            description={item.description}
            linkText={item.linkText}
            href={item.href}
          />
        ))}
      </div>
      <Pagination totalPages={10} />
    </>
  );
};

export default List;
