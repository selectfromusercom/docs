---
outline: deep
---

# 테이블 필드 포맷 설정

## 링크로 표시

특정 컬럼의 값을 활성화된 URL 링크(link)로 표시할 수 있습니다. 

### 적용 전

![](https://files.readme.io/3d0d328-link-before.png "link-before.png")

### 적용 후

![](https://files.readme.io/00f3a1e-link-after.png "link-after.png")

## 링크 설정 샘플 yaml

```yaml
- path: manage-animal
    blocks:
    - type: query
      resource: acme
      sqlType: select
      sql: >
        SELECT id, name, image_url
        FROM animals limit 10
      columns:
        image_url:
          format: url
```

## 이미지로 표시

필드 안의 값을 바탕으로 이미지(image)로 표시할 수 있습니다. 

![](https://files.readme.io/b299220-image-format.png "image-format.png")

### 이미지 표기 샘플 yaml

```yaml
- path: manage-animal
    blocks:
    - type: query
      resource: acme
      sqlType: select
      sql: >
        SELECT id, name, image_url, image_url as thumbnail, full_address, created_at, registered_at 
        FROM animals 
        LIMIT 10
      columns:
        image_url:
          format: url
        thumbnail:
          format: image
          width: 160px
          height: 120px
          thumbnail: true
          style: > 
            border-radius: 10px
```

### 키와 값 작동 방식

width: 100px

- css 값이 들어갑니다.
- height 없으면 가로 크기 기준으로 표시됩니다.

height: 100px

- css 값이 들어갑니다.
- width 없으면 세로 크기 기준으로 표시됩니다.

thumbnail: true

- thumbnail 옵션이 true인 경우, 가로크기 세로크기로 가운데 정렬하여 표시됩니다.
- 옵션이 적용되지 않은 경우, 원본 이미지가 표시됩니다.

style: "border-radius: 10px"

```yaml
style: >
  border-radius: 10px
```

### 이미지 크기 참고

![](https://files.readme.io/3aef34b-image-size.png "image-size.png")

## 날짜 표시 설정

> 👍 
> 
> 추가 옵션 없이 날짜 데이터를 조회하는 경우, 로컬 시간대로 표기합니다.

### 날짜

DATE_FORMAT 등으로 쿼리해서 날짜를 포맷팅하거나 옵션으로 표기 가능합니다.  
구글시트 내보내기 시에는 원본값으로 내보내기 됩니다.

```yaml
formatFn: date # 2021-11-17
formatFn: datetime # 2021-11-17 10:50
formatFn: datetimeA # 2021-11-17 10:50 AM
```

### 로컬 시간대로 바꾸기

데이터베이스 시간대가 UTC 기준이고 어드민 사용자 컴퓨터의 시간대가 Asia/Seoul 일 때

```yaml
formatFn: date-local 
formatFn: datetime-local
formatFn: datetimeA-local
```

## 날짜 샘플

### UTC 일 때

![](https://files.readme.io/f9ce4b1-formatFn-date1.png "formatFn-date1.png")

### KST, Asia/Seoul 일  때

![](https://files.readme.io/eba2516-formatFn-date2.png "formatFn-date2.png")

## 테이블 JSON 필드 표시

운영상의 이슈를 처리하기 위해 JSON 데이터를 직접 살펴봐야할 때가 있습니다. 이 때 테이블 행(row) 한 줄로는 데이터를 살펴보기가 어렵습니다. `format: json`을 사용하면 이런 상황을 해결할 수 있습니다. 

### 테이블 행 결과

10줄 미만으로 여러줄이 표시됩니다. 

![](https://files.readme.io/9cd9460-json-display.png "json-display.png")

### 필드 클릭 시

JSON 필드 클릭 시 아래와 같이 모달창이 떠서 큰 영역으로 표시됩니다. 

![](https://files.readme.io/fea74d5-json-display-clicked.png "json-display-clicked.png")

### 설정 방법

```yaml
- type: query
  resource: mysql.qa
  sqlType: select
  sql: SELECT * FROM sms_log ORDER BY id ASC LIMIT 100
  columnOptions:
  - field: id
  - field: result_json
    format: json
```

## 여러줄 또는 HTML 표시

### 카드 표시의 경우 여러줄 표시

![](https://files.readme.io/cd5b0bd-display-card.png "display-card.png")

```yaml
- path: test/multiline
  blocks:
  - type: query
    resource: mysql.qa
    sqlType: select
    sql: >
      SELECT id, name, memo
      FROM properties_copy
      ORDER BY id ASC 
      LIMIT 100
    display: card
```

### 카드 표시에서 JSON 지정 시

![](https://files.readme.io/28a7b09-display-card-json.png "display-card-json.png")

```yaml
- path: test/multiline
  blocks:
  - type: query
    resource: mysql.qa
    sqlType: select
    sql: >
      SELECT id, name, memo
      FROM properties_copy
      ORDER BY id ASC 
      LIMIT 100
    display: card
    # json 지정
    columnOptions:
    - field: memo
      format: json
```

### 카드 표시에서 HTML 지정

![](https://files.readme.io/d78c228-display-card-html.png "display-card-html.png")

```yaml
- path: test/multiline
  blocks:
  - type: query
    resource: mysql.qa
    sqlType: select
    sql: >
      SELECT id, name, memo
      FROM properties_copy
      ORDER BY id ASC 
      LIMIT 100
    display: card
    # html 지정
    columnOptions:
    - field: memo
      format: html
```

### 1단 표시에서 여러줄 표시

![](https://files.readme.io/e5000b7-display-col1-multiline.png "display-col1-multiline.png")

```yaml
- path: test/multiline
  blocks:
  - type: query
    resource: mysql.qa
    sqlType: select
    sql: >
      SELECT id, name, memo
      FROM properties_copy
      ORDER BY id ASC 
      LIMIT 100
    display: col-1
```

### 1단 표시에서 HTML 표시

![](https://files.readme.io/246de8f-display-col1-html.png "display-col1-html.png")

```yaml
- path: test/multiline
  blocks:
  - type: query
    resource: mysql.qa
    sqlType: select
    sql: >
      SELECT id, name, memo
      FROM properties_copy
      ORDER BY id ASC 
      LIMIT 100
    display: col-1
    columnOptions:
    - field: memo
      format: html
```

### 테이블에서 여러줄 표시

![](https://files.readme.io/c4954e2-table-multiline.png "table-multiline.png")

```yaml
format: html
```

![](https://files.readme.io/74fd910-table-textarea.png "table-textarea.png")

```yaml
format: textarea
```

> 📘 
> 
> 위의 내용은 viewModal (modalOptions) 모달 안에서도 동일하게 작동합니다.