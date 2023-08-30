---
outline: deep
---

#### [`pages`](/pages#pages-blocks)

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
  sqlType: select
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

## [blocks.columns](/columns)

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

## [blocks.params](/params)

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

## blocks.display


### display: form

조회한 데이터를 form 양식으로 보여줍니다.

```yaml
blocks:
- type: query
  sqlType: select
  ...
  display: form
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

`beta` updateOptions, columns.editable 과 함께 사용 시 display: col-1/2 뷰를 유지하면서 데이터를 수정할 수 있게 됩니다.

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

### display: metric

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

### display: form

#### display: form + INSERT

> Beta 베타 오픈 기능

데이터를 추가하는 사용자에게 더 알맞는 입력폼을 만들 수 있어요. 

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


# blocks.submitButton

params와 주로 쓰입니다. 값을 입력하고 제출할 때 버튼의 이름이나 색상을 바꿀 수 있어요. 

```yaml
submitButton:
  label: 검색
  type: primary
```

## submitButton.type

버튼 색상은 아래와 같이 바꿀 수 있습니다. 

![](https://files.readme.io/f9762dc-a7cec87-Screen_Shot_2022-11-04_at_6.03.19_PM.png "a7cec87-Screen_Shot_2022-11-04_at_6.03.19_PM.png")

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

## [blocks.viewModal](/modals)

테이블 마지막에 '조회' 버튼이 추가됩니다. 클릭시 새로운 모달 팝업이 노출됩니다.

```yaml
- type: query
  ...
  viewModal:
    blocks:
    - type: query
```

### [viewModal.useColumn](/modals#viewmodal-usecolumn)

특정 컬럼을 모달 조회 링크로 지정할 수 있습니다.

### [viewModal.params.valueFromRow](/modals#viewmodal-params-valuefromrow)

조회한 row 데이터를 모달 안에서 사용할 수 있습니다.

## [blocks.modals](/modals#modals)

## blocks.selectOptions

selectOptions는 테이블의 row를 선택할 때 쓰입니다. [actions](/actions)와 함께 사용할 때 유용합니다. 

### selectOnCheckboxOnly: true

테이블의 row를 선택할 때, 체크박스 영역을 눌러야만 선택할 수 있게 설정하게 됩니다. 


```yaml
blocks:
- type: query
  selectOptions: 
    enabled: true
    selectOnCheckboxOnly: true
```

## [blocks.actions](/actions)

선택한 1개 또는 여러 항목으로 다음 화면을 진행합니다.