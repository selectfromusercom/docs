---
outline: deep
---

# 모달 상세 옵션

## 가로 크기 조절

기본 가로크기는 600px 이며 추가로 지정 가능합니다.

![](https://files.readme.io/754d203-modal-width.png "modal-width.png")

```yaml
viewModal:
  displayParentRow: false
  # 너비 설정
  width: 90%
  
  blocks:
  - type: query
    resource: mysql.qa
    sqlType: select
    sql: >
      SELECT id, name, address, memo
      FROM properties_copy
      WHERE id = :id
    display: col-1
    params:
    - key: id
      valueFromRow: true
```

## 모달 제목

기본값 비어있음

![](https://files.readme.io/7302dcf-modal-title.png "modal-title.png")

```yaml
viewModal:
  displayParentRow: false
  # 모달 제목
  name: 제휴사 상세조회
  
  blocks:
  - type: query
    resource: mysql.qa
    sqlType: select
    sql: >
      SELECT id, name, address, memo
      FROM properties_copy
      WHERE id = :id
    display: col-1
    params:
    - key: id
      valueFromRow: true
```

## 안전하게 창닫기

기본 설정으로는 Esc 또는 backdrop(검은 배경)을 클릭하면 모달팝업이 닫힙니다.  
아래의 옵션을 통해 반드시 ‘닫기' 를 클릭해야 닫히도록 설정 가능합니다.

```yaml
viewModal:
  displayParentRow: false
  # 안전하게 창닫
  dismissible: false
  
  blocks:
  - type: query
    resource: mysql.qa
    sqlType: select
    sql: >
      SELECT id, name, address, memo
      FROM properties_copy
      WHERE id = :id
    display: col-1
    params:
    - key: id
      valueFromRow: true
```

> 📘 
> 
> aside, scroll, drag, minimize/maximize 등 모달 옵션을 안정화 후 추가 예정입니다.