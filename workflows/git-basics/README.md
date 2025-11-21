# Git 기초 학습

## 📅 학습 날짜
2024-11-18

## 📚 학습 내용

### Git 기본 명령어
- `git init`: 저장소 초기화
- `git add .`: 모든 변경사항을 스테이징
- `git commit -m "메시지"`: 커밋 생성
- `git push origin 브랜치명`: 원격 저장소에 푸시
- `git pull origin 브랜치명`: 원격 저장소에서 가져오기
- `git branch`: 브랜치 목록 확인
- `git checkout -b 브랜치명`: 새 브랜치 생성 및 이동
- `git status`: 현재 상태 확인

### 브랜치 전략
- `main`: 프로덕션 브랜치 (배포 가능)
- `develop`: 개발 브랜치 (개발 중)
- `feature/*`: 기능 개발 브랜치

### 충돌 해결
- `git checkout --ours 파일명`: 우리 버전 사용
- `git checkout --theirs 파일명`: 상대 버전 사용
- `git add 파일명`: 충돌 해결 완료 표시

## ✅ 실습 완료
- [x] git-factory 저장소 생성
- [x] GitHub에 코드 푸시
- [x] main 브랜치 생성
- [x] develop 브랜치 생성
- [x] merge conflict 해결
- [x] 첫 feature 브랜치 생성

## 💡 배운 점
- Merge conflict는 두 버전이 충돌할 때 발생
- `--ours`로 우리 버전을 선택할 수 있음
- Git 워크플로우를 직접 실습하니 이해가 잘 됨
- 브랜치를 나눠서 작업하면 관리가 편함

## 🎯 다음 학습 목표
- TypeScript 기초 학습
- React 컴포넌트 만들기
- Spring Boot 첫 프로젝트

## 🔗 참고 자료
- [Git 공식 문서](https://git-scm.com/doc)
- [Git 작업 정책](../../docs/GIT_WORKFLOW.md)