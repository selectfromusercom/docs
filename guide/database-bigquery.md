---
outline: deep
---

# BigQuery 빅쿼리

빅쿼리를 셀렉트에 연결하고 사용하는 기본적인 방법을 안내합니다.

## 빅쿼리와 연결하기

서비스 계정과 키 발급과정

::: info
셀렉트에서는 oauth 인증시 `https://www.googleapis.com/auth/bigquery.readonly` scope만 요청합니다. (읽기전용)
:::

### 1. 빅쿼리 Credentials 찾기

빅쿼리 콘솔에서 credentials를 검색해서 접속해주세요. 

![](https://imagedelivery.net/MHVC-FGTDyxApYeHyF29Tw/ed835cd9-32e1-49bc-1be3-50d4a4d38b00/docs)

### 2. 서비스 계정 만들기

사용자 인증 정보 만들기 > 서비스 계정 클릭

![](https://imagedelivery.net/MHVC-FGTDyxApYeHyF29Tw/deaccc73-1e92-4e6c-8f26-bb3616b72400/docs)

원하는 서비스 계정 이름과 ID를 설정해주세요.

![](https://imagedelivery.net/MHVC-FGTDyxApYeHyF29Tw/bb4543ed-f854-49c4-6ebb-51b53bf83b00/docs)

### 3. 서비스 계정 세부정보 입력

`BigQuery 관리자` 액세스 권한을 부여해주세요.

![](https://imagedelivery.net/MHVC-FGTDyxApYeHyF29Tw/f05886d5-016e-440a-ed38-1b019b8b9c00/docs)

### 4. 새 키 만들기

완료가 되었다면 키 메뉴에서 키 추가 > 새 키 만들기를 클릭해주세요.

![](https://imagedelivery.net/MHVC-FGTDyxApYeHyF29Tw/07d66242-e4c5-4756-ad19-20e30f113b00/docs)

키 유형은 JSON으로 만들어주세요.

![](https://imagedelivery.net/MHVC-FGTDyxApYeHyF29Tw/8ad04bd9-6263-42be-ba63-1a2d80034000/docs)

아래 이미지와 같은 키가 발급됩니다.

![](https://imagedelivery.net/MHVC-FGTDyxApYeHyF29Tw/5eec6590-0475-4c10-7225-6cde74c87e00/docs)

### 5. 셀렉트에서 리소스 추가

셀렉트 어드민에 접속하여 관리자 > 리소스 > 추가 버튼을 누르고 Google BigQuery를 선택해주세요.

![](https://imagedelivery.net/MHVC-FGTDyxApYeHyF29Tw/5985640a-42cf-4fef-9d26-f92b9d932000/docs)

Service Account (json)에 발급된 키를 입력하고 연결해주세요.

![](https://imagedelivery.net/MHVC-FGTDyxApYeHyF29Tw/a36d0879-52cb-47e2-2f38-01655828a600/docs)


## 빅쿼리 예제

빅쿼리 탐색기로 리소스 정보를 확인하고, 셀렉트 어드민에서 어떻게 사용할 수 있는지에 대한 예제입니다.

### 탐색기

![](https://imagedelivery.net/MHVC-FGTDyxApYeHyF29Tw/d90ed51e-9748-48e6-c1a9-412ca1f1fd00/docs)

### 쿼리 블록

```yaml
- type: query
  resource: BQ1
  sqlType: select
  sql: >
    SELECT * 
    FROM `select-sample-406105.sample.stores`
    WHERE status = @status
    LIMIT 1000
  params:
  - key: status
  searchOptions:
    enabled: true
  paginationOptions:
    enabled: true
    perPage: 10
```

::: tip
빅쿼리의 경우 sql 쿼리에서 params 치환시 `@`를 사용해주세요.
:::

## 추가 지원

빅쿼리 예제나 기능 등 추가 지원이 필요하시면 서비스 우측 하단의 채팅이나 [이메일](mailto:support@selectfromuser.com)로 문의해주세요.