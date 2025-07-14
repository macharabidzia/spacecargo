import type { Metadata } from "next";
import "./globals.css";
import { siteConfig } from "@/config/site";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
};
export default async function RootLayout(props: {
  children: React.ReactNode;
  drawer: ReactNode;
  params: { lang: Lang };
}) {
  const { children } = props;
  return children;
}
