import NewsSection from "@/components/common/News";
import { getDictionary } from "@/i18n/dictionaries";
import Pagination from "@/components/common/Pagination";
import ClientToastWrapper from "@/components/common/ClientToastWrapper";
import { getNews } from "@/actions/news.actions";
import type { Metadata } from 'next';

type NewsProps = {
  params: Promise<{ lang: Lang }>;
  searchParams: Promise<{ page?: string; perPage?: string }>;
};

export async function generateMetadata({ params }: NewsProps): Promise<Metadata> {
  const { lang } = await params;
  const fullDictionary = await getDictionary(lang);

  const title = fullDictionary.common["mainNav.news"]|| "სიახლეები";
  const description =  "იხილეთ უახლესი ამბები და სიახლეები.";
  const canonicalUrl = `http://localhost:3000/${lang}/news`;

  return {
    title: title,
    description: description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: title,
      description: description,
      locale: lang,
      type: 'website',
      url: canonicalUrl,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
      },
    },
  };
}

const News = async ({ params, searchParams }: NewsProps) => {
  const DEFAULT_PAGE_SIZE = 5;

  const { lang } = await params;
  const fullDictionary = (await getDictionary(lang)).common;
  let errorMessage: string | null = null;
  const awaitedSearchParams = await searchParams;
  const page =
    typeof awaitedSearchParams.page === "string"
      ? parseInt(awaitedSearchParams.page, 10)
      : 1;

  const perPage =
    typeof awaitedSearchParams.perPage === "string"
      ? parseInt(awaitedSearchParams.perPage)
      : DEFAULT_PAGE_SIZE;

  const result = await getNews({
    chanel: "desktop",
    news_number: perPage,
    page: page,
  });

  console.log(result)
  const newsData = result?.data || [];

  if (!newsData || newsData.length === 0) {
    errorMessage = "სიახლეების ჩატვირთვა ვერ მოხერხდა.";
  }

  const totalPages = Math.ceil((result?.total || 0) / perPage);
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://your-domain.com/${lang}/news?page=${page}`
    },
    "headline": fullDictionary['mainNav.news'] || "სიახლეები",
    "description": fullDictionary["site.description"],
    "image": [
      'https://your-domain.com/images/news-hero.jpg'
    ],
    "author": {
      "@type": "Organization",
      "name": "Your Organization Name"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Your Organization Name",
      "logo": {
        "@type": "ImageObject",
        "url": "https://your-domain.com/images/logo.png"
      }
    },
    "datePublished": new Date().toISOString(),
    "dateModified": new Date().toISOString(),
  };
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <div className="container space-y-12">
        {errorMessage && <ClientToastWrapper message={errorMessage} />}
        <div className="mb-10 py-12">
          <h1 className="text-center text-4xl text-space-blue tracking-tight dark:text-white font-semibold">
            {fullDictionary['mainNav.news']}
          </h1>
          <p className="px-24 pt-6 text-center text-base text-gray-500 leading-relaxed dark:text-white/85">
            {fullDictionary['site.description']}
          </p>
        </div>
        <NewsSection newsData={newsData} lang={lang} />
        <Pagination currentPage={page} totalPages={totalPages} />
      </div>
    </>
  );
};

export default News;
