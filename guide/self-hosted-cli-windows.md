---
outline: deep
---

# 윈도우(Windows) 셀렉트 CLI 설치

셀렉트 설치형 CLI 관련하여 윈도우 환경에서 진행하는 방법을 안내드립니다.

전반적인 방법은 아래와 같습니다.

- 윈도우(Windows)에서 wsl 설치
- 셀렉트 설치형 CLI 진행

## wsl 설치

```
$ wsl --install

$ wsl --set-default-version 2
```

## 확인

```
$ wsl --list
```

(해당 하위 시스템 선택)

```
$ wsl -d Ubuntu
```

이후로는 설치형 CLI를 그대로 사용하면 됩니다. (리눅스, 유닉스 기반)

- [Self-hosted 로컬 CLI 가이드](./self-hosted-cli.md)

## 참고

```
# installs nvm (Node Version Manager)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.0/install.sh | bash

# download and install Node.js (you may need to restart the terminal)
nvm install 20

node -v

npm -v

npm i -g selectfromuser

slt -v
```

관련 도움이 필요하시면 아래 방법들로 문의주시기 바랍니다. 

- Email: support@selectfromuser.com
- Discourse: https://ask.selectfromuser.com/
- Slack: https://bit.ly/3CxsQSt