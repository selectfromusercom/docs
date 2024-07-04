---
outline: deep
---

# 텍스트 에디터로 추가, 수정하기

텍스트 에디터 editor로 내용을 입력하여 추가하거나 데이터를 수정할 수 있습니다. 간단한 CMS 기능을 만들어보세요.

## 전체 YAML

포스트 목록을 보고 수정하거나, 새 포스트를 추가하는 페이지를 만들 수 있습니다. 

```yaml
menus:
- path: posts
  name: 포스트 목록
  group: post
- path: add-post
  name: 포스트 추가
  group: post
  placement: tab-only

pages:
- path: posts
  blocks:
  - type: query
    resource: mysql.qa
    sql: SELECT id, title, created_at FROM posts ORDER BY id DESC
    paginationOptions:
      enabled: true 
      perPage: 10    
    viewModal:
      blocks:
      - type: query
        resource: mysql.qa
        sqlType: SELECT
        sql: SELECT * FROM posts WHERE id = :id
        params:
        - key: id
          valueFromRow: id
        display: form
        columns:
          title:
          content:
            format: editor
            editorOptions:
              mode: markdown
            updateOptions:
              type: query
              resource: mysql.qa
              sql: UPDATE posts SET content = :value WHERE id = :id

- path: add-post
  containerStyle: >
    padding-left: 70px;
    padding-right: 70px;
  blocks:
  - type: query
    resource: mysql.qa
    sql: INSERT INTO posts (title, content, created_at) VALUES (:title, :content, NOW())
    params:
    - key: title
      class: w-100
    - key: content
      format: editor
      class: w-100
      editorOptions:
        mode: markdown
        # mode: md
        # mode: html
        # mode: wysiwyg
        width: 100%
        height: 300px
```

## 결과 이미지들

포스트 목록 화면

![](https://imagedelivery.net/MHVC-FGTDyxApYeHyF29Tw/8dff0ccb-8ef1-4216-a628-89b30b149c00/docs "스크린샷 2022-12-23 오후 5.23.27.png")

개별 내역을 수정하는 모달 화면

![](https://imagedelivery.net/MHVC-FGTDyxApYeHyF29Tw/eef0163b-49b3-46c4-1119-d8c8386c3200/docs "스크린샷 2022-12-23 오후 5.23.48.png")

새 포스트를 추가하는 화면

![](https://imagedelivery.net/MHVC-FGTDyxApYeHyF29Tw/2b2f3e0c-6c3e-4af5-b999-614ddb1d3800/docs "스크린샷 2022-12-23 오후 5.23.55.png")

## YAML 세부 내용

### editorOptions.mode

에디터의 모드를 바꿀 수 있습니다. markdown과 md는 마크다운 용법을 따르는 에디터이며, html을 입력해도 그대로 반영됩니다. html 모드는 html만 적용됩니다. 

```yaml
editorOptions:
  mode: markdown
  # mode: md
  # mode: html
```