---
outline: deep
---

# Redis 사용법

이 문서는 셀렉트어드민에서 Redis를 활용하여 데이터를 관리하고 조작하는 방법과 예제를 제공합니다.

## 기본 개념

Redis는 고성능의 키-값 저장소로, 셀렉트어드민에서 데이터의 조회, 삽입, 업데이트에 활용할 수 있습니다. 

### 필수 구성 요소

**`resource`**
- Redis 서버와 연결하기 위해 resource를 설정해야 합니다.
- 이 값은 셀렉트어드민에서 미리 설정된 Redis 데이터 소스를 참조합니다.
- 예: redis-cloud, redis-local

```yaml
resource: redis-cloud
```

**`commands`**
- Redis 명령어를 정의하는 필수 항목입니다.
- Redis CLI 명령어와 동일한 문법을 사용하며, SET, GET, DEL, INCR 등 다양한 작업을 정의할 수 있습니다.

```yaml
commands:
  - SET key_name "value"
  - GET key_name
```

**`sqlType`**
- Redis와의 작업 유형을 지정합니다.
- 일반적으로 select, update, delete 중 하나로 설정합니다.

```yaml
sqlType: update
```

## Redis 예제

### Redis 키-값 설정 및 조회, 삭제

가장 단순한 Redis 사용 예제로, 키-값을 설정하고 조회하고 삭제하는 방법입니다. 각각의 작업 후 조회 쿼리를 추가하여 데이터 상태를 확인합니다.

```yaml
menus:
- path: simple-redis
  name: simple-redis

pages:
- path: simple-redis
  blocks:
  - type: query
    resource: redis-cloud
    sqlType: update
    commands:
      - SET example_key "example_value"
    name: 기본 키 설정
    toast: example_key가 설정되었습니다.

  - type: query
    resource: redis-cloud
    sqlType: select
    commands:
      - GET example_key
    name: 키 설정 후 조회
    toast: example_key 조회 성공.  

  - type: query
    resource: redis-cloud
    sqlType: delete
    commands:
      - DEL example_key
    name: 키 삭제
    toast: example_key가 삭제되었습니다.
```

### Redis 트랜잭션을 활용한 키-값 조회

이 예제는 트랜잭션을 사용하여 Redis의 여러 키를 원자적으로 조회하는 방법을 보여줍니다.

```yaml
menus:
- path: test-redis
  name: test-redis

pages:
- path: test-redis
  blocks:
  - type: query
    resource: redis-cloud
    sqlType: select
    commands:
      - MULTI
      - INCR orders:view
      - GET orders:view
      - GET orders:count
      - GET "{{name}}}}
      - EXEC
    name: Redis 트랜잭션 조회
    params:
    - key: name
      value: orders
    responseFn: |
      rows[0].name = 'orders:view';
      rows[1].name = 'orders:count';
    toast: 트랜잭션이 성공적으로 실행되었습니다
```

### Redis와 MySQL 데이터 동기화

Redis와 MySQL을 연계하여 데이터를 동기화하는 방법입니다. MySQL과 Redis의 상태를 확인하기 위해 각각 조회 블록을 추가했습니다.

```yaml
menus:
- path: redis-mysql-sync
  name: redis-mysql-sync
  group: redis

pages:
- path: redis-mysql-sync
  blocks:
  - type: query
    resource: mysql.qa
    sqlType: insert
    sql: |
      INSERT INTO properties (created_at, name) VALUES (NOW(), :name);
    params:
      - key: name
        label: 이름
        required: true
    requestSubmitFn: |
      const redisResult = await redisQuery.trigger();
      if (redisResult.message !== 'ok') {
        throw new Error('Redis 업데이트 실패');
      }
    toast: MySQL과 Redis 동기화 성공
    reloadAfterSubmit: true

  - type: query
    resource: redis-cloud
    sqlType: insert
    commands:
      - SET sync_key "{{name}}"
      - INCR sync_counter
    id: redisQuery
    params:
      - key: name
        label: Redis 키 값
        required: true
    hidden: true

  - type: query
    resource: mysql.qa
    sqlType: select
    sql: |
      SELECT * FROM properties ORDER BY created_at DESC LIMIT 1;
    name: MySQL 데이터 조회
    toast: MySQL 상태 확인 성공

  - type: query
    resource: redis-cloud
    sqlType: select
    commands:
      - GET sync_key
      - GET sync_counter
    name: Redis 데이터 조회
    toast: Redis 상태 확인 성공
```

## 기타

이외 참고자료는 아래에서 확인하실 수 있습니다. 

- [Redis 사용 샘플](https://ask.selectfromuser.com/t/redis/65)
- [requestFn에서 redis 함께 사용하기](https://ask.selectfromuser.com/t/requestfn/78)

추가로 도움이 필요하신 경우 [커뮤니티](https://ask.selectfromuser.com/) 또는 [이메일](mailto:support@selectfromuser.com) 등으로 문의주시기 바랍니다.