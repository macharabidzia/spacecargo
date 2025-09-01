import Image from "next/image";
import LogoIcon from "@/public/icons/logo.svg";
import LinkedIn from "@/public/icons/in.svg";
import Facebook from "@/public/icons/fb.svg";
import Instagram from "@/public/icons/ig.svg";
import Link from "next/link";
import { CommonDictionary } from "@/types/dictionary";
import Subscribe from "./SubscribeForm";

type FooterInterface = {
  dictionary: CommonDictionary;
  lang: Lang
};
const Footer = async ({ dictionary }: FooterInterface) => {
  return (
    <footer className="bg-muted/40 border-t border-border px-4 md:px-8 lg:px-16 xl:px-32 pt-16 pb-10 mt-16 dark:bg-gray-900 dark:border-gray-700">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        <div className="flex flex-col items-center md:items-start">
          <LogoIcon className="h-24 w-auto fill-space-blue-muted dark:fill-white" />
        </div>

        {/* Contact Info */}
        <div className="text-center md:text-left">
          <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">
            {dictionary["footer.contact"]}
          </h2>
          <ul className="space-y-2 text-sm text-muted-foreground dark:text-gray-400">
            <li>{dictionary["footer.phone"]}</li>
            <li>{dictionary["footer.email"]}</li>
            <li>{dictionary["footer.address"]}</li>
          </ul>
        </div>

        {/* Site Links */}
        <div className="text-center md:text-left">
          <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">
            {dictionary["footer.sites"]}
          </h2>
          <ul className="space-y-3 text-sm text-muted-foreground dark:text-gray-400">
            <li>
              <a
                href="https://www.alibaba.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline transition text-gray-600 dark:text-gray-300"
              >
                www.alibaba.com
              </a>
            </li>
            <li>
              <a
                href="https://www.taobao.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline transition text-gray-600 dark:text-gray-300"
              >
                www.taobao.com
              </a>
            </li>
            <li>
              <a
                href="https://www.aliexpress.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline transition text-gray-600 dark:text-gray-300"
              >
                www.aliexpress.com
              </a>
            </li>
          </ul>

        </div>

        {/* Subscribe Section */}
        <div className="text-center md:text-left">
          <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">
            {dictionary["footer.subscribe"]}
          </h2>
          <p className="text-sm text-muted-foreground mb-4 dark:text-gray-400">
            {dictionary["footer.subscribe_text"]}
          </p>
          <Subscribe placeholder="Email" />
        </div>
      </div>

      {/* Divider */}
      <hr className="my-10 border-border dark:border-gray-700" />

      {/* Bottom Section */}
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-sm text-muted-foreground dark:text-gray-400">
        {/* App Icons */}
        <div className="flex gap-4 justify-center">
          <Image
            width={80}
            height={80}
            src="/icons/apple.svg"
            alt="Apple App Store"
            className="object-contain"
          />
          <Image
            width={80}
            height={80}
            src="/icons/google.svg"
            alt="Google Play Store"
            className="object-contain"
          />
        </div>

        {/* Copyright */}
        <div className="text-center md:text-left text-gray-700 dark:text-gray-300">
          {dictionary["footer.copyright"].replace(
            "{year}",
            new Date().getFullYear().toString()
          )}
        </div>

        {/* Social Icons */}
        <div className="flex gap-4 justify-center">
          {[{ Icon: Facebook, href: "https://www.facebook.com/spacecargo.ge" }, { Icon: Instagram, href: "https://www.instagram.com/space.cargo/" }, { Icon: LinkedIn, href: "https://www.linkedin.com/company/spacecargo/" }].map(({ Icon, href }, i) => (
            <Link
              key={i}
              href={href}
              className="p-2 border border-border rounded-full group hover:bg-black dark:hover:bg-white transition"
              aria-label={`Follow us on social media`}
            >
              <Icon className="h-5 w-5 fill-black dark:fill-white group-hover:fill-white dark:group-hover:fill-black" />
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
