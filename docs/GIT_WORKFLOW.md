# 🔄 Git 작업 정책 (Git Workflow)

> Git Factory 프로젝트의 체계적인 Git 작업 가이드

## 📋 목차

- [브랜치 전략](#-브랜치-전략)
- [커밋 메시지 규칙](#-커밋-메시지-규칙)
- [Pull Request 가이드](#-pull-request-가이드)
- [코드 리뷰](#-코드-리뷰)
- [실전 예시](#-실전-예시)

## 🌿 브랜치 전략

### Git Flow 기반 전략

```
main
  └── develop
       ├── feature/java-spring-basic
       ├── feature/react-hooks-study
       ├── feature/msa-api-gateway
       ├── fix/typo-documentation
       └── hotfix/critical-bug
```

### 브랜치 종류

#### 1. `main` 브랜치
- **목적**: 프로덕션 배포 가능한 안정 버전
- **특징**: 항상 배포 가능한 상태 유지
- **보호**: Direct push 금지, PR을 통해서만 병합
- **태그**: 버전 릴리스 시 태그 생성 (`v1.0.0`, `v1.1.0`)

#### 2. `develop` 브랜치
- **목적**: 다음 릴리스를 위한 개발 브랜치
- **특징**: 최신 개발 내용 통합
- **병합**: feature, fix 브랜치가 여기로 병합됨

#### 3. `feature/*` 브랜치
- **목적**: 새로운 기능 개발
- **생성 기준**: develop 브랜치에서 분기
- **네이밍**:
  ```
  feature/java-authentication
  feature/react-form-validation
  feature/nextjs-ssr-optimization
  feature/python-fastapi-crud
  ```
- **작업 완료**: develop으로 병합 후 삭제

#### 4. `fix/*` 브랜치
- **목적**: 버그 수정
- **생성 기준**: develop 브랜치에서 분기
- **네이밍**:
  ```
  fix/login-validation-error
  fix/typo-in-documentation
  fix/null-pointer-exception
  ```

#### 5. `hotfix/*` 브랜치
- **목적**: 긴급 프로덕션 버그 수정
- **생성 기준**: main 브랜치에서 분기
- **특징**: main과 develop 양쪽에 병합
- **네이밍**:
  ```
  hotfix/security-vulnerability
  hotfix/critical-api-error
  ```

#### 6. `docs/*` 브랜치
- **목적**: 문서 작업 전용
- **네이밍**:
  ```
  docs/update-readme
  docs/add-api-guide
  ```

### 브랜치 생성 예시

```bash
# develop에서 새 기능 브랜치 생성
git checkout develop
git pull origin develop
git checkout -b feature/spring-boot-security

# 작업 후 커밋
git add .
git commit -m "feat: Add Spring Security configuration"

# develop에 병합하기 전 최신화
git checkout develop
git pull origin develop
git checkout feature/spring-boot-security
git rebase develop

# Push
git push origin feature/spring-boot-security
```

## 💬 커밋 메시지 규칙

### Conventional Commits 사용

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Type 종류

| Type | 설명 | 예시 |
|------|------|------|
| `feat` | 새로운 기능 추가 | `feat: Add user authentication API` |
| `fix` | 버그 수정 | `fix: Resolve null pointer exception in UserService` |
| `docs` | 문서 수정 | `docs: Update README with installation guide` |
| `style` | 코드 포맷팅 (기능 변경 없음) | `style: Format Java code with Prettier` |
| `refactor` | 코드 리팩토링 | `refactor: Simplify user validation logic` |
| `test` | 테스트 코드 추가/수정 | `test: Add unit tests for AuthService` |
| `chore` | 빌드, 설정 변경 | `chore: Update Maven dependencies` |
| `perf` | 성능 개선 | `perf: Optimize database query performance` |
| `ci` | CI/CD 관련 | `ci: Add GitHub Actions workflow` |

### 커밋 메시지 작성 규칙

#### ✅ 좋은 예시

```bash
# 기본 형식
git commit -m "feat: Add Spring Boot user registration endpoint"

# Scope 포함
git commit -m "feat(auth): Implement JWT token generation"

# Body와 Footer 포함
git commit -m "feat(user): Add email verification feature

- Send verification email on user registration
- Add email verification token to database
- Create verification endpoint

Closes #42"

# Breaking Change
git commit -m "feat(api): Change authentication API structure

BREAKING CHANGE: Authentication endpoint moved from /auth to /api/v1/auth"
```

#### ❌ 나쁜 예시

```bash
git commit -m "update"
git commit -m "fix bug"
git commit -m "asdf"
git commit -m "여러 기능 추가함"
git commit -m "코드 수정"
```

### 커밋 메시지 작성 팁

1. **제목은 50자 이내로** 간결하게
2. **제목은 명령형으로** (Add, Fix, Update)
3. **본문은 72자마다 줄바꿈**
4. **무엇을 왜 변경했는지 설명**
5. **관련 이슈는 Footer에 명시**

### 언어별 커밋 예시

```bash
# Java/Spring Boot
git commit -m "feat(spring): Add Spring Data JPA repository"
git commit -m "refactor(service): Extract business logic to service layer"
git commit -m "test(controller): Add RestController integration tests"

# Python/FastAPI
git commit -m "feat(fastapi): Create user CRUD endpoints"
git commit -m "fix(model): Fix SQLAlchemy relationship mapping"

# React/TypeScript
git commit -m "feat(react): Implement custom useAuth hook"
git commit -m "style(component): Update Button component styling"
git commit -m "refactor(types): Improve TypeScript type definitions"

# Next.js
git commit -m "feat(nextjs): Add server-side rendering for user profile"
git commit -m "perf(nextjs): Optimize image loading with next/image"
```

## 🔀 Pull Request 가이드

### PR 생성 전 체크리스트

- [ ] 최신 develop 브랜치로 rebase 완료
- [ ] 모든 테스트 통과 확인
- [ ] 코드 린트 통과
- [ ] 변경 사항 문서화 완료
- [ ] 충돌(Conflict) 해결 완료

### PR 제목 형식

```
[Type] 간결한 제목 설명
```

**예시:**
```
[Feature] Spring Boot user authentication service
[Fix] TypeScript type error in React component
[Docs] Update MSA architecture guide
```

### PR 설명 템플릿

```markdown
## 📝 변경 사항 요약
<!-- 이 PR에서 무엇을 변경했는지 간략히 설명 -->

## 🎯 작업 내용
<!-- 상세한 작업 내용을 나열 -->
- [ ] Spring Security 설정 추가
- [ ] JWT 토큰 생성/검증 로직 구현
- [ ] 사용자 인증 테스트 작성

## 🔍 테스트 방법
<!-- 리뷰어가 테스트할 수 있는 방법 -->
1. 애플리케이션 실행
2. POST /api/auth/login 엔드포인트 호출
3. 응답으로 JWT 토큰 확인

## 📸 스크린샷
<!-- UI 변경이 있는 경우 스크린샷 첨부 -->

## 🔗 관련 이슈
<!-- 관련된 이슈 번호 -->
Closes #42
Related to #38

## ⚠️ 주의사항
<!-- 리뷰어가 특별히 확인해야 할 사항 -->
- application.yml에 JWT secret key 설정 필요
- Redis 서버 실행 필요

## ✅ 체크리스트
- [ ] 코드 린트 통과
- [ ] 단위 테스트 통과
- [ ] 문서 업데이트 완료
- [ ] Breaking change 없음
```

### PR 병합 규칙

1. **최소 1명 이상의 Approve** 필요
2. **모든 테스트 통과** 확인
3. **Conflict 없음** 확인
4. **Squash and Merge** 사용 (커밋 히스토리 정리)

## 👀 코드 리뷰

### 리뷰어 가이드

#### 확인 사항

1. **코드 품질**
   - 가독성이 좋은가?
   - SOLID 원칙을 따르는가?
   - 중복 코드는 없는가?

2. **기능 구현**
   - 요구사항을 충족하는가?
   - 엣지 케이스를 고려했는가?
   - 예외 처리가 적절한가?

3. **테스트**
   - 테스트 커버리지가 충분한가?
   - 통합 테스트가 필요한가?

4. **성능**
   - 성능 이슈는 없는가?
   - 불필요한 API 호출은 없는가?

5. **보안**
   - 보안 취약점은 없는가?
   - 민감 정보가 노출되지 않는가?

### 리뷰 코멘트 작성 팁

#### ✅ 좋은 예시

```markdown
# 명확한 제안
💡 Suggestion: 이 부분은 Optional을 사용하면 null 체크를 더 깔끔하게 할 수 있을 것 같습니다.

# 질문 형식
❓ Question: 이 로직이 필요한 이유가 궁금합니다. 설명 부탁드립니다.

# 칭찬
👍 Great: 예외 처리가 매우 잘 되어 있네요!

# 중요한 지적
⚠️ Important: 이 부분은 SQL Injection 취약점이 있을 수 있습니다.
```

#### ❌ 나쁜 예시

```markdown
이거 왜 이렇게 했어요?
이 코드는 별로네요.
다시 짜세요.
```

### 리뷰 프로세스

```
1. PR 생성
   ↓
2. 자동 테스트 실행 (CI)
   ↓
3. 리뷰어 지정
   ↓
4. 코드 리뷰 진행
   ↓
5. 수정 요청 또는 Approve
   ↓
6. 수정 반영 (필요시)
   ↓
7. 최종 Approve
   ↓
8. Merge to develop
```

## 💡 실전 예시

### 시나리오 1: 새 기능 개발

```bash
# 1. develop 브랜치에서 시작
git checkout develop
git pull origin develop

# 2. feature 브랜치 생성
git checkout -b feature/react-user-profile

# 3. 작업 및 커밋
git add src/components/UserProfile.tsx
git commit -m "feat(react): Add UserProfile component"

git add src/hooks/useUser.ts
git commit -m "feat(react): Create useUser custom hook"

git add src/pages/profile.tsx
git commit -m "feat(nextjs): Add user profile page"

# 4. 작업 완료 후 push
git push origin feature/react-user-profile

# 5. GitHub에서 PR 생성 (develop ← feature/react-user-profile)

# 6. 리뷰 후 병합
```

### 시나리오 2: 버그 수정

```bash
# 1. develop 브랜치에서 시작
git checkout develop
git pull origin develop

# 2. fix 브랜치 생성
git checkout -b fix/login-validation

# 3. 버그 수정 및 커밋
git add src/services/AuthService.java
git commit -m "fix(auth): Fix email validation regex pattern"

# 4. 테스트 추가
git add src/test/services/AuthServiceTest.java
git commit -m "test(auth): Add email validation test cases"

# 5. Push 및 PR
git push origin fix/login-validation
```

### 시나리오 3: 여러 커밋 정리 (Rebase)

```bash
# 1. 여러 작은 커밋들을 하나로 합치기
git rebase -i HEAD~3

# 2. Editor에서 커밋 정리
# pick abc123 feat: Add component
# squash def456 fix: Fix typo
# squash ghi789 style: Format code

# 3. 커밋 메시지 수정
# feat(react): Add UserProfile component with styling

# 4. Force push (주의!)
git push origin feature/react-user-profile -f
```

### 시나리오 4: Conflict 해결

```bash
# 1. develop 최신화
git checkout develop
git pull origin develop

# 2. feature 브랜치로 이동
git checkout feature/my-feature

# 3. Rebase 시작
git rebase develop

# 4. Conflict 발생 시 해결
# (파일 수정)

# 5. 해결 후 계속
git add .
git rebase --continue

# 6. Push
git push origin feature/my-feature -f
```

## 🎓 추가 학습 자료

### Git 명령어 치트시트

```bash
# 브랜치 관련
git branch                          # 로컬 브랜치 목록
git branch -a                       # 모든 브랜치 목록
git branch -d feature/old-feature   # 브랜치 삭제
git checkout -b feature/new         # 브랜치 생성 및 이동

# 커밋 관련
git commit --amend                  # 마지막 커밋 수정
git reset --soft HEAD~1             # 마지막 커밋 취소 (변경사항 유지)
git reset --hard HEAD~1             # 마지막 커밋 취소 (변경사항 삭제)

# 원격 저장소 관련
git remote -v                       # 원격 저장소 목록
git fetch origin                    # 원격 저장소 변경사항 가져오기
git pull origin develop             # 원격 브랜치 병합
git push origin feature/my-feature  # 브랜치 push

# 기록 확인
git log --oneline --graph           # 커밋 히스토리 (그래프)
git log --author="Hwan"             # 특정 작성자 커밋
git show abc123                     # 특정 커밋 상세 보기

# 임시 저장 (Stash)
git stash                           # 변경사항 임시 저장
git stash list                      # stash 목록
git stash pop                       # 최근 stash 적용 및 삭제
git stash apply stash@{0}           # 특정 stash 적용
```

### 유용한 Git 설정

```bash
# 사용자 정보 설정
git config --global user.name "Hwan Lee"
git config --global user.email "akma0050@naver.com"

# 기본 에디터 설정
git config --global core.editor "vim"

# 별칭 설정
git config --global alias.st status
git config --global alias.co checkout
git config --global alias.br branch
git config --global alias.cm commit
git config --global alias.lg "log --oneline --graph --all"

# 자동 줄바꿈 설정
git config --global core.autocrlf true  # Windows
git config --global core.autocrlf input # Mac/Linux

# Pull 전략 설정
git config --global pull.rebase true
```

## 📚 참고 문서

- [Git 공식 문서](https://git-scm.com/doc)
- [Git Flow](https://nvie.com/posts/a-successful-git-branching-model/)
- [Conventional Commits](https://www.conventionalcommits.org/)
- [GitHub Flow](https://guides.github.com/introduction/flow/)

---

**질문이나 제안사항이 있으시면 Issue를 열어주세요!** 🙌
