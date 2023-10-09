---
outline: deep
---

# 입력 필드 만들기

필터링된 데이터를 조회하거나 데이터를 추가, 수정하기 위해서는 입력 필드(input field) UI가 필요합니다. 

셀렉트 어드민에서는 이런 입력 필드를 아래와 같이 만들 수 있습니다.

기본적으로 `params`가 입력 필드(input field)의 역할을 맡습니다.

params 는 parameter를 뜻하며 기본적으로 key와 함께합니다. 필드가 어떤 의미인지 다르게 표기하고 싶을 때는 label을 사용해보세요. 

![](https://imagedelivery.net/MHVC-FGTDyxApYeHyF29Tw/b3d05448-23c3-405e-3a04-c6c3086aa100/docs)

```yaml
params:
- key: name
  label: 이름
- key: category
```

params에 대해 더 자세한 정보는 **Reference > [params](/params)** 페이지에서 확인해보세요.