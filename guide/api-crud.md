---
outline: deep
---

# API로 수정, 삭제

## HTTP POST로 수정, 삭제

`method: POST` 인 경우 ‘확인 후 실행’으로 작동합니다.

```yaml
menus:
- path: test/http-post
  name: HTTP-POST
pages:
- path: test/http-post
  blocks:  
  - type: http
    name: POST 샘플
    axios:
      method: POST
      url: https://httpbin.org/anything?query=1
      data:
        '고객아이디': customer-{{id}}
        'v': "{{API_VERSION}}"
    params:
      - key: id
        label: '고객ID (수신거부 대상자 처리)'
        format: 'number'
      - key: API_VERSION
        valueFromEnv: true
```

::: tip

YAML 표기법에 따라 

<span v-pre>`'고객아이디': customer-{{id}}`</span>와 같이 value부분이 string 타입으로 시작하는 경우에는 `""`로 감싸지 않습니다.

<span v-pre>`v: "{{API_VERSION}}"`</span> 같은 형태는 `""`로 감싸서 입력해주세요.

<span v-pre>`v: {{API_VERSION}}`</span> 으로 입력하는 경우 의도와 다르게 작동합니다.

:::

key: API_VERSION 값이 `api_sample_key`라면 <span v-pre>`v: "{{API_VERSION}}"`</span>이 <span v-pre>`v: "api_sample_key"`</span>와 같이 처리됩니다.


## 파라메터 처리

axios 하위의 모든 부분에 원하는 파라메터를 넣을 수 있습니다.

![](https://imagedelivery.net/MHVC-FGTDyxApYeHyF29Tw/174d65d3-32c0-43de-623d-ccb303b2a500/docs "parameter-axios.png")

## 키 관리

일부 파라메터는 설정 > 키 관리에서 추가 후 이용 가능합니다.

![](https://imagedelivery.net/MHVC-FGTDyxApYeHyF29Tw/439875f0-bdd9-469f-77ff-f2323ab12200/docs "key-management.png")

중첩된 키에 대해서도 파라메터가 입력됩니다.

```yaml
- type: http
  name: POST yml request + yml params <String> replacement
  axios:
    method: POST
    url: <https://httpbin.org/anything>
    data:
      id: "{{id}}"
      rows: 
        - id: id-{{id}}
        - paramsInKey{{id}}: value
    headers:
      X-Custom-Header: Token {{id}}
    params:
      added_cid: added-{{id}}
  params:
    - key: id
      label: '고객ID (수신거부 대상자 처리)'
      format: 'number'
```

![](https://imagedelivery.net/MHVC-FGTDyxApYeHyF29Tw/40870afc-942f-46f3-60b2-3790b71d8f00/docs "duplicated-parameter.png")