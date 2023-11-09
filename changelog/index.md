---
# outline: deep
---

# 변경내역

## 2023-10-30

### Add

- comment block
- format: storage
- tab type: plain
- 감사로그 개선
- 사용자활동로그 개선
- 로컬 CLI 지원

### Fix

- 대시보드 화면에서 지표 csv 다운로드시 문제 해결
- 소속 팀이 여러개인 경우 로딩이 느려지는 문제 해결
- datalistFromQuery 문제 해결
- defaultValueFromRow

https://blog.selectfromuser.com/newsletter-2023-10/

## 2023-09-25

### Add

- inline cell edit
- text copy
- onRowClick
- paginationOptions jumpPage, position: top

### Fix & Improvement

- API키 수정시 파일 편집하지 않아도 바로 반영되게 개선
- requestFn에서 다른블록 사용가능
- block.visible 개선
- csv 다운로드/일괄입력시 엑셀 xls, xlsx 지원
- server side pagination시 total 쿼리 없이 임의로 지정 가능
- 테이블 헤더고정(fixed) 버그 수정 (prepend, append, sticky)
- selectOptions로 행 선택시 카운트 표시 개선

https://blog.selectfromuser.com/newsletter-2023-09/

## 2023-09-01

주소 검색, 달력 뷰와 다양한 개발 옵션

### Add

- params format: address
- block display: calendar
- actions showDownload csv, openUrl
- columns format: image
- columns format: table
- params validateFn
- block responseErrorFn
- block requestSubmitFn
- MongoDB block queryFn

### Fix

- VPC Peering Connection 가용영역 분리
- autoload 개선
- tabOptions 개선
- display col-1, col-2, col-3, col-4 개선
- tdClass, tdClass 개선
- 어드민 첫 접속시 커넥션 풀 안정성 개선

https://blog.selectfromuser.com/newsletter-2023-08/