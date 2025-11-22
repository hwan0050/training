# 🔄 Git 워크플로우 실습 가이드

## 📅 작업 정보
- **작업자**: Hwan Lee
- **작업 날짜**: 2024-11-22
- **작업 브랜치**: feature/git-workflow-practice
- **학습 시간**: 예상 1.5시간

## 🎯 학습 목표

실제 프로젝트에서 발생하는 다양한 Git 상황을 직접 경험하고 해결 방법 익히기:

1. ✅ 브랜치 전략 이해 및 실습
2. ✅ Conflict 발생 및 해결
3. ✅ Rebase vs Merge 비교
4. ✅ Cherry-pick 활용
5. ✅ Reset과 Revert 차이

---

## 📂 브랜치 전략

### Git Flow 브랜치 구조

```
main (production)
  ↓
develop (development)
  ↓
├── feature/new-feature     # 새 기능 개발
├── feature/another-feature # 다른 기능
├── bugfix/fix-bug         # 버그 수정
└── hotfix/urgent-fix      # 긴급 수정 (main에서 분기)
```

### 브랜치 종류

#### 1. main (또는 master)
- **역할**: 프로덕션 배포 브랜치
- **특징**: 항상 배포 가능한 안정된 상태
- **머지**: hotfix, release만 직접 머지

#### 2. develop
- **역할**: 다음 릴리스 준비 브랜치
- **특징**: 최신 개발 내용 통합
- **머지**: feature, bugfix 브랜치 머지

#### 3. feature/기능명
- **역할**: 새 기능 개발
- **분기**: develop에서 분기
- **머지**: develop으로 머지
- **명명**: `feature/user-authentication`, `feature/add-payment`

#### 4. bugfix/버그명
- **역할**: 버그 수정
- **분기**: develop에서 분기
- **머지**: develop으로 머지
- **명명**: `bugfix/fix-login-error`, `bugfix/correct-validation`

#### 5. hotfix/긴급수정명
- **역할**: 프로덕션 긴급 수정
- **분기**: main에서 분기
- **머지**: main과 develop 둘 다 머지
- **명명**: `hotfix/security-patch`, `hotfix/critical-bug`

#### 6. release/버전
- **역할**: 릴리스 준비
- **분기**: develop에서 분기
- **머지**: main과 develop으로 머지
- **명명**: `release/v1.0.0`, `release/v2.1.0`

---

## 🔧 실습 1: Feature 브랜치 워크플로우

### 시나리오: 새로운 기능 추가

```bash
# 1. develop에서 feature 브랜치 생성
git checkout develop
git checkout -b feature/add-user-profile

# 2. 작업 진행
echo "User Profile Feature" > user-profile.txt
git add user-profile.txt
git commit -m "feat: Add user profile feature"

# 3. develop으로 머지
git checkout develop
git merge feature/add-user-profile

# 4. 브랜치 삭제
git branch -d feature/add-user-profile
```

### 베스트 프랙티스

✅ **DO:**
- 기능별로 브랜치 분리
- 작은 단위로 자주 커밋
- 의미 있는 커밋 메시지
- PR을 통한 코드 리뷰

❌ **DON'T:**
- 한 브랜치에 여러 기능
- 거대한 커밋
- 모호한 커밋 메시지
- develop에 직접 커밋

---

## ⚔️ 실습 2: Conflict 해결

### Conflict가 발생하는 경우

두 브랜치가 같은 파일의 같은 부분을 수정했을 때!

```
main: README.md 1-5줄 수정
  ↓
feature: README.md 3-7줄 수정
  ↓
Merge 시도 → CONFLICT!
```

### Conflict 해결 실습

**1단계: Conflict 생성**

```bash
# develop 브랜치에서 파일 수정
git checkout develop
echo "Version 1.0" > version.txt
git add version.txt
git commit -m "docs: Update version to 1.0"

# feature 브랜치 생성 및 같은 파일 수정
git checkout -b feature/update-version
echo "Version 2.0" > version.txt
git add version.txt
git commit -m "docs: Update version to 2.0"

# develop에서 다시 수정
git checkout develop
echo "Version 1.5" > version.txt
git add version.txt
git commit -m "docs: Update version to 1.5"

# 머지 시도 → CONFLICT!
git merge feature/update-version
```

