---
outline: deep
---

## `title:`

어드민 사용자가 보는 페이지의 상단 왼쪽에 보여지는 제목입니다.

```yaml
title: 어드민 제목
```

## `layout: {}`

### layout.style

어드민 화면 최상단 영역의 스타일을 바꿀 수 있습니다. 우리 팀에게 맞는 배경색으로 바꿔보세요. 

> 📘 title 키와 동일한 위치에서 사용합니다.

```yaml
layout:
  style:
    backgroundColor: "#3f63bf !important"
    borderBottom: solid 1px rgba(0,0,0,0.05)
```

### layout.login

`Beta` 셀렉트로 파트너센터나 고객 포털 등을 제작하실 때 로그인 화면을 일부 커스텀, 화이트라벨링을 할 수 있습니다.

::: info
베타(Beta) 기간 후에 이용 요금제에 따라 관련 기능 지원 정책이 달라집니다. 궁금하신 사항은 [이메일](mailto:support@selectfromuser.com) 등으로 문의해주세요. 
:::

```yaml
layout:
  login:
    methods:
      google:
        enabled: true
        text: 회사계정 로그인
      email:
        enabled: true
        text: 이메일 비밀번호 로그인
    
    header: Selectfromuser.com
    # header: |
    #   <img src="https://align.selectfromuser.com/lib_DmHvtrBlUMtUhGvc/sh11bex09q31frsy.png" style="height: 50px; margin: 0 auto;" />
    favicon: https://files.umso.co/lib_DmHvtrBlUMtUhGvc/emvdae7wl2lyppo0.png
    title: 파트너센터 로그인
    subtitle: 입점한 셀러분들만 이용할 수 있어요.
    width: 600
    buttons:
      - label: 도움말
        href: https://docs.selectfromuser.com
        target: _blank
      - label: 입점하기
        href: https://docs.selectfromuser.com
        target: _blank
    footer: |
      <b>© 2023 selectfromuser Inc.</b>
      주식회사 셀렉트프롬유저 | 서울시 송파구 법원로 128, B동 1408호 (문정동, 문정역SKV1)
      사업자등록번호 386-88-02410 | 통신판매신고 제2023-서울송파-0491호
```

### layout.head

셀렉트 어드민 `<head>` 태그에 필요한 스크립트(script)를 임베드할 수 있습니다. 구글 애널리틱스(Google Analytics)나 앰플리튜드(Amplitude) 등 분석 서비스의 스크립트를 활용해보세요.

::: info
베타(Beta) 기간 후에 이용 요금제에 따라 관련 기능 지원 정책이 달라집니다. 궁금하신 사항은 [이메일](mailto:support@selectfromuser.com) 등으로 문의해주세요. 
:::

**구글 애널리틱스(Google Analytics, GA) 예제**

GA 태그
```html
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-XXXXXXXXXX');
</script>
```

셀렉트 임베드 방법
```yaml
layout:
  head:
    - tag: script
      async: true
      src: https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX
    
    - tag: script
      innerHTML: |
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', 'G-XXXXXXXXXX');
```

<!-- ## [`menus`](/menus) -->

<!-- ## [`pages`](/pages) -->

<!-- #### [`layout`](/layout#menus) -->

# `menus: []`

어드민 사용자 페이지의 메뉴를 설정할 수 있습니다. 

## menus.path

메뉴에 접근하는 경로입니다. 링크를 공유했을 때 사용자가 이해하기 쉬운 네이밍을 한다면 좋습니다.

## menus.name

메뉴에 표시되는 이름입니다.

```yaml
menus:
- path: user
  name: 사용자
```

## menus.group

group이 없는 경우 모든 메뉴는 같은 그룹으로 인식됩니다. 메뉴들을 따로 묶고 싶으신 경우 group을 이용해주세요.

```yaml
menus:
- path: user
  name: 사용자
  group: u
- path: user/active
  name: 활성 유저
  group: u
```

## menus.placement

메뉴는 기본적으로 왼쪽 영역과 오른쪽 탭에 둘다 나타납니다. 왼쪽 또는 탭에만 메뉴를 보여주고 싶은 경우 placement를 이용해보세요.

```yaml
placement: menu-only
placement: tab-only
placement: expand-only
placement: page-only # 탭메뉴 표시 안함
```

```yaml
menus:
- path: user
  name: 사용자
  group: u
- path: user/active
  name: 활성 유저
  group: u
  placement: tab-only
```

## menus.redirect

메뉴 클릭 시 redirect 시킬 path 또는 링크를 지정합니다. 

```yaml
menus:
- path: user
  name: 사용자
  group: u
  redirect: user/all
  placement: menu-only
- path: user/all
  name: 전체 사용자
  group: u
  placement: tab-only
- path: user/active
  name: 활성 유저
  group: u
  placement: tab-only
```

## menus.roles

