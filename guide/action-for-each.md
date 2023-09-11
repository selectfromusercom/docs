---
outline: deep
---

# 여러번 반복해서 실행

## 반복해서 쿼리를 실행하는 방법

forEach 키를 사용해서 sql 쿼리를 여러번 실행합니다. 

```yaml
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