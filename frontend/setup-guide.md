# 프론트엔드 설정 가이드

## 환경 변수 설정

1. 프론트엔드 디렉토리에 `.env.local` 파일을 생성하세요:
```
NEXT_PUBLIC_API_URL=http://localhost:3000
```

2. 백엔드 `.env` 파일의 `FRONTEND_URL` 값을 프론트엔드 주소로 설정해주세요:
```
FRONTEND_URL=http://localhost:3001  # Next.js 기본 포트가 3000이지만, 백엔드가 3000을 사용하므로 3001 사용
```

## 프로젝트 실행하기

1. 프론트엔드 실행:
```bash
cd frontend
npm install
npm run dev -- -p 3001  # 3001 포트로 실행
```

2. 백엔드 실행:
```bash
cd backend
npm install
npm run start:dev
```

## 구글 로그인 테스트하기

1. 브라우저에서 `http://localhost:3001/login` 접속
2. 구글 로그인 버튼 클릭
3. 구글 계정으로 로그인
4. 인증 완료 후 홈페이지로 리디렉션
5. 홈페이지 상단에 로그인 상태와 사용자 이름 확인 