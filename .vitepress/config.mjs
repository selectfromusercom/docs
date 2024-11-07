import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "SelectAdmin",
  description: "selectfromuser.com",
  cleanUrls: true,
  markdown: {
    lineNumbers: true,
  },
  lastUpdated: true,
  sitemap: {
    hostname: 'https://docs.selectfromuser.com',
  },
  head: [
    ['link', { rel: 'icon', href: '/favicon.png' }],
    [
      'script',
      {
        defer: '',
        'data-domain': 'dev.selectfromuser.com',
        src: 'https://plausible.io/js/script.js',
      }
    ]
  ],
  // locales: {
  //   root: {
  //     label: '한국어',
  //     lang: 'ko'
  //   },
  //   en: {
  //     label: 'English',
  //     lang: 'en', 
  //     link: '/en'
  //   },
  // },
  // appearance: 
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Guide', link: '/guide/' },
      { text: 'Reference', link: '/reference' },
      { text: 'Changelog', link: 'https://github.com/eces/select/blob/main/CHANGELOG.md' },
      { text: 'Community', link: 'https://ask.selectfromuser.com' },
    ],

    sidebar: {
      '/guide/': [
        // {
        //   items: [
        //   ]
        // },
        {
          text: '시작하기',
          items: [
            { text: '셀렉트란', link: '/guide/'},
            { text: 'Quickstart', link: '/guide/quickstart'},
            { text: '핵심 스키마', link: '/guide/core-schema'},
          ]
        },
        {
          text: '어드민 만들기',
          items: [
            { 
              text: '어드민 편집', 
              link: '/guide/admin-edit', 
              collapsed: true,
              items: [
                { text: '편집 결과 미리보기', link: '/guide/admin-edit-preview' },
                { text: '편집기 콘솔로그', link: '/guide/admin-edit-consolelog' },
                { text: '편집파일 global.yml', link: '/guide/admin-edit-globalyml' },
              ],
            },
            { 
              text: '메뉴 구성', 
              link: '/guide/menu', 
              collapsed: true,
              items: [
                { text: '메뉴 권한 설정', link: '/guide/menu-permission' },
                { text: '메뉴 path 이름 규칙', link: '/guide/menu-naming-path' },
                { text: '계층 메뉴 만들기', link: '/guide/menu-submenu-tree' },
              ],
            },
            { 
              text: '데이터 조회 페이지', 
              link: '/guide/view-page', 
              collapsed: true,
              items: [
                { text: '테이블 페이지네이션', link: '/guide/view-page-pagination' },
                { text: '테이블 정렬 방법', link: '/guide/view-page-order' },
                { text: '테이블 필드 이름 바꾸기', link: '/guide/view-page-field' },
                { text: '테이블 간편 검색', link: '/guide/view-page-search' },
                { text: '테이블 검색 조건 추가', link: '/guide/view-page-search-parameters' },
                { text: '테이블 필드 포맷 설정', link: '/guide/view-page-column' },
                { text: '차트, 그래프로 표시', link: '/guide/view-page-graph-chart' },
                { text: '페이지 이동', link: '/guide/view-page-reference' },
                { text: '칸반 보드로 보기', link: '/guide/view-page-board' },
              ],
            },
            { 
              text: '데이터 추가 및 수정 페이지', 
              link: '/guide/crud-page', 
              collapsed: true,
              items: [
                { text: '클릭해서 수정하기', link: '/guide/crud-page-inline-edit' },
                { text: '복수의 데이터 추가, 수정', link: '/guide/crud-page-selected' },
                { text: '텍스트 에디터로 추가, 수정하기', link: '/guide/crud-page-editor' },
                { text: '이미지 파일 추가', link: '/guide/crud-page-image-file' },
              ],
            },
            { 
              text: '설명 추가하기', 
              link: '/guide/describe-page', 
            },
            { 
              text: '입력 필드 만들기', 
              link: '/guide/input', 
              collapsed: true,
              items: [
                { text: '입력 필드에 기본값 넣기', link: '/guide/input-default' },
                { text: '입력 필드 상세 옵션', link: '/guide/input-option' },
                { text: '파일 포맷 업로드', link: '/guide/input-file-upload' },
                { text: '입력값 검증(Validation)', link: '/guide/input-validation' },
              ],
            },
            { 
              text: '모달 구성', 
              link: '/guide/modal', 
              collapsed: true,
              items: [
                { text: '모달 상세 옵션', link: '/guide/modal-option' },
              ],
            },
            { 
              text: '데이터 체크와 액션', 
              link: '/guide/action', 
              collapsed: true,
              items: [
                { text: '액션 상세 설정', link: '/guide/action-customize' },
                { text: '입력 필드 상세 옵션', link: '/guide/action-button-open-modal' },
                { text: '여러번 반복해서 실행', link: '/guide/action-for-each' },
              ],
            },
            { 
              text: '모달과 테이블 버튼', 
              link: '/guide/table-buttons-multiple-modal', 
            },
            { 
              text: 'API 활용', 
              link: '/guide/api', 
              collapsed: true,
              items: [
                { text: 'API로 수정, 삭제', link: '/guide/api-crud' },
                { text: 'JSON body 넣는 법', link: '/guide/api-json-body' },
                { text: 'API KEY 안전하게 이용', link: '/guide/api-key' },
                { text: 'GraphQL 사용', link: '/guide/api-graphql' },
                { text: 'API 응답을 코드로 처리', link: '/guide/api-response' },
                { text: 'API 예제', link: '/guide/api-example' },
              ],
            },
            { 
              text: '대시보드 넣기', 
              link: '/guide/dashboard', 
            },
            { 
              text: '구글 스프레드시트 이용', 
              link: '/guide/google-spreadsheet', 
            },
            { 
              text: '여러 데이터베이스 JOIN', 
              link: '/guide/sql-with-database-join', 
            },
            { 
              text: '레이아웃 커스텀', 
              link: '/guide/custom-layout', 
            },
            { 
              text: '응답/요청값 Transformation', 
              link: '/guide/js-transformation', 
            },
          ]
        },
        {
          text: '샘플',
          items: [
            { 
              text: '고객 지원 툴', 
              link: '/guide/sample-cs-admin', 
            },
            { 
              text: '네이버 지도 API 호출', 
              link: '/guide/sample-naver-maps-api', 
            },
            { 
              text: '콘텐츠 관리 CMS', 
              link: '/guide/sample-content-management-system', 
            },
            { 
              text: '슬랙에 메시지 보내기', 
              link: '/guide/sample-send-to-slack', 
            },
            { 
              text: '상품 재고 관리', 
              link: '/guide/sample-inventory-management', 
            },
          ]
        },
        {
          text: 'SQL 팁과 유의사항',
          items: [
            { 
              text: 'SQL 조건문 팁', 
              link: '/guide/tip-sql', 
            },
            { 
              text: 'PostgreSQL 유의사항', 
              link: '/guide/tip-postgresql', 
            },
            { 
              text: '타임존 timezone', 
              link: '/guide/timezone', 
            },            
          ]
        },
        {
          text: '리소스 연결',
          items: [
            { 
              text: '데이터베이스 연결', 
              link: '/guide/database-connect',
              collapsed: true,
              items: [
                { text: 'SSH Tunneling', link: '/guide/database-connect-ssh' },
              ],
            },
            { 
              text: '데이터베이스 변경', 
              link: '/guide/database-modify', 
            },
            { 
              text: '데이터베이스별 가이드',
              collapsed: true,
              items: [
                { 
                  text: 'MongoDB', 
                  link: '/guide/database-mongodb', 
                },
                {
                  text: 'BigQuery', 
                  link: '/guide/database-bigquery',
                },
                {
                  text: 'DynamoDB', 
                  link: '/guide/database-dynamodb',
                },
              ] 
            },            
            { 
              text: 'JSON 데이터 사용', 
              link: '/guide/database-json', 
            },
          ]
        },
        {
          text: '팀 관리하기',
          items: [
            { 
              text: '팀 만들기', 
              link: '/guide/team-new', 
            },
            { 
              text: '팀에 멤버 초대하기', 
              link: '/guide/team-invitation', 
            },
            { 
              text: '사용자 속성 설정', 
              link: '/guide/team-user-property',
              collapsed: true,
              items: [
                { text: '사용자 속성 동기화', link: '/guide/team-user-property-sync' },
                { text: '사용자 속성 수정 블록', link: '/guide/team-user-property-type' },
              ],
            },          
            { 
              text: '팀 설정', 
              link: '/guide/team-setting', 
            },
          ]
        },
        {
          text: '로그 및 보안',
          items: [
            { 
              text: '로깅', 
              link: '/guide/logging', 
            },
            { 
              text: 'SQL 쿼리 보안', 
              link: '/guide/secure-sql-query', 
            },
            { 
              text: 'API 보안', 
              link: '/guide/secure-api', 
            },
            { 
              text: '감사로그', 
              link: '/guide/audit-log', 
            },
            { 
              text: 'SSO, IP, 세션 설정', 
              link: 'https://blog.selectfromuser.com/network-security-policy/', 
            },
          ]
        },
        {
          text: '컴포넌트',
          items: [
            { 
              text: '컴포넌트 라이브러리', 
              link: '/guide/component-library', 
            },
          ]
        },
        {
          text: 'Self-hosted',
          items: [
            { 
              text: 'Self-hosted 로컬 CLI',
              link: '/guide/self-hosted-cli',
            },
            { 
              text: '윈도우(Windows)에 설치',
              link: '/guide/self-hosted-cli-windows',
            },          
          ]
        },      
      ],
      '/changelog': [
        {
          items: [
            { text: '✨ 최근 업데이트 내역', link: '/changelog/'},
            { text: '2023-08-03', link: '/changelog/2023-08-03' },
            { text: '2023-07-07', link: '/changelog/2023-07-07' },
            { text: '2023-06-08', link: '/changelog/2023-06-08' },
            { text: '2023-03-30', link: '/changelog/2023-03-30' },
            { text: '2023-03-06', link: '/changelog/2023-03-06' },
            { text: '2023-02-28', link: '/changelog/2023-02-28' },
            { text: '2023-01-08', link: '/changelog/2023-01-08' },
            { text: '2022-11-22', link: '/changelog/2022-11-22' },
            { text: '2022-10-28', link: '/changelog/2022-10-28' },
            { text: '2022-09-30', link: '/changelog/2022-09-30' },
            { text: '2022-08-31', link: '/changelog/2022-08-31' },
            { text: '2022-07-29', link: '/changelog/2022-07-29' },
            { text: '2022-06-30', link: '/changelog/2022-06-30' },
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
            { text: 'Layout', link: '/reference#layout' },
            { text: 'Menus', link: '/reference#menus' },
            { text: 'Pages', link: '/reference#pages' },
            { 
              text: 'Blocks', 
              link: '/reference#blocks',
              items: [
                { text: 'query', link: '/reference#type-query' },
                { text: 'http', link: '/reference#type-http' },
                { text: 'pagination', link: '/reference#blocks-paginationoptions' },
                { text: 'chart', link: '/reference#blocks-chartoptions' },
              ]
            },
            { 
              text: 'Columns', 
              link: '/reference#columns',
              items: [
                { text: 'format', link: '/reference#columns-format' },
                { text: 'formatFn', link: '/reference#columns-formatfn' },
                { text: 'buttons', link: '/reference#columns-buttons' },
                { text: 'updateOptions', link: '/reference#columns-updateoptions' },
              ]              
            },
            { 
              text: 'Params', 
              link: '/reference#params', 
              items: [
                { text: 'format', link: '/reference#params-format' },
                { text: 'formatString', link: '/reference#params-formatstring' },
                { text: 'datalist', link: '/reference#params-datalist' },
                { text: 'validate', link: '/reference#params-validatefn' },
              ]                     
            },
            { 
              text: 'Modals', 
              link: '/reference#modals',
              items: [
                { text: 'valueFromRow', link: '/reference#viewmodal-params-valuefromrow' },
                { text: 'usePage', link: '/reference#viewmodal-usepage' },
              ]
            },
            { 
              text: 'Actions', 
              link: '/reference#actions',
              items: [
                { text: 'query', link: '/reference#type-query' },
                { text: 'http', link: '/reference#type-http' },
                { text: 'valueFromSelectedRows', link: '/reference#actions-params-valuefromselectedrows' },
              ]              
            },
          ]
        },
        {
          text: 'Links',
          items: [
            { text: '샘플 예제', link: 'https://showroom.selectfromuser.com' },
            { text: '로그인', link: 'https://app.selectfromuser.com' },
            // { text: '(과거) YAML reference', link: '/docs/yaml-reference' },
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
      provider: 'local',
      // provider: 'algolia',
      // options: {
      //   appId: process.env.ALGOLIA_APP_ID,
      //   apiKey: process.env.ALGOLIA_API_KEY,
      //   indexName: process.env.ALGOLIA_INDEX_NAME,
      // }
    },
    editLink: {
      pattern: 'https://github.com/selectfromusercom/docs/edit/main/:path'
    },
    logo: '/favicon.png',
    // footer: {
    //   message: 'SelectAdmin',
    //   copyright: '© 2024 Selectfromuser Inc.'
    // },    
  }
})
