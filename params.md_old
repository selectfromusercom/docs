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
- 셀렉트에서 **x**(위도), **y**(경도)값을 내려줍니다.

```yaml
params:
  - key: address
    label: 주소
    format: address
    updateParams:
      address: roadAddress # address 파라미터에 검색 결과인 roadAddress 값을 넣습니다.
      postcode: zonecode # postcode 파라미터에 zonecode 값을 넣습니다.
      latitude: x # latitude 파라미터에 x 값을 넣습니다. 
      longitude: y # longitude 파라미터에 y 값을 넣습니다. 
  - key: postcode
    label: 우편번호
  - key: latitude
    label: 위도
  - key: longitude
    label: 경도
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