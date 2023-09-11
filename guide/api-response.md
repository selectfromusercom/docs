---
outline: deep
---

# API 응답을 코드로 처리

셀렉트는 API를 통해 편리하게 조회, 수정을 하는 역할이지만 서버에서 원하는 결과물이 아닌 경우 코드로 데이터를 수정할 수 있습니다. 
API 응답을 변환(response transformation)해서 이용해보세요.

## responseFn

응답결과물 전체를 rows 변수로 넘겨 원하는 코드를 실행합니다.  
return이 없는 경우 자동으로 추가됩니다. ; return rows

```yaml
menus:
- path: test/http-get
  name: HTTP-GET
pages:
- path: test/http-get
  blocks:
  - type: http
    name: 결과물
    axios:
      method: GET
      url: https://gist.githubusercontent.com/eces/c267436ddeec8917b47ee666b0d5e955/raw/b60b5bca57c51a9b75c1a135d182f2e278b45ccb/test-2.json
    rowsPath: rows
    responseFn: |
      rows.map(e => {
        e.name_initial = e.name.split(' ').slice(0, 2).map(e => e[0].toUpperCase()).join('')
        return e
      })
```

name_initial 필드를 코드를 통해 새로 만들었습니다. (이름의 이니셜을 생성)

![](https://imagedelivery.net/MHVC-FGTDyxApYeHyF29Tw/3f2f3e03-26d4-41f2-3dd5-1164a45a8f00/docs "api-res-transf.png")

## responseRowFn

응답결과물 한 건을 row 변수로 넘겨 원하는 코드를 실행 할 수 있습니다.  
return이 없는 경우 자동으로 추가됩니다. ; return row

```yaml
menus:
- path: test/http-get
  name: HTTP-GET
pages:
- path: test/http-get
  blocks:
  - type: http
    name: 결과물
    axios:
      method: GET
      url: https://gist.githubusercontent.com/eces/c267436ddeec8917b47ee666b0d5e955/raw/b60b5bca57c51a9b75c1a135d182f2e278b45ccb/test-2.json
    rowsPath: rows
    responseRowFn: |
      row.name_initial = row.name.split(' ').slice(0, 2).map(e => e[0].toUpperCase()).join('')
```

## 에러 확인

개발자 도구를 열면 해당 에러가 표시됩니다.  
responseFn, responseRowFn 분류가 표시됩니다.  
에러메시지와 동시에 에러를 재현 가능한 코드가 출력됩니다.  
코드를 그대로 붙여넣으면 실행됩니다. (동일한 에러)

![](https://imagedelivery.net/MHVC-FGTDyxApYeHyF29Tw/2005897f-1b6f-46ff-f0c1-e29e83194b00/docs "api-res-error.png")