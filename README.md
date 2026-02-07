# TypeScript 완전 정복

**기초부터 실전 패턴까지, TypeScript를 체계적으로 학습하는 완성형 강의 자료**

![TypeScript](https://img.shields.io/badge/TypeScript-5.3%2B-3178C6?logo=typescript&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green.svg)
![Node.js](https://img.shields.io/badge/Node.js-18%2B-339933?logo=node.js&logoColor=white)

> **온라인으로 바로 학습하기:** [https://na-degen-girl.github.io/ts_study/](https://na-degen-girl.github.io/ts_study/)

---

## 개요

이 프로젝트는 TypeScript를 처음 접하는 입문자부터 실무 패턴을 익히려는 개발자까지 대상으로 하는 **종합 학습 자료**입니다.

- 12개 챕터의 **슬라이드 강의** (reveal.js 기반, 브라우저에서 바로 열람)
- 51개의 **실행 가능한 예제 코드**
- 12개의 **연습문제**와 **모범 답안**

슬라이드로 개념을 학습하고, 예제를 직접 실행하며 확인하고, 연습문제로 복습하는 3단계 학습 흐름으로 구성되어 있습니다.

---

## 프로젝트 구조

```
typescript-study/
├── index.html                    # 강의 랜딩 페이지
├── package.json                  # 프로젝트 설정 및 의존성
├── tsconfig.json                 # TypeScript 컴파일러 설정
│
├── slides/                       # 슬라이드 강의 (reveal.js)
│   ├── css/
│   │   └── custom.css            # 커스텀 슬라이드 테마
│   ├── 01-introduction.html
│   ├── 02-basic-types.html
│   ├── 03-functions.html
│   ├── 04-interfaces.html
│   ├── 05-classes.html
│   ├── 06-generics.html
│   ├── 07-type-narrowing.html
│   ├── 08-advanced-types.html
│   ├── 09-modules.html
│   ├── 10-decorators.html
│   ├── 11-async.html
│   └── 12-real-world.html
│
├── examples/                     # 실행 가능한 예제 (51개)
│   ├── 01-introduction/          # 챕터별 폴더
│   ├── 02-basic-types/
│   ├── 03-functions/
│   ├── ...
│   └── 12-real-world/
│
├── exercises/                    # 연습문제 (TODO 주석 포함)
│   ├── 01-introduction.ts
│   ├── 02-basic-types.ts
│   ├── ...
│   └── 12-real-world.ts
│
└── answers/                      # 모범 답안
    ├── 01-introduction.ts
    ├── 02-basic-types.ts
    ├── ...
    └── 12-real-world.ts
```

---

## 사전 요구사항

| 도구 | 버전 |
|------|------|
| **Node.js** | 18 이상 |
| **npm** | Node.js와 함께 설치됨 |

---

## 설치

```bash
git clone https://github.com/NA-DEGEN-GIRL/ts_study.git
cd ts_study
npm install
```

---

## 사용 방법

### 1. 슬라이드 학습

브라우저에서 슬라이드 강의를 열람합니다.

```bash
npx http-server . -p 3000 -o
```

브라우저가 자동으로 열리면 `http://localhost:3000`에서 랜딩 페이지를 확인할 수 있습니다. 원하는 챕터를 클릭하면 해당 슬라이드로 이동합니다. 화살표 키(`←` `→`)로 슬라이드를 넘길 수 있습니다.

### 2. 예제 실행

`examples/` 디렉토리의 TypeScript 파일을 직접 실행합니다.

```bash
# 기본 예제 실행
npx ts-node examples/01-introduction/01-hello.ts

# 제네릭 클래스 예제 실행
npx ts-node examples/06-generics/02-generic-classes.ts

# npm script 사용
npm run example -- examples/02-basic-types/01-primitives.ts
```

### 3. 연습문제 풀기

`exercises/` 파일을 열어 `TODO` 주석이 있는 부분을 직접 채워 넣은 뒤, 답안과 비교합니다.

```bash
# 1) 연습문제 파일을 에디터로 열고, TODO 부분을 작성합니다
code exercises/01-introduction.ts

# 2) 작성한 코드가 정상 동작하는지 확인합니다
npx ts-node exercises/01-introduction.ts

# 3) 모범 답안과 비교합니다
npx ts-node answers/01-introduction.ts
```

---

## 커리큘럼

| # | 챕터 | 주요 내용 | 난이도 |
|---|------|----------|--------|
| 01 | TypeScript 소개 | TS란?, 설치, 컴파일, tsconfig | 입문 |
| 02 | 기본 타입 | string, number, boolean, array, tuple, enum, any, unknown | 입문 |
| 03 | 함수 | 매개변수 타입, 반환 타입, optional, overload | 입문 |
| 04 | 인터페이스 & 타입 별칭 | interface, type, extends, intersection, union | 초급 |
| 05 | 클래스 | 접근 제어자, abstract, implements | 초급 |
| 06 | 제네릭 | 제네릭 함수/클래스, 제약 조건, 유틸리티 타입 | 중급 |
| 07 | 타입 좁히기 | typeof, instanceof, type predicates, discriminated union | 중급 |
| 08 | 고급 타입 | conditional, mapped, template literal, infer | 고급 |
| 09 | 모듈 & 네임스페이스 | import/export, .d.ts, ambient modules | 중급 |
| 10 | 데코레이터 | class/method/property decorators, TC39 | 고급 |
| 11 | 비동기 프로그래밍 | Promise\<T\>, async/await, 에러 처리 | 중급 |
| 12 | 실전 패턴 | API 클라이언트, Builder, Result 타입, 상태 머신 | 고급 |

난이도는 **입문 < 초급 < 중급 < 고급** 순서입니다. 순서대로 학습하는 것을 권장하지만, 챕터별로 독립적이므로 필요한 부분만 선택하여 학습할 수도 있습니다.

---

## 슬라이드 조작법

| 키 | 동작 |
|----|------|
| `←` `→` | 이전/다음 슬라이드 |
| `↑` `↓` | 세로 슬라이드 이동 |
| `ESC` | 슬라이드 전체 개요 보기 |
| `F` | 전체 화면 모드 |
| `S` | 발표자 노트 창 |
| `B` | 화면 블랙아웃 |
| `.` (마침표) | 화면 일시 정지 |

---

## 강사를 위한 안내

이 자료를 강의 교재로 활용하시는 분들을 위한 안내사항입니다.

- **슬라이드 구성**: 모든 슬라이드는 [reveal.js](https://revealjs.com/) 기반이며, CDN으로 로드되므로 별도의 빌드 없이 브라우저에서 바로 사용할 수 있습니다.
- **PDF 내보내기**: 슬라이드 URL 뒤에 `?print-pdf`를 추가한 뒤 브라우저의 인쇄 기능(Ctrl+P)으로 PDF로 저장할 수 있습니다.
  ```
  http://localhost:3000/slides/01-introduction.html?print-pdf
  ```
- **독립적 챕터**: 각 챕터는 독립적으로 구성되어 있어, 커리큘럼에 맞게 순서를 변경하거나 특정 챕터만 발췌하여 사용할 수 있습니다.
- **연습문제 활용**: `exercises/` 파일의 TODO 주석을 기반으로 실습 시간을 운영하고, `answers/`로 풀이를 진행할 수 있습니다.
- **타입 검사**: 전체 프로젝트의 타입 오류를 한 번에 확인하려면 아래 명령을 사용합니다.
  ```bash
  npm run check
  ```

---

## 기술 스택

| 기술 | 버전 | 용도 |
|------|------|------|
| [TypeScript](https://www.typescriptlang.org/) | 5.3+ | 학습 대상 언어 |
| [ts-node](https://typestrong.org/ts-node/) | 10.9+ | TypeScript 파일 직접 실행 |
| [reveal.js](https://revealjs.com/) | 4.6.1 | 슬라이드 프레젠테이션 (CDN) |
| [http-server](https://github.com/http-party/http-server) | - | 로컬 개발 서버 |

---

## 라이선스

이 프로젝트는 [MIT 라이선스](LICENSE)에 따라 배포됩니다. 자유롭게 사용, 수정, 재배포할 수 있습니다.
