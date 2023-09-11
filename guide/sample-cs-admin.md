---
outline: deep
---

# 고객 지원 툴

고객에게 서비스를 제공하게 되면 예외 상황이 발생하거나 추가적인 지원이 필요할 때가 있습니다. 
고객은 체계적인 지원 서비스에 만족을 느낄 수 있기에 자사 서비스에 알맞는 데이터와 UI가 필요합니다. 
셀렉트를 이용해서 고객 만족을 위한 프로세스 도구를 만들어보세요.

## 전체 YAML

```yaml
menus:
- path: user
  name: 고객 조회
pages:
- path: user
  blocks:
  - type: query
    resource: acme
    sqlType: select
    sql: >
      SELECT * 
      FROM users 
      WHERE (LEGNTH(:email) = 0 or email LIKE CONTACT('%', :email, '%'))
    params:
    - key: email
    viewModal:
      blocks:
      - type: query
        name: 주문 내역
        resource: acme
        sqlType: select
        sql: >
          SELECT *
          FROM orders
          WHERE user_id = :user_id
        params:
        - key: user_id
          valueFromRow: id
```

## 고객 조회

기본적인 고객 정보 조회 페이지는 아래와 같이 만들 수 있습니다. 

![](https://imagedelivery.net/MHVC-FGTDyxApYeHyF29Tw/1a3234a3-1141-45d9-771f-b16775137300/docs "read-customers.png")

```yaml
menus:
- path: user
  name: 고객 조회
pages:
- path: user
  blocks:
    - type: query
      resource: acme
      sqlType: select
      sql: >
        SELECT * FROM users LIMIT 10
```

### 특정 정보로 고객 찾기

email 로 고객 정보를 찾고 싶은 경우 어떻게 해야할까요?

![](https://imagedelivery.net/MHVC-FGTDyxApYeHyF29Tw/854b27fe-39e8-496c-5da4-c1b5a2f66300/docs "find-customer-by-email.png")

params 를 이용해 sql 쿼리 안에 매개변수(parameter)로 사용하시면 됩니다. 

```yaml
sql: >
  SELECT * FROM users WHERE email = :email LIMIT 10
params:
- key: email
```

하지만 정확한 이메일을 알지 못하는 등의 이유로 부분적인 정보로 조회해야할 때가 있습니다. 이럴 때는 sql 쿼리의 where 절을 아래와 같이 작성하시면 됩니다. 

```sql
SELECT * 
FROM users 
WHERE (LENGTH(:email) = 0 OR email LIKE CONTACT('%', :email, '%'))
```

![](https://imagedelivery.net/MHVC-FGTDyxApYeHyF29Tw/e7748f40-d634-40b3-f2b3-52349f71fd00/docs "find-customer-by-email-result.png")

## 고객 관련 정보 조회

고객의 주문 또는 결제 상태를 확인하고 조치를 취하는 페이지 또한 만들 수 있습니다. 

```yaml
viewModal:
  blocks:
  - type: query
    name: 주문 내역
    resource: acme
    sqlType: select
    sql: >
      SELECT *
      FROM orders
      WHERE user_id = :user_id
    params:
    - key: user_id
      valueFromRow: id
```

## 상세 내역 링크로 공유

많은 회사들이 특정 서비스 데이터 내역을 슬랙(slack) 등 팀 내부 커뮤니케이션 공간에 공유해서 이슈를 파악하고 논의하게 됩니다. 

이 때 주문 또는 결제 ID 등으로 공유하기로 약속을 하기도 하지만, 더 다양한 데이터를 체크해야하거나 상황이 복잡한 경우 잘 지켜지지 않거나 충분하지 않기도 합니다. 

셀렉트의 링크 기능이 이런 문제를 쉽게 해결할 수 있게 도와드립니다. 브라우저의 링크를 복사해서 팀원들에게 공유하고 쉽게 해당 정보를 조회할 수 있게 해보세요.

![](https://imagedelivery.net/MHVC-FGTDyxApYeHyF29Tw/18f7a84d-ce3f-4699-f623-429421901200/docs "붙여넣은_이미지_2022__11__1__오후_2_48.jpg")