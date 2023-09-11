---
outline: deep
---

# JSON 데이터 사용

API나 데이터베이스 등 리소스를 연결해서 테스트하는 것이 당장 어렵다면 JSON 데이터로 셀렉트를 이용해보세요. 

## JSON 사용 예시 - 상품 관리

```yaml
pages:
  - path: products
    blocks:
      - type: query
        resource: json+sql
        sqlType: select
        sql: |
          SELECT * FROM products  WHERE (LENGTH(:status)=0 OR status = :status)
            AND (LENGTH(:product_id)=0 OR id = CAST(:product_id AS NUMBER))
          ORDER BY id DESC LIMIT 100
        columns:
          id:
            label: ID
          name:
            label: 상품명
          status:
            label: 상태
            color:
              PASSED: green
              REJECTED: red
              default: gray
          created_at:
            label: 생성일
          updated_at:
            label: 수정일
          deleted_at:
            label: 삭제일
        paginationOptions:
          enabled: true
          perPage: 10
        params:
          - key: product_id
            label: 상품ID
          - key: status
            label: 상태
            radioButtonGroup: true
            radio:
              - value: ''
                label: ALL
              - PASSED
              - REJECTED
              - INSPECT_NEEDED
        actions:
          - type: query
            label: 검수 올리기
            confirm: 정말 검수 진행하시겠습니까?
            resource: json+sql
            sqlType: update
            sql: |
              UPDATE products  SET status = 'INSPECT_NEEDED',
                updated_at = NOW()
              WHERE id = :id
            placement: top right
            forEach: true
            params:
              - key: id
                valueFromSelectedRows: id
        selectOptions:
          enabled: true
          selectOnCheckboxOnly: true
        json: {
          "products": [
            {
              "id": 1,
              "name": "테스트 상품",
              "status": "REJECTED",
              "created_at": "2023-02-15T03:57:43.000Z",
              "updated_at": "2023-02-15T04:04:31.000Z",
              "deleted_at": null
            },
            {
              "id": 2,
              "name": "케맥스 핸드드리퍼",
              "status": "PASSED",
              "created_at": "2023-02-15T03:57:45.000Z",
              "updated_at": "2023-02-15T04:03:45.000Z",
              "deleted_at": null
            },
            {
              "id": 3,
              "name": "LG 모니터 27인치",
              "status": "PASSED",
              "created_at": "2023-02-15T03:57:47.000Z",
              "updated_at": "2023-02-15T04:03:47.000Z",
              "deleted_at": null
            },
            {
              "id": 4,
              "name": "스타벅스 텀블러 크리스마스 에디션",
              "status": "PASSED",
              "created_at": "2023-02-15T03:57:48.000Z",
              "updated_at": "2023-02-15T04:03:50.000Z",
              "deleted_at": null
            },
            {
              "id": 5,
              "name": "맥북 프로 2022ver",
              "status": "INSPECT_NEEDED",
              "created_at": "2023-02-15T03:57:49.000Z",
              "updated_at": "2023-02-15T04:04:02.000Z",
              "deleted_at": null
            },
            {
              "id": 6,
              "name": "닥터페퍼 제로 20캔",
              "status": "INSPECT_NEEDED",
              "created_at": "2023-02-15T03:57:51.000Z",
              "updated_at": "2023-02-15T04:04:06.000Z",
              "deleted_at": null
            },
            {
              "id": 7,
              "name": "가열식 가습기 오쿠 8L",
              "status": "INSPECT_NEEDED",
              "created_at": "2023-02-15T03:57:52.000Z",
              "updated_at": "2023-02-15T04:04:10.000Z",
              "deleted_at": null
            }
          ]
        }
```

![](https://imagedelivery.net/MHVC-FGTDyxApYeHyF29Tw/c132535e-cf23-4d87-047d-8e1e4362ab00/docs "스크린샷 2023-03-02 오후 6.44.36.png")

### resource: json+sql

resource 키의 값을 json+sql로 하면 JSON 데이터를 SQL 쿼리로 컨트롤할 수 있습니다. 

### json 키

json 키의 값에는 JSON 형태나 YAML 형태로 데이터를 입력할 수 있습니다. 

**JSON 형태** 

```yaml
json: {
  "products": [
    {
      "id": 1,
      "name": "테스트 상품",
      "status": "REJECTED",
      "created_at": "2023-02-15T03:57:43.000Z",
      "updated_at": "2023-02-15T04:04:31.000Z",
      "deleted_at": null
    }
	]
```

**YAML 형태** 

```yaml
json:
  products:
    - id: 1
      name: 테스트 상품
      status: REJECTED
      created_at: 2023-02-15T03:57:43.000Z
      updated_at: 2023-02-15T04:04:31.000Z
      deleted_at: null
```

예시 YAML 값이 의미하는 바는 아래와 같습니다. 

- products 테이블
- `-`는 배열Array을 의미

> 📘 JSON, YAML, CSV 변환 방법
> 
> 예시 데이터가 데이터베이스나 스프레드시트인 경우에는 테이블 또는 CSV 형태이고, API 호출 결과라면 JSON인 경우가 많습니다.
> 
> 셀렉트에서는 JSON과 YAML 형태를 지원하기 때문에 CSV 데이터를 변환해서 입력하시거나 JSON, YAML 데이터를 그대로 입력하시면 됩니다. 
> 
> 변환 서비스가 필요하시다면 CSV to JSON 이나 JSON to YAML 등으로 검색하시면 찾아보실 수 있습니다.