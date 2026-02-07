/**
 * Chapter 03 - Functions
 * 02-optional-default.ts - 선택적 매개변수와 기본값
 *
 * 선택적 매개변수, 기본 매개변수, 나머지 매개변수를 학습합니다.
 * 유연한 함수 시그니처를 만드는 방법을 이해합니다.
 */

console.log("=== 선택적/기본/나머지 매개변수 ===\n");

// ============================================
// 1. 필수 매개변수
// ============================================

console.log("--- 1. 필수 매개변수 ---\n");

function createUser(name: string, age: number): string {
  return `${name} (${age}세)`;
}

console.log(createUser("김철수", 30));
// console.log(createUser("이영희")); // ❌ Error: Expected 2 arguments

// ============================================
// 2. 선택적 매개변수 (Optional Parameters)
// ============================================

console.log("\n--- 2. 선택적 매개변수 (?) ---\n");

// ? 기호로 선택적 매개변수 표시
function greet(name: string, greeting?: string): string {
  if (greeting) {
    return `${greeting}, ${name}님!`;
  }
  return `안녕하세요, ${name}님!`;
}

console.log(greet("박민수"));
console.log(greet("최지은", "환영합니다"));

// 선택적 매개변수는 undefined와 유니온
function printInfo(name: string, age?: number): void {
  if (age !== undefined) {
    console.log(`  ${name}: ${age}세`);
  } else {
    console.log(`  ${name}: 나이 정보 없음`);
  }
}

printInfo("홍길동", 25);
printInfo("김영희");

// ============================================
// 3. 기본 매개변수 (Default Parameters)
// ============================================

console.log("\n--- 3. 기본 매개변수 ---\n");

// 기본값 지정 시 타입 추론 가능
function createMessage(message: string, prefix = "알림"): string {
  return `[${prefix}] ${message}`;
}

console.log(createMessage("새로운 메시지가 도착했습니다"));
console.log(createMessage("오류가 발생했습니다", "경고"));

// 명시적 타입과 기본값
function calculatePrice(price: number, taxRate: number = 0.1): number {
  return price * (1 + taxRate);
}

console.log(`가격 (세금 포함): ${calculatePrice(10000)}원`);
console.log(`가격 (세금 15%): ${calculatePrice(10000, 0.15)}원`);

// ============================================
// 4. 선택적 vs 기본 매개변수
// ============================================

console.log("\n--- 4. 선택적 vs 기본 매개변수 ---\n");

// 선택적 매개변수: undefined 체크 필요
function method1(name: string, age?: number): void {
  const ageStr = age !== undefined ? `${age}세` : "미정";
  console.log(`  ${name}: ${ageStr}`);
}

// 기본 매개변수: 자동으로 값 할당
function method2(name: string, age: number = 0): void {
  console.log(`  ${name}: ${age}세`);
}

method1("김철수");
method1("이영희", 30);

method2("박민수");
method2("최지은", 25);

// ============================================
// 5. 매개변수 순서 규칙
// ============================================

console.log("\n--- 5. 매개변수 순서 ---\n");

// ✅ 올바른 순서: 필수 → 선택적
function correct(required: string, optional?: number): void {
  console.log(`  필수: ${required}, 선택: ${optional ?? "없음"}`);
}

// ❌ 잘못된 순서: 선택적 → 필수 (컴파일 에러)
// function wrong(optional?: string, required: number): void {}

correct("필수값");
correct("필수값", 42);

console.log("✅ 규칙: 필수 매개변수가 선택적 매개변수보다 앞에 와야 함");

// ============================================
// 6. 나머지 매개변수 (Rest Parameters)
// ============================================

console.log("\n--- 6. 나머지 매개변수 (...) ---\n");

// 여러 개의 매개변수를 배열로 받음
function sum(...numbers: number[]): number {
  return numbers.reduce((total, num) => total + num, 0);
}

console.log(`sum(1, 2, 3) = ${sum(1, 2, 3)}`);
console.log(`sum(10, 20, 30, 40) = ${sum(10, 20, 30, 40)}`);
console.log(`sum() = ${sum()}`);

