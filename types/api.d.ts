
export type ApiResponseSuccess<T = undefined> = {
  type: "success";
  message?: string;
  data?: T; 
};

type MessageResponse={
  message?: string;
}

export type ApiResponseError = {
  type: "error";
  message: string;
  success: false;
};

export type ApiResponseSuccessMessage<T = undefined> = {
  type: "success";
  message: T;
};

export interface Transaction {
  amount: string;
  bankType: "BOG" | "TBC" | "Liberty" | "Other"; 
  fillType: "card" | "account" | "mobile" | "cash"; 
  language: "ge" | "en"; 
}
export type ApiResponse<T = undefined> = ApiResponseSuccess<T> | ApiResponseError;
export type ApiResponseMessage<T> = ApiResponseSuccessMessage<T> | ApiResponseError;
