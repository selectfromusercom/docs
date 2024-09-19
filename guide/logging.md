---
outline: deep
---

# 로깅

셀렉트 클라우드 서비스에서는 기본적인 쿼리, 사용자 활동, 감사 로그를 지원하고 있습니다. 

## 쿼리 로그

모니터링, 에러 로그 메뉴에서 오류 쿼리나 슬로우 쿼리(slow query) 등을 살펴보고 어드민을 개선하는데 참고해보세요. 

아래와 같은 상황에서 유용합니다.

- 작성한 쿼리가 잘 작동하는지 확인하고 싶을 때 (쿼리 오류, 에러를 발견)
- 쿼리 실행 시간을 확인하고 느린 쿼리를 찾고 싶을 때

## 모니터링

SQL 쿼리, API(준비중), 사용자 활동을 모니터링할 수 있습니다. 

![](https://imagedelivery.net/MHVC-FGTDyxApYeHyF29Tw/0ef78cb0-3276-4b7b-56ff-17aec297a500/docs)

## 에러 로그

페이지의 쿼리들이 전체적으로 문제가 없는지 확인할 수 있습니다.

![](https://imagedelivery.net/MHVC-FGTDyxApYeHyF29Tw/32f5ccf4-249f-4784-bcda-a3a263f8e200/docs)

## 감사 로그

계정/권한그룹 메뉴에서 어떤 계정이나 권한이 추가, 변경되었는지 로그를 확인할 수 있습니다.

**검색 지원 필터**

개별 로그의 링크를 눌러 필터링할 수 있고 직접 필터를 입력할 수도 있습니다. 

`key:value` 형태로 띄어쓰기 없이 입력해주세요. 2개 이상의 key를 사용할 때는 띄어쓰기로 구분해주세요.

- `created` 로그 생성일
- `action_target_id` 설정 대상의 ID
- `actor_id` 설정한 사람의 ID

**예제**

- `created:2023-10-05 actor_id:1000 action_target_id:2100`
- `created:2023-10-05..2023-11-05` (2023년 10월 5일~2023년 11월 5일)


![](https://imagedelivery.net/MHVC-FGTDyxApYeHyF29Tw/22b4eab7-9b35-4229-8a7f-414d43800600/docs)

## 슬랙으로 로그 남기기

상세한 내용은 개별 안내 중입니다. support@selectfromuser.com 으로 문의바랍니다.

담당자 액션 로그는 중요합니다. UPDATE/INSERT 쿼리가 남아야하며, 실행 당시의 사용자정보와 권한을 기록으로 남겨야 합니다.  

클라우드에서는 기본적으로 로그옵션이 꺼짐(OFF) 상태입니다. 

```yaml
sql: >
  UPDATE test 
  SET state = :state 
  WHERE id = :id LIMIT 1
logOptions:
  logAfterSubmit: true
  useSlack: true
  name: test.state.updated
  message: {{ username }}: 테스트 상태 변경 {{ before.state }} {{ after.state }}
  useCloudStorage: false
```