# 로그인 문제 해결 가이드

## 현재 상황

현재 구글 로그인 후 토큰이 URL 파라미터로 표시되고 있지만, 콜백 처리가 제대로 작동하지 않는 상황입니다.

## 임시 해결 방법

1. 브라우저에서 F12를 눌러 개발자 도구를 열어주세요.
2. 콘솔 탭으로 이동합니다.
3. 아래 코드를 붙여넣고 실행해주세요 (URL에서 token= 이후 부분을 복사해서 넣으세요):

```javascript
// URL에서 token 파라미터 가져오기
const urlParams = new URLSearchParams(window.location.search);
const token = urlParams.get('token');

if (token) {
  // 토큰을 로컬 스토리지에 저장
  localStorage.setItem('auth_token', token);
  console.log('토큰이 성공적으로 저장되었습니다.');
  // 페이지 새로고침
  window.location.href = '/';
} else {
  console.log('URL에서 토큰을 찾을 수 없습니다.');
}
```

4. 코드를 실행하면 토큰이 로컬 스토리지에 저장되고 페이지가 새로고침됩니다.
5. 새로고침 후 로그인 상태가 표시되어야 합니다.

## 영구적인 해결 방법

백엔드 서버를 다시 시작하면 수정된 리디렉션 URL(`/auth/callback`)이 적용되어 자동으로 로그인 처리가 될 것입니다.

```bash
cd backend
npm run start:dev
``` 