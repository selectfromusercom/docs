---
outline: deep
---

# PostgreSQL 유의사항

## 검색 조건 설정 시

대부분은 `:pid` 형태로 작동하지만 일부 조건의 경우  
`:pid::int` 또는 `:status::text` 로 쿼리에 표시를 하여 **타입 명시**가 필요합니다.  
쿼리 에러가 발생하고 있다면 아래의 내용을 확인해주세요.

```yaml
sql: >
  SELECT *
  FROM payments
  WHERE LENGTH(:pid) = 0 OR product_id = (0 || :pid)::int
params:
- key: pid
```

## 선택 옵션 설정 시

여러개 값인 경우 `:ids` 가 아닌 `:...ids` 로 명시가 필요합니다.

```yaml
- type: query
  label: 메모
  resource: mysql.qa
  sqlType: update
  sql: >
    UPDATE customer 
    SET memo = :memo
    WHERE id IN (0, :...ids)
  params:
  - key: ids
    valueFromSelectedRows: true
    valueFromSelectedRowsAs: id
  - key: memo
    valueFromPrompt: true
```

## 날짜 데이터 설정 시

셀렉트에서 날짜 데이터 포맷의 input이 없을 때는 빈값('')으로 처리하기 때문에 Postgres 이용 시 type check로 에러가 발생할 수 있습니다. 

> 에러 예시: `Server Error: invalid input syntax for type date: ""`

이 때 COALESCE 함수를 통해 빈값('')을 `null`로 처리하면 문제가 해결됩니다. 

```yaml
pages:
- path: postgres-length-date
  blocks:
  - type: query
    resource: pgsql.qa 
    sqlType: select 
    sql: >
      SELECT *
      FROM orders 
      WHERE (LENGTH(:dateFromTo1)=0 OR created_at >= COALESCE(:dateFromTo1, null)::date)
      AND (LENGTH(:dateFromTo2)=0 OR created_at < COALESCE(:dateFromTo2, null)::date)
      ORDER BY id DESC 
      LIMIT 10 
    params: 
      - key: dateFromTo
        format: date 
        range: true 
```