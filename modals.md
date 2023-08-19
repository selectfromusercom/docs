---
outline: deep
---

#### [`blocks.viewModal`](/blocks#blocks-viewmodal)
# `viewModal: {}`

## viewModal

불러온 데이터를 클릭하여 모달을 열게됩니다.

1개의 모달을 지원합니다. 여러개가 필요한 경우 `modals`를 이용해주세요.

### viewModal.name

### viewModal.mode

`center`, `full`, `side`

### viewModal.displayParentRow

```yaml
viewModal:
  displayParentRow: true
  
```

### viewModal.dismissible

모달이 띄워졌을 때 esc로 꺼지지 않게 하고 싶을 때 dismissble을 이용해주세요.

```yaml
viewModal:
  dismissible: false
```

### viewModal.[blocks](/blocks)

여러개 블록을 추가 가능합니다.

### viewModal.[blocks.display](/blocks#blocks-display)

기본적으로 데이터를 조회하면 테이블(표) 형태로 나타납니다. 이를 특정한 형태로 바꾸고 싶을 때 display를 사용합니다.


### viewModal.useColumn

특정 컬럼을 모달 조회 링크로 지정할 수 있습니다.

```yaml
viewModal:
  useColumn: id
  blocks:
```

### viewModal.params.valueFromRow

조회한 row 데이터를 모달 안에서 사용할 수 있습니다.

```yaml
sql: select id, name, email, created_at from user limit 10
viewModal:
  blocks:
  - type: query
    ...
    sql: select * from order where user_id = :user_id
    params:
    - key: user_id
      valueFromRow: id
```

### viewModal.usePage

```yaml
pages:
  - path: company
    blocks:
    - type: query
      resource: mysql.qa
      sql: SELECT * FROM properties LIMIT 8
      columns:
        id:
        name:
        type:
        address:
      viewModal: 
        usePage: company/detail/{{id}} # sql 쿼리 결과의 id를 가져와서 사용합니다.

  - path: company/detail/{{id}} # 받아온 id 값을 아래 sql 쿼리 파라미터에 사용합니다. 
    blocks:
    - type: query
      resource: mysql.qa
      sqlType: select
      sql: > 
        SELECT id, name
        FROM properties
        WHERE id = :id 
```

-------

## [`blocks.modals`](/blocks#blocks-modals)

# `modals: []`

## modals

::: info 

여러개 모달을 지원하는 부분 외에는 `viewModal`와 동일합니다. 

:::

불러온 데이터를 클릭하거나 버튼을 통해 모달을 열게됩니다. 

- [buttons.openModal](/columns#buttons-openmodal)





### modals.path

모달의 고유 주소를 지정합니다. 해당 고유주소로 페이지를 띄웁니다. 

`view-:id` 경로에 따라 `id`를 파라미터로 가져옵니다.

`view-:id-:code` 경로에 따라 `id`, `code`를 파라미터로 가져옵니다.

### modals.useColumn

명시된 파라미터가 주소에 남고 모달안에서 쓸 수 있도록 가져옵니다. `path`에 파라미터를 넣거나 여기에 추가합니다.

```
useColumn: id     # 1개 가져오기

useColumn:        # 2개 가져오기
  - id
  - code
```


### modals.usePage

```yaml
pages:
  - path: company
    blocks:
    - type: query
      resource: mysql.qa
      sql: SELECT * FROM properties LIMIT 8
      columns:
        id:
        name:
          openModal: name 
        type:
        address:
      modals: 
      - path: name
        usePage: company/detail/{{id}} # sql 쿼리 결과의 id를 가져와서 사용합니다.

  - path: company/detail/{{id}} # 받아온 id 값을 아래 sql 쿼리 파라미터에 사용합니다. 
    blocks:
    - type: query
      resource: mysql.qa
      sqlType: select
      sql: > 
        SELECT id, name
        FROM properties
        WHERE id = :id 
```