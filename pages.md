---
outline: deep
---

#### [`layout`](/layout#pages)

# `pages: []`

페이지들을 구성하기 위한 최상위 키

## pages.path

개별 페이지와 메뉴를 path 정보로 연결합니다.

```yaml
menus:
- path: user
- path: payment

pages:
- path: user
- path: payment
```


## [pages.blocks](/blocks)

페이지 안을 블록으로 구성합니다. 

```yaml
menus:
- path: user

pages:
- path: user
  blocks:
```

## pages.autofocus

페이지 단위로 입력 필드의 autofocus 기능을 끌 수 있습니다.

```yaml
pages:
- path: user
  autofocus: false
```

## [pages.params](/params#pages-params)