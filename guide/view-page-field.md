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

![](https://imagedelivery.net/MHVC-FGTDyxApYeHyF29Tw/13022d8a-11ff-4b40-651f-dfacc3bad000/docs "basic-table.png")

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

![](https://imagedelivery.net/MHVC-FGTDyxApYeHyF29Tw/ac700337-5c0d-479d-7378-df8146309700/docs "columnoptions.png")

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

![](https://imagedelivery.net/MHVC-FGTDyxApYeHyF29Tw/b8a0cc69-4edb-46e4-4f33-aff202ee0f00/docs "columnoptions-label.png")

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

![](https://imagedelivery.net/MHVC-FGTDyxApYeHyF29Tw/a03c27b5-b48f-45b7-5731-b6704c8a4400/docs "columnoptions-append.png")

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