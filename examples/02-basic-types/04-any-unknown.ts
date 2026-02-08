/**
 * Chapter 02 - Basic Types
 * 04-any-unknown.ts - any vs unknown
 *
 * 이 파일에서 배울 내용:
 * - any 타입 - 모든 타입을 허용하지만 타입 체크 비활성화 (위험)
 * - unknown 타입 - 타입 안전한 any의 대안 (권장)
 * - 타입 가드 (Type Guard) - unknown 값을 안전하게 사용하는 방법
 * - 타입 단언 (Type Assertion) vs 타입 가드의 차이
 * 왜 필요한가? 외부 데이터를 안전하게 처리하기 위해
 */

console.log("=== any vs unknown ===\n");

// ============================================
// 1. any 타입 - 모든 타입 허용 (타입 체크 비활성화)
// ============================================

console.log("--- 1. any 타입 ---\n");

let anyValue: any = "문자열";
console.log(`any 변수 (초기값): ${anyValue}`);

// any는 어떤 타입이든 할당 가능
anyValue = 42;
console.log(`숫자 할당: ${anyValue}`);

anyValue = true;
console.log(`불린 할당: ${anyValue}`);

anyValue = { name: "객체" };
console.log(`객체 할당:`, anyValue);

// ⚠️ any는 타입 체크를 완전히 비활성화
let anyNumber: any = "문자열";
let result = anyNumber * 2; // 런타임 에러는 없지만 NaN
console.log(`any 타입의 위험성: "${anyNumber}" * 2 = ${result} (NaN)`);

// ============================================
// 2. any의 문제점
// ============================================

console.log("\n--- 2. any의 문제점 ---\n");

function processAny(value: any) {
  // 타입 체크가 없어서 위험한 코드 작성 가능
  return value.toUpperCase(); // value가 문자열이 아니면 런타임 에러
}

try {
  console.log(processAny("hello")); // 정상 작동
  // console.log(processAny(123)); // 런타임 에러 발생!
  console.log("⚠️  any는 타입 안정성을 제공하지 않습니다");
} catch (error) {
  console.log("에러 발생:", error);
}

// ============================================
// 3. unknown 타입 - 타입 안전한 any의 대안
// ============================================

console.log("\n--- 3. unknown 타입 ---\n");
// 왜 필요한가? any보다 안전하게 타입을 모르는 값 처리

let unknownValue: unknown = "문자열";
console.log(`unknown 변수 (초기값): ${unknownValue}`);

// unknown도 모든 타입 할당 가능
unknownValue = 42;
console.log(`숫자 할당: ${unknownValue}`);

unknownValue = true;
console.log(`불린 할당: ${unknownValue}`);

unknownValue = { name: "객체" };
console.log(`객체 할당:`, unknownValue);

// ============================================
// 4. unknown의 안정성
// ============================================

console.log("\n--- 4. unknown의 안정성 ---\n");

let unknownString: unknown = "TypeScript";

// ❌ unknown 타입은 직접 사용 불가
// console.log(unknownString.length); // Error: Object is of type 'unknown'
// console.log(unknownString.toUpperCase()); // Error

// ✅ 타입 가드로 타입 확인 후 사용
if (typeof unknownString === "string") {
  console.log(`타입 확인 후 사용: ${unknownString.toUpperCase()}`);
  console.log(`길이: ${unknownString.length}`);
}

// ============================================
// 5. 타입 가드 활용
// ============================================

console.log("\n--- 5. 타입 가드로 안전하게 사용 ---\n");

function processUnknown(value: unknown): string {
  // typeof 타입 가드
  if (typeof value === "string") {
    return `문자열: ${value.toUpperCase()}`;
  }

  // typeof 타입 가드
  if (typeof value === "number") {
    return `숫자: ${value.toFixed(2)}`;
  }

  // instanceof 타입 가드
  if (value instanceof Date) {
    return `날짜: ${value.toISOString()}`;
  }

  // 기본 케이스
  return `알 수 없는 타입: ${JSON.stringify(value)}`;
}

console.log(processUnknown("hello"));
console.log(processUnknown(3.14159));
console.log(processUnknown(new Date()));
console.log(processUnknown({ key: "value" }));

// ============================================
// 6. 타입 단언 (Type Assertion)
// ============================================

console.log("\n--- 6. 타입 단언 ---\n");

let apiResponse: unknown = '{"name": "홍길동", "age": 30}';

// 타입을 확신할 때 타입 단언 사용
let parsedData = JSON.parse(apiResponse as string);
console.log(`파싱된 데이터:`, parsedData);

// 더 안전한 방법: 타입 검증
if (typeof apiResponse === "string") {
  let validated = JSON.parse(apiResponse);
  console.log(`검증된 데이터:`, validated);
}

// ============================================
// 7. any vs unknown 비교
// ============================================

console.log("\n--- 7. any vs unknown 비교 ---\n");

// any는 다른 타입에 할당 가능 (위험!)
let anyVar: any = "문자열";
let strFromAny: string = anyVar; // 허용됨
console.log(`any → string: ${strFromAny}`);

// unknown은 타입 확인 없이 할당 불가 (안전!)
let unknownVar: unknown = "문자열";
// let strFromUnknown: string = unknownVar; // ❌ Error
let strFromUnknown: string = unknownVar as string; // 타입 단언 필요
console.log(`unknown → string (단언): ${strFromUnknown}`);

// ============================================
// 8. 실용 예제: API 응답 처리
// ============================================

console.log("\n--- 8. 실용 예제: API 응답 처리 ---\n");

interface User {
  id: number;
  name: string;
  email: string;
}

function isUser(obj: unknown): obj is User {
  return (
    typeof obj === "object" &&
    obj !== null &&
    "id" in obj &&
    "name" in obj &&
    "email" in obj
  );
}

function handleApiResponse(response: unknown): void {
  if (isUser(response)) {
    console.log(`✅ 유효한 사용자: ${response.name} (${response.email})`);
  } else {
    console.log("❌ 잘못된 응답 형식");
  }
}

handleApiResponse({ id: 1, name: "김철수", email: "kim@example.com" });
handleApiResponse({ invalid: "data" });

// ============================================
// 9. 권장사항
// ============================================

console.log("\n--- 9. 사용 권장사항 ---\n");

console.log("✅ unknown 사용 (권장):");
console.log("  - 외부 API 응답");
console.log("  - 사용자 입력 데이터");
console.log("  - 동적으로 로드되는 데이터");
console.log("  - 타입을 모르는 써드파티 라이브러리");

console.log("\n⚠️  any 사용 (최소화):");
console.log("  - 점진적 마이그레이션 중");
console.log("  - 타입 정의가 불가능한 경우");
console.log("  - 프로토타입 단계");

console.log("\n💡 원칙: 가능한 한 unknown을 사용하고, 타입 가드로 안전하게 처리하세요!");
