### Nest + PostgreSQL에서 **옵션 2(백엔드 Google OAuth → JWT 발급)** 구현 작업목록

> *Cursor IDE 기준 • 브랜치 `feat/google-auth`*

---

#### 0. 준비

1. **새 브랜치**

   ```bash
   git checkout -b feat/google-auth
   ```
2. **Google Cloud Console**

   * OAuth 클라이언트 ID 생성
   * 승인된 리디렉션 URI → `http://localhost:3000/auth/google/redirect` (dev)
   * `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` 메모

---

#### 1. 환경 변수 & 기본 세팅

1. **`.env.example` 추가**

   ```env
   DATABASE_URL=postgres://...
   GOOGLE_CLIENT_ID=
   GOOGLE_CLIENT_SECRET=
   JWT_SECRET=
   FRONTEND_URL=http://localhost:3001   # Next dev 서버
   ```
2. **Cursor에서 `.env.development` 작성 후 `JWT_SECRET` 생성**

   ```bash
   openssl rand -hex 32
   ```

---

#### 2. 의존성 설치

```bash
pnpm add @nestjs/passport passport passport-google-oauth20 \
        @nestjs/jwt passport-jwt
pnpm add -D @types/passport-google-oauth20 @types/passport-jwt
```

---

#### 3. Auth 모듈 스캐폴딩

```bash
nest g module auth
nest g service auth
nest g controller auth
nest g guard jwt --flat
```

---

#### 4. User 엔티티 & 마이그레이션 (TypeORM 예시)

1. **`src/users/user.entity.ts`**

   ```ts
   @Entity()
   export class User {
     @PrimaryGeneratedColumn('uuid') id: string;
     @Column({ unique: true, nullable: true }) googleId: string;
     @Column({ unique: true }) email: string;
     @Column() name: string;
     @Column({ nullable: true }) picture: string;
     @CreateDateColumn() createdAt: Date;
     @UpdateDateColumn() updatedAt: Date;
   }
   ```
2. **마이그레이션 실행**

   ```bash
   pnpm typeorm migration:generate -n create-users
   pnpm typeorm migration:run
   ```

---

#### 5. GoogleStrategy 구현

`src/auth/strategies/google.strategy.ts`

```ts
@Injectable()
export class GoogleStrategy extends PassportStrategy(Google, 'google') {
  constructor(private usersRepo: UsersRepository) {
    super({
      clientID:     process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL:  '/auth/google/redirect',
      scope: ['profile', 'email'],
    });
  }

  async validate(_: string, __: string, profile: GoogleProfile) {
    const { id, emails, displayName, photos } = profile;
    const email = emails?.[0].value;
    let user = await this.usersRepo.findByEmail(email);
    if (!user)
      user = await this.usersRepo.create({
        googleId: id,
        email,
        name: displayName,
        picture: photos?.[0].value,
      });
    return user;           // req.user 로 전달
  }
}
```

---

#### 6. JWT 설정

1. **`AuthModule`**

   ```ts
   JwtModule.registerAsync({
     useFactory: () => ({
       secret:     process.env.JWT_SECRET,
       signOptions:{ expiresIn: '7d' },
     }),
   })
   ```
2. **`AuthService.signJwt(user)`** 작성
3. **`JwtStrategy` + `JwtAuthGuard`** 구현

---

#### 7. AuthController 라우트

```ts
// GET /auth/google
@UseGuards(AuthGuard('google'))
googleLogin() { /* Passport가 302 → Google */ }

// GET /auth/google/redirect
@UseGuards(AuthGuard('google'))
googleRedirect(@Req() req, @Res() res) {
  const token = this.authService.signJwt(req.user);
  res.redirect(`${process.env.FRONTEND_URL}?token=${token}`);
}
```

---

#### 8. CORS & 쿠키/헤더 처리

```ts
app.enableCors({
  origin: process.env.FRONTEND_URL,
  credentials: true,
});
```

* Next 쪽에서 `token` 쿼리 파라미터 수신 후 `localStorage`(또는 `httpOnly` 쿠키) 저장
* Axios 인스턴스 기본 헤더 `Authorization: Bearer <token>`

---

#### 9. 보호 API 테스트

1. **`/me`** 엔드포인트 → `@UseGuards(JwtAuthGuard)`
2. Next에서 토큰 포함 요청 → 200 응답 확인

---

#### 10. 문서 & 커밋

1. **README 섹션** *“Google OAuth flow”* 추가
2. `git add . && git commit -m "feat: Google OAuth with JWT"`
3. PR 생성 → 코드리뷰

---

#### ✅ 끝나면 체크

* [ ] Google Cloud OAuth 동작 확인
* [ ] `users` 테이블 자동/수동 생성 확인
* [ ] JWT 검증 & 만료 시 401 반환
* [ ] 프런트 리다이렉트 후 토큰 저장·로그아웃 동작
* [ ] `.env.example` 최신화

필요한 부분 있으면 바로 말해 주세요—스니펫이나 상세 가이드 추가해 드릴게요!
