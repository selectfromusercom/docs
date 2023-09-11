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

![](https://files.readme.io/e67d1fc-1.--.png "1.셀렉트-몽고디비-리소스추가.png")

### 연결 정보 입력

1. Name 필드는 셀렉트 안에서 리소스를 불러올 때 사용하는 이름입니다. 
2. 몽고 DB의 URL을 입력하거나 Host, Username, Password, Database 필드를 입력하여 연결할 수 있습니다. 

![](https://files.readme.io/6b17316-2.---.png "2.셀렉트-몽고디비-연결시-세부정보.png")

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

![](https://files.readme.io/f2137b9-_2023-02-07__12_13_57.jpg "스크린샷_2023-02-07_오전_12_13_57.jpg")

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

![](https://files.readme.io/a6a3cc5-_2023-02-07__12.25.28.png "스크린샷 2023-02-07 오후 12.25.28.png")

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

![](https://files.readme.io/876cd0b-__2023__2__7___12_27.jpg "붙여넣은_이미지_2023__2__7__오후_12_27.jpg")

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

![](https://files.readme.io/3538d72-_2023-02-07__12.30.15.png "스크린샷 2023-02-07 오후 12.30.15.png")

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