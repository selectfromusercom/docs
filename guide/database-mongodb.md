---
outline: deep
---

# MongoDB

몽고디비를 셀렉트에 연결하고 사용하는 기본적인 방법

## MongoDB와 연결하기

셀렉트는 MongoDB 데이터베이스 연결을 지원합니다.

### 리소스 > 추가

1. 관리자 > 리소스 > 추가 버튼을 눌러주세요. 리소스 추가 화면을 확인하실 수 있습니다. 
2. MongoDB를 선택하세요. 

![](https://imagedelivery.net/MHVC-FGTDyxApYeHyF29Tw/042e84a6-d8b4-4f68-4f4c-c4a8bd45b000/docs "1.셀렉트-몽고디비-리소스추가.png")

### 연결 정보 입력

1. Name 필드는 셀렉트 안에서 리소스를 불러올 때 사용하는 이름입니다. 
2. 몽고 DB의 URL을 입력하거나 Host, Username, Password, Database 필드를 입력하여 연결할 수 있습니다. 

![](https://imagedelivery.net/MHVC-FGTDyxApYeHyF29Tw/819fe75c-1dbd-40d0-dace-0189d6a7c300/docs "2.셀렉트-몽고디비-연결시-세부정보.png")

## MongoDB 쿼리

MongoDB, 셀렉트 YAML 용법 비교

```yaml
# MongoDB Schema Statements
# db.properties.find({name: {$regex: "..."}}, {status: "..."}).sort({user_id: 1})

# 셀렉트 YAML
query:
  collection: properties 
  find:
    name: 
      $regex: "{{name}}"
    status: "{{status}}"
  sort:
  	user_id: 1
```

**참고자료:** SQL to MongoDB mapping  
<https://www.mongodb.com/docs/manual/reference/sql-comparison/>

### 지원 메소드 methods

셀렉트는 아래의 MongoDB methods를 지원합니다. 

- `find`
- `findOne`
- `count`
- `distinct`
- `aggregate`
- `insertOne`
- `insertMany`
- `updateOne`
- `updateMany`
- `deleteOne`
- `deleteMany`

추가 지원이 필요한 메소드가 있다면 [support@selectfromuser.com](mailto:support@selectfromuser.com)로 문의해주세요. 

## 주요 메소드 YAML 예시

### `find` 예시

![](https://imagedelivery.net/MHVC-FGTDyxApYeHyF29Tw/2d7ef95f-252f-42c2-49a7-e836dcfd7700/docs "스크린샷_2023-02-07_오전_12_13_57.jpg")

```yaml
- path: mongodb/find
  blocks:
  - type: query 
    name: find 
    resource: mongodb.sample
    sqlType: select 
    query:
      collection: properties 
      find:
        name: 
          $regex: "{{name}}"
    params:
      - key: name 
        label: find regex name 
    paginationOptions:
      enabled: true 
      perPage: 3
```

### find 팁

- 정렬 sort
- 개수 제한 limit

```yaml
- path: mongodb/find
  blocks:
  - type: query 
    name: find 
    resource: mongodb.sample
    sqlType: select 
    query:
      collection: properties 
      find:
        name: 
          $regex: "{{name}}"
      sort:
        name: 1 # ASC 
        # name: -1 # DESC   
      limit: 100
    params:
      - key: name 
        label: find regex name 
    paginationOptions:
      enabled: true 
      perPage: 3
```

- 개수 세기 count

```yaml
- path: mongodb/count
  blocks: 
  - type: query 
    name: count
    resource: mongodb.sample
    sqlType: select 
    query:
      collection: properties 
      find:
      count: _id 
      # count: 1 # _id 둘다 가능
```

### `aggregate` 예시

```yaml
blocks:
- type: query
  resource: mongodb
  name: 전체조회
  query:
    collection: properties
    find: {}
    aggregate:
      - 
        $group:
          _id: "$name"
```

### `insertOne` 예시

![](https://imagedelivery.net/MHVC-FGTDyxApYeHyF29Tw/4da81534-45bc-4518-fd6c-d42c42c56f00/docs "스크린샷 2023-02-07 오후 12.25.28.png")

```yaml
- path: mongodb/insertone
  blocks:
  - type: query 
    name: insertOne 
    resource: mongodb.sample
    sqlType: insert 
    query:
      collection: properties 
      insertOne:
        name: "{{name}}"
        status: "{{status}}"
    params:
      - key: name
      - key: status 
        dropdown:
          - open
          - close 
    reloadAfterSubmit: true
```

### `updateOne` 예시

![](https://imagedelivery.net/MHVC-FGTDyxApYeHyF29Tw/1c242cd1-fbe9-449f-53ef-feef535ba700/docs "붙여넣은_이미지_2023__2__7__오후_12_27.jpg")

```yaml
- path: mongodb/updateone
  blocks:
  - type: query 
    name: updateOne
    resource: mongodb.sample
    sqlType: select 
    query:
      collection: properties 
      find:
    paginationOptions:
      enabled: true 
      perPage: 3
    columns:
      name:
        label: 이름 
        updateOptions:
          resource: mongodb.sample 
          type: query
          query:
            collection: properties
            updateOne:
              -
                _id: 
                  $oid: "{{_id}}"
              -
                $set:
                  name: "{{value}}"
```

### `updateMany` 예시

![](https://imagedelivery.net/MHVC-FGTDyxApYeHyF29Tw/3314e2a7-9c7f-4c74-92a3-5ac3216f5b00/docs "스크린샷 2023-02-07 오후 12.30.15.png")

```yaml
- path: mongodb/updatemany
  blocks: 
  - type: query 
    name: updateMany 
    resource: mongodb.sample
    sqlType: update         
    query:
      collection: properties 
      updateMany:
        - status: open 
        - $set: 
            status: "{{status}}"
    params:
      - key: status
        dropdown: 
          - open 
          - close
    reloadAfterSubmit: true
```

## JavaScript 코드 활용

query 키와 함께 queryFn을 이용하면 MongoDB JavaScript 코드를 그대로 사용할 수 있어요.

- `query:` 키에 collection 정보를 넣어주세요. 
- params 값들을 감싸지 않고 queryFn 안에 그대로 변수로 쓸 수 있습니다.

**insertOne 예제**

```yaml
pages:
- path: create-new-property
  blocks:
  - type: query
    resource: mongodb
    name: 신규자산 추가
    sqlType: insert
    query:
      collection: properties
    queryFn: |
      properties.insertOne({
        name: name,
        created_at: new Date()
      });
    params:
      - key: name    
    reloadAfterSubmit: true  
```

**find 예제**

```yaml
pages:
- path: find-list-by-date
  blocks:
  - type: query
    resource: mongodb
    sqlType: select
    name: 자산 필터조회
    query:
      collection: properties
    queryFn: |
      const where = {}

      if (_id) where._id = ObjectId(_id)
      if (name) where.name = { $regex: name }

      if (created_at1 && created_at2) {
        where.created_at = {
          $gte: new Date(created_at1).toISOString(),
          $lte: new Date(created_at2).toISOString(),          
        }
      }

      properties.find(where).toArray()
    
    params:
    - key: _id
    - key: name
    - key: created_at
      format: date
      range: true
```