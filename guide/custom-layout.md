---
outline: deep
---

# 레이아웃 커스텀

레이아웃 layout을 자유롭게 설정하고, 레이아웃 간 데이터 활용 방법에 대해 알려드립니다.

## 예시

주문 그룹을 조회하고 특정 행(row)의 데이터들로, 다른 테이블의 사용자ID(user_id)와 주문그룹ID(order_group_id)로 상세 정보를 조회하는 페이지 예시를 보여드립니다. 

![](https://files.readme.io/65f7a86-_2023-02-07__7.08.19.png "스크린샷 2023-02-07 오후 7.08.19.png")

```yaml
menus:
- path: order-breakdown
  name: 주문내역 조사
  
pages:
- path: order-breakdown
  layout: 
    style:
      display: flex    
    div:
      - name: left 
        style: 
          width: 50%
      - style:
          width: 1px
          borderRight: "solid 1px #f0f0f0"
          margin: 0 1rem
      - style:
          display: flex
          flexDirection: column
          width: 50%
        div:
        - name: right-top
        - name: right-bottom 

  blocks:
  - type: query
    layout: left 
    name: order_group  
    resource: mysql.qa 
    sqlType: select 
    sql: >
      SELECT id, user_id, created_at
      FROM order_groups 
      WHERE ((LENGTH(:id)=0 OR id = :id))
      ORDER BY id DESC 
      LIMIT 100
    params:
      - key: id 
    paginationOptions: 
      enabled: true 
      perPage: 10 
    columns:
      user_id:
        updateParams:
          user_id: "{{user_id}}"
          order_group_id: "{{id}}"

  - type: query
    layout: right-top
    name: user
    resource: mysql.qa 
    sqlType: select 
    sql: >
      SELECT id, name, phone, email, created_at
      FROM users 
      WHERE ((LENGTH(:user_id)=0 OR id = :user_id))
      ORDER BY id DESC 
      LIMIT 10 
    params:
      - key: user_id 

  - type: query
    layout: right-bottom 
    name: orders
    resource: mysql.qa 
    sqlType: select 
    sql: >
      SELECT id, order_group_id, product_id, created_at, status 
      FROM orders 
      WHERE ((LENGTH(:order_group_id)=0 OR order_group_id = :order_group_id))
      ORDER BY id DESC 
      LIMIT 10 
    params:
      - key: order_group_id
```

## YAML 정보

기본적인 HTML과 CSS style 방식을 따릅니다. CSS style 값을 입력해 디테일한 디자인을 변경하실 수 있습니다. 

### 기본 구성

- layout 아래의 `name`값으로 blocks 아래의 `name`과 연결합니다. 
- 레이아웃과 블록을 독립적으로 구성하여, 서로 영향을 주지 않으며 자유롭게 바꿀 수 있게 됩니다. 
- `name`은 임의로 설정할 수 있어요. 이해하기 쉽게 의미가 담긴 단어를 사용하시면 좋습니다. 
- layout 과 blocks 안에 각 `name` 값들이 겹치지 않게 확인해주세요.  

```yaml
pages:
- path: layout/2column
  layout:
    style:
      display: flex 
    div:
      - name: left 
      - name: right
  
  blocks:
  - type: query
  	name: left 
  - type: query
  	name: right
```

### updateParams

클릭할 컬럼을 선택하고, 해당 컬럼의 필드를 클릭했을 때 업데이트할 파라미터를 지정합니다. 

```yaml
- type: query
  layout: left 
  name: order_group  
  resource: mysql.qa 
  sqlType: select 
  sql: >
    SELECT id, user_id, created_at
    FROM order_groups 
    WHERE ((LENGTH(:id)=0 OR id = :id))
    ORDER BY id DESC 
    LIMIT 100
  ...
  columns:
    user_id: # 클릭할 컬럼
      updateParams:
        user_id: "{{user_id}}"
        order_group_id: "{{id}}"
```

updateParams 아래의 의미

- `user_id`라는 params.key 에 소속 블록의 필드 `user_id` 값을 가져와서 입력합니다. 
- `order_group_id`라는 params.key 에 소속 블록의 필드 `id` 값을 가져와서 입력합니다.