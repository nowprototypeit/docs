// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import {themes as prismThemes} from 'prism-react-renderer';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Now Prototype It Documentation',
  // tagline: 'Dinosaurs are cool',
  favicon: 'img/favicon.ico',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  url: 'https://docs.npi-dev.com/', // production url of site
  baseUrl: '/',   // the /<baseUrl>/ pathname under which your site is served

  onBrokenLinks: 'throw',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          routeBasePath: '/',  // Makes docs the homepage
          sidebarPath: './sidebars.js',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      image: 'img/docusaurus-social-card.jpg',
      colorMode: {
        respectPrefersColorScheme: true,
      },
      navbar: {
        title: 'Now Prototype It Documentation',
        logo: {
          alt: 'Now Prototype It logo',
          src: 'img/logo.svg',
        },
        /* items: [
          {
            type: 'tutorialSidebar',
            sidebarId: 'tutorialSidebar',
            position: 'left',
            label: 'Tutorial',
          },
          {
            href: 'https://github.com/facebook/docusaurus',
            label: 'GitHub',
            position: 'right',
          }, 
        ], */
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Tools', 
            items: [
              {
                label: 'Now Prototype It',
                to: 'https://nowprototype.it/',
              },
            ],
          },
          {
            title: 'Contact',
            items: [
              {
                label: 'GitHub Issues',
                href: 'https://github.com/nowprototypeit/nowprototypeit/issues',
              },
              {
                label: 'Support',
                href: 'mailto:support@nowprototype.it',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Now Prototype It Ltd. Built with Docusaurus.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};

export default config;
