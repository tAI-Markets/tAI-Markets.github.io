// @ts-check
/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'tAI Markets Docs',
  tagline: 'The clearing house for AI inference — collateralized, settled on-chain',
  url: 'https://tai.markets',
  baseUrl: '/docs/',
  onBrokenLinks: 'warn',
  organizationName: 'tAI-Markets',
  projectName: 'tAI-Markets.github.io',
  i18n: { defaultLocale: 'en', locales: ['en'] },
  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      {
        docs: { sidebarPath: './sidebars.js', routeBasePath: '/' },
        blog: false,
        theme: { customCss: require.resolve('./src/css/custom.css') },
      },
    ],
  ],
  themeConfig: {
    navbar: {
      title: 'tAI Markets Docs',
      logo: { alt: 'tAI Markets', src: '/logo.jpg' },
      items: [
        { to: '/', label: 'Concepts', position: 'left' },
        { to: '/api', label: 'API', position: 'left' },
        { to: '/tutorials/originate-tokens', label: 'Tutorials', position: 'left' },
        { href: 'https://tai.markets', label: 'tai.markets', position: 'right' },
        { href: 'https://tai.markets/demo', label: 'Live Demo', position: 'right' },
      ],
    },
    footer: {
      copyright: `Copyright © ${new Date().getFullYear()} tAI Markets`,
    },
  },
};

export default config;
