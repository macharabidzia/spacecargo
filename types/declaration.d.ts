interface DeclarationInputData {
    tdsCode: string;
    categoryId: number;
    price: number;
    itemsCount: number;
    websiteUrl: string; // Assuming '3123' is a string representation of a URL or code
    comment: string;
    websiteOtp?: string;
    file: File[] // This looks like it might be a field name if "websiteOtp" was the value, or an empty string if nothing was entered. If it's consistently blank or a field name, it might be optional or a different type. I'll include it as optional string for flexibility.
}