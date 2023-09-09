---
outline: deep
---

# API KEY 안전하게 이용

## API 키 관리

설정 > API 키 관리에서 추가 후 이용 가능합니다.

![](https://files.readme.io/78fea8a-api-key-manage.png "api-key-manage.png")

감추어진 값은 자릿수만 표시합니다.

![](https://files.readme.io/5a97102-api-key-manage-hidden.png "api-key-manage-hidden.png")

## 환경 변수(valueFromEnv) 설정

API 키 관리에 입력한 이름을 yml params에서 안전하게 이용할 수 있습니다. 

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
      headers:
        Authorization: Bearer "{{ API_TOKEN_DEV }}"
    params:
      - key: API_TOKEN_DEV
        valueFromEnv: true
```