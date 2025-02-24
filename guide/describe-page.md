---
outline: deep
---

# 설명 추가하기

## 마크다운 블록

마크다운을 활용해 내부 사용자에게 안내할 내용을 작성할 수 있습니다.

![](https://imagedelivery.net/MHVC-FGTDyxApYeHyF29Tw/1072bb31-cb7d-4dcb-b928-23a6a8881b00/docs "markdown-block.png")

```yaml
- path: guide
  blocks:
  - type: markdown
    content: >
      1.  List item one.

          List item one continued with a second paragraph followed by an
          Indented block.

              $ ls *.sh
              $ mv *.sh ~/tmp

          List item continued with a third paragraph.

      2.  List item two continued with an open block.

          This paragraph is part of the preceding list item.

          1. This list is nested and does not require explicit item continuation.

             This paragraph is part of the preceding list item.

          2. List item b.

             This paragraph belongs to item two of the outer list.
```

## FAQ

### HTML로 작성해도 되나요?

네 아래와 같이 입력하실 수 있습니다.

![](./image/markdown-html.png)

```yaml
  - type: markdown
    content: |
      <p class="text-slate-600 font-bold text-2xl">영수증 확인 매장목록 페이지</p>

      <ul class="text-slate-400 font-bold text-xs">
        <li>과거 데이터는 <a href='#'>과거거래내역</a> 페이지에서 조회 가능합니다.</li>
        <li>연락처 마스킹은 클릭을 통해 확인하실 수 있습니다.</li>
      </ul>
```

### 마크다운과 쿼리를 같이 표시할 수 있나요?

네 아래와 같이 type: markdown과 type: query를 이어서 사용하시면 됩니다.

![](https://imagedelivery.net/MHVC-FGTDyxApYeHyF29Tw/47f0e6b9-8bd8-4c4f-d26b-9813c2414c00/docs "markdown-query-block.png")

```yaml
pages:
- path: guide
  blocks:
  - type: markdown
    content: >
      ## 제목입니다.

      > 내용
  - type: query
    resource: mysql.qa
    sqlType: select
    sql: SELECT * FROM properties ORDER BY id ASC LIMIT 100
```