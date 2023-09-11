---
outline: deep
---

# 어드민 편집

어드민을 구성하기 위한 다양한 편집, 세팅 방법을 안내드립니다.

## YAML 편집 및 관리

원하는 부분만 수정하고 나머지 부분에는 영향이 가지 않게 방법을 제공합니다.

> 📘 
> 
> 셀렉트 어드민은 YAML로 주석처리, 분리, 복사, 붙여넣기하여 어드민 페이지의 추가 / 메뉴이동 / 분리가 용이합니다.

## 주요 기능

- 한곳에 메뉴를 입력
- 원하는 페이지 단위로 설정 파일을 분리
- 수정하고자하는 페이지만 안전하게 저장

## 추가 버튼 누르기

기본 파일 이름은 #general로 표시됩니다. 오른쪽 +추가 버튼이 있습니다.

![](https://imagedelivery.net/MHVC-FGTDyxApYeHyF29Tw/b6b6ef0a-bc03-483e-4579-b47b9e915c00/docs "add-new-file.png")

## 추가된 탭 확인

추가하게되면 기본으로 예제 YAML이 채워집니다.

![](https://imagedelivery.net/MHVC-FGTDyxApYeHyF29Tw/50630aa8-d71f-46fe-0683-29764416ee00/docs "check-new-tab.png")

## 추가된 화면

`#general` + `#새로운메뉴2` 두개의 YAML이 합쳐져서 하나의 어드민으로 보입니다.  
저장하고 어드민을 보면 추가된 메뉴를 볼 수 있습니다.

![](https://imagedelivery.net/MHVC-FGTDyxApYeHyF29Tw/b7776125-536b-4a60-a7d4-1132801bf900/docs "combined-yaml-display.png")

## 수정중인 화면

내용을 수정하고 저장하지 않은 경우 파란색으로 표시됩니다.

![](https://imagedelivery.net/MHVC-FGTDyxApYeHyF29Tw/ef96a3cb-b75b-46ce-8982-ad7749029000/docs "yaml-edit-status.png")

## 탭 이동 시

yaml 파일 탭을 이동하여도 수정중인 내용이 유지됩니다. 단, 브라우저 창에서 아예 벗어나는 경우에는 입력하던 정보가 유지되지 않으니 유의바랍니다.

![](https://imagedelivery.net/MHVC-FGTDyxApYeHyF29Tw/6076e1fc-a444-4e36-e4bc-e70843d27200/docs "sustain-edit-mode.png")

## 탭 이름 바꾸기

보고있는 탭을 한번더 클릭하시면 이름을 바꿀 수 있습니다. (더블클릭도 동일합니다)  
이름을 입력하시고 다른곳을 누르면 저장됩니다. (Ctrl+Z 누르면 이전 입력값으로 돌아갑니다)

![](https://imagedelivery.net/MHVC-FGTDyxApYeHyF29Tw/6284a0ea-b8de-4a5a-1d88-88a4e9b09200/docs "change-tab-name.png")

## 탭 삭제하기

이름을 모두 지우면 삭제 가능합니다. (삭제하지 않으면 수정한 이름은 저장하지 않고 원래 이름으로 돌아갑니다.)

![](https://imagedelivery.net/MHVC-FGTDyxApYeHyF29Tw/42360bca-9a83-43ce-d8fc-b8c40e39de00/docs "delete-file-tab.png")

## Tip

- 저장은 탭(파일) 단위로 됩니다.
- 설정 수정 및 탭 수정 등 모든 액션은 로그가 남습니다. 히스토리 조회와 되돌리기를 준비중입니다.

# 테이블로 페이지 자동완성

처음 셀렉트를 시작할때 모든 쿼리를 입력하기 부담스러울 수 있습니다.  
필요한 경우 원하는 테이블을 선택하여 자동으로 메뉴와 페이지를 만들어보아요.

## 팀 > 편집 > 테이블 버튼

‘추가’ 오른쪽 ‘테이블’ 버튼을 클릭합니다.

![](https://imagedelivery.net/MHVC-FGTDyxApYeHyF29Tw/93eda1cd-26c9-47b7-02f1-1ed9ca9ef600/docs "admin-table-button.png")

## 리소스 연결을 아직 하지 않은 경우

리소스 연결 후 다시 시도해주세요.

![](https://imagedelivery.net/MHVC-FGTDyxApYeHyF29Tw/d67d669c-c3b1-462f-7123-124e191ef900/docs "connect-resource.png")

## 테이블 클릭 후 불러오기

셀렉트는 리소스(데이터베이스) 정보를 저장하지 않기 때문에 매번 직접 테이블 목록을 가져옵니다.  
5초 이내의 불러오기 시간을 기다리시면 모든 테이블이 표시됩니다.

![](https://imagedelivery.net/MHVC-FGTDyxApYeHyF29Tw/18cf1f95-96cd-44f6-76bc-e13be0089100/docs "loading-tables.png")

![](https://imagedelivery.net/MHVC-FGTDyxApYeHyF29Tw/163dfe0d-b054-4044-aa1e-e10efd8da800/docs)

![](https://imagedelivery.net/MHVC-FGTDyxApYeHyF29Tw/578ac731-c41c-4567-d2ea-2cd52a1cb300/docs "create-admin-by-tables.png")

## 추가된 샘플 코드 확인

임의로 만든 메뉴와 페이지가 있습니다. 100건의 데이터를 조회하는 쿼리가 들어있습니다.

![](https://imagedelivery.net/MHVC-FGTDyxApYeHyF29Tw/b53bdcd3-d53d-478b-2efd-0668cd3e4500/docs "sample-yaml.png")

## 어드민 화면 확인

메뉴와 쿼리 결과를 확인합니다. 쿼리를 수정하여 정렬순서(ORDER BY)와 페이지, 조건등을 추가합니다.

![](https://imagedelivery.net/MHVC-FGTDyxApYeHyF29Tw/aaed2cdb-8ec1-439f-74f4-3c6bd4038200/docs "admin-display.png")

> 📘 
> 
> 해당 예제는 CRUD에서 Read-only로 제공하고 있습니다.