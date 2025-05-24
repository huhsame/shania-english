# 데이터베이스 스키마 설계

## 1. User (사용자)

사용자 정보를 저장하는 테이블입니다.

| 필드 | 타입 | 설명 | 제약조건 |
|------|------|------|----------|
| id | UUID | 고유 식별자 | Primary Key |
| googleId | VARCHAR | 구글 인증 ID | Unique, Nullable |
| email | VARCHAR | 사용자 이메일 | Unique |
| name | VARCHAR | 사용자 이름 | Not Null |
| picture | VARCHAR | 프로필 이미지 URL | Nullable |
| goodnote_mail | VARCHAR | 굿노트 메일 주소 | Nullable |
| user_type | ENUM | 사용자 유형 ('free', 'starter', 'pro', 'expert') | Default: 'free' |
| personalization_info | TEXT | 개인화 정보 | Nullable |
| createdAt | TIMESTAMP | 생성 시간 | Not Null |
| updatedAt | TIMESTAMP | 수정 시간 | Not Null |
| deletedAt | TIMESTAMP | 삭제 시간 (Soft Delete) | Nullable |

## 2. Source (소스)

콘텐츠 소스 정보를 저장하는 테이블입니다.

| 필드 | 타입 | 설명 | 제약조건 |
|------|------|------|----------|
| id | UUID | 고유 식별자 | Primary Key |
| url | VARCHAR | 소스 URL | Unique |
| title | VARCHAR | 소스 제목 | Not Null |
| content_type | ENUM | 콘텐츠 유형 ('webpage', 'youtube', 'text') | Not Null |
| processed_at | TIMESTAMP | 처리 시간 | Nullable |
| createdAt | TIMESTAMP | 생성 시간 | Not Null |
| updatedAt | TIMESTAMP | 수정 시간 | Not Null |

## 3. Sentence (문장)

문장 정보를 저장하는 테이블입니다.

| 필드 | 타입 | 설명 | 제약조건 |
|------|------|------|----------|
| id | UUID | 고유 식별자 | Primary Key |
| source_id | UUID | 소스 ID | Foreign Key (sources.id) |
| original_text | TEXT | 원본 텍스트 | Not Null |
| korean_translation | TEXT | 한글 번역 | Nullable |
| createdAt | TIMESTAMP | 생성 시간 | Not Null |
| updatedAt | TIMESTAMP | 수정 시간 | Not Null |

**관계:**
- Source와 다대일(N:1) 관계

## 4. Expression (표현)

영어 표현 정보를 저장하는 테이블입니다.

| 필드 | 타입 | 설명 | 제약조건 |
|------|------|------|----------|
| id | UUID | 고유 식별자 | Primary Key |
| expression_text | VARCHAR | 표현 텍스트 | Unique |
| korean_meaning | TEXT | 한글 의미 | Not Null |
| usage_context | TEXT | 사용 상황 설명 | Nullable |
| createdAt | TIMESTAMP | 생성 시간 | Not Null |
| updatedAt | TIMESTAMP | 수정 시간 | Not Null |

## 5. SentenceExpression (문장-표현 매핑)

문장과 표현 간의 관계를 저장하는 테이블입니다.

| 필드 | 타입 | 설명 | 제약조건 |
|------|------|------|----------|
| id | UUID | 고유 식별자 | Primary Key |
| sentence_id | UUID | 문장 ID | Foreign Key (sentences.id) |
| expression_id | UUID | 표현 ID | Foreign Key (expressions.id) |
| createdAt | TIMESTAMP | 생성 시간 | Not Null |
| updatedAt | TIMESTAMP | 수정 시간 | Not Null |

**제약조건:**
- (sentence_id, expression_id) 복합 인덱스 (Unique)

**관계:**
- Sentence와 다대일(N:1) 관계
- Expression과 다대일(N:1) 관계

## 6. DefaultExample (기본 예문)

표현에 대한 기본 예문을 저장하는 테이블입니다.

| 필드 | 타입 | 설명 | 제약조건 |
|------|------|------|----------|
| id | UUID | 고유 식별자 | Primary Key |
| expression_id | UUID | 표현 ID | Foreign Key (expressions.id) |
| example_text | TEXT | 예문 텍스트 | Not Null |
| korean_translation | TEXT | 한글 번역 | Nullable |
| createdAt | TIMESTAMP | 생성 시간 | Not Null |
| updatedAt | TIMESTAMP | 수정 시간 | Not Null |

**관계:**
- Expression과 다대일(N:1) 관계

## 7. UserExample (사용자 개인화 예문)

사용자별 개인화된 예문을 저장하는 테이블입니다.

| 필드 | 타입 | 설명 | 제약조건 |
|------|------|------|----------|
| id | UUID | 고유 식별자 | Primary Key |
| user_id | UUID | 사용자 ID | Foreign Key (users.id) |
| expression_id | UUID | 표현 ID | Foreign Key (expressions.id) |
| example_text | TEXT | 예문 텍스트 | Not Null |
| korean_translation | TEXT | 한글 번역 | Nullable |
| createdAt | TIMESTAMP | 생성 시간 | Not Null |
| updatedAt | TIMESTAMP | 수정 시간 | Not Null |

**관계:**
- User와 다대일(N:1) 관계 (SET NULL)
- Expression과 다대일(N:1) 관계 (CASCADE)

## 8. UserBookmark (즐겨찾기)

사용자가 즐겨찾기한 표현을 저장하는 테이블입니다.

