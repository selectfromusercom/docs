---
outline: deep
---

# 테이블 페이지네이션

## 간단하게 페이지에 적용하기

적용하고 싶은 페이지를 확인합니다.

```yaml
- path: properties/active
  blocks:
  - type: query
    resource: mysql.qa
    sqlType: select
    sql: SELECT * FROM properties ORDER BY id ASC LIMIT 100
```

이와 같이 옵션을 추가합니다.

```yaml
- path: properties/active
  blocks:
  - type: query
    resource: mysql.qa
    sqlType: select
    sql: SELECT * FROM properties ORDER BY id ASC LIMIT 100
    
    # pagination 페이지네이션 설정
    paginationOptions:
      enabled: true
      perPage: 10
```

## 결과 페이지

![](https://files.readme.io/33255ae-pagination-img.png "pagination-img.png")

## 기본 페이지 수 조절하기

```yaml
paginationOptions:
  enabled: true
  perPage: 100
```

## 페이지 단위 조절하기

```yaml
paginationOptions:
  enabled: true
  perPage: 10
  perPageDropdown:
  - 10
  - 50
  - 100
```

### perPage 적용 결과

페이지당 행(row) 개수 기본값

![](https://files.readme.io/2c0d8d2-per-page-img.png "per-page-img.png")

### perPageDropdown 적용 결과

![](https://files.readme.io/703f11c-pagination-dropdown.png "pagination-dropdown.png")

## 서버 사이드 페이지네이션(server-side pagination)도 가능한가요?

네, 기존 paginationOptions와 함께 sqlTotal, mode 값을 설정하면 서버 사이드 페이지네이션을 적용할 수 있습니다. 

서버 사이드 옵션을 추가하시더라도, 대량의 데이터를 조회하시는 경우 조회 페이지가 정상 작동하지 않을 수 있으니, 쿼리 limit 이나 params 등으로 제한을 걸어주시는 것을 권장합니다.

```yaml
menus:
- path: pagination
  name: pagination
pages:
- path: pagination
  blocks:
  - type: query
    resource: mysql.qa
    sqlType: select
    sql: > 
      SELECT * FROM test_10k 
      WHERE LENGTH(:name) = 0 OR name LIKE CONCAT('%', :name, '%')
      LIMIT :page_offset, :page_limit
    sqlTotal: >
      SELECT COUNT(id) FROM test_10k 
      WHERE LENGTH(:name) = 0 OR name LIKE CONCAT('%', :name, '%')
    mode: remote
    paginationOptions:
      enabled: true
      perPage: 10
    params:
    - key: name
```