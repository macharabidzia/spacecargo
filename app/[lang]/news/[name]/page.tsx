// SingleNews.tsx
import { getNews, getSingleNews } from '@/actions/news.actions';
import NewsSection from '@/components/common/News';
import NewsBody from '@/components/features/news/NewsBody';
import { ArrowRight, } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import { ArticleNewsItem, NewsItem, } from '@/types/news';
import { getDictionary } from '@/i18n/dictionaries';
import SingleNewsProvider from '@/components/common/SingleNewsProvider';
import Script from 'next/script';

type ISingleNews = {
    params: Promise<{ lang: Lang, name: string }>;
};

export async function generateMetadata({ params }: ISingleNews): Promise<Metadata> {
    const { name, lang } = await params;
    const dt = await getSingleNews({ news_name: name, chanel: 'desktop' });
    const newsItem: ArticleNewsItem = dt[0];

    if (!newsItem) {
        return {
            title: 'News Article Not Found',
            description: 'The requested news article could not be found.',
        };
    }

    const getTitle = () => (lang === 'en' ? newsItem.page_title_EN || newsItem.Title_EN : newsItem.page_title_GE || newsItem.Title_GE);
    const getDescription = () => (lang === 'en' ? newsItem.meta_desc_EN : newsItem.meta_desc_GE);
    const getImageAlt = () => (lang === 'en' ? newsItem.image_alt_EN : newsItem.image_alt_GE);

    const title = getTitle();
    const description = getDescription();
    const imageUrl = newsItem.Image_Url;
    const imageAlt = getImageAlt();

    return {
        title,
        description,
        openGraph: {
            title,
            description,
            images: [
                {
                    url: imageUrl,
                    alt: imageAlt,
                },
            ],
            type: 'article',
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            images: [imageUrl],
        },
    };
}

const SingleNews = async ({ params }: ISingleNews) => {
    const { name, lang } = await params;
    const [dt, news] = await Promise.all([
        getSingleNews({ news_name: name, chanel: 'desktop' }),
        getNews({ chanel: 'desktop', news_number: 3, page: 1 })
    ]);
    const dictionary = (await getDictionary(lang)).common
    const getTitleLang = (item: ArticleNewsItem | NewsItem) => lang === "en" ? item.Title_EN : item.Title_GE;
    const getBodyLang = () => lang === "en" ? item.Body_EN : item.Body_GE;
    const getShortTextLang = (num: NewsItem) => lang === "en" ? num.Short_Text_EN : num.Short_Text_Ge;
    const { data } = news;
    const item: ArticleNewsItem = dt[0];

    const title = lang === 'en' ? item.page_title_EN || item.Title_EN : item.page_title_GE || item.Title_GE;
    const description = lang === 'en' ? item.meta_desc_EN : item.meta_desc_GE;
    const imageUrl = item.Image_Url;
    const publishedTime = item.Inp_date;
    const modifiedTime = new Date();

    if (!item) {
        return <div className="container py-10 text-center text-red-500 font-bold">News article not found.</div>;
    }
    return (
        <>
            <Script id="news-structured-data" type="application/ld+json">
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "NewsArticle",
                    headline: title,
                    image: [imageUrl],
                    datePublished: publishedTime,
                    dateModified: modifiedTime,
                    author: {
                        "@type": "Organization",
                        name: "SpaceCargo",
                    },
                    publisher: {
                        "@type": "Organization",
                        name: "SpaceCargo",
                        logo: {
                            "@type": "ImageObject",
                            url: "https://spacecargo.vercel.app/logo.png",
                        },
                    },
                    description,
                    mainEntityOfPage: {
                        "@type": "WebPage",
                        "@id": `https://spacecargo.vercel.app/${lang}/news/${encodeURIComponent(title)}`,
                    },
                })}
            </Script>
            <div className='container py-10'>

                <SingleNewsProvider initialNews={dt} />

                <div className='flex flex-col lg:flex-row gap-10'>
                    <div className='flex-1 space-y-10'>
                        <div className='w-full h-[374px] relative'>
                            <Image src={item.Image_Url} alt={item.image_alt_GE || item.Title_GE || 'News Image'}
                                className="object-fill rounded-md"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                unoptimized={item.Image_Url.startsWith('..')} fill priority />
                        </div>
                        <h1 className='text-3xl font-semibold text-space-blue-dark dark:text-white'>
                            {getTitleLang(item)}
                        </h1>
                        <NewsBody htmlContent={getBodyLang()} className='text-gray-700 dark:text-gray-300' />
                    </div>
                    <div className='flex-1 space-y-12'>
                        {data.map((num, i) => (
                            <div key={i} className='flex flex-row gap-4'>
                                <div className='h-auto relative flex-1 min-h-[180px]'>
                                    <Image src={num.Image_Url} alt={num.Title_GE || 'Related News Image'}
                                        className="object-cover rounded-md"
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        unoptimized={num.Image_Url.startsWith('..')} priority fill />
                                </div>
                                <div className='space-y-4 flex-1'>
                                    <h2 className='text-lg font-semibold text-space-blue-dark dark:text-white'>{getTitleLang(item)}</h2>
                                    <p className='text-sm text-gray-700 dark:text-gray-300'>
                                        {getShortTextLang(num) && getShortTextLang(num).length > 50
                                            ? getShortTextLang(num).substring(0, 200) + '...'
                                            : getShortTextLang(num)}
                                    </p>
                                    <Link href={`/${lang}/news/${getTitleLang(num)}`} className='group flex flex-row items-center gap-2 p-2 py-1 rounded-md bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200'>
                                        <div className='flex flex-row items-center border-b-1 border-space-blue-light gap-2 py-1'>
                                            <p className="text-sm font-medium text-space-blue-light group-hover:text-space-blue-darker dark:text-space-blue-light dark:group-hover:text-white transition-colors duration-200">
                                                {dictionary['seeMore']}
                                            </p>
                                            <ArrowRight size={18} className="text-space-blue-light dark:text-space-blue-light transition-transform duration-300 group-hover:translate-x-1" />
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className='flex flex-col mt-20 space-y-20'>
                    <h2 className='text-3xl font-semibold text-space-blue-dark dark:text-white'>{dictionary['popular.news']}</h2>
                    <NewsSection newsData={news.data} lang={lang} />
                </div>
            </div>
        </>
    );
};

export default SingleNews;