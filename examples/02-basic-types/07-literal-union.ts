/**
 * Chapter 02 - Basic Types
 * 07-literal-union.ts - 리터럴 타입과 유니온 타입
 *
 * 이 파일에서 배울 내용:
 * - 리터럴 타입 (Literal Type) - 정확한 값 자체를 타입으로 사용
 * - 유니온 타입 (Union Type) - 여러 타입 중 하나를 허용 (A | B)
 * - 타입 좁히기 (Type Narrowing) - 유니온 타입을 구체적 타입으로 좁히기
 * - 타입 가드 (Type Guard) - typeof, instanceof 등으로 타입 확인
 * 왜 필요한가? 허용된 값만 사용하도록 제한하여 안전성 향상
 */

console.log("=== 리터럴 타입과 유니온 타입 ===\n");

// ============================================
// 1. 리터럴 타입 (Literal Type) - 특정 값만 허용하는 타입
// ============================================

console.log("--- 1. 리터럴 타입 ---\n");
// 왜 필요한가? string 대신 "left" | "right"로 제한하여 오타 방지

// 문자열 리터럴 타입
let direction: "left" | "right" | "up" | "down";
direction = "left";
console.log(`방향: ${direction}`);

// direction = "forward"; // ❌ Error: Type '"forward"' is not assignable

// 숫자 리터럴 타입
let diceRoll: 1 | 2 | 3 | 4 | 5 | 6;
diceRoll = 4;
console.log(`주사위: ${diceRoll}`);

// boolean 리터럴 타입 (실용성은 낮음)
let alwaysTrue: true = true;
console.log(`항상 참: ${alwaysTrue}`);

// ============================================
// 2. 유니온 타입 (Union Types)
// ============================================

console.log("\n--- 2. 유니온 타입 ---\n");

// 여러 타입 중 하나
let mixed: string | number;

mixed = "문자열";
console.log(`mixed = ${mixed} (타입: string)`);

mixed = 123;
console.log(`mixed = ${mixed} (타입: number)`);

// 유니온 타입과 함수
function printId(id: string | number): void {
  console.log(`  ID: ${id}`);
}

printId(101);
printId("USER_001");

// ============================================
// 3. 타입 좁히기 (Type Narrowing) - 유니온 타입을 구체적으로 좁히기
// ============================================

console.log("\n--- 3. 타입 좁히기 (typeof) ---\n");
// 왜 필요한가? if문으로 타입을 좁혀야 해당 타입의 메서드 사용 가능

function formatValue(value: string | number): string {
  if (typeof value === "string") {
    // 이 블록에서 value는 string 타입
    return value.toUpperCase();
  } else {
    // 이 블록에서 value는 number 타입
    return value.toFixed(2);
  }
}

console.log(`formatValue("hello"): ${formatValue("hello")}`);
console.log(`formatValue(3.14159): ${formatValue(3.14159)}`);

// ============================================
// 4. 리터럴 타입과 유니온 결합
// ============================================

console.log("\n--- 4. 리터럴 + 유니온 결합 ---\n");

type Status = "pending" | "success" | "error";
type StatusCode = 200 | 400 | 404 | 500;

function handleStatus(status: Status, code: StatusCode): void {
  console.log(`  상태: ${status}, 코드: ${code}`);
}

handleStatus("success", 200);
handleStatus("error", 404);
// handleStatus("loading", 301); // ❌ Error

// ============================================
// 5. 실용적인 예제: HTTP 메서드
// ============================================

console.log("\n--- 5. HTTP 메서드 예제 ---\n");

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

interface HttpRequest {
  method: HttpMethod;
  url: string;
  body?: unknown;
}

function sendRequest(request: HttpRequest): void {
  console.log(`  ${request.method} ${request.url}`);
  if (request.body) {
    console.log(`    Body: ${JSON.stringify(request.body)}`);
  }
}

sendRequest({ method: "GET", url: "/api/users" });
sendRequest({ method: "POST", url: "/api/users", body: { name: "홍길동" } });

// ============================================
// 6. 유니온 타입의 교집합 메서드만 사용 가능
// ============================================

console.log("\n--- 6. 유니온 타입의 공통 메서드 ---\n");

