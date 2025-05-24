

## 샤니아 잉글리시 프로젝트 개발 정보

### 개발 스택

#### 백엔드
- **프레임워크**: NestJS (v11)
- **언어**: TypeScript
- **데이터베이스**: PostgreSQL 16
- **ORM**: TypeORM
- **인증**: Google OAuth 2.0, Passport.js, JWT
- **기타 주요 라이브러리**:
  - @nestjs/config: 환경 변수 관리
  - @nestjs/jwt: JWT 토큰 발급 및 검증
  - @nestjs/passport: 인증 전략 관리
  - passport-google-oauth20: 구글 인증

#### 프론트엔드
- **프레임워크**: Next.js 15.3.2
- **언어**: TypeScript
- **React 버전**: React 19
- **UI 라이브러리**: 
  - Radix UI 컴포넌트 (다양한 UI 컴포넌트 사용)
  - Tailwind CSS 4
  - shadcn/ui (추정, Radix UI 컴포넌트를 사용한 디자인 시스템)
- **기타 주요 라이브러리**:
  - lucide-react: 아이콘
  - next-themes: 테마 관리
  - date-fns: 날짜 처리
  - sonner: 토스트 알림

#### 인프라
- **컨테이너화**: Docker, Docker Compose
- **데이터베이스 관리**: pgAdmin 4
- **개발 환경**: Node.js v18 이상

### 프로젝트 구조
- **/backend**: NestJS 백엔드 API
- **/frontend**: Next.js 프론트엔드
- **/vibe**: 개발 문서 및 태스크 정의
- **docker-compose.yml**: PostgreSQL 및 pgAdmin 설정

### 주요 기능
1. **사용자 인증**:
   - Google OAuth 2.0을 통한 로그인
   - JWT 기반 인증

2. **영어 학습 콘텐츠 관리**:
   - 다양한 소스(웹페이지, 유튜브, 텍스트)에서 영어 콘텐츠 수집
   - 영어 표현과 문장 관리
   - 한글 번역 제공

3. **개인화 학습**:
   - 사용자별 개인화된 예문 생성
   - 즐겨찾기 기능
   - 개인화된 PDF 생성

4. **PDF 생성 및 배포**:
   - 학습 자료 PDF 생성
   - 이메일 또는 GoodNote로 배포
   - 다운로드 기록 관리

### 데이터베이스 스키마
- **User**: 사용자 정보 (Google 인증, 개인화 정보 등)
- **Source**: 콘텐츠 소스 정보 (웹페이지, 유튜브, 텍스트)
- **Sentence**: 영어 문장 정보
- **Expression**: 영어 표현 정보
- **SentenceExpression**: 문장과 표현 간의 관계
- **DefaultExample**: 기본 예문
- **UserExample**: 사용자 개인화 예문
- **UserBookmark**: 사용자 즐겨찾기
- **GeneratedPdf**: 생성된 PDF 파일 정보
- **PdfDownload**: PDF 다운로드 기록

### 개발 환경 설정
1. 환경 변수 설정:
   - 루트 `.env`: Docker Compose 환경 변수
   - `backend/.env`: 백엔드 환경 변수 (DB 접속 정보, Google OAuth 정보)
   - `frontend/.env`: 프론트엔드 환경 변수 (API URL)

2. 개발 시작 명령어:
   ```bash
   # 데이터베이스 실행
   docker-compose up -d
   
   # 백엔드 실행
   cd backend
   npm install
   npm run start:dev
   
   # 프론트엔드 실행
   cd frontend
   npm install
   npm run dev
   ```

3. API 접근 정보:
   - 백엔드 API: http://localhost:3000
   - 프론트엔드: http://localhost:3001
   - PostgreSQL: localhost:5432
   - pgAdmin: http://localhost:5050
