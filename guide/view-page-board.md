---
outline: deep
---

# 칸반 보드로 보기

주문이나 고객 상태, 상품 검수 상태 등을 칸반 보드 형태로 조회할 수 있습니다. 데이터베이스 정보를 그대로 가져와서 볼 수 있기 때문에 사용자가 라이브 데이터를 확인할 수 있는 장점이 있습니다. 

아래에 상품 검수 프로세스를 칸반 보드 형태로 볼 수 있게 만든 샘플을 살펴보세요.

## 샘플 이미지

SQL select 쿼리로 데이터를 조회하고 칸반 보드 형태로 바꿀 수 있습니다.

![](https://imagedelivery.net/MHVC-FGTDyxApYeHyF29Tw/0c346392-4cc4-4e96-128a-4d2f58530500/docs "스크린샷 2022-10-14 오후 6.50.46.png")

카드 클릭 시 모달을 띄우고 상세 정보를 조회하거나 데이터를 수정하는 페이지를 만들 수 있어요.

![](https://imagedelivery.net/MHVC-FGTDyxApYeHyF29Tw/1e16dab8-a4ac-418a-11b0-893d54a94300/docs "스크린샷 2022-10-14 오후 6.51.04.png")

## 칸반 YAML 설정 방법

kanbanOptions 키를 사용합니다. 

```yaml
kanbanOptions:
  enabled: true
  useColumn: review_status
```

::: code-group

```yaml [query]
- path: inspect-product
  blocks:
    - type: query
      resource: acme
      sqlType: select
      sql: >
        SELECT *
        FROM product_reviews
        LIMIT 10
      columns:
        id:
          hidden: true 
        description:
          hidden: true
        review_status:
          hidden: true
      kanbanOptions:
        enabled: true
        useColumn: review_status       
      viewModal:
        useColumn: id
        blocks:          
        - type: query
          resource: acme
          sqlType: select
          sql: >
            SELECT *
            FROM product_reviews
            WHERE id = :id
          params:
          - key: id
            valueFromRow: id                 
          display: form

        - type: query
          resource: acme
          sqlType: update
          sql: >
            UPDATE product_reviews
            SET review_status = :review_status
            WHERE id = :id
          params:
          - key: id
            valueFromRow: id    
          - key: review_status
            dropdown:
            - in_review
            - rejected
            - reviewed
            defaultValueFromRow: review_status
```

```yaml [http]
- path: inspect-product
  blocks:
    - type: http
      axios:
        method: GET
        url: https://api.example.com/v1/product_reviews
      rowsPath: rows
      columns:
        id:
          hidden: true 
        description:
          hidden: true
        review_status:
          hidden: true
      kanbanOptions:
        enabled: true
        useColumn: review_status
      viewModal:
        useColumn: id
        blocks:          
        - type: http
          axios:
            method: GET
            url: https://api.example.com/v1/product_reviews/{{id}}
          rowsPath: rows
          params:
          - key: id
            valueFromRow: id
          display: form

        - type: http
          axios:
            method: PUT
            url: https://api.example.com/v1/product_reviews/{{id}}
          body:
            review_status: "{{review_status}}"
          params:
          - key: id
            valueFromRow: id    
          - key: review_status
            dropdown:
            - in_review
            - rejected
            - reviewed
            defaultValueFromRow: review_status
```

:::

## 칸반 세부옵션

### 드래그 & 드롭

- 카드 이동시 useColumn에 해당하는 컬럼의 updateOptions를 그대로 실행
- `confirm: true` 추가시 확정전에 변경 전/후 표기

::: code-group

```yaml [query]
kabanOptions:
  enabled: true
  useColumn: review_status
  drag: true
columns:
  id:
  review_status:
    updateOptions:
      type: query
      resource: mysql
      sqlType: update
      sql: >
        UPDATE product_reviews
        SET status = :value
        WHERE id = :id
      confirm: true
```

```yaml [http]
kabanOptions:
  enabled: true
  useColumn: review_status
  drag: true
columns:
  id:
  review_status:
    updateOptions:
      type: http
      axios:
        method: PUT
        url: https://api.example.com/v1/product_reviews/{{id}}
      body:
        status: "{{value}}"
      confirm: true
```

:::

### 리스트 직접 정의하고 정렬하기

```yaml
kabanOptions:
  enabled: true
  useColumn: review_status
  useList: 
    - peding
    - in_review
    - done 
    - null # 값이 null일 때
```

### 리스트 라벨 색깔 부여

```yaml
kabanOptions:
  enabled: true
  useColumn: review_status
  color:
    pending: red
    in_review: yellow
    done: green
```

### columns buttons 지원

- buttons를 통해 openAction, openModal을 지원합니다.

```yaml
kabanOptions:
  enabled: true
  useColumn: review_status
columns:
  review_status:
    buttons:
      - label: 삭제
        openAction: delete-card
        class: w-50 text-red-700
      - label: 메모 수정
        openModal: edit-memo
        class: w-50 text-green-700
```