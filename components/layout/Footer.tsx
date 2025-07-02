"use client";
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import { useTheme } from "next-themes";
import Image from "next/image";
import { useClientTranslation } from "@/i18n/i18n-provider";
import AppleSvg from "@/public/icons/apple.svg";
type FooterInteface = {};

const Footer = ({}: FooterInteface) => {
  const { t } = useClientTranslation("common");

  const { theme } = useTheme();
  const src = theme === "dark" ? "/icons/logo-white.svg" : "/icons/logo.svg";
  return (
    <section className="px-4 py-8 md:px-8 lg:px-16 xl:px-33">
      <hr className="mb-8 bg-foreground" />
      <div className="container mx-auto flex flex-col md:flex-row justify-between gap-8 md:gap-4 lg:gap-8">
        <div className="flex justify-center md:justify-start mb-4 md:mb-0">
          <Image
            className="h-[88px] w-[88px]"
            src={src}
            width={88}
            height={88}
            alt="Company Logo"
          />
        </div>

        <div className="mt-4 text-center md:text-left">
          <h1 className="font-semibold mb-4 text-lg">{t("footer.contact")}</h1>
          <ul className="space-y-3 text-sm">
            <li>{t("footer.phone")}</li>
            <li>{t("footer.email")}</li>
            <li>{t("footer.address")}</li>
          </ul>
        </div>

        <div className="mt-4 text-center md:text-left">
          <h1 className="font-semibold mb-4 text-lg">{t("footer.sites")}</h1>
          <ul className="space-y-3 text-sm">
            <li>
              <a href="#" className="hover:underline">
                {t("footer.home")}
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                {t("footer.services")}
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                {t("footer.about_us")}
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                {t("footer.contact")}
              </a>
            </li>
          </ul>
        </div>

        <div className="mt-4 text-center md:text-left">
          <h1 className="font-semibold mb-4 text-lg">
            {t("footer.subscribe")}
          </h1>
          <div className="space-y-3 text-sm flex flex-col items-center md:items-start">
            <p>{t("footer.subscribe_text")}</p>
            <div className="flex w-full max-w-sm items-center space-x-2">
              <Input
                type="email"
                placeholder={t("footer.email_placeholder")}
                className="flex-grow"
              />
              <Button type="submit">{t("footer.subscribe")}</Button>
            </div>
          </div>
        </div>
      </div>

      <hr className="my-8 bg-foreground" />

      <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-500">
        <div className="flex flex-wrap justify-center gap-4">
          <Image
            width={36}
            height={36}
            className="w-fit h-fit"
            src="/icons/apple.svg"
            alt="Apple App Store"
          />
          <Image
            width={37}
            height={37}
            className="w-fit h-fit"
            src="/icons/google.svg"
            alt="Google Play Store"
          />
        </div>
        <div className="text-center md:text-left mt-4 md:mt-0">
          {t("footer.copyright", { year: new Date().getFullYear() })}
        </div>
        <div className="flex gap-4 justify-center mt-4 md:mt-0">
          <Image
            width={24}
            height={24}
            className="w-6 h-6"
            src="/icons/in.svg"
            alt="LinkedIn"
          />
          <Image
            width={24}
            height={24}
            className="w-6 h-6"
            src="/icons/fb.svg"
            alt="Facebook"
          />
          <Image
            width={24}
            height={24}
            className="w-6 h-6"
            src="/icons/ig.svg"
            alt="Instagram"
          />
        </div>
      </div>
    </section>
  );
};

export default Footer;
