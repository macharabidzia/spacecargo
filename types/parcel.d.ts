export interface Parcel {
    id: string;
    category: string;
    categoryId: number;
    comment: string | undefined;
    countryDesc: string;
    declaredAmount: number;
    department: string;
    departmentId: number;
    file: string[];
    itemsCount: number;
    statusDesc: string;
    tdsCode: string;
    websiteUrl: string;
    weight: string;
    invoiceUrl?: string;
}
export interface Notification {
    notification_title: string;
    notification_desc: string;
    should_show_notification: boolean;
}
export type ParcelApiResponse = {
    currentPage: number;
    parcels: Parcel[];
    notification?: Notification;
    perPage: number;
    recordsNumber: number;
}
export type Bonus = {
    bonusPoint: number;
    id: number;
    operationDate: string;
    tdsCode: string;
    totalPrice: number;
};