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
```

3. `frontend/.env`:
```
NEXT_PUBLIC_API_URL=http://localhost:3000
PORT=3001
```

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