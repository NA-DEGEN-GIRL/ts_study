/**
 * Chapter 06 - Generics
 * 01-generic-functions.ts - 제네릭 함수
 *
 * 제네릭 함수의 기본 개념과 사용법을 학습합니다.
 * 타입 매개변수를 사용하여 재사용 가능한 함수를 작성합니다.
 */

console.log("=== 제네릭 함수 (Generic Functions) ===\n");

// ============================================
// 1. 기본 제네릭 함수
// ============================================

console.log("--- 1. 기본 제네릭 함수 ---\n");

// 제네릭이 없는 함수 - 타입마다 중복 필요
function identityNumber(arg: number): number {
  return arg;
}

function identityString(arg: string): string {
  return arg;
}

// 제네릭 함수 - 모든 타입에 대응
function identity<T>(arg: T): T {
  return arg;
}

// 타입 추론
console.log(`identity(42): ${identity(42)}`);
console.log(`identity("hello"): ${identity("hello")}`);
console.log(`identity(true): ${identity(true)}`);

// 명시적 타입 지정
console.log(`identity<number>(100): ${identity<number>(100)}`);
console.log(`identity<string>("TypeScript"): ${identity<string>("TypeScript")}`);

// ============================================
// 2. 배열과 제네릭
// ============================================

console.log("\n--- 2. 배열 제네릭 함수 ---\n");

function getFirstElement<T>(arr: T[]): T | undefined {
  return arr[0];
}

const numbers = [1, 2, 3, 4, 5];
const fruits = ["사과", "바나나", "체리"];
const booleans = [true, false, true];

console.log(`첫 번째 숫자: ${getFirstElement(numbers)}`);
console.log(`첫 번째 과일: ${getFirstElement(fruits)}`);
console.log(`첫 번째 불린: ${getFirstElement(booleans)}`);

function getLastElement<T>(arr: T[]): T | undefined {
  return arr[arr.length - 1];
}

console.log(`마지막 숫자: ${getLastElement(numbers)}`);
console.log(`마지막 과일: ${getLastElement(fruits)}`);

// ============================================
// 3. 다중 타입 매개변수
// ============================================

console.log("\n--- 3. 다중 타입 매개변수 ---\n");

function pair<T, U>(first: T, second: U): [T, U] {
  return [first, second];
}

const pair1 = pair("이름", 30);
const pair2 = pair(100, "점수");
const pair3 = pair(true, false);

console.log(`pair1:`, pair1);
console.log(`pair2:`, pair2);
console.log(`pair3:`, pair3);

function merge<T, U>(obj1: T, obj2: U): T & U {
  return { ...obj1, ...obj2 };
}

const merged = merge({ name: "김철수" }, { age: 30 });
console.log(`merged:`, merged);
console.log(`  이름: ${merged.name}, 나이: ${merged.age}`);

// ============================================
// 4. 제네릭 배열 유틸리티
// ============================================

console.log("\n--- 4. 배열 유틸리티 함수 ---\n");

function map<T, U>(arr: T[], transformer: (item: T) => U): U[] {
  return arr.map(transformer);
}

const nums = [1, 2, 3, 4, 5];
const doubled = map(nums, (n) => n * 2);
const stringified = map(nums, (n) => `#${n}`);

console.log(`원본: [${nums.join(", ")}]`);
console.log(`2배: [${doubled.join(", ")}]`);
console.log(`문자열: [${stringified.join(", ")}]`);

function filter<T>(arr: T[], predicate: (item: T) => boolean): T[] {
  return arr.filter(predicate);
}

const evens = filter(nums, (n) => n % 2 === 0);
const longWords = filter(["hi", "hello", "hey", "goodbye"], (w) => w.length > 3);

console.log(`짝수: [${evens.join(", ")}]`);
console.log(`긴 단어: [${longWords.join(", ")}]`);

// ============================================
// 5. 제네릭 함수와 객체
// ============================================

console.log("\n--- 5. 객체 제네릭 함수 ---\n");

function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const user = {
  id: 1,
  name: "이영희",
  email: "lee@example.com",
  age: 28
};

console.log(`id: ${getProperty(user, "id")}`);
console.log(`name: ${getProperty(user, "name")}`);
console.log(`email: ${getProperty(user, "email")}`);

// ============================================
// 6. 제네릭 화살표 함수
// ============================================

console.log("\n--- 6. 제네릭 화살표 함수 ---\n");