**2단계: Conflict 확인**

```bash
git status
# 충돌 파일 확인

cat version.txt
# <<<<<<< HEAD
# Version 1.5
# =======
# Version 2.0
# >>>>>>> feature/update-version
```

**3단계: Conflict 해결**

```bash
# 1. 파일 열어서 수동 수정
# <<<<<<< HEAD
# =======
# >>>>>>> 
# 이런 마커들 제거하고 원하는 내용으로 수정

# 2. 해결 후 커밋
git add version.txt
git commit -m "merge: Resolve version conflict"
```

### Conflict 해결 전략

#### 1. Accept Current (HEAD)
현재 브랜치 내용 선택

#### 2. Accept Incoming
머지하려는 브랜치 내용 선택

#### 3. Accept Both
둘 다 포함

#### 4. Manual Merge
직접 수정해서 결합

---

## 🔀 실습 3: Merge vs Rebase

### Merge

**특징:**
- 브랜치 히스토리 보존
- 머지 커밋 생성
- 안전하고 명확

**사용 시기:**
- 팀 협업
- 공개 브랜치
- 히스토리 보존 필요

```bash
git checkout develop
git merge feature/new-feature
```

**결과:**
```
* Merge commit
|\
| * Feature commit 2
| * Feature commit 1
* | Develop commit
|/
* Previous commit
```

### Rebase

**특징:**
- 선형 히스토리
- 머지 커밋 없음
- 깔끔한 히스토리

**사용 시기:**
- 개인 브랜치
- 히스토리 정리
- 로컬 작업

```bash
git checkout feature/new-feature
git rebase develop
```

**결과:**
```
* Feature commit 2 (rebased)
* Feature commit 1 (rebased)
* Develop commit
* Previous commit
```

### 비교표

| 특징 | Merge | Rebase |
|------|-------|--------|
| 히스토리 | 보존 (분기) | 선형 |
| 머지 커밋 | 생성 | 없음 |
| 안전성 | 높음 | 조심 필요 |
| 사용 | 공개 브랜치 | 개인 브랜치 |
| 가독성 | 복잡할 수 있음 | 깔끔 |

### ⚠️ Rebase 주의사항

**절대 하지 말 것:**
- 이미 push한 공개 브랜치를 rebase
- 다른 사람과 공유 중인 브랜치를 rebase

**이유:** 히스토리가 변경되어 다른 사람의 작업과 충돌!

---

## 🍒 실습 4: Cherry-pick

### Cherry-pick이란?

특정 커밋만 선택해서 다른 브랜치로 가져오기

### 사용 시나리오

**예시:** feature 브랜치의 버그 수정만 급하게 develop에 적용

```bash
# 1. 가져올 커밋 확인
git log feature/bug-fix --oneline
# abc1234 fix: Critical bug fix
# def5678 feat: New feature

# 2. develop으로 이동
git checkout develop

# 3. 특정 커밋만 가져오기
git cherry-pick abc1234

# 4. 충돌 발생 시 해결
git add .
git cherry-pick --continue

# 5. 취소하려면
git cherry-pick --abort
```

### Cherry-pick vs Merge

| 상황 | 사용 |
|------|------|
| 전체 브랜치 통합 | Merge |
| 특정 커밋만 필요 | Cherry-pick |
| 핫픽스 적용 | Cherry-pick |
| 릴리스 준비 | Merge |

---

## ⏪ 실습 5: Reset vs Revert

### Reset - "되돌리기"

**커밋 자체를 없애기 (히스토리 변경)**

```bash
# 1. Soft Reset - 커밋만 취소, 변경사항 유지
git reset --soft HEAD~1

# 2. Mixed Reset - 커밋 + Staging 취소 (기본값)
git reset HEAD~1
git reset --mixed HEAD~1

# 3. Hard Reset - 모든 변경사항 완전 삭제
git reset --hard HEAD~1
```

