---
outline: deep
---

# 감사로그

셀렉트 어드민을 통한 사용자 접속기록, 계정변경, 권한부여등 로그를 남기고 조회합니다.

## 접속기록

사용자가 로그인하여 접속하거나 로그인 실패한경우 기록을 남깁니다.

기기가 변경된 경우에도 별도로 기록이 남습니다.

| 내역    | 코드 |
| -------- | ------- |
| 사용자 접속  | Role access    |
| 사용자 접속 거부 | Role access denied     |

## 권한기록 남기기

`설정 > 보안` 에서 `권한부여 사유` 기능을 활성화 합니다.

| 내역    | 코드 |
| -------- | ------- |
| 신규 사용자 초대 (권한 추가) | Role create |
| 사용자 권한 변경 | Role update |
| 사용자 권한 삭제 | Role delete |
| 사용자 권한그룹 추가 | group grant |
| 사용자 권한그룹 삭제 | group revoke |
| 관리자 페이지 서비스 권한 변경 | ServiceRole update |
| 사용자 프로퍼티 (UserProperty) 변경 | property update |


`설정 > 보안` 에서 `다운로드 사유` 기능을 활성화 합니다.

| 내역    | 코드 |
| -------- | ------- |
| 사용자 활동 로그 다운로드 | Activity download |
| 감사 로그 다운로드 | Audit download |


## SIEM API

Security information and event management (SIEM) 기능은 요청시 HTTP 웹훅, UDP 전송등 로그 스트리밍을 지원하고 있습니다. 

### 감사로그 조회 API

#### Method 

`POST` 

#### URL 

`https://api.selectfromuser.com/api/siem/[팀아이디].[키입력]/audit-search?q=created:2024-08-29`

- 팀아이디는 4자리 이상 숫자의 고유번호를 말합니다.
- 키입력은 팀 환경변수에 직접 발급한 `SELECT_SIEM_API_TOKEN` 값을 입력합니다.

#### Request example

```sh
curl -X POST 'https://api.selectfromuser.com/api/siem/1004.0000000-0000-0000-0000-000000000/audit-search?q=created%3A2023-08-20..2024-08-29'
```


- 지정일 검색: `q=created:2024-08-20` 
- 범위 검색: `q=created:2024-08-20..2024-08-29`
- 행위자 검색: `actor_id=1000`
- 대상자 검색: `action_target_id=1000`

#### Response example

| 키    | 설명 |
| -------- | ------- |
| id | 로그의 고유번호 |
| user_id | 셀렉트 클라우드의 계정번호 (actor_id) |
| team_id | 셀렉트 클라우드의 팀번호 (team_scope) |
| team_row_id | 미사용 |
| user_role_id | 미사용 |
| name | 코드 (action) |
| json | 관련 데이터 (권한의 before/after, 영향 scope등) |
| created_at | 기록일시 (UTC) (when) |
| user_permission | 행위당시의 사용자 보유 권한 (actor_permission) |
| user_agent | 행위당시의 사용자 에이전트 (actor_user_agent) |
| user_ip | 행위당시의 사용자 아이피 (actor_ip) |
| memo | 다운로드사유등 사용자 입력한 문구 |
| mode | 환경이름 (environment) |
| user_email | 행위자 이메일 (actor_email) |
| user_role_email | 권한부여의 대상자 이메일 (action_target_user) |

```json
{
    "message": "ok",
    "rows": [
        {
            "id": 17038,
            "user_id": 1,
            "team_id": 1004,
            "team_row_id": null,
            "user_role_id": 8,
            "name": "Role access",
            "json": {
                "scope": [
                    "tid:1004:admin"
                ]
            },
            "created_at": "2024-08-28 10:08:25",
            "user_permission": "admin",
            "user_agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36",
            "user_ip": "14.138.143.156",
            "memo": null,
            "mode": null,
            "user_email": "jhlee@selectfromuser.com",
            "user_role_email": "jhlee@selectfromuser.com"
        }
    ],
    "count": 141,
    "total": 141
}
```


### 관련 자료

- [개인정보시스템 취급자 및 로그 관련 내용](https://blog.selectfromuser.com/privacy-log-retention)