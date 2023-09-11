---
outline: deep
---

# 데이터베이스 연결

셀렉트 서비스는 고객사가 데이터베이스/리소스를 기반으로 어드민 페이지를 쉽게 만들 수 있게 돕는 도구입니다. 
mysql, postgresql, redis 등 데이터베이스를 연결해 데이터의 활용도를 높여보세요.

## 어드민 > 관리자 > 리소스

신규 또는 추가로 리소스를 연결하고 싶으신 경우, 관리자 페이지 상단의 '리소스' 메뉴를 클릭해주세요.

![](https://imagedelivery.net/MHVC-FGTDyxApYeHyF29Tw/2bb1a863-08b4-4582-3bce-74994e535000/docs "붙여넣은_이미지_2023__2__14__오후_10_24.jpg")

연결된 데이터 → `+ 추가` 버튼을 누르면 리소스를 추가하실 수 있습니다.

![](https://imagedelivery.net/MHVC-FGTDyxApYeHyF29Tw/ce52a888-48cb-4a2c-acd4-4d70807b6c00/docs "add-resource-button.png")

## 연결 정보 입력

리소스 추가 시 나타나는 페이지 입니다.  
보안을 위해 추가 후, 연결 정보를 조회하거나 수정하는 것이 불가능합니다.

![](https://imagedelivery.net/MHVC-FGTDyxApYeHyF29Tw/2dfdd64d-e4ac-43f1-ce48-a93b5380d200/docs "connect-database-modal.png")

## 연결 테스트 결과 확인

- 5초 이상 응답없으며 연결이 되지 않는 경우 IP/방화벽을 확인해주세요.
- 계정 오류, 권한 오류 등이 즉시 난다면 연결은 성공했으나 접속정보가 올바르지 않은 경우입니다.
- 디비 계정은 중요해서 되도록 슬랙이나 메일로 공유하는 걸 권장하지 않습니다.

> 🚧 
> 
> 안전하게 개발팀이나 디비 담당자에게 페이지 링크를 드리고 직접 요청해주세요.

![](https://imagedelivery.net/MHVC-FGTDyxApYeHyF29Tw/aec4da51-82d9-40cc-6383-5e3f1b547200/docs "connect-action-button.png")

## 새로운 팀에 리소스가 없다면 자동으로 표시

새로운 어드민을 추가하거나 추가된 어드민에서 ‘편집' 버튼을 눌렀을 때, 관리자(편집) 페이지로 이동하게 됩니다.  
데이터 리소스가 연결되어있지 않는 경우, 바로 리소스 추가 팝업 창이 뜹니다.

![](https://imagedelivery.net/MHVC-FGTDyxApYeHyF29Tw/de8cfd8e-ed7a-4bd3-b2a4-88e751970100/docs "add-resource-wizard.png")

## 다른 리소스를 추가할 수 있나요?

셀렉트는 지속적으로 연동 가능한 리소스를 늘려가고 있습니다. Firebase, DynamoDB, 노션, 스티비, 채널톡 등 연결하고 싶은 데이터베이스나 서비스를 문의해주세요. 서비스에 반영 후 안내드리도록 하겠습니다. 

[→ 신규 리소스 연결 신청](https://tally.so/r/wMe4q0)