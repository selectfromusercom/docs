---
outline: deep
---

## `title:`

어드민 사용자가 보는 페이지의 상단 왼쪽에 보여지는 제목입니다.

```yaml
title: 어드민 제목
```


## `layout: {}`

### layout.style

어드민 화면 최상단 영역의 스타일을 바꿀 수 있습니다. 우리 팀에게 맞는 배경색으로 바꿔보세요. 

> 📘 title 키와 동일한 위치에서 사용합니다.

```yaml
layout:
  style:
    backgroundColor: "#3f63bf !important"
    borderBottom: solid 1px rgba(0,0,0,0.05)
```

### layout.login

`Beta` 셀렉트로 파트너센터나 고객 포털 등을 제작하실 때 로그인 화면을 일부 커스텀, 화이트라벨링을 할 수 있습니다.

::: info
베타(Beta) 기간 후에 이용 요금제에 따라 관련 기능 지원 정책이 달라집니다. 궁금하신 사항은 [이메일](mailto:support@selectfromuser.com) 등으로 문의해주세요. 
:::

```yaml
layout:
  login:
    methods:
      google:
        enabled: true
        text: 회사계정 로그인
      email:
        enabled: true
        text: 이메일 비밀번호 로그인
    
    header: Selectfromuser.com
    # header: |
    #   <img src="https://align.selectfromuser.com/lib_DmHvtrBlUMtUhGvc/sh11bex09q31frsy.png" style="height: 50px; margin: 0 auto;" />
    favicon: https://files.umso.co/lib_DmHvtrBlUMtUhGvc/emvdae7wl2lyppo0.png
    title: 파트너센터 로그인
    subtitle: 입점한 셀러분들만 이용할 수 있어요.
    width: 600
    buttons:
      - label: 도움말
        href: https://docs.selectfromuser.com
        target: _blank
      - label: 입점하기
        href: https://docs.selectfromuser.com
        target: _blank
    footer: |
      <b>© 2023 selectfromuser Inc.</b>
      주식회사 셀렉트프롬유저 | 서울시 송파구 법원로 128, B동 1408호 (문정동, 문정역SKV1)
      사업자등록번호 386-88-02410 | 통신판매신고 제2023-서울송파-0491호
```

### layout.head

`Beta` 셀렉트 어드민 `<head>` 태그에 필요한 스크립트(script)를 임베드할 수 있습니다.

::: info
베타(Beta) 기간 후에 이용 요금제에 따라 관련 기능 지원 정책이 달라집니다. 궁금하신 사항은 [이메일](mailto:support@selectfromuser.com) 등으로 문의해주세요. 
:::

```yaml
layout:
  head:
    - tag: script
      defer: true
      data-domain: noitaler.selectfromuser.com
      src: https://plausible.io/js/script.js
      innerHTML: |
        console.log('session:', window.selectAdminSession)
```

## [`menus`](/menus)

## [`pages`](/pages)