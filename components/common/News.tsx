import { Card, CardContent, CardFooter } from "@/components/ui/card";
import Image from "next/image";
import { NewsItem } from "@/types/news";
import Link from "next/link";

interface NewsSectionProps {
  lang: Lang;
  itemsCount?: number;
  newsData: NewsItem[];
}

export const NewsSection = ({ lang, newsData }: NewsSectionProps) => {
  const getTitleLang = (item: NewsItem) =>
    lang === "en" ? item.Title_EN : item.Title_GE;

  return (
    <section className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-20 gap-x-12 justify-items-center">
        {newsData.map((item: NewsItem, index: number) => (
          <Card
            key={item.id}
            className="w-full relative max-w-sm rounded-lg border bg-card text-card-foreground shadow-lg overflow-visible"
          >
            <CardContent className="pt-4 h-52">
              <div className="absolute -top-10 -left-6 w-full h-full max-h-65 overflow-hidden rounded-lg shadow-xl">
                {item.Image_Url ? (
                  <Image
                    src={item.Image_Url}
                    alt={getTitleLang(item)}
                    width={462}  // target display width
                    height={260} // target display height
                    className="object-cover transition-transform duration-500 ease-in-out hover:scale-120"
                    priority={index === 0}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    fetchPriority={index === 0 ? "high" : "auto"}
                    unoptimized={item.Image_Url.startsWith("..")}
                  />
                ) : (
                  <div className="h-full w-full bg-gray-200 flex items-center justify-center text-gray-500">
                    No Image Available
                  </div>
                )}
              </div>

              <div className="bg-blue-500 h-16 w-16 absolute -left-6 bottom-6 flex justify-center items-center rounded-lg">
                <Image
                  alt="label"
                  width={24}
                  height={24}
                  priority
                  className="flex h-6 w-6"
                  src="/icons/receipt-edit.svg"
                />
              </div>
            </CardContent>

            <CardFooter className="ml-10">
              <Link
                className="font-semibold underline hover:no-underline"
                href={`/${lang}/news/${getTitleLang(item)}`}
              >
                {getTitleLang(item)}
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default NewsSection;
