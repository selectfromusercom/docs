---
outline: deep
---

# 커스텀 도메인 연결

셀렉트 어드민에서는 기본 제공되는 `*.selectfromuser.com` 주소 외에, 고객사가 직접 소유한 도메인을 연결하여 사용할 수 있습니다.

## 어떤 방식으로 접속할지 먼저 결정하세요

커스텀 도메인을 연결하기 전에, 어드민을 어떤 형태로 공유하고 사용할지 방식을 먼저 결정하는 것이 중요합니다.

**앱(App) 공유**
- 셀렉트 앱에 로그인 후, 여러 어드민을 전환하며 사용
- 한 명이 여러 어드민을 동시에 사용하는 경우

**셀렉트 도메인 공유**
- `domain.selectfromuser.com` 형태의 주소를 직접 공유
- 별도 도메인 설정 없이 빠르게 하나만 공유하고 싶은 경우

**자사 커스텀 도메인**
- `admin.mydomain.com` 형태의 자사 도메인을 연결
- 브랜드 일관성이 중요하거나, 고객사 도메인으로 노출하고 싶은 경우

> **💡 참고** 아래 가이드는 **자사 커스텀 도메인 연결** 방식을 기준으로 설명합니다.

## 시작 전 확인사항

- 연결하려는 도메인의 **DNS 관리 권한**이 있어야 합니다.
- **다른 셀렉트 프로젝트에서 이미 사용 중인 도메인**은 즉시 등록할 수 없습니다. (임의 추가·삭제 방지를 위한 보안 정책)
- DNS 변경사항이 반영되기까지 **3분** 정도 소요됩니다.

## 연결 절차

### 1단계 — CNAME 레코드 먼저 추가

셀렉트 어드민에 도메인을 등록하기 **전에**, DNS에서 CNAME 레코드를 먼저 만들어야 합니다.

| 항목 | 값 |
|------|----|
| **type** | `CNAME` |
| **name (레코드 이름)** | `admin` (연결할 서브도메인) |
| **value (대상)** | `cname.vercel-dns.com.` |

::: tip AWS Route 53 기준 예시
1. Route 53 콘솔 → **Hosted zones** → 해당 도메인 선택
2. **Create record** 클릭
3. Record name: `admin`, Record type: `CNAME`, Value: `cname.vercel-dns.com.` 입력
4. **Create records** 클릭
:::

> **⚠️ 주의** CNAME 추가 없이 셀렉트 콘솔에서 도메인을 먼저 등록하면 `Error: queryCname ENODATA` 오류가 발생합니다. 반드시 순서를 지켜주세요.

### 2단계 — 도메인 추가

1. 셀렉트 어드민 콘솔에서 **설정 > 도메인** 메뉴로 이동합니다.
2. **`+ 도메인 추가`** 버튼을 클릭합니다.
3. 연결할 도메인 주소를 입력하고 **추가** 버튼을 클릭합니다.
   - 예시: `admin.mydomain.com`

### 3단계 — DNS TXT 레코드 추가 (도메인 소유권 인증)

도메인을 추가하면 아래와 같은 인증 정보가 표시됩니다.

| 항목 | 값 |
|------|----|
| **type** | `TXT` |
| **name (레코드 이름)** | `_vercel.mydomain.com` |
| **value** | `vc-domain-verify=admin.mydomain.com,xxxxxxxx` |

이 값을 복사하여, 사용 중인 DNS 서비스(Route 53, Cloudflare 등)에서 TXT 레코드를 추가합니다.

::: tip AWS Route 53 기준 예시
1. Route 53 콘솔 → **Hosted zones** → 해당 도메인 선택
2. **Create record** 클릭
3. Record name: `_vercel`, Record type: `TXT`, Value: 복사한 값 입력
4. TTL: `300` (기본값 유지 권장), Routing policy: `Simple routing`
5. **Create records** 클릭
:::

::: warning 기존 TXT 레코드가 있는 경우
`_vercel` 레코드가 이미 존재한다면, 기존 값을 삭제하지 않고 **새 값을 줄바꿈하여 추가**하세요. 두 값이 함께 존재해야 합니다.

```
"vc-domain-verify=admin2.mydomain.com,xxxxxxxx"
"vc-domain-verify=admin.mydomain.com,yyyyyyyy"
```
:::

### 4단계 — 인증 완료 확인

DNS 레코드 추가 후 **3분** 이내에 셀렉트 콘솔의 도메인 연결 상태가 자동으로 업데이트됩니다.

```
verified: true
```

위와 같이 `verified: true` 상태로 바뀌면 연결이 완료된 것입니다. 이후 연결된 도메인 목록에서 ✅ 아이콘으로 확인할 수 있습니다.

## 환경별 도메인 (PROD / DEV / STAGE)

커스텀 도메인을 연결하면, **별도 설정 없이** 아래 패턴으로 각 환경에 자동 접속됩니다.

| 환경 | 주소 |
|------|------|
| Production | `admin.mydomain.com` |
| Development | `admin-dev.mydomain.com` |
| Staging | `admin-stage.mydomain.com` |

> **⚠️ 참고** `-dev`, `-stage` 식별자 자체를 다른 이름으로 변경하는 커스텀은 현재 지원하지 않습니다.

## 환경별 API 주소 변경

화면 주소(프론트엔드)와 API 주소(백엔드)는 별도로 관리됩니다.  
API endpoint는 **설정 > 연동** 메뉴에서 환경별로 변경할 수 있습니다.

> 설치형(self-hosted) 환경에서도 동일하게 적용됩니다.

## 자주 묻는 질문

::: details 다른 프로젝트에서 이미 사용 중인 도메인을 연결할 수 있나요?
불가능합니다. 동일 도메인을 여러 프로젝트에서 임의로 추가·삭제하는 것을 방지하기 위한 보안 정책입니다. 기존 프로젝트에서 도메인을 먼저 해제한 뒤 재등록해야 합니다.
:::

::: details 도메인은 추가했는데 API 주소가 변경되지 않아요.
화면 주소와 API 주소는 별도입니다. **설정 > 연동** 메뉴에서 각 환경의 API endpoint를 직접 변경해주세요.
:::

::: details 설치형(self-hosted)에서도 커스텀 도메인을 사용할 수 있나요?
네, 사용 가능합니다. 연결 절차는 클라우드형과 동일합니다.
:::

::: details DNS 레코드를 추가했는데 3분이 지나도 인증이 안 돼요.
TTL 값이 길게 설정되어 있으면 반영이 늦을 수 있습니다. TTL을 `60`(1분)으로 낮추고 다시 시도해보세요. 또한 DNS 전파는 서비스 제공자에 따라 최대 수십 분이 걸릴 수 있습니다.
:::