메뉴와 페이지 접근에 대한 권한을 설정합니다. 그룹별 또는 개별 이메일로 설정 가능합니다.  
자세한 사항은 ['메뉴 권한 설정'](https://docs.selectfromuser.com/docs/%EB%A9%94%EB%89%B4-%EA%B6%8C%ED%95%9C-%EC%84%A4%EC%A0%95) 가이드에서 확인하실 수 있어요. 

```yaml
menus:
- path: /approvals
  name: 심사
  roles:
    list:
    - 팀장
    - 임원
    view:
    - 팀장
    - 임원
    - email::test@email.com
```

| list (메뉴에 보이기) | view (페이지 접근) | 용도/결과                       |
| :------------- | :------------ | :-------------------------- |
| O              | O             | 해당 메뉴와 페이지에 접근 권한 있음 (일반적)  |
| X              | X             | 해당 메뉴와 페이지에 권한 없음 (일반적)     |
| O              | X             | 권한은 없지만 메뉴의 존재 자체는 알 수 있음   |
| X              | O             | URL만으로 비공개 페이지 공유 또는 테스트할 때 |

## menus.type: divider

메뉴 사이에 시각적으로 영역을 구분짓고 싶을 때 사용할 수 있습니다.

```yaml
menus:
- path: user
  name: 사용자
  group: u
  
- type: divider

- path: payment
  name: 결제
  group: p
```

## menus.type: search

메뉴들 사이에 퀵서치Quick Search 용도로 검색창을 넣을 수 있습니다. 

- `redirect`로 path를 지정하여 이동합니다. 
- 검색 시 입력값은 trim(공백제거) 처리합니다.
- `label`로 검색 버튼 이름을 바꿔보세요. 

```yaml
menus: 

  - type: search
    label: 검색
    placeholder: 고객이름
    redirect: search-user?name={{value}}

  - type: search
  	label: 찾기
    placeholder: 010-0000-0000
    redirect: search-user?phone={{value}}
    
  - path: search-user
```

### placement: top

검색창을 최상단 메뉴바 영역에도 보이게 하고, 간단한 스타일도 적용할 수 있습니다. 

```yaml YAML
menus:

  - type: search
  	label: 검색
    placeholder: 010-0000-0000
    redirect: search-user?phone={{value}}
    placement: top
    style:
      width: 500px
```

### datalistFromQuery

검색창 안에 보여줄 특정 데이터들을 datalistFromQuery로 가져올 수 있습니다. 

- 가져온 데이터 필드들을 `format`으로 치환해서 보여줍니다.
- `html: true`를 사용하면 format 안에 html 양식을 사용할 수 있습니다. 
- 가져온 데이터의 테이블에 따라 redirect를 다르게 지정할 수 있습니다. 

```yaml
menus:
  - type: search
    placement: top
    placeholder: 상품코드/재고코드/공급코드
    style:
      width: 300px
    datalistFromQuery:
      resource: mysql.qa
      type: query
      sqlType: select 
      sql: >
        (
          SELECT id, name, 'properties' AS category
          FROM properties
          WHERE id LIKE CONCAT('%', :value, '%')
             OR (LENGTH(:value) > 2 AND name LIKE CONCAT('%', :value, '%'))
          ORDER BY id DESC
          LIMIT 10
        )
        UNION ALL
        (
          SELECT id, name AS name2, 'properties2' AS category
          FROM properties2
          WHERE id LIKE CONCAT('%', :value, '%')
             OR (LENGTH(:value) > 2 AND name LIKE CONCAT('%', :value, '%'))
          ORDER BY id DESC
          LIMIT 10
        )
      format: >
        ID: {{ id}}     Name: {{name}}{{   name2    }} ({{category}})
      
      # html: true
      # format: >
      #   <span style="color: royalblue">ID: {{ id}}</span>    
      #   {{name}}{{   name2   }}
      #   ({{category}})

      redirect:
        properties: search-user-id?p={{category}}&user_id={{id}}
        properties2: >
          search-user-id?p={{category}}&cc_id={{id}}#{{hero_image_url}}
```

## menus.icon

메뉴 이름(name) 앞에 U, NEW, TIP 같은 내용이나 약어를 텍스트로 추가하거나 mdi 아이콘을 추가할 수 있어요.

- 지원하는 아이콘: https://pictogrammers.github.io/@mdi/font/7.2.96/
- 필요한 아이콘을 찾기 쉬운 사이트: https://pictogrammers.com/library/mdi/

```yaml
menus:
- path: user
  icon: U
  name: 사용자  
- path: payment
  icon: mdi-cash
  name: 결제관리
```

## menus.iconEnd

메뉴 이름(name) 뒤쪽에 텍스트를 추가하거나 mdi 아이콘을 추가할 수 있어요. icon과 함께 사용할 수도 있습니다.

```yaml
menus:
- path: payment
  iconEnd: mdi-cash
  name: 결제관리
```

## menus.menus

메뉴 아래에 메뉴를 추가하고 접고 펼 수 있습니다.

```yaml
menus:
- path: user
  name: 사용자 관리
  placement: expand-only

  menus:
  - path: active-user
    name: 활성 사용자
```

<!-- #### [`layout`](/layout#pages) -->

# `pages: []`

페이지들을 구성하기 위한 최상위 키

## pages.path

개별 페이지와 메뉴를 path 정보로 연결합니다.

```yaml
menus:
- path: user
- path: payment

pages:
- path: user
- path: payment
```

<!-- ## [pages.blocks](/blocks) -->
## pages.blocks

페이지 안을 블록으로 구성합니다. 

```yaml
menus:
- path: user

pages:
- path: user
  blocks:
```

## pages.autofocus

페이지 단위로 입력 필드의 autofocus 기능을 끌 수 있습니다.

```yaml
pages:
- path: user
  autofocus: false
```

<!-- ## [pages.params](/params#pages-params) -->

<!-- #### [`pages`](/pages#pages-blocks) -->

# `blocks: []`

페이지 안은 블록들로 이루어져 있습니다. 1개 또는 여러개를 추가할 수 있으며, 블록의 종류는 query, http, markdown 이 있습니다. 

```yaml
blocks:
- type: query
- type: http
- type: markdown
```

## blocks.type


```yaml
blocks:
- type: query
  name: 샘플 쿼리
  resource: sample.db
  sqlType: select # update, insert
- type: http
  name: 샘플 http
  axios: GET
- type: markdown
  content: type anything
```

### type: query

SQL 쿼리의 select, update, insert를 모두 사용할 수 있습니다. 

```yaml
sqlType: select
sqlType: update
sqlType: insert
```

```yaml
- type: query
  resource: sample.db
  sqlType: select
  sql: SELECT * FROM user LIMIT 10
```

```yaml
- type: query
  resource: sample.db
  sqlType: update
  sql: UPDATE user SET status = :status WHERE id = :id AND email = :email
  params:
  - key: status
  - key: id
  - key: email
```

#### sqlConfirm

실행될 쿼리를 확인하고 진행합니다. (update, delete 경우에 활용)

```yaml
- type: query
  resource: sample.db
  sqlType: select
  sql: UPDATE user SET status = :status WHERE id = :id AND email = :email
  sqlConfirm: true
  params:
  - key: status
  - key: id
  - key: email
```

#### toast, toastOptions

블록 실행 시 알림창(toast)을 띄울 수 있습니다. 

- `toast`: 알림창 안 내용을 입력합니다.
- `toastOptions`
  - `type`: 알림창(toast)의 타입을 설정합니다.
  - `position`: 알림창 위치를 설정합니다.
  - `duration`: 알림창이 떠있는 시간을 설정합니다. (단위: ms)

```yaml
- type: query
  resource: sample.db
  sqlType: select
  sql: UPDATE user SET status = :status WHERE id = :id AND email = :email
  sqlConfirm: true
  params:
  - key: status
  - key: id
  - key: email
  toast: 상태를 변경했습니다.
  toastOptions:
    type: success
    # success, error, warning, info
    position: top-right
    # top-right, top-center, top-left, bottom-right, bottom-center, bottom-left
    duration: 3000
```

### type: http

REST API와 GraphQL API 모두 사용 가능합니다. axios 용법을 그대로 따릅니다. axios에 대한 자세한 설명은 여기서 확인해보세요. 

#### method: GET

```yaml
- type: http
  axios:
    method: GET
    url: https://testapi.com/v1/33iac2d
  rowsPath: rows
```

#### method: POST

```yaml
- type: http
  axios:
    method: POST
    url: https://testapi.com/v1/33iac2d
    data:
      'user_id': user-{{id}}
      'v': "{{API_VERSION}}" 
  params:
  - key: id
  - key: API_VERSION
    valueFromEnv: true
```

#### graphQL

```yaml
- type: http
  name: http 샘플
  axios:
    method: POST
    url: https://testapi.com/v1/33iac2d
    data:
      query: >
        {
          getUser(id: "test") {
            id
            name
            email
          }
        }
```

### type: markdown

마크다운 용법에 맞춰서 내용을 작성할 수 있습니다. 페이지에 대한 설명이나 유의사항 등을 작성해보세요.

```yaml
- type: markdown
  content: >
    write something
```

### type: top, left, center, right, bottom

페이지 안에 영역을 구분하는 타입입니다. 해당 타입을 입력하고 아래에 쿼리, API, 마크다운 블록을 추가할 수 있습니다. 복잡한 레이아웃layout을 더 손쉽게 구성할 수 있어요.

```yaml
blocks:
- type: top # left, center, right, bottom
  title: title
  subtitle: subtitle
  blocks:
  - type: markdown
  - type: query
```

### type: header

사이트 이동 경로(breadcrumb)을 페이지 최상단에 표시할 수 있습니다. items 아래 순서대로 표기됩니다.

아이콘`icon`은 아래 방식들로 지원합니다. 

- 지원하는 아이콘: <https://pictogrammers.github.io/@mdi/font/7.2.96/>
- 필요한 아이콘을 찾기 쉬운 사이트: <https://pictogrammers.com/library/mdi/>

```yaml
blocks:
- type: header # 사이트 이동 경로(breadcrumb) 표시 영역
  items:
  - path: company
    label: 업체목록
    icon: home
  - label: 업체상세
```

### type: tab

blocks 아래에 탭을 자유롭게 추가할 수 있어요. 탭 스타일도 지정할 수 있습니다. 

- tabOptions.type: button, button full, full, plain
  - 탭 타입(스타일)을 지정합니다.
- tabOptions.keep: true
  - 선택했던 탭을 유지합니다.

```yaml
blocks:
- type: tab
  tabOptions:
    type: button # 버튼형 탭
    # type: button full # 전체폭 버튼형 탭
    # type: full # 전체폭 탭
    # type: plain
    # keep: true
    autoload: 1
    tabs:
    - name: 주문
      blocks:
    - name: 결제
      blocks:
```

### type: iframe

어드민 페이지 안에 글이나 영상을 iframe 방식으로 임베딩embedding 할 수 있습니다. 

```yaml
pages:
- path: iframe-sample
  blocks:
  - type: iframe
    src: https://www.selectfromuser.com/
    style:
      width: 50%
      minWidth: 550px
      height: 80vh
```

### type: comment

사용자, 담당자 로그가 필요한 화면에 댓글, 노트, 메모를 남겨보세요.

- `path`: 코멘트의 저장위치를 설정합니다.
- 계정정보의 이름, 이메일 등이 기록됩니다.
- 코멘트 추가, 수정, 삭제 지원
- "나에게만 표시" 기능 지원

```yaml
- type: query
  resource: mysql.qa
  sql: SELECT id, name, created_at FROM customers LIMIT 5
  columns:
    id:
      hidden: false
  viewModal: 
    mode: side
    useColumn: name
    blocks:
      - type: comment
        path: customers/{{id}}
        params:
          - key: id
            valueFromRow: true
```

## blocks.reloadAfterSubmit

데이터 추가, 수정 후에 관련 페이지를 새로고침 하고 싶을 때 이용해요.

insert, update 쿼리 블록이나 post api 블록으로 반영된 데이터를 바로 조회하고 싶을 때 적합해요.

```yaml
- type: query
  resource: mysql
  sqlType: insert
  sql: >
    INSERT INTO products
    SET created_at = NOW()
      , name = :name
  params:
    - key: name
      label: 상품명
  reloadAfterSubmit: true
```

## blocks.resetAfterSubmit

INSERT 쿼리 블록이나 POST API 블록 등을 실행한 다음에 입력 값을 초기화하여 빈칸으로 만들고 싶을 때 사용해요.

```yaml
- type: query
  resource: mysql
  sqlType: insert
  sql: >
    INSERT INTO properties
    SET created_at = NOW()
      , name = :name
  params:
    - key: name
      label: 자산명
  resetAfterSubmit: true
```

## blocks.redirectAfterSubmit

블록을 실행한 다음 특정 페이지로 바로 이동하고 싶을때 사용해요.

```yaml
- type: query
  name: 추가
  resource: mysql.qa
  sqlType: insert
  sql: >
    INSERT INTO FaqContent
    SET name = :name,
        type2 = :type2,
        created_at = NOW()
  redirectAfterSubmit: "/faq-contents"
  # redirectAfterSubmit: |
  #   /faq-contents#{"modal":{"id":{{insertId}},"$name":"view","p":"pages.142.blocks.0"},"tableSelectedRows":[]}
```

## blocks.closeAfterSubmit

모달을 띄운 다음, 데이터 수정 등 작업 제출시 창을 닫을 수 있습니다.

```yaml
modals:
  - path: modal1-:id
    header: false
    height: 400px
    blocks:
      - type: http
        name: 포스트 업데이트
        axios:
          method: POST
          url: https://jsonplaceholder.typicode.com/posts
        closeAfterSubmit: true  
        params:
        - key: published_at
```

## blocks.autosubmit

SELECT 쿼리 블록이나 GET API 등 데이터 조회 블록에서 params와 함께 필터 검색을 할 때 사용됩니다. 

조회버튼을 누르지않고 값을 입력하면 바로 제출하게 되는 옵션입니다.

```yaml
- type: query
  resource: mysql.qa
  sqlType: select
  sql: >
    SELECT id, name FROM wine_stock
    WHERE name LIKE CONCAT('%', :category ,'%')
  autosubmit: true
  params:
    - key: category
      dropdown:
        - 블랑
        - 트라피체
```

## blocks.containerClass

블록 영역의 container 스타일을 바꿀 수 있습니다. (예시: `containerClass: container mx-auto`)

```yaml
pages:
- path: select/UserTemplateLog
  blocks:
  - type: query
    resource: selectCloud
    containerClass: container mx-auto
    sqlType: select
    sql: ...
```

## blocks.showDowload

`showDownload: false`

데이터 다운로드 기능을 끌 수 있습니다. 

```yaml
pages:
- path: show-download-false
  blocks:
  - type: query
    resource: mysql.qa
    sqlType: select
    sql: >
      SELECT *
      FROM test
      LIMIT 10
    showDownload: false
```

`showDownload: csv`

조회한 데이터를 CSV 파일로 다운로드할 수 있습니다.

```yaml
pages:
- path: show-download-csv
  blocks:
  - type: query
    resource: mysql.qa
    sqlType: select
    sql: >
      SELECT *
      FROM test
      LIMIT 10
    showDownload: csv
```

`showDownload: csv formatted`

데이터 다운로드는 '데이터 원본'을 기본으로 합니다. 셀렉트 어드민에 보여지는대로 다운로드 받고 싶으시다면 `formatted`를 추가해주세요.

## blocks.log

쿼리 실행을 로깅하여 모니터링하고 싶을 때 이용해요.

**포맷과 예제**

- log: [key] [memo]
  - log: 호텔변경 id={{id}} before={{type2}} after=BNB
  - log: 월드관리\_색상변경

```yaml
blocks:
- type: query
  resource: mysql.qa
  sqlType: insert
  sql: >
    INSERT INTO test SET name = :name, created_at = NOW()
  params:
  - key: name
  # log: true
  log: 데이터추가 name={{name}}
```

### log.prompt

데이터 수정시 사유입력 프롬프트를 제공합니다.

prompt: true 적용시 변경사유를 남기고 실행하는 구조입니다.
조회성 블록 외, 수정하는 query, http api 에서만 켜집니다.

```yaml
  - type: right
    blocks:
      - type: http
        axios:
          url: https://httpbin.selectfromuser.com/anything
          method: POST
        log:
          name: 수정_와인목록_API
          prompt: true
          # promptComments:
          #   - 고객요청
          #   - 파기
        params: 
          - key: name
            value: HELLO  
  - type: left
    blocks:
    - type: query
      resource: mysql.qa
      sqlType: insert
      sql: SELECT 1
      log:
        name: 수정_와인목록
        prompt: true
        promptComments:
          - 고객요청
          - 파기
      params: 
        - key: name
          value: HELLO
```

## blocks.roles

메뉴 단위보다 더 세부적인 접근제어가 필요한 경우 block 단위 권한지정을 사용해보세요.

- 모든 block 요청시 roles.edit에 권한지정시 서버단에서 차단
- menus roles처럼 권한그룹, email::, select::edit 사용가능
- 차단되면 '사용자에게 수정 권한이 없습니다' 표시

```yaml
- type: http
  axios:
    url: https://httpbin.selectfromuser.com/anything
    method: POST
  roles:
    edit: 
      - email::testsupport@selectfromuser.com
```


## blocks.paginationOptions

주로 조회할 때 페이지네이션을 추가해서 필요한 정보만 빨리 볼 수 있게 도와줍니다. 

### perPage

페이지 당 보여지는 기본 row 개수를 지정합니다. 

```yaml
- type: query
  ...
  paginationOptions:
    enabled: true
    perPage: 10
```

### total

별도의 쿼리없이 [서버사이드 페이지네이션](/guide/view-page-pagination#서버-사이드-페이지네이션-server-side-pagination-도-가능한가요){target="_blank"}을 적용할 수 있습니다. 

테이블 내역의 전체개수를 total로 설정합니다. 

반드시 `page_offset`, `page_limit`, `mode: remote`과 함께 써야합니다.

::: code-group

```yaml [MySQL]
- type: query
  resource: mysql.qa
  sqlType: select
  sql: >
    SELECT * 
    FROM properties
    LIMIT :page_offset, :page_limit
  paginationOptions:
    enabled: true
    perPage: 10
    total: 5000
  mode: remote
```

```yaml [MongoDB]
- type: query
  resource: mongodb
  sqlType: select
  query:
    collection: properties
    find: {}
    limit: ${{page_limit}}
    skip: ${{page_offset}}
  paginationOptions:
    enabled: true
    perPage: 10
    total: 5000
  mode: remote
```

:::

### jumpPage

숫자를 입력해 특정 페이지로 바로 이동할 수 있어요.

```yaml
paginationOptions:
  enabled: true
  jumpPage: true
```

### position: top

페이지네이션 UI를 테이블 위쪽으로 옮길 수 있습니다. 

```yaml
paginationOptions:
  enabled: true
  position: top
```

## blocks.searchOptions

조회한 내역들을 검색할 수 있게 지원합니다. 프론트 레벨에서 검색하기 때문에 서버 부하를 줄일 수 있는 장점이 있습니다. 

```yaml
- type: query
  ...
  searchOptions:
    enabled: true
```

### trigger

테이블 검색 시, 내용을 입력하고 엔터(enter)를 눌렀을 때만 조회하게 설정할 수 있습니다. 데이터를 안정적으로 조회할 수 있는 장점이 있습니다. 

```yaml
searchOptions:
  enabled: true
  trigger: enter
```

### placeholder

테이블의 검색 필드 안에 placeholder 값을 입력할 수 있습니다. 사용자가 참고할 수 있는 정보를 기입할 수 있습니다.

```yaml
searchOptions:
  enabled: true
  placeholder: '입력한 검색어로 찾습니다.'
```

### ignoreCase

검색시 알파벳 대소문자 무시 설정을 합니다. (기본값은 `ignoreCase: true`)

```yaml
searchOptions:
  enabled: true
  ignoreCase: false
```

### ignoreWhitespace

검색시 공백 무시 설정을 합니다. (기본값은 `ignoreWhitespace: true`)

```yaml
searchOptions:
  enabled: true
  ignoreWhitespace: false
```

## blocks.tableOptions

- `fixed`: 테이블의 머리행(header)을 고정할 수 있습니다. 
  - `height` 값 입력 시 테이블 높이를 설정하게 됩니다. 300~400px 또는 60~80vh 로 설정하시면 기본적인 범위를 아실 수 있습니다.
- `condensed`: 테이블 행(row) 높이를 좁게 만들어 한페이지에서 더 많은 데이터를 볼 수 있습니다. 
- `bordered`: 테이블 컬럼 사이의 세로줄을 없앨 수 있습니다. 
- `striped`: 테이블 행들을 구분하기 쉽게 번갈아가며 색상을 바꿔줍니다. 
- `small`: 테이블 안의 글씨 크기를 작게 만듭니다.
- `hidden: true`: 테이블의 전체 항목을 가릴 수 있습니다. 각 column에 값이 있으면 무시합니다. 원하는 항목만 표시할 때 사용해요. (`columns.hidden: false`)
- `sortable: false`: 테이블 전체 컬럼의 정렬 기능을 끌 수 있습니다. 원하는 컬럼만 정렬을 켜보세요.
- `thClass: text-center`, `tdClass: text-center`: 테이블 전체에 부트스트랩 클래스를 적용할 수 있어요. 

```yaml
- type: query 
	...
  tableOptions:
    fixed: true
    height: 300px
    # height: 80vh
    condensed: true
    bordered: false
    striped: true
    small: true
    sortable: false
    # hidden: true
    thClass: text-center
    tdClass: text-center
```

### tableOptions.cell

`cell: true`를 추가하면 특정셀을 마우스/엔터로 선택하거나 키보드 화살표로 이동할 수 있어요. 

columns, updateOptions와 함께 사용하면 특정셀을 수정하고 저장할 수도 있습니다.

```yaml
tableOptions:
  cell: true
columns:
  inflow:
    updateOptions:
      type: query
      resource: mysql.qa
      sql: UPDATE wine_stock SET inflow = :value WHERE id = :id
      toast: 저장
```

## blocks.sortOptions

데이터 조회 결과의 정렬 기본값을 설정할 수 있습니다. 

```yaml
blocks:
- type: query 
  resource: mysql
  sqlType: select
  sql: >
    ...
  sortOptions:
    enabled: true
    initialSortBy:
      field: Ratio # 필드 이름
      type: desc # desc, asc
```

`multipleColumns: true`로 여러개 컬럼도 설정 가능합니다. 

```yaml
blocks:
- type: query 
  resource: mysql
  sqlType: select
  sql: >
    ...
  multipleColumns: true   
  sortOptions:
    enabled: true
    initialSortBy:
      - field: Ratio
        type: desc
      - field: ClickCount
        type: desc    
```

## blocks.columnOptions

주로 데이터 조회 결과를 다르게 표현하고 싶을 때 이용합니다. columnOptions와 columns 사용 시 값의 데이터 타입이 text로 지정됩니다. 데이터 타입을 바꾸고 싶은 경우 type키를 이용해주세요. 

```yaml
- type: query
  ...
  columnOptions:
  - field: id
  - field: name
    label: 이름
  - field: json
    format: json
```

### columnOptionsAppend

전체 필드를 보여주면서, 일부 필드만 columnOptions로 수정하고 싶을 때 사용하세요.

```yaml
columnOptionsAppend: true
columnOptions:
- field: name
  label: 이름
```

<!-- ## [blocks.columns](/columns) -->
## blocks.columns

columnOptions와 동일한 기능이고 양식이 다릅니다. 

```yaml
- type: query
  ...
  columns:
    id:
    name:
      label: 이름
    rank:
      label: 랭킹
      type: number
    created_at:
```

<!-- ## [blocks.params](/params) -->
## blocks.params

블록 안에서 parameter를 쓸 수 있습니다. 데이터를 조회하거나 생성, 수정할 때 입력폼(input) 역할을 하게 됩니다. 

```yaml
- type: query
  ...
  params:
  - key: id
    label: 아이디(ID)
```

## blocks.tabOptions

블록 안에 세부 탭을 여러개 추가할 수 있습니다. 

```yaml
blocks:
- type: query
  ...
  tabOptions:
    autoload: 1
    tabs:
    - name: 주문
      blocks:
    - name: 결제
      blocks:
```

## blocks.chartOptions

조회 데이터 결과를 막대(bar), 선(line), 원형(doughnut, polarArea) 등 차트나 그래프로 표현할 수 있습니다. 

```yaml
blocks:
- type: query
  name: 상품 카테고리 비율
  resource: mysql.qa
  sqlType: select
  sql: >
    SELECT `type`, COUNT(id) AS count
    FROM products
    WHERE `type` IS NOT NULL
    GROUP BY `type`
  chartOptions:
    type: bar # line, doughnut, polarArea
    x: type
    y: count
  showButtonWithResult: true
```

### chartOptions.y

차트의 y축에 해당하는 항목을 복수로 선택할 수 있어요.

```yaml
chartOptions:
  type: bar
  x: date
  y: 
    - company
    - user
```

### chartOptions.backgroundColor

차트의 배경색을 바꿀 수 있어요.

```yaml
chartOptions:
  type: bar
  x: date
  y: 
    - company
    - user
  backgroundColor:
    company: "RoyalBlue"
    user: "#0D6EFD"
```

## blocks.display

### display: form

조회한 데이터를 form 양식으로 보여주거나, 데이터를 입력하는데 사용할 수 있어요.

주로 viewModal, modals나 tabOptions, type: left/right 등을 사용해 부모블록의 하위에 쓰입니다.

**조회 예제**

```yaml
viewModal:
  blocks:
  - type: query
    resource: mysql.qa
    sqlType: select
    sql: SELECT id, name, email, created_at FROM users WHERE id = :id
    params:
      - key: id
        valueFromRow: id      
    display: form
```

**수정 예제**

```yaml
viewModal:
  blocks:
  - type: query
    resource: mysql.qa
    sqlType: update
    sql: >
      UPDATE users
      SET updated_at = NOW()
        , name = :name
        , email = :email
      WHERE id = :id
    params:
      - key: id
        valueFromRow: id
      - key: name
      - key: email       
    display: form
```

### display: form inline

form 양식 데이터를 inline 형태로 나열해줍니다.

```yaml
- type: query
  resource: mysql.qa
  sqlType: select
  sql: SELECT id, name, email, created_at FROM users WHERE id = :id
  params:
    - key: id
      valueFromRow: id      
  display: form inline
```

#### display: form + INSERT

데이터를 추가하는 사용자에게 더 알맞는 입력폼을 만들어보세요.

**formOptions**로 양식 너비를 조절할 수 있어요.

- `firstLabelWidth`: 줄 가장 왼쪽 최소 너비
- `labelWidth`: 레이블 최소 너비
- `width`: 입력 폼 너비

**추가 예제**

```yaml
blocks:
  - type: query
    resource: mysql.qa
    sqlType: insert
    sql: >
      INSERT INTO products
      SET created_at = NOW()
        , main_image = :main_image
        , name = :name
        , code = :code
        , price = :price
        , sell_status = :sell_status
    display: form
    formOptions:
      firstLabelWidth: 200px
      labelWidth: 100px
      width: 400px
    params:
      - key: main_image
        label: 대표이미지
        title: 상품 추가
        required: true
      - key: name
        label: 상품명
        group: prod
      - key: code
        label: 상품코드
        group: prod        
      - key: price
        label: 판매가
        format: number
        group: sell        
      - key: sell_status
        label: 판매여부
        group: sell  
        width: 200px
```

#### divider, title, subtitle

필드와 속성이 여러개면 구분이 필요합니다. 구분선이나 묶음 이름을 넣을 수 있어요.

```yaml
viewModal:
  useColumns: id
  blocks:
    - type: query
      resource: mysql.qa
      sqlType: select
      sql: >
        select *
        from properties
        where id = :id
      params:
        - key: id
          valueFromRow: id
      display: form
      columns:
        id:
          title: 기본정보
          subtitle: 상품에 대한 기본정보
        name:                
        address:
          divider: true
          title: 상세정보
        type:          
        hero_image_url:
        memo:
```

### display: col-1

조회한 데이터를 피봇 테이블로 보여줍니다.

```yaml
blocks:
- type: query
  sqlType: select
  ...
  display: col-1
  # thStyle:
  #   width: 150px
```

### display: col-2

조회한 데이터를 피봇 테이블로 2등분합니다.

```yaml
blocks:
- type: query
  sqlType: select
  ...
  display: col-2
```

### display: col-1/2 + updateOptions

updateOptions, columns.editable 과 함께 사용 시 display: col-1/2 뷰를 유지하면서 데이터를 수정할 수 있게 됩니다.

```yaml
blocks:
  - type: query
    resource: mysql.qa
    sqlType: select
    sql: >
      SELECT id, name
      FROM test
      WHERE id = :id
    display: col-1
    updateOptions:
      type: query
      resource: mysql.qa
      sql: >
        UPDATE test
        SET created_at = NOW()
          , name = :name    
        WHERE id = :id
    params:
      - key: id
        valueFromRow: id
    columns:
      id:
      name:
        editable: true
```

### display: post

- 내용을 위에서 아래로 문단 표시합니다. 
- thClass, thStyle, thClass, tdStyle 활용 가능

```yaml
blocks:
- type: query
  resource: mysql.qa
  sqlType: select
  sql: > 
    SELECT title, body FROM app_notice
    WHERE id = :id
  params:
    - key: id
      valueFromRow: id
  display: post        
  columns:
    title:
      # tdClass: text-lg font-bold text-slate-500
      label: " "
      tdClass: px-8 leading-8
      tdStyle:
        fontSize: 1.5rem !important
    body:
      # tdClass: p-5 text-sm font-semibold text-slate-700
      tdClass: text-sm p-8
      label: " "
```

### display: card

데이터를 카드형태로 보여줍니다.

```yaml
blocks:
- type: query
  resource: mysql.qa
  sqlType: select
  sql: >
    SELECT id, name, memo
    FROM properties
    ORDER BY id ASC 
    LIMIT 100
  display: card
```

### display: metric

지표 데이터를 보여줄 때 유용합니다.

#### metricOptions.type: bar

```yaml
blocks:
  - type: query
    resource: mysql.qa
    name: category barlist
    sql: > 
      SELECT COALESCE(`type`, 'NONE') AS 't', count(id) * 334 AS 'c'
      FROM properties
      GROUP BY `type`
      ORDER BY 2 DESC
    display: metric      
    metricOptions:
      type: bar
      name: t
      nameLabel: 소스
      value: c      
      valueLabel: 방문자수
      total: 전체 방문 # value 값들의 전체 합과 라벨
```

#### metricOptions.type: category

```yaml
blocks:
  - type: query
    resource: mysql.qa
    name: category
    sql: > 
      SELECT count(id) as 'c'
      FROM users
      GROUP BY ISNULL(`signed_at`)
      ORDER BY 1 DESC
    display: metric      
    metricOptions:
      type: category
      names: 
        - Active users
        - Inactive users
      value: c
      total: 전체 사용자 # value 값들의 전체 합과 라벨
```

### display: calendar

조회한 데이터를 달력 형태로 보고, 날짜별 상세 내역을 클릭하여 모달을 띄울 수 있어요.
- `cache: true`: 캐시를 남겨 불필요한 로딩을 방지해줍니다. 이전달, 다음달을 오고갈때 더 자연스러워요.
- `color`: tailwindcss color class를 지원합니다. https://tailwindcss.com/docs/customizing-colors
- `formatFn: numberPart`: 숫자에 구분점(,)을 찍어줍니다.
- `openModal`: 상세 내역을 클릭하여 모달을 띄울 수 있어요. `modals`와 함께 이용해보세요.

```yaml
blocks:
  - type: query
    resource: mysql.qa
    sqlType: select    
    sql: >
      SELECT 
        DATE_FORMAT(created_at, '%Y-%m-%d') as 'date',
        CONCAT(COUNT(id), ' 건') AS count_order,
        CONCAT(SUM(amount), ' 원') AS sum_order_amount,
        CONCAT('취소 ', COUNT(IF(status = 'cancel', id, NULL)), ' 건') AS count_order_cancel
      FROM orders
      WHERE created_at BETWEEN :calendar1 AND :calendar2
      GROUP BY 1
    params:
      - key: calendar
        range: true
        valueFromCalendar: true
    display: calendar
    autoload: true    
    cache: true
    columns:
      count_order: 
        label: 총 주문수
        color: blue-600
        formatFn: numberPart
      sum_order_amount: 
        label: 주문금액 합계
        color: green-600        
        formatFn: numberPart
        openModal: order-list
      count_order_cancel: 
        label: 취소수량
        color: gray-500
```

### display: timeline

조회한 데이터를 날짜로 정렬해서 타임라인 뷰로 볼 수 있습니다. 변경내역 조회 등에 활용할 수 있어요.
- `timelineOptions`로 정렬 기준 컬럼을 선택하고 template을 지정할 수 있습니다. 
- template은 HTML 적용 가능합니다.
- 조회한 값을 template 안에서 `{{value}}` 방식으로 사용해요.

```yaml
- type: query
  resource: mysql.qa
  sqlType: select
  sql: >    
    SELECT payments.created_at, users.name AS user_name, 
      payments.plan_name,
      payments.json->"$.before" as `before`,
      payments.json->"$.after" as `after`
    FROM payments, users
    where payments.team_id = :team_id 
      and users.id = payments.user_id
    ORDER BY payments.id DESC LIMIT 10
  display: timeline
  timelineOptions:
    useColumn: created_at    
    template: |
      <b>{{user_name}}</b>
      {{plan_name}}: <b>{{after}}</b>로 변경했습니다.

    # template: <b>{{user_name}}</b>님이 플랜을 변경했습니다. <b>{{plan_name}}</b> {{before}} → {{after}}
    # template:
    #   Payment create: <b>{{user_name}}</b>님이 새로운 플랜을 결제하였습니다.
  params:
    - key: team_id
```

## blocks.submitButton

params와 주로 쓰입니다. 값을 입력하고 제출할 때 버튼의 이름이나 색상을 바꿀 수 있어요. 

```yaml
submitButton:
  label: 검색
  type: primary
```

### submitButton.type

버튼 색상은 아래와 같이 바꿀 수 있습니다. 

![](https://imagedelivery.net/MHVC-FGTDyxApYeHyF29Tw/5486ec98-e82e-48a8-8d8a-22947e328800/docs "a7cec87-Screen_Shot_2022-11-04_at_6.03.19_PM.png")

```yaml
type: default
# type: primary
# type: primary-light
# type: danger
# type: danger-light
# type: warning
# type: warning-light
# type: success
# type: success-light
```

## blocks.resetButton

params 필드에 입력한 값들을 일괄적으로 빈값으로 바꾸고 싶을 때 이용합니다.  
`params.key.defaultValue`에 상관없이 항상 빈값으로 처리하고 싶은 경우 `clear: true`를 추가합니다. 

```yaml
# resetButton: true
resetButton:
  label: 초기화
  type: light
  # clear: true
```

## [blocks.viewModal](/reference#modals)

테이블 마지막에 '조회' 버튼이 추가됩니다. 클릭시 새로운 모달 팝업이 노출됩니다.

```yaml
- type: query
  ...
  viewModal:
    blocks:
    - type: query
```

### [viewModal.useColumn](/reference#viewmodal-usecolumn-1)

특정 컬럼을 모달 조회 링크로 지정할 수 있습니다.

### [viewModal.params.valueFromRow](/reference#viewmodal-params-valuefromrow-1)

조회한 row 데이터를 모달 안에서 사용할 수 있습니다.

## [blocks.modals](/reference#modals)

## blocks.selectOptions

selectOptions는 테이블의 row를 선택할 때 쓰입니다. [actions](/reference#actions)와 함께 사용할 때 유용합니다. 

### selectOnCheckboxOnly: true

테이블의 row를 선택할 때, 체크박스 영역을 눌러야만 선택할 수 있게 설정하게 됩니다. 

```yaml
blocks:
- type: query
  selectOptions: 
    enabled: true
    selectOnCheckboxOnly: true
```

## blocks.refs

특정 컬럼의 값을 링크로 만들고 클릭하여 새창을 열 수 있습니다. 

조회 결과 row의 다른 컬럼 값을 가져와서 변수에 넣을 수 있어요.

```yaml
sql: SELECT id, name, code FROM coupons LIMIT 10
columns:
refs:
  - column: name
    href: https://search.naver.com/search.naver?query={{code}}
```

## [blocks.actions](/reference#actions)

선택한 1개 또는 여러 항목으로 다음 화면을 진행합니다.

## blocks.onRowClick

특정 행을 클릭하여 모달을 열거나 액션을 실행할 수 있습니다.

**<주의>** 

- 행row 클릭시 1개의 openModal이나 openAction만 실행할 수 있어요. 
- actions로 생기는 버튼은 헷갈리지 않게 hidden으로 숨겨주세요.

**viewModal 모달 열기**

```yaml
onRowClick:
  openModal: true
viewModal:
  blocks:
    - type: query
```

**modals 모달 열기**

```yaml
onRowClick:
  openModal: modal-path
modals:
  - path: modal-path
```

**actions 실행**

```yaml
onRowClick:
  openAction: action1
actions:
  - name: action1
    hidden: true
```

**actions로 URL 열기**

```yaml
onRowClick:
  openAction: action2
actions:
  - name: action2
    openUrl: https://www.selectfromuser.com
    hidden: true
```

# `columns: {}`

columnOptions와 동일한 기능이고 양식이 다릅니다. 

```yaml
- type: query
  ...
  columns:
    id:
    name:
      label: 이름
    rank:
      label: 랭킹
      type: number
    created_at:
```

## columns.format

개별 컬럼의 데이터 포맷(format)을 설정할 수 있습니다. 

```yaml
- type: query
  ...
  columns:
    id:
    name:
    created_at:
      format: date
    agree:
      format: checkbox
      trueValue: 1
      falseValue: 0
```

### format: url

특정 컬럼의 값을 활성화된 URL 링크(link)로 표시할 수 있습니다.

```yaml
- path: manage-animal
    blocks:
    - type: query
      resource: acme
      sqlType: select
      sql: >
        SELECT id, name, image_url
        FROM animals limit 10
      columns:
        image_url:
          format: url
```

### format: image

필드 안의 값을 바탕으로 이미지(image)로 표시할 수 있습니다.

- `thumbnail: true`: 이미지를 썸네일 형태로 설정해줍니다.
- `flex: true`: 이미지가 여러개일 때 가로로 정렬합니다.
- `thumbnailWidth`: 썸네일의 가로 크기를 설정합니다. (기본값은 column 100%)
- `thumbnailHeight`: 썸네일의 세로 크기를 설정합니다.

```yaml
- path: manage-animal
    blocks:
    - type: query
      resource: acme
      sqlType: select
      sql: >
        SELECT id, name, image_url, image_url->'$.data[*].url' AS thumbnail, full_address, created_at, registered_at 
        FROM animals 
        LIMIT 10
      columns:
        image_url:
          format: url
        thumbnail:
          format: image
          width: 400px
          height: 120px
          thumbnail: true
          thumbnailWidth: 100px
          flex: true          
          style: > 
            border-radius: 10px
```

이미지를 세로 정렬하고 스크롤하고 싶을 때는 tdStyle, height, overflow를 이용해주세요.

```yaml
columns:
  thumbnail:
    format: image
    thumbnail: true
    thumbnailWidth: 100px
    tdStyle:
      height: 200px
      overflow: scroll
```

### format: json, json-inline

json 값을 1줄 또는 여러줄로 표기할 수 있습니다.

```yaml
columns:
  col1:
    format: json # 여러줄로 표기
  col2:
    format: json-inline # 1줄로 표기
```

### format: table

columns 안에서 사용 가능하며, JSON 데이터를 필드 안에 테이블 형태로 변환하여 보여줍니다.

```yaml
sql: >
  SELECT id, json->'$.data' AS json_to_table FROM users LIMIT 100
columns:
  json_to_table:
    format: table
```

**Object**
피봇 테이블 형태로 보여집니다.
```json
{
  "data": {
    "id": 1234,
    "amount": 99000
  }
}
```

**Array**
일반적인 표 형태로 보여집니다. 
```json
{
  "data": [
    {
      "id": 1234,
      "amount": 99000,
      "status": "DONE"
    },
    {
      "id": 2234,
      "amount": 179000,
      "status": "DONE"
    }
  ]
}
```

### format: viewer

에디터로 입력한 데이터를 viewer 기능으로 보여줍니다. display: col-1, 2, post와 함께 적용할 수도 있어요.

```yaml
- type: query
  resource: mysql.qa
  sqlType: select
  sql: >
    SELECT id, wine_id, amount, memo FROM wine_stock LIMIT 5
  columns:
    memo:
      format: viewer
      width: 50vw
```

## columns.valueAs

각 컬럼의 값들을 다른 텍스트로 표시할 수 있습니다. 데이터를 다른 이름으로 바꿔서 표기할 수 있어요.

```yaml
# columns 용법
columns:
  customer_link: # column name
    format: url
    valueAs: 링크
    
# columnOptions 용법
columnOptions:
- field: customer_link
  format: url
  valueAs: 링크
```

### multiple valueAs

valueAs 아래에 `값: 라벨` 형태로 여러개를 설정할 수 있습니다. 실제 값이 바뀌는 것이 아닌, 표기가 바뀝니다. 표기된 데이터 필드에 마우스를 올리고 2~3초 기다리면 본래 값이 보여집니다. 

![](https://imagedelivery.net/MHVC-FGTDyxApYeHyF29Tw/e792fc44-f4e5-46b1-8681-1575700e9600/docs "스크린샷 2023-03-09 오후 3.54.28.png")

```yaml
- type: query
  resource: testdb 
  sqlType: select 
  sql: >
    SELECT *
    FROM property 
  columns:
    type:
      valueAs:
        HOTEL: 호텔 
        PENSION: 펜션
        RESORT: 리조
```

### format: image, url + valueAs

valueAs에 URL과 파라미터를 통해 데이터 기반으로 이미지, URL 결과를 보여줄 수 있습니다. 

```yaml
- path: manage-animal
    blocks:
    - type: query
      resource: acme
      sqlType: select
      sql: >
        SELECT id, name, postfix
        FROM animals 
        LIMIT 10
      columns:
        postfix:
          format: image
          valueAs: https://placekitten.com/{{postfix}}?id={{id}}
```

## columns.template

template 키와 HTML로 데이터 값을 더 복잡한 구성으로 표기할 수 있어요.

```yaml
- type: query
  resource: pgsql
  sqlType: select
  sql: >
    SELECT 
      'media/cc0-audio/t-rex-roar.mp3' as url,
      'media/cc0-videos/flower.webm' as video_url
  # display: form
  columns:
    url:
      template: |
        <audio controls src="https://interactive-examples.mdn.mozilla.net/{{url}}"></audio>
    video_url:
      template: |-
        <video controls width="250">
          <source src="https://interactive-examples.mdn.mozilla.net/{{video_url}}" type="video/webm" />
        </video>
```


## columns.formatFn

formatFn을 통해 JavaScript 코드를 이용할 수 있어요. (column 단위로 적용)

- `return`이 없어도 inline으로 인식합니다.
- `lodash` 함수를 사용할 수 있습니다. 
- formatFn과 valueAs를 함께 쓰면 formatFn이 먼저 적용되어요.

![](https://imagedelivery.net/MHVC-FGTDyxApYeHyF29Tw/78df28ae-3c76-4f63-7d62-a021dbcaff00/docs "스크린샷 2023-03-09 오후 4.11.27.png")

```yaml
- type: query
  resource: testdb 
  sqlType: select 
  sql: >
    SELECT *
    FROM property 
  columns:
    type:
      formatFn: |
        '$' + value

    type2:
      formatFn: |
        _.capitalize(value || '')

    type3:
      formatFn: |
        if (value == 'HOTEL') { return '호텔'}
        if (value == 'PENSION') { return '펜션'}
        if (value == 'RESORT') { return '리조트'}

    type4:
      formatFn: |
        return {
          HOTEL: '호텔',
          PENSION: '펜션',
          RESORT: '리조트'
        }[value] || value
```

### formatFn: datetime, datetime-local, datetimeA, datetimeA-local

datetime을 통해 날짜/시간 데이터를 원본 그대로 표기하거나, datetime-local로 로컬 타임존에 맞춰서 표기할 수 있어요.

datetimeA로 AM, PM으로 표기도 가능합니다. 

```yaml
columns:
  created_at:
    formatFn: datetime
    # formatFn: datetime-local
    # formatFn: datetimeA
    # formatFn: datetimeA-local
```

### formatFn: number, number0, numberPart

숫자에 천단위로 콤마(comma) 표시를 할 수 있습니다. 금액 정보 등을 표기할때 유용해요. 

- `number` : 콤마 표시 (빈값이면 빈칸)
- `number0` : 콤마 표시 (빈값이면 0)
- `numberPart` : 콤마 표시 (앞뒤 문자열은 유지. 예를 들면 KRW 1500 -> KRW 1,500)

```yaml
columns:
  paid_amount:
    formatFn: number
    # formatFn: number0
    # formatFn: numberPart  
```

### formatFn: number + prefix, postfix

formatFn number류 뒤에 prefix(접두어)와 postfix(접미어) 내용을 순서대로 붙일 수 있어요.

```yaml
columns:
  won_price:
    type: number
    formatFn: 
      - number0
      - "12개월 " # prefix
      - " 만" # postfix
```

### formatFn: splitComma

필드 안의 데이터가 `comma (,)`로 구분된 경우 보기 좋게 뱃지로 표기해줍니다. 태그나 카테고리 정보를 보여줄 때 유용해요. 

```yaml
columns:
  tags:
    label: 태그
    formatFn: splitComma
    sortable: false
```

### formatFn: maskCenter4

필드 데이터의 중간 4자리를 가립니다.

```yaml
phone:
  label: 연락처
  formatFn: maskCenter4
  sortable: false
```

### formatFn: maskEnd4

필드 데이터의 뒤 4자리를 가립니다.

```yaml
phone:
  label: 연락처
  formatFn: maskEnd4
  sortable: false
```

## columns.hidden

특정 컬럼을 숨길 수 있습니다.

```yaml
columns:
  hidden_info:
    hidden: true
```

## columns.sortable

테이블 특정 컬럼의 정렬 기능을 끌 수 있습니다. 

```yaml
columns:
  phone:
    label: 연락처
    sortable: false
```

## columns.subtitle

특정 컬럼을 숨기고, 다른 컬럼 아래에 작게 표기할 수 있습니다. 

```yaml
columns: 
  id: 
  name:
    label: 상품 이름
    sortable: false
    subtitle: store_path
  store_path:
    hidden: true
```

## columns.color

특정 컬럼에서 데이터 값에 따라 색깔을 부여할 수 있습니다. 결제상태나 이슈 등을 구분하기 쉽게 설정해보세요. 

> 📘 안내 사항
> 
> - `color:` 아래에 `필드값`: `색상` 방식으로 추가할 수 있습니다. 
> - 필드값은 대소문자를 구분합니다. 
> - 지원하는 색상들은 아래와 같습니다.
>   > `green`, `yellow`, `blue`, `red`, `gray`, `pink`, `orange`, `purple`, `brown`, `light-gray`

![](https://imagedelivery.net/MHVC-FGTDyxApYeHyF29Tw/674fc453-7036-4390-b801-7e4c763e4e00/docs "스크린샷 2023-02-20 오후 7.53.21.png")

```yaml
columns:
  status:
    label: 상태 
    color:
      paid: green 
      canceled: red
```

## columns.copy

특정 컬럼에 복사 아이콘을 추가합니다. 아이콘 클릭 한번으로 데이터를 클립보드에 복사할 수 있어요. 다른곳에 붙여넣기(ctrl+v) 해보세요.

```yaml
columns:
  email:
    label: 이메일
    copy: true
```

## columns.openModal

특정 컬럼의 값들을 링크로 만들고, 링크를 클릭하여 모달을 열 수 있습니다.

```yaml
columns:
  id:
  name:
    openModal: orders-:id
modals:
  - path: orders-:id
    blocks:
```

## columns.openUrl

특정 컬럼의 값을 링크로 만들고, 링크를 클릭하여 새창으로 특정 URL 주소를 열 수 있습니다.

클릭한 필드 row의 다른 값을 가져와서 변수에 사용 가능합니다.

```yaml
columns:
  id:
    openUrl: https://search.naver.com/search.naver?query={{name}}
    # target: _self
  name:
```

## columns.buttons

컬럼 안에 버튼을 추가할 수 있습니다. 

```yaml
columns:
  조회:
    buttons:
    - label: 주문 상세
    - label: 고객 상세
```

### buttons.openModal

버튼을 눌렀을 때 모달을 띄워주는 방법입니다. 

- `buttons.openModal`과 `modals.path`의 값으로 연결됩니다.

```yaml
columns:
  조회:
    buttons:
    - label: 상세
      openModal: user-:id
      type: primary

modals:
  - path: user-:id 
    blocks:
    - type: query 
      resource: mysql 
      sqlType: select 
      sql: >
        SELECT * FROM users WHERE id = :id
      params:
      - key: id 
        valueFromRow: id 
```

### buttons.openAction

버튼buttons을 눌렀을 때 액션actions을 실행합니다.

- `buttons.openAction`과 `actions.name`으로 연결됩니다. 

```yaml
columns:
  작업:
    append: true
    buttons:
      - type: danger-light
        label: 삭제
        openAction: delete

actions:
  - name: delete
    label: 삭제
    hidden: true
    type: query 
    resource: mysql 
    sql: DELETE FROM category WHERE id = :id
    single: true 
    confirmText: |
      정말로 삭제하시겠습니까?
    params:
      - key: id
        valueFromRow: id 
```

### buttons.openUrl

버튼을 눌렀을 때 특정 URL로 방문합니다. 

- 어드민 내부 페이지로 이동할 때는 `https://app.selectfromuser.com/admin/0000` 어드민 기본 URL 뒤쪽을 작성합니다.
- 외부 사이트로 이동할 때는 URL을 그대로 입력해주세요.
- 소속 테이블 데이터를 가져와서 URL에 파라미터로 쓸 수 있습니다. `{{field_name}}`

```yaml
sql: SELECT user_id, product_name FROM orders LIMIT 10
columns:
  이동:
    buttons:
      - label: 주문
        openUrl: orders?user_id={{user_id}}
        # openUrl: https://search.naver.com/search.naver?where=nexearch&sm=top_hty&fbm=0&ie=utf8&query={{product_name}}
        # target: _self # 기본은 새창
```

### buttons.openPage

버튼을 눌렀을 때 (셀렉트 내부) 특정 페이지로 이동합니다. 

**openUrl과 차이점**

- 셀렉트 앱(어드민) 안에서의 이동이기 때문에 전체 새로고침이 되지 않습니다. 
- URL에 값을 넣어줍니다.

```yaml
sql: SELECT id, name, created_at FROM companies LIMIT 100
columns:
  name: 
    buttons:
    - label: 회사 상세
      openPage: company/{{id}}
```

## columns.updateOptions

한번에 여러 필드를 수정하지 않고, 낱개로 처리할 수 있습니다.

```yaml
columns:
  status:
    updateOptions:
      type: query
      resource: mysql.qa
      sql: UPDATE test_list SET status = :value WHERE id = :id
      confirm: true
```

### confirm: true

쿼리 또는 API 블록을 실행할 때, 한번 더 확인할 수 있게 합니다.

### dropdown 적용

```yaml
columns:
  status:
    dropdown:
    - pending
    - confirm
    - closed
    updateOptions:
      type: query
      resource: mysql.qa
      sql: UPDATE test_list SET name = :value WHERE id = :id
      confirm: true
```

### format.checkbox 적용

```yaml
columns:
  is_used:
    format: checkbox
    trueValue: 1
    falseValue: 0
    updateOptions:
      type: query 
      resource: mysql.qa 
      sql: UPDATE images SET is_used = :value WHERE id = :id
```

### showActionGroup

columns.updateOptions안에 action 버튼을 보여주고 실행할 수 있습니다.

- `columns.showActionGroup`과 `actions.group`의 값으로 연결됩니다. 
- `actions.visible`로 필드 값과 조건에 따라 action 버튼을 보여주거나 가릴 수 있습니다. 

```yaml
sql: |
  SELECT id, booking_status, canceled_at
  FROM classBooking 
  LIMIT 100

columns:
  booking_status:
    updateOptions:
      showActionGroup: bookingStatus

actions: 
  - label: 예약복구
    single: true
    placement: bottom right  
    button:
      type: default
    confirm: 예약을 정말 복구하시겠습니까?
    type: query
    resource: mysql 
    sql: >
      UPDATE classBooking 
      SET booking_status = 'restored', canceled_at = NULL 
      WHERE id = :id
    params:
      - key: id
        valueFromRow: id                
    reloadAfterSubmit: true 
    group: bookingStatus
    visible: "{{ row.booking_status == 'canceled' }}"      
```

## columns.updateOptions + display: form

Update 쿼리 블록을 조회/수정 모드를 껐다 켜는 방식으로 사용할 수 있습니다. 적용시 수정버튼이 추가됩니다.

```yaml
blocks:
  - type: query
    resource: mysql.qa
    sqlType: select
    sql: > 
      SELECT * FROM app_notice
      WHERE id = :id
    params:
      - key: id
        valueFromRow: id
    columns:
      title:
        editable: true
      author:
        editable: true
      body:
        editable: true
        format: textarea
      date:
        editable: true
      published_at:
        editable: true
        format: date
    display: form
    updateOptions:
      type: query
      resource: mysql.qa
      sqlType: update
      sql: > 
        UPDATE app_notice
        SET title = :title
          , author = :author
          , body = :body
          , `date` = :date
          , published_at = :published_at
        WHERE id = :id
```

## columns.prepend, append

특정 컬럼을 가장 앞(prepend)에 두거나, 가장 뒤로(append) 둘 수 있습니다.

```yaml
columns:
  field_first:
    prepend: true
  field_last:
    append: true
```

## columns.sticky

`prepend: true` 와 같이 사용되며, 특정 컬럼을 고정하여 좌우 스크롤하여도 계속 보이게 만듭니다. 

```yaml
columns:
  column1:
    prepend: true
    sticky: true
  column2:
```

## columns.value, openModal

특정 컬럼에 고정된 값을 입력하고, 모달을 오픈하는 텍스트 링크로 만들 수 있습니다. 

```yaml
columns:
  field:
    value: 조회
    openModal: column-openmodal

modals:
- path: column-openmodal
  blocks: ...
```

## columns.style

특정 컬럼에 CSS Style을 입힐 수 있어요. 원하는 스타일을 적용해보세요.

```yaml
columns:
  user_name:
    style: |
      text-align: center;
```
#### [`blocks`](/reference#blocks-params)

# `params: []`

> 📘 params의 key 값은 영어 알파벳을 지원합니다.
> 
> key 의 값에 한글 등 알파벳이 아닌 문자를 입력하면 정상적으로 작동하지 않게 됩니다. 꼭 key: id 와 같이 영어 알파벳을 이용해주세요.

## params.value 계열

parameter에 특정 값을 미리 입력하거나, 다른 곳에서 가져와서 입력하고 싶을 때 아래와 같은 키를 사용하세요.

| key(키)                | 설명                               |
| :-------------------- | :------------------------------- |
| valueFromRow          | viewModal 안에서 사용                 |
| valueFromSelectedRows | selectOptions가 있는 actions 안에서 사용 |
| defaultValue          | 기본값을 설정하고 싶을 때 이용                |
| defaultValueFromRow   | viewModal 안에서 사용                 |
| valueFromEnv          | API를 호출할 때 안전한 환경변수에서 이용         |
| valueFromUserProperty | 사용자 속성에서 값을 가져와서 이용              |

## params.defaultValueFromQuery

쿼리로 데이터 가져와서 기본값으로 넣는 방법입니다. 페이지 조회 시 1회 실행되며, sql 쿼리 결과의 첫번째 값 또는 AS value 값을 가져옵니다.

```yaml
params:
- key: created_at
  defaultValueFromQuery:
    type: query
    resource: acme
    sql: select date_format(now(), '%Y-%m-%d')
```

## params.valueFromUserProperty

설정 > 계정의 사용자 이름(name)과 이메일(email), 아이디(id) 시스템 데이터를 변수로 이용할 수 있습니다.

```yaml
params:
- key: user_name
  valueFromUserProperty: "{{name}}"
- key: email
  valueFromUserProperty: "{{email}}"
- key: user_id
  valueFromUserProperty: "{{id}}"
```

## params.valueFromSheet

CSV 데이터를 업로드하고 params로 매칭한 다음, DB에 데이터를 저장할 수 있습니다.

- `sheetOptions.append: false`: 처음에 추가한 파일만 적용됩니다.
- `multiple: true`: 여러개의 파일을 한번에 선택하고 올릴 수 있습니다.
- `accept`: 선택 가능한 파일 유형을 제한할 수 있어요.

```yaml
actions:
  - type: query
    resource: mysql.qa
    sqlType: insert
    sql: >
      INSERT INTO products
      SET name = :name
        , code = :code
        , unit = :unit
        , created_at = NOW()
    forEach: true
    single: true
    modal: true
    params:
    - key: sheet
      format: sheet
      # sheetOptions:
      #   append: false
      # multiple: true
      # accept: .csv,.xls,.xlsx
    - key: name
      valueFromSheet: 상품명    
    - key: code
      valueFromSheet: 상품약어
    - key: unit
      valueFromSheet: 수량
```

### sheetOptions.convertDate

엑셀에서는 날짜 데이터가 자체 시리얼날짜포맷으로 저장됩니다. 해당 시리얼넘버를 YYYY-MM-DD 형태로 저장하고 싶을때 별도의 코딩없이 convertDate 키를 활용하여 변환할 항목을 지정해줍니다.

엑셀 파일을 통해 INSERT 또는 UPDATE 쿼리를 벌크로 실행할 때 유용해요.

```yaml
params:
  - key: sheet
    format: sheet
    label: 엑셀 가져오기
    accept: .xlsx
    sheetOptions:
      append: false
      convertDate: 
        - 시작일
        - 종료일
  - key: id
    valueFromSheet: id
  - key: start_date
    valueFromSheet: 시작일
  - key: end_date
    valueFromSheet: 종료일
```


## params.valueFromSearch

웹 주소(URL)의 쿼리 스트링(Query string)을 파라미터로 사용할 수 있어요. updateParams와 함께 사용할 수 있습니다. 

- e.g. xxx.com?property_id=123 → params.valueFromSearch=property_id

```yaml
sql: >
  SELECT id, property_id FROM bookings LIMIT 100
columns:
  property_id:
    updateParams:
      id: "{{property_id}}" # id 라는 parameter에 property_id 값을 기입
viewModal:
  blocks:
    - type: query
      resource: mysql.qa
      sqlType: select
      sql: >
        SELECT *
        FROM properties
        WHERE id = :id
      display: form
      params:
        - key: id
          valueFromSearch: id
```

## params.required

특정 파라미터를 필수값으로 설정하는 방법

```yaml
params:
- key: email
  required: true
```

## params.format

input 안에 값을 입력할 때 format을 지정합니다. 

```yaml
format: number
format: date 
format: time
format: datetime
format: text 
format: editor
format: color
```

### format.date (datetime, year, month, week)

날짜 데이터의 종류별로 입력 포맷을 선택할 수 있습니다. 

```yaml
params:
  - key: from
    label: 시작일
    format: date
    # format: datetime
    # format: year
    # format: month
    # format: week  
    placeholder: 주문생성일 기준
```

### `shortcuts`

- format.date 과 함께 사용하는 손쉬운 입력 방법(shortcuts)을 설정해보세요. 

```yaml
params:
- key: from
  label: 시작일
  format: date
  placeholder: 주문생성일 기준
  shortcuts:
  - label: 최초시점
    date: 2024-01-01
  - label: 어제
    offset: -1
    period: day
  - label: 오늘
    today: true
  - label: 지난주
    offset: -1
    period: week
  - label: 지난달
    offset: -1
    period: month
  - label: 월초
    startOf: month
  - label: 월말
    endOf: month
```

### `showButtons: true`

- shortcuts의 label들을 바깥에 버튼으로 빼서 보여줍니다.

### `range: true`

- 기간을 조회하기 쉬운 UI를 띄워주고 `from`과 `to` 값을 입력 받습니다.  
- key의 값(e.g. dateFromTo)에 숫자를 붙여 array로 보내줍니다. 
  - 예시: `dateFromTo1: "2023-03-10", dateFromTo2: "2023-03-20"`
  - SQL 쿼리에서 `:dateFrom1`, `:dateFrom2` 와 같이 이용해보세요. 
- shortcuts 사용 시, `from`과 `to`로 UI에 값을 입력합니다.

```yaml
sql: >
  SELECT *
  FROM orders
  WHERE created_at >= :dateFromTo1 
  AND created_at < :dateFromTo2
params:
- key: dateFromTo
  label: 조회기간
  format: date
  showButtons: true
  range: true
  shortcuts:
  - label: 최근 일주일
    from:
      offset: -7
      period: day
    to:
      offset: 0
      period: day
  - label: 이번달
    from:
      offset: 0
      startOf: month
    to:
      offset: 0
      endOf: month
```

### `relative: true`

지난주, 다음주 등을 여러번 눌러 반복적으로 적용할 수 있습니다. 

```yaml
shortcuts:
- label: 지난주
  relative: true
  from:
    offset: -7
    period: day
  to:
    offset: -7
    period: day
- label: 다음주
  relative: true
  from:
    offset: 7
    startOf: day
  to:
    offset: 7
    endOf: day
- label: 초기화
  reset: true
```

### `reset: true`, `clear: true`

기본값으로 초기화하고 싶을 때는 `reset`, 기본값도 지우고 싶을 때는 `clear`를 사용해요.

```yaml
shortcuts:
  - label: 초기화
    reset: true
    # clear: true
```

### format.time

`format: time`을 추가하여 시간값을 선택 입력할 수 있습니다. 

`timeOptions`

- `start`: 시간 선택 범위의 시작점
- `end`: 시간 선택 범위의 끝점
- `step`: 선택 가능한 시간들의 단위 (e.g. 00:10 → 10분 단위)
- `format`: 시간 선택 시, 표시 방법
  - HH:mm는 24시간제 표기이고 HH:mm A는 AM/PM 표기입니다.

```yaml
params:
  - key: checkin_time
    format: time
    timeOptions:
      start: 08:00
      step: 00:10
      end: 22:00
      format: HH:mm
      # format: HH:mm A 
```

### format.color

색상(color)을 선택하고 Hex Code로 입력할 수 있습니다. 

```yaml
pages:
- path: color
  blocks:
  - type: query 
    name: 색상 추가
    resource: mysql.qa 
    sqlType: insert 
    sql: INSERT INTO color (hex) VALUES (:hex)
    params: 
    - key: hex 
      format: color 
    reloadAfterSubmit: true
```

### format: s3

s3를 사용하시는 경우 `format: s3`로 쉽고 안정적으로 파일을 업로드해보세요.

- 파일 여러개를 그때 그때 업로드할 수 있고, 삭제 가능합니다.
- 해당 key에 Array(List)로 들어갑니다.
- 해당 key를 하나씩 forEach로 처리 가능 (String으로 하나씩 들어갑니다.)
- 이미지는 1일 내 자동으로 삭제됩니다. (경로는 무작위 생성, 이름은 원본 그대로 유지)

```yaml
menus:
- path: file-cloud-s3
  name: file-cloud-s3
pages:
- path: file-cloud-s3
  blocks:
  - type: http
    axios:
      method: POST
      url: https://api.selectfromuser.com/sample-api/upload-each-s3
      params: 
        'imageCode': "{{imageCode}}"
        'classId': "ATES"
      data:
        file_urls: "{{ file_urls }}"
    params:
      - key: imageCode
        radio:
          MAIN: 메인 사진
          SUB: 서브 사진도

      - key: file_urls
        format: s3
        multiple: true
        forEach: true
```

### format: storage

별도의 저장소 설정(S3, API)없이도 파일 업로드를 지원합니다. 
- format: storage를 적용할 params.key는 중복되지 않는 이름으로 자유롭게 설정해주세요.
- `path`: 파일 저장위치를 지정합니다.

현재 지원 스펙
- 이미지 업로드 지원 (추후 다양한 파일 지원예정)
- 어드민 사용자 대상 프라이빗 URL만 지원
- (외부공유는 차단) 추후 public 용도(공유용, 공지, 게시글)로 활용할수있게 오픈예정

세부옵션
- `multiple`: 여러개 업로드
- `max`: 최대 개수 제한
- `accept`: 파일 타입 제한

```yaml
- type: query
  resource: mysql
  sqlType: update
  sql: UPDATE wines SET name = :name WHERE id = :id
  params:
    - key: id
      valueFromRow: true
    - key: name
      label: 상품명
    - key: data
      label: 상품 이미지
      format: storage
      path: /wine/{{id}}/images
      multiple: true
      # max: 2    
      accept: image/*
      # accept: .jpg, .png
```

### format: address
주소와 우편번호를 입력해야할 때, 별도의 설치나 개발없이 
셀렉트에 내장된 Daum Postcode Service로 주소를 검색하고 우편번호까지 한번에 입력할 수 있어요.

- `format: address` 파라미터 영역에 주소 검색 버튼이 생성됩니다.
- 셀렉트에서 **roadAddress**(도로명주소)와 **zonecode**(우편번호)를 내려줍니다.
- 셀렉트에서 **x축 좌표**(경도, longitude), **y축 좌표**(위도, latitude)값을 내려줍니다.

```yaml
params:
  - key: address
    label: 주소
    format: address
    updateParams:
      address: roadAddress # address 파라미터에 검색 결과인 roadAddress 값을 넣습니다.
      postcode: zonecode # postcode 파라미터에 zonecode 값을 넣습니다.
      longitude: x # longitude 파라미터에 x축 값을 넣습니다.
      latitude: y # latitude 파라미터에 y축 값을 넣습니다.
  - key: postcode
    label: 우편번호
  - key: longitude
    label: 경도  
  - key: latitude
    label: 위도  
```

### format: tiptap

상용 에디터 tiptap 옵션을 추가하였습니다. 
- 외부이미지, 상품상세를 디비에 바로 넣을 수 있어요.

```yaml
- type: query
  resource: mysql.qa
  sqlType: insert
  sql: >
    INSERT wine_notes SET created_at = NOW(), memo = :memo WHERE wine_id = :wine_id
  params:
    - key: wine_id      
    - key: memo
      format: tiptap
      width: 800px
```

## params.formatString

입력 포맷을 특정 방식으로 설정할 수 있습니다. 

```yaml
params:
- key: amount_decimal
  formatString: 0.00 %
  format: text
  required: true
```

## params.radio

라디오버튼으로 값을 선택하여 입력합니다.

```yaml
params:
- key: status
  radio:
  - draft
  - published
```

값 value와 표시 label을 분리해서 이용할 수도 있습니다. 

```yaml
params:
- key: status
  defaultValue: draft
  radio:
  - value: draft
    label: 초안
  - value: published
    label: 배포 완료
```

```yaml
params:
- key: status
  defaultValue: draft
  radio:
  - draft: 초안
  - published: 배포 완료
```

### radioButtonGroup

라디오 버튼을 시각적으로 더 큰 버튼 묶음으로 만들어줍니다. 

```yaml
radioButtonGroup: true
radio:
- all
- lead
- customer
```

## params.checkbox

체크박스로 값을 선택하여 입력합니다.

```yaml
params:
- key: is_guest
  defaultValue: Y
  checkbox:
    true: Y
    false: N
```

```yaml
params:
- key: is_guest
  checkbox:
    true: ACTIVE
    false: ''
```

## params.dropdown

드롭다운으로 값을 선택할 수 있습니다.

```yaml
params:
- key: status
  dropdown:
  - draft
  - published
```

드롭다운 선택 시, 실제 반영되는 값과 UI에 보여지는 내용을 다르게 할 수도 있습니다. 

```yaml
params:
- key: status
  dropdown:
  - value: draft
    label: 초안
  - value: published
    label: 배포완료
```

```yaml
params:
- key: status
  dropdown:
  - draft: 초안
  - published: 배포완료
```

### dropdownMultiple

여러개 선택 방식

```yaml
params:
- key: name
- key: status
  dropdown:
  - pinned: 고정
  - event: 이벤트
  - ad: 광고
  dropdownMultiple: true
  dropdownSize: 3 # 보여지는 선택 내역 개수
```

### dropdown selectOptions

Dropdown 기능의 자동완성, 복수 선택, 키보드 사용을 지원하는 등 개선된 경험을 제공합니다. (`datalist`도 같은 방식으로 지원합니다.)

```yaml
params:
  - key: item
    label: 신규 카테고리 추가
    selectOptions:
      enabled: true
    dropdown:
      - 호텔
      - 리조트
      - 캠핑
      - 독채
      - 수영장
```

## params.selectOptions

- `multiple`: 여러개 선택
- `taggable`: 태그 형태로 관리
- `pushTags`: 입력한 값을 옵션에 계속 남겨둘지 여부

```yaml
selectOptions:
  enabled: true
multiple: true
taggable: true
pushTags: true
```

## params.datalist

값 선택 시, 보여지는 내용과 실제 저장되는 데이터를 구분해서 처리할 수 있습니다. 

```yaml
params:
- key: code
  datalist:
  - value: A000
    label: 분류1
  - value: A002
    label: 분류2
```

`value` : 데이터에 저장되는 값  
`label` : 선택 시 보여지는 내용

## params.datalist.datalistFromQuery

```yaml
params:
- key: code
  datalist: true
  datalistFromQuery:
    type: query
    resource: mysql.qa
    sqlType: select
    sql: >
      select id as 'value', code_name as 'label' from codes
```

## params.datalist.datalistPreview

datalist에서 선택한 값의 label을 미리보기로 표기해줍니다. 

```yaml
params:
- key: code
  datalist: true
  datalistPreview: true 
  datalistFromQuery: ...
```

## params.datalist.datalistLength

datalist에서 선택할 수 있는 값의 최대 개수를 지정합니다.

```yaml
params:
- key: code
  datalist: true
  datalistLength: 3
  datalistPreview: true 
  datalistFromQuery: ...
```

## params.options

여러 단계로 값을 입력하는등 복잡한 데이터 처리가 필요할 때

- requestSubmitFn과 함께 사용해보세요.
- prefix, postfix: 입력한 값에 붙는 접두어, 접미어
- display 추가 옵션: document, table
- display가 없으면 기본값(plain) 적용

**예제**
`id: form`으로 입력받아서 JS코드로 처리하고 `id: query_add_wine`의 쿼리를 실행

```yaml
- type: query
  resource: mysql.qa
  sqlType: insert
  sql: >
    INSERT INTO wine_stock
    SET name = :name,
        vintage = :vintage,
        price = :price
  params:
    - key: name
    - key: vintage
    - key: price
  id: query_add_wine
  hidden: true
  toast: 추가했습니다.

- type: query
  resource: mysql.qa
  sqlType: insert
  sql: >
    SELECT 1
  requestSubmitFn: |
    for (const i in form.params.vintage.value) {
      const vintage_value = form.params.vintage.value[i]

      query_add_wine.params.name.value = form.params.name.value
      query_add_wine.params.vintage.value = vintage_value

      query_add_wine.params.price.value = form.params.vintage.options.price.value[i] || null

      console.log(form.params.vintage)

      await query_add_wine.trigger()
    }
  id: form
  params:
    - key: vintage
      datalist: []
      selectOptions:
        enabled: true
      multiple: true
      taggable: true
      group: vintage
      # display: document
      options: 
        price:
          label: 가격
          placeholder: 00,000
          prefix: 정가
          postfix: 원
          class: text-right
```

## params.disabled

입력 필드를 비활성화 시킵니다. 마우스 커서도 올릴 수 없게 됩니다. 

```yaml
params:
- key: status
  disabled: true
  defaultValue: draft
```

## params.readonly

일반 텍스트 필드를 '읽기 전용' 상태로 설정할 수 있습니다. 마우스 커서로 내용을 복사할 수 있습니다. dropdown 이나 radio 등 선택이나 옵션 계열의 필드는 적용되지 않습니다. 

```yaml
params:
- key: code_number 
  readonly: true
```

## params.hidden

입력 필드를 숨길 수 있습니다. 

```yaml
params:
- key: hidden_field
  hidden: true
```

## params.placeholder

입력 필드 안에 placeholder 를 입력해 필드에 대한 가이드를 줄 수 있습니다. 

```yaml
params:
- key: type1
  label: 업종
  placeholder: 키워드 입력
```

## params.raw

파라미터에 원본 SQL 값을 넣고 싶을 때는 raw를 사용해주세요. (e.g. `NULL`, `NOW()`)

```yaml
pages:
- path: select/users2
  blocks:
  - type: query
    resource: mysql.qa
    sqlType: select 
    sql: >
      SELECT *
      FROM test_list
      WHERE name IS :name
      LIMIT 100
    params:
    - key: name
      label: 이름
      raw:
        Y: NOT NULL
        N: NULL
      radio:
      - value: Y
        label: 있음
      - value: N
        label: 없음
      defaultValue: Y
```

## params.query

<code v-pre>{{query}}</code>와 params를 활용해서 sql 쿼리 WHERE절에 일부를 옵션으로 넣을 수 있습니다. 

```yaml
pages:
- path: properties
  blocks:
  - type: query
    resource: mysql.qa
    sqlType: select 
    sql: >
      SELECT * 
      FROM properties 
      WHERE name LIKE CONCAT('%', :name, '%') 
        AND {{query}}
      LIMIT 1000
    params:
    - key: name
      label: 숙소명
    - key: types
      label: 숙소타입
      radio: 
      - value: ''
        label: 전체 
      - value: HOTEL 
        label: 호텔 
      - value: NON HOTEL 
        label: 호텔 외 
      query:
        '': >
          1=1
        'HOTEL': >
          `type` = 'HOTEL'
        'NON HOTEL': >
          `type` IN ('GUESTHOUSE', 'BNB') OR `type` IS NULL
```

## params.orderBy

테이블 정렬을 서버에서 할 수 있어요. 여러개의 정렬 옵션을 추가할 수 있습니다. 

- SQL 예시: ORDER BY created_at ASC
- params에서 선택한 값에 따라 orderBy 키와 매칭합니다. 
- 매칭된 orderBy의 값을 <span v-pre>`{{ orderBy }}`</span>에 넣습니다. 

```yaml
- type: query
  resource: mysql
  name: 회원목록
  sqlType: select
  sql: >
    SELECT *
    FROM user_profiles
    {{ orderBy }}
    LIMIT 100
  autoload: false
  params:
    - key: order
      label: 정렬
      defaultValue: 최근가입순
      dropdown:
        - 최근가입순
        - 오래된가입순
      orderBy:
        '최근가입순': ORDER BY created_at DESC
        '오래된가입순': ORDER BY created_at ASC
```

<!-- ## [pages.params](/pages#pages-params) -->
## pages.params

페이지 단위로 파라미터(parameter)를 지정하여, 여러 블록의 데이터를 필터 조회할 수 있습니다. 

```yaml
pages:
- path: new-charts
  title: 마케팅 대시보드
  subtitle: 주요 마케팅 지표를 확인할 수 있습니다. 
  containerClass: container-sm w-50
  params:
    - key: category
    
  blocks:
  - type: query
  - type: query
```

## params.validateFn

입력한 값을 사전에 검증하는 기능입니다. `validateFn` 안에 Javascript를 사용할 수 있어요.

전체 params에서 params.key가 `amount`인 내역의 값을 찾고 `key: cancel_amount`의 값(param.value)을 비교하는 예제입니다.

```yaml
params:
  - key: amount
    valueFromRow: amount
  - key: cancel_amount
    label: 취소 금액
    validateFn: |
      const amount = params.find(e => e.key == 'amount')

      if (param.value > amount.value) {
        return '취소 불가능'
      } else {
        return ''
      }
```

## params.validateFromQuery

쿼리를 validateFn과 함께 사용할 수 있습니다.
- showValidateButton: 버튼 노출시 엔터 또는 클릭해야 검증 
- validateButtonLabel: 버튼 라벨
- validText: 서버단 체크했을때 메시지

```yaml
params:
  - key: business_number
    label: 사업자번호 
    required: true
    validateFromQuery:
      type: query
      resource: mysql.qa
      sql: >
        SELECT COUNT(id) AS count
        FROM properties
        WHERE business_number = :value
      validateFn: |
        if (+validateFromQuery.count > 0) {
          return '중복된 사업자번호 입니다.'
        }
        return true
    validateFn: |
      if (param.value.length != 10) {
        return '사업자번호(10자리)를 입력해주세요.'
      }
      if (!isFinite(+param.value)) {
        return '사업자 번호만 입력해주세요.'
      }
      return true      

    # showValidateButton: true
    # validateButtonLabel: 사업자조회    
    # validText: 새로운 사업자번호 사용가능      
```

## params.minlength, maxlength

입력값의 최소, 최대 글자수를 제한할 수 있습니다.

```yaml
params:
  - key: phone
    minlength: 1
    maxlength: 12
```

#### [`blocks.viewModal`](/reference#blocks-viewmodal)
# `viewModal: {}`

## viewModal

불러온 데이터를 클릭하여 모달을 열게됩니다.

1개의 모달을 지원합니다. 여러개가 필요한 경우 `modals`를 이용해주세요.

### viewModal.name

### viewModal.mode

`center`, `full`, `side`

### viewModal.displayParentRow <Badge type="warning" text="Deprecated" />

```yaml
viewModal:
  displayParentRow: true  
```

### viewModal.dismissible

모달이 띄워졌을 때 esc로 꺼지지 않게 하고 싶을 때 dismissble을 이용해주세요.

```yaml
viewModal:
  dismissible: false
```

### viewModal.header

모달 header에 있는 전후이동, 링크복사 등 셀렉트 기능을 숨길 수 있습니다.

```yaml
viewModal:
  header: false
```

### viewModal.[blocks](/reference#blocks)

여러개 블록을 추가 가능합니다.

### viewModal.[blocks.display](/reference#blocks-display)

기본적으로 데이터를 조회하면 테이블(표) 형태로 나타납니다. 이를 특정한 형태로 바꾸고 싶을 때 display를 사용합니다.


### viewModal.useColumn

특정 컬럼을 모달 조회 링크로 지정할 수 있습니다.

```yaml
viewModal:
  useColumn: id
  blocks:
```

### viewModal.params.valueFromRow

조회한 row 데이터를 모달 안에서 사용할 수 있습니다.

```yaml
sql: select id, name, email, created_at from user limit 10
viewModal:
  blocks:
  - type: query
    ...
    sql: select * from order where user_id = :user_id
    params:
    - key: user_id
      valueFromRow: id
```

### viewModal.usePage

```yaml
pages:
  - path: company
    blocks:
    - type: query
      resource: mysql.qa
      sql: SELECT * FROM properties LIMIT 8
      columns:
        id:
        name:
        type:
        address:
      viewModal: 
        usePage: company/detail/{{id}} # sql 쿼리 결과의 id를 가져와서 사용합니다.

  - path: company/detail/{{id}} # 받아온 id 값을 아래 sql 쿼리 파라미터에 사용합니다. 
    blocks:
    - type: query
      resource: mysql.qa
      sqlType: select
      sql: > 
        SELECT id, name
        FROM properties
        WHERE id = :id 
```

### viewModal.width, height

모달의 너비(width), 높이(height)를 설정할 수 있습니다. 숫자(px)와 퍼센트(%)를 지원합니다.

```yaml
viewModal:
  width: 1000px
  # width: 70%
  height: 800px
```

-------

## [`blocks.modals`](/reference#blocks-modals)

# `modals: []`

## modals

::: info 

여러개 모달을 지원하는 부분 외에는 `viewModal`와 동일합니다. 

:::

불러온 데이터를 클릭하거나 버튼을 통해 모달을 열게됩니다. 

- [columns.openModal](/reference#columns-openmodal)
- [buttons.openModal](/reference#buttons-openmodal)

**modals와 viewModal 비교**

::: code-group

```yaml [modals]
- type: query
  resource: mysql
  sqlType: select
  sql: SELECT id, name, email, created_at FROM users LIMIT 10
  columns:
    id:
      openModal: user
  modals:
    - path: user
      useColumn: id
      blocks:
        - type: query
```

```yaml [viewModal]
- type: query
  resource: mysql
  sqlType: select
  sql: SELECT id, name, email, created_at FROM users LIMIT 10
  columns:
  viewModal:
    useColumn: id
    blocks:
      - type: query
```

:::


### modals.path

모달의 고유 주소를 지정합니다. 해당 고유주소로 페이지를 띄웁니다. 

`view-:id` 경로에 따라 `id`를 파라미터로 가져옵니다.

`view-:id-:code` 경로에 따라 `id`, `code`를 파라미터로 가져옵니다.

### modals.useColumn

명시된 파라미터가 주소에 남고 모달안에서 쓸 수 있도록 가져옵니다. `path`에 파라미터를 넣거나 여기에 추가합니다.

```yaml
useColumn: id     # 1개 가져오기

useColumn:        # 2개 가져오기
  - id
  - code
```


### modals.usePage

```yaml
pages:
  - path: company
    blocks:
    - type: query
      resource: mysql.qa
      sql: SELECT * FROM properties LIMIT 8
      columns:
        id:
        name:
          openModal: name 
        type:
        address:
      modals: 
      - path: name
        usePage: company/detail/{{id}} # sql 쿼리 결과의 id를 가져와서 사용합니다.

  - path: company/detail/{{id}} # 받아온 id 값을 아래 sql 쿼리 파라미터에 사용합니다. 
    blocks:
    - type: query
      resource: mysql.qa
      sqlType: select
      sql: > 
        SELECT id, name
        FROM properties
        WHERE id = :id 
```

#### [`blocks`](/reference#blocks-actions)

# `actions: []`

[selectOptions](/reference#blocks-selectoptions)을 통해 선택된 테이블의 row가 필요합니다.

만약 row 선택 없이 단일 액션이 필요한 경우 `single`을 이용합니다.

## actions

버튼을 통해 특정 액션을 실행할 때 쓰입니다. 

```yaml
blocks:
- type: query
  selectOptions: 
    enabled: true
  actions:
  - label: 버튼
    type: query
```

## actions.type

### type: query

```yaml
actions:
- type: query
  label: 전시
  resource: acme
  sqlType: update
  sql: update product set status = 'published' where id = :id
  params:
  - key: id
```

### type: http

```yaml
actions:
- type: http
  label: 결제취소
  axios:
    method: POST
    url: https://testapi.com/v1/33iac2d/payment/cancel
    data:
      'payment_id': {{id}}
      'v': "{{API_VERSION}}" 
      'status': 'cancel'
  params:
  - key: id
  - key: API_VERSION
    valueFromEnv: true
```

## actions.label

액션 버튼이 어떤 역할을 하는지 구분하기 위해 label을 입력하시는걸 권장합니다. 

```yaml
actions:
- label: 전시
  placement: right top
```

## actions.placement

액션 버튼의 위치를 위(상단), 아래(하단), 왼쪽(좌), 오른쪽(우) 변경하고 싶을 때

```yaml
placement: right top
placement: right bottom  
placement: left top
placement: left bottom
```

## actions.button.type

```yaml
actions:
  - label: 제출
    placement: bottom right
    button:
      type: default
  - label: 삭제
    confirmText: 계속하시겠습니까?
    placement: bottom right
    button:
      type: danger-light
```

![](https://imagedelivery.net/MHVC-FGTDyxApYeHyF29Tw/5486ec98-e82e-48a8-8d8a-22947e328800/docs "a7cec87-Screen_Shot_2022-11-04_at_6.03.19_PM.png")

### actions.button.icon

버튼 안에 아이콘을 입력할 수 있습니다. 

- 지원하는 아이콘: <https://pictogrammers.github.io/@mdi/font/7.2.96/>
- 필요한 아이콘을 찾기 쉬운 사이트: <https://pictogrammers.com/library/mdi/>

```yaml
actions:
- label: 불참 
  single: true
  placement: bottom left   
  button:
    type: danger-light 
    icon: handball
```

## actions.single

actions 안에서 체크박스 없이, 실행 버튼만을 만들고 싶을 때 single 키를 이용하세요. 

```yaml
actions:
- label: 전체 초기화
  placement: right top
  single: true
```

## actions.openUrl

액션 버튼을 눌러 특정 URL의 페이지로 이동합니다.

```yaml
actions:
  - label: 페이지 이동
    target: _self
    openUrl: https://dev.selectfromuser.com
    single: true
```

## actions.openModal

액션 버튼을 눌러 모달을 열 수 있습니다. 

modal의 path에 parameter(e.g. `:id`)를 넣어 부모 데이터나 URL에서 가져와서 사용할 수 있습니다.

```yaml
actions:
  - label: 모달 열기
    single: true
    openModal: modal1-:id

modals:
  - path: modal1-:id
    blocks:
      - type: query
        resource: mysql
```

## actions.showDownload

데이터 다운로드 기능을 액션 버튼에 추가할 있어요. 

액션 버튼 추가 시, 헷갈리지 않게 기존의 showDownload 옵션은 끄는걸 권장해요. (`showDownload: false`)

```yaml
actions:
  - label: csv 다운로드
    showDownload: csv
    single: true
```

### [showDownload](/reference#blocks-showdowload)

## actions.params.valueFromSelectedRows

선택한 row의 값을 가져와서, 파라미터에 이용할 수 있습니다. 

::: code-group

```yaml [MySQL]
selectOptions:
  enabled: true
actions:
- label: 버튼  
  type: query
  resource: mysql.qa
  sqlType: update
  sql: UPDATE products SET sell_status = 'true' WHERE id = :id
  params:
  - key: id
    valueFromSelectedRows: id
```

```yaml [HTTP]
selectOptions:
  enabled: true
actions:
- label: 버튼  
  type: http
  axios:
    method: POST
    url: https://httpbin.selectfromuser.com/anything
    data:
      id: "{{id}}"
  params:
  - key: id
    valueFromSelectedRows: id
```

:::

## actions.confirmText

```yaml
actions:
- label: 삭제
  confirmText: 정말 삭제하시겠습니까? 삭제 후 복구가 어려울 수 있습니다.
```

## actions.params.promptText

prompt를 띄워서 parameter에 값을 입력할 수 있습니다.

```yaml
params:
- key: memo
  valueFromPrompt: true
  promptText: 메모를 입력해주세요.
```

## actions.modal

액션 버튼을 눌러 모달을 띄울 수 있습니다. 

```yaml
actions:
- label: 티켓 추가
  placement: top right
  modal: true
  type: query
  ...
```

## actions.forEach

액션 실행 시, 선택된 row의 값들을 하나씩 연속으로 실행합니다. 

```yaml
actions:
- label: 티켓 추가
  placement: top left
  modal: true
  type: query
  resource: acme
  sqlType: insert
  sql: >
    insert into tickets (created_at, written_by, title, description, status, type, type_id) 
    values ( current_timestamp, :written_by, :title, :description, :status, 'order', :type_id)
  forEach: true
  params:
  - key: written_by
  - key: title
    help: >
      필드에 대한 도움말
  - key: description
  - key: status
  - key: type_id
    valueFromSelectedRows: true
    valueFromSelectedRowsAs: id
```

