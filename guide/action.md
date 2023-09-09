---
outline: deep
---

# 데이터 체크와 액션

조회한 데이터 테이블 결과에서 개별 데이터들을 선택하고 이를 활용하여 액션을 진행할 수 있습니다.

## 원하는 결과물 체크하기

블록 안에 selectOptions를 추가하여 개별 행(row)을 선택할 수 있는 기능을 추가할 수 있습니다.

![](https://files.readme.io/53d7523-check-rows.png "check-rows.png")

```yaml
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

## 체크하여 선택한 데이터로 액션

![](https://files.readme.io/54f4cef-check-actions.png "check-actions.png")

```yaml
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

### actions로 update 하는 경우

```yaml
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