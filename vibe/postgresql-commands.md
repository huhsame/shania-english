# PostgreSQL 데이터베이스 명령어 모음

## 접속 및 기본 명령어

### PostgreSQL 접속
```bash
# Docker 컨테이너에서 실행 중인 PostgreSQL에 접속
docker exec -it shania-english-postgres psql -U postgres -d shania_english_db



# 연결 문자열 사용
psql "postgresql://postgres:postgres@localhost:5432/shania_english_db"
```

### 기본 psql 명령어
```
\h                  # SQL 명령어 도움말
\?                  # psql 명령어 도움말
\q                  # psql 종료
\c [데이터베이스명]   # 다른 데이터베이스로 연결
\i [파일명]          # 파일에서 SQL 명령 실행
\timing             # 쿼리 실행 시간 표시 토글
\e                  # 외부 편집기로 쿼리 편집
\s [파일명]          # 명령 기록 저장
\g                  # 마지막 쿼리 다시 실행
```

## 정보 조회 명령어

### 데이터베이스 및 테이블 정보
```
\l                  # 모든 데이터베이스 목록
\dt                 # 현재 데이터베이스의 모든 테이블 목록
\dt+                # 테이블 목록 상세 정보
\d [테이블명]        # 특정 테이블의 구조 확인
\d+ [테이블명]       # 테이블 구조의 상세 정보
\df                 # 함수 목록
\dv                 # 뷰 목록
\dn                 # 스키마 목록
\dp                 # 테이블, 뷰, 시퀀스의 접근 권한 목록
\ds                 # 시퀀스 목록
\di                 # 인덱스 목록
\du                 # 사용자 목록
\dx                 # 설치된 확장 목록
```

### 사용자 관리
```sql
CREATE USER username WITH PASSWORD 'password';
ALTER USER username WITH PASSWORD 'new_password';
DROP USER username;
GRANT ALL PRIVILEGES ON DATABASE database_name TO username;
```

## 데이터베이스 및 테이블 관리

### 데이터베이스 관리
```sql
CREATE DATABASE dbname;
DROP DATABASE dbname;
ALTER DATABASE old_name RENAME TO new_name;
```

### 테이블 관리
```sql
-- 테이블 생성
CREATE TABLE table_name (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 테이블 수정
ALTER TABLE table_name ADD COLUMN new_column_name data_type;
ALTER TABLE table_name DROP COLUMN column_name;
ALTER TABLE table_name RENAME COLUMN old_name TO new_name;
ALTER TABLE table_name ALTER COLUMN column_name TYPE new_data_type;
ALTER TABLE table_name RENAME TO new_table_name;

-- 테이블 삭제
DROP TABLE table_name;
TRUNCATE TABLE table_name;  -- 테이블 내용만 비우기
```

## 데이터 조작 명령어

### 데이터 조회
```sql
-- 기본 조회
SELECT * FROM table_name;
SELECT column1, column2 FROM table_name;

-- 조건부 조회
SELECT * FROM table_name WHERE condition;
SELECT * FROM table_name WHERE column_name = 'value';
SELECT * FROM table_name WHERE column_name LIKE '%pattern%';

-- 정렬
SELECT * FROM table_name ORDER BY column_name ASC|DESC;

-- 그룹화
SELECT column_name, COUNT(*) FROM table_name GROUP BY column_name;

-- 조인
SELECT a.column1, b.column2
FROM table1 a
JOIN table2 b ON a.id = b.table1_id;

-- 집계 함수
SELECT COUNT(*), AVG(column_name), SUM(column_name), 
       MIN(column_name), MAX(column_name)
FROM table_name;

-- 제한 및 오프셋
SELECT * FROM table_name LIMIT 10 OFFSET 20;
```

### 데이터 삽입, 수정, 삭제
```sql
-- 데이터 삽입
INSERT INTO table_name (column1, column2) VALUES ('value1', 'value2');
INSERT INTO table_name VALUES (DEFAULT, 'value1', 'value2'); -- 모든 열 지정

-- 여러 행 삽입
INSERT INTO table_name (column1, column2)
VALUES ('value1', 'value2'), ('value3', 'value4');

-- 데이터 수정
UPDATE table_name SET column1 = 'new_value' WHERE condition;
UPDATE table_name SET column1 = 'new_value', column2 = 'another_value' WHERE condition;

-- 데이터 삭제
DELETE FROM table_name WHERE condition;
DELETE FROM table_name; -- 모든 데이터 삭제
```

## 트랜잭션 관리
```sql
BEGIN;           -- 트랜잭션 시작
COMMIT;          -- 트랜잭션 확정
ROLLBACK;        -- 트랜잭션 취소
SAVEPOINT name;  -- 저장점 생성
ROLLBACK TO name; -- 저장점으로 롤백
```

## 성능 관련 명령어
```sql
EXPLAIN SELECT * FROM table_name WHERE condition;  -- 쿼리 실행 계획 확인
EXPLAIN ANALYZE SELECT * FROM table_name WHERE condition;  -- 실행 계획과 실제 실행 정보
VACUUM table_name;  -- 공간 회수 및 최적화
ANALYZE table_name;  -- 통계 수집
```

## 자주 사용하는 SQL 패턴

### 페이지네이션
```sql
-- 페이지당 10개 항목, 2페이지 조회
SELECT * FROM table_name ORDER BY id LIMIT 10 OFFSET 10;
```

### 전체 텍스트 검색
```sql
-- 텍스트 컬럼에서 검색
SELECT * FROM table_name WHERE text_column ILIKE '%검색어%';

-- 여러 컬럼에서 검색
SELECT * FROM table_name 
WHERE column1 ILIKE '%검색어%' OR column2 ILIKE '%검색어%';
```

### 집계 및 윈도우 함수
```sql
-- 순위 매기기
SELECT *, 
       ROW_NUMBER() OVER (ORDER BY score DESC) as rank
FROM scores;

-- 누적합 계산
SELECT *, 
       SUM(amount) OVER (PARTITION BY user_id ORDER BY created_at) as running_total
FROM transactions;
```

### JSON 데이터 처리
```sql
-- JSON 필드 접근
SELECT data->>'name' as name FROM table_with_json;

-- JSON 배열 요소 접근
SELECT data->'addresses'->0->>'city' as city FROM table_with_json;

-- JSON 필터링
SELECT * FROM table_with_json WHERE data->>'active' = 'true';
```

### 데이터베이스에서 users 테이블을 제외한 나머지 테이블들을 삭제하려면 다음과 같은 명령어를 실행하면 됩니다. 하지만 테이블 간에 외래 키 관계가 있을 수 있으므로 삭제 순서가 중요합니다.

다음 명령어를 순서대로 실행해보세요:

```sql
BEGIN;

-- 외래 키 제약 조건을 일시적으로 비활성화
SET CONSTRAINTS ALL DEFERRED;

-- 테이블 삭제 (users 제외)
DROP TABLE IF EXISTS user_expression_interactions;
DROP TABLE IF EXISTS credit_transactions;
DROP TABLE IF EXISTS payments;
DROP TABLE IF EXISTS user_profiles;
DROP TABLE IF EXISTS examples;
DROP TABLE IF EXISTS content_expressions;
DROP TABLE IF EXISTS expression_library;
DROP TABLE IF EXISTS contents;
DROP TABLE IF EXISTS migrations;

-- 트랜잭션 확정
COMMIT;
``` 