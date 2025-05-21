-- 테이블 목록 확인
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public';

-- user 테이블 조회 (단수형)
SELECT * FROM "user";

-- 마이그레이션 테이블 확인
SELECT * FROM migrations;

-- 테이블 스키마 확인
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'user'; 