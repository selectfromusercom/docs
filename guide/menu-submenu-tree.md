---
outline: deep
---

# 계층 메뉴 만들기

메뉴 아래에 부메뉴를 추가합니다. 접기 펴기를 지원하며 새로고침해도 유지됩니다. (브라우저 저장)

![](https://imagedelivery.net/MHVC-FGTDyxApYeHyF29Tw/fdaa8199-863e-4e3e-46cf-f85c9d848800/docs "folding-menus.png")

```yaml
menus:
- group: 회원
  name: 고객 관리
  path: users
  placement: expand-only

  menus:
  - path: users/garden
    name: 수목원
    placement: menu-only

    menus:
    - path: users/garden/pine
      name: 소나무
      group: garden

    - path: users/garden/oak
      name: 참나무
      group: garden

  - path: page/a
    name: 안테나뮤직

  - path: page/iv6myg23
    name: 카카오엔터
```

## placement

하위 menus가 있는 경우 원하는 옵션을 지정합니다.

### expand-only

- 메뉴 클릭시 열리고 페이지 이동은 없습니다.

### menu-only

- 메뉴 클릭시 페이지 이동이 됩니다.
- 메뉴에만 노출되고 탭에는 보이지 않습니다.
- 오른쪽 아이콘을 클릭시 펼쳐집니다.

### 비어있는 값 (default)

- 메뉴 클릭시 페이지 이동이 됩니다.
- 메뉴와 탭에 노출됩니다.
- 오른쪽 아이콘을 클릭시 펼쳐집니다.