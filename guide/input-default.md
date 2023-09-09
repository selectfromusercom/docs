---
outline: deep
---

# 입력 필드에 기본값 넣기

## defaultValue

- 주로 params 키 아래에서 쓰입니다.
- select, update, insert 쿼리 관계없이 사용 가능합니다.

```yaml
- path: products
  blocks:
  - type: query
    resource: mysql.sample
    name: 추가
    sqlType: insert
    sql: >
      INSERT INTO products (name, category)
      VALUES (:name, :category)
    params:
    - key: name
    - key: category
      # 기본값 설정
      defaultValue: uncategorized
```