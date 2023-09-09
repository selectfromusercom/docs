---
outline: deep
---

# 여러 데이터베이스 JOIN

## 데이터베이스끼리 JOIN

### 왜 필요한가요?

JOIN 조인 쿼리는 두개 이상의 테이블 조회를 할때 이용합니다.  
일반적으로 같은 물리적 데이터베이스내에 JOIN은 쿼리로 바로 가능하지만  
서로 다른 (물리적으로 분리된) 데이터베이스끼리 JOIN을 하기 위해서는  
직접 서버코드를 개발하거나 Google BigQuery등을 이용해야합니다.  
셀렉트 어드민에서는 간단한 설정으로 그 역할을 대신해줍니다.

> 📘 같은 서버, 여러개 디비 이용하기
> 
> 여러개 디비(database name)을 동시에 이용하려면 리소스 설정시 database: 빈칸으로 추가후 아래와 같이 [데이터베이스명].[테이블명] 으로 쿼리하면 됩니다.  
> ex: ysg.service, ysg.promotion

### 어떤 케이스를 해결하나요?

- MySQL + PostgreSQL 테이블을 조인
- MySQL + SQL Server 테이블을 조인
- MySQL + MySQL 서로 다른 인스턴스를 조인
- MySQL + Google Spreadsheet를 조인

#### 사용 방법 1: FULL JOIN

모든 쿼리 내용을 가져와서 최종 취합이 필요한 경우 (GROUP BY, SUM)

```yaml
- path: user/join-query
  blocks:
    - type: query
      resource: sqlWith

      sqlWith:
      - name: p1
        resource: mysql.qa # 서비스 디비
        query: >
          SELECT id, team_id, created_at FROM TeamLog

      - name: p2
        resource: mysql # 파트너 디비
        query: >
          SELECT id, name FROM property
      
      sqlType: select
      sql: >
        SELECT 
          p2.name AS `Name`,
          COUNT(p1.id) AS `Count`
        FROM p1, p2
        WHERE p1.team_id = p2.id
        GROUP BY p2.name
```

- mysql.qa 와 mysql 두개의 리소스를 셀렉트 어드민에 연결합니다.
- sqlWith 구문을 추가합니다.
- name 에 해당하는 테이블로 쿼리 결과가 저장됩니다.
- 최종적으로 sql 에 캐시 테이블 p1, p2 를 원하는 방법으로 쿼리합니다.

