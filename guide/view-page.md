---
outline: deep
---

# 데이터 조회 페이지

리소스 연결을 끝내셨나요? 이제 SQL 쿼리 결과를 바로 페이지 표시할 수 있습니다!

## 메뉴 추가

```yaml
menus:
- path: properties/active
  name: 파트너 조회
```

## 페이지 추가

```yaml YAML
pages:
- path: properties/active
```

## 쿼리 블록 추가

🍀 리소스를 추가할때 쓴 이름을 적습니다. [mysql.qa] 부분

```yaml
pages:
- path: properties/active
  blocks:
  - type: query
    resource: mysql.qa
```

## 쿼리 추가

```yaml
pages:
- path: properties/active
  blocks:
  - type: query
    resource: mysql.qa
    sqlType: select
    sql: SELECT * FROM properties ORDER BY id ASC LIMIT 100
```

> 📘 데이터 조회 개수 자동 제한
> 
> 안정적인 데이터 조회를 위해 데이터 조회 개수가 자동 제한(autolimit)되어있습니다.  
> 제한을 풀고 싶으신 경우, 리밋 문구를 추가하시면 됩니다.  
> **\<예제>**  
> mysql  
> `SELECT * FROM users LIMIT 10000`  
> mssql  
> `SELECT TOP 1000 * FROM users`

## 저장

저장 버튼을 누릅니다.

![](https://imagedelivery.net/MHVC-FGTDyxApYeHyF29Tw/1cbcc1a7-dfdd-488e-80b6-735d46d68b00/docs "save-yaml.png")

## 완성

화면 열기를 클릭하거나 어드민을 열어서 내용이 맞는지 확인합니다.

![](https://imagedelivery.net/MHVC-FGTDyxApYeHyF29Tw/f7998e89-b1f6-4182-6c73-65b2c42ab700/docs "result-page.png")

## Tip!

1. 에디터에서 `Cmd + S` 또는 `Control + S` 로 저장가능해요.
2. (베타) 에디터에서 `control + space` 로 자동완성 표시가 가능해요.

![](https://imagedelivery.net/MHVC-FGTDyxApYeHyF29Tw/d13772ef-3d00-4b88-509d-7db0cf7dc600/docs "autocomplete-feature.png")

3. `>` 표시와 들여쓰기로 여러줄을 입력할수있어요!

```yaml
sql: >
  SELECT * 
  FROM properties 
  ORDER BY id ASC 
  LIMIT 100
```

4. Cmd+F (Mac OS), Control+F (윈도우)로 검색가능해요.

![](https://imagedelivery.net/MHVC-FGTDyxApYeHyF29Tw/73d9e694-4653-465d-18d1-7befbf522100/docs "search-in-yaml.png")

5. 저장전에 Cmd+Enter로 맞는지 테스트해봅니다. (저장할 때도 테스트하고 저장)

![](https://imagedelivery.net/MHVC-FGTDyxApYeHyF29Tw/1d3d28ed-db54-45c0-1240-8f834d7f4e00/docs "test-and-save-yaml.png")