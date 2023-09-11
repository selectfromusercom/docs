---
outline: deep
---

# 테이블 필드 이름 바꾸기

## 필드 지정하지 않은 경우

SQL 쿼리 결과의 컬럼들이 모두 표시됩니다.

```yaml
- path: properties/active
  blocks:
  - type: query
    resource: mysql.qa
    sqlType: select
    sql: SELECT * FROM properties ORDER BY id ASC LIMIT 100
```

![](https://files.readme.io/1c87474-basic-table.png "basic-table.png")

## 필드 지정한 경우

쿼리 결과에서 지정한 필드만 표시됩니다.

```text
- path: properties/active
  blocks:
  - type: query
    resource: mysql.qa
    sqlType: select
    sql: SELECT * FROM properties ORDER BY id ASC LIMIT 100
    # 필드 지정
    columnOptions:
    - field: id
    - field: name
    - field: address
```

![](https://files.readme.io/077df78-columnoptions.png "columnoptions.png")

## 필드를 지정하고 레이블 입력

```yaml
- path: properties/active
  blocks:
  - type: query
    resource: mysql.qa
    sqlType: select
    sql: SELECT * FROM properties ORDER BY id ASC LIMIT 100
    columnOptions:
    - field: id
    - field: name
      # 레이블 입력
      label: 업체명
    - field: address
      label: 주소
```

![](https://files.readme.io/a09972f-columnoptions-label.png "columnoptions-label.png")

## 전체 필드에서 일부만 바꾸고싶은 경우

전체 표시하고 옵션이 추가로 부분적으로 적용됩니다.

```yaml
- path: properties/active
  blocks:
  - type: query
    resource: mysql.qa
    sqlType: select
    sql: SELECT *  FROM properties ORDER BY id ASC LIMIT 100
    # 전체 표시 + 일부 필드만 설정
    columnOptionsAppend: true
    columnOptions:
    - field: id
    - field: name
      label: 업체명
    - field: address
```

![](https://files.readme.io/d707a5b-columnoptions-append.png "columnoptions-append.png")

## 숫자로 정렬이 안되요.

`columnOptions` 또는 `columns`를 사용하면 `field` 의 기본 데이터 형식이 `text`가 되서 정렬 방식이 달라질 수 있습니다. 해당 데이터를 숫자로 처리하고 싶으시다면 `type: number` 를 추가해주세요. 

```yaml
columnOptions:
- field: id
  type: number
```

```yaml YAML
columns:
  id:
    type: number
```