module.exports = {
  title: 'Now Prototype It',
  url: 'https://docs.nowprototypeit.co.uk',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'throw',
  favicon: 'assets/design-system/icons/favicon.ico',

  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          path: 'docs',
          routeBasePath: '/',
          sidebarPath: require.resolve('./sidebars.js'),
          remarkPlugins: [],
          rehypePlugins: [],
          editUrl: undefined,
        },
        blog: false,
        pages: false,
        theme: false,          // <-- disables the classic theme
      },
    ],
  ],

  //themes: ['./theme'],           // <-- your local folder
  staticDirectories: ['static'],

  themeConfig: {
    colorMode: {
      defaultMode: 'light',
      disableSwitch: true,
      respectPrefersColorScheme: false,
    },
  }
};
