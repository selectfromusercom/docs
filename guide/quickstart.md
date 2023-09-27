---
outline: deep
---

# 빠른 시작

셀렉트는 관리자 페이지, 어드민을 빠르게 만들 수 있는 서비스입니다. 관계형, NoSQL DB를 연결하거나 API를 호출하는 UI를 스펙만으로 만들 수 있습니다. 

서버, 백엔드와 프론트엔드를 개발하지 않고 데이터베이스와 API 그리고 YAML 기반의 스펙 설정만으로 관리자 화면을 만들어보세요. 

아래 가이드를 따라 빠르게 체험해보실 수 있습니다.

## 데모

어떻게 편집하고 화면결과를 만들게 될지 간단한 데모를 볼 수 있어요. 보라색 원을 클릭하거나 키보드 좌우키로 전후이동해서 살펴보세요.

<div style="position: relative; padding-bottom: calc(55.27777777777778% + 41px); height: 0; width: 100%"><iframe src="https://demo.arcade.software/OIiD7vcuEHZgYo77zlgC?embed" frameborder="0" loading="lazy" webkitallowfullscreen mozallowfullscreen allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;color-scheme: light;" title="데이터 조회"></iframe></div>

아래에 팀 추가부터 리소스 추가, 데이터 조회와 수정, 추가 페이지를 만드는 과정을 예제와 함께 설명합니다.

## 1. 새로운 팀 추가

셀렉트 서비스에 가입후 로그인하셨다면 어드민 목록에서 "새로운 팀 추가"를 눌러주세요. 구분하기 쉬운 이름과 함께 나만의 도메인을 추가해보세요.

