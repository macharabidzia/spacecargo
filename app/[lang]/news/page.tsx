import React from "react";
import NewsSection from "@/components/common/News";
import { getDictionary } from "@/i18n/dictionaries";
import Pagination from "@/components/common/Pagination";
import { fetchNews } from "@/actions/news.actions";
import ClientToastWrapper from "@/components/common/ClientToastWrapper";

type News = {
  params: Promise<{ lang: Lang }>;
};

const News = async ({ params }: News) => {
  const { lang } = await params;
  const fullDictionary = await getDictionary(lang);
  let items = null; // Initialize items as null
  let errorMessage: string | null = null; // To hold error message for the toast

  try {
    items = await fetchNews();
  } catch (error) {
    if (error instanceof Error)
      errorMessage = error.message || "Failed to load news. Please try again.";
  }
  console.log(items)
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
      id: 4,
      imgSrc: "/images/3.webp",
      imgAlt: fullDictionary.home["news.card3.title"],
      title: fullDictionary.home["news.card3.title"],
      footerText: fullDictionary.home["news.card3.footerText"],
      color: "bg-space-green",
      image: "/icons/receipt-edit.svg",
    },
    {
      id: 5,
      imgSrc: "/images/3.webp",
      imgAlt: fullDictionary.home["news.card3.title"],
      title: fullDictionary.home["news.card3.title"],
      footerText: fullDictionary.home["news.card3.footerText"],
      color: "bg-space-green",
      image: "/icons/receipt-edit.svg",
    },
    {
      id: 6,
      imgSrc: "/images/3.webp",
      imgAlt: fullDictionary.home["news.card3.title"],
      title: fullDictionary.home["news.card3.title"],
      footerText: fullDictionary.home["news.card3.footerText"],
      color: "bg-space-green",
      image: "/icons/receipt-edit.svg",
    },
    {
      id: 7,
      imgSrc: "/images/3.webp",
      imgAlt: fullDictionary.home["news.card3.title"],
      title: fullDictionary.home["news.card3.title"],
      footerText: fullDictionary.home["news.card3.footerText"],
      color: "bg-space-green",
      image: "/icons/receipt-edit.svg",
    },
  ];
  return (
    <div className="container">
      {errorMessage && <ClientToastWrapper message={errorMessage} />}
      <div className="mb-10 py-12">
        <h1 className="text-center text-4xl font-bold text-space-blue">
          სიახლეები
        </h1>
        <p className="px-24 py-4 text-center text-gray-500">
          ლორემ იპსუმ პლეხანოვიდან ჯაყოსაგან სოფლელნი, აგორავებს, ასაფრენი,
          წიგნიც, უძღებ მახეს, გაევლო გაგაცნოთ, მოისურვონ დარბაზისა. ჯაყოსაგან
          დაამშვიდებს მოვატყუეთ ბორჯომელ
        </p>
      </div>
      <NewsSection data={newsData} lang={lang} />
      <Pagination totalPages={5} />
    </div>
  );
};

export default News;
