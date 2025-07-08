import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import Image from "next/image";
import LogoIcon from "@/public/icons/logo.svg"; // Assuming LogoIcon is correctly configured to accept className
// No longer need getDictionary here as it's passed via props
// import { getDictionary } from "@/i18n/dictionaries";
import { CommonDictionary } from "@/types/dictionary"; // Ensure this import is correct

type FooterInterface = {
  dictionary: CommonDictionary; // Use the specific CommonDictionary type
};

const Footer = async ({ dictionary }: FooterInterface) => {
  console.log(dictionary);
  return (
    <section className="px-4 py-8 md:px-8 lg:px-16 xl:px-33">
      <hr className="mb-8 bg-foreground" />
      <div className="container mx-auto flex flex-col md:flex-row justify-between gap-8 md:gap-4 lg:gap-8">
        <div className="flex justify-center md:justify-start mb-4 md:mb-0">
          <LogoIcon className="h-[88px] w-full dark:fill-red-400" />
        </div>
        <div className="mt-4 text-center md:text-left">
          <h1 className="font-semibold mb-4 text-lg">
            {dictionary["footer.contact"]}
          </h1>
          <ul className="space-y-3 text-sm">
            <li>{dictionary["footer.phone"]}</li>
            <li>{dictionary["footer.email"]}</li>
            <li>{dictionary["footer.address"]}</li>
          </ul>
        </div>

        <div className="mt-4 text-center md:text-left">
          <h1 className="font-semibold mb-4 text-lg">
            {dictionary["footer.sites"]}
          </h1>
          <ul className="space-y-3 text-sm">
            <li>
              <a href="#" className="hover:underline">
                {dictionary["footer.sites.home"]}
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                {dictionary["footer.sites.services"]}
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                {dictionary["footer.sites.about_us"]}
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                {dictionary["footer.sites.contact"]}
              </a>
            </li>
          </ul>
        </div>

        <div className="mt-4 text-center md:text-left">
          <h1 className="font-semibold mb-4 text-lg">
            {dictionary["footer.subscribe"]}
          </h1>
          <div className="space-y-3 text-sm flex flex-col items-center md:items-start">
            <p>{dictionary["footer.subscribe_text"]}</p>
            <div className="flex w-full max-w-sm items-center space-x-2">
              <Input
                type="email"
                placeholder={dictionary["footer.email_placeholder"]}
                className="flex-grow"
              />
              <Button type="submit">{dictionary["footer.subscribe"]}</Button>
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
          {/* Assuming copyright string can take a 'year' placeholder */}
          {dictionary["footer.copyright"].replace(
            "{year}",
            new Date().getFullYear().toString()
          )}
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
