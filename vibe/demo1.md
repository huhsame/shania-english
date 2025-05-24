# 🚀 월요일 데모버전 작업목록 (다이얼로그 버전)

## Day 1 (토요일) - Backend API 개발

### 🔧 Backend 환경 설정 (30분)
```
□ User 엔티티에 컬럼 추가
  - personalization_info: TEXT
  - goodnote_email: VARCHAR
□ 마이그레이션 파일 생성 및 실행
```

### 📡 Backend API 개발 (4시간)
```
□ src/user/ 폴더 구조 생성
  - user.controller.ts
  - user.service.ts
  - dto/user-profile.dto.ts
  - dto/update-personalization.dto.ts

□ 사용자 프로필 API 구현
  GET /api/user/profile
  Response: { email, name, personalizationInfo?, goodNoteEmail? }

□ 개인화 정보 저장 API 구현
  PUT /api/user/personalization
  Body: { personalizationInfo: string, goodNoteEmail?: string }

□ N8N 웹훅 전송 API 구현 (4개 필드)
  POST /api/webhook/send-to-n8n
  Body: {
    url: string,           // 필수
    personalization: string, // 필수  
    googleEmail: string,     // 필수
    goodNoteEmail?: string   // 선택
  }
```

### 🧪 Backend 테스트 (1시간)
```
□ API 엔드포인트 테스트
□ N8N 웹훅 4개 필드 전송 테스트
```

---

## Day 2 (일요일) - Frontend 다이얼로그 개발

### 🏠 홈 페이지 수정 (1시간)
```
□ src/app/page.tsx 수정
  - 링크 입력 텍스트 인풋
  - 시작하기 버튼
  - 로그인 상태 분기 로직:
    if (로그인됨) → 개인화 다이얼로그 열기
    else → Google 로그인 팝업 → 개인화 다이얼로그 열기
```

### 📋 다이얼로그 컴포넌트들 구현 (3시간)

#### 1) 개인화 정보 입력 다이얼로그 (1시간)
```
□ src/components/PersonalizationDialog.tsx 생성
  - 장문 텍스트 입력 (textarea)
  - 플레이스홀더 예시 텍스트
  - 기존 정보 불러오기 로직
  - 다음 버튼 → 이메일 다이얼로그 열기
  - 취소 버튼 → 다이얼로그 닫기
```

#### 2) 이메일 설정 다이얼로그 (1시간)
```
□ src/components/EmailSetupDialog.tsx 생성
  - GoodNote 이메일 입력 텍스트 인풋
  - 확인 버튼, 스킵 버튼
  - 기존 goodNoteEmail 있으면 미리 채우기
  - 확인/스킵 → N8N 웹훅 전송 → 완료 페이지로 이동
```

#### 3) 다이얼로그 상태 관리 (1시간)
```
□ 홈 페이지에서 다이얼로그 상태 관리
  - const [showPersonalizationDialog, setShowPersonalizationDialog] = useState(false)
  - const [showEmailDialog, setShowEmailDialog] = useState(false)
  - 단계별 데이터 전달 로직
```

---

## Day 3 (월요일) - 완료 페이지 & 마무리

### 🎉 완료 페이지 구현 (1시간)
```
□ src/app/processing/page.tsx 생성
  - 로딩 스피너 애니메이션
  - "AI가 열심히 만드는 중입니다!" 메시지
  - "메일로 보내드릴게요!" 안내
  - 홈으로 이동 버튼
```

### 🔗 전체 플로우 연동 (1시간)
```
□ 홈 → 다이얼로그들 → 완료 페이지 플로우 테스트
□ N8N 웹훅 4개 필드 전송 확인
□ 기존 사용자 데이터 불러오기 테스트
```

### 🐛 버그 수정 & 스타일링 (1시간)
```
□ 다이얼로그 애니메이션 적용
□ 에러 처리 로직 추가
□ 반응형 스타일링
```

