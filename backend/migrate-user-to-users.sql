-- users 테이블 생성 (이미 존재하는 경우 스킵)
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY,
    "googleId" VARCHAR(255) UNIQUE,
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    picture VARCHAR(512),
    "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
    "updatedAt" TIMESTAMP NOT NULL DEFAULT now()
);

-- "user" 테이블에서 users 테이블로 데이터 이동
INSERT INTO users (id, "googleId", email, name, picture, "createdAt", "updatedAt")
SELECT id, "googleId", email, name, picture, "createdAt", "updatedAt"
FROM "user"
ON CONFLICT (email) DO NOTHING;

-- 마이그레이션된 레코드 수 출력
SELECT 'Migrated records: ' || COUNT(*) FROM users; 