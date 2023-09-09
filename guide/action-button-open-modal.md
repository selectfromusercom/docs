---
outline: deep
---

# 액션 버튼과 모달

액션 버튼을 클릭해서 모달을 띄우는 방법을 안내드립니다.

## 액션 버튼 클릭해서 모달 띄우기

actions 아래에 modal 키를 사용해서 버튼 클릭 시 모달을 띄울 수 있습니다. 

![](https://files.readme.io/8aee9e3-action-button-for-modal.png "action-button-for-modal.png")

![](https://files.readme.io/f276aff-_2022-11-09__4.26.52.png "스크린샷 2022-11-09 오후 4.26.52.png")

```yaml
actions:
- label: 티켓 추가
  name: 티켓 추가하기
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