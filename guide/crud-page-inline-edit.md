---
outline: deep
---

# 클릭해서 수정하기

데이터를 안전하게 수정하기 위해 필드 단위로 클릭해서 수정 모드를 키고 수정한 다음 저장할 수 있습니다.

## 모달 페이지에서 설정

조회용 필드를 클릭해서 수정하는 UI를 만들 수 있습니다.

- 모달에서 사용하기 편리합니다.
- UPDATE 쿼리를 단순하게 만들 수 있습니다.

![](https://imagedelivery.net/MHVC-FGTDyxApYeHyF29Tw/7a5b1b1b-f870-488e-3545-a54a9c946a00/docs "update-options.png")

::: code-group
```yaml [query]
viewModal:
  name: 제휴사 상세조회
  minHeight: 800px
  - type: query
    resource: mysql.qa
    sqlType: select
    sql: >
      SELECT id, name, address, memo
      FROM properties
      WHERE id = :id
    params:
    - key: id
      valueFromRow: id      
    display: form
    columns:
      name:
        label: 이름
        updateOptions:
          type: query
          resource: mysql.qa
          sql: UPDATE properties SET name = :value WHERE id = :id
          log: true
          confirm: false
      address:
        label: 주소
        updateOptions:
          type: query
          resource: mysql.qa
          sql: UPDATE properties SET address = :value WHERE id = :id
          log: true
          confirm: true
      memo:
        format: textarea    
        updateOptions:
          type: query
          resource: mysql.qa
          sql: UPDATE properties SET memo = :value WHERE id = :id
          log: true
          confirm: false
````

```yaml [http]
viewModal:
  name: 제휴사 상세조회
  minHeight: 800px
  - type: http
    axios:
      method: GET
      url: https://api.example.com/v1/properties/{{id}}
    rowsPath: rows
    params:
    - key: id
      valueFromRow: id      
    display: form
    columns:
      name:
        label: 이름
        updateOptions:
          type: http
          axios:
            method: PATCH
            url: https://api.example.com/v1/properties/{{id}}
            data:
              name: "{{value}}"
          log: true
          confirm: false
      address:
        label: 주소
        updateOptions:
          type: http
          axios:
            method: PATCH
            url: https://api.example.com/v1/properties/{{id}}
            data:
              address: "{{value}}"
          log: true
          confirm: true
      memo:
        format: textarea    
        updateOptions:
          type: http
          axios:
            method: PATCH
            url: https://api.example.com/v1/properties/{{id}}
            data:
              memo: "{{value}}"
          log: true
          confirm: false
```

:::

> 📘 updateOptions.sql 의 SET 에 :value는 꼭 :value 여야하나요?
>
> 네, `:value`로 설정하셔야 해당 기능이 작동합니다.

> 📘 updateOptions 안의 :id 값은 어디서 가져오나요?
>
> SQL 쿼리 결과의 SELECT 필드에서 가져옵니다. 즉, 위 쿼리에서는 `SELECT id`의 값을 가져옵니다.
>
> *params.key의 값은 가져오지 않습니다.

### 드롭다운 dropdown 사용

클릭해서 수정할 때 dropdown을 만들 수 있습니다.

::: code-group

```yaml [query]
property_status: # column name
  dropdown:
    - 'Y'
    - 'N'
  updateOptions:
    type: query
    resource: mysql
    sql: UPDATE properties SET status = :value WHERE id = :id
    log: true
    confirm: true
```

```yaml [http]
property_status: # column name
  dropdown:
    - 'Y'
    - 'N'
  updateOptions:
    type: http
    axios:
      method: PATCH
      url: https://api.example.com/v1/properties/{{id}}/status
      data:
        status: "{{value}}"
    log: true
    confirm: true
```

:::

## 데이터 조회(테이블) 페이지에서 설정

데이터 조회 테이블의 특정 컬럼의 데이터를 클릭해서 수정할 수 있게 설정하는 방법입니다.
테이블을 보면서 빠르고 안전하게 데이터를 수정할 수 있습니다.

![](https://imagedelivery.net/MHVC-FGTDyxApYeHyF29Tw/5dda1cf6-79c1-4ca1-7c74-50bc6179c900/docs "붙여넣은_이미지_2022__10__24__오후_12_00.jpg")

::: code-group

```yaml [query]
pages:
  - path: api/tokens/all
    blocks:
      - type: query
        resource: pgsql.sample
        name: 전체조회
        sql: SELECT * FROM public_api_tokens ORDER BY id DESC LIMIT 100
        sqlType: select
        paginationOptions:
          enabled: true
          perPage: 10
        columns:
          memo:
            updateOptions:
              resource: pgsql.sample
              type: query
              sql: UPDATE public_api_tokens SET memo = :value WHERE id = :id
```

```yaml [http]
pages:
  - path: api/tokens/all
    blocks:
      - type: http
        axios:
          method: GET
          url: https://api.example.com/v1/public_api_tokens?order=desc&limit=100
        rowsPath: rows
        paginationOptions:
          enabled: true
          perPage: 10
        columns:
          memo:
            updateOptions:
              type: http
              axios:
                method: PATCH
                url: https://api.example.com/v1/public_api_tokens/{{id}}
                data:
                  memo: "{{value}}"
```

:::

## 원본 SQL 값으로 업데이트

수정할때 텍스트 문자열이 아닌 SQL 값을 넣으려면 raw를 지정합니다.
보안을 위해 값과 1:1 매칭하여 쿼리가 추가됩니다

::: code-group

```yaml [query]
columns:
  deleted_at: # column name
    label: 상태(삭제일시)
    radio:
    - Y
    - N
    updateOptions:
      type: query
      resource: mysql.dev
      sql: UPDATE wine_stock SET deleted_at = :value WHERE id = :id
      params:
      - key: value
        raw:
          Y: NULL
          N: NOW()
```

```yaml [http]
columns:
  deleted_at: # column name
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