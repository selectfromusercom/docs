---
outline: deep
---

# 컴포넌트 라이브러리

셀렉트에서 지원하는 UI 컴포넌트 모음(Components library)을 확인할 수 있습니다.

## Input and selection

### Text input

![](https://imagedelivery.net/MHVC-FGTDyxApYeHyF29Tw/5ef76a7e-0401-4f38-d7d1-68411a2d7400/docs)

```yaml
params:
- key: text
  label: 텍스트
```

### Text area

![](https://imagedelivery.net/MHVC-FGTDyxApYeHyF29Tw/75c07dcb-068a-451d-8609-16badffcf800/docs)

```yaml
params:
- key: text
  label: 텍스트 영역
  format: textarea
```

### Number input

![](https://imagedelivery.net/MHVC-FGTDyxApYeHyF29Tw/1afa9e05-531e-4713-dee6-67a7a7426400/docs)

```yaml
params:
- key: number
  label: 숫자
  format: number
```

### Date

![](https://imagedelivery.net/MHVC-FGTDyxApYeHyF29Tw/f420202c-d7a1-4ed6-c373-e920e7582a00/docs)

![](https://imagedelivery.net/MHVC-FGTDyxApYeHyF29Tw/8490d7f7-c344-49f2-4274-b5a9da101f00/docs)

```yaml
params:
- key: date
  label: 날짜
  format: date
```

### Time

![](https://imagedelivery.net/MHVC-FGTDyxApYeHyF29Tw/2ec89cc9-d01a-4d02-9ff1-0b04faed0f00/docs)

![](https://imagedelivery.net/MHVC-FGTDyxApYeHyF29Tw/7bcb14b1-3967-43d7-05e2-b6e10119de00/docs)

```yaml
params:
- key: time
  label: 시간
  format: time
```

### Date time

![](https://imagedelivery.net/MHVC-FGTDyxApYeHyF29Tw/45f414d2-b893-4011-5441-f4670f131300/docs)

```yaml
params:
- key: datetime
  label: 시간
  format: datetime
```

### Date range

![](https://imagedelivery.net/MHVC-FGTDyxApYeHyF29Tw/8c17e5e4-d60e-4591-a10e-c69758f56d00/docs)

![](https://imagedelivery.net/MHVC-FGTDyxApYeHyF29Tw/e5855f07-5e8f-4206-704c-2313c8786600/docs)

```yaml
params:
- key: daterange
  label: 날짜 기간
  format: date
  range: true
```

### Color input

![](https://imagedelivery.net/MHVC-FGTDyxApYeHyF29Tw/779bf942-a36c-416b-6019-d85257eaf700/docs)

![](https://imagedelivery.net/MHVC-FGTDyxApYeHyF29Tw/76ea4085-a4a2-4415-5e72-8a50ef87f900/docs)

```yaml
params:
- key: color
  label: 색상
  format: color
```

### File input

![](https://imagedelivery.net/MHVC-FGTDyxApYeHyF29Tw/2a56a54b-7d54-40a9-6d6b-c184211b6000/docs)

```yaml
params:
- key: file
  label: 파일
  format: file
```

### Radio group

![](https://imagedelivery.net/MHVC-FGTDyxApYeHyF29Tw/bfb3b017-e01b-45d9-e6e6-b6fe98842f00/docs)

```yaml
params:
- key: text
  label: 라디오
  radio: 
  - radio1: 라디오1
  - radio2: 라디오2
```

### Radio button group

![](https://imagedelivery.net/MHVC-FGTDyxApYeHyF29Tw/d1c2efe7-3f52-4f93-0174-0bfb9cd03800/docs)

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

![](https://imagedelivery.net/MHVC-FGTDyxApYeHyF29Tw/5eb66286-edd3-48ad-281f-76234b617200/docs)

![](https://imagedelivery.net/MHVC-FGTDyxApYeHyF29Tw/0038a9b7-8f22-488d-9bae-862c66f25e00/docs)

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

![](https://imagedelivery.net/MHVC-FGTDyxApYeHyF29Tw/4b79f0f0-d8d5-4400-4af8-daf7b7e29500/docs)

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

![](https://imagedelivery.net/MHVC-FGTDyxApYeHyF29Tw/ab87d607-6de3-4256-1924-415c319bbb00/docs)

```yaml
blocks:
- type: query
  resource: mysql.qa
  sqlType: select
  sql: SELECT id, created_at, text, number, datetime FROM test LIMIT 10
```

#### tableOptions

![](https://imagedelivery.net/MHVC-FGTDyxApYeHyF29Tw/fa6c031d-d7e7-4bb4-dd2d-da5d8d5ceb00/docs)

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

![](https://imagedelivery.net/MHVC-FGTDyxApYeHyF29Tw/a3262d0a-bbcd-4bf5-3a51-3c149a863000/docs)

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

![](https://imagedelivery.net/MHVC-FGTDyxApYeHyF29Tw/46e9278f-26d9-4aa2-8e73-316e407f2000/docs)

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

![](https://imagedelivery.net/MHVC-FGTDyxApYeHyF29Tw/ad2e0771-7312-4c30-0a9d-f46966aac100/docs)

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

![](https://imagedelivery.net/MHVC-FGTDyxApYeHyF29Tw/02ef949a-8da8-4000-8f3d-f85e4bc96200/docs)

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

![](https://imagedelivery.net/MHVC-FGTDyxApYeHyF29Tw/6e35b681-bd3b-4f51-3229-e7db48ba4100/docs)

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

![](https://imagedelivery.net/MHVC-FGTDyxApYeHyF29Tw/7cb6ce8f-1e31-41f7-a688-bfa929998a00/docs "center modal (basic)")

![](https://imagedelivery.net/MHVC-FGTDyxApYeHyF29Tw/e1167a85-7ae2-4674-1da9-ee6c2d5c3100/docs "side modal")

![](https://imagedelivery.net/MHVC-FGTDyxApYeHyF29Tw/ba832c5c-9bc1-4b01-71e0-7040665c5400/docs "full modal")

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