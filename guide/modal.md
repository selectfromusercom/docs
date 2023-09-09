---
outline: deep
---

# 모달 구성

## 모달 팝업 - 조회/수정 살펴보기

> 📘 
> 
> "모달 팝업"은 조회해야할 항목이 많을 때, 가독성을 위해 테이블에는 몇 개의 컬럼만 보여주고 상세 조회 시 모달을 띄워서 추가 정보를 보여주는데 유용합니다.

> 📘 
> 
> 모달은 최대 3단계까지 띄울 수 있습니다.

![](https://files.readme.io/2507221-table-modal.png "table-modal.png")

![](https://files.readme.io/fd53474-view-modal.png "view-modal.png")

모달을 추가하고 싶은 블록을 확인합니다.

```yaml
- path: users/all
  blocks:
  - type: query
    resource: mysql.qa
    sqlType: select
    sql: >
      SELECT id, name
      FROM properties
      ORDER BY id ASC 
      LIMIT 100
```

`viewModal` 과 알맞는 블록 내용을 추가합니다. 

```yaml
- path: users/all
  blocks:
  - type: query
    resource: mysql.qa
    sqlType: select
    sql: >
      SELECT id, name
      FROM properties
      ORDER BY id ASC 
      LIMIT 100
    viewModal:
      blocks:
      - type: query
        resource: mysql.qa
        sqlType: select
        sql: >
          SELECT *
          FROM properties
          WHERE id = :id
          LIMIT 1
        params:
        - key: id
          valueFromRow: id
```

id나 name 등 다른 컬럼에 모달 링크를 걸 수도 있습니다.

![](https://files.readme.io/85a6717-modal-column-link.png "modal-column-link.png")

```yaml
viewModal:
  useColumn: name
```

## 테이블 피봇해서 보기

![](https://files.readme.io/a9efdfb-pivot-table-modal.png "pivot-table-modal.png")

`display: col-2` 를 추가해서 테이블을 피봇하고 2열로 편하게 조회할 수 있게 됩니다. 

```yaml
- path: users/all
  blocks:
  - type: query
    resource: mysql.qa
    sqlType: select
    sql: >
      SELECT id, name
      FROM properties
      ORDER BY id ASC 
      LIMIT 100
    viewModal:
      blocks:
      - type: query
        resource: mysql.qa
        sqlType: select
        sql: >
          SELECT *
          FROM properties
          WHERE id = :id          
          LIMIT 1
        # 2등분
        display: col-2
        params:
        - key: id
          valueFromRow: id
```

## 모달에 내용을 추가하기

모달 아래에 blocks가 있기 때문에 blocks 하위의 설정들은 모두 동일하게 적용 가능합니다.  
하위 탭을 추가한 샘플을 살펴보세요. 

![](https://files.readme.io/970623e-tabs-in-modal.png "tabs-in-modal.png")

```yaml
- path: users/all
  blocks:
  - type: query
    resource: mysql.qa
    sqlType: select
    sql: >
      SELECT id, name
      FROM properties
      ORDER BY id ASC 
      LIMIT 100
    viewModal:
      displayParentRow: false
      blocks:
      - type: query
        resource: mysql.qa
        sqlType: select
        sql: >
          SELECT id, name, address, `type`, memo
          FROM properties
          WHERE id = :id
        display: col-2
        params:
        - key: id
          valueFromRow: id
          # 세부 탭 설정
        tabOptions:
          autoload: 1
          tabs:
          - name: 예약내역
            # 내용 입력
            blocks:
            - type: query
              resource: mysql.qa
              sqlType: select
              sql: >
                SELECT fullname AS '예약자명',
                  CONCAT(LEFT(phone_primary,3), '****', RIGHT(phone_primary,4)) AS '연락처',
                  DATE_FORMAT(visitdate, '%Y-%m-%d') AS '체크인'
                FROM customer 
                WHERE workspace_id = 12 LIMIT 10
          - name: 정산내역
```