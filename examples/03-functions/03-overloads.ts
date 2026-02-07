/**
 * Chapter 03 - Functions
 * 03-overloads.ts - 함수 오버로딩
 *
 * TypeScript의 함수 오버로딩을 학습합니다.
 * 여러 개의 함수 시그니처를 정의하여 다양한 매개변수 조합을 처리합니다.
 */

console.log("=== 함수 오버로딩 (Function Overloads) ===\n");

// ============================================
// 1. 기본 함수 오버로딩
// ============================================

console.log("--- 1. 기본 오버로딩 ---\n");

// 오버로드 시그니처들
function combine(a: string, b: string): string;
function combine(a: number, b: number): number;

// 구현 시그니처 (실제 구현)
function combine(a: string | number, b: string | number): string | number {
  if (typeof a === "string" && typeof b === "string") {
    return a + b;
  }
  if (typeof a === "number" && typeof b === "number") {
    return a + b;
  }
  throw new Error("매개변수는 모두 같은 타입이어야 합니다");
}

console.log(`combine("Hello, ", "World!") = ${combine("Hello, ", "World!")}`);
console.log(`combine(10, 20) = ${combine(10, 20)}`);

// ============================================
// 2. 다양한 매개변수 개수
// ============================================

console.log("\n--- 2. 매개변수 개수가 다른 오버로딩 ---\n");

// 오버로드 시그니처
function greet(name: string): string;
function greet(firstName: string, lastName: string): string;

// 구현
function greet(firstName: string, lastName?: string): string {
  if (lastName) {
    return `안녕하세요, ${lastName} ${firstName}님!`;
  }
  return `안녕하세요, ${firstName}님!`;
}

console.log(greet("김철수"));
console.log(greet("철수", "김"));

// ============================================
// 3. 반환 타입이 다른 오버로딩
// ============================================

console.log("\n--- 3. 반환 타입이 다른 오버로딩 ---\n");

// 문자열을 전달하면 문자열 배열 반환
function parseInput(input: string): string[];
// 숫자를 전달하면 숫자 배열 반환
function parseInput(input: number): number[];
// 불린을 전달하면 불린 배열 반환
function parseInput(input: boolean): boolean[];

// 구현
function parseInput(input: string | number | boolean): (string | number | boolean)[] {
  if (typeof input === "string") {
    return input.split("");
  }
  if (typeof input === "number") {
    return String(input).split("").map(Number);
  }
  return [input];
}

console.log(`parseInput("hello"):`, parseInput("hello"));
console.log(`parseInput(12345):`, parseInput(12345));
console.log(`parseInput(true):`, parseInput(true));

// ============================================
// 4. 실용 예제: 날짜 생성 함수
// ============================================

console.log("\n--- 4. 실용 예제: 날짜 생성 ---\n");

// 타임스탬프로 생성
function createDate(timestamp: number): Date;
// 년월일로 생성
function createDate(year: number, month: number, day: number): Date;
// 문자열로 생성
function createDate(dateString: string): Date;

// 구현
function createDate(
  arg1: number | string,
  month?: number,
  day?: number
): Date {
  if (typeof arg1 === "string") {
    return new Date(arg1);
  }
  if (month !== undefined && day !== undefined) {
    return new Date(arg1, month - 1, day); // month는 0부터 시작
  }
  return new Date(arg1);
}

console.log(`타임스탬프:`, createDate(1609459200000).toLocaleDateString("ko-KR"));
console.log(`년월일:`, createDate(2024, 1, 1).toLocaleDateString("ko-KR"));
console.log(`문자열:`, createDate("2024-12-25").toLocaleDateString("ko-KR"));

// ============================================
// 5. 실용 예제: 검색 함수
// ============================================

console.log("\n--- 5. 검색 함수 오버로딩 ---\n");

interface User {
  id: number;
  name: string;
  email: string;
}

const users: User[] = [
  { id: 1, name: "김철수", email: "kim@example.com" },
  { id: 2, name: "이영희", email: "lee@example.com" },
  { id: 3, name: "박민수", email: "park@example.com" }
];

// ID로 검색
function findUser(id: number): User | undefined;
// 이름으로 검색
function findUser(name: string): User | undefined;
// 조건 함수로 검색
function findUser(predicate: (user: User) => boolean): User | undefined;

