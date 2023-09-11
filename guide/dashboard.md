---
outline: deep
---

# 대시보드 넣기

팀 어드민 페이지에 접속했을 때 나타나는 첫 화면에 대시보드를 만들어보세요. 최근 서비스 데이터를 한눈에 보는 페이지 등을 만들 수 있습니다. 

## 1. dashboard 레이아웃 활용

`id: dashboard` 인 경우 메인화면에 표시됩니다.  
`layout: dashboard` 인 경우 카드뷰 형태로 표시됩니다.  
카드안에는 내용을 (기본값) 테이블로 표시하거나 metric 으로 표시 가능합니다.  
차트로 표시하는 방법은 아래 문서를 참고해주세요.

![](https://files.readme.io/4a7d944-dashboard.png "dashboard.png")

대시보드 레이아웃(layout: dashboard)은 일반 메뉴/페이지에서도 이용 가능합니다.

```yaml
pages:
- id: dashboard
  layout: dashboard
  blocks:
  - type: query
    resource: mysql.qa
    name: 1
    width: calc(33% - 1rem)
    sqlType: select
    sql: >
      SELECT 322 AS '신규 사용자 수', 
        7300 AS '3개월 사용자 수' ,
        35 AS '이번주 팀' ,
        33 AS '지난주 팀'  
    display: metric           
  - type: query
    resource: mysql.qa
    name: 2
    width: calc(33% - 1rem)
    sqlType: select
    sql: >
      SELECT 8601 AS '이번주 주문수'
    display: metric
```

## 2. 마크다운 내용 활용

메인 화면에 공지와 안내사항을 적어놓습니다.

![](https://files.readme.io/b3a8f6b-markdown.png "markdown.png")

```yaml
pages:
- id: dashboard
  blocks:
  - type: markdown
    content: |
      # 재고 조회용
      [송장](https://linear.app/#)

      ## 담당자
      @jhlee

      ### 안내
      > 고객관리 재고조회는 실시간 데이터입니다.
      > 
      > 재고통계는 1일전 00시 데이터입니다.
      > 
      > 고객 조회시 연락처 부분검색 불가능합니다!
```

## 3. 가로 크기 지정

```text
width: 200px

width: calc(50% - 1rem)

width: 50%
```

![](https://files.readme.io/63f6a39-width-ex1.png "width-ex1.png")

![](https://files.readme.io/19db668-width-ex2.png "width-ex2.png")