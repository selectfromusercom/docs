---
outline: deep
---

# 파일 포맷 업로드

## 클라이언트 전달 방식

updateOptions에 해당하는 예제를 담고 있습니다.  
HTTP API (multipart/form-data)를 통해 업로드 한 결과값을 입력 폼으로 가져옵니다.

### 미리보기

1. 편집할 해당 컬럼을 클릭합니다.

![](https://imagedelivery.net/MHVC-FGTDyxApYeHyF29Tw/de0cb341-8ce2-4657-6fab-6a3997289000/docs "edit-column.png")

2. 편집 모드로 바뀌면 직접 URL을 입력하거나 아래의 파일 선택 버튼이 표시됩니다.

![](https://imagedelivery.net/MHVC-FGTDyxApYeHyF29Tw/741cbb97-d2a5-4821-6003-c282f611ef00/docs "change-file.png")

3. 원하는 파일을 선택하면 즉시 API 호출되어 업로드 완료 후 URL 값이 채워집니다.

![](https://imagedelivery.net/MHVC-FGTDyxApYeHyF29Tw/de882cc9-da54-4f7a-9235-c99ad2057100/docs "file-upload.png")

4. 저장(초록색 체크박스) 버튼을 누르면 반영된 모습을 볼 수 있습니다.

![](https://imagedelivery.net/MHVC-FGTDyxApYeHyF29Tw/1acbdcb6-dc8d-484d-8bb1-e189fa9d6900/docs "updated-img.png")

### 설정하기

- httpOptions가 있는 경우 활성화 됩니다.
- 기본값 filename: file
- 기본값 result path: url

```yaml
columns:
  hero_image_url:
    # format: image
    format: file
    httpOptions:
      url: https://example.com/sample-api/upload
      method: post
      headers:
        Content-Type: multipart/form-data
      
      # request FormData filename 변경을 원하는 경우
      name: file

      # response json에서 url을 지정하여 가져오는 경우
      usePath: "result.object_url"
    updateOptions:
      type: query
      resource: mysql.qa
      sql: UPDATE properties_copy SET hero_image_url = :value WHERE id = :id
```

해당 테스트 API의 응답 결과는 아래와 같습니다.

```yaml
{
  "result": {
    "object_url": "https://placekitten.com/350/350?ts=1663131428104"
  }
}
```

## 서버 방식 업로드

```yaml
menus:
- path: file-upload
  name: file-upload
pages:
- path: file-upload
  blocks:
  - type: http
    axios:
      method: POST
      url: https://.../.../upload
    params:
    - key: name
    - key: file
      format: file
      id: new-images
```