---
outline: deep
---

# 상품 재고 관리

와인 등 상품의 재고 관리 페이지를 만들 수 있습니다. 상품 재고 조회와 추가, 관리 기능을 쉽게 만들어보세요.

## 전체 YAML 파일

재고 조회와 상품/재고 추가, 그리고 상세 조회 및 수정 페이지 총 3부분으로 이루어져있습니다. 전체 내용에 이어 부분별 설명을 아래에서 확인하실 수 있습니다. 

::: code-group
```yaml [query]
menus:
- path: stocks
  name: 재고관리
pages:
- path: stocks
  blocks:
  - type: query
    resource: mysql.qa
    sql: >
      SELECT name, vintage, inflow, outflow, price,
        COALESCE(inflow, 0) - COALESCE(outflow, 0) AS '재고',
        id
      FROM wine_stock
      WHERE deleted_at IS NULL
    searchOptions:
      enabled: true
    actions:
    - type: query
      modal: true
      single: true
      label: 와인추가
      params:
      - key: name
      resource: mysql.qa
      sql: >
        INSERT INTO wine_stock
        SET name = :name
    viewModal:
      useColumn: name
      blocks:
      - type: query
        resource: mysql.qa
        sql: >
          SELECT *, 
            COALESCE(inflow, 0) - COALESCE(outflow, 0) AS '재고',
            COALESCE(IFNULL(deleted_at, 'Y'), 'N') AS deleted_at 
          FROM wine_stock
          WHERE id = :id
        display: form
        params:
        - key: id
          valueFromRow: id
        columns:
          재고:
            style: |
              color: tomato;
              background-color: #f0f0f0;
              font-size: 28px !important;
              font-weight: 700;
              padding: 1rem;
              text-align: center;
          name:
            updateOptions:
              type: query
              resource: mysql.qa
              sql: UPDATE wine_stock SET name = :value WHERE id = :id
          vintage:
            maxlength: 10
            updateOptions:
              type: query
              resource: mysql.qa
              sql: UPDATE wine_stock SET vintage = :value WHERE id = :id
          memo:
            maxlength: 1000
            format: textarea
            updateOptions:
              type: query
              resource: mysql.qa
              sql: UPDATE wine_stock SET memo = :value WHERE id = :id
          price:
            format: text
            updateOptions:
              type: query
              resource: mysql.qa
              sql: UPDATE wine_stock SET price = :value WHERE id = :id
          inflow:
            label: 입고수량
            format: number
            min: 0
            step: 1
            updateOptions:
              type: query
              resource: mysql.qa
              sql: UPDATE wine_stock SET inflow = :value WHERE id = :id
          outflow:
            label: 출고수량
            format: number
            min: 0
            step: 1
            updateOptions:
              type: query
              resource: mysql.qa
              sql: UPDATE wine_stock SET outflow = :value WHERE id = :id
          deleted_at:
            label: 상태(삭제일시)
            radio:
            - Y
            - N
            updateOptions:
              type: query
              resource: mysql.qa
              sql: UPDATE wine_stock SET deleted_at = :value WHERE id = :id
              params:
              - key: value
                raw:
                  Y: NULL
                  N: NOW()
```

