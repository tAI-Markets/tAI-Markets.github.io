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
  favicon: 'img/favicon-48.png',
  headTags: [
    { tagName: 'link', attributes: { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/docs/img/favicon-32.png' } },
    { tagName: 'link', attributes: { rel: 'apple-touch-icon', sizes: '180x180', href: '/docs/img/apple-touch-icon.png' } },
  ],
  stylesheets: [
    'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap',
  ],
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
    metadata: [
      { name: 'apple-mobile-web-app-title', content: 'tAI Markets' },
    ],
    colorMode: {
      defaultMode: 'light',
      disableSwitch: true,
      respectPrefersColorScheme: false,
    },
    navbar: {
      logo: {
        alt: 'tAI Markets',
        src: 'logo.jpg?v=3', // v3: cache-bust (GH Pages serves assets with 4h max-age)
        href: 'https://tai.markets/',
      },
      items: [
        { to: '/', label: 'Concepts', position: 'left' },
        { to: '/api', label: 'API', position: 'left' },
        { to: '/tutorials/originate-tokens', label: 'Tutorials', position: 'left' },
        { href: 'https://tai.markets/licensing.html', label: 'Licensing', position: 'right' },
        { href: 'https://github.com/tAI-Markets/tAI-contracts', label: 'GitHub', position: 'right' },
        {
          href: 'https://tai.markets/demo/',
          label: 'Live Demo',
          position: 'right',
          className: 'navbar-cta',
        },
      ],
    },
    footer: {
      style: 'light',
      logo: undefined,
      links: [
        {
          title: 'Product',
          items: [
            { label: 'Protocol', href: 'https://tai.markets/#architecture' },
            { label: 'Models', href: 'https://tai.markets/#models' },
            { label: 'Live Demo', href: 'https://tai.markets/demo/' },
            { label: 'Licensing', href: 'https://tai.markets/licensing.html' },
          ],
        },
        {
          title: 'Developers',
          items: [
            { label: 'Documentation', to: '/' },
            { label: 'GitHub', href: 'https://github.com/tAI-Markets/tAI-contracts' },
          ],
        },
        {
          title: 'Live',
          items: [
            { label: 'Tempo Explorer', href: 'https://explore.testnet.tempo.xyz' },
            { label: 'Dashboard', href: 'https://tai.markets/demo/' },
          ],
        },
      ],
      copyright: `© ${new Date().getFullYear()} tAI Markets. Live on Tempo testnet · settled in stablecoins · x402 & MPP-ready.`,
    },
  },
};

export default config;
