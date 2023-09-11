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

> 🚧 
> 
> YAML 표기법에 따라 v: {{API_VERSION}} 으로 입력하는 경우 의도와 다르게 작동합니다.  
> v: "{{API_VERSION}}" 으로 입력 필요합니다.

## 파라메터 처리

axios 하위의 모든 부분에 원하는 파라메터를 넣을 수 있습니다.

![](https://files.readme.io/197b1e8-parameter-axios.png "parameter-axios.png")

## 키 관리

일부 파라메터는 설정 > 키 관리에서 추가 후 이용 가능합니다.

![](https://files.readme.io/4aa097e-key-management.png "key-management.png")

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

![](https://files.readme.io/40025ca-duplicated-parameter.png "duplicated-parameter.png")