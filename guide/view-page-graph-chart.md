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

![](https://imagedelivery.net/MHVC-FGTDyxApYeHyF29Tw/44195f21-5b1b-435a-ccc7-a150237d0f00/docs "bar-chart.png")

```yaml
chartOptions:
  type: bar
  x: type
  y: count
showButtonWithResult: true
```

### 선 차트 line

![](https://imagedelivery.net/MHVC-FGTDyxApYeHyF29Tw/bc078bb8-dfa2-4694-9d03-f3256cd1e600/docs "line-chart.png")

```yaml
chartOptions:
  type: line
  x: type
  y: count
showButtonWithResult: true
```

### 원형, 도넛 차트 doughnut

![](https://imagedelivery.net/MHVC-FGTDyxApYeHyF29Tw/8a006783-00e6-4c68-1cd4-6b36851f7800/docs "doughnut-chart.png")

```yaml
chartOptions:
  type: doughnut
  x: type
  y: count
showButtonWithResult: true
```

### 폴라에어리어 차트 polarArea

![](https://imagedelivery.net/MHVC-FGTDyxApYeHyF29Tw/0de116ef-3644-40ca-115a-5f60b2b74200/docs "polar-chart.png")

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

## 관련자료

- [비율 그래프 차트 그리기 (카테고리 분포)](https://ask.selectfromuser.com/t/topic/43)
- [파이/도넛 차트에 퍼센트 비율 표시하기](https://ask.selectfromuser.com/t/topic/44)
- [일자별 쿼리로 지표 그래프 그리기 (증감률, 퍼센트 표시) ](https://ask.selectfromuser.com/t/topic/41)
- [여러개 바 리스트 그리기 BarList](https://ask.selectfromuser.com/t/barlist/42)
