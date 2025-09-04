import type { Metadata} from "next";
import "./globals.css";
import { siteConfig } from "@/config/site";
import { ViewTransitionProvider } from "@/components/common/ViewTransitionProvider";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  icons: {
    icon: [
      {
        url: "/icons/logo.svg",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icons/logo-white.svg",
        media: "(prefers-color-scheme: dark)",
      },
    ],
  },

  description: siteConfig.description,
};

export default async function RootLayout(props: {
  children: React.ReactNode;
  params: Promise<{ lang: Lang }>;
}) {
  const { children } = props;
  return <>
    {children}
    <ViewTransitionProvider />
  </>;
}
