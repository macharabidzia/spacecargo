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
      titleKey: "mainNav.aboutUs", // Use a key
      href: "/about",
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
  ],
  dashboardNav: [
    // New array for dashboard-specific navigation
    {
      titleKey: "dashboardNav.overview", // Example key
      href: "/dashboard",
    },
    {
      titleKey: "dashboardNav.shipments", // Example key
      href: "/dashboard/shipments",
    },
    {
      titleKey: "dashboardNav.profile", // Example key
      href: "/dashboard/profile",
    },
    {
      titleKey: "dashboardNav.settings", // Example key
      href: "/dashboard/settings",
    },
    {
      titleKey: "dashboardNav.notifications", // Example key
      href: "/dashboard/notifications",
    },
  ],
  contactEmail: "info@your-website.com",
  copyright: `© ${new Date().getFullYear()} My Next.js App. All rights reserved.`,
};

// Update the type definition for SiteConfig
export type SiteConfig = typeof siteConfig & {
  mainNav: {
    titleKey: keyof CommonDictionary; // This specifies that titleKey must be a key from CommonDictionary
    href: string;
  }[];
  dashboardNav: {
    // Add dashboardNav to the SiteConfig type
    titleKey: keyof CommonDictionary;
    href: string;
  }[];
};
