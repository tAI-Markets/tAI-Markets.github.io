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
    // (navbar style handled in themeConfig above)
    colorMode: {
      defaultMode: 'light',
      disableSwitch: false,
      respectPrefersColorScheme: false,
    },
    navbar: {
      title: 'tAI Markets Docs',
      logo: { alt: 'tAI Markets', src: 'logo.jpg' },
      style: 'dark',
      items: [
        { to: '/', label: 'Concepts', position: 'left' },
        { to: '/api', label: 'API', position: 'left' },
        { to: '/tutorials/originate-tokens', label: 'Tutorials', position: 'left' },
        { href: 'https://tai.markets', label: 'tai.markets', position: 'right' },
        { href: 'https://tai.markets/demo', label: 'Live Demo', position: 'right' },
        { href: 'https://tai.markets/demo', label: 'Live Demo', position: 'right' },
      ],
    },
    footer: {
      style: 'dark',
      copyright: `Copyright © ${new Date().getFullYear()} tAI Markets — commercial source-available (BUSL-1.1). Built on Tempo.`,
    },
  },
};

export default config;
