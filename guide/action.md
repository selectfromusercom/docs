---
outline: deep
---

# 데이터 체크와 액션

조회한 데이터 테이블 결과에서 개별 데이터들을 선택하고 이를 활용하여 액션을 진행할 수 있습니다.

## 원하는 결과물 체크하기

블록 안에 selectOptions를 추가하여 개별 행(row)을 선택할 수 있는 기능을 추가할 수 있습니다.

![](https://imagedelivery.net/MHVC-FGTDyxApYeHyF29Tw/9b93be3e-69d0-49f6-5e0a-667224340f00/docs "check-rows.png")

::: code-group

```yaml [query]
pages:
- path: customer
  blocks: 
  - type: query
    resource: mysql
    sqlType: select
    sql: >
      select *
      from customers
      limit 50
    selectOptions:
      enabled: true
```

```yaml [http]
pages:
- path: customer
  blocks: 
  - type: http
    axios:
      method: GET
      url: https://api.example.com/v1/customers?limit=50
    rowsPath: rows
    selectOptions:
      enabled: true
```

:::

## 체크하여 선택한 데이터로 액션

![](https://imagedelivery.net/MHVC-FGTDyxApYeHyF29Tw/8b18817e-c4f1-41aa-6aea-efe1dd037600/docs "check-actions.png")

::: code-group

```yaml [query]
- type: query
  resource: mysql.qa
  sqlType: select
  sql: >
    SELECT id, fullname AS '예약자명',
      CONCAT(LEFT(phone_primary,3), '****', RIGHT(phone_primary,4)) AS '연락처',
      DATE_FORMAT(visitdate, '%Y-%m-%d') AS '체크인',
      memo AS '메모'
    FROM customer 
    WHERE workspace_id = 12 LIMIT 10
  selectOptions: 
    enabled: true
  actions:
  - type: query
    label: 메모
    resource: mysql.qa
    sqlType: update
    sql: >
      UPDATE customer 
      SET memo = :memo
      WHERE id IN (0, :...ids)
    params:
    - key: ids
      valueFromSelectedRows: true
      valueFromSelectedRowsAs: id
    - key: memo
      valueFromPrompt: true
```

```yaml [http]
- type: http
  axios:
    method: GET
    url: https://api.example.com/v1/customers?workspace_id=12&limit=10
  rowsPath: rows
  selectOptions:
    enabled: true
  actions:
  - type: http
    label: 메모
    axios:
      method: PATCH
      url: https://api.example.com/v1/customers/memo
      data:
        ids: "{{ids}}"
        memo: "{{memo}}"
    params:
    - key: ids
      valueFromSelectedRows: true
      valueFromSelectedRowsAs: id
    - key: memo
      valueFromPrompt: true
```

:::

### actions로 update 하는 경우

::: code-group

```yaml [query]
actions:
- type: query
  resource: mysql
  sqlType: update
  sql: UPDATE s_orders SET status = :status WHERE id = :user_id
  label: 변경
  params:
    - key: status
      label: 상태
      dropdown:
        - placed
        - received
        - returned
      required: true
    - key: user_id
      valueFromSelectedRows: true
      valueFromSelectedRowsAS: '고객ID'
```

```yaml [http]
actions:
- type: http
  label: 변경
  axios:
    method: PATCH
    url: https://api.example.com/v1/orders/{{user_id}}/status
    data:
      status: "{{status}}"
  forEach: true
  params:
    - key: status
      label: 상태
      dropdown:
        - placed
        - received
        - returned
      required: true
    - key: user_id
      valueFromSelectedRows: true
      valueFromSelectedRowsAs: "고객ID"
```

:::

## 심화 예제

- [selectOptions, actions 실행시 1개 body로 구성하여 request하는 방법](https://ask.selectfromuser.com/t/selectoptions-actions-1-body-request/149)