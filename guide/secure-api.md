---
outline: deep
---

# API 보안

API 보안을 위한 설정 방법과 안내를 드립니다.

## 편집 > 설정 > API 키 관리

YML에 키를 입력하지 않고 키 설정을 가져와 씁니다.  
팀 편집자가 인증키를 보지않고도 기능 구현이 가능합니다.

## domain whitelist

실수로 dev, stage 환경에서 prod로 API를 보내지 않습니다.  
팀 관리자가 허용한 URL로 시작하는 API만 호출 가능합니다.