function getLength(value: string | number[]): number {
  // string과 number[] 모두 length 속성을 가짐
  return value.length;
}

console.log(`"TypeScript" 길이: ${getLength("TypeScript")}`);
console.log(`[1, 2, 3, 4, 5] 길이: ${getLength([1, 2, 3, 4, 5])}`);

// ============================================
// 7. 판별 유니온 (Discriminated Union) 기초
// ============================================

console.log("\n--- 7. 판별 유니온 ---\n");

interface SuccessResponse {
  status: "success";
  data: string;
}

interface ErrorResponse {
  status: "error";
  message: string;
}

type ApiResponse = SuccessResponse | ErrorResponse;

function handleResponse(response: ApiResponse): void {
  if (response.status === "success") {
    // 이 블록에서 response는 SuccessResponse 타입
    console.log(`  성공: ${response.data}`);
  } else {
    // 이 블록에서 response는 ErrorResponse 타입
    console.log(`  에러: ${response.message}`);
  }
}

handleResponse({ status: "success", data: "데이터 로드 완료" });
handleResponse({ status: "error", message: "네트워크 오류" });

// ============================================
// 8. 타입 가드 함수
// ============================================

console.log("\n--- 8. 타입 가드 함수 ---\n");

function isString(value: unknown): value is string {
  return typeof value === "string";
}

function isNumber(value: unknown): value is number {
  return typeof value === "number";
}

function processValue(value: unknown): void {
  if (isString(value)) {
    console.log(`  문자열: ${value.toUpperCase()}`);
  } else if (isNumber(value)) {
    console.log(`  숫자: ${value.toFixed(2)}`);
  } else {
    console.log(`  기타 타입`);
  }
}

processValue("typescript");
processValue(3.14159);
processValue(true);

// ============================================
// 9. null/undefined와 유니온
// ============================================

console.log("\n--- 9. null/undefined 처리 ---\n");

function greet(name: string | null | undefined): string {
  if (name == null) {
    // null과 undefined 모두 체크 (== 사용)
    return "안녕하세요, 게스트님!";
  }
  return `안녕하세요, ${name}님!`;
}

console.log(greet("김철수"));
console.log(greet(null));
console.log(greet(undefined));

// ============================================
// 10. 타입 별칭으로 재사용
// ============================================

console.log("\n--- 10. 타입 별칭 활용 ---\n");

// 자주 사용하는 유니온 타입을 별칭으로 정의
type ID = string | number;
type Size = "small" | "medium" | "large";
type Color = "red" | "green" | "blue";

interface Product {
  id: ID;
  name: string;
  size: Size;
  color: Color;
}

const product: Product = {
  id: "PROD_001",
  name: "티셔츠",
  size: "medium",
  color: "blue"
};

console.log(`상품: ${product.name}`);
console.log(`  ID: ${product.id}, 사이즈: ${product.size}, 색상: ${product.color}`);

// ============================================
// 11. 실전 활용: 이벤트 핸들러
// ============================================

console.log("\n--- 11. 이벤트 타입 예제 ---\n");

type ButtonEvent = "click" | "doubleClick" | "hover";
type InputEventType = "focus" | "blur" | "change";

function handleButtonEvent(event: ButtonEvent): void {
  console.log(`  버튼 이벤트: ${event}`);
}

function handleInputEvent(event: InputEventType): void {
  console.log(`  입력 이벤트: ${event}`);
}

handleButtonEvent("click");
handleInputEvent("focus");

// ============================================
// 12. 모범 사례
// ============================================

console.log("\n--- 12. 사용 가이드 ---\n");

console.log("✅ 리터럴 타입 사용 시점:");
console.log("  - 제한된 값의 집합");
console.log("  - 상태, 플래그, 옵션");
console.log("  - API 응답 상태");
console.log("  - 설정값, 열거형 대안");

console.log("\n✅ 유니온 타입 사용 시점:");
console.log("  - 여러 타입을 받을 수 있는 매개변수");
console.log("  - null/undefined 허용");
console.log("  - 다양한 응답 타입");

console.log("\n💡 Tip: 타입 좁히기로 타입 안정성을 확보하세요!");