---

## 📱 **UI 플로우 (다이얼로그 버전)**

### 1. 홈 페이지
```
┌─────────────────────────────────┐
│        헤더 (로그인 상태)       │
├─────────────────────────────────┤
│        샤니아 잉글리시          │
│                                 │
│  분석할 링크를 입력하세요        │
│  ┌─────────────────────────────┐ │
│  │ https://www.example.com    │ │
│  └─────────────────────────────┘ │
│                                 │
│        [시작하기 버튼]          │
└─────────────────────────────────┘
```

### 2. 개인화 정보 다이얼로그 (오버레이)
```
┌─────────────────────────────────┐
│         [X 닫기]               │
│    예문 생성을 위한 정보 입력    │
│                                 │
│  ┌─────────────────────────────┐ │
│  │ 영어 수준: 중급             │ │
│  │ 직업: 개발자               │ │
│  │ ...                        │ │
│  └─────────────────────────────┘ │
│                                 │
│     [취소]      [다음]         │
└─────────────────────────────────┘
```

### 3. 이메일 설정 다이얼로그 (오버레이)
```
┌─────────────────────────────────┐
│         [X 닫기]               │
│      GoodNote 이메일 설정       │
│                                 │
│  ┌─────────────────────────────┐ │
│  │ your-goodnote@email.com    │ │
│  └─────────────────────────────┘ │
│                                 │
│     [스킵]      [확인]         │
└─────────────────────────────────┘
```

### 4. 완료 페이지 (페이지 이동)
```
┌─────────────────────────────────┐
│          🤖 AI 작업 중          │
│      [로딩 스피너]              │
│   AI가 열심히 만드는 중입니다!   │
│     메일로 보내드릴게요!        │
│        [홈으로 이동]           │
└─────────────────────────────────┘
```

---

## 📁 **생성할 파일 목록**

### Backend (동일)
```
backend/src/
├── user/
│   ├── user.controller.ts
│   ├── user.service.ts
│   └── dto/
├── webhook/
│   ├── webhook.controller.ts
│   ├── webhook.service.ts
│   └── dto/
```

### Frontend (다이얼로그 버전)
```
frontend/src/
├── app/
│   ├── page.tsx               # 홈 (링크 입력 + 다이얼로그들)
│   └── processing/
│       └── page.tsx           # 완료 페이지
└── components/
    ├── PersonalizationDialog.tsx
    ├── EmailSetupDialog.tsx
    └── LoadingSpinner.tsx
```

---

## 🔧 **핵심 구현 로직**

### 홈 페이지 다이얼로그 관리
```typescript
// page.tsx
const [showPersonalizationDialog, setShowPersonalizationDialog] = useState(false);
const [showEmailDialog, setShowEmailDialog] = useState(false);
const [formData, setFormData] = useState({
  url: '',
  personalization: '',
  goodNoteEmail: ''
});

const handleStartClick = () => {
  if (!isLoggedIn) {
    triggerGoogleLogin().then(() => {
      setShowPersonalizationDialog(true);
    });
  } else {
    setShowPersonalizationDialog(true);
  }
};
```

### N8N 웹훅 전송 (4개 필드)
```typescript
// webhook.service.ts
async sendToN8N(data) {
  const payload = {
    url: data.url,                    // 필수
    personalization: data.personalization, // 필수
    googleEmail: data.googleEmail,     // 필수
    goodNoteEmail: data.goodNoteEmail  // 선택 (없으면 undefined/null)
  };
  
  // N8N으로 전송
}
```

---

## ✅ **성공 기준**
- 홈에서 다이얼로그들이 순서대로 열림
- N8N 웹훅 4개 필드 정상 전송
- 기존 사용자 데이터 다이얼로그에 미리 채워짐
- 완료 페이지로 정상 이동

**다이얼로그 UI가 더 깔끔하고 사용자 경험이 좋을 것 같아요!**