// 나머지 매개변수와 일반 매개변수 조합
function createList(title: string, ...items: string[]): void {
  console.log(`\n${title}:`);
  items.forEach((item, index) => {
    console.log(`  ${index + 1}. ${item}`);
  });
}

createList("할 일 목록", "공부하기", "운동하기", "책 읽기");
createList("장보기", "우유", "계란", "빵", "과일");

// ============================================
// 7. 나머지 매개변수의 타입
// ============================================

console.log("\n--- 7. 나머지 매개변수 타입 ---\n");

// 튜플 타입으로 나머지 매개변수 제한
function format(template: string, ...values: [string, number]): string {
  return `${template}: ${values[0]} - ${values[1]}`;
}

console.log(format("사용자", "김철수", 30));

// 다양한 타입의 나머지 매개변수
function logAll(...args: (string | number)[]): void {
  console.log("  전달된 인자:", args.join(", "));
}

logAll("hello", 123, "world", 456);

// ============================================
// 8. 객체 구조 분해와 기본값
// ============================================

console.log("\n--- 8. 구조 분해와 기본값 ---\n");

interface UserOptions {
  name: string;
  age?: number;
  email?: string;
}

// 객체 구조 분해와 기본값
function createAccount({
  name,
  age = 18,
  email = "no-email@example.com"
}: UserOptions): void {
  console.log(`  계정 생성: ${name}, ${age}세, ${email}`);
}

createAccount({ name: "홍길동" });
createAccount({ name: "김영희", age: 25, email: "kim@example.com" });

// ============================================
// 9. 실용 예제: API 요청 함수
// ============================================

console.log("\n--- 9. 실용 예제: API 요청 ---\n");

interface RequestOptions {
  method?: "GET" | "POST" | "PUT" | "DELETE";
  headers?: Record<string, string>;
  timeout?: number;
}

function apiRequest(
  url: string,
  { method = "GET", headers = {}, timeout = 5000 }: RequestOptions = {}
): void {
  console.log(`\nAPI 요청:`);
  console.log(`  URL: ${url}`);
  console.log(`  Method: ${method}`);
  console.log(`  Timeout: ${timeout}ms`);
  console.log(`  Headers:`, Object.keys(headers).length > 0 ? headers : "없음");
}

apiRequest("/api/users");
apiRequest("/api/users", { method: "POST" });
apiRequest("/api/users/1", {
  method: "PUT",
  headers: { "Content-Type": "application/json" },
  timeout: 10000
});

// ============================================
// 10. 실용 예제: 로거 함수
// ============================================

console.log("\n--- 10. 로거 함수 예제 ---\n");

type LogLevel = "info" | "warn" | "error";

function log(message: string, level: LogLevel = "info", ...tags: string[]): void {
  const tagStr = tags.length > 0 ? ` [${tags.join("][")}]` : "";
  console.log(`  [${level.toUpperCase()}]${tagStr} ${message}`);
}

log("애플리케이션 시작");
log("메모리 사용량 높음", "warn");
log("데이터베이스 연결 실패", "error", "DB", "CRITICAL");
log("사용자 로그인", "info", "AUTH", "USER");

// ============================================
// 11. 모범 사례
// ============================================

console.log("\n--- 11. 모범 사례 ---\n");

console.log("✅ 선택적 매개변수 사용 시점:");
console.log("  - 값이 없어도 함수 실행 가능");
console.log("  - undefined 체크가 필요한 경우");

console.log("\n✅ 기본 매개변수 사용 시점:");
console.log("  - 합리적인 기본값이 있는 경우");
console.log("  - 대부분의 호출에서 같은 값 사용");

console.log("\n✅ 나머지 매개변수 사용 시점:");
console.log("  - 가변 개수의 인자");
console.log("  - 유틸리티 함수 (sum, max, log 등)");

console.log("\n💡 Tip: 매개변수가 많으면 객체로 받는 것을 고려하세요!");
