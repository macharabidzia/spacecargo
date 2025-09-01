export interface NotificationFormFieldConfig {
    name: string;
    type: "checkbox";
    placeholderKey: string;
    action: string;
    notificationType: "Email" | "SMS";
}

export const getNotificationsFormFields = (): NotificationFormFieldConfig[] => [
    {
        name: "inWarehouseEmail",
        type: "checkbox",
        placeholderKey: "notifications.inWarehouseEmail",
        action: "Parcel_A",
        notificationType: "Email",
    },
    {
        name: "onItsWayEmail",
        type: "checkbox",
        placeholderKey: "notifications.onItsWayEmail",
        action: "Parcel_S",
        notificationType: "Email",
    },
    {
        name: "packageArrivedEmail",
        type: "checkbox",
        placeholderKey: "notifications.packageArrivedEmail",
        action: "Parcel_R",
        notificationType: "Email",
    },
    {
        name: "parcelCancelledEmail",
        type: "checkbox",
        placeholderKey: "notifications.parcelCancelledEmail",
        action: "Parcel_C",
        notificationType: "Email",
    },
    {
        name: "parcelUndeclaredEmail",
        type: "checkbox",
        placeholderKey: "notifications.parcelUndeclaredEmail",
        action: "Parcel_U",
        notificationType: "Email",
    },
    {
        name: "invoicePaidEmail",
        type: "checkbox",
        placeholderKey: "notifications.invoicePaidEmail",
        action: "Invoice_C",
        notificationType: "Email",
    },
    {
        name: "inWarehouseSMS",
        type: "checkbox",
        placeholderKey: "notifications.inWarehouseSMS",
        action: "Parcel_A",
        notificationType: "SMS",
    },
    {
        name: "onItsWaySMS",
        type: "checkbox",
        placeholderKey: "notifications.onItsWaySMS",
        action: "Parcel_S",
        notificationType: "SMS",
    },
    {
        name: "packageArrivedSMS",
        type: "checkbox",
        placeholderKey: "notifications.packageArrivedSMS",
        action: "Parcel_R",
        notificationType: "SMS",
    },
    {
        name: "parcelCancelledSMS",
        type: "checkbox",
        placeholderKey: "notifications.parcelCancelledSMS",
        action: "Parcel_C",
        notificationType: "SMS",
    },
    {
        name: "parcelUndeclaredSMS",
        type: "checkbox",
        placeholderKey: "notifications.parcelUndeclaredSMS",
        action: "Parcel_U",
        notificationType: "SMS",
    },
    {
        name: "invoicePaidSMS",
        type: "checkbox",
        placeholderKey: "notifications.invoicePaidSMS",
        action: "Invoice_C",
        notificationType: "SMS",
    },
];
