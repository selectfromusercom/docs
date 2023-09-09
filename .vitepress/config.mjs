import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "selectfromuser.com",
  description: "Select Admin",
  cleanUrls: true,
  markdown: {
    lineNumbers: true,
  },
  head: [
    [
      'script',
      {
        defer: '',
        'data-domain': 'dev.selectfromuser.com',
        src: 'https://plausible.io/js/script.js',
      }
    ]
  ],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guide', link: '/guide/' },
      { text: 'Reference', link: '/layout' },
      { text: 'Changelog', link: '/changelog/' },
      { text: 'Community', link: 'https://ask.selectfromuser.com' },
    ],

    sidebar: {
      '/guide/': [
        // {
        //   items: [
        //   ]
        // },
        {
          text: '어드민 만들기',
          items: [
            { text: '시작하기', link: '/guide/'},
            { 
              text: '어드민 편집', 
              link: '/guide/admin-edit', 
              collapsed: true,
              items: [
                { text: '편집 결과 미리보기', link: '/guide/admin-edit-preview'},
              ],
            },
            { 
              text: '메뉴 구성', 
              // link: '/guide/aa', 
              collapsed: true,
              items: [
                { text: '메뉴 권한 설정'},
                { text: '메뉴 path 이름 규칙'},
                { text: '계층 메뉴 만들기'},
              ],
            },
            { 
              text: '데이터 조회 페이지', 
              // link: '/guide/aa', 
              collapsed: true,
              items: [
                { text: '데이터 조회 페이지' },
                { text: '테이블 페이지네이션' },
                { text: '테이블 정렬 방법' },
                { text: '테이블 필드 이름 바꾸기' },
                { text: '테이블 간편 검색' },
                { text: '테이블 검색 조건 추가' },
                { text: '테이블 필드 포맷 설정' },
                { text: '차트, 그래프로 표시' },
                { text: '페이지 이동' },
                { text: '칸반 보드로 보기' },
              ],
            },
          ]
        },
        {
          text: '샘플',
          items: [
            
          ]
        },
        {
          text: 'SQL 팁과 유의사항',
          items: [
            
          ]
        },
        {
          text: '리소스 연결',
          items: [
            
          ]
        },
        {
          text: '팀 관리하기',
          items: [
            
          ]
        },
        {
          text: '로그 및 보안',
          items: [
            
          ]
        },
        {
          text: '컴포넌트',
          items: [
            
          ]
        },
      ],
      '/changelog': [
        {
          items: [
            { text: 'CHANGELOG.md', link: '/changelog/'},
            { text: '2023-08-03', link: '/changelog/2023-08-03' },
            { text: '2023-07-07', link: '/changelog/2023-07-07' },
            { text: '2023-06-08', link: '/changelog/2023-06-08' },
          ]
        },
      ],
      '/': [
        {
          text: 'Overview',
          items: [
            // { text: '시작하기', link: '/start' },
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
            { text: '샘플 예제', link: 'https://showroom.selectfromuser.com' },
            { text: '로그인', link: 'https://app.selectfromuser.com' },
          ]
        },
      ]
    },
    // sidebar: [
    // ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/selectfromusercom/docs' }
    ], 

    search: {
      // provider: 'local',
      provider: 'algolia',
      options: {
        appId: process.env.ALGOLIA_APP_ID,
        apiKey: process.env.ALGOLIA_API_KEY,
        indexName: process.env.ALGOLIA_INDEX_NAME,
      }
    },
  }
})
