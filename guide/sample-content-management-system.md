---
outline: deep
---

# 콘텐츠 관리 CMS

## 자료 조회 및 수정 페이지

### 결과 페이지

![](https://files.readme.io/18f1fbd-_2022-11-01__2.21.52.png "스크린샷 2022-11-01 오후 2.21.52.png")

### 설정 파일 YAML 내용

```yaml
menus:
- path: contents
  name: 컨텐츠 관리
  group: cms

pages:
- path: contents
  blocks:
  - type: query
    resource: mysql.cms
    sqlType: select
    sql: >
      SELECT *
      FROM s_contents
      WHERE (!LENGTH(:locale) OR locale = :locale)
      ORDER BY page, order_in_page ASC
    autoload: false
    searchOptions:
      enabled: true                  
    params:
    - key: locale
      label: 언어
      dropdown:
      - '' 
      - en-US
      - ko-KR
    columns:
      id:
        label: ID
      page:
        label: 페이지
      label:
        label: 라벨
      content:
        label: 내용
      order_in_page:
        label: 페이지 순서
      locale:
        label: 언어
    viewModal:
      useColumn: page
      blocks:
      - type: query
        resource: mysql.cms
        sqlType: update
        sql: >
          UPDATE s_contents
          SET content = :content
          WHERE id = :id
        reloadAfterSubmit: true  
        params:
        - key: content
          label: 콘텐츠
          format: textarea
          defaultValueFromRow: content
        - key: id
          label: ID
          valueFromRow: id
```