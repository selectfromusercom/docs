---
outline: deep
---

# API 활용

HTTP GET/POST/PUT/DELETE등 다양한 API들을 셀렉트에 연결합니다.

- 원하는 결과물을 테이블로 표시
- 원하는 입력폼을 구성하여 API로 호출
- (지원예정) API 호출 시 로그/슬랙 알림

## API 내용을 표시하기 (HTTP GET)

아래의 YML로 간단한 조회를 합니다.

```yaml
menus:
- path: test/http-get
  name: HTTP-GET

pages:
- path: test/http-get
  blocks:
  - type: http
    axios:
      method: GET
      url: https://gist.githubusercontent.com/eces/c267436ddeec8917b47ee666b0d5e955/raw/892877e7035c4f61e946848a3f6da7e9983cab15/test.json
    rowsPath: rows
```

## API 블록 키(key) 개념

### type (String)

- http 로 지정하면 http block으로 실행합니다.

### axios (Object)

- <https://github.com/axios/axios>
- Axios 라이브러리를 모두 지원합니다. (Fetch API는 추후 별도 지원예정)

### method

- GET, POST, PUT 등을 지원합니다.
- GET은 결과물을 테이블로 표시하고, POST/PUT/DELETE/PATCH은 실행결과 값을 표시합니다.

### methodType

- API method와 무관하게 표시형태를 지정합니다. (조회 API 이지만 POST로 요청해야하는 경우)

### url

- 셀렉트 클라우드에서 접근 불가능한 internal ip는 호출할수 없습니다.

## 예제

### 조회 예제 HTTP GET

```yaml
- type: http
  axios:
    method: GET
    url: https://httpbin.org/anything?query=1
```

### 조회 예제 HTTP POST (조회로 표시)

```yaml
- type: http
  axios:
    method: POST
    methodType: GET
    url: https://httpbin.org/anything?query=1
```

### 조회 예제 HTTP GET (path 지정)

```yaml
- type: http
  axios:
    method: GET
    url: https://gist.githubusercontent.com/eces/c267436ddeec8917b47ee666b0d5e955/raw/892877e7035c4f61e946848a3f6da7e9983cab15/test.json
  rowsPath: rows
```

표시할 결과물이 특정 키에 있는 경우 값을 지정합니다.

```yaml
{
  "message": "ok",
  "rows": [{
    "id": 1000,
    "name": "John"
  }, {
    "id": 1001,
    "name": "Kelly"
  }]
}
```

해당 JSON 응답을 아래와 같이 표시합니다.

1. 키를 지정하지 않은 경우 - message, rows가 컬럼으로 표시

![](https://imagedelivery.net/MHVC-FGTDyxApYeHyF29Tw/47bd18e9-43b8-4134-5e67-67a89cd1a400/docs "api-no-key.png")

2. 키를 지정한 경우 - rows 아래의 내용이 컬럼으로 표시

![](https://imagedelivery.net/MHVC-FGTDyxApYeHyF29Tw/a5a0cf06-a530-436f-2995-9e6345167900/docs "api-yes-key.png")