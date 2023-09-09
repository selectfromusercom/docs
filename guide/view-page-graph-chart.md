---
ontline: deep
---

# 차트, 그래프로 표시

## 설정 방법

쿼리(query) 블록 안에 chartOptions를 추가

### 차트 종류 (type)

- bar, line, doughnut, polarArea

### 필요한 정보

- x축 (가로 축)
- y축 (세로 축)

```yaml
type: query
name: 상품 카테고리 비율
resource: mysql.qa
sqlType: select
sql: >
  SELECT `type`, COUNT(id) AS count
  FROM products
  WHERE `type` IS NOT NULL
  GROUP BY `type`
chartOptions:
  type: bar # line, doughnut, polarArea
  x: type
  y: count
showButtonWithResult: true # 조회 버튼 활성화 여부
```

## 차트별 YAML

### 바 차트 bar

![](https://files.readme.io/cce60ae-bar-chart.png "bar-chart.png")

```yaml
chartOptions:
  type: bar
  x: type
  y: count
showButtonWithResult: true
```

### 선 차트 line

![](https://files.readme.io/afeae76-line-chart.png "line-chart.png")

```yaml
chartOptions:
  type: line
  x: type
  y: count
showButtonWithResult: true
```

### 원형, 도넛 차트 doughnut

![](https://files.readme.io/6562ace-doughnut-chart.png "doughnut-chart.png")

```yaml
chartOptions:
  type: doughnut
  x: type
  y: count
showButtonWithResult: true
```

### 폴라에어리어 차트 polarArea

![](https://files.readme.io/cc83b96-polar-chart.png "polar-chart.png")

```yaml
chartOptions:
  type: polarArea
  x: type
  y: count
showButtonWithResult: true
```

## 너비(가로), 높이(세로 길이) 조절

chartOptions 안에 width 와 height 로 조절 가능합니다.

```yaml
chartOptions:
  type: bar
  x: 날짜
  y: count
  width: 500px
  height: 300px
```