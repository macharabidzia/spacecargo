interface NewsItem {
  id: number;
  Title_GE: string;
  Title_EN: string;
  Inp_date: string;
  Image_Url_Web_List: string | null;
  Image_Url: string;
  Image_Url_Mobile_List: string | null;
  Image_Url_Mobile: string | null;
  Short_Text_Ge: string;
  Short_Text_EN: string;
}

interface Link {
  url: string | null;
  label: string;
  active: boolean;
}

interface NewsResponse {
  current_page: number;
  data: NewsItem[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: Link[];
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
}
export type NewsArticle = {
  Body_EN: string;
  Body_GE: string;
  ID: number;
  Image_Url: string;
  Image_Url_Mobile: string;
  Image_Url_Mobile_List: string;
  Image_Url_Web_List: string;
  Inp_User_ID: number;
  Inp_date: string;
  Name: string;
  Order_Number: number;
  Status: string;
  Title_EN: string;
  Title_GE: string;
  image_alt_EN: string;
  image_alt_GE: string;
  meta_desc_EN: string;
  meta_desc_GE: string;
  page_title_EN: string;
  page_title_GE: string;
};
export interface ArticleNewsItem {
  ID: number;
  Order_Number: number;
  Status: "A" | "I" | string;

  // Titles
  Title_EN: string;
  Title_GE: string;
  Name: string;

  // Body / Content
  Body_EN: string;
  Body_GE: string;

  // Images
  Image_Url: string;
  Image_Url_Mobile: string;
  Image_Url_Mobile_List: string;
  Image_Url_Web_List: string;
  image_alt_EN?: string;
  image_alt_GE?: string;

  // SEO / Metadata
  meta_desc_EN?: string;
  meta_desc_GE?: string;
  page_title_EN?: string;
  page_title_GE?: string;

  // Tracking / Metadata
  Inp_User_ID: number;
  Inp_date: string;
}
