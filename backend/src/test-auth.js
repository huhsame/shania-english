// 토큰으로 인증된 API 테스트하는 간단한 스크립트
// 사용법: node test-auth.js <YOUR_JWT_TOKEN>

const axios = require('axios');

async function testAuthenticatedEndpoint() {
  const token = process.argv[2];
  
  if (!token) {
    console.error('토큰을 입력해주세요: node test-auth.js <YOUR_JWT_TOKEN>');
    process.exit(1);
  }

  try {
    const response = await axios.get('http://localhost:3000/auth/me', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    console.log('인증 성공!');
    console.log('사용자 정보:');
    console.log(JSON.stringify(response.data, null, 2));
    return true;
  } catch (error) {
    console.error('인증 실패!');
    if (error.response) {
      console.error(`상태 코드: ${error.response.status}`);
      console.error('에러 메시지:', error.response.data);
    } else {
      console.error('요청 에러:', error.message);
    }
    return false;
  }
}

testAuthenticatedEndpoint(); 