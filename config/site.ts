export const siteConfig = {
  name: 'SpaceCargo',
  description: 'Space cargo description',
  url: 'https://your-website.com',
  ogImage: 'https://your-website.com/og-image.jpg',
  links: {
    twitter: 'https://twitter.com/yourhandle',
    github: 'https://github.com/yourusername/your-repo',
  },
  mainNav: [
    {
      title: 'მთავარი',
      href: '/',
    },
    {
      title: 'ჩვენ შესახებ',
      href:"/about"
    },
    {
      title: 'რეისები',
      href: '/flights',

    },
    {
      title: 'სიახლეები',
      href: '/news',
    },
        {
      title: 'კონტაქტი',
      href: '/contact',
    },
  ],
  contactEmail: 'info@your-website.com',
  copyright: `© ${new Date().getFullYear()} My Next.js App. All rights reserved.`,
};

export type SiteConfig = typeof siteConfig;