**사용 시기:**
- 아직 push 안 한 로컬 커밋
- 개인 브랜치
- 실수한 커밋 제거

**주의:** 이미 push한 커밋은 reset 금지!

### Revert - "되돌리는 새 커밋"

**기존 커밋을 취소하는 새 커밋 생성 (히스토리 보존)**

```bash
# 특정 커밋을 되돌리는 새 커밋 생성
git revert abc1234

# 머지 커밋 되돌리기
git revert -m 1 abc1234
```

**사용 시기:**
- 이미 push한 커밋
- 공개 브랜치
- 히스토리 보존 필요

### 비교표

| 특징 | Reset | Revert |
|------|-------|--------|
| 히스토리 | 변경 | 보존 |
| 새 커밋 | 없음 | 생성 |
| 사용 범위 | 로컬 | 공개 브랜치 |
| 안전성 | 위험 | 안전 |

---

## 🛠️ 유용한 Git 명령어

### 로그 확인

```bash
# 한 줄로 보기
git log --oneline

# 그래프로 보기
git log --graph --oneline --all

# 특정 파일 히스토리
git log -- filename.txt

# 특정 기간
git log --since="2024-11-01" --until="2024-11-22"
```

### 변경사항 확인

```bash
# 현재 변경사항
git diff

# Staged 변경사항
git diff --staged

# 브랜치 간 차이
git diff develop..feature/new-feature

# 특정 파일만
git diff filename.txt
```

### Stash (임시 저장)

```bash
# 현재 작업 임시 저장
git stash

# 메시지와 함께 저장
git stash save "WIP: Working on feature"

# Stash 목록
git stash list

# Stash 복원
git stash pop

# 특정 stash 복원
git stash apply stash@{0}

# Stash 삭제
git stash drop stash@{0}

# 모든 stash 삭제
git stash clear
```

### 브랜치 관리

```bash
# 모든 브랜치 보기
git branch -a

# 원격 브랜치 포함
git branch -r

# 머지된 브랜치 확인
git branch --merged

# 머지 안 된 브랜치
git branch --no-merged

# 브랜치 삭제
git branch -d branch-name

# 강제 삭제
git branch -D branch-name

# 원격 브랜치 삭제
git push origin --delete branch-name
```

---

## 🎯 실전 시나리오

### 시나리오 1: 긴급 버그 수정

```bash
# 1. main에서 hotfix 브랜치 생성
git checkout main
git checkout -b hotfix/critical-bug

# 2. 버그 수정
# ... 파일 수정 ...
git add .
git commit -m "fix: Fix critical security bug"

# 3. main에 머지
git checkout main
git merge hotfix/critical-bug
git tag v1.0.1

# 4. develop에도 머지
git checkout develop
git merge hotfix/critical-bug

# 5. hotfix 브랜치 삭제
git branch -d hotfix/critical-bug
```

### 시나리오 2: Feature 개발 중 develop 업데이트

```bash
# feature 작업 중...
git checkout feature/new-feature

# develop에 새 변경사항 생겼을 때
# 옵션 1: Merge
git merge develop

# 옵션 2: Rebase (개인 브랜치만!)
git rebase develop
```

### 시나리오 3: 잘못된 커밋 수정

```bash
# 마지막 커밋 메시지 수정
git commit --amend -m "fix: Correct commit message"

# 마지막 커밋에 파일 추가
git add forgotten-file.txt
git commit --amend --no-edit

# 여러 커밋 전 수정 (interactive rebase)
git rebase -i HEAD~3
```

---

## 📊 Git 워크플로우 체크리스트

### 새 기능 개발 시

- [ ] develop에서 feature 브랜치 생성
- [ ] 기능 개발 및 커밋
- [ ] develop 최신화 확인
- [ ] Conflict 해결 (필요시)
- [ ] PR 생성 및 리뷰
- [ ] develop에 머지
- [ ] feature 브랜치 삭제

### 버그 수정 시