| 필드 | 타입 | 설명 | 제약조건 |
|------|------|------|----------|
| id | UUID | 고유 식별자 | Primary Key |
| user_id | UUID | 사용자 ID | Foreign Key (users.id) |
| expression_id | UUID | 표현 ID | Foreign Key (expressions.id) |
| createdAt | TIMESTAMP | 생성 시간 | Not Null |
| updatedAt | TIMESTAMP | 수정 시간 | Not Null |

**제약조건:**
- (user_id, expression_id) 복합 인덱스 (Unique)

**관계:**
- User와 다대일(N:1) 관계 (SET NULL)
- Expression과 다대일(N:1) 관계 (CASCADE)

## 9. GeneratedPdf (생성된 PDF)

생성된 PDF 파일 정보를 저장하는 테이블입니다.

| 필드 | 타입 | 설명 | 제약조건 |
|------|------|------|----------|
| id | UUID | 고유 식별자 | Primary Key |
| source_id | UUID | 소스 ID | Foreign Key (sources.id) |
| user_id | UUID | 사용자 ID | Foreign Key (users.id), Nullable |
| pdf_type | ENUM | PDF 유형 ('common', 'personalized') | Not Null |
| file_path | VARCHAR | 파일 저장 경로 | Not Null |
| file_size | BIGINT | 파일 크기 | Not Null |
| generation_status | ENUM | 생성 상태 ('processing', 'completed', 'failed') | Default: 'processing' |
| generated_at | TIMESTAMP | PDF 생성 완료 시간 | Nullable |
| createdAt | TIMESTAMP | 생성 시간 | Not Null |
| updatedAt | TIMESTAMP | 수정 시간 | Not Null |

**인덱스:**
- (source_id, user_id)
- (source_id, pdf_type)

**관계:**
- Source와 다대일(N:1) 관계 (CASCADE)
- User와 다대일(N:1) 관계 (SET NULL)

## 10. PdfDownload (PDF 다운로드 기록)

PDF 다운로드 기록을 저장하는 테이블입니다.

| 필드 | 타입 | 설명 | 제약조건 |
|------|------|------|----------|
| id | UUID | 고유 식별자 | Primary Key |
| user_id | UUID | 사용자 ID | Foreign Key (users.id) |
| pdf_id | UUID | PDF ID | Foreign Key (generated_pdfs.id) |
| download_type | ENUM | 다운로드 방식 ('email', 'goodnote', 'web') | Not Null |
| downloaded_at | TIMESTAMP | 다운로드 시간 | Default: CURRENT_TIMESTAMP |
| createdAt | TIMESTAMP | 생성 시간 | Not Null |
| updatedAt | TIMESTAMP | 수정 시간 | Not Null |

**관계:**
- User와 다대일(N:1) 관계 (SET NULL)
- GeneratedPdf와 다대일(N:1) 관계 (CASCADE)

## ER 다이어그램

```
                                       +-------------+
                                       | UserBookmark|
                                       +-------------+
                                             | |
                                             | |
User (1) --- (*) UserExample (*) --- (1) Expression (1) --- (*) DefaultExample
  |                                         |
  |                                         |
  |                                         |
  +------ (*) PdfDownload (*) ----------+   |
  |                                     |   |
  |                                     |   |
  |                                     v   v
  +--- (1) GeneratedPdf (*) --- (1) Source (1) --- (*) Sentence (*) --- (*) SentenceExpression
```

## 외래 키 관계

대부분의 외래 키는 CASCADE 옵션이 설정되어 있어, 상위 레코드가 삭제되면 관련된 하위 레코드도 함께 삭제됩니다. 단, User 관련 외래 키는 Soft Delete를 구현하기 위해 SET NULL로 설정되어 있습니다.

### CASCADE 관계 (상위 레코드 삭제 시 하위 레코드도 삭제)
- `Sentence.source_id` → `Source.id`
- `SentenceExpression.sentence_id` → `Sentence.id`
- `SentenceExpression.expression_id` → `Expression.id`
- `DefaultExample.expression_id` → `Expression.id`
- `UserExample.expression_id` → `Expression.id`
- `UserBookmark.expression_id` → `Expression.id`
- `GeneratedPdf.source_id` → `Source.id`
- `PdfDownload.pdf_id` → `GeneratedPdf.id`

### SET NULL 관계 (상위 레코드 삭제 시 외래 키 NULL로 설정)
- `UserExample.user_id` → `User.id`
- `UserBookmark.user_id` → `User.id`
- `GeneratedPdf.user_id` → `User.id`
- `PdfDownload.user_id` → `User.id`

## UUID 사용

모든 테이블은 기본 키로 UUID를 사용합니다. 이를 통해 ID 충돌 없이 안전하게 레코드를 식별할 수 있습니다.

## Soft Delete

User 테이블은 Soft Delete가 구현되어 있습니다. 사용자가 삭제될 때 실제로 레코드가 삭제되지 않고 `deletedAt` 필드에 삭제 시간이 기록됩니다. 이를 통해 사용자 데이터를 복구하거나 감사 목적으로 보존할 수 있습니다.

## 복합 인덱스

성능 최적화를 위해 다음과 같은 복합 인덱스가 설정되어 있습니다:

- `SentenceExpression`: (sentence_id, expression_id) - Unique
- `UserBookmark`: (user_id, expression_id) - Unique
- `GeneratedPdf`: (source_id, user_id)
- `GeneratedPdf`: (source_id, pdf_type) 