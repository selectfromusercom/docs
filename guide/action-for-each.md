---
outline: deep
---

# 여러번 반복해서 실행

여러 내역을 선택하고 일괄 처리가 필요할때 유용합니다.

## 반복해서 쿼리를 실행하는 방법

forEach 키를 사용해서 sql 쿼리를 여러번 실행합니다.

::: code-group

```yaml [query]
actions:
- label: 티켓 추가
  placement: top left
  modal: true
  type: query
  resource: acme
  sqlType: insert
  sql: >
    INSERT INTO tickets (created_at, written_by, title, description, status, type, type_id) 
    VALUES ( current_timestamp, :written_by, :title, :description, :status, 'order', :type_id)
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

```yaml [http]
actions:
- label: 티켓 추가
  placement: top left
  modal: true
  type: http
  axios:
    method: POST
    url: https://api.example.com/v1/tickets
    data:
      written_by: "{{written_by}}"
      title: "{{title}}"
      description: "{{description}}"
      status: "{{status}}"
      type: "order"
      type_id: "{{type_id}}"
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

:::

## 심화 예제

- [엑셀 업로드로 insert 쿼리 실행시, 중복 데이터 사전 검증하기](https://ask.selectfromuser.com/t/insert/303)