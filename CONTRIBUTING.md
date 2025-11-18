# 🤝 기여 가이드 (Contributing Guide)

> Git Factory 프로젝트에 기여해주셔서 감사합니다! 

이 문서는 프로젝트에 기여하는 방법을 안내합니다.

## 📋 목차

- [시작하기 전에](#-시작하기-전에)
- [기여 방법](#-기여-방법)
- [개발 환경 설정](#-개발-환경-설정)
- [코딩 컨벤션](#-코딩-컨벤션)
- [PR 가이드라인](#-pr-가이드라인)
- [이슈 작성 가이드](#-이슈-작성-가이드)
- [코드 리뷰 프로세스](#-코드-리뷰-프로세스)

## 📖 시작하기 전에

### 행동 강령 (Code of Conduct)

이 프로젝트는 학습을 목적으로 하며, 모든 기여자는 서로를 존중해야 합니다.

- ✅ 건설적인 피드백 환영
- ✅ 다양한 의견 존중
- ✅ 초보자 친화적인 태도
- ❌ 공격적이거나 모욕적인 언행 금지
- ❌ 스팸이나 광고성 콘텐츠 금지

### 기여 가능한 영역

1. **학습 자료 추가**
   - 새로운 튜토리얼 작성
   - 예제 코드 추가
   - 학습 가이드 개선

2. **코드 개선**
   - 버그 수정
   - 성능 최적화
   - 리팩토링

3. **문서화**
   - README 개선
   - API 문서 작성
   - 주석 추가

4. **테스트**
   - 단위 테스트 작성
   - 통합 테스트 추가
   - 테스트 커버리지 향상

5. **MSA 아키텍처**
   - 마이크로서비스 예제 추가
   - 아키텍처 패턴 구현
   - 인프라 설정

## 🚀 기여 방법

### 1. Fork & Clone

```bash
# 1. GitHub에서 이 저장소를 Fork

# 2. Fork한 저장소를 로컬에 Clone
git clone https://github.com/YOUR_USERNAME/git-factory.git
cd git-factory

# 3. Upstream 원격 저장소 추가
git remote add upstream https://github.com/hwan0050/git-factory.git
```

### 2. 브랜치 생성

```bash
# develop 브랜치에서 최신 코드 가져오기
git checkout develop
git pull upstream develop

# 새 브랜치 생성
git checkout -b feature/your-feature-name
```

**브랜치 네이밍 규칙:**
```
feature/    - 새로운 기능 추가
fix/        - 버그 수정
docs/       - 문서 작업
refactor/   - 코드 리팩토링
test/       - 테스트 추가/수정
```

**예시:**
```bash
git checkout -b feature/java-jwt-authentication
git checkout -b docs/update-msa-guide
git checkout -b fix/react-state-bug
```

### 3. 작업 및 커밋

```bash
# 변경사항 추가
git add .

# 커밋 (Conventional Commits 규칙 준수)
git commit -m "feat(java): Add JWT authentication service"

# 여러 번 커밋 가능
git commit -m "test(java): Add JWT service unit tests"
git commit -m "docs(java): Update authentication guide"
```

**커밋 메시지 규칙:** [Git Workflow 문서](docs/GIT_WORKFLOW.md#-커밋-메시지-규칙) 참조

### 4. Push 및 PR 생성

```bash
# Fork한 저장소에 Push
git push origin feature/your-feature-name
```

GitHub에서 Pull Request 생성:
1. 저장소 페이지에서 "Pull requests" 탭 클릭
2. "New pull request" 버튼 클릭
3. base: `develop` ← compare: `feature/your-feature-name`
4. PR 템플릿에 따라 내용 작성
5. "Create pull request" 버튼 클릭

## 💻 개발 환경 설정

### 필수 도구

```bash
# Node.js (v20 이상)
node --version

# Java (17 이상)
java --version

# Python (3.11 이상)
python --version

# Docker (선택사항)
docker --version

# Git
git --version
```

### 프로젝트 초기 설정

#### Frontend (React/Next.js)

```bash
cd practices/react
npm install

# 또는 특정 프로젝트
cd microservices/frontend
npm install
npm run dev
```

#### Backend (Java/Spring Boot)

```bash
cd microservices/user-service
./mvnw clean install
./mvnw spring-boot:run
```

#### Backend (Python/FastAPI)

```bash
cd practices/python/fastapi
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload
```

### 코드 품질 도구 설정

#### Java

```bash
# Checkstyle (코드 스타일 검사)
./mvnw checkstyle:check

# SpotBugs (버그 찾기)
./mvnw spotbugs:check

# JUnit (테스트)
./mvnw test
```

#### Python

```bash
# Black (코드 포맷터)
pip install black
black .

# Flake8 (린터)
pip install flake8
flake8 .

# pytest (테스트)
pip install pytest
pytest
```

#### JavaScript/TypeScript

```bash
# ESLint (린터)
npm run lint

# Prettier (포맷터)
npm run format

# TypeScript 타입 체크
npm run type-check

# 테스트
npm test
```

## 📝 코딩 컨벤션

### Java

```java
// ✅ 좋은 예시
public class UserService {
    private final UserRepository userRepository;
    
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }
    
    /**
     * 사용자 ID로 사용자 정보를 조회합니다.
     *
     * @param userId 사용자 ID
     * @return 사용자 정보
     * @throws UserNotFoundException 사용자를 찾을 수 없을 때
     */
    public User findById(Long userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException(userId));
    }
}

// ❌ 나쁜 예시
public class userservice {
    public User find(Long id) {
        return repo.findById(id).get();  // 예외 처리 없음
    }
}
```

**Java 컨벤션:**
- 클래스명: PascalCase
- 메서드/변수명: camelCase
- 상수: UPPER_SNAKE_CASE
- JavaDoc 주석 작성
- Optional 사용 권장

### Python

```python
# ✅ 좋은 예시
from typing import Optional
from fastapi import HTTPException

class UserService:
    """사용자 관련 비즈니스 로직을 처리하는 서비스 클래스"""
    
    def __init__(self, repository: UserRepository):
        self.repository = repository
    
    async def find_by_id(self, user_id: int) -> User:
        """
        사용자 ID로 사용자 정보를 조회합니다.
        
        Args:
            user_id: 사용자 ID
            
        Returns:
            User: 사용자 정보
            
        Raises:
            HTTPException: 사용자를 찾을 수 없을 때
        """
        user = await self.repository.find_by_id(user_id)
        if not user:
            raise HTTPException(status_code=404, detail="User not found")
        return user

# ❌ 나쁜 예시
def findUser(id):
    return db.get(id)  # 타입 힌트 없음, 예외 처리 없음
```

**Python 컨벤션:**
- 함수/변수명: snake_case
- 클래스명: PascalCase
- 상수: UPPER_SNAKE_CASE
- Type hints 사용
- Docstring 작성 (Google Style)

### TypeScript/React

```typescript
// ✅ 좋은 예시
import { FC, useState } from 'react';

interface UserProfileProps {
  userId: string;
  onUpdate?: (user: User) => void;
}

/**
 * 사용자 프로필 컴포넌트
 */
export const UserProfile: FC<UserProfileProps> = ({ userId, onUpdate }) => {
  const [user, setUser] = useState<User | null>(null);
  
  const handleUpdate = async () => {
    try {
      const updatedUser = await updateUser(userId);
      setUser(updatedUser);
      onUpdate?.(updatedUser);
    } catch (error) {
      console.error('Failed to update user:', error);
    }
  };
  
  return (
    <div className="user-profile">
      {/* JSX */}
    </div>
  );
};

// ❌ 나쁜 예시
function userprofile(props) {
  const [user, setUser] = useState();  // 타입 없음
  
  return <div>{user.name}</div>;  // null 체크 없음
}
```

**TypeScript/React 컨벤션:**
- 컴포넌트명: PascalCase
- 함수/변수명: camelCase
- 상수: UPPER_SNAKE_CASE
- Props 인터페이스 정의
- JSDoc 주석 작성

## 📮 PR 가이드라인

### PR 체크리스트

PR을 생성하기 전에 다음 사항을 확인하세요:

- [ ] `develop` 브랜치에서 최신 코드로 rebase 완료
- [ ] 모든 테스트 통과
- [ ] 코드 린트 통과
- [ ] 커밋 메시지가 Conventional Commits 규칙 준수
- [ ] 변경사항에 대한 문서 업데이트
- [ ] 새로운 기능에 대한 테스트 추가
- [ ] Breaking change가 있다면 명시

### PR 템플릿

```markdown
## 📝 변경 사항 요약
<!-- 무엇을 변경했는지 간략하게 설명 -->

Spring Boot 기반 JWT 인증 서비스를 추가했습니다.

## 🎯 작업 내용
<!-- 상세한 작업 내용 -->

- [x] JWT 토큰 생성 로직 구현
- [x] JWT 토큰 검증 로직 구현
- [x] Spring Security 설정
- [x] 인증 관련 예외 처리
- [x] 단위 테스트 작성 (커버리지 90% 이상)

## 🔍 테스트 방법
<!-- 리뷰어가 테스트할 수 있는 방법 -->

1. 애플리케이션 실행: `./mvnw spring-boot:run`
2. 로그인 요청: `POST /api/auth/login`
3. 응답 JWT 토큰 확인
4. 보호된 엔드포인트에 토큰으로 접근

## 📸 스크린샷
<!-- UI 변경이 있는 경우 -->

![JWT Response](screenshots/jwt-response.png)

## 🔗 관련 이슈
<!-- 관련 이슈 번호 -->

Closes #42

## ⚠️ 주의사항
<!-- 특별히 확인이 필요한 사항 -->

- `application.yml`에 JWT secret key 설정 필요
- Redis 서버 실행 필요 (토큰 블랙리스트 관리)

## 📚 참고 자료
<!-- 관련 문서나 링크 -->

- [JWT 공식 문서](https://jwt.io)
- [Spring Security JWT 가이드](https://docs.spring.io/spring-security/reference/servlet/oauth2/resource-server/jwt.html)
```

### PR 크기

- **작은 PR 권장**: 200-400줄 이하
- **큰 PR은 분리**: 여러 개의 작은 PR로 나누기
- **단일 목적**: 하나의 PR은 하나의 기능/수정

## 🐛 이슈 작성 가이드

### 버그 리포트

```markdown
## 🐛 버그 설명
<!-- 버그에 대한 명확한 설명 -->

JWT 토큰 만료 시간이 설정한 것보다 짧게 적용됩니다.

## 📋 재현 방법
<!-- 버그를 재현하는 단계 -->

1. 로그인하여 JWT 토큰 발급
2. `application.yml`에서 만료 시간을 3600초로 설정
3. 실제로는 1800초 후에 만료됨

## 🔍 예상 동작
<!-- 어떻게 동작해야 하는지 -->

3600초 후에 토큰이 만료되어야 합니다.

## 🖥 환경
<!-- 실행 환경 정보 -->

- OS: macOS Sonoma 14.2
- Java: 17.0.9
- Spring Boot: 3.2.0
- Browser: Chrome 120.0

## 📎 추가 정보
<!-- 스크린샷, 로그 등 -->

```

### 기능 제안

```markdown
## 💡 기능 제안
<!-- 제안하고 싶은 기능 설명 -->

소셜 로그인 (Google, GitHub) 기능을 추가했으면 좋겠습니다.

## 🎯 동기
<!-- 왜 이 기능이 필요한지 -->

현재 이메일/패스워드 로그인만 지원하는데, 소셜 로그인을 추가하면
사용자 경험이 개선될 것 같습니다.

## 📋 제안 사항
<!-- 구체적인 제안 -->

- OAuth 2.0 프로토콜 사용
- Spring Security OAuth2 Client 활용
- Google, GitHub 로그인 우선 지원

## 📚 참고 자료
<!-- 관련 문서나 예시 -->

- [Spring Security OAuth2](https://spring.io/guides/tutorials/spring-boot-oauth2/)
```

## 👀 코드 리뷰 프로세스

### 리뷰어로서

1. **코드 이해**: 변경 사항의 목적을 파악
2. **기능 확인**: 요구사항을 충족하는지 확인
3. **품질 검토**: 코드 품질, 테스트, 문서화 확인
4. **건설적 피드백**: 구체적이고 도움이 되는 코멘트 작성

**리뷰 코멘트 작성 팁:**

```markdown
# ✅ 좋은 코멘트
💡 Suggestion: Optional을 사용하면 null 체크를 더 명확하게 할 수 있을 것 같습니다.

```java
return userRepository.findById(userId)
        .orElseThrow(() -> new UserNotFoundException(userId));
```

# ❌ 나쁜 코멘트
이거 왜 이렇게 했어요? 다시 짜세요.
```

### 기여자로서

1. **리뷰 요청**: PR 생성 후 리뷰어 지정
2. **피드백 수용**: 건설적인 피드백에 감사하고 반영
3. **질문하기**: 이해되지 않는 부분은 질문
4. **수정 반영**: 요청된 수정사항 반영 후 재요청

## ❓ 질문이나 도움이 필요하신가요?

- 💬 [GitHub Discussions](https://github.com/hwan0050/git-factory/discussions) 활용
- 📧 이메일: akma0050@naver.com
- 📝 [이슈](https://github.com/hwan0050/git-factory/issues) 생성

## 🙏 감사합니다

Git Factory 프로젝트에 기여해주셔서 감사합니다! 
여러분의 참여가 이 프로젝트를 더 좋게 만듭니다. 🎉

---

**Happy Learning & Contributing! 🚀**
