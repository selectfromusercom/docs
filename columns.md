---
outline: deep
---

#### [`blocks`](/blocks#blocks-columns)

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
- `thumbnailWidth: 100px`: 썸네일의 가로 크기를 설정합니다. (기본값은 column 100%)

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
          flex: true
          thumbnailWidth: 100px
          style: > 
            border-radius: 10px
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

![](https://files.readme.io/f6d2ef6-_2023-03-09__3.54.28.png "스크린샷 2023-03-09 오후 3.54.28.png")

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

![](https://files.readme.io/1a0cb00-_2023-03-09__4.11.27.png "스크린샷 2023-03-09 오후 4.11.27.png")

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

![](https://files.readme.io/05e0267-_2023-02-20__7.53.21.png "스크린샷 2023-02-20 오후 7.53.21.png")

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

#