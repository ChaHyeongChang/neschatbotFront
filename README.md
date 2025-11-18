# AR/VR 개발 챗봇 (Frontend)

이 레포는 **HF-WSL2에서 파인튜닝한 Llama 3.1 기반 모델**을 위한  
프론트엔드 UI입니다. 언리얼, 유니티, AR/VR 관련 질문을 한국어로 대화형으로
도와주는 챗봇을 목표로 합니다.

> 이 프로젝트의 초기 UI 템플릿은 Google AI Studio에서 생성한
> React/Vite 예제를 기반으로 합니다.

---

## 1. 역할

- 이 프로젝트는 **프론트엔드만** 포함합니다.
- 백엔드(모델 서빙)는 **WSL2 + FastAPI + LoRA 어댑터**로
  별도 레포/폴더에서 관리할 예정입니다.
- FastAPI의 `/chat` 엔드포인트와 연동되어 동작합니다.

---

## 2. 기술 스택

- **Framework**: React + TypeScript  
- **Bundler**: Vite  
- **UI 스타일**: Tailwind 기반 (AI Studio 템플릿)  
- **배포 대상**: 브라우저 (회사/집 PC에서 접속)

---

## 3. 주요 기능 (프론트 기준)

- 전체 화면 1:1 챗 UI
  - 상단 헤더: `Unreal · Unity · AR/VR 개발 챗봇`
  - 첫 화면 웰컴 배너:
    - `안녕하세요!`
    - `Unreal · Unity · AR/VR 개발 챗봇입니다.`
- 입력창 placeholder:
  - `언리얼/유니티 AR·VR 개발 관련 질문을 입력하세요 (예: Unity C# WASD 이동, 언리얼 라인 트레이스)`
- `New Chat` 버튼
  - 화면의 대화 메시지를 초기화하는 역할  
    (대화 **세션 저장 기능은 추후 도입 예정**)

---

## 4. 폴더 구조 (요약)

```text
src/
  App.tsx                  # 메인 엔트리, 헤더 + ChatView
  types.ts                 # Message, MessageRole 타입 정의
  components/
    ChatView.tsx           # 대화 화면 + WelcomeScreen
    ChatInput.tsx          # 입력창 + 전송 버튼
    ChatMessage.tsx        # 개별 말풍선 UI
  services/
    mockGeminiService.ts   # 실제로는 FastAPI /chat을 호출하는 "전화기" 역할
```
