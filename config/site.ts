export const siteConfig = {
  name: 'My Next.js App',
  description: 'A modern Next.js 15 application with React Query, Redux Toolkit, TypeScript, and Tailwind CSS.',
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