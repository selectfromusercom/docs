# YAML reference

셀렉트에서 지원하는 YAML 기본 정보들을 한 곳에 모아, 쉽게 이해하고 참고할 수 있게 하였습니다.

> 📘 YAML이란?
> 
> YAML은 '사람이 쉽게 읽을 수 있는' 데이터 직렬화 양식이며 설정 파일을 작성하고 관리할 때 많이 쓰입니다. 셀렉트로 어드민을 YAML로 만들 때 장점과 특징에 대해 궁금하시다면 ["코드가 아닌 스펙으로 어드민을 만든다면"](https://blog.selectfromuser.com/declarative-way-to-admin/)이라는 글을 읽어보세요.

# title

어드민 사용자가 보는 페이지의 상단 왼쪽에 보여지는 제목입니다.

```yaml
title: 어드민 제목
```

# layout

## layout.style

어드민 화면 최상단 영역의 스타일을 바꿀 수 있습니다. 우리 팀에게 맞는 배경색으로 바꿔보세요. 

> 📘 title 키와 동일한 위치에서 사용합니다.

```yaml
layout:
  style:
    backgroundColor: "#3f63bf !important"
    borderBottom: solid 1px rgba(0,0,0,0.05)
```

# menus

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

# pages

페이지들을 구성하기 위한 최상위 키

## pages.path

개별 페이지를 메뉴와 연결할 수 있습니다.

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

# blocks

페이지 안은 블록들로 이루어져 있습니다. 1개 또는 여러개를 추가할 수 있으며, 블록의 종류는 query, http, markdown 이 있습니다. 

```yaml
blocks:
- type: query
- type: http
- type: markdown
```

# blocks.type

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

## type: query

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

### sqlConfirm: true

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

### toast, toastOptions

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

## type: http

REST API와 GraphQL API 모두 사용 가능합니다. axios 용법을 그대로 따릅니다. axios에 대한 자세한 설명은 여기서 확인해보세요. 

### method: GET

```yaml
- type: http
  axios:
    method: GET
    url: https://testapi.com/v1/33iac2d
  rowsPath: rows
```

### method: POST

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

### graphQL

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

## type: markdown

마크다운 용법에 맞춰서 내용을 작성할 수 있습니다. 페이지에 대한 설명이나 유의사항 등을 작성해보세요.

```yaml
- type: markdown
  content: >
    write something
```

## type: top, left, center, right, bottom

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

## type: header

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

## type: tab

blocks 아래에 탭을 자유롭게 추가할 수 있어요. 탭 스타일도 지정할 수 있습니다. 

- tabOptions.type: button, button full, full
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
    # keep: true
    autoload: 1
    tabs:
    - name: 주문
      blocks:
    - name: 결제
      blocks:
```

## type: iframe

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

## blocks.type.containerClass

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

## blocks.type.showDowload

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

## blocks.log: true

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

# blocks.paginationOptions

주로 조회할 때 페이지네이션을 추가해서 필요한 정보만 빨리 볼 수 있게 도와줍니다. 

## perPage

페이지 당 보여지는 기본 row 개수를 지정합니다. 

```yaml
- type: query
  ...
  paginationOptions:
    enabled: true
    perPage: 10
```

# blocks.searchOptions

조회한 내역들을 검색할 수 있게 지원합니다. 프론트 레벨에서 검색하기 때문에 서버 부하를 줄일 수 있는 장점이 있습니다. 

```yaml
- type: query
  ...
  searchOptions:
    enabled: true
```

## searchOptions.trigger

테이블 검색 시, 내용을 입력하고 엔터(enter)를 눌렀을 때만 조회하게 설정할 수 있습니다. 데이터를 안정적으로 조회할 수 있는 장점이 있습니다. 

```yaml
searchOptions:
  enabled: true
  trigger: enter
```

## searchOptions.placeholder

테이블의 검색 필드 안에 placeholder 값을 입력할 수 있습니다. 사용자가 참고할 수 있는 정보를 기입할 수 있습니다.

```yaml
searchOptions:
  enabled: true
  placeholder: '입력한 검색어로 찾습니다.'
```

# blocks.tableOptions

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

# blocks.sortOptions

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

# blocks.columnOptions

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

## columnOptionsAppend

전체 필드를 보여주면서, 일부 필드만 columnOptions로 수정하고 싶을 때 사용하세요.

```yaml
columnOptionsAppend: true
columnOptions:
- field: name
  label: 이름
```

# blocks.columns

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

## columns.valueAs

각 컬럼의 값들을 고정된 텍스트로 표시할 수 있습니다. 데이터를 '링크'나 '클릭' 같은 이름으로 감쌀 수 있습니다.

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

### valueAs 여러개 사용 방법

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

### formatFn: splitComma

필드 안의 데이터를 `Comma (,)`로 구분하고 보기 쉽게 표기해줍니다. 

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

버튼을 눌렀을 때 액션을 실행합니다. 

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

Update 쿼리 블록을 조회/수정 모드를 껐다 켜는 방식으로 사용할 수 있습니다. 

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

# blocks.tabOptions

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

# blocks.chartOptions

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

# blocks.display: metric

## metricOptions.type: bar

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

## metricOptions.type: category

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

# blocks.display: form

## display: form + INSERT

`Beta` 데이터를 추가하는 사용자에게 더 알맞는 입력폼을 만들 수 있어요. 

- `formOptions`
  - `firstLabelWidth`: 줄 가장 왼쪽 최소 너비
  - `labelWidth`: 레이블 최소 너비
  - `width`: 입력 폼 너비

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
      labelWidht: 100px
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

### display: calendar

조회한 데이터를 달력 형태로 보고, 날짜별 상세 내역을 클릭하여 모달을 띄울 수 있어요.

- `cache: true`: 캐시를 남겨 불필요한 로딩을 방지해줍니다. 이전달, 다음달을 오고갈때 더 자연스러워요.
- `color`: tailwindcss color class를 지원합니다. <https://tailwindcss.com/docs/customizing-colors>
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

# blocks.params

블록 안에서 parameter를 쓸 수 있습니다. 데이터를 조회하거나 생성, 수정할 때 input 역할을 하게 됩니다. 

```yaml
- type: query
  ...
  params:
  - key: id
    label: 아이디(ID)
```

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

설정 > 계정의 사용자 이름(name)과 이메일(email) 시스템 데이터를 변수로 이용할 수 있습니다.

```yaml
params:
- key: user_name
  valueFromUserProperty: "{{name}}"
- key: email
  valueFromUserProperty: "{{email}}"
```

## params.valueFromSheet

CSV 데이터를 업로드하고 params로 매칭한 다음, DB에 데이터를 저장할 수 있습니다.

- `sheetOptions.append`: 파일 여러개를 한번에 올릴 수 있어요.

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
      #   append: true
    - key: name
      valueFromSheet: 상품명    
    - key: code
      valueFromSheet: 상품약어
    - key: unit
      valueFromSheet: 수량
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
format: datetime-local
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
  - label: 어제
    offset: -1
    period: day
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

### format: address

주소와 우편번호를 입력해야할 때, 별도의 설치나 개발없이  
셀렉트에 내장된 Daum Postcode Service로 주소를 검색하고 우편번호까지 한번에 입력할 수 있어요.

- `format: address` 파라미터 영역에 주소 검색 버튼이 생성됩니다.
- 셀렉트에서 **roadAddress**(도로명주소)와 **zonecode**(우편번호)를 내려줍니다.

```yaml
params:
  - key: address
    label: 주소
    format: address
    updateParams:
      address: roadAddress # address 파라미터에 검색 결과인 roadAddress 값을 넣습니다.
      postcode: zonecode # postcode 파라미터에 zonecode 값을 넣습니다.
  - key: postcode
    label: 우편번호
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
  radio:
  - value: draft
    label: 초안
  - value: published
    label: 배포 완료ㄷ
```

```yaml
params:
- key: status
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
- key: active
  checkbox:
    true: active
    false: inactive
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

dropdownMultiple 여러개 선택 방식

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

## params 와 {{query}}

{{query}}와 params를 활용해서 sql 쿼리 WHERE절에 일부를 옵션으로 넣을 수 있습니다. 

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

# blocks.submitButton

params와 주로 쓰입니다. 값을 입력하고 제출할 때 버튼의 이름이나 색상을 바꿀 수 있어요. 

```yaml
submitButton:
  label: 검색
  type: primary
```

## submitButton.type

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

# blocks.resetButton

params 필드에 입력한 값들을 일괄적으로 빈값으로 바꾸고 싶을 때 이용합니다.  
`params.key.defaultValue`에 상관없이 항상 빈값으로 처리하고 싶은 경우 `clear: true`를 추가합니다. 

```yaml
# resetButton: true
resetButton:
  label: 초기화
  type: light
  # clear: true
```

# blocks.viewModal

```yaml
- type: query
  ...
  viewModal:
    blocks:
    - type: query
```

## viewModal.displayParentRow

```yaml
viewModal:
  displayParentRow: true
```

## viewModal.dismissible

모달이 띄워졌을 때 esc로 꺼지지 않게 하고 싶을 때 dismissble을 이용해주세요.

```yaml
viewModal:
  dismissible: false
```

## viewModal.blocks.display

기본적으로 데이터를 조회하면 테이블(표) 형태로 나타납니다. 이를 특정한 형태로 바꾸고 싶을 때 display를 사용합니다.

### display: form

조회한 데이터를 form 양식으로 보여줍니다.

```yaml
viewModal:
  blocks:
  - type: query
    sqlType: select
    ...
    display: form
```

### display: col-1

조회한 데이터를 피봇 테이블로 보여줍니다.

```yaml
viewModal:
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
viewModal:
  blocks:
  - type: query
    sqlType: select
    ...
    display: col-2
```

### display: col-1/2 + updateOptions

`beta` updateOptions, columns.editable 과 함께 사용 시 display: col-1/2 뷰를 유지하면서 데이터를 수정할 수 있게 됩니다.

```yaml
viewModal:
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
viewModal:
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

## viewModal.useColumn

특정 컬럼을 모달 조회 링크로 지정할 수 있습니다.

```yaml
viewModal:
  useColumn: id
  blocks:
```

## viewModal.params.valueFromRow

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

# blocks.usePage

viewModal, modals 아래에 usePage를 사용하여 블록 단위 YAML의 길이를 짧게할 수 있습니다. 

## viewModal.usePage

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

## modals.usePage

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

# blocks.actions

## selectOptions

selectOptions는 테이블의 row를 선택할 때 쓰입니다. actions와 함께 사용할 때 유용합니다. 

### selectOnCheckboxOnly: true

테이블의 row를 선택할 때, 체크박스 영역을 눌러야만 선택할 수 있게 설정하게 됩니다. 

```yaml
blocks:
- type: query
  selectOptions: 
    enabled: true
    selectOnCheckboxOnly: true
```

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

## actions.showDownload

데이터 다운로드 기능을 액션 버튼에 추가할 있어요. 

액션 버튼 추가 시, 헷갈리지 않게 기존의 showDownload 옵션은 끄는걸 권장해요. (`showDownload: false`)

```yaml
actions:
  - label: csv 다운로드
    showDownload: csv
    single: true
```

## actions.params.valueFromSelectedRows

선택한 row의 값을 가져와서, 파라미터에 이용할 수 있습니다. 

```yaml
selectOptions:
  enabled: true
actions:
- label: 버튼  
  type: query
  ...
  params:
  - key: id
    valueFromSelectedRows: true
    valueFromSelectedRowsAs: id
```

```yaml
  params:
  - key: id
    valueFromSelectedRows: id
```

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