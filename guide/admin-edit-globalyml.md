---
outline: deep
---

# 편집파일 global.yml

## Parameter 코드 재사용하기

반복적으로 사용하는 parameter(params)가 있으신가요?

global.yml 파일을 사용해보세요.

- 여러 파일에 공통 값을 넣을 수 있습니다.
- 장단점: 코드 재사용으로 수정이 편하지만, 테스트/오류 범위가 늘어납니다.

### 사용방법

1. global.yml 이라는 이름의 파일을 추가합니다. (파일 이름을 global.yml로 입력하면 파일명 앞에 코드 아이콘(< >)이 표기됩니다.)

![](./image/globalyml.png)

2. global.yml 파일에 재사용하고 싶은 params 정보를 아래와 같이 추가하세요.

::: code-group

```yaml [query]
params_account_id: &params_account_id
  key: account_id
  label: 계정
  multiple: true
  datalist: true
  datalistLength: 20
  datalistPreview: true
  datalistDropdown: true
  datalistFromQuery:
    type: query
    resource: mysql.qa
    sqlType: select
    sql: SELECT DISTINCT id FROM test_email WHERE email = :email
    params:
    - key: email
      valueFromUserProperty: "{{email}}"
```

```yaml [http]
params_account_id: &params_account_id
  key: account_id
  label: 계정
  multiple: true
  datalist: true
  datalistLength: 20
  datalistPreview: true
  datalistDropdown: true
  datalistFromQuery:
    type: http
    axios:
      method: GET
      url: https://api.example.com/v1/test_email?email={{email}}
    rowsPath: rows
    params:
    - key: email
      valueFromUserProperty: "{{email}}"
```

:::

3. 기존 파일의 params에 `*params_account_id` 위치로 global.yml 파일 `&params_account_id` 아래의 내용이 들어갑니다.

::: code-group

```yaml [query]
pages:
- path: pages/VLEUvD
  title: 계정 정보조회
  blocks:
  - type: query
    resource: mysql.qa
    sqlType: select
    sql: SELECT * FROM properties WHERE account_id = :account_id
    searchOptions:
      enabled: true
    paginationOptions:
      enabled: true
      perPage: 10      
    params: 
      - *params_account_id
      - key: name
```

```yaml [http]
pages:
- path: pages/VLEUvD
  title: 계정 정보조회
  blocks:
  - type: http
    axios:
      method: GET
      url: https://api.example.com/v1/properties?account_id={{account_id}}&name={{name}}
    rowsPath: rows
    searchOptions:
      enabled: true
    paginationOptions:
      enabled: true
      perPage: 10      
    params: 
      - *params_account_id
      - key: name
```

:::