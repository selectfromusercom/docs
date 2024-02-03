---
outline: deep
---

# 핵심 스키마 이해

샘플 코드와 함께 데이터 조회 기본페이지부터 조건 검색, 상세보기, 데이터 액션 기능이 담긴 핵심 스키마를 이해할 수 있습니다.

## menus

- 메뉴는 사용자가 어드민 페이지에서 이동할 수 있는 주요 항목입니다.
- 메뉴 항목은 이름(name), 아이콘(icon), 연결된 페이지 경로(path) 등의 정보로 구성됩니다.
- 메뉴 구조를 정의하여 사용자가 쉽게 원하는 기능으로 이동할 수 있도록 합니다.

path가 products인 메뉴 추가
```yaml
menus:
  - path: products
```

## pages

- 페이지는 메뉴 항목을 클릭했을 때 표시되는 화면입니다.
- 각 페이지는 레이아웃과 블록들로 구성됩니다.
- 페이지 설정은 YAML 파일에서 정의되며, 페이지 경로(path), 레이아웃(layouts) 및 사용할 블록들(blocks)을 지정합니다.

`path: products`로 메뉴와 페이지 연결하기

```yaml
menus:
  - path: products
pages:
  - path: products
```

## blocks

- 블록은 페이지의 구성요소로, 페이지 내부의 작은 섹션입니다.
- 각 블록은 특정 데이터 소스를 통해 정보를 표시하거나 어드민 페이지에서 수행할 수 있는 작업을 정의합니다.
- 블록은 쿼리(type: query), HTTP 요청(type: http), 마크다운(type: markdown) 내용 등으로 구성됩니다.

페이지 안에 조회 쿼리 블록을 추가합니다.

```yaml
menus:
  - path: products
pages:
  - path: products
    blocks:
      - type: query
        resource: testdb
        sqlType: select
        sql: >
          SELECT id, name, created_at, memo
          FROM products 
          LIMIT 100
```

## columns

- 블록 내에서 표시되는 데이터를 컬럼(columns)으로 정의합니다.
- 데이터 필드를 columns 아래에 정의하고 표기될 이름(label)과 포맷 등을 설정합니다.

id, name, created_at 데이터의 표기 이름(label)을 설정합니다.

```yaml
menus:
  - path: products
pages:
  - path: products
    blocks:
      - type: query
        resource: testdb
        sqlType: select
        sql: >
          SELECT id, name, created_at, memo
          FROM products 
          LIMIT 100
        columns:
          id:
            label: ID
          name:
            label: 이름
          created_at:
            label: 생성일
```

## params

- 어드민 페이지에서 사용자 입력을 받아 쿼리나 HTTP 요청에 전달할 파라미터를 정의합니다.
- 이를 통해 동적 데이터 검색 및 필터링을 가능하게 합니다.

name이라는 key를 추가하고 조회 쿼리에 활용합니다. 입력 필드의 label을 '이름'으로 설정합니다.

```yaml
menus:
  - path: products
pages:
  - path: products
    blocks:
      - type: query
        resource: testdb
        sqlType: select
        sql: >
          SELECT id, name, created_at, memo
          FROM products
          WHERE (LENGTH(:name)=0 OR name LIKE CONCAT('%', :name, '%))          
          LIMIT 100
        columns:
          id:
            label: ID
          name:
            label: 이름
          created_at:
            label: 생성일
        params:
          - key: name
            label: 이름
```

## modals

- 모달은 페이지 내에서 팝업 창 형태로 표시되는 작은 창입니다.
- 모달(modals)은 다양한 작업을 수행할 때 사용되며, 모달 내부 컨텐츠 및 액션을 정의합니다.
- 모달의 경로(path)를 지정하고 부모 영역의 데이터를 경로(path)에 params로 가져와서 사용할 수 있습니다. 

columns.id를 클릭했을 때 `products-:id` 라는 path의 모달을 오픈(openModal)합니다. `:id` 파라미터를 모달 안 쿼리 블록에서 사용합니다. 

```yaml
menus:
  - path: products
pages:
  - path: products
    blocks:
      - type: query
        resource: testdb
        sqlType: select
        sql: >
          SELECT id, name, created_at, memo
          FROM products
          WHERE (LENGTH(:name)=0 OR name LIKE CONCAT('%', :name, '%))          
          LIMIT 100
        columns:
          id:
            label: ID
            openModal: products-:id
          name:
            label: 이름
          created_at:
            label: 생성일
          memo:
            label: 메모
        params:
          - key: name
            label: 이름
        modals:
          - path: products-:id
            blocks:
              - type: query
                resource: testdb
                sqlType: select
                sql: >
                  SELECT id, name, created_at, memo
                  FROM products
                  WHERE id = :id
                params:
                  - key: id
                    valueFromRow: id
```

## actions

- 액션은 사용자가 페이지에서 수행할 수 있는 작업을 정의합니다.
- 예를 들어, 데이터 업데이트, 항목 삭제, 모달 표시 등의 액션을 지원합니다.

products 조회 내역의 여러개를 선택(selectOptions)하고 반복실행(forEach)하여 상태를 수정하는 옵션을 추가합니다.

```yaml
menus:
  - path: products
pages:
  - path: products
    blocks:
      - type: query
        resource: testdb
        sqlType: select
        sql: >
          SELECT id, name, created_at, memo
          FROM products
          WHERE (LENGTH(:name)=0 OR name LIKE CONCAT('%', :name, '%))          
          LIMIT 100
        columns:
          id:
            label: ID
            openModal: products-:id
          name:
            label: 이름
          created_at:
            label: 생성일
          memo:
            label: 메모
        params:
          - key: name
            label: 이름
        modals:
          - path: products-:id
            blocks:
              - type: query
                resource: testdb
                sqlType: select
                sql: >
                  SELECT id, name, created_at, memo
                  FROM products
                  WHERE id = :id
                params:
                  - key: id
                    valueFromRow: id
        selectoptions:
          enabled: true
        forEach: true
        actions:
          - label: 상태변경
            type: query
            resource: testdb
            sqlType: update
            sql: >
              UPDATE products SET status = :status WHERE id = :id
            params:
              - key: id
                valueFromSelectedRows: id
              - key: status
                label: 상태
                dropdown:
                  - draft: 준비중
                  - for_sale: 판매중
                  - soldout: 품절             
```

이외에도 다양한 스키마의 옵션, 기능을 제공하고 있습니다. 

자세한 사항은 [Reference](https://docs.selectfromuser.com/layout) 페이지에서 확인할 수 있어요.

궁금하신점은 서비스 내 채팅이나 [이메일](mailto:support@selectfromuser.com)등으로 편하게 문의주세요.