---
outline: deep
---

# 개념 및 설계 구조

## 문제

기존 직접 개발하여 어드민을 만드는 경우 개발환경, 언어, ORM 연동, 서버 프레임워크, UI 템플릿 프레임워크, 배포환경, 화면기획, 어드민용 데이터베이스등을 준비해야하는 시간과 노력등 비용이 발생합니다.

초기 비용을 들여서 한번 만들어둔 어드민의 경우 이후에 빠르게 메뉴, 화면을 추가합니다. 하지만 시간이 흐를 수록 유지보수, 보안패치, 인수인계등 지속적인 리소스가 발생합니다.

어드민의 특성상 서비스 운영 데이터와 매우 의존성이 높아 끊임없는 유지보수가 필요하며, 신규 사업으로 인해 새로운 화면과 메뉴 분리가 필요한 경우 기존 어드민이 비대해지거나, 또 다시 신규 어드민을 분리하게 됩니다.

요구사항으로 인해 여러개 어드민을 통합하는 경우 각기 다른 서버코드, 프론트코드, 로직등을 모으는 작업이 쉽지 않습니다. 이 과정을 반복할 수록 어드민을 최소한으로 만들고 유지하고 관리하는 방법을 고민하게 됩니다.

## 접근 방향

셀렉트 어드민은 문제를 아래의 방식으로 접근하고 대다수의 케이스를 해결합니다.

- 어드민 기본 구성요소를 내장
- 어드민 구성요소는 설정으로 사용
- 모든 설정은 스펙 기반으로 조합 가능
- 코드 분할, 관심사 분리 가능 (예: 메뉴, 화면 단위)
- 데이터 조작은 추상화 없이 원본 그대로 (SQL, API, JavaScript)
- 데이터 연동의 기술적인 어려움은 내장 (커넥션 관리, 인증, 드라이버 관리)
- 데이터 연동의 구성은 직접 설정하고, 안전하게 입력한 것만 실행
- 일반적인 사용자가 만족할 보편적인 UI 제공 (테이블, 입력폼등)
- 모든 어드민 구성요소는 복제, 통합, 분할 가능
- 최소한의 부분을 빠르게 고치기 용이한 형태
- 어드민은 코드가 아닌 스펙으로 읽기 쉽고 한눈에 파악하기 쉬움
- 셀렉트 안에 다른 어드민을 가져와 넣거나, 다른 어드민 안에 셀렉트를 넣을 수 있음

## 설정

- [YAML](https://yaml.org/) (YML, 야믈, 와이엠엘) 문법을 사용합니다. (구글 쿠버네티스, 깃허브 액션등 사용)
  - 사람이 읽고 쓰기 쉬움
  - 명확한 계층 구조
  - 코멘트 가능
  - JSON 상위 호환
- `menu`, `page`, `block`등 여러가지 개념을 순서에 맞게 배치합니다.
- 옵션에 맞는 `key: value`를 입력합니다.
- 필요에 따라 한개 파일에 모으거나, 여러개 파일로 만듭니다. (메뉴 단위, 작업 단위)
- 입력한 설정이 틀린 `YAML` 문법이면 에러가 표시됩니다.
- 입력한 설정이 없거나 틀린 경우 기능은 표시되지 않습니다.



## YAML 살펴보기

![YAML 미리보기](https://files.umso.co/lib_VFMOChcABbFAfoxp/k3thyh8ju67vpoqn.png)

[원본보기](https://files.umso.co/lib_VFMOChcABbFAfoxp/k3thyh8ju67vpoqn.png)

```yaml
pages:
  - path: search-user-id
  	blocks:
  	  - type: query
  	  	resource: mysql.qa
        sql: >
          SELECT * FROM customer
          WHERE (!LENGTH(:name) OR fullname LIKE CONCAT('%', :name, '%'))
            AND (!LENGTH(:phone) OR phone_primary LIKE CONCAT('%', REPLACE(:phone, '-', ''), '%'))
          ORDER BY id DESC
          LIMIT 10

        params:
          - key: name
          - key: phone
        columns:
          phone_primary:
            formatFn: maskCenter4
```

| key | 설명 |
| :--- | :---- |
| pages | 1개의 페이지를 포함합니다. |
| `-` | 배열 array(list) 표현 |
| path | /search-user-id 로 접속하면 해당 페이지가 나옵니다. |
| blocks | 1개의 블록을 포함합니다. |
| type | 쿼리 블록 입니다. |
| resource | mysql.qa 이름의 리소스를 가져옵니다. |
| sql | SQL 쿼리를 입력합니다. |
| `>` | 여러줄 표현 |
| params | 2개의 파라미터를 포함합니다. |
| key | 파라미터의 고유 key 입니다. 해당 키로 SQL 쿼리에 전달됩니다. |
| columns | 1개의 컬럼 옵션을 포함합니다. |
| `phone_primary` | SQL 쿼리 결과물 중 `phone_primary` 필드에 대해서 옵션을 지정합니다. |
| formatFn | maskCenter4 옵션을 이용합니다. (가운데 4자리 마스킹) |
