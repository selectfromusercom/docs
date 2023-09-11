---
outline: deep
---

# 로깅

## 쿼리 로그

셀렉트 클라우드 서비스에서는 기본적인 쿼리 로그를 지원하고 있습니다. 오류 쿼리나 슬로우 쿼리(slow query) 등을 살펴보고 어드민을 개선하는데 참고해보세요. 

아래와 같은 상황에서 유용합니다.

- 작성한 쿼리가 잘 작동하는지 확인하고 싶을 때 (쿼리 오류, 에러를 발견)
- 쿼리 실행 시간을 확인하고 느린 쿼리를 찾고 싶을 때

![](https://imagedelivery.net/MHVC-FGTDyxApYeHyF29Tw/8bd78683-517a-4570-f27e-e53108db7d00/docs "logging.png")

## (준비중) 슬랙으로 로그 남기기

상세한 내용은 개별 안내 중입니다. 문의바랍니다.

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

## (준비중) 접근로그 확인하기

준비중인 엔터프라이즈 기능입니다. [support@selectfromuser.com](mailto:support@selectfromuser.com) 으로 문의주시면 자세히 안내드리겠습니다.