---
outline: deep
---

# 입력 필드 만들기

필터링된 데이터를 조회하거나 데이터를 추가, 수정하기 위해서는 입력 필드(input field) UI가 필요합니다. 

이런 필드를 만드는 방법을 안내드립니다.

셀렉트 어드민에서는 기본적으로 `params`가 입력 필드(input field)의 역할을 맡습니다. 

데이터를 컨트롤하기 위해 값을 입력하는 공간이라는 개념에서 동일한 역할을 하기 때문이죠. 

params 는 parameter를 뜻하며 기본적으로 key 라는 yaml 키와 함께합니다. 

```yaml
params:
- key: name
  field: 이름
- key: category
```