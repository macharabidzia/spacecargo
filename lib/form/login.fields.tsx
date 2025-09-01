export type LoginFormFieldConfig = {
  name: "email" | "password";
  type: string;
  placeholder: string;
  isPassword?: boolean;
};

export const getLoginFormFields = (
  t: (key: string) => string
): LoginFormFieldConfig[] => [
  {
    name: "email",
    type: "email",
    placeholder: t("auth.emailPlaceholder"),
  },
  {
    name: "password",
    type: "password",
    placeholder: t("auth.passwordPlaceholder"),
    isPassword: true,
  },
];
