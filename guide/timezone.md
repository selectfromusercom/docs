---
outline: deep
---

# 타임존(timezone) 가이드

MySQL 등 데이터베이스의 타임존과 옵션에 따라 셀렉트 어드민이 날짜/시간 데이터를 어떻게 표기하는지 안내드립니다.

- 별다른 옵션이 없는 경우, 로컬 타임존으로 표기
- formatFn: datetime 이용 시, 원본으로 표기
- formatFn: datetime-local 이용 시, 로컬 타임존으로 표기

## 예제 이미지와 YAML

해당 YAML을 자신의 어드민에 가져가서 테스트해볼 수 있어요. (resource와 sql 쿼리를 알맞게 수정해주세요.)

![](https://global.discourse-cdn.com/standard11/uploads/selectfromuser/original/1X/06cb2ab9d50acab26985ca5ec8125238a6c6dae6.png)

```yaml
pages:
- path: test/timezone
  blocks:
  - type: markdown
    content: |
      Asia/Seoul timezone에서 확인

      - 원본
      - 어드민 표시
      - formatFn: datetime/datetime-local

  - type: query
    resource: mysql1
    name: 디비가 UTC인 경우
    sqlType: select
    sql: >
      SELECT 
        @@global.time_zone AS 'global_timezone',
        @@session.time_zone AS 'session_timezone', 
        CONCAT('~', NOW(), '~') AS 'DB 원본값',
        NOW() AS '어드민 표시',
        NOW() AS 'datetime',
        NOW() AS 'datetime-local'
    columns:
      datetime:
        formatFn: datetime
      datetime-local:
        formatFn: datetime-local

  - type: query
    resource: mysql2
    name: 디비가 KST인 경우
    sqlType: select
    sql: >
      SELECT 
        @@global.time_zone AS 'global_timezone',
        @@session.time_zone AS 'session_timezone',
        CONCAT('~', NOW(), '~') AS 'DB 원본값',
        NOW() AS '어드민 표시',
        NOW() AS 'datetime',
        NOW() AS 'datetime-local'
    columns:
      datetime:
        formatFn: datetime
      datetime-local:
        formatFn: datetime-local
```