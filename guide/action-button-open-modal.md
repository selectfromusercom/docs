---
outline: deep
---

# 액션 버튼과 모달

액션 버튼을 클릭해서 모달을 띄우는 방법을 안내드립니다.

## 액션 버튼 클릭해서 모달 띄우기

actions 아래에 modal 키를 사용해서 버튼 클릭 시 모달을 띄울 수 있습니다. 

![](https://imagedelivery.net/MHVC-FGTDyxApYeHyF29Tw/c9b31f24-6782-4b19-92b8-7385ec34dd00/docs "action-button-for-modal.png")

![](https://imagedelivery.net/MHVC-FGTDyxApYeHyF29Tw/3a147759-1d53-429b-7941-be675c020500/docs "스크린샷 2022-11-09 오후 4.26.52.png")

::: code-group

```yaml [query]
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

```yaml [http]
actions:
- label: 티켓 추가
  name: 티켓 추가하기
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