- [ ] develop에서 bugfix 브랜치 생성
- [ ] 버그 수정 및 테스트
- [ ] develop에 머지
- [ ] bugfix 브랜치 삭제

### 긴급 수정 시

- [ ] main에서 hotfix 브랜치 생성
- [ ] 긴급 수정
- [ ] main에 머지 및 태그
- [ ] develop에도 머지
- [ ] hotfix 브랜치 삭제

---

## 💡 Git 베스트 프랙티스

### 커밋

✅ **DO:**
- 의미 있는 단위로 커밋
- Conventional Commits 형식 사용
- 커밋 메시지는 현재형 동사로
- 한 커밋에는 한 가지 변경사항

❌ **DON'T:**
- 너무 큰 커밋
- "WIP", "fix" 같은 모호한 메시지
- 관련 없는 변경사항 혼합
- 실행 안 되는 상태로 커밋

### 브랜치

✅ **DO:**
- 명확한 브랜치명 사용
- 작은 단위로 브랜치 분리
- 정기적으로 develop과 동기화
- 머지 후 브랜치 삭제

❌ **DON'T:**
- 장기간 머지 안 하기
- 브랜치명 중복
- 너무 많은 브랜치 유지
- main에 직접 커밋

### 협업

✅ **DO:**
- PR을 통한 코드 리뷰
- 충돌은 즉시 해결
- 팀 컨벤션 준수
- 정기적으로 push

❌ **DON'T:**
- force push (공개 브랜치)
- 히스토리 변경 (공개 브랜치)
- 리뷰 없이 머지
- 로컬에만 보관

---

## 🔍 트러블슈팅

### 문제 1: "rejected - non-fast-forward"

**원인:** 원격에 새 커밋이 있는데 push 시도

**해결:**
```bash
git pull --rebase origin develop
git push origin develop
```

### 문제 2: Conflict 해결 중 혼란

**해결:**
```bash
# 머지/리베이스 취소
git merge --abort
git rebase --abort

# 처음부터 다시 시도
```

### 문제 3: 실수로 파일 삭제

**해결:**
```bash
# 특정 파일 복원
git checkout HEAD -- filename.txt

# 모든 변경사항 취소
git reset --hard HEAD
```

### 문제 4: 잘못된 브랜치에 커밋

**해결:**
```bash
# 1. 올바른 브랜치로 이동
git checkout correct-branch

# 2. 잘못된 브랜치의 커밋 가져오기
git cherry-pick commit-hash

# 3. 잘못된 브랜치에서 커밋 제거
git checkout wrong-branch
git reset --hard HEAD~1
```

---

## ✅ 학습 완료 체크리스트

### 브랜치 전략
- [ ] Feature 브랜치 생성 및 머지
- [ ] Bugfix 브랜치 사용
- [ ] Hotfix 브랜치 워크플로우 이해

### Conflict 해결
- [ ] Conflict 발생시켜보기
- [ ] 수동으로 Conflict 해결
- [ ] Merge tool 사용

### Merge vs Rebase
- [ ] Merge 실습
- [ ] Rebase 실습
- [ ] 차이점 이해

### 고급 기능
- [ ] Cherry-pick 사용
- [ ] Reset vs Revert 차이
- [ ] Stash 활용

---

## 📚 참고 자료

### 공식 문서
- [Git Documentation](https://git-scm.com/doc)
- [GitHub Flow](https://guides.github.com/introduction/flow/)
- [Git Flow](https://nvie.com/posts/a-successful-git-branching-model/)

### 추천 자료
- [Learn Git Branching](https://learngitbranching.js.org/) - 인터랙티브 학습
- [Oh Shit, Git!?!](https://ohshitgit.com/) - 트러블슈팅

---

## 💭 회고

### 배운 점
- Git 워크플로우의 중요성
- Conflict 해결 방법
- 상황별 적절한 명령어 사용

### 다음 목표
- 실제 프로젝트에 적용
- 팀 협업 경험
- CI/CD와 Git 통합

---

**작성일**: 2024-11-22  
**문서 버전**: 1.0  
**학습 상태**: 진행 중
