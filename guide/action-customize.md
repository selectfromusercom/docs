---
outline: deep
---

# 액션 상세 설정

## 액션 버튼 위치 설정

버튼 위치를 왼쪽/오른쪽과 위/아래의 조합으로 설정하실 수 있습니다.

![](https://imagedelivery.net/MHVC-FGTDyxApYeHyF29Tw/414382dc-1acc-42c0-d68c-16b79af9dd00/docs "action-placement.png")

```yaml
actions:
- label: 상태 초기화
  placement: right top
#  placement: right bottom  
#  placement: left top
#  placement: left bottom
```

## confirmText로 안전하게 액션

![](https://imagedelivery.net/MHVC-FGTDyxApYeHyF29Tw/d6426aa6-84a9-4950-de39-97e7fad2a700/docs "action-confirmtext.png")

::: code-group

```yaml [query]
- label: 삭제
  type: query
  resource: mysql
  sql: UPDATE property SET deleted_at = NOW() WHERE id IN (:ids)
  # 컨펌 텍스트
  confirmText: 삭제하시겠습니까?
  class: text-danger
  params:
    - key: ids
      valueFromSelectedRows: true
      valueFromSelectedRowsAs: id
```

```yaml [http]
- label: 삭제
  type: http
  axios:
    method: PATCH
    url: https://api.example.com/v1/properties/delete
    data:
      ids: "{{ids}}"
  confirmText: 삭제하시겠습니까?
  class: text-danger
  params:
    - key: ids
      valueFromSelectedRows: true
      valueFromSelectedRowsAs: id
```

:::

## promptText로 데이터 받아서 처리

![](https://imagedelivery.net/MHVC-FGTDyxApYeHyF29Tw/cee3106e-091e-4be0-328f-ac46f9bf7400/docs "action-prompttext.png")

::: code-group

```yaml [query]
actions:
- label: 메모 변경
  type: query
  resource: mysql
  class: text-primary
  sql: UPDATE property SET memo = :memo WHERE id IN (:ids)
  params:
    - 
      key: memo
      # 프롬프트로 입력 받기
      valueFromPrompt: true
      promptText: 메모를 입력해주세요. (덮어씌우기)
    - 
      key: ids
      valueFromSelectedRows: true
      valueFromSelectedRowsAs: id
```

```yaml [http]
actions:
- label: 메모 변경
  type: http
  class: text-primary
  axios:
    method: PATCH
    url: https://api.example.com/v1/properties/memo
    data:
      ids: "{{ids}}"
      memo: "{{memo}}"
  params:
    - key: memo
      valueFromPrompt: true
      promptText: 메모를 입력해주세요. (덮어씌우기)
    - key: ids
      valueFromSelectedRows: true
      valueFromSelectedRowsAs: id
```

:::

## 액션 실행 전 확인하기

confirm 키를 이용하면 실행 전에 확인 문구를 보여줄 수 있습니다. 

::: code-group

```yaml [query]
- placement: right top
  name: 메모 전체 삭제
  label: 대상자 초기화
  resource: mysql.qa
  type: query
  sqlType: update
  sql: UPDATE customer SET memo = '' WHERE memo = 'A'
  confirm: 메모 A 대상자를 초기화 합니다.
```

```yaml [http]
- placement: right top
  name: 메모 전체 삭제
  label: 대상자 초기화
  type: http
  axios:
    method: PATCH
    url: https://api.example.com/v1/customers?memo=A
    data:
      memo: ""
  confirm: 메모 A 대상자를 초기화 합니다.
```

:::

## 체크 없이 버튼 실행하기

single: true 를 추가하는 경우 내역을 체크하지 않아도 버튼이 활성화 됩니다. 

```yaml
- label: 대상자 초기화
  placement: right top
  single: true
```