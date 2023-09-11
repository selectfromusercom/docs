---
outline: deep
---

# JSON body 넣는 법

## JSON parameter

YAML 포맷이 아닌 JSON을 입력해도 파라메터가 입력됩니다.

```yaml
- type: http
  name: POST yml request + json params <String> replacement
  axios:
    method: POST
    url: https://httpbin.org/anything
    data: >
      {
        "id": "{{id}}"
      }
    headers: >
      {
        "X-Custom-Header": "Token {{id}}"
      }
    params: >
      { 
        "added_cid": "added-{{id}}"
      }
  params:
    - key: id
      label: '고객ID (수신거부 대상자 처리)'
      format: 'number'
```

## JSON 에러표시

구문에러 Syntax Error는 아래와 같이 표시됩니다.

![](https://imagedelivery.net/MHVC-FGTDyxApYeHyF29Tw/781e1c2a-2b9c-4576-52cb-fe7362871e00/docs "json-error.png")

입력값이 숫자가 아닌 경우 아래와 같이 표시됩니다. 

- param.format = number

![](https://imagedelivery.net/MHVC-FGTDyxApYeHyF29Tw/32bf9c2e-4306-4963-e77d-1c6b06e53200/docs "json-error2.png")