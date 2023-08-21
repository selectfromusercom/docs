import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "selectfromuser.com",
  description: "Select Admin",
  cleanUrls: true,
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Reference', link: '/start' },
      { text: 'Community', link: 'https://ask.selectfromuser.com' },
    ],

    sidebar: [
      {
        text: 'Overview',
        items: [
          { text: '시작하기', link: '/start' },
          { text: '개념 및 설계 구조', link: '/introduction' },
        ]
      },
      {
        text: 'Reference',
        items: [
          { text: 'Layout', link: '/layout' },
          { text: 'Menus', link: '/menus' },
          { text: 'Pages', link: '/pages' },
          { text: 'Blocks', link: '/blocks' },
          { text: 'Columns', link: '/columns' },
          { text: 'Params', link: '/params' },
          { text: 'Modals', link: '/modals' },
          { text: 'Actions', link: '/actions' },
        ]
      },
      {
        text: 'Links',
        items: [
          { text: '튜토리얼 및 가이드', link: 'https://docs.selectfromuser.com/docs' },
          { text: 'Examples', link: 'https://showroom.selectfromuser.com' },
          { text: 'Changelog', link: 'https://docs.selectfromuser.com/changelog' },          
          { text: '로그인', link: 'https://app.selectfromuser.com' },
        ]
      },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/selectfromusercom/docs' }
    ], 

    search: {
      provider: 'local',
      // provider: 'algolia',
      // options: {
      //   appId: process.env.ALGOLIA_APP_ID,
      //   apiKey: process.env.ALGOLIA_API_KEY,
      //   indexName: process.env.ALGOLIA_INDEX_NAME,
      // }
    },
  }
})
