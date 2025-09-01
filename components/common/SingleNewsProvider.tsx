"use client";

import { useGlobalDataStore } from "@/store/GlobalDataStore";
import { ArticleNewsItem } from "@/types/news";
import { useEffect } from "react";

interface Props {
    initialNews: ArticleNewsItem[] | null;
}

export default function SingleNewsProvider({ initialNews }: Props) {
    const setSingleNews = useGlobalDataStore((state) => state.setSingleNews);

    useEffect(() => {
        if (initialNews) {
            setSingleNews(initialNews);
        }
        return () => {
            setSingleNews(null);
        };
    }, [initialNews, setSingleNews]);

    return null;
}
