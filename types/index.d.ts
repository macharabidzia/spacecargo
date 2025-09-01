import React from "react";

type Country =
  | "USA"
  | "აშშ"
  | "China"
  | "ჩინეთი"
  | "Dubai"
  | "დუბაი"
  | "United Kingdom"
  | "დიდი ბრიტანეთი"
  | "Turkey"
  | "თურქეთი"
  | "Greece"
  | "საბერძნეთი"
  | "Hong Kong"
  | "ჰონგ კონგი";

interface NewsItem {
  id: number;
  imgSrc: string;
  imgAlt: string;
  title: string;
  footerText: string;
  color: string;
  image: string;
}

interface Category {
  id: number;
  value: string;
}

export type FormFieldConfig<TFieldName extends string = string> = {
  name: TFieldName;
  type: string;
  placeholderKey: string;
  prefix?: React.ReactNode;
  options?: { value: string | number; label: string }[];
  colSpan?: string;
  rows?: number;
  readOnly?: boolean;
  labelKey: string;
  Icon?: any;
};

export interface GenericTableClientProps<T> {
  data: T[];
  recordsNumber: number;
  pageSize: number;
  currentPage: number;
  tableId: string;
}

export interface DrawerConfig {
  queryParamName: string;
  component: React.ComponentType<{
    open: boolean;
    onClose: () => void;
    [key: string]: any;
  }>;
}

export interface GenericDrawersProps {
  drawersConfig: DrawerConfig[];
}

export interface ModalConfig {
  queryParamName: string;
  component: React.ComponentType<{
    open: boolean;
    onOpenChange: (open: boolean) => void;
    [key: string]: any;
  }>;
}

export interface GenericModalsProps {
  modalsConfig: ModalConfig[];
}
