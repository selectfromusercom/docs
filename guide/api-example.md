---
outline: deep
---

# API 예제

## rowsPath, responseFn

이미 만들어진 API의 응답결과물을 바꾸어 바로 사용합니다.

![](https://imagedelivery.net/MHVC-FGTDyxApYeHyF29Tw/1a9ce095-a869-483c-bebf-4b04b3e44d00/docs)


```yaml
menus:
- path: pages/-0Uyeu
  name: API
pages:
- path: pages/-0Uyeu
  title: rowsPath
  blocks:
  - type: http
    name: 1. 원본
    resource: 
    axios:
      url: https://api.selectfromuser.com/sample-api/products
      method: GET
    showDownload: false
  - type: http
    name: 2. 원본 + rowsPath
    resource: 
    axios:
      url: https://api.selectfromuser.com/sample-api/products
      method: GET
    rowsPath: rows
    showDownload: false
  - type: http
    name: 3. 원본 + rowsPath + transform
    resource: 
    axios:
      url: https://api.selectfromuser.com/sample-api/products
      method: GET
    rowsPath: rows
    responseFn: |
      return rows.map(row => { 
        row.code = row.id + '-' + row.name; 
        return row
      })
    showDownload: false
  - type: http
    name: 4. 원본 + columns
    resource: 
    axios:
      url: https://api.selectfromuser.com/sample-api/products
      method: GET
    columns:
      rows:
        format: table
    showDownload: false
```

## valueFromEnv

환경변수를 가져와 이용합니다.

```yaml
menus:
- path: pages/f8CnYb
  name: 샘플2
pages:
- path: pages/f8CnYb
  title: 환경변수
  subtitle: 설정 > 환경변수에 있는 키 입니다.
  blocks:
  - type: http
    name: GET 요청을 보냅니다.
    resource: 
    axios:
      url: https://httpbin.selectfromuser.com/anything
      method: GET
      headers:
        Authorization: "Bearer {{API_KEY}}"
    params:
      - key: API_KEY
        valueFromEnv: true
    display: col-1
```

## 기타 자료들

- [responseErrorFn 으로 실패 API 메시지 표시하기](https://ask.selectfromuser.com/t/responseerrorfn-api/71)
- [콘솔 로그 Console Log 활용법](https://ask.selectfromuser.com/t/console-log/70)
- [입력값 검증하기 Form Validation](https://ask.selectfromuser.com/t/form-validation/69)
- [데이터 연결 시 리소스 타입 http 에서 http/2 지원](https://ask.selectfromuser.com/t/http-http-2/51/5)
- [responseFn으로 API 성공/에러 표시하기](https://ask.selectfromuser.com/t/responsefn-api/68)
- [responseRowFn 사용법과 Javascript 자바스크립트에 대한 이해](https://ask.selectfromuser.com/t/responserowfn-javascript/52)