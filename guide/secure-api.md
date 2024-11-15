---
outline: deep
---

# API 보안

API 보안을 위한 설정 방법과 안내를 드립니다.

## 환경변수란

연동을 위한 API secret key, password 또는 공통된 BASE_URL, API endpoint 등을 보관합니다.

입력한 환경변수는 안전하게 YAML 안에서 끌어다쓰고, 외부에 노출되지 않습니다. 또한 값은 vault를 통해 안전하게 저장 됩니다.

## 환경변수 설정

`편집 > 설정 > 환경변수` 화면에서 새로운 환경변수를 추가하거나 수정, 삭제 합니다.

- 키 이름은 `APP_API_KEY` 이와 같이 underscore 방식으로 작성합니다.
- 어드민 프론트 (클라이언트)에서 써야하는 환경변수는 `PUBLIC_` 으로 입력하여 안전하게 노출(export) 가능합니다.

::: tip
YAML에 API키를 직접 입력하지 않고 환경변수 설정을 가져와 쓸 수 있습니다. 
관리자가 설정 가능하며, 편집자는 인증키를 보지않고도 YAML을 통해 제작이 가능합니다.
:::

### 스테이지 모드

- Production, Stage, Development 체크박스로 해당하는 환경에만 적용 가능합니다.
- 같은 키 이름에 같은 환경이 겹치는 경우 추가 실패합니다.

### 설치형

설치형에서는 특별한 제약없이 바로 환경변수 추가 가능합니다. (`.env` 또는 `API=1 slt` 이용)


#### 참고

- [useEnv 안전하게 export된 환경변수 활용](https://ask.selectfromuser.com/t/useenv-export/274)