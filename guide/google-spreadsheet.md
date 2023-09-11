---
outline: deep
---

# 구글 스프레드시트 이용

## 목표

구글 시트를 리소스로 연결하여 사용하는 방법입니다. 서비스 데이터베이스와 구글 시트의 데이터를 셀렉트 어드민에서 함께 볼 수 있어요. 

### 가져올 구글 시트 데이터

![](https://imagedelivery.net/MHVC-FGTDyxApYeHyF29Tw/6dfe6bc1-836f-4f76-0dce-d15fd74fb400/docs "스크린샷 2022-12-06 오후 12.14.13.png")

### 결과 페이지

![](https://imagedelivery.net/MHVC-FGTDyxApYeHyF29Tw/304e554b-7d61-4625-b251-ac03835fbf00/docs "스크린샷 2022-12-06 오후 12.13.40.png")

## 설정 방법

위의 결과 이미지와 같이 설정하는 방법입니다. 구글시트에 입력된 데이터를 가져오고, 시작과 끝 날짜를 선택해서 조회할 수 있게 만든 예시입니다. 

```yaml
menus:
- path: get-google-sheet-data
  name: 구글시트 가져오기
pages:
- path: get-google-sheet-data
  blocks:
  - type: query
    sqlWith:
    - resource: gsheet
      id: xxxxxxxxxxxxxxxxxxxxx
      name: sample_sheet
    resource: sqlWith
    sqlType: select
    sql: >
      SELECT *
      FROM sample_sheet
      WHERE date BETWEEN :start AND :end
    paginationOptions:
      enabled: true
      perPage: 10
    params:
    - key: start
      format: date
      defaultValueFn: |
        return moment().subtract(7, 'days').format('YYYY-MM-DD')
    - key: end
      format: date
      defaultValueFn: |
        return DateTime.now().toFormat('yyyy-MM-dd')
```

### sqlWith.id

sqlWith 키 안의 id는 구글 시트의 URL에 있는 고유 ID를 가져와서 입력해주세요. 

![](https://imagedelivery.net/MHVC-FGTDyxApYeHyF29Tw/becf07f4-2f0d-43c6-c676-4b4cf4b7a600/docs)

### 구글 시트 데이터 공유 설정

데이터를 가져올 수 있게 엑세스는 아래와 같이 설정해주세요.

![](https://imagedelivery.net/MHVC-FGTDyxApYeHyF29Tw/2eaa16b1-4ad6-42a8-18a1-0c28da3d7d00/docs "스크린샷 2022-12-06 오후 12.16.22.png")

## 구글시트 데이터와 서비스 데이터베이스를 같이 쓰고 싶어요.

[여러 데이터베이스 JOIN 문서](https://docs.selectfromuser.com/docs/%EC%97%AC%EB%9F%AC-%EB%8D%B0%EC%9D%B4%ED%84%B0%EB%B2%A0%EC%9D%B4%EC%8A%A4-join)에서 방법을 확인하실 수 있어요.