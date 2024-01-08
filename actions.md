---
outline: deep
---

#### [`blocks`](/blocks#blocks-actions)

# `actions: []`

[selectOptions](/blocks#blocks-selectoptions)을 통해 선택된 테이블의 row가 필요합니다.

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

### [showDownload](/blocks#blocks-showdowload)

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