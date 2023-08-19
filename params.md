---
outline: deep
---

#### [`blocks`](/blocks#blocks-params)

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

설정 > 계정의 사용자 이름(name)과 이메일(email) 시스템 데이터를 변수로 이용할 수 있습니다.

```yaml
params:
- key: user_name
  valueFromUserProperty: "{{name}}"
- key: email
  valueFromUserProperty: "{{email}}"
```

## params.valueFromSheet

엑셀 데이터를 업로드하고 params로 매칭한 다음, DB에 데이터를 저장할 수 있습니다.

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

## params와 `query`

`query`와 params를 활용해서 sql 쿼리 WHERE절에 일부를 옵션으로 넣을 수 있습니다. 

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

## [pages.params](/pages#pages-params)

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