![](https://files.readme.io/8c512fc-inter-db.png "inter-db.png")

#### 사용 방법 2: INNER JOIN (ID 매칭)

최소한의 쿼리를 가져와서 원하는 결과물을 만드는 경우 (SELECT)

```yaml
- path: user/id-projection
  blocks:
    - type: query
      resource: sqlWith

      sqlWith:
      - name: p1
        resource: mysql.qa
        query: >
          SELECT * FROM properties_copy
          WHERE :type2 = 'ALL' OR type2 = :type2

      - name: p2
        resource: pgsql
        query: >
          SELECT * FROM properties
          WHERE id IN (:...ids)
        params:
        - key: ids
          valueFromQuery: 
            resource: sqlWith
            sql: SELECT id FROM p1
            defaultValue: 1
      
      sqlType: select
      sql: >
        SELECT 
          p1.id, 
          p1.name AS `mysql name`, 
          p2.name AS `pgsql name`
        FROM p1 LEFT JOIN p2 ON p1.id = p2.id
      
      params:
      - key: type2
        label: mysql db 기준 필터링 (업체분류)
        dropdown:
        - HOTEL
        - ALL
```

- mysql.qa 와 pgsql 두개의 리소스를 셀렉트 어드민에 연결합니다.
- sqlWith 구문을 추가합니다.
- p1 에 해당하는 쿼리 결과가 캐시 테이블에 저장됩니다.
- p2 쿼리에 필요한 ids 를 쿼리하여 파라메터를 준비합니다.
- p2 에 해당하는 쿼리 결과가 캐시 테이블에 저장됩니다.
- 최종적으로 sql 에 캐시 테이블 p1, p2 를 원하는 방법으로 쿼리합니다.

![](https://files.readme.io/17fceb5-inter-db2.png "inter-db2.png")

### 제약 조건

- 팀당 100MB 캐시 테이블 공간을 제공 (요청시 증설 가능)
- 캐시(temporary table)은 schemeless 생성되지만 일반적인 JS로 표현가능한 데이터 타입 지원
- 캐시 테이블내 쿼리는 in-memory로 제공되어 성능 최적화 (인덱싱) 불필요
- 캐시 테이블은 zero-persistent 저장하지 않음 (개인정보 보호, 제3자 제공 및 위탁에 미해당 — 검토중)
- 일반적인 SQL 문법을 지원합니다. (SQL-99)

## 구글시트(Google sheet)와 데이터베이스 JOIN

### 왜 필요한가요?

Google Spreadsheet(구글시트)를 데이터베이스 테이블과 조인하려면 양쪽의 데이터중 하나를 선택하여 한쪽으로 통합하는 작업이 필요합니다.  
구글시트를 데이터베이스 테이블에 insert(import)하여 쿼리로 JOIN을 하거나  
데이터베이스 테이블을 csv export, 엑셀에 import하여 엑셀로 vlookup등 원하는 결과물을 만듭니다.  
이 경우 일회성 작업에 해당하므로 한쪽의 데이터가 바뀌는 경우 매번 새롭게 작업을 해야하므로  
직접 추가개발을 하는 경우가 있습니다.  
셀렉트 어드민에서는 간단한 설정으로 그 역할을 대신해줍니다.

### 어떤 케이스를 해결하나요?

- 구글시트에 있는 영업목표와 실제 서비스 데이터를 조인
- 구글시트에 있는 고객로그와 실제 서비스 사용량을 조인
- 실제 서비스 분류와 구글시트 분류를 비교 분석을 위한 조인

#### 사용 방법 1: FULL JOIN

```yaml
- path: coupon/join
  blocks:
    - type: query
      sqlWith:
      - resource: mysql.qa
        query: >
          SELECT * FROM properties
          WHERE name LIKE CONCAT('%', :filter_db_name, '%') 
          LIMIT 10
        name: p1
      - resource: gsheet
        id: 1apTE02Gd48cSYwichEaKC017S23mUDdhXsgSn2avDOI
        name: p2
      resource: sqlWith
      sqlType: select
      sql: >
        SELECT 
          p1.id, 
          p1.name AS `db name`, 
          p2.name AS `sheet name`, 
          p2.memo, p2.`코드`
        FROM p1 LEFT JOIN p2 ON p1.id = p2.id
        WHERE LENGTH(:filter_sheet_code) = 0 OR (p2.`코드` = :filter_sheet_code)
      params:
      - key: filter_db_name
      - key: filter_sheet_code
```

- 셀렉트 어드민에 데이터베이스를 연결합니다. 
- 셀렉트 어드민에 연결할 구글 시트 아이디를 입력합니다. 

![](https://files.readme.io/d3552d7-sheet-url.png "sheet-url.png")    

- 데이터베이스 결과는 p1 임시 테이블에 저장됩니다.
- 구글시트 내용은 p2 임시 테이블에 자동 불러오기 됩니다.
- sql 에서 원하는 쿼리를 입력하면 결과가 표시됩니다.

![](https://files.readme.io/acd45e1-sheet-join.png "sheet-join.png")        

### 제약조건

- 구글 서비스 문제나 응답지연이 있는 경우 쿼리 결과물이 늦어지거나, 표시가 안될 수 있습니다. (셀렉트에서 데이터를 저장, 보관하지 않습니다)
- 대량의 데이터와 테이블을 JOIN하여 내부 테스트를 하였으나 구글시트내 데이터표현 방식으로 오류가 표시될 수 있습니다.