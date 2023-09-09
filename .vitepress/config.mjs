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
              link: '/guide/menu', 
              collapsed: true,
              items: [
                { text: '메뉴 권한 설정', link: '/guide/menu-permission'},
                { text: '메뉴 path 이름 규칙', link: '/guide/menu-naming-path'},
                { text: '계층 메뉴 만들기', linl: '/guide/menu-submenu-tree'},
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
          ]
        },
        {
          text: '리소스 연결',
          items: [
            { 
              text: '데이터베이스 연결', 
              link: '/guide/database-connect', 
            },
            { 
              text: '데이터베이스 변경', 
              link: '/guide/database-modify', 
            },
            { 
              text: 'MongoDB', 
              link: '/guide/database-mongodb', 
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
              text: 'SSO, IP, 세션 설정', 
              link: 'https://blog.selectfromuser.com/network-security-policy/', 
            },
          ]
        },
        {
          text: '컴포넌트',
          items: [
            { 
              text: '포넌트 라이브러리', 
              link: '/guide/component-library', 
            },
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