```yaml [http]
menus:
- path: stocks
  name: 재고관리
pages:
- path: stocks
  blocks:
  - type: http
    axios:
      method: GET
      url: https://api.example.com/v1/wine_stock
    rowsPath: rows
    searchOptions:
      enabled: true
    actions:
    - type: http
      modal: true
      single: true
      label: 와인추가
      params:
      - key: name
      axios:
        method: POST
        url: https://api.example.com/v1/wine_stock
        data:
          name: "{{name}}"
    viewModal:
      useColumn: name
      blocks:
      - type: http
        axios:
          method: GET
          url: https://api.example.com/v1/wine_stock/{{id}}
        rowsPath: rows
        display: form
        params:
        - key: id
          valueFromRow: id
        columns:
          재고:
            style: |
              color: tomato;
              background-color: #f0f0f0;
              font-size: 28px !important;
              font-weight: 700;
              padding: 1rem;
              text-align: center;
          name:
            updateOptions:
              type: http
              axios:
                method: PATCH
                url: https://api.example.com/v1/wine_stock/{{id}}
                data:
                  name: "{{value}}"
          vintage:
            maxlength: 10
            updateOptions:
              type: http
              axios:
                method: PATCH
                url: https://api.example.com/v1/wine_stock/{{id}}
                data:
                  vintage: "{{value}}"
          memo:
            maxlength: 1000
            format: textarea
            updateOptions:
              type: http
              axios:
                method: PATCH
                url: https://api.example.com/v1/wine_stock/{{id}}
                data:
                  memo: "{{value}}"
          price:
            format: text
            updateOptions:
              type: http
              axios:
                method: PATCH
                url: https://api.example.com/v1/wine_stock/{{id}}
                data:
                  price: "{{value}}"
          inflow:
            label: 입고수량
            format: number
            min: 0
            step: 1
            updateOptions:
              type: http
              axios:
                method: PATCH
                url: https://api.example.com/v1/wine_stock/{{id}}
                data:
                  inflow: "{{value}}"
          outflow:
            label: 출고수량
            format: number
            min: 0
            step: 1
            updateOptions:
              type: http
              axios:
                method: PATCH
                url: https://api.example.com/v1/wine_stock/{{id}}
                data:
                  outflow: "{{value}}"
          deleted_at:
            label: 상태(삭제일시)
            radio:
            - Y
            - N
            updateOptions:
              type: http
              axios:
                method: PATCH
                url: https://api.example.com/v1/wine_stock/{{id}}
                data:
                  deleted_at: "{{value}}"
```

:::

## 1. 재고 조회 기본 페이지

쿼리(query) 블록을 이용해 재고 조회 페이지를 만듭니다.

