"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { useClientTranslation } from "@/i18n/i18n-provider";

const AuthTitle = () => {
  const pathname = usePathname();
  const { t } = useClientTranslation("common");

  const isRegisterPage = pathname.includes("register");
  const isResetPasswordPage = pathname.includes("reset-password");
  return (
    <>
      <h1 className="text-4xl font-semibold text-space-blue dark:text-white">
        {isRegisterPage ? t("auth.registerTitle") : isResetPasswordPage ? t('auth.resetPassword') : t("auth.loginTitle")}
      </h1>
      <p className="text-sm mt-2 text-muted-foreground">
        {t("auth.description")}
      </p>
    </>
  );
};

export default AuthTitle;
