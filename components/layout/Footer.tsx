"use client";
import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import { useTheme } from "next-themes";
import Image from "next/image";

type FooterInteface = {};

const Footer = ({}: FooterInteface) => {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <Image src="/icons/logo.svg" width={55} height={100} alt="Logo" />;
  }
  const src = theme === "dark" ? "/icons/logo-white.svg" : "/icons/logo.svg";
  return (
    <section className="px-4 py-8 md:px-8 lg:px-16 xl:px-33">
      <hr className="mb-8 bg-foreground" />
      <div className="container mx-auto flex flex-col md:flex-row justify-around gap-8 md:gap-4 lg:gap-8">
        <div className="flex justify-center md:justify-start mb-4 md:mb-0">
          <Image
            className="h-[80px] w-[80px]"
            src={src}
            width={80}
            height={80}
            alt="Company Logo"
          />
        </div>

        <div className="mt-4 text-center md:text-left">
          <h1 className="font-semibold mb-4 text-lg">კონტაქტი</h1>
          <ul className="space-y-3 text-sm">
            <li>+ 995 (032) 2 12 09 90</li>
            <li>customerservice@spacecargo.ge</li>
            <li>თბილისი ალ. ყაზბეგის გამზ. 30ა</li>
          </ul>
        </div>

        <div className="mt-4 text-center md:text-left">
          <h1 className="font-semibold mb-4 text-lg">საიტები</h1>
          <ul className="space-y-3 text-sm">
            <li>
              <a href="#" className="hover:underline">
                მთავარი
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                სერვისები
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                ჩვენს შესახებ
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                კონტაქტი
              </a>
            </li>
          </ul>
        </div>

        <div className="mt-4 text-center md:text-left">
          <h1 className="font-semibold mb-4 text-lg">გამოწერა</h1>
          <div className="space-y-3 text-sm flex flex-col items-center md:items-start">
            <p>გამოიწერე და არ ჩამორჩე სიახლეებს!</p>
            <div className="flex w-full max-w-sm items-center space-x-2">
              <Input
                type="email"
                placeholder="ელ-ფოსტა"
                className="flex-grow"
              />
              <Button type="submit">გამოწერა</Button>
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
            className="w-auto h-9"
            src="/icons/apple.svg"
            alt="Apple App Store"
          />
          <Image
            width={36}
            height={36}
            className="w-auto h-9"
            src="/icons/google.svg"
            alt="Google Play Store"
          />
        </div>
        <div className="text-center md:text-left mt-4 md:mt-0">
          Copyright &copy; {new Date().getFullYear()} All Rights Reserved
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
