// types/parcel.ts

// ----------------- Courier Parcel -----------------
export interface Courier {
  address: string;
  cityDesc: string;
  comment: string | null;
  deliveryDate: string | null;
  districtDesc: string | null;
  id: string;
  inpDate: string;
  invoiceUrl: string;
  package: string;
  status: string;
  tdsCode: string;
  totalCost: number;
  totalWeight: number;
  statusDesc?: string;
  city?: string;
  region?: string;
  invoice?: string;
  weight?: number;
  declaredAmount?: number;
  registrationDate?: string;
  category?: string;
}

export interface CourierFormValues {
  address: string | null;
  cityId: string | null;
  comment?: string | undefined;
  districtId?: string | undefined;
  package?: string | undefined;
  parcelIds: string[];
  receiverFullName: string;
  receiverPhone: string;
}
export interface CourierMinimal {
  id: string;
  tdsCode: string;
  declaredAmount: string;
  deliveryDesc: string;
  weight: string;
}

export type CourierCity = {
  id: number;
  name: string;
  desc: string;
};

export type CourierDistrict = {
  id: number;
  name: string;
  desc: string;
};
export type CourierApiResponse = {
  currentPage: number;
  parcels: Courier[];

  notification?: Notification;
  perPage: number;
  recordsNumber: number;
}
export type CourierMinimalApiResponse = {
  currentPage: number;
  parcels: CourierMinimal[];
  notification?: Notification;
  perPage: number;
  recordsNumber: number;
}
export interface Notification {
  notification_title: string;
  notification_desc: string;
  should_show_notification: boolean;
}
export type CourierPackage = {
  name: string;
  desc: string;
  additionalInformationHead: string;
  additionalInformation?: string;
  price?: number;
};

export type CourierAddress = {
  address: string;
};

export type CourierData = {
  cities: CourierCity[];
  districts: CourierDistrict[];
  mobileNumber: string;
  packages: CourierPackage[];
  userAddresses: CourierAddress[];
  userFullName: string;
};
