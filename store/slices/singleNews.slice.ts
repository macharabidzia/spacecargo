import { StateCreator } from "zustand";
import { GlobalDataState } from "../GlobalDataStore";
import { ApiResponse } from "@/types/api";
import { ArticleNewsItem, NewsArticle } from "@/types/news";

export interface SingleNewsSlice {
    singleNews: ArticleNewsItem[] | null;
    setSingleNews: (news: ArticleNewsItem[] | null) => void;

    updateSingleNews: (response: ApiResponse, updatedNewsData?: ArticleNewsItem[]) => void;
    likeSingleNews: (response: ApiResponse) => void;
    dislikeSingleNews: (response: ApiResponse) => void;
}

export const createSingleNewsSlice: StateCreator<
    GlobalDataState,
    [],
    [],
    SingleNewsSlice
> = (set, get) => ({
    singleNews: null,

    setSingleNews: (news) => set({ singleNews: news }),

    updateSingleNews: (_response, payload) => {
        const currentNews = get().singleNews;
        if (!currentNews) {
            throw new Error("Single news data not available for update.");
        }
        const updatedNews: ArticleNewsItem[] = {
            ...currentNews,
            ...payload,
        };
        set({ singleNews: updatedNews });
    },

    likeSingleNews: (_response) => {
        const currentNews = get().singleNews;
        if (!currentNews) return;

        set({
            singleNews: {
                ...currentNews,
            },
        });
    },

    dislikeSingleNews: (_response) => {
        const currentNews = get().singleNews;
        if (!currentNews) return;

        set({
            singleNews: {
                ...currentNews,
            },
        });
    },
});