// 구현
function findUser(
  arg: number | string | ((user: User) => boolean)
): User | undefined {
  if (typeof arg === "number") {
    return users.find((user) => user.id === arg);
  }
  if (typeof arg === "string") {
    return users.find((user) => user.name === arg);
  }
  if (typeof arg === "function") {
    return users.find(arg);
  }
}

console.log("ID로 검색:", findUser(1));
console.log("이름으로 검색:", findUser("이영희"));
console.log("조건 함수로 검색:", findUser((u) => u.email.includes("park")));

// ============================================
// 6. 오버로딩과 유니온 타입 비교
// ============================================

console.log("\n--- 6. 오버로딩 vs 유니온 타입 ---\n");

// 유니온 타입 방식 (타입 좁히기 필요)
function formatUnion(value: string | number): string {
  if (typeof value === "string") {
    return value.toUpperCase();
  }
  return value.toFixed(2);
}

// 오버로딩 방식 (타입 안정성 향상)
function formatOverload(value: string): string;
function formatOverload(value: number): string;
function formatOverload(value: string | number): string {
  if (typeof value === "string") {
    return value.toUpperCase();
  }
  return value.toFixed(2);
}

console.log(`formatUnion("hello") = ${formatUnion("hello")}`);
console.log(`formatUnion(3.14159) = ${formatUnion(3.14159)}`);
console.log(`formatOverload("world") = ${formatOverload("world")}`);
console.log(`formatOverload(2.71828) = ${formatOverload(2.71828)}`);

// ============================================
// 7. 메서드 오버로딩
// ============================================

console.log("\n--- 7. 클래스 메서드 오버로딩 ---\n");

class Calculator {
  // 오버로드 시그니처
  add(a: number, b: number): number;
  add(a: string, b: string): string;

  // 구현
  add(a: number | string, b: number | string): number | string {
    if (typeof a === "number" && typeof b === "number") {
      return a + b;
    }
    if (typeof a === "string" && typeof b === "string") {
      return a + b;
    }
    throw new Error("타입이 일치하지 않습니다");
  }
}

const calc = new Calculator();
console.log(`calc.add(10, 20) = ${calc.add(10, 20)}`);
console.log(`calc.add("Hello, ", "TypeScript") = ${calc.add("Hello, ", "TypeScript")}`);

// ============================================
// 8. 제네릭과 오버로딩 조합
// ============================================

console.log("\n--- 8. 제네릭과 오버로딩 ---\n");

// 배열을 받으면 배열 반환
function reverse<T>(items: T[]): T[];
// 문자열을 받으면 문자열 반환
function reverse(str: string): string;

// 구현
function reverse<T>(arg: T[] | string): T[] | string {
  if (typeof arg === "string") {
    return arg.split("").reverse().join("");
  }
  return arg.slice().reverse();
}

console.log(`reverse([1, 2, 3, 4, 5]):`, reverse([1, 2, 3, 4, 5]));
console.log(`reverse("TypeScript") = ${reverse("TypeScript")}`);

// ============================================
// 9. 오버로딩 주의사항
// ============================================

console.log("\n--- 9. 오버로딩 주의사항 ---\n");

console.log("⚠️  주의사항:");
console.log("  1. 구현 시그니처는 모든 오버로드를 포괄해야 함");
console.log("  2. 오버로드 순서가 중요함 (구체적 → 일반적)");
console.log("  3. 너무 많은 오버로드는 복잡도 증가");
console.log("  4. 가능하면 유니온 타입이나 제네릭 고려");

// ============================================
// 10. 모범 사례
// ============================================

console.log("\n--- 10. 오버로딩 사용 시점 ---\n");

console.log("✅ 오버로딩이 적합한 경우:");
console.log("  - 입력 타입에 따라 반환 타입이 명확히 다름");
console.log("  - 매개변수 개수가 다른 경우");
console.log("  - API의 다양한 사용 패턴 지원");
console.log("  - 타입 추론을 정확하게 하고 싶을 때");

console.log("\n❌ 오버로딩을 피해야 할 경우:");
console.log("  - 유니온 타입으로 충분한 경우");
console.log("  - 오버로드가 너무 많아지는 경우");
console.log("  - 단순한 타입 좁히기로 해결 가능한 경우");

console.log("\n💡 Tip: 오버로딩은 명확한 타입 안정성이 필요할 때 사용하세요!");
