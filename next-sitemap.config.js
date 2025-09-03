/** @type {import('next-sitemap').IConfig} */
const config = {
  siteUrl: 'https://spacecargo.vercel.app',
  generateRobotsTxt: true,
  changefreq: 'daily',
  priority: 0.7,
  sitemapSize: 5000,

  transform: async (config, path) => {
    // Automatically add alternate language links
    const enKaAlternates = (p) => {
      if (p.startsWith('/en')) return [{ href: `${config.siteUrl}${p.replace('/en', '/ka')}`, hreflang: 'ka' }];
      if (p.startsWith('/ka')) return [{ href: `${config.siteUrl}${p.replace('/ka', '/en')}`, hreflang: 'en' }];
      return [];
    };

    return {
      loc: path,
      changefreq: config.changefreq,
      priority: config.priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
      alternateRefs: enKaAlternates(path),
    };
  },

  // List of private/restricted pages
  privatePages: [
    '/dashboard',
    '/settings',
    '/auth',
    '/notifications',
    '/shops',
    '/cashbacks',
    '/vouchers',
    '/terms',
  ],

  exclude: [],

  robotsTxtOptions: {
    policies: [],
    additionalSitemaps: ['https://spacecargo.vercel.app/sitemap.xml'],
  },

  additionalPaths: async (config) => {
    const languages = ['en', 'ka'];
    const publicPages = [
      '/',
      '/about',
      '/contact',
      '/news',
      "/flights"
    ];
    const localizedPages = publicPages.flatMap(page =>
      languages.map(lang => ({
        loc: `/${lang}${page === '/' ? '' : page}`,
        priority: page === '/' ? 1.0 : 0.8,
      }))
    );
    let dynamicNewsPages = [];
    try {
      const [enRes, kaRes] = await Promise.all([
        fetch('https://middleware-dev-legacy.spacecargo.ge/news/get_news?language=EN&chanel=desktop&news_number=1000&page=1'),
        fetch('https://middleware-dev-legacy.spacecargo.ge/news/get_news?language=GE&chanel=desktop&news_number=1000&page=1')
      ]);

      const [enData, kaData] = await Promise.all([enRes.json(), kaRes.json()]);

      if (Array.isArray(enData?.data) && Array.isArray(kaData?.data)) {
        const newsMap = {};

        enData.data.forEach(item => {
          if (item.Title_EN) {
            newsMap[item.id] = newsMap[item.id] || {};
            newsMap[item.id].en = {
              loc: `/en/news/${encodeURIComponent(item.Title_EN)}`,
              lastmod: item.updated_at || new Date().toISOString(),
              priority: 0.9,
            };
          }
        });

        kaData.data.forEach(item => {
          if (item.Title_GE) {
            newsMap[item.id] = newsMap[item.id] || {};
            newsMap[item.id].ka = {
              loc: `/ka/news/${encodeURIComponent(item.Title_GE)}`,
              lastmod: item.updated_at || new Date().toISOString(),
              priority: 0.9,
            };
          }
        });

        dynamicNewsPages = Object.values(newsMap).flatMap(item => {
          const paths = [];
          if (item.en && item.ka) {
            paths.push({ ...item.en, alternateRefs: [{ href: `${config.siteUrl}${item.ka.loc}`, hreflang: 'ka' }] });
            paths.push({ ...item.ka, alternateRefs: [{ href: `${config.siteUrl}${item.en.loc}`, hreflang: 'en' }] });
          } else if (item.en) paths.push(item.en);
          else if (item.ka) paths.push(item.ka);
          return paths;
        });
      }
    } catch (err) {
      console.error('Error fetching dynamic news pages:', err);
    }

    return [...localizedPages, ...dynamicNewsPages];
  },
};

config.exclude = config.privatePages.map(p => (p.endsWith('*') ? p : `${p}/*`));
config.robotsTxtOptions.policies = [
  { userAgent: '*', allow: '/' },
  ...config.privatePages.map(p => ({ userAgent: '*', disallow: p.endsWith('*') ? p : `${p}/*` })),
];

export default config;
