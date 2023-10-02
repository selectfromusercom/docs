---
outline: deep
---

# 메뉴 권한 설정

하나의 어드민 안에서도 접근 가능한 메뉴를 제어해야할 때가 있습니다. 사용자별, 그룹별로 접근 가능한 메뉴를 설정하는 방법을 안내드립니다.

## 용도

- 특정 메뉴를 감추고 싶을때
- 특정 메뉴를 표시하지만 비활성화 상태로 보이고, 조회를 막고 싶을 때  
  권한이 없는걸 알게하여 정확한 메뉴이름으로 요청을 받을 수 있어요.

## 준비

- 설정 > 권한 그룹 관리에서 모든 초대된 계정에 알맞는 권한그룹을 추가합니다.
- 예를 들면: 직원, 팀장, 임원 이렇게 3가지의 권한 그룹을 추가할 수 있습니다.
- 그룹이 없더라도 이메일로 직접 지정도 가능합니다.

## 적용하기

- 특정 메뉴를 ‘임원‘만 접근 가능하게 하려면 해당 메뉴 YML을 수정합니다.

```yaml
menus:
- path: /revenue
  name: 매출통계
  roles:
    view: 
    - 임원
```

- 특정 메뉴를 ‘팀장‘과 ‘임원’에게만 보이고 접근을 제한하려면 해당 메뉴 YML을 수정합니다.

```yaml
menus:
- path: /approvals
  name: 심사 2차
  roles:
    list:
    - 팀장
    - 임원
    view:
    - 팀장
    - 임원
```

- 특정 메뉴를 특정 메일 사용자에게만 접근을 부여하려면 아래와 같이 해당 메뉴 YML을 수정합니다.

```yaml
menus:
- path: /peer-review
  name: 팀리더-리뷰조회하기
  roles:
    list:
    - email::test@selectfromuser.com
    view:
    - email::test@selectfromuser.com
```

## 사용 팁

권한그룹과 이메일을 함께 쓸 수 있습니다. (ex: 팀원, 팀장, `email::example@domain.com`)

roles가 있지만 list 또는 view 가 비어있다면 모두에게 권한없음 처리됩니다.

- 조회 권한이 없으면 메뉴가 비활성화 됩니다. 

![](https://imagedelivery.net/MHVC-FGTDyxApYeHyF29Tw/f755299b-a9c3-4ffd-570b-9cb9aee29200/docs "deactivate-menu.png")

- 조회 권한이 없을 때, 경로(path)로 직접 접속해도 내용을 볼 수 없습니다. 

![](https://imagedelivery.net/MHVC-FGTDyxApYeHyF29Tw/a43a27d2-25e5-4427-9d7d-889cbe1a1f00/docs "access-403.png")

- 권한 그룹 관리 하단에 메뉴별 적용된 권한을 볼 수 있습니다. 

![](https://imagedelivery.net/MHVC-FGTDyxApYeHyF29Tw/e7827830-9d8b-480e-e3bf-81bed5a30a00/docs "access-control.png")

roles는 menus.path의 상하위/리다이렉트 개념에 영향받지 않습니다. 반드시 path별로 각각 관리해주세요.

**예제**

menus.redirect 이용 예제
- path: customers로 접속시 바로 customers/list로 바로 이동(리다이렉트)
- path: customers에 roles를 적용해도 customers/list에 적용되지 않음
- 원하는 경우 customer/list에 roles를 적용해야함

```yaml
menus:
  - path: customers
    name: 고객 관리
    placement: menu-only
    redirect: customers/list
    group: cust

  - path: customers/list
    name: 고객목록 조회
    placement: tab-only
    group: cust
    roles: 
      list:
        - email::example@domain.com
```