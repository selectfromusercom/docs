---
outline: deep
---

# 테이블 페이지네이션

## 간단하게 페이지에 적용하기

적용하고 싶은 페이지를 확인합니다.

```yaml
- path: properties/active
  blocks:
  - type: query
    resource: mysql.qa
    sqlType: select
    sql: SELECT * FROM properties ORDER BY id ASC LIMIT 100
```

이와 같이 옵션을 추가합니다.

```yaml
- path: properties/active
  blocks:
  - type: query
    resource: mysql.qa
    sqlType: select
    sql: SELECT * FROM properties ORDER BY id ASC LIMIT 100
    
    # pagination 페이지네이션 설정
    paginationOptions:
      enabled: true
      perPage: 10
```

## 결과 페이지

![](https://imagedelivery.net/MHVC-FGTDyxApYeHyF29Tw/17e42df8-2810-4b03-8f7f-c420daf6e800/docs "pagination-img.png")

## 기본 페이지 수 조절하기

```yaml
paginationOptions:
  enabled: true
  perPage: 100
```

## 페이지 단위 조절하기

```yaml
paginationOptions:
  enabled: true
  perPage: 10
  perPageDropdown:
  - 10
  - 50
  - 100
```

### perPage 적용 결과

페이지당 행(row) 개수 기본값

![](https://imagedelivery.net/MHVC-FGTDyxApYeHyF29Tw/7072b8d3-9329-483a-0c7c-3815712bb700/docs "per-page-img.png")

### perPageDropdown 적용 결과

![](https://imagedelivery.net/MHVC-FGTDyxApYeHyF29Tw/1af06482-904b-4aa5-8e80-b9348d844600/docs "pagination-dropdown.png")

## 서버 사이드 페이지네이션(server-side pagination)도 가능한가요?

네, 기존 paginationOptions와 함께 sqlTotal, mode 값을 설정하면 서버 사이드 페이지네이션을 적용할 수 있습니다. 

서버 사이드 옵션을 추가하시더라도, 대량의 데이터를 조회하시는 경우 조회 페이지가 정상 작동하지 않을 수 있으니, 쿼리 limit 이나 params 등으로 제한을 걸어주시는 것을 권장합니다.

sqlTotal 쿼리를 쓰지않는 방식도 지원합니다.

- [paginationOptions.total](/reference#blocks-paginationoptions){target="_blank"}

```yaml
menus:
- path: pagination
  name: pagination
pages:
- path: pagination
  blocks:
  - type: query
    resource: mysql.qa
    sqlType: select
    sql: > 
      SELECT * FROM test_10k 
      WHERE LENGTH(:name) = 0 OR name LIKE CONCAT('%', :name, '%')
      LIMIT :page_offset, :page_limit
    sqlTotal: >
      SELECT COUNT(id) FROM test_10k 
      WHERE LENGTH(:name) = 0 OR name LIKE CONCAT('%', :name, '%')
    mode: remote
    paginationOptions:
      enabled: true
      perPage: 10
    params:
    - key: name
```

### type: http 블록 활용시

axios 안에서 param처럼 사용
```yaml
- type: http 
  axios:
    method: GET
    url: https://api.typeform.com/forms/******/responses
    qs:
      offset: "{{page_offset}}"
  mode: remote
  paginationOptions:
    enabled: true
    perPage: 10
    total: 1000
```

JS 코드로 request 조작
- 기본 페이지네이션에서 채워주는 값(page_offset, page_limit, page_number)를 직접 수정해야하는 경우

```yaml
requestFn: |
  const page_offset = params.find(e => e.key == 'page_offset')

  page_offset.value = 100 + page_offset.value  
```

JS 코드로 total 입력
- API 응답에서 total을 가져오고 싶은 경우

```yaml
mode: remote
paginationOptions:
  enabled: true
  perPage: 20
responseFn: |
  data.total = data.rows[0].totalElements
  
  console.log(data);
```

totalPath 지정
```yaml
- type: http
  axios:
    method: GET
    url: http://api.selectfromuser.com/sample-api/users?offset={{page_offset}}&limit={{page_limit}}
  rowsPath: rows
  totalPath: total
  mode: remote
  paginationOptions:
    enabled: true
    perPage: 3
```

### 중첩된 API 응답 다루기

API가 다음과 같은 중첩된 구조로 응답하는 경우:

```json
{
  "result": {
    "pageSize": 10,
    "currentPage": 1,
    "total": 45,
    "body": [
      {
        "id": 1,
        "name": "John Smith",
        "email": "john@example.com",
        "createdAt": "2024-02-20T09:00:00Z",
        "status": "active"
      },
      {
        "id": 2,
        "name": "Jane Doe",
        "email": "jane@example.com",
        "createdAt": "2024-02-20T09:15:00Z",
        "status": "pending"
      }
      // ... 더 많은 데이터
    ]
  }
}
```

아래와 같이 간단하게 설정할 수 있습니다:

```yaml
- type: http
  axios:
    url: https://api.example.com/users
    method: GET
    params:
      page_number: "{{page_number}}"
      page_offset: "{{page_offset}}"
      page_limit: "{{page_limit}}"
  
  # 중첩된 데이터 구조에서 실제 데이터 배열의 경로 지정
  rowsPath: result.body
  # 전체 데이터 개수가 있는 필드 경로 지정
  totalPath: result.total
  
  mode: remote
  paginationOptions:
    enabled: true
    perPage: 10
```

**주의사항과 팁:**
- `rowsPath`와 `totalPath`는 응답 데이터의 실제 구조에 맞게 점(.)으로 구분하여 경로를 지정합니다
- `responseFn`을 사용할 경우, `data`, `row`, `rows` 변수를 활용할 수 있습니다:

```yaml
responseFn: |
  console.log({data, row, rows}) // 데이터 구조 확인
```

- 페이지네이션 파라미터로 `page_number`, `page_offset`, `page_limit`를 사용할 수 있습니다
- API 서버가 page_number 기반으로 동작한다면 `page_number`를 활용하고, offset 기반이라면 `page_offset`을 활용합니다

## CSV 다운로드를 하는데 전체내역이 안나와요.

서버사이드 페이지네이션은 많은 데이터를 부분적으로 빠르게 조회하는 방식이기 때문에, CSV다운로드는 보고있는 페이지의 결과만 다운로드됩니다.

전체 데이터를 다운로드하고 싶으실 때는 한번에 모든 데이터를 불러오는 일반적인 테이블 조회방법을 이용해주세요.

조회용 페이지와 다운로드 페이지를 나누는것도 좋습니다.

아래는 조회 페이지에 전체 다운로드 액션을 추가하는 예제입니다.

![](https://imagedelivery.net/MHVC-FGTDyxApYeHyF29Tw/2ee4e5f0-cfdf-4fe7-de6e-139c30216e00/docs)

```yaml
actions:
  - label: 전체 다운로드
    single: true
    openModal: modal1

modals:
  - path: modal1
    name: 조회 후 다운로드
    subtitle: 시간이 걸릴 수 있어요. 
    blocks:
      - type: query
        resource: mysql
        sqlType: select 
        sql: >
          SELECT * 
          FROM bookings
          WHERE created_at >= :start_date AND created_at <= :end_date
        showDownload: false
        params:
          - key: start_date
            label: 시작일
          - key: end_date
            label: 종료일
        autoload: false
        paginationOptions: 
          enabled: true
          perPage: 10
        actions:
          - label: 다운로드
            single: true
            showDownload: csv
            placement: top right
```