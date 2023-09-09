---
outline: deep
---

# GraphQL 사용

GraphQL API 또한 기본적으로 HTTP 프로토콜을 기반으로 동작하기 때문에 아래와 같은 문법으로 이용 가능합니다. 

```yaml
- path: test/gql-http
  blocks:  
  - type: http
    name: gql 샘플
    axios:
      method: POST
      url: https://testapi.com/v1/33iac2d
      data:
        query: |
          {
            getUser(id: "test") {
            id
            name
            email
            }
          }
```