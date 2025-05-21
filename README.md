# Shania English

NestJS, NextJS, PostgreSQL을 사용한 웹 서비스입니다.

## 프로젝트 구조

- `/backend` - NestJS로 구축된 백엔드 API
- `/frontend` - NextJS로 구축된 프론트엔드
- `docker-compose.yml` - PostgreSQL 및 pgAdmin 설정
- `.env` - 루트 디렉토리의 Docker Compose용 환경 변수
- `backend/.env` - 백엔드용 환경 변수
- `frontend/.env` - 프론트엔드용 환경 변수

## 시작하기

### 사전 요구사항

- Node.js (v18 이상)
- npm
- Docker 및 Docker Compose

### 환경 변수 설정

각 환경 변수 파일을 아래와 같이 설정해야 합니다:

1. 루트 디렉토리의 `.env` (Docker Compose용):
```
POSTGRES_USER=your_db_user
POSTGRES_PASSWORD=your_db_password
POSTGRES_DB=shania_english_db
PGADMIN_DEFAULT_EMAIL=your_email@example.com
PGADMIN_DEFAULT_PASSWORD=your_secure_password
```

2. `backend/.env`:
```
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=your_db_user
DB_PASSWORD=your_db_password
DB_DATABASE=shania_english_db
PORT=3000
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
JWT_SECRET=your_jwt_secret
FRONTEND_URL=http://localhost:3001
```

3. `frontend/.env`:
```
NEXT_PUBLIC_API_URL=http://localhost:3000
PORT=3001
```

## Google OAuth 인증 흐름

이 프로젝트는 Google OAuth를 통한 인증 및 JWT 기반 인증을 지원합니다.

### 설정 방법

1. [Google Cloud Console](https://console.cloud.google.com/)에서 프로젝트를 생성합니다.
2. OAuth 클라이언트 ID를 생성합니다:
   - 승인된 리디렉션 URI: `http://localhost:3000/auth/google/redirect`
   - 받은 클라이언트 ID와 비밀키를 `backend/.env` 파일에 설정합니다.
3. JWT 비밀키 생성:
   ```bash
   openssl rand -hex 32
   ```
   생성된 값을 `backend/.env`의 `JWT_SECRET`에 설정합니다.

### 인증 흐름

1. 사용자가 프론트엔드에서 "Google로 로그인" 버튼을 클릭합니다.
2. 프론트엔드는 백엔드 `/auth/google` 엔드포인트로 리디렉션합니다.
3. 백엔드는 Passport.js를 사용하여 Google OAuth 인증 페이지로 리디렉션합니다.
4. 사용자가 Google 계정으로 로그인하면 Google은 백엔드의 콜백 URL `/auth/google/redirect`로 리디렉션합니다.
5. 백엔드는 사용자 정보를 처리하고:
   - 기존 사용자가 있는지 확인하거나 새 사용자를 생성합니다.
   - JWT 토큰을 생성합니다.
   - 프론트엔드의 콜백 페이지 `/auth/callback`으로 JWT 토큰과 함께 리디렉션합니다.
6. 프론트엔드는 JWT 토큰을 로컬 스토리지에 저장하고 사용자를 인증된 상태로 처리합니다.
7. 이후 모든 API 요청은 `Authorization: Bearer <token>` 헤더와 함께 전송됩니다.

### 인증 엔드포인트

- `GET /auth/google` - Google 로그인 시작
- `GET /auth/google/redirect` - Google OAuth 콜백 처리
- `GET /auth/me` - 현재 인증된 사용자 정보 조회 (JWT 인증 필요)

## 개발 명령어

### 1. 데이터베이스 실행

데이터베이스는 Docker를 통해 실행됩니다. 처음 실행하거나 컨테이너가 중지된 경우 다음 명령어를 실행합니다:

```bash
# 루트 디렉토리에서
docker-compose up -d
```

데이터베이스 컨테이너를 중지하려면:

```bash
docker-compose down
```

### 2. 백엔드 실행

```bash
# 백엔드 디렉토리로 이동
cd backend

# 첫 실행 시 의존성 설치
npm install

# 개발 모드로 백엔드 실행
npm run start:dev
```

### 3. 프론트엔드 실행

```bash
# 프론트엔드 디렉토리로 이동
cd frontend

# 첫 실행 시 의존성 설치
npm install

# 개발 모드로 프론트엔드 실행
npm run dev
```

## 개발 시 워크플로우

프로젝트 개발을 재개할 때마다 다음 순서로 서비스를 시작하세요:

1. 데이터베이스 실행 확인
   ```bash
   # 루트 디렉토리에서
   docker-compose ps
   
   # 실행 중이 아니라면
   docker-compose up -d
   ```

2. 백엔드 실행
   ```bash
   cd backend
   npm run start:dev
   ```

3. 프론트엔드 실행 (새 터미널에서)
   ```bash
   cd frontend
   npm run dev
   ```

## 개발 리소스

- 백엔드 API: http://localhost:3000
- 프론트엔드: http://localhost:3001
- PostgreSQL: localhost:5432
- pgAdmin: http://localhost:5050 (로그인 정보는 .env 파일에 설정한 값 사용) 