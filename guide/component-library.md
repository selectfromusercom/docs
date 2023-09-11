---
outline: deep
---

# 컴포넌트 라이브러리

셀렉트에서 지원하는 UI 컴포넌트 모음(Components library)을 확인할 수 있습니다.

## Input and selection

### Text input

![](https://files.readme.io/32dc7b6-image.png)

```yaml
params:
- key: text
  label: 텍스트
```

### Text area

![](https://files.readme.io/cfdafb6-image.png)

```yaml
params:
- key: text
  label: 텍스트 영역
  format: textarea
```

### Number input

![](https://files.readme.io/e16f539-image.png)

```yaml
params:
- key: number
  label: 숫자
  format: number
```

### Date

![](https://files.readme.io/f19ef74-image.png)

![](https://files.readme.io/974d82a-image.png)

```yaml
params:
- key: date
  label: 날짜
  format: date
```

### Time

![](https://files.readme.io/266a1fc-image.png)

![](https://files.readme.io/6ab79cc-image.png)

```yaml
params:
- key: time
  label: 시간
  format: time
```

### Date time

![](https://files.readme.io/67f247d-image.png)

```yaml
params:
- key: datetime
  label: 시간
  format: datetime
```

### Date range

![](https://files.readme.io/4b4d2f2-image.png)

![](https://files.readme.io/6220560-image.png)

```yaml
params:
- key: daterange
  label: 날짜 기간
  format: date
  range: true
```

### Color input

![](https://files.readme.io/6f2ca44-image.png)

![](https://files.readme.io/5eabd75-image.png)

```yaml
params:
- key: color
  label: 색상
  format: color
```

### File input

![](https://files.readme.io/32c065d-image.png)

```yaml
params:
- key: file
  label: 파일
  format: file
```

### Radio group

![](https://files.readme.io/1ecd09e-image.png)

```yaml
params:
- key: text
  label: 라디오
  radio: 
  - radio1: 라디오1
  - radio2: 라디오2
```

### Radio button group

![](https://files.readme.io/b528f0f-image.png)

```yaml
params:
- key: text
  label: 라디오버튼그룹
  radio: 
  - radio1: 라디오1
  - radio2: 라디오2
  radioButtonGroup: true   
```

### Select

![](https://files.readme.io/ef9b68d-image.png)

![](https://files.readme.io/a32905d-image.png)

```yaml
params:
- key: text
  label: 드롭다운
  dropdown:
  - dropdown1: 드롭다운1
  - dropdown2: 드롭다운2
  - dropdown3: 드롭다운3
```

### Multi select

![](https://files.readme.io/dcaf7aa-image.png)

```yaml
params:
- key: datalist
  label: Multi select  
  datalist:
  - value: FOREST
  - value: OCEAN
  datalistLength: 2
```

## Data

### Table

![](https://files.readme.io/0e0ce9b-image.png)

```yaml
blocks:
- type: query
  resource: mysql.qa
  sqlType: select
  sql: SELECT id, created_at, text, number, datetime FROM test LIMIT 10
```

#### tableOptions

![](https://files.readme.io/4520990-image.png)

```yaml
sql: ...
tableOptions:
  fixed: true
  height: 300px
  condensed: true
  bordered: false
  striped: true
  small: true
```

#### columns

![](https://files.readme.io/a70a27e-image.png)

```yaml
sql: ...
columns:
  color: 
    format: color 
  status:
    color:
      action-group: red 
      action-with-selection: green 
      open-action: yellow 
  url: 
    format: url 
    thumbnail: true
    width: 50px
    height: 50px
  text2: 
    hidden: true 
  phone: 
    formatFn: maskCenter4
  image:
    format: image 
    thumbnail: true 
```

### Chart

![](https://files.readme.io/37e511b-image.png)

```yaml
blocks:
- type: query 
  name: bar 
  resource: mysql.qa
  sqlType: select 
  sql: >
    SELECT status, count(id) AS count
    FROM test 
    GROUP BY status
  chartOptions:
    x: status
    y: count 
    type: bar # pie, line
```

# Actions and buttons

### Actions

![](https://files.readme.io/35659ad-image.png)

```yaml
blocks:
- type: query 
  name: Select options
  resource: mysql.qa 
  sqlType: select 
  sql: >
    SELECT id, created_at, text, number
    FROM test
    ORDER BY id DESC  
    LIMIT 3
  selectOptions:
    enabled: true  
  actions:
  - label: 삭제  
    button:
      type: danger-light 
```

### Buttons

![](https://files.readme.io/fba15a7-image.png)

```yaml
blocks:
- type: query 
  name: columns and buttons
  resource: mysql.qa 
  sqlType: select 
  sql: >
    SELECT id, created_at, text, number
    FROM test
    ORDER BY id DESC  
    LIMIT 3
  columns: 
    buttons:
      prepend: true
      buttons:
      - label: 삭제 
        type: danger-light
      - label: 수정 
        type: primary
```

#### Button color

![](https://files.readme.io/7fa4ffe-image.png)

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

## Container

### Modal

![](https://files.readme.io/769b489-image.png "center modal (basic)")

![](https://files.readme.io/1bbd90d-image.png "side modal")

![](https://files.readme.io/8fc001e-image.png "full modal")

```yaml
blocks:
- type: query 
  name: modal
  resource: mysql.qa 
  sqlType: select 
  sql: >
    SELECT *
    FROM test
    ORDER BY id DESC 
    LIMIT 10 
  viewModal:
    mode: center # side, full
    useColumn: id 
    blocks:
      - type: query 
        name: update-form 
        resource: mysql.qa 
        sqlType: update
        sql: >
          UPDATE test 
          SET text = :text 
          WHERE id = :id 
        params:
          - key: text 
            defaultValueFromRow: text 
          - key: id 
            valueFromRow: id 
```