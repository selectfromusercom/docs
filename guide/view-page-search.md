---
outline: deep
---

# 테이블 간편 검색

테이블 데이터를 프론트 단에서 빠르게 검색하는 기능을 추가할 수 있습니다. 대량의 데이터를 개별 필드로 필터링해서 보고싶으신 경우 params를 활용해주세요.

![](https://files.readme.io/63c2425-searchoptions.png "searchoptions.png")

```yaml
blocks:
- type: query
  ...
  searchOptions:
    enabled: true
```