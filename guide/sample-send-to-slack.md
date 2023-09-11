---
outline: deep
---

# 슬랙에 메시지 보내기

데이터베이스 또는 API로부터 받은 정보를 슬랙 Slack에 메시지로 보낼 수 있습니다.

## 슬랙 incoming webhook으로 메시지 보내기

셀렉트 어드민에서 http api 블록을 통해, 슬랙으로 데이터를 보낼 수 있습니다. 별도의 복사/붙여넣기 작업을 할 필요없이 특정 주문이나 고객에 대한 정보를 슬랙으로 편리하게 보내보세요. 

![](https://imagedelivery.net/MHVC-FGTDyxApYeHyF29Tw/fc8d6fd6-a289-4987-f8ab-bd446daaa300/docs "send-to-slack.png")

![](https://imagedelivery.net/MHVC-FGTDyxApYeHyF29Tw/6787853b-35c0-49e9-b298-3a31105df500/docs "send-to-slack-result.png")

### 일반적인 방법

슬랙 수신 웹훅(incoming webhook)에 대한 자세한 내용은 [여기서 확인](https://slack.com/intl/ko-kr/help/articles/115005265063-Slack%EC%9A%A9-%EC%88%98%EC%8B%A0-%EC%9B%B9%ED%9B%84%ED%81%AC)하실 수 있어요.

```yaml
menus:
- path: send-to-slack
  name: 슬랙에 보내기
pages:
- path: send-to-slack
  blocks:
    - type: query
      resource: acme
      sqlType: select
      sql: select * from orders limit 10
      selectOptions:
        enabled: true
      actions:
      - type: http
        name: send to slack
        forEach: true
        axios:
          method: POST
          url: "https://hooks.slack.com/services/T00000000/B00000000/XXXXXXXXXXXXXXXXXXXXXXXX"
          headers:
            Content-type: application/json
          data: >
            {
              "text": "주문번호 {{id}} 조사 필요 - {{text}}"
            }           
        params:
          - key: text
          - key: id
            valueFromSelectedRows: id
```

### 환경 변수 ENV 사용법

webhook url을 편집 페이지에서 숨기고 싶은 경우 valueFromEnv 키를 이용하시면 됩니다. 자세한 방법은 [여기서 확인](https://docs.selectfromuser.com/docs/api-key-%EC%95%88%EC%A0%84%ED%95%98%EA%B2%8C-%EC%9D%B4%EC%9A%A9#%ED%99%98%EA%B2%BD-%EB%B3%80%EC%88%98valuefromenv-%EC%84%A4%EC%A0%95)하실 수 있어요.

```yaml
menus:
- path: send-to-slack
  name: 슬랙에 보내기
pages:
- path: send-to-slack
  blocks:
    - type: query
      resource: acme
      sqlType: select
      sql: select * from orders limit 10
      selectOptions:
        enabled: true
      actions:
      - type: http
        name: send to slack
        forEach: true
        axios:
          method: POST
          url: "{{slack_webhook}}"
          headers:
            Content-type: application/json
          data: >
            {
              "text": "주문번호 {{id}} 조사 필요 - {{text}}"
            }           
        params:
          - key: slack_webhook
            valueFromEnv: SLACK_WEBHOOK
          - key: text
          - key: id
            valueFromSelectedRows: id
```