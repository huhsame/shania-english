#!/bin/bash

# 1. 테스트 시 임시로 토큰 생성을 위해 기본 사용자 생성
# 실제로는 구글 로그인 후 토큰을 받지만, 테스트를 위해 직접 생성
# 이 스크립트는 해당 작업을 모의 시뮬레이션합니다.

# JWT 테스트 서비스 실행
echo "🚀 NestJS 서버 시작 중..."
npm run start:dev > /dev/null 2>&1 &
SERVER_PID=$!

# 서버가 시작될 때까지 잠시 기다림
sleep 5

# 테스트 토큰 (실제로는 구글 로그인 후 발급됨)
# 실제 환경에서는 구글 로그인 후 백엔드가 발급한 토큰을 사용할 것입니다.
TEST_TOKEN="여기에_실제_JWT_토큰을_넣으세요"

echo "📝 테스트 방법:"
echo "1. 먼저 구글 로그인을 통해 JWT 토큰을 얻으세요."
echo "2. 얻은 토큰으로 아래 명령어를 실행하세요:"
echo "   node src/test-auth.js '여기에_실제_JWT_토큰_붙여넣기'"
echo ""
echo "👉 구글 로그인 URL: http://localhost:3000/auth/google"
echo ""
echo "🔍 토큰 없이 보호된 엔드포인트 호출 시도 중 (401 예상)..."
curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/auth/me

# 모든 테스트 후 서버 종료
echo ""
echo "🛑 테스트 완료 후 서버를 종료하시려면 다음 명령어를 입력하세요:"
echo "   kill $SERVER_PID" 