---
outline: deep
---

# 메뉴 구성

## 메뉴와 페이지 개념

셀렉트에는 메뉴(menus)와 페이지(pages) 2가지 개념이 있습니다.  
메뉴는 크게 대메뉴와 하위메뉴로 구성 가능하며 그룹핑과 계층 설정이 가능합니다.  
페이지는 블록(blocks)으로 이루어져있으며 메뉴와 path를 통해 연결됩니다. 

## 대메뉴 만들기

![](https://imagedelivery.net/MHVC-FGTDyxApYeHyF29Tw/83fbfe98-a193-43eb-da35-49134a741d00/docs "top-menus.png")

아래의 값 입력으로 어드민에 메뉴가 표시됩니다.

```yaml
menus:
- path: menu1
  name: 메뉴1
- path: menu2
  name: 메뉴2
```

## 하위메뉴 탭메뉴 만들기

![](https://imagedelivery.net/MHVC-FGTDyxApYeHyF29Tw/66cbffdc-95cf-4fd2-0aac-1aebe3dc0600/docs "sub-menus.png")

```yaml
menus:
- path: coupon/list
  name: 쿠폰 관리
  group: 쿠폰

- path: coupon/order
  name: 쿠폰 순서
  group: 쿠폰
  placement: tab-only

- path: coupon/issue
  name: 쿠폰 추가
  group: 쿠폰
  placement: tab-only

- path: coupon/list2
  name: 쿠폰 검색
  group: 쿠폰
  placement: tab-only
```

## 대메뉴와 탭 이름을 나누기

![](https://imagedelivery.net/MHVC-FGTDyxApYeHyF29Tw/4972638b-1527-42ba-ed62-e89b22c6c700/docs "main-sub-menus.png")

`/coupon` 하위 메뉴로 path을 통일 지정합니다.

```yaml
menus:
- path: coupon
  name: 쿠폰 관리
  group: 쿠폰
  placement: menu-only

- path: coupon/list
  name: 발급내역
  group: 쿠폰
  placement: tab-only

- path: coupon/order
  name: 노출순서
  group: 쿠폰
  placement: tab-only

- path: coupon/issue
  name: 코드추가
  group: 쿠폰
  placement: tab-only

- path: coupon/list2
  name: 사용처내역
  group: 쿠폰
  placement: tab-only
```

## 기타 샘플

```yaml
menus:
- path: 1
  name: 1
  group: 1

- path: 2 
  name: 2
  group: 1
```

```yaml
menus:
- path: 1
  name: 1
  group: 1
  
- path: 2 
  name: 2
  group: 1
  placement: tab-only
```

```yaml
menus:
- path: 1
  name: 1
  group: 1
  placement: menu-only
  
- path: 2 
  name: 2
  group: 1
  placement: tab-only
```

```yaml
menus:
- path: customers
  name: customer management
  group: 1
  placement: menu-only
  redirect: 

- path: customers/all
  name: all customers
  group: 1
  placement: tab-only
  
- path: customers/vip
  name: vip
  group: 1
  placement: tab-only
```

## 메뉴에 링크 넣기

자주 사용하는 구글 시트 또는 외부 서비스로 빠르게 넘어갈 수 있게 링크를 걸어보세요. 퀵 메뉴 개념으로 사용하실 수 있습니다.

![](https://imagedelivery.net/MHVC-FGTDyxApYeHyF29Tw/9f0e3b2c-2bf4-4005-cfea-727f0f176900/docs "menu-lilnk.png")

`target: _blank`

- 메뉴 클릭 시 ‘새 창'으로 띄우기 (html 속 개념과 동일합니다.)

```yaml
menus:
- path: https://www.google.com
  name: 구글
  target: _blank
```

## 메뉴 구분선 넣기

메뉴가 많아지면서 구분하기 어려워질 때, 구분선을 써서 사용성을 좋게 만들 수 있습니다.

```yaml
menus:
- path: up
  name: 위

- type: divider

- path: down
  name: 아래
```