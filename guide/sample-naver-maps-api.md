---
outline: deep
---

# 네이버 지도 API 호출

네이버 지도 API의 geocode를 통해 주소를 검색하여 상세 정보를 받아오는 방법

## geocode api

주소 일부 정보로 검색해서 주소에 대한 자세한 정보와 위도/경도 값을 받아올 수 있습니다. 

```yaml
menus:
- path: geocoding  
pages:
- path: geocoding  
  blocks: 
  - type: http
    axios:
      method: GET
      url: https://naveropenapi.apigw.ntruss.com/map-geocode/v2/geocode?query={{address}}
      headers:
        X-NCP-APIGW-API-KEY-ID: "{{geocode_client}}"
        X-NCP-APIGW-API-KEY: "{{geocode_secret}}"
    rowsPath: addresses
    params:
    - key: address
    - key: geocode_client
      valueFromEnv: NAVER_GEOCODE_CLIENT
    - key: geocode_secret
      valueFromEnv: NAVER_GEOCODE_SECRET
```