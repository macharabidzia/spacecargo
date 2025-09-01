"use server"
import { API_ENDPOINTS } from "@/constants/api-endpoints";
import { fetchApiData } from "@/lib/api";
import httpClient from "@/lib/httpClient";
import { NewsItem } from "@/types";
import { ArticleNewsItem, NewsArticle, NewsResponse } from "@/types/news";
interface GetNewsParams {
  page: number;
  news_number: number;
  chanel: 'desktop' | 'mobile';
}
interface GetSingleNewsParams {
  news_name: string;
  chanel: 'desktop' | 'mobile';
}
export async function getNews(params: GetNewsParams): Promise<NewsResponse> {
  const { page, news_number, chanel } = params;
  const endpointWithParams = `${API_ENDPOINTS.GET_NEWS}?page=${page}&news_number=${news_number}&chanel=${chanel}`;
  return fetchApiData<NewsResponse>(httpClient, endpointWithParams);
}
export async function getSingleNews(params: GetSingleNewsParams): Promise<ArticleNewsItem[]> {
  const { news_name, chanel } = params;
  const endpointWithParams = `${API_ENDPOINTS.GET_ONE_NEWS}?news_name=${news_name}&chanel=${chanel}`;
  return fetchApiData<ArticleNewsItem[]>(httpClient, endpointWithParams);
}
