export type ShippingDimensionFieldConfig = {
  name: "width" | "height" | "length";
  icon: "weight" | "package";
  placeholder: string;
};
export const getShippingDimensionFields = (
  t: (key: string) => string
): ShippingDimensionFieldConfig[] => [
    {
      name: "width",
      icon: "weight",
      placeholder: t("form.width"),
    },
    {
      name: "height",
      icon: "weight",
      placeholder: t("form.height"),
    },
    {
      name: "length",
      icon: "package",
      placeholder: t("form.length"),
    },
  ];