const reverse = <T>(arr: T[]): T[] => {
  return arr.slice().reverse();
};

const toArray = <T>(...args: T[]): T[] => {
  return args;
}

console.log(`reverse([1, 2, 3]):`, reverse([1, 2, 3]));
console.log(`reverse(["a", "b", "c"]):`, reverse(["a", "b", "c"]));
console.log(`toArray(1, 2, 3):`, toArray(1, 2, 3));
console.log(`toArray("a", "b", "c"):`, toArray("a", "b", "c"));

// ============================================
// 7. 제네릭 타입 별칭으로 함수 타입 정의
// ============================================

console.log("\n--- 7. 제네릭 함수 타입 ---\n");

type TransformFn<T, U> = (input: T) => U;
type Predicate<T> = (item: T) => boolean;

const toUpperCase: TransformFn<string, string> = (s) => s.toUpperCase();
const toLength: TransformFn<string, number> = (s) => s.length;
const isPositive: Predicate<number> = (n) => n > 0;

console.log(`toUpperCase("hello"): ${toUpperCase("hello")}`);
console.log(`toLength("TypeScript"): ${toLength("TypeScript")}`);
console.log(`isPositive(5): ${isPositive(5)}`);
console.log(`isPositive(-3): ${isPositive(-3)}`);

// ============================================
// 8. 실용 예제: API 응답 처리
// ============================================

console.log("\n--- 8. API 응답 처리 ---\n");

interface ApiResponse<T> {
  status: number;
  data: T;
  message: string;
}

function processResponse<T>(response: ApiResponse<T>): void {
  console.log(`  상태: ${response.status} - ${response.message}`);
  console.log(`  데이터:`, response.data);
}

interface User {
  id: number;
  name: string;
  email: string;
}

interface Product {
  id: number;
  name: string;
  price: number;
}

const userResponse: ApiResponse<User> = {
  status: 200,
  message: "성공",
  data: { id: 1, name: "홍길동", email: "hong@example.com" }
};

const productResponse: ApiResponse<Product[]> = {
  status: 200,
  message: "성공",
  data: [
    { id: 1, name: "노트북", price: 1500000 },
    { id: 2, name: "마우스", price: 30000 }
  ]
};

processResponse(userResponse);
console.log();
processResponse(productResponse);

// ============================================
// 9. 실용 예제: 캐시 시스템
// ============================================

console.log("\n--- 9. 캐시 시스템 ---\n");

function createCache<K, V>(): {
  get: (key: K) => V | undefined;
  set: (key: K, value: V) => void;
  has: (key: K) => boolean;
  clear: () => void;
} {
  const cache = new Map<K, V>();

  return {
    get: (key: K) => cache.get(key),
    set: (key: K, value: V) => cache.set(key, value),
    has: (key: K) => cache.has(key),
    clear: () => cache.clear()
  };
}

const stringCache = createCache<string, number>();
stringCache.set("one", 1);
stringCache.set("two", 2);

console.log(`stringCache.get("one"): ${stringCache.get("one")}`);
console.log(`stringCache.has("three"): ${stringCache.has("three")}`);

const userCache = createCache<number, User>();
userCache.set(1, { id: 1, name: "김철수", email: "kim@example.com" });

console.log(`userCache.get(1):`, userCache.get(1));

// ============================================
// 10. 제네릭 함수의 타입 추론
// ============================================

console.log("\n--- 10. 타입 추론 ---\n");

function wrapInArray<T>(value: T): T[] {
  return [value];
}

// 타입 추론으로 자동 결정
const arr1 = wrapInArray(42); // number[]
const arr2 = wrapInArray("hello"); // string[]
const arr3 = wrapInArray({ x: 10, y: 20 }); // { x: number; y: number }[]

console.log(`arr1:`, arr1);
console.log(`arr2:`, arr2);
console.log(`arr3:`, arr3);

// ============================================
// 11. 모범 사례
// ============================================

console.log("\n--- 11. 제네릭 함수 사용 가이드 ---\n");

console.log("✅ 제네릭 함수 사용 시점:");
console.log("  - 여러 타입에서 동작하는 함수");
console.log("  - 타입 안정성을 유지하면서 재사용");
console.log("  - 배열, 컬렉션 유틸리티");
console.log("  - API 응답 처리");
console.log("  - 데이터 변환 함수");

console.log("\n💡 Tip: 제네릭으로 타입 안전한 재사용 가능한 함수를 만드세요!");
