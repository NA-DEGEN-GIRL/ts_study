/**
 * Chapter 07-03: 타입 서술어 (Type Predicates)
 *
 * 사용자 정의 타입 가드 함수를 만들어 복잡한 타입 체크를 수행합니다.
 * `value is Type` 문법을 사용하여 타입을 명시적으로 좁힙니다.
 */

console.log("=== 타입 서술어 예제 ===\n");

// 기본 타입 서술어
function isString(value: unknown): value is string {
  return typeof value === "string";
}

function isNumber(value: unknown): value is number {
  return typeof value === "number";
}

function processUnknown(value: unknown): string {
  if (isString(value)) {
    // TypeScript가 value를 string으로 인식
    return `문자열: ${value.toUpperCase()}`;
  } else if (isNumber(value)) {
    // TypeScript가 value를 number로 인식
    return `숫자: ${value.toFixed(2)}`;
  } else {
    return "알 수 없는 타입";
  }
}

console.log("1. 기본 타입 서술어:");
console.log("  processUnknown('hello'):", processUnknown("hello"));
console.log("  processUnknown(42.5):", processUnknown(42.5));
console.log("  processUnknown(true):", processUnknown(true));
console.log();

// 객체 타입 서술어
interface User {
  name: string;
  email: string;
}

interface Admin {
  name: string;
  email: string;
  permissions: string[];
}

function isAdmin(user: User | Admin): user is Admin {
  return "permissions" in user;
}

function greetUser(user: User | Admin): string {
  if (isAdmin(user)) {
    // user는 Admin 타입
    return `관리자 ${user.name} (권한: ${user.permissions.join(", ")})`;
  } else {
    // user는 User 타입
    return `일반 사용자 ${user.name}`;
  }
}

console.log("2. 객체 타입 서술어:");
const regularUser: User = { name: "김철수", email: "kim@example.com" };
const adminUser: Admin = {
  name: "이영희",
  email: "lee@example.com",
  permissions: ["read", "write", "delete"]
};

console.log("  ", greetUser(regularUser));
console.log("  ", greetUser(adminUser));
console.log();

// 배열 필터링에서의 타입 서술어
interface Success {
  status: "success";
  data: string;
}

interface Failure {
  status: "failure";
  error: string;
}

type Result = Success | Failure;

function isSuccess(result: Result): result is Success {
  return result.status === "success";
}

console.log("3. 배열 필터링:");
const results: Result[] = [
  { status: "success", data: "데이터 1" },
  { status: "failure", error: "오류 발생" },
  { status: "success", data: "데이터 2" },
  { status: "failure", error: "연결 실패" }
];

// filter와 타입 서술어를 함께 사용
const successes: Success[] = results.filter(isSuccess);
console.log("  성공한 결과:");
successes.forEach(s => console.log(`    - ${s.data}`));
console.log();

// null/undefined 체크 타입 서술어
function isNotNull<T>(value: T | null | undefined): value is T {
  return value !== null && value !== undefined;
}

console.log("4. null/undefined 필터링:");
const mixedArray: (string | null | undefined)[] = [
  "TypeScript",
  null,
  "JavaScript",
  undefined,
  "Python"
];

const validValues: string[] = mixedArray.filter(isNotNull);
console.log("  원본 배열 길이:", mixedArray.length);
console.log("  유효한 값:", validValues);
console.log("  유효한 값 길이:", validValues.length);
