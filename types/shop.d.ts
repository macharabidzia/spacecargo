export interface Shop {
  id: number;
  logoUrl: string;
  status: string;
  websiteUrl: string;
}
export interface ShopResponse {
  currentPage: number;
  data: Shop[];
  lastPage: number;
}