/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://spacecargo.vercel.app',
  generateRobotsTxt: true,
  changefreq: 'daily',
  priority: 0.7,
  exclude: [
    '/dashboard',
    '/notifications',
    '/settings',
    '/shops',
    '/terms',
    '/cashbacks',
    '/auth/*',
  ],

  // Add all routes manually (static + dynamic)
  additionalPaths: async () => {
    const staticPages = ['/en', '/ka', '/en/news', '/ka/news'];
  
    // Fetch news slugs from API
    const res = await fetch('https://middleware-dev-legacy.spacecargo.ge/news?chanel=desktop&news_number=1000&page=1');
    const data = await res.json();
    const newsPages = data.data.map((item) => `/en/news/${item.Title_EN}`);

    return [...staticPages, ...newsPages].map(path => ({
      loc: path,
      lastmod: new Date().toISOString(),
      changefreq: 'daily',
      priority: 0.9,
    }));
  },
};
