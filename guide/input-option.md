---
outline: deep
---

# 입력 필드 상세 옵션

## 입력 필드 포맷 (formatString)

- params format number:  min(최솟값), max, step 추가
- params format text: minlength, maxlength, formatString 추가
- params 공통: placeholder(기본값) 포맷팅 안된 원본값으로 보냄 (3.3% → 3.3)
- (formatStringAsValue) 포맷팅 된 값으로 보냄

![](https://files.readme.io/cf76a6f-format-string.png "format-string.png")

```yaml
params:
- key: amount_decimal
  formatString: 0.00 %
  format: text
  required: true
```

## 필드 아래에 안내 문구

입력 필드에 대한 설명이 필요할 때 help 키를 사용해서 안내 문구를 추가할 수 있습니다.

![](https://files.readme.io/559c45d-help-text-input-field.png "help-text-input-field.png")

```yaml
params:
- key: birthday
  help: 생년월일 6자리를 입력해주세요.
```

## 입력 필드 숨기기

CSS style를 이용하여 입력 필드를 숨길 수 있습니다. 

```yaml
params:
- key: id
  style: >
    display: none
```