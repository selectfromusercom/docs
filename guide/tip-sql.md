---
outline: deep
---

# SQL 조건문 팁

이 페이지의 내용은 MySQL 기준으로 작성했습니다.  
PostgreSQL와 다른 데이터베이스 쿼리의 경우 별도 표시를 해두었습니다.

> 📘 
> 
> 셀렉트는 Bind Parameter / Prepared Statements를 기본으로 합니다.

SQL 보안을 위해 번거롭더라도 원본 raw query 입력을 원칙적으로 막고 있습니다.  
인가된 사용자만 어드민 시스템을 이용한다고 하더라도 동일 네트워크상 세션탈취나 기타 물리적인 침입/침해를 막기 위해 보안 가이드라인을 제공하고 있습니다.

> 더 향상된 보안을 위해 Enterprise 플랜에서는 general query log의 anomaly scoring을 제공합니다.

## 검색조건 필수

빈칸이면 결과물 없음

```sql
SELECT *
FROM users
WHERE name = :name
```

## 검색조건 옵션

CASE-WHEN 활용

```sql
SELECT *
FROM users
WHERE status = 'active'
  AND CASE
    WHEN LENGTH(:name) THEN name = :name
    ELSE 1=1
  END
```

빈칸이면 해당 조건 없이 결과물 표시

```sql
SELECT *
FROM users
WHERE status = 'active'
  AND (!LENGTH(:name) OR name = :name)
```

PostgreSQL: 빈칸이면 해당 조건 없이 결과물 표시

```sql
SELECT *
FROM users
WHERE status = 'active'
  AND (LENGTH(:name) = 0 OR name = :name)
```

## 검색조건 LIKE

MySQL

```sql
SELECT *
FROM users
WHERE name LIKE CONCAT('%', :name, '%')
```

PostgreSQL: 타입 지정 필요

```sql
SELECT *
FROM users
WHERE name LIKE CONCAT('%', :name::text, '%')
```

## 검색조건에 따른 쿼리입력

types 값에 해당하는 쿼리가 안전하게 bind 됩니다.

```yaml
sql: >
  SELECT * 
  FROM properties 
  WHERE name LIKE CONCAT('%', :name, '%') 
    AND {{query}}
  LIMIT 1000
params:
- key: name
  label: 숙소명
- key: types
  label: 숙소타입
  query:
    '': >
      `type` = :types
    'HOTEL': >
      `type` = 'HOTEL'
    'NON HOTEL': >
      `type` IN ('GUESTHOUSE', 'BNB')
```

types에 NON HOTEL 값이 들어가는 경우 실제 실행 쿼리는 다음과 같습니다.

```sql
SELECT * 
  FROM properties 
  WHERE name LIKE CONCAT('%', :name, '%') 
    AND `type` IN ('GUESTHOUSE', 'BNB') AND 1=1
  LIMIT 1000
```

## 검색조건에 따른 쿼리 정렬

```yaml
pages:
  - path: property/list
    blocks:
    - type: query
      resource: mysql
      name: 업체목록
      sqlType: select
      sql: >
        SELECT *
        FROM property
        {{ orderBy }}
        LIMIT 100
      params:
        - key: orderby
          label: 정렬
          defaultValue: 최근가입순
          dropdownSize: 2
          dropdown:
            - 최근가입순
            - 오래된가입순
          orderBy:
            '최근가입순': ORDER BY id DESC
            '오래된가입순': ORDER BY id ASC
```

## 날짜 검색조건 기본값

CASE-WHEN 활용

```sql
SELECT 
  id, active, name, email, created_at, last_updated, trial_expiry_date	
FROM s_users
WHERE CASE WHEN LENGTH(:user_id) THEN id = :user_id ELSE 1=1 END
  AND CASE WHEN LENGTH(:user_name) THEN name LIKE CONCAT('%', :user_name, '%') ELSE 1=1 END
  AND CASE WHEN LENGTH(:signed_up) THEN created_at >= GREATEST('2000-01-01', :signed_up) ELSE 1=1 END
```

위와 동일 합니다.

```sql
SELECT 
  id, active, name, email, created_at, last_updated, trial_expiry_date	
FROM s_users
WHERE (!LENGTH(:user_id) OR id = :user_id)
  AND (!LENGTH(:user_name) OR name LIKE CONCAT('%', :user_name, '%'))
  AND (!LENGTH(:signed_up) OR created_at >= GREATEST('2000-01-01', :signed_up))
```

## 여러 항목 UPDATE

number는 Number 숫자로 escape하여 들어갑니다.  
user_ids는 Array/List로 각 항목을 알맞게 escape하여 들어갑니다.

```yaml
pages:
- path: customer/support
  blocks:
    - type: query
      resource: mysql
      sqlType: select
      sql: >
        SELECT 
          id AS '고객ID', 
          active AS '활성', name AS '이름', email AS '이메일', 
          created_at AS '생성일', last_updated AS '최근수정일', 
          trial_expiry_date AS '만료일'	
        FROM s_users
        
      selectOptions:
        enabled: true
        selectionText: 건 선택됨
        clearSelectionText: 취소
        selectOnCheckboxOnly: true
        disableSelectInfo: true   

      actions:
        - label: 만료일 연장
          type: query
          resource: mysql
          sql: >
            UPDATE s_users 
              SET trial_expiry_date = NOW() + INTERVAL :number DAY 
            WHERE id IN (:user_ids)
          valueFromSelectedRowsAs: 고객ID
          params:
            - key: number
              label: 만료일 연장 (D+1)
              dropdown:
                - 1
                - 4
                - 7
                - 14 
              required: true
            - key: user_ids
              valueFromSelectedRows: true
              valueFromSelectedRowsAs: 고객ID
```

## 검색조건 IN

비어있는 IN ()으로 에러가 나는 경우 빈값 IN ('', :tags) 또는 IN (0, :ids)을 넣습니다.

```yaml
- path: stock-a/return
  blocks:
  - type: query
    resource: mysql.qa
    sqlType: select
    sql: >
      SELECT name FROM test_10k 
      WHERE name IN ('', :tag) 
      LIMIT 100
    params:
    - key: tag
      label: Tag
      datalist: true
      datalistLength: 5
      datalistFromQuery: 
        type: query
        resource: mysql.qa
        sqlType: select
        sql: SELECT DISTINCT name FROM test_10k LIMIT 10
```

PostgreSQL 문법은 차이가 있습니다. 아래 문서를 참고해주세요.  
계속 업데이트 중입니다. 궁금하신 점은 문의바랍니다.