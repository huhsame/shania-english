# Shania English

NestJS, NextJS, PostgreSQL을 사용한 웹 서비스입니다.

## 프로젝트 구조

- `/backend` - NestJS로 구축된 백엔드 API
- `/frontend` - NextJS로 구축된 프론트엔드
- `docker-compose.yml` - PostgreSQL 및 pgAdmin 설정

## 시작하기

### 사전 요구사항

- Node.js (v18 이상)
- npm
- Docker 및 Docker Compose

### 설치 및 실행

1. PostgreSQL 시작:

```bash
docker-compose up -d
```

2. 백엔드 실행:

```bash
cd backend
npm install
npm run start:dev
```

3. 프론트엔드 실행:

```bash
cd frontend
npm install
npm run dev
```

## 개발 리소스

- 백엔드: http://localhost:3000
- 프론트엔드: http://localhost:3001
- PostgreSQL: localhost:5432
- pgAdmin: http://localhost:5050 (이메일: admin@admin.com, 비밀번호: admin) 