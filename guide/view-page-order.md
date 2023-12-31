---
outline: deep
---

# 테이블 정렬 방법

## 테이블 내장 기능으로 정렬하기

테이블의 머리말을 눌러 컬럼별로 정렬을 할 수 있습니다.

![](https://imagedelivery.net/MHVC-FGTDyxApYeHyF29Tw/ea577a54-92cd-42a3-d2d3-40adada40d00/docs "table-column-ordering.png")

## 여러개 컬럼으로 정렬하기

예시 테이블과 함께 보여드리겠습니다. 먼저 name 오름차순으로 정렬을 합니다.

![](https://imagedelivery.net/MHVC-FGTDyxApYeHyF29Tw/a6c29737-e779-4977-c848-d38fecd0d400/docs "multi-column-ordering1.png")

name 오름차순에 이어 id 내림차순으로도 정렬하면 아래와 같은 결과가 됩니다. 

![](https://imagedelivery.net/MHVC-FGTDyxApYeHyF29Tw/ad182c03-c5bf-4302-bbaf-e50e96602800/docs "multi-column-ordering2.jpeg")

## 테이블 정렬을 서버에서 하고 싶어요.

입력 파라메터가 orderBy와 일치하는 경우 안전하게 쿼리에 추가됩니다.

**예제** 

- params dropdown에서 선택한 값(예: 최근가입순)에 맞춰 orderBy의 키가 매칭됩니다. 
- 매칭된 키의 값을 <span v-pre>`{{ orderBy }}`</span>로 넘겨줍니다. 

```yaml
- type: query
  resource: mysql
  name: 회원목록
  sqlType: select
  sql: >
    SELECT *
    FROM user_profiles
    {{ orderBy }}
    LIMIT 100
  autoload: false
  params:
    - key: order
      label: 정렬
      defaultValue: 최근가입순
      dropdown:
        - 최근가입순
        - 오래된가입순
      orderBy:
        '최근가입순': ORDER BY created_at DESC
        '오래된가입순': ORDER BY created_at ASC
```