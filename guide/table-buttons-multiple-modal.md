---
outline: deep
---

# 모달과 테이블 버튼

modals 키를 통해 더 다양한 모달 디자인과 띄우는 방법을 지원합니다. 

## 모달 띄우기 기본

어떤 컬럼에 링크로 모달을 띄울지 설정할 수 있습니다. 

![](https://imagedelivery.net/MHVC-FGTDyxApYeHyF29Tw/35ea96dd-914d-40b9-ff8f-faff81172c00/docs "스크린샷 2022-11-14 오후 5.28.04.png")

::: code-group
```yaml [query]
menus:
- path: modals
  name: modals
pages:
- path: modals
  blocks:
  - type: query
    resource: mysql
    sqlType: select
    sql: > 
      SELECT id, name, phone, email, created_at, deleted_at
      FROM users
    modals:
    - path: user-:id
      blocks:
      - type: query
        resource: mysql
        sqlType: select
        sql: >
          SELECT *
          FROM users
          WHERE id = :id
        params:
        - key: id
          valueFromRow: id
    columns:
      id:
        openModal: user-:id
```

```yaml [http]
menus:
- path: modals
  name: modals
pages:
- path: modals
  blocks:
  - type: http
    axios:
      method: GET
      url: https://api.example.com/v1/users
    rowsPath: rows
    modals:
    - path: user-:id
      blocks:
      - type: http
        axios:
          method: GET
          url: https://api.example.com/v1/users/{{id}}
        rowsPath: rows
        params:
        - key: id
          valueFromRow: id
    columns:
      id:
        openModal: user-:id
```

:::

> 📘 모달 링크
>
> 일반적인 페이지 처럼 모달도 접근할 수 있는 링크를 만들 수 있습니다. path에 링크 규칙을 만들고 조회 페이지에서 링크를 복사해 슬랙 등으로 팀원에게 쉽게 공유해보세요. 특정 정보와 맥락을 확인하기가 더 쉬워집니다.

### modals.path 와 복수의 params

path에는 2개 이상의 params를 사용할 수도 있습니다.

::: code-group

```yaml [query]
modals:
- path: payment-user-:user_id-order-:order_id
  blocks:
  - type: query
    resource: mysql
    sqlType: select
    sql: >
      SELECT *
      FROM payments
      WHERE user_id = :user_id
      AND order_id = :order_id
    params:
    - key: user_id
      valueFromRow: user_id
    - key: order_id
      valueFromRow: order_id
```

```yaml [http]
modals:
- path: payment-user-:user_id-order-:order_id
  blocks:
  - type: http
    axios:
      method: GET
      url: https://api.example.com/v1/payments?user_id={{user_id}}&order_id={{order_id}}
    rowsPath: rows
    params:
    - key: user_id
      valueFromRow: user_id
    - key: order_id
      valueFromRow: order_id
```

:::

## 테이블 안에 버튼 추가

기존 컬럼 중에 선택할 수도 있지만, 가상의 컬럼을 만들고 해당 필드 안에 버튼을 추가할 수 있습니다.

아래는 '조회' 라는 컬럼을 추가하고 그 안에 버튼을 추가한 예시입니다.

![](https://imagedelivery.net/MHVC-FGTDyxApYeHyF29Tw/0a77c687-0a33-4aaf-59a7-92541d2e1d00/docs "스크린샷 2022-11-14 오후 5.31.15.png")

::: code-group

```yaml [query]
menus:
- path: modals-button
  name: modals-button
pages:
- path: modals-button
  blocks:
  - type: query
    resource: mysql
    sqlType: select
    sql: > 
      SELECT id, '조회', name, phone, email, created_at, deleted_at
      FROM users
    modals:
    - path: user-:id
      blocks:
      - type: query
        resource: mysql
        sqlType: select
        sql: >
          SELECT *
          FROM users
          WHERE id = :id
        params:
        - key: id
          valueFromRow: id
    columns:
      조회:
        buttons:
        - label: 상세
          openModal: user-:id
          type: primary
```

```yaml [http]
menus:
- path: modals-button
  name: modals-button
pages:
- path: modals-button
  blocks:
  - type: http
    axios:
      method: GET
      url: https://api.example.com/v1/users
    rowsPath: rows
    modals:
    - path: user-:id
      blocks:
      - type: http
        axios:
          method: GET
          url: https://api.example.com/v1/users/{{id}}
        rowsPath: rows
        params:
        - key: id
          valueFromRow: id
    columns:
      조회:
        buttons:
        - label: 상세
          openModal: user-:id
          type: primary
```

:::

## 버튼 종류

버튼 스타일은 아래와 같습니다. type 키와 함께 편리하게 버튼 디자인을 설정해보세요.

![](https://imagedelivery.net/MHVC-FGTDyxApYeHyF29Tw/5486ec98-e82e-48a8-8d8a-22947e328800/docs)

```yaml
buttons:
- label: 상세
  openModal: user-:id
  type: default
  # type: primary
  # type: primary-light
  # type: danger
  # type: danger-light
  # type: warning
  # type: warning-light
  # type: success
  # type: success-light
```

## 모달 종류

기본적으로 모달은 가운데(center)에 띄우지만 오른쪽 측면(side)이나 전체 너비(full)로 확장해서 사용하실 수도 있습니다.

![](https://imagedelivery.net/MHVC-FGTDyxApYeHyF29Tw/7c785f88-69dc-4112-d7ea-cb7e7f8e1100/docs "스크린샷 2022-11-14 오후 5.37.24.png")

::: code-group

```yaml [query]
modals:
- path: user-:id
  name: 상세 조회
  # 여러개 모드 (기본은 센터)
  # mode: center
  # mode: side  
  mode: full  
  blocks:
  - type: query
    resource: mysql
    sqlType: select
    sql: >
      SELECT *
      FROM users
      WHERE id = :id
    params:
    - key: id
      valueFromRow: id
```

```yaml [http]
modals:
- path: user-:id
  name: 상세 조회
  # 여러개 모드 (기본은 센터)
  # mode: center
  # mode: side  
  mode: full  
  blocks:
  - type: http
    axios:
      method: GET
      url: https://api.example.com/v1/users/{{id}}
    rowsPath: rows
    params:
    - key: id
      valueFromRow: id
```

:::

## 모달 esc 키로 닫지 않기

모달은 기본적으로 esc 키를 누르면 닫기가 됩니다. 해당 기능을 끄고 싶을 때는 dismissible을 이용해주세요.

```yaml
modals:
- path: user-:id
  name: 상세 조회
  # 모달을 esc 키로 닫히지 않게 하고 싶을 때
  dismissible: false
```