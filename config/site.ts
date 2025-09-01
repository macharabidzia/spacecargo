// siteConfig.ts or wherever your siteConfig is defined

import { CommonDictionary } from "@/types/dictionary";

export const siteConfig = {
  name: "SpaceCargo",
  description: "Space cargo description",
  url: "https://your-website.com",
  ogImage: "https://your-website.com/og-image.jpg",
  links: {
    twitter: "https://twitter.com/yourhandle",
    github: "https://github.com/yourusername/your-repo",
  },
  mainNav: [
    {
      titleKey: "mainNav.home", // Use a key instead of the direct string
      href: "/",
    },
    {
      titleKey: "mainNav.shops", // Use a key
      href: "/shops",
    },
    {
      titleKey: "mainNav.flights", // Use a key
      href: "/dashboard",
    },
    {
      titleKey: "mainNav.news", // Use a key
      href: "/news",
    },
    {
      titleKey: "mainNav.contact", // Use a key
      href: "/contact",
    },
    {
      titleKey: "mainNav.aboutUs", // Use a key
      href: "/about",

    },
    {
      titleKey: "mainNav.aboutUs",
      href: "/settings",
    },
    {
      titleKey: "mainNav.terms",
      href: "/terms",
    },
    {
      titleKey: "mainNav.flightsPage", // Use a key
      href: "/flights",
    },
  ],
  dashboardNav: [
    {
      titleKey: "dashboardNav.overview",
      href: "/dashboard",
    },
    {
      titleKey: "dashboardNav.shops",
      href: "/dashboard/shops",
    },
  ],
  parcelsTabsData: [
    {
      value: "receivable",
      href: "/dashboard/parcels",
    },
    {
      value: "in-stock",
      href: "/dashboard/parcels/in-stock",
    },
    {
      value: "sent",
      href: "/dashboard/parcels/sent",
    },
    {
      value: "arrived",
      href: "/dashboard/parcels/arrived",
    },
    {
      value: "received",
      href: "/dashboard/parcels/received",
    },

  ],
  settingsTabsData: [
    {
      value: "personalInformation",
      href: "/settings",
    },
    {
      value: "changePassword",
      href: "/settings/change-password",
    },
    {
      value: "address",
      href: "/settings/address",
    },
    {
      value: "notifications",
      href: "/settings/notifications",
    },
    {
      value: "authorizedPersons",
      href: "/settings/authorized-persons",
    },
  ],
  contactEmail: "info@your-website.com",
  copyright: `© ${new Date().getFullYear()} My Next.js App. All rights reserved.`,
};

// Update the type definition for SiteConfig
export type SiteConfig = typeof siteConfig & {
  mainNav: {
    titleKey: keyof CommonDictionary;
    href: string;
  }[];
  dashboardNav: {
    titleKey: keyof CommonDictionary;
    href: string;
  }[];
};
