---
outline: deep
---

# 복수의 데이터 추가, 수정
여러개의 데이터 처리를 연속적으로 트랜잭션 처리할 수 있습니다.

다음과 같은 상황에서 이용할 수 있습니다. 

- 여러개 INSERT가 필요한 경우
- INSERT와 UPDATE를 동시에 안전하게 처리하는 경우
- 여러개 데이터베이스에 INSERT, UPDATE를 동시에 안전하게 처리하는 경우

셀렉트는 데이터베이스 자체의 트랜잭션 기능을 활용하여 제공합니다. (BEGIN, ROLLBACK, COMMIT)

## INSERT 2건을 동시에

mysql 데이터베이스에 한쪽 테이블에 INSERT 실행 후 다른 테이블에 INSERT 합니다.  
한 개의 쿼리라도 실패하는 경우 모두 롤백됩니다.

```yaml
menus:
- path: test/transaction
  name: 트랜잭션 테스트

pages:
- path: test/transaction
  blocks:
  - type: query
    sqlType: update
    # 연속 실행
    resource: sqlTransaction
    sqlTransaction:
    - resource: mysql
      sql: INSERT INTO test_transaction1 SET name = 'hello'
    - resource: mysql 
      sql: INSERT INTO test_transaction2 SET name = 'hello'
```

## INSERT+UPDATE 2건을 동시에

입력값 status로 mysql 데이터베이스에 INSERT하고 UPDATE 합니다.  
한 개의 쿼리라도 실패하는 경우 모두 롤백됩니다.

```yaml
menus:
- path: test/transaction
  name: 트랜잭션 테스트

pages:
- path: test/transaction
  blocks:
  - type: query
    sqlType: update
    # 연속 실행 (insert + update)
    resource: sqlTransaction
    sqlTransaction:
    - resource: mysql
      sql: INSERT INTO test_transaction1 SET status = :status
    - resource: mysql 
      sql: UPDATE test_transaction2 SET status = :status WHERE id = 1000
    params:
    - key: status
      label: 상태코드 4자리
```

## 서로 다른 데이터베이스간 트랜잭션 묶기

mysql 데이터베이스에 업데이트 후, crm 데이터베이스에 내역을 추가합니다.

```yaml
menus:
- path: test/transaction
  name: 트랜잭션 테스트
pages:
- path: test/transaction
  blocks:
  - type: query
    sqlType: update
    resource: sqlTransaction
    sqlTransaction:
    # for database
    - resource: mysql
      sql: UPDATE test_transaction1 SET name = :name WHERE id = 2
    # for crm
    - resource: crm
      sql: INSERT INTO test_transaction SET name = 'crm3'
    params:
    - key: name
```

예를 들어 2개의 데이터베이스 (A,B)에 쿼리를 하여 A’ → B’ → A’’ → B’’ 실행 후 B'' 가 실패하는 경우  
모든 실행된 A’, B’, A’’ 가 롤백됩니다.  
모두 성공하는경우 B → A 순서로 커밋됩니다.

> 📘 
> 
> Redis 트랜잭션은 아직 지원하지 않습니다.  
> SQL와 API를 동시에 처리하는 트랜잭션은 비공개 베타 테스트 중입니다. 문의바랍니다.  
> 같은 디비 내에서 여러개 트랜잭션을 이용하는 경우 deadlock/lockwait 관련 주의가 필요합니다. 개발 담당자의 쿼리 검토가 필요합니다.

## Actions에서 다수 Update 쿼리 호출 방법

**update 쿼리 트랜잭션 안쓰고 실행**

```yaml
pages:
- path: pages/8MwfvW
  title: actions update 쿼리 실행
  blocks:
  - type: query
    resource: mysql.qa
    sqlType: select
    sql: >
      SELECT id FROM stock_wine WHERE id > 10 ORDER BY id ASC LIMIT 5
    selectOptions: 
      enabled: true
    actions:
    - label: 승인
      name: 승인
      type: query
      resource: mysql.qa
      confirmText: 승인하시겠어요?
      sqlType: update
      sql: >
        UPDATE stock_wine SET unit = 3 WHERE id = :id;
        UPDATE stock_wine SET unit = 3 WHERE id = 1 + :id;
      params:
      - key: id
        valueFromSelectedRows: id
```

**actions sql transaction**
만약에 실패하는경우 롤백됩니다. (꼭 커밋을 해야합니다.)

```yaml
      sql: >
        START TRANSACTION;
        
        UPDATE stock_wine SET unit = 5 WHERE id = :id;
        UPDATE stock_wine SET unit = 5 WHERE id = 1 + :id;
        
        COMMIT;
```

## SQL query, API 트리거 실행

requestSubmitFn 기능으로 Javascript를 통해 2개의 블록(query, http)을 엮어서 trigger 실행할 수 있어요.

아래는 query 블록의 submitButton을 숨기고, http (api) 블록 실행 시 query 블록을 trigger로 하는 예제입니다.

```yaml
pages:
- path: api-trigger
  blocks:
  - type: query
    resource: mysql.qa
    sqlType: update
    id: query1 # requestSubmitFn에서 사용
    sql: >
      UPDATE wine_stock SET safeflow = :safeflow
      WHERE id = :id
    params:
      - key: id
      - key: safeflow
        help: 안전재고
    # 버튼 숨기기/비활성화
    submitButton: 
      hidden: true
      disabled: true
    toast: DB 업데이트 완료
    
  - type: http
    axios:
      method: POST
      url: https://api.selectfromuser.com/sample-api/tags
      data:
        memo: ${{memo}}
    params:
      - key: memo
        help: 메모 100자
    # 반드시 순차실행이 필요하면 await 사용
    requestSubmitFn: |
      const result1 = await query1.trigger() 
      console.log('query1 result:', result1) // console.log로 확인 가능

      if (result1.message != 'ok') {
        throw new Error('디비 업데이트 실패')
      }
      // 진행
    toast: API 업데이트 완료
```