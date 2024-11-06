---
outline: deep
---

# 데이터 추가 및 수정 페이지

데이터 추가와 수정 페이지를 만들 때는 쿼리 블록과 함께 insert, update 쿼리를 사용하시면 됩니다. 

## 데이터 추가

insert 쿼리를 활용해서 아래와 같은 데이터 추가 페이지를 빠르게 만들 수 있습니다. 

![](https://imagedelivery.net/MHVC-FGTDyxApYeHyF29Tw/3d4aa152-7f56-485f-3a43-f48cc1db1b00/docs "insert-ui-basic.png")

```yaml
pages:
- path: add-customer-log
  blocks:
  - type: query
    sqlType: insert
    sql: > 
      INSERT INTO customer_log
      SET name = :name,
          location = :location,
          status = :status,
          memo = :memo,
          created_at = NOW()
    params:
    - key: name
    - key: status
    - key: memo
    # confirm: false
```

## 데이터 수정

update 쿼리를 사용해 아래와 같은 수정 페이지를 만들어보세요.

![](https://imagedelivery.net/MHVC-FGTDyxApYeHyF29Tw/e7d167bc-f41e-4bfd-d66f-e2967f409200/docs "update-ui-basic.png")

```yaml
- type: query
  resource: mysql
  sqlType: update
  sql: >
    UPDATE products
    SET name = :name
    WHERE id = :id
  params:
  - key: name
    label: 상품명
  - key: id
    label: ID
```

## 기타 옵션

### 제출 후 자동 새로고침

`reloadAfterSubmit` insert 또는 update 쿼리 등을 이용해 데이터를 제출한 다음 새로고침 설정을 할 수 있습니다. 

```yaml
- type: query
  resource: mysql.qa
  sqlType: insert
  sql: INSERT INTO properties SET name = :new_name, created_at = NOW()
  name: 숙소 추가
  params:
  - key: new_name
    label: 이름
  # 제출 후 자동 새로고침
  reloadAfterSubmit: true
```

### 제출 버튼 이름, 색상 변경

기본적으로 sqlType이 update일 때 제출 버튼이 '수정'으로, insert일 때는 '저장'으로 표기됩니다.  
버튼의 이름이나 색상을 변경하고 싶으실 때는 `submitButton` 키를 이용해주세요.  

```yaml
- type: query
  resource: mysql.qa
  sqlType: insert
  sql: INSERT INTO properties SET name = :new_name, created_at = NOW()
  name: 숙소 추가
  # 버튼 이름, 색상 변경
  submitButton:
    label: 내용 저장
    type: primary  
  params:
  - key: new_name
    label: 이름
```

지원되는 버튼 색상 타입은 아래와 같습니다.

![](https://imagedelivery.net/MHVC-FGTDyxApYeHyF29Tw/ba1e68b0-2399-4433-d12a-98bb6b322800/docs "Screen Shot 2022-11-04 at 6.03.19 PM.png")

```yaml
type: default
# type: primary
# type: primary-light
# type: danger
# type: danger-light
# type: warning
# type: warning-light
# type: success
# type: success-light
```