// src/components/features/auth/AuthTitle.tsx
"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { useClientTranslation } from "@/i18n/i18n-provider"; // Assuming your i18n setup

const AuthTitle = () => {
  const pathname = usePathname();
  const { t } = useClientTranslation("common"); // Get translation function for auth titles

  const isRegisterPage = pathname.includes("register");
  return (
    <>
      <h1 className="text-4xl font-extrabold text-space-blue">
        {isRegisterPage ? t("auth.registerTitle") : t("auth.loginTitle")}
      </h1>
      <p className="text-sm mt-2">
        გთხოვთ გაიაროთ ავტორიზაცია, თუ არ გაქვთ ანგარიში გაიარეთ რეგისრაცია,
        რათა ისარგებლოთ ჩვენი სერვისებით
      </p>
    </>
  );
};

export default AuthTitle;
