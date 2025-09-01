import { Weight, Package, LucideProps, Flag } from "lucide-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";
export type Country = {
    value: CountryValue;
    rate: number;
    labelKey: string;
    flag: string;
};
export const COUNTRIES = [
    { value: "china", rate: 12.85, labelKey: "country.china", flag: "/icons/china.svg" },
    { value: "usa", rate: 8.55, labelKey: "country.usa", flag: "/icons/usa.svg" },
    { value: "uae", rate: 7, labelKey: "country.uae", flag: "/icons/uae.svg" },
    { value: "uk", rate: 9, labelKey: "country.uk", flag: "/icons/england.svg" },
    { value: "hongkong", rate: 20, labelKey: "country.hongkong", flag: "/icons/honk.svg" },
] as const;
export const COUNTRIES_LAND = [
    { value: "china", rate: 2.99, labelKey: "country.china", flag: "/icons/china.svg" },
    { value: "turkey", rate: 2.85, labelKey: "country.turkey", flag: "/icons/turkey.svg" },
    { value: "greece", rate: 3.50, labelKey: "country.greece", flag: "/icons/greece.svg" },
] as const;

export type CountryValue =
    | (typeof COUNTRIES[number]['value'])
    | (typeof COUNTRIES_LAND[number]['value']);

export type Package = {
    width: string;
    height: string;
    length: string;
    weight: string;
};

export type ShippingFormValues = {
    country: CountryValue;
    packages: Package[];
};

export type FieldConfig = {
    name: keyof Package;
    labelKey: string;
    Icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>;
};

export const PACKAGE_FIELDS_CONFIG: FieldConfig[] = [
    { name: "width", labelKey: "form.width", Icon: Package },
    { name: "height", labelKey: "form.height", Icon: Package },
    { name: "length", labelKey: "form.length", Icon: Package },
    { name: "weight", labelKey: "form.weight", Icon: Weight },
];
