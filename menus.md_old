---
outline: deep
---

#### [`layout`](/layout#menus)

# `menus: []`

어드민 사용자 페이지의 메뉴를 설정할 수 있습니다. 

## menus.path

메뉴에 접근하는 경로입니다. 링크를 공유했을 때 사용자가 이해하기 쉬운 네이밍을 한다면 좋습니다.

## menus.name

메뉴에 표시되는 이름입니다.

```yaml
menus:
- path: user
  name: 사용자
```

## menus.group

group이 없는 경우 모든 메뉴는 같은 그룹으로 인식됩니다. 메뉴들을 따로 묶고 싶으신 경우 group을 이용해주세요.

```yaml
menus:
- path: user
  name: 사용자
  group: u
- path: user/active
  name: 활성 유저
  group: u
```

## menus.placement

메뉴는 기본적으로 왼쪽 영역과 오른쪽 탭에 둘다 나타납니다. 왼쪽 또는 탭에만 메뉴를 보여주고 싶은 경우 placement를 이용해보세요.

```yaml
placement: menu-only
placement: tab-only
placement: expand-only
placement: page-only # 탭메뉴 표시 안함
```

```yaml
menus:
- path: user
  name: 사용자
  group: u
- path: user/active
  name: 활성 유저
  group: u
  placement: tab-only
```

## menus.redirect

메뉴 클릭 시 redirect 시킬 path 또는 링크를 지정합니다. 

```yaml
menus:
- path: user
  name: 사용자
  group: u
  redirect: user/all
  placement: menu-only
- path: user/all
  name: 전체 사용자
  group: u
  placement: tab-only
- path: user/active
  name: 활성 유저
  group: u
  placement: tab-only
```

## menus.roles

메뉴와 페이지 접근에 대한 권한을 설정합니다. 그룹별 또는 개별 이메일로 설정 가능합니다.  
자세한 사항은 ['메뉴 권한 설정'](https://docs.selectfromuser.com/docs/%EB%A9%94%EB%89%B4-%EA%B6%8C%ED%95%9C-%EC%84%A4%EC%A0%95) 가이드에서 확인하실 수 있어요. 

```yaml
menus:
- path: /approvals
  name: 심사
  roles:
    list:
    - 팀장
    - 임원
    view:
    - 팀장
    - 임원
    - email::test@email.com
```

| list (메뉴에 보이기) | view (페이지 접근) | 용도/결과                       |
| :------------- | :------------ | :-------------------------- |
| O              | O             | 해당 메뉴와 페이지에 접근 권한 있음 (일반적)  |
| X              | X             | 해당 메뉴와 페이지에 권한 없음 (일반적)     |
| O              | X             | 권한은 없지만 메뉴의 존재 자체는 알 수 있음   |
| X              | O             | URL만으로 비공개 페이지 공유 또는 테스트할 때 |

## menus.type: divider

메뉴 사이에 시각적으로 영역을 구분짓고 싶을 때 사용할 수 있습니다.

```yaml
menus:
- path: user
  name: 사용자
  group: u
  
- type: divider

- path: payment
  name: 결제
  group: p
```

## menus.type: search

메뉴들 사이에 퀵서치Quick Search 용도로 검색창을 넣을 수 있습니다. 

- `redirect`로 path를 지정하여 이동합니다. 
- 검색 시 입력값은 trim(공백제거) 처리합니다.
- `label`로 검색 버튼 이름을 바꿔보세요. 

```yaml
menus: 

  - type: search
    label: 검색
    placeholder: 고객이름
    redirect: search-user?name={{value}}

  - type: search
  	label: 찾기
    placeholder: 010-0000-0000
    redirect: search-user?phone={{value}}
    
  - path: search-user
```

### placement: top

검색창을 최상단 메뉴바 영역에도 보이게 하고, 간단한 스타일도 적용할 수 있습니다. 

```yaml YAML
menus:

  - type: search
  	label: 검색
    placeholder: 010-0000-0000
    redirect: search-user?phone={{value}}
    placement: top
    style:
      width: 500px
```

### datalistFromQuery

검색창 안에 보여줄 특정 데이터들을 datalistFromQuery로 가져올 수 있습니다. 

- 가져온 데이터 필드들을 `format`으로 치환해서 보여줍니다.
- `html: true`를 사용하면 format 안에 html 양식을 사용할 수 있습니다. 
- 가져온 데이터의 테이블에 따라 redirect를 다르게 지정할 수 있습니다. 

```yaml
menus:
  - type: search
    placement: top
    placeholder: 상품코드/재고코드/공급코드
    style:
      width: 300px
    datalistFromQuery:
      resource: mysql.qa
      type: query
      sqlType: select 
      sql: >
        (
          SELECT id, name, 'properties' AS category
          FROM properties
          WHERE id LIKE CONCAT('%', :value, '%')
             OR (LENGTH(:value) > 2 AND name LIKE CONCAT('%', :value, '%'))
          ORDER BY id DESC
          LIMIT 10
        )
        UNION ALL
        (
          SELECT id, name AS name2, 'properties2' AS category
          FROM properties2
          WHERE id LIKE CONCAT('%', :value, '%')
             OR (LENGTH(:value) > 2 AND name LIKE CONCAT('%', :value, '%'))
          ORDER BY id DESC
          LIMIT 10
        )
      format: >
        ID: {{ id}}     Name: {{name}}{{   name2    }} ({{category}})
      
      # html: true
      # format: >
      #   <span style="color: royalblue">ID: {{ id}}</span>    
      #   {{name}}{{   name2   }}
      #   ({{category}})

      redirect:
        properties: search-user-id?p={{category}}&user_id={{id}}
        properties2: >
          search-user-id?p={{category}}&cc_id={{id}}#{{hero_image_url}}
```

## menus.icon

메뉴 이름(name) 앞에 U, NEW, TIP 같은 내용이나 약어를 텍스트로 추가하거나 mdi 아이콘을 추가할 수 있어요.

- 지원하는 아이콘: https://pictogrammers.github.io/@mdi/font/7.2.96/
- 필요한 아이콘을 찾기 쉬운 사이트: https://pictogrammers.com/library/mdi/

```yaml
menus:
- path: user
  icon: U
  name: 사용자  
- path: payment
  icon: mdi-cash
  name: 결제관리
```

## menus.iconEnd

메뉴 이름(name) 뒤쪽에 텍스트를 추가하거나 mdi 아이콘을 추가할 수 있어요. icon과 함께 사용할 수도 있습니다.

```yaml
menus:
- path: payment
  iconEnd: mdi-cash
  name: 결제관리
```

## menus.menus

메뉴 아래에 메뉴를 추가하고 접고 펼 수 있습니다.

```yaml
menus:
- path: user
  name: 사용자 관리
  placement: expand-only

  menus:
  - path: active-user
    name: 활성 사용자
```