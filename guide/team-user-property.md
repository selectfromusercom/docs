---
outline: deep
---

# 사용자 속성 설정

## 어디에 쓰이나요?

대표적으로 아래 케이스와 같이 사용자에게 제한된 정보를 보여줄 때 활용하기 좋습니다.

- 마켓플레이스 공급자를 위한 파트너센터
- B2B 서비스 클라이언트/고객사 포털

## 속성 설정 방법

UI로 사용자에게 속성(property)을 추가하고, SQL 쿼리 블록이나 API 블록 등에 변수로 사용할 수 있습니다.  
설정 > 계정 > 계정 목록에서 설정하려는 사용자의 이메일 주소 클릭

![](https://files.readme.io/eadbb36-image.png)

사용자 속성(프로퍼티, property)에서 키(key)와 값(value)를 지정할 수 있습니다.

## 설정한 사용자 속성을 이용하는 방법

`params`에서 `valueFromUserProperty`로 사용자 속성의 키에 해당하는 값을 가져와 사용할 수 있습니다.

```yaml
params:
- key: pcode
  valueFromUserProperty: PARTNER_CODE
```

**<예시>** B2B 서비스 고객사에게 맞는 주문 정보만 보여드리는 쿼리 블록

```yaml
- type: query
  resource: sample_db
  sql: select * from orders where partner_code = :pcode
  params:
  - key: pcode
    valueFromUserProperty: PARTNER_CODE
```

## 심화 : YAML로 설정하는 방법

대량의 계정을 설정하거나 파일 단위로 적용하고 싶을 때 적합합니다.

> 📘 
> 
> UI 설정값이 우선적으로 적용되고, 그 다음에 YAML 값이 적용됩니다. 또한 YAML에서는 파일(file) 단위로 권한 지정이 가능합니다.

```yaml
users:
- email: myemail@domain.com
  property:
    PARTNER_CODE: BANK_KO 
    USER_GROUP: SALES
- email: otheremail@domain.com
  property:
    PARTNER_CODE: FIN_EN
    USER_GROUP: BIZ
```