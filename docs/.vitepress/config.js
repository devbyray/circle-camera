import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Circle Camera",
  description: "A sleek, minimalist webcam app that displays your camera feed in a perfect circle.",
  head: [
    ['link', { rel: 'icon', href: '/images/app-screenshot.svg' }]
  ],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: '/images/app-screenshot.svg',
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Features', link: '/features' },
      { text: 'Download', link: '/download' },
      { text: 'Documentation', link: '/documentation' }
    ],

    sidebar: [
      {
        text: 'Guide',
        items: [
          { text: 'Introduction', link: '/' },
          { text: 'Features', link: '/features' },
          { text: 'Download', link: '/download' },
          { text: 'Documentation', link: '/documentation' }
        ]
      },
      {
        text: 'Help',
        items: [
          { text: 'FAQ', link: '/faq' },
          { text: 'Troubleshooting', link: '/troubleshooting' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/devbyray/circle-camera' }
    ],

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © ' + new Date().getFullYear() + ' Circle Camera'
    }
  }
})
