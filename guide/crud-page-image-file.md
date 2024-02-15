---
outline: deep
---

# 이미지 파일 추가

## 셀렉트 지원 서비스

- 파일을 업로드하는 UI를 쉽게 만들 수 있게 돕습니다.
- multipart/form-data API를 만들어서 활용하시거나, 셀렉트의 s3 url 기능을 사용해보세요.
- 이미지 등 파일을 셀렉트에 영구적으로 저장하는 서비스(Storage)를 제공합니다.

> 📘 사용법 문의
> 
> 사용 방법이 이해가 어렵거나 도움이 필요하시면 [support@selectfromuser.com](mailto:support@selectfromuser.com) 또는 커뮤니티(<https://ask.selectfromuser.com>) 등으로 문의주시기 바랍니다.

## multipart/form-data API 방식

```yaml
menus:
- path: file-image-upload
  group: file-upload
  
pages:
- path: file-image-upload
  blocks:
  - type: http
    axios:
      method: POST 
      url: https://api.selectfromuser.com/sample-api/upload
    params:
      - key: name
      - key: file
        format: file
        id: new-image-1
        multiple: true
```

## format: s3 방식

```yaml
menus:
- path: file-cloud-s3
  group: file-upload
  
pages:
- path: file-cloud-s3
  blocks:
  - type: http
    axios:
      method: POST
      url: https://api.selectfromuser.com/sample-api/upload-each-s3
      params: 
        'imageCode': "{{imageCode}}"
        'madangId': "TEST"
      data:
        file_urls: "{{file_urls}}"
    params:
      - key: imageCode
        radio:
          MAIN: 메인 사진
          SUB: 서브 사진

      - key: file_urls
        format: s3
        multiple: true
        forEach: true
```