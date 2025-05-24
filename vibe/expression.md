

# 유튜브 자막 기반 영어 표현 추출 서비스 구현 작업 목록

## 1단계: 환경 구성 및 기본 설정

- [x] 프로젝트 구조 설정 (백엔드/프론트엔드)
- [x] 인증 기능 구현
- [x] 환경 변수 설정 (AI API 키 등)
  - [x] Claude API 키 설정
  - [x] OpenAI API 키 설정
- [ ] 데이터베이스 스키마 설계

## 2단계: 백엔드 - 기본 구성 요소 구현

- [ ] 엔티티 모델 구현
  - [ ] `youtube-video.entity.ts` 생성
  - [ ] `caption.entity.ts` 생성
  - [ ] `expression.entity.ts` 생성
  - [ ] `example.entity.ts` 생성
  - [ ] `ai-processing.entity.ts` 생성
- [ ] 유튜브 모듈 구현
  - [ ] `youtube.module.ts` 생성
  - [ ] `youtube.controller.ts` 생성
  - [ ] `youtube.service.ts` 생성
  - [ ] YouTube API 연동 기능 구현
- [ ] AI 서비스 통합 모듈 구현
  - [ ] `ai.module.ts` 생성
  - [ ] `ai.service.ts` 생성
  - [ ] `claude.service.ts` 구현
  - [ ] `openai.service.ts` 구현
  - [ ] 공통 인터페이스 정의

## 3단계: 백엔드 - 표현 추출 및 예문 생성 파이프라인 구현

- [ ] 표현 추출 모듈 구현
  - [ ] `expressions.module.ts` 생성
  - [ ] `expressions.controller.ts` 생성
  - [ ] `expressions.service.ts` 생성
  - [ ] `expression-extraction.pipeline.ts` 구현
  - [ ] Claude를 활용한 표현 추출 전략 구현
  - [ ] ChatGPT를 활용한 표현 추출 전략 구현
- [ ] 예문 생성 모듈 구현
  - [ ] `examples.module.ts` 생성
  - [ ] `examples.controller.ts` 생성
  - [ ] `examples.service.ts` 생성
  - [ ] `example-generation.pipeline.ts` 구현
  - [ ] Claude를 활용한 예문 생성 전략 구현
  - [ ] ChatGPT를 활용한 예문 생성 전략 구현
- [ ] 비동기 작업 처리 구현
  - [ ] 작업 큐 설정 (선택적)
  - [ ] 작업 상태 추적 기능 구현

## 4단계: 프론트엔드 - 기본 페이지 및 컴포넌트 구현

- [ ] 유튜브 URL 입력 페이지 구현
  - [ ] `app/youtube/page.tsx` 생성
  - [ ] `components/youtube/YoutubeUrlForm.tsx` 구현
- [ ] 자막 및 처리 결과 표시 컴포넌트 구현
  - [ ] `components/youtube/CaptionViewer.tsx` 구현
  - [ ] `components/ai-processing/ProcessingPipeline.tsx` 구현
  - [ ] `components/ai-processing/ProcessingStatus.tsx` 구현
- [ ] API 연동 로직 구현
  - [ ] `lib/api/youtube.ts` 구현
  - [ ] `lib/api/ai-processing.ts` 구현

## 5단계: 프론트엔드 - 표현 및 예문 페이지 구현

- [ ] 표현 목록 페이지 구현
  - [ ] `app/expressions/page.tsx` 생성
  - [ ] `components/expressions/ExpressionList.tsx` 구현
  - [ ] `components/expressions/ExpressionCard.tsx` 구현
- [ ] 표현 상세 페이지 구현
  - [ ] `app/expressions/[id]/page.tsx` 생성
  - [ ] `components/expressions/ExpressionDetails.tsx` 구현
  - [ ] `components/expressions/ExamplesList.tsx` 구현
- [ ] API 연동 로직 구현
  - [ ] `lib/api/expressions.ts` 구현
  - [ ] `lib/api/examples.ts` 구현

## 6단계: 비동기 처리 및 상태 관리 구현

- [ ] 처리 상태 관리 로직 구현
  - [ ] 백엔드: 처리 상태 API 구현
  - [ ] 프론트엔드: 상태 관리 로직 구현 (`lib/state/processing-status.ts`)
- [ ] 실시간 처리 상태 업데이트 구현
  - [ ] 폴링 또는 웹소켓 구현
  - [ ] 처리 단계별 시각화 컴포넌트 구현

## 7단계: 사용자 경험 개선 및 UI 최적화

- [ ] 로딩 상태 및 오류 처리 개선
  - [ ] 로딩 상태 UI 구현
  - [ ] 오류 메시지 처리 구현
- [ ] 반응형 디자인 최적화
  - [ ] 모바일 화면 최적화
  - [ ] 다양한 화면 크기 지원
- [ ] 테마 및 스타일 적용
  - [ ] 일관된 디자인 시스템 적용
  - [ ] 다크/라이트 모드 지원 (선택적)

## 8단계: 테스트 및 배포

- [ ] 백엔드 테스트 구현
  - [ ] 단위 테스트 작성
  - [ ] 통합 테스트 작성
- [ ] 프론트엔드 테스트 구현
  - [ ] 컴포넌트 테스트 작성
  - [ ] E2E 테스트 작성 (선택적)
- [ ] 배포 구성
  - [ ] 도커 컨테이너 구성
  - [ ] CI/CD 파이프라인 설정 (선택적)
- [ ] 프로덕션 환경 설정
  - [ ] 환경 변수 설정
  - [ ] 로깅 및 모니터링 설정

## 9단계: 최적화 및 추가 기능

- [ ] 성능 최적화
  - [ ] 데이터베이스 쿼리 최적화
  - [ ] 캐싱 전략 구현
- [ ] 사용자 피드백 기능 추가
  - [ ] 표현 평가 기능 구현
  - [ ] 사용자 커스텀 예문 추가 기능
- [ ] 통계 및 대시보드 구현 (선택적)
  - [ ] 사용자 학습 통계
  - [ ] 서비스 사용 통계

## 10단계: 문서화 및 유지보수 계획

- [ ] API 문서화
  - [ ] Swagger/OpenAPI 설정
  - [ ] API 사용 가이드 작성
- [ ] 사용자 가이드 작성
  - [ ] 서비스 사용 방법 안내
  - [ ] 자주 묻는 질문(FAQ) 작성
- [ ] 유지보수 계획 수립
  - [ ] 버그 트래킹 시스템 설정
  - [ ] 정기 업데이트 계획 수립
