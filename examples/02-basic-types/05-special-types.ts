/**
 * Chapter 02 - Basic Types
 * 05-special-types.ts - 특수 타입들
 *
 * void, null, undefined, never 타입의 의미와 실용적인 사용법을 배웁니다.
 * 각 타입이 어떤 상황에서 사용되는지 이해합니다.
 */

console.log("=== 특수 타입들 (void, null, undefined, never) ===\n");

// ============================================
// 1. void 타입 - 반환값이 없는 함수
// ============================================

console.log("--- 1. void 타입 ---\n");

// void: 함수가 값을 반환하지 않음을 나타냄
function logMessage(message: string): void {
  console.log(`로그: ${message}`);
  // return 문이 없거나 return;만 있음
}

function printNumbers(): void {
  for (let i = 1; i <= 3; i++) {
    console.log(`  숫자: ${i}`);
  }
}

logMessage("void 타입 함수 실행");
printNumbers();

// void 함수는 undefined를 반환할 수 있음
function returnsVoid(): void {
  return undefined; // 허용됨
}

console.log(`void 함수의 반환값: ${returnsVoid()}`);

// ============================================
// 2. undefined 타입
// ============================================

console.log("\n--- 2. undefined 타입 ---\n");

// 명시적 undefined 타입
let notDefined: undefined = undefined;
console.log(`undefined 변수: ${notDefined}`);

// 선택적 속성은 undefined가 될 수 있음
interface Config {
  host: string;
  port?: number; // port는 number | undefined
}

const config1: Config = { host: "localhost" };
const config2: Config = { host: "localhost", port: 3000 };

console.log(`Config 1 - port: ${config1.port}`); // undefined
console.log(`Config 2 - port: ${config2.port}`); // 3000

// undefined 체크
function printPort(config: Config): void {
  if (config.port !== undefined) {
    console.log(`  포트: ${config.port}`);
  } else {
    console.log(`  포트: 설정되지 않음`);
  }
}

printPort(config1);
printPort(config2);

// ============================================
// 3. null 타입
// ============================================

console.log("\n--- 3. null 타입 ---\n");

// null: 의도적으로 값이 없음을 나타냄
let empty: null = null;
console.log(`null 변수: ${empty}`);

// null을 명시적으로 허용
function findUser(id: number): string | null {
  const users: { [key: number]: string } = {
    1: "김철수",
    2: "이영희"
  };

  return users[id] || null;
}

console.log(`사용자 1: ${findUser(1)}`);
console.log(`사용자 3: ${findUser(3)}`); // null

// null 체크
const user = findUser(1);
if (user !== null) {
  console.log(`  찾은 사용자: ${user.toUpperCase()}`);
}

// ============================================
// 4. null vs undefined
// ============================================

console.log("\n--- 4. null vs undefined 차이 ---\n");

console.log("undefined:");
console.log("  - 값이 할당되지 않은 상태");
console.log("  - 선언만 되고 초기화되지 않음");
console.log("  - 함수에서 return 없을 때");

console.log("\nnull:");
console.log("  - 의도적으로 비어있음을 표현");
console.log("  - 명시적으로 '값이 없다'를 할당");
console.log("  - 객체를 비울 때 사용");

let notInitialized: string | undefined;
let intentionallyEmpty: string | null = null;

console.log(`\nnotInitialized: ${notInitialized}`);
console.log(`intentionallyEmpty: ${intentionallyEmpty}`);

// ============================================
// 5. never 타입 - 절대 발생하지 않는 값
// ============================================

console.log("\n--- 5. never 타입 ---\n");

// never: 함수가 절대 정상적으로 종료되지 않음
function throwError(message: string): never {
  throw new Error(message);
}

// 무한 루프
function infiniteLoop(): never {
  while (true) {
    // 무한 실행
  }
}

console.log("never 타입은 절대 값을 반환하지 않습니다");
console.log("  - 예외를 던지는 함수");
console.log("  - 무한 루프");
console.log("  - 도달할 수 없는 코드");

// ============================================
// 6. never를 이용한 완전성 체크
// ============================================

console.log("\n--- 6. never를 이용한 완전성 체크 ---\n");

type Status = "pending" | "success" | "error";

function handleStatus(status: Status): void {
  switch (status) {
    case "pending":
      console.log("  처리 중...");
      break;
    case "success":
      console.log("  성공!");
      break;
    case "error":
      console.log("  에러 발생");
      break;
    default:
      // 모든 케이스를 처리했다면 여기는 never 타입
      const exhaustiveCheck: never = status;
      break;
  }
}

handleStatus("pending");
handleStatus("success");
handleStatus("error");

console.log("\n✅ 모든 케이스를 처리했습니다");

// ============================================
// 7. 실용 예제: 옵셔널 체이닝과 null 병합
// ============================================

console.log("\n--- 7. 옵셔널 체이닝과 null 병합 ---\n");

interface User {
  name: string;
  address?: {
    city?: string;
    zipCode?: string;
  };
}

const user1: User = {
  name: "홍길동",
  address: { city: "서울" }
};

const user2: User = {
  name: "김철수"
};

// 옵셔널 체이닝 (?.)
console.log(`User1 도시: ${user1.address?.city}`);
console.log(`User2 도시: ${user2.address?.city}`); // undefined

// null 병합 연산자 (??)
const city1 = user1.address?.city ?? "도시 정보 없음";
const city2 = user2.address?.city ?? "도시 정보 없음";

console.log(`User1 도시 (기본값): ${city1}`);
console.log(`User2 도시 (기본값): ${city2}`);

// ============================================
// 8. Non-null assertion operator (!)
// ============================================

console.log("\n--- 8. Non-null Assertion ---\n");

function getLength(str: string | null): number {
  // str이 절대 null이 아님을 확신할 때 사용
  // 주의: 런타임 체크가 없으므로 신중하게 사용
  return str!.length;
}

try {
  console.log(`길이: ${getLength("TypeScript")}`);
  // console.log(getLength(null)); // 런타임 에러!
} catch (error) {
  console.log("에러:", error);
}

console.log("\n⚠️  ! 연산자는 신중하게 사용하세요");

// ============================================
// 9. 요약
// ============================================

console.log("\n--- 9. 타입별 사용 시나리오 ---\n");

console.log("void:");
console.log("  - 반환값이 없는 함수");
console.log("  - 이벤트 핸들러, 로깅 함수");

console.log("\nundefined:");
console.log("  - 선택적 매개변수");
console.log("  - 선택적 속성");
console.log("  - 초기화되지 않은 변수");

console.log("\nnull:");
console.log("  - 의도적으로 비어있는 값");
console.log("  - 데이터베이스에서 값이 없을 때");
console.log("  - 찾기 실패 시 반환값");

console.log("\nnever:");
console.log("  - 예외를 던지는 함수");
console.log("  - 완전성 체크 (exhaustive check)");
console.log("  - 도달 불가능한 코드");
