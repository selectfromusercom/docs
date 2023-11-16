---
outline: deep
---

# 페이지 이동

## 내부 페이지 간 이동

처음에 조회한 테이블에서 특정 컬럼에 링크를 추가하고 다른 페이지를 열도록 설정 가능합니다.  
아래는 테이블 조회결과 id 를 클릭하면 coupon/tabs?merchant_id={{id}}로 이동하여 조회하는 샘플입니다. 

```yaml
- type: query
  resource: mysql.qa
  sql: SELECT id, name FROM test_10k LIMIT 3
  sqlType: select
  refs:
  - href: coupon/tabs
    param: merchant_id
    column: id
```

### refs 여러개 param 이용 시

param 키 없이 <span v-pre>`{{parameter}}`</span> 해당 양식으로 사용하시면 됩니다.

```yaml
refs:
- column: active_team
  href: users?team_id={{id}}&type={{type}}
```

## 외부링크 열기

테이블 조회결과 id 를 클릭하면 <https://btc.com/ko/btc/transaction/{{tx_id}}> 새창으로 여는 샘플입니다. 

```yaml
- type: query
  resource: mysql.qa
  sql: SELECT id, name FROM test_10k LIMIT 3
  sqlType: select
  refs:
  - column: id
    param: tx_id
    href: https://btc.com/ko/btc/transaction/{{tx_id}}
```