![](https://imagedelivery.net/MHVC-FGTDyxApYeHyF29Tw/59fe5fad-637d-4f26-762f-2ec6664fac00/docs)

## 2. 리소스 추가

어드민 화면을 만들기 위해 데이터가 필요합니다. 테스트 데이터를 연결해보세요. 

다양한 리소스 연결을 지원합니다. 연결하고 싶은 리소스가 보이지 않는다면 셀렉트 팀에게 문의해주세요.

![](https://imagedelivery.net/MHVC-FGTDyxApYeHyF29Tw/e9ce5978-88f6-46f3-974a-04956c3b8100/docs)

테스트 데이터 연결 방법
- 셀렉트 베이스 (Select base)
- Supabase
- Local Database with [ngrok.com](https://ngrok.com/){target="_blank"}
- MongoDB
- JSON

## 3. 편집 파일 추가

셀렉트 어드민은 여러개의 파일을 추가하고 관리할 수 있습니다. 

화면구성은 편집 페이지의 파일순서대로 적용됩니다. 만들고 싶은 페이지들을 파일단위로 관리해보세요.

![](https://imagedelivery.net/MHVC-FGTDyxApYeHyF29Tw/236d0a64-90cb-4d36-c366-59fff22a4000/docs)

## 4. 데이터 조회 페이지 만들기

셀렉트는 SQL, NoSQL 쿼리와 HTTP API, GraphQL 등 기존의 데이터 조회 방법들을 지원합니다. 

제일 먼저 SQL로 데이터 조회 페이지를 만들어보겠습니다. 이를 위해 조회할 쿼리를 준비합니다.

꼭 아래 쿼리가 아니어도 됩니다. 페이지로 만들고 싶은 SQL 쿼리를 준비해주세요.

```sql
SELECT * FROM users LIMIT 100
```

![](https://imagedelivery.net/MHVC-FGTDyxApYeHyF29Tw/e45b4a5c-d057-4aa2-cc5d-633423a7f500/docs)

편집 파일을 추가하고, 이미지와 같이 아래 YAML 코드를 복사 붙여넣기 해보세요.

데이터를 연결하지않고 느낌을 보고 싶다면 `resource: json+sql` 방식을 이용해보세요. 

::: code-group

```yaml [MySQL]
menus:
  - path: quickstart-read-data
    name: 데이터 조회

pages:
  - path: quickstart-read-data
    blocks:
      - type: query
        resource: mysql
        sqlType: select
        sql: >
          SELECT * FROM users LIMIT 100
```

```yaml [JSON + SQL]
menus:
  - path: quickstart-read-data
    name: 데이터 조회

pages:
  - path: quickstart-read-data
    blocks:
      - type: query
        resource: json+sql
        sqlType: select
        sql: >
          SELECT * FROM users LIMIT 100

        json:
          users:
            - id: '1'
              name: 김진수
              email: kimjsoo@naverr.com
              phone: '01011112222'
              created_at: '2022-12-27 00:00:00'
              updated_at: '2022-12-27 00:00:00'
              deleted_at: 'NULL'
            - id: '2'
              name: 장한
              email: hanjang@gmaill.com
              phone: '01022223333'
              created_at: '2022-12-30 00:00:00'
              updated_at: '2022-12-30 00:00:00'
              deleted_at: 'NULL'
            - id: '3'
              name: 박산정
              email: parksj@makersio.com
              phone: '01022221122'
              created_at: '2023-01-03 00:00:00'
              updated_at: '2023-01-03 00:00:00'
              deleted_at: 'NULL'
            - id: '4'
              name: 박채강
              email: cgpark@jumpcompany.com
              phone: '01099998888'
              created_at: '2023-01-16 00:00:00'
              updated_at: '2023-01-16 00:00:00'
              deleted_at: 'NULL'
            - id: '5'
              name: 김해
              email: kimhae1123@sunshinecorp.io
              phone: '01012345678'
              created_at: '2023-02-01 00:00:00'
              updated_at: '2023-02-01 00:00:00'
              deleted_at: 'NULL'
```

:::

## 4. 조건검색 입력필드 추가

사용자 ID나 이메일 등으로 데이터를 조회해야할 때가 있습니다. 셀렉트의 params 키로 조건검색을 위한 입력필드를 추가할 수 있어요.

params 키의 값은 sql 쿼리나 http api(axios) 등에서 매개변수(parameter)로 쓸 수 있습니다. 

![](https://imagedelivery.net/MHVC-FGTDyxApYeHyF29Tw/9c2e1c18-58c0-4122-ad15-ceb202973800/docs)

`pages:` 부분을 아래와 같이 바꿔보세요. sql 쿼리를 조건검색에 알맞게 바꾸고 입력필드를 params로 지정하였습니다.

```yaml
pages:
  - path: quickstart-read-data
    blocks:
      - type: query
        resource: mysql
        sqlType: select
        sql: >
          SELECT * 
          FROM users 
          WHERE (LENGTH(:id)=0 OR id = :id) 
          AND (LENGTH(:email)=0 OR email = :email)
          LIMIT 100
        params:
          - key: id
            label: ID
          - key: email
            label: 이메일
```

## 5. 데이터 컬럼 설정하기

조회한 데이터의 컬럼들을 숨기거나 머릿말에 이름을 붙이는 등 옵션을 설정할 수 있습니다. 

- `label`: 컬럼 머릿말 이름
- `hidden`: 컬럼 숨기기
- `color`: 데이터별 색상 지정

params와 동일한 들여쓰기 위치에 columns를 추가해주세요. 복사해서 추가할 때 params키가 2개 이상 중복되지 않게 유념해주세요.

::: tip
YAML 코드를 복사해서 추가할 때는 들여쓰기를 잘 확인해주세요. 

- 들여쓰기는 가능한 키보드 스페이스(space)키로 2칸 단위로 유지해주세요.
- 들여쓰기가 잘못된 상태로 저장하는 경우 YAML 오류 메시지와 함께 문제가 있는 영역을 표기합니다.

붙여넣기 한 다음 키보드 탭(tab)키를 누르거나 `shift + [` / `]`키를 눌러 들여쓰기를 바꿀 수 있습니다.
:::

```yaml
params:
  - key: id
    label: ID
  - key: email
    label: 이메일

columns:
  name:
    label: 이름
  email:
    label: 이메일
  phone:
    label: 전화번호
  created_at:
  updated_at:
    hidden: true
  deleted_at:
    hidden: true
  status:
    color:
      enabled: blue
      disabled: red
```

## 6. 모달(팝업) 띄우고 데이터 수정

특정 내역의 더 자세한 정보를 살펴보거나 데이터를 수정하고 싶을 때 모달(팝업)을 사용해보세요.

조회 블록에서 `viewModal`을 추가하여 데이터를 불러오고 수정할 수 있습니다. 

![](https://imagedelivery.net/MHVC-FGTDyxApYeHyF29Tw/f09d198f-4815-4095-f320-22a1f3f3ae00/docs)

viewModal을 params, columns와 동일한 위치에 추가해주세요.

```yaml
viewModal:
  useColumn: id
  mode: side
  blocks:
    - type: query
      resource: mysql
      sqlType: update
      sql: >
        UPDATE users
        SET status = :status
        WHERE id = :id
      params:
        - key: id
          valueFromRow: id
        - key: status
      reloadAfterSubmit: true

    - type: query
      resource: mysql
      sqlType: select
      sql: >
        SELECT *
        FROM users
        WHERE id = :id
      params:
        - key: id
          valueFromRow: id
      display: form
```

## 7. 데이터 추가 페이지 만들기

INSERT 쿼리를 이용하면 데이터 추가 페이지도 바로 만들 수 있어요. 

편집 파일을 추가하고 아래 YAML을 복사해서 붙여넣기 해보세요. 

기존 파일에 추가하시면 menus와 pages가 2개가 되기때문에 설정이 충돌하게 됩니다. 꼭 새로운 파일에 입력해주세요.

![](https://imagedelivery.net/MHVC-FGTDyxApYeHyF29Tw/6b4680d0-18e5-4496-b9d2-8e97378dce00/docs)

```yaml
menus:
  - path: quickstart-create-record
    name: 데이터 추가
    
pages:
  - path: quickstart-create-record
    blocks:
      - type: header
        items:
          - path: quickstart-read-data
            label: 전체내역
          - label: 추가

      - type: query
        resource: mysql
        sqlType: insert
        sql: >
          INSERT INTO users
          SET created_at = NOW()
            , name = :name
            , email = :email
        params:
          - key: name
            label: 이름
          - key: email
            label: 이메일
        display: form
        formOptions:
          firstLabelWidth: 80px
          width: 400px
        toast: 데이터가 추가되었어요.
        toastOptions:
          type: success
```

## 정리

전체 YAML코드를 차근차근 읽어보세요. 키key에 대한 설명을 함께 담았습니다. 위 과정이 헷갈릴 때는 전체코드를 살펴보셔도 좋습니다.

::: details 데이터 조회, 수정 페이지 전체코드

```yaml
menus:
  - path: quickstart-read-data
    name: 데이터 조회

pages:
  - path: quickstart-read-data
    blocks:
      - type: query # 쿼리 블록
        resource: mysql # 연결 리소스 이름
        sqlType: select
        sql: >
          SELECT * 
          FROM users 
          WHERE (LENGTH(:id)=0 OR id = :id) 
          AND (LENGTH(:email)=0 OR email = :email)
          LIMIT 100
        params: # 파라미터
          - key: id
            label: ID
          - key: email
            label: 이메일
        columns: # 컬럼 설정
          name: # 설정대상 컬럼
            label: 이름 # 표기할 이름
          email:
            label: 이메일
          phone:
            label: 전화번호
          created_at:
            label: 생성일
          updated_at:
            hidden: true
          deleted_at:
            hidden: true
          status:
            label: 상태
            color: # 데이터 컬러 설정
              enabled: blue
              disabled: red

        viewModal: # 모달(팝업) 띄우기
          useColumn: id
          mode: side # 사이드 모달 모드
          blocks:
            - type: query
              resource: mysql
              sqlType: update
              sql: >
                UPDATE users
                SET updated_at = NOW()
                  , status = :status
                WHERE id = :id
              params:
                - key: id
                  valueFromRow: id # 부모페이지의 id 필드에서 데이터를 가져옴
                - key: status
                  radioButtonGroup: true
                  radio: # 라디오버튼
                    - '': 상태없음
                    - enabled: 활성
                    - disabled: 비활성
              reloadAfterSubmit: true # 수정후 새로고침

            - type: query
              resource: mysql
              sqlType: select
              sql: >
                SELECT *
                FROM users
                WHERE id = :id
              params:
                - key: id
                  valueFromRow: id
              display: form # 폼 형태로 보여주기       
```

:::

::: details 데이터 추가 페이지 전체코드

```yaml
menus:
  - path: quickstart-create-record
    name: 데이터 추가
    
pages:
  - path: quickstart-create-record
    blocks:
      - type: header # 사이트 이동 경로 설정
        items:
          - path: quickstart-read-data
            label: 전체내역
          - label: 추가

      - type: query
        resource: mysql
        sqlType: insert
        sql: >
          INSERT INTO users
          SET created_at = NOW()
            , name = :name
            , email = :email
        params:
          - key: name
            label: 이름
            required: true # 필수입력
          - key: email
            label: 이메일
        display: form
        formOptions: # 폼 옵션
          firstLabelWidth: 80px
          width: 400px
        toast: 데이터가 추가되었어요.
        toastOptions: # 저장시 알림 테마
          type: success
```
:::

**배울수 있는 것들**

`menus`
- 메뉴를 구성할 수 있습니다. name키로 메뉴 이름을 정할 수 있고 path키로 접속경로(URL)를 설정하고 공유할 수도 있어요. 이해하기 쉬운 주소로 만들면 협업이 용이해요.

`pages`
- 페이지를 구성할 수 있어요. 메뉴와 path로 연결하며 페이지 안에는 여러개의 블록을 넣을 수 있습니다. 

`type: query`
- 쿼리(query) 블록은 셀렉트에서 지원하는 대표적인 블록중 하나에요. blocks키 안에 있어야하고 SQL 쿼리를 실행하는 블록입니다.

`params`
- 화면이나 다른 액션으로부터 데이터를 입력받을 때 필요해요.

`viewModal`
- 개별 데이터에 대한 상세내역을 조회하거나 수정할 때 모달(팝업)을 띄울 수 있어요.

`columns`
- 이름, 숨기기, 포맷 등 데이터 컬럼(열)에 대한 옵션을 설정해요.

`radio`
- 데이터를 입력하거나 선택하는 radio와 같은 HTML의 대표적인 기능들을 그대로 지원해요.

`type: header`
- 사이트 이동 경로(breadcrumb)를 머릿말에 표시할 수 있어요.

`display: form`
- 데이터를 폼(form) 형태로 보거나 입력할 수 있어요. 

`toast`
- 데이터를 수정하거나 저장하는 등 액션을 취했을 때 메시지를 지정하고 테마를 바꿀 수 있어요.


이외에도 문서에 다양한 기능과 옵션들이 있습니다.
이해가 어렵거나 궁금한점, 기능에 대한 의견은 아래 방법들로 자유롭게 문의주세요.

- [이메일](mailto:support@selectfromuser.com)
- 서비스안 채팅
- [커뮤니티](https://ask.selectfromuser.com)