![](https://imagedelivery.net/MHVC-FGTDyxApYeHyF29Tw/d9092142-b721-43e2-e7ea-e7b008676900/docs "inventory-manage.png")

::: code-group

```yaml [query]
menus:
- path: stocks
  name: 재고관리
pages:
- path: stocks
  blocks:
  - type: query
    resource: mysql.qa
    sql: >
      SELECT name, vintage, inflow, outflow, price,
        COALESCE(inflow, 0) - COALESCE(outflow, 0) AS '재고',
        id
      FROM wine_stock
      WHERE deleted_at IS NULL
    searchOptions:
      enabled: true
```

```yaml [http]
menus:
- path: stocks
  name: 재고관리
pages:
- path: stocks
  blocks:
  - type: http
    axios:
      method: GET
      url: https://api.example.com/v1/wine_stock
    rowsPath: rows
    searchOptions:
      enabled: true
```

:::

## 2. 상품/재고 추가 버튼 actions

와인 등 상품을 추가할 수 있는 버튼과 모달을 만듭니다.

![](https://imagedelivery.net/MHVC-FGTDyxApYeHyF29Tw/5222dbec-2ab4-4adb-00bb-240a6226ae00/docs "inventory-actions.png")

::: code-group

```yaml [query]
actions:
- type: query
  modal: true
  single: true
  label: 와인추가
  params:
  - key: name
  resource: mysql.qa
  sql: >
    INSERT INTO wine_stock
    SET name = :name
```

```yaml [http]
actions:
- type: http
  modal: true
  single: true
  label: 와인추가
  params:
  - key: name
  axios:
    method: POST
    url: https://api.example.com/v1/wine_stock
    data:
      name: "{{name}}"
```

:::

## 3. 상품/재고 상세 조회 및 수정 페이지

viewModal을 통해 상품의 상세 조회와 수정 페이지를 만들 수 있습니다.

![](https://imagedelivery.net/MHVC-FGTDyxApYeHyF29Tw/89482677-f47f-43d5-9c71-7cc905f57400/docs "inventory-detail.png")

::: code-group

```yaml [query]
viewModal:
  useColumn: name
  blocks:
  - type: query
    resource: mysql.qa
    sql: >
      SELECT *, 
        COALESCE(inflow, 0) - COALESCE(outflow, 0) AS '재고',
        COALESCE(IFNULL(deleted_at, 'Y'), 'N') AS deleted_at 
      FROM wine_stock
      WHERE id = :id
    display: form
    params:
    - key: id
      valueFromRow: id
    columns:
      재고:
        style: |
          color: tomato;
          background-color: #f0f0f0;
          font-size: 28px !important;
          font-weight: 700;
          padding: 1rem;
          text-align: center;
      name:
        updateOptions:
          type: query
          resource: mysql.qa
          sql: UPDATE wine_stock SET name = :value WHERE id = :id
      vintage:
        maxlength: 10
        updateOptions:
          type: query
          resource: mysql.qa
          sql: UPDATE wine_stock SET vintage = :value WHERE id = :id
      memo:
        maxlength: 1000
        format: textarea
        updateOptions:
          type: query
          resource: mysql.qa
          sql: UPDATE wine_stock SET memo = :value WHERE id = :id
      price:
        format: text
        updateOptions:
          type: query
          resource: mysql.qa
          sql: UPDATE wine_stock SET price = :value WHERE id = :id
      inflow:
        label: 입고수량
        format: number
        min: 0
        step: 1
        updateOptions:
          type: query
          resource: mysql.qa
          sql: UPDATE wine_stock SET inflow = :value WHERE id = :id
      outflow:
        label: 출고수량
        format: number
        min: 0
        step: 1
        updateOptions:
          type: query
          resource: mysql.qa
          sql: UPDATE wine_stock SET outflow = :value WHERE id = :id
      deleted_at:
        label: 상태(삭제일시)
        radio:
        - Y
        - N
        updateOptions:
          type: query
          resource: mysql.qa
          sql: UPDATE wine_stock SET deleted_at = :value WHERE id = :id
          params:
          - key: value
            raw:
              Y: NULL
              N: NOW()
```

```yaml [http]
viewModal:
  useColumn: name
  blocks:
  - type: http
    axios:
      method: GET
      url: https://api.example.com/v1/wine_stock/{{id}}
    rowsPath: rows
    display: form
    params:
    - key: id
      valueFromRow: id
    columns:
      재고:
        style: |
          color: tomato;
          background-color: #f0f0f0;
          font-size: 28px !important;
          font-weight: 700;
          padding: 1rem;
          text-align: center;
      name:
        updateOptions:
          type: http
          axios:
            method: PATCH
            url: https://api.example.com/v1/wine_stock/{{id}}
            data:
              name: "{{value}}"
      vintage:
        maxlength: 10
        updateOptions:
          type: http
          axios:
            method: PATCH
            url: https://api.example.com/v1/wine_stock/{{id}}
            data:
              vintage: "{{value}}"
      memo:
        maxlength: 1000
        format: textarea
        updateOptions:
          type: http
          axios:
            method: PATCH
            url: https://api.example.com/v1/wine_stock/{{id}}
            data:
              memo: "{{value}}"
      price:
        format: text
        updateOptions:
          type: http
          axios:
            method: PATCH
            url: https://api.example.com/v1/wine_stock/{{id}}
            data:
              price: "{{value}}"
      inflow:
        label: 입고수량
        format: number
        min: 0
        step: 1
        updateOptions:
          type: http
          axios:
            method: PATCH
            url: https://api.example.com/v1/wine_stock/{{id}}
            data:
              inflow: "{{value}}"
      outflow:
        label: 출고수량
        format: number
        min: 0
        step: 1
        updateOptions:
          type: http
          axios:
            method: PATCH
            url: https://api.example.com/v1/wine_stock/{{id}}
            data:
              outflow: "{{value}}"
      deleted_at:
        label: 상태(삭제일시)
        radio:
        - Y
        - N
        updateOptions:
          type: http
          axios:
            method: PATCH
            url: https://api.example.com/v1/wine_stock/{{id}}
            data:
              deleted_at: "{{value}}"
```

:::

> 🚧 params.raw
>
> key에 해당하는 value로 raw sql을 지정하는 기능입니다. NULL 이나 NOW() 등 일반 데이터 타입(string, number 등 문자)이 아닌 값을 넣어야할 때 이용해주세요. 일반 데이터 타입에서는 사용하지 않는 것이 좋습니다.

updateOptions에 대한 자세한 설명은 ["클릭해서 수정하기"](https://docs.selectfromuser.com/docs/%ED%81%B4%EB%A6%AD%ED%95%B4%EC%84%9C-%EC%88%98%EC%A0%95%ED%95%98%EA%B8%B0) 페이지에서 확인하실 수 있습니다.