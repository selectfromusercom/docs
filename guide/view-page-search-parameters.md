---
outline: deep
---

# 테이블 검색 조건 추가

데이터를 조회할 때, 특정 조건과 값으로 필요한 정보를 빠르게 찾을 수 있는 페이지가 필요할 때가 있습니다. 셀렉트 어드민을 통해 복잡한 검색 조건 기능을 쉽게 만들어보세요. 

> 📘 
> 
> 본 문서는 mysql 을 기준으로 작성되었습니다.  
> postgresql을 이용하시는 경우 ["검색 조건 PostgreSQL 유의사항"](/guide/tip-postgresql)을 참고해주시기 바랍니다.

## 필수 검색 조건

데이터를 조회할 때, 입력 필드를 꼭 채워야하는 방법입니다.

![](https://imagedelivery.net/MHVC-FGTDyxApYeHyF29Tw/bd3ba0ab-a288-4618-c722-2e2bb4574800/docs "necessary-filter.png")

아래 쿼리에서 `:name` 값에 아무것도 들어가지 않으면 `''` 빈값으로 쿼리가 실행됩니다. 

```yaml
- path: properties/active
  blocks:
  - type: query
    resource: mysql.qa
    sqlType: select
    sql: >
      SELECT * 
      FROM properties 
      WHERE name = :name
      ORDER BY id ASC 
      LIMIT 100
    # 검색조건 설정 
    params:
    - key: name
```

## 필수 조건 여러개

여러개의 필드를 조건으로 검색하고 싶을 때 

![](https://imagedelivery.net/MHVC-FGTDyxApYeHyF29Tw/3275fc12-5ab6-4e61-cc82-b47ed41e1600/docs "multi-filters.png")

입력 필드가 1개 있을 때와 마찬가지로 아래와 같이 작성 시, 파라미터의 값이 없을 때는 빈값 `''`으로 들어가 쿼리가 실행됩니다.  
쿼리의 OR절과 함께 사용하는 경우, 둘중 하나만 값이 맞아도 조회할 수 있게 됩니다.

```yaml
- path: properties/active
  blocks:
  - type: query
    resource: mysql.qa
    sqlType: select
    sql: >
      SELECT * 
      FROM properties 
      WHERE name = :name
         OR id = :id
      ORDER BY id ASC 
      LIMIT 100
    params:
    - key: name
      label: 업체명
    - key: id
      label: 업체번호
      format: number
```

## 조건을 입력해야 검색하기

기본은 전체 보기, 조건 둘중 하나라도 해당되면 표시

```yaml
- path: properties/active
  blocks:
  - type: query
    resource: mysql.qa
    sqlType: select
    sql: >
      SELECT * 
      FROM properties 
      WHERE (LENGTH(:name) = 0 OR name = :name)
         OR (LENGTH(:id) = 0 OR id = :id)
      ORDER BY id ASC 
      LIMIT 100
    params:
    - key: name
      label: 업체명
    - key: id
      label: 업체번호
      format: number
```

## 기본은 모두 표시, 조건 모두 일치해야 표시

```yaml
- path: properties/active
  blocks:
  - type: query
    resource: mysql.qa
    sqlType: select
    sql: >
      SELECT * 
      FROM properties 
      WHERE 1=1 
        AND (LENGTH(:name) = 0 OR name = :name)
        AND (LENGTH(:id) = 0 OR id = :id)
      ORDER BY id ASC 
      LIMIT 100
    params:
    - key: name
      label: 업체명
    - key: id
      label: 업체번호
      format: number
```

## 드롭다운 dropdown으로 조건 검색

![](https://imagedelivery.net/MHVC-FGTDyxApYeHyF29Tw/347d27bf-48e0-4f44-b9aa-b0db761b0000/docs "dropdown-search.png")

```yaml
- type: query
  resource: mysql
  sqlType: select
  sql: >
    SELECT *
    FROM orders
    WHERE (LENGTH(:status) = 0 OR status = :status)
  params:
  - key: status
    label: 상태
    dropdown:
    - ''
    - in_bucket
    - paid
    - in_delivery
    - delivered
    - confirmed
```

## 자동완성 auto-complete 설정

### datalist

코드와 레이블 모두를 검색합니다.

![](https://imagedelivery.net/MHVC-FGTDyxApYeHyF29Tw/c09b6142-a4f0-49fd-9086-bfca015bfe00/docs "autocomplete-search.png")

```yaml
- path: properties/active
  blocks:
  - type: query
    resource: mysql.qa
    sqlType: select
    sql: >
      SELECT * 
      FROM properties 
      WHERE (LENGTH(:type) = 0 OR `type` = :type)
      ORDER BY id ASC 
      LIMIT 100
    params:
    - key: type
      label: 분류코드
      # 자동완성 설정
      datalist: 
      - value: A000
        label: 분류1
      - value: A002
        label: 분류2
```

### 데이터를 쿼리로 가져오기

![](https://imagedelivery.net/MHVC-FGTDyxApYeHyF29Tw/4d6c65d6-52ee-4389-d27d-023e0bf6e300/docs "datalist-from-query.png")

```yaml
- path: properties/active
  blocks:
  - type: query
    resource: mysql.qa
    sqlType: select
    sql: >
      SELECT * 
      FROM properties 
      WHERE (LENGTH(:type) = 0 OR `type` = :type)
      ORDER BY id ASC 
      LIMIT 100
    params:
    - key: type
      label: 분류코드
      datalist: true
      # 자동완성에 쓰는 데이터를 쿼리로 가져오기
      datalistFromQuery: 
        type: query
        resource: mysql.qa
        sql: SELECT DISTINCT `type` FROM properties
```

### 라디오 박스 radio box로 조건 검색

![](https://imagedelivery.net/MHVC-FGTDyxApYeHyF29Tw/43968a47-cf3c-4c02-7d35-9b85b1ce1e00/docs "radiobox-search.png")

```yaml
- path: orders-status
  blocks:
  - type: query
    resource: pgsql
    sqlType: select
    sql: >
      SELECT *
      FROM orders
      WHERE (LENGTH(:status) = 0 OR status = :status)
    params:
    - key: status
      label: 상태
      radio:
      - value: ''
        label: 전체
      - value: in_bucket
        label: 장바구니
      - value: paid
        label: 결제완료
      - value: in_delivery
        label: 배송중
      - value: delivered
        label: 배송완료
      - value: confirmed
        label: 구매확정
```

### 기본값 설정

```yaml
params:
- key: status
  label: 상태
  # 기본값 설정
  defaultValue: ALL
  radio:
  - value: ALL
    label: 전체
```

### 체크박스 checkbox로 조건 검색

**예제1**

![](https://imagedelivery.net/MHVC-FGTDyxApYeHyF29Tw/acd9bfe3-7f94-449d-2e7c-ccdfa38de400/docs "스크린샷 2023-01-06 오후 10.18.20.png")

```yaml
pages:
- path: featured-products
  blocks:
  - type: query
    resource: mysql.qa
    sqlType: select
    sql: > 
      SELECT * FROM products
      WHERE (LENGTH(:is_featured) = 0 OR is_featured = :is_featured) 
      ORDER BY id DESC LIMIT 100
    params:
    - key: is_featured
      label: 피처드
      checkbox:
        true: 1
        false: 0
      type: number
    columnOptions:
    - field: id
    - field: name
    - field: is_featured
```

**예제2**

checkbox와 {{query}}를 같이 사용할 때

![](https://imagedelivery.net/MHVC-FGTDyxApYeHyF29Tw/9dd5f012-3333-416e-3daa-48bb48032300/docs "checkbox-search.png")

true는 체크박스가 체크되었을 때의 값이고, false는 체크 해제되었을 때의 값입니다.

```yaml
pages:
- path: users
	blocks:
  - type: query
  	resource: mysql.qa
    sqlType: select
    sql: >
    	SELECT *
      FROM users
      WHERE {{query}}
      LIMIT 100
    params:
    - key: filter
      checkbox:
        true: WITHOUT
        false: WITH
        label: 사용자만
      defaultValue: WITHOUT
      query:
        WITH: 1=1
        WITHOUT: id NOT IN (1, 2, 3)
```

## 검색 조건에 날짜 기본값 넣기

데이터 조회 시 당일 또는 특정 기준의 날짜를 기본값으로 지정하고 싶을 때 유용합니다.

### defaultValueFromQuery

쿼리로 날짜 데이터 가져와서 기본값으로 넣는 방법입니다. 페이지 조회 시 1회 실행되며, sql 쿼리 결과의 첫번째 값 또는 AS value 값을 가져옵니다. 

```yaml
params:
- key: created_at
  defaultValueFromQuery:
    type: query
    resource: acme
    sql: SELECT date_format(now(), '%Y-%m-%d')
```

### defaultValueFn

자바스크립트(Javascript, JS)로 데이터를 가져와서 기본값으로 넣는 방법입니다. 

> 👍 
> 
> 현재 [moment](https://momentjs.com/), [Luxon](https://moment.github.io/luxon/#/?id=luxon) 을 기본으로 지원하고 있습니다.

```yaml
params:
- key: created_at
  defaultValueFn: |
    // return moment().add(3, 'days').format('YYYY-MM-DD')
    // return DateTime.now().toFormat('yyyy-MM-dd')
    return '2022-08-12'
```

> 📘 yaml 여러줄 입력 시 > 와 | 의 차이점
> 
> yaml에서 여러줄을 입력할 때는 `>` 와 `|` 모두 가능하지만 중요한 차이점이 있습니다. 
> 
> - `>` 는 줄바꿈 시 trim(문자열 양 끝의 공백이 제거)되기 때문에 줄 간 구분을 하기 위해서는 `;` 를 잘 써야합니다. 
> - `|` 는 trim 되지 않습니다.