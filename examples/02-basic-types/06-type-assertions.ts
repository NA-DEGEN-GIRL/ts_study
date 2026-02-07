/**
 * Chapter 02 - Basic Types
 * 06-type-assertions.ts - 타입 단언 (Type Assertions)
 *
 * as 키워드, angle bracket 문법, const 단언을 학습합니다.
 * 타입 단언은 개발자가 컴파일러보다 타입을 더 잘 알 때 사용합니다.
 */

console.log("=== 타입 단언 (Type Assertions) ===\n");

// ============================================
// 1. as 키워드 문법 (권장)
// ============================================

console.log("--- 1. as 키워드 ---\n");

// DOM 조작 예제
let inputValue: unknown = "TypeScript";

// unknown을 string으로 단언
let strValue = inputValue as string;
console.log(`단언된 문자열: ${strValue.toUpperCase()}`);

// API 응답 예제
let apiResponse: any = {
  id: 1,
  name: "홍길동",
  email: "hong@example.com"
};

interface User {
  id: number;
  name: string;
  email: string;
}

let user = apiResponse as User;
console.log(`사용자: ${user.name} (${user.email})`);

// ============================================
// 2. Angle-bracket 문법 (JSX에서 사용 불가)
// ============================================

console.log("\n--- 2. Angle-bracket 문법 ---\n");

let someValue: unknown = "또 다른 문자열";

// <타입> 문법 (React/JSX에서는 사용 불가)
let strLength = (<string>someValue).length;
console.log(`문자열 길이 (angle-bracket): ${strLength}`);

// as 문법 (권장 - JSX와 호환)
let strLength2 = (someValue as string).length;
console.log(`문자열 길이 (as): ${strLength2}`);

console.log("\n💡 권장: as 키워드 사용 (JSX 호환성)");

// ============================================
// 3. 타입 단언이 필요한 경우
// ============================================

console.log("\n--- 3. 타입 단언 사용 시나리오 ---\n");

// 시나리오 1: DOM 요소 접근
// const button = document.querySelector('.btn') as HTMLButtonElement;
// button.disabled = true;

// 시나리오 2: JSON 파싱
const jsonString = '{"name": "김철수", "age": 30}';
const parsed = JSON.parse(jsonString) as { name: string; age: number };
console.log(`파싱된 객체: ${parsed.name}, ${parsed.age}세`);

// 시나리오 3: 써드파티 라이브러리
interface LibraryConfig {
  apiKey: string;
  endpoint: string;
}

const config: unknown = {
  apiKey: "abc123",
  endpoint: "https://api.example.com"
};

const typedConfig = config as LibraryConfig;
console.log(`API 엔드포인트: ${typedConfig.endpoint}`);

// ============================================
// 4. 이중 단언 (Double Assertion) - 신중하게 사용
// ============================================

console.log("\n--- 4. 이중 단언 ---\n");

// 호환되지 않는 타입 간 변환 시 이중 단언 필요
let num: number = 123;

// 직접 변환 불가
// let str: string = num as string; // ❌ Error

// 이중 단언 (권장하지 않음)
let str = num as unknown as string;
console.log("⚠️  이중 단언은 타입 안정성을 해칩니다");
console.log("    가능한 한 피하세요!");

// ============================================
// 5. const 단언 (const assertions)
// ============================================

console.log("\n--- 5. const 단언 ---\n");

// 일반 객체 (타입이 넓게 추론됨)
let regularObject = {
  name: "홍길동",
  age: 30
};
// regularObject의 타입: { name: string; age: number }

// const 단언 (리터럴 타입으로 추론)
let constObject = {
  name: "홍길동",
  age: 30
} as const;
// constObject의 타입: { readonly name: "홍길동"; readonly age: 30 }

console.log(`일반 객체:`, regularObject);
console.log(`const 단언 객체:`, constObject);

// const 단언은 readonly로 만듦
// constObject.name = "김철수"; // ❌ Error: Cannot assign to 'name'

// ============================================
// 6. const 단언과 배열
// ============================================

console.log("\n--- 6. const 단언과 배열 ---\n");

// 일반 배열
let regularArray = [1, 2, 3];
// 타입: number[]

// const 단언 배열
let constArray = [1, 2, 3] as const;
// 타입: readonly [1, 2, 3]

console.log(`일반 배열: [${regularArray.join(", ")}]`);
console.log(`const 단언 배열: [${constArray.join(", ")}]`);

// constArray.push(4); // ❌ Error: Property 'push' does not exist

// ============================================
// 7. const 단언의 실용적 활용
// ============================================

console.log("\n--- 7. const 단언 활용 ---\n");

// 메뉴 항목을 리터럴 타입으로 고정
const MENU_ITEMS = ["home", "about", "contact"] as const;
type MenuItem = typeof MENU_ITEMS[number]; // "home" | "about" | "contact"

function navigateTo(item: MenuItem): void {
  console.log(`  페이지 이동: ${item}`);
}

navigateTo("home");
navigateTo("about");
// navigateTo("profile"); // ❌ Error: Argument not assignable

// HTTP 메서드
const HTTP_METHODS = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  DELETE: "DELETE"
} as const;

type HttpMethod = typeof HTTP_METHODS[keyof typeof HTTP_METHODS];

function request(method: HttpMethod, url: string): void {
  console.log(`  ${method} 요청: ${url}`);
}

request("GET", "/api/users");
request("POST", "/api/users");

// ============================================
// 8. Non-null 단언 연산자 (!)
// ============================================

console.log("\n--- 8. Non-null 단언 (!.) ---\n");

function getUser(): { name: string } | null {
  return { name: "이영희" };
}

let currentUser = getUser();

// null 체크 없이 접근 (null이 아님을 확신)
console.log(`사용자 이름: ${currentUser!.name}`);

// ⚠️ 주의: null인 경우 런타임 에러 발생
console.log("⚠️  ! 연산자 사용 시 주의사항:");
console.log("    - 값이 절대 null/undefined가 아닐 때만 사용");
console.log("    - 런타임 체크가 없으므로 신중하게 사용");

// ============================================
// 9. 타입 단언 vs 타입 선언
// ============================================

console.log("\n--- 9. 타입 단언 vs 타입 선언 ---\n");

interface Person {
  name: string;
  age: number;
}

// 타입 선언 (더 안전 - 구조 검증)
const person1: Person = {
  name: "김민수",
  age: 28
};

// 타입 단언 (검증 없음)
const person2 = {
  name: "박지은"
  // age 누락되어도 에러 없음 (위험!)
} as Person;

console.log("✅ 타입 선언: 구조 검증 + 타입 안정성");
console.log("⚠️  타입 단언: 검증 없음 - 신중하게 사용");

// ============================================
// 10. 모범 사례
// ============================================

console.log("\n--- 10. 모범 사례 ---\n");

console.log("✅ 타입 단언 사용이 적절한 경우:");
console.log("  - DOM 요소 타입 지정");
console.log("  - JSON 파싱 결과");
console.log("  - 써드파티 라이브러리 타입");
console.log("  - unknown에서 구체적 타입으로 변환");

console.log("\n❌ 타입 단언을 피해야 할 경우:");
console.log("  - 타입 검증을 회피하려고 할 때");
console.log("  - 이중 단언이 필요할 때");
console.log("  - 타입 선언으로 충분할 때");

console.log("\n💡 원칙: 타입 단언은 최소한으로, 타입 가드를 선호하세요!");
