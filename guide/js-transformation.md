---
outline: deep
---

# JavaScript로 데이터 변환(transform)하기

어드민에 데이터를 표시하거나 수정하기전에 유효성 검증 로직을 넣거나, 공통 코드를 변환/치환해야하는 상황이 필요합니다. 이 경우 매번 쿼리와 API를 수정하지 않고 다음과 같이 가능합니다.

### Functions
#### 사용가능한 함수

- requestFn
- requestSubmitFn
- requestParamFn
- responseFn
- responseRowFn
- responseErrorFn


### Lifecycle
#### 실행 흐름

| 1. 사용자 | 2. 클라이언트 | 3. 서버 |  |
|-|-|-|-|
| 버튼클릭 또는 조회 요청 | 
| | RequestTransformation 실행: <br />- requestFn<br />- requestSubmitFn<br />- requestParamFn | | 브라우저 콘솔에 로그표시 |
| | | 쿼리/API 실행 | 클라우드 편집콘솔에 로그표시 |
| | ResponseTransformation 실행: <br />- responseFn<br />- responseRowFn<br />- responseErrorFn | |
| 결과물 표시 (display) | 
  
-----------

### requestFn

#### 사용 가능한 변수

- `params` Array: 파라메터 값
- `useTableSelectedRows` Function: 선택된 테이블 로우 가져오기
- `useModalRow` Function: 모달띄운 테이블 로우 가져오기
- `useEnv` Function: `PUBLIC_` 환경변수 가져오기
- `[block.id]` Object: 모든블록을 id로 접근 가능 `console.log(query1)`
  - `params` Object: 해당블록의 params 값 `query1.params.name.value`
  - `trigger` AsyncFunction: 해당블록의 실행결과값 `const r1 = await query1.trigger()`

#### 참고

- Async Function `await 사용가능`
- block, action, updateOptions, datalistFromQuery 공통
- [useTableSelectedRow 으로 조회 내역에서 선택값 넘겨주기](https://ask.selectfromuser.com/t/usetableselectedrows-with-selectoptions-actions-openmodal/178)
- [useEnv 안전하게 export된 환경변수 활용](https://ask.selectfromuser.com/t/useenv-export/274)


##### 파라메터 바꾸기

```js
const name = params.find(e => e.key == 'name')
name.value = 'NAME'
```

##### 검증후 중단하기

```js
toast('에러 메시지 표시')
return false // 멈추기
```

```js
throw new Error('에러 메시지 표시') // 멈추기
```


-------------

### requestSubmitFn

#### 사용 가능한 변수

- `_` Object: 유틸리티 함수 [lodash](https://lodash.com/docs/)
- `toast` Function: 알림표시
- `[block.id]` Object: 모든블록을 id로 접근 가능 `console.log(query1)`
  - `params` Object: 해당블록의 params 값 `query1.params.name.value`
  - `trigger` AsyncFunction: 해당블록의 실행결과값 `const r1 = await query1.trigger()`

#### 참고

- Async Function `await 사용가능`
- block에서 사용
- `return false`로 중단


-------------

### requestParamFn

#### 각 필드에 함수를 적용합니다.

- `param` Object: 모든 파라메터

```js
// price 필드만 숫자로 바꾸기
if (param.key == 'price') {
  param.value = Number(param.value)
}
return param
```


-----------

### responseFn

#### 응답 값에 함수를 적용합니다.

- `data` Object: 응답 원본
  - `message` String: 메시지 (ok 또는 에러메시지)
  - `error` Object: 에러 원본
  - `rows` Array: 데이터 원본
- `rows` Array: 데이터 여러건
- `row` Object: 데이터 첫번째 건
- `_` Object: 유틸리티 함수 [lodash](https://lodash.com/docs/)
- `useTableSelectedRows` Function: 선택된 테이블 로우 가져오기
- `useModalRow` Function: 모달띄운 테이블 로우 가져오기
- `toast` Function: 알림표시
- `[block.id]` Object: 모든블록을 id로 접근 가능 `console.log(query1)`
  - `params` Object: 해당블록의 params 값 `query1.params.name.value`
  - `trigger` AsyncFunction: 해당블록의 실행결과값 `const r1 = await query1.trigger()`

```js
// 특정 필드를 지우고, 추가하여 전달 
return rows.map(e => {
  e.deleted_at = undefined
  e.author = `작성자: ${e.author}`
  return e
})
```

```js
// 특정 조건에 해당하는 값만 전달 (클라이언트 필터링)
const filtered = rows.filter(e => e.published_at)
return filtered
```

#### 참고

- Async Function `await 사용가능`
- block, action, updateOptions, datalistFromQuery 공통
- [useModalRow 모달에서 부모 테이블 JSON 사용하기](https://ask.selectfromuser.com/t/usemodalrow-json/179)


-----------

### responseRowFn

#### 각 결과값에 함수를 적용합니다.

- `row` Object: 결과값 1건
- `_` Object: 유틸리티 함수 [lodash](https://lodash.com/docs/)

```js
row.hasAuthor = row.author_id > 1000 ? true : false
```

-----------

### responseErrorFn

#### 에러 응답인 경우 실행합니다.

- `row` Object: 응답 원본
  - `message` String: 메시지 (ok 또는 에러메시지)
  - `error` Object: 에러 원본
- `_` Object: 유틸리티 함수 [lodash](https://lodash.com/docs/)

```js
console.log(row)
console.log(row.error)
console.log(row.error.data)
console.log(row.error.message)
console.log(row.error.status)
console.log(row.error.statusText)

// throw new Error('샛별배송 23:00 이후로 재고 변경이 일시적으로 불가능합니다.')

return '에러 메시지 입니다. 블록 공간에 표시'

// toast('직접 띄우기')
// alert('직접 띄우기')
```

#### 참고

- [responseErrorFn 으로 실패 API 메시지 표시하기](https://ask.selectfromuser.com/t/responseerrorfn-api/71)
- [responseErrorFn 쿼리 에러 표시](https://ask.selectfromuser.com/t/responseerrorfn/298)