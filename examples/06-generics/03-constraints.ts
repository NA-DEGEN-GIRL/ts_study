/**
 * Chapter 06 - Generics
 * 03-constraints.ts - 제네릭 제약 조건
 *
 * 이 파일에서 배울 내용:
 * - 제네릭 제약 (Generic Constraint) - extends 키워드로 타입 매개변수 제한
 * - keyof 연산자 - 객체의 모든 키를 유니온 (Union) 타입으로 추출
 * - 타입 안전한 속성 접근 - K extends keyof T 패턴
 * - 생성자 타입 (Constructor Type) - new (...args: any[]) => T 패턴
 * 왜 필요한가? 제네릭 타입이 특정 속성이나 메서드를 가지도록 보장
 */

console.log("=== 제네릭 제약 조건 (Generic Constraints) ===\n");

// ============================================
// 1. 기본 제약 조건
// ============================================

console.log("--- 1. 기본 제약 조건 (extends) ---\n");

// 제약 없음 - 모든 타입 허용
function identity<T>(arg: T): T {
  return arg;
}

// length 속성이 있는 타입만 허용
interface Lengthwise {
  length: number;
}

function logLength<T extends Lengthwise>(arg: T): void {
  console.log(`  길이: ${arg.length}`);
}

logLength("hello"); // string은 length 속성이 있음
logLength([1, 2, 3, 4]); // 배열도 length 속성이 있음
logLength({ length: 10, value: "test" }); // length 속성을 가진 객체

// logLength(123); // ❌ Error: number는 length 속성이 없음

// ============================================
// 2. 객체 키 제약
// ============================================

console.log("\n--- 2. keyof 제약 조건 ---\n");

// K는 T의 키 중 하나여야 함
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const user = {
  id: 1,
  name: "김철수",
  email: "kim@example.com",
  age: 30
};

console.log(`id: ${getProperty(user, "id")}`);
console.log(`name: ${getProperty(user, "name")}`);
console.log(`email: ${getProperty(user, "email")}`);

// getProperty(user, "address"); // ❌ Error: 'address'는 user의 키가 아님

// ============================================
// 3. 다중 제약 조건
// ============================================

console.log("\n--- 3. 다중 제약 조건 ---\n");

interface Named {
  name: string;
}

interface Aged {
  age: number;
}

// T는 Named와 Aged 모두를 만족해야 함
function introduce<T extends Named & Aged>(person: T): void {
  console.log(`  ${person.name}, ${person.age}세`);
}

const person1 = { name: "이영희", age: 28, email: "lee@example.com" };
introduce(person1);

// introduce({ name: "홍길동" }); // ❌ Error: age가 없음

// ============================================
// 4. 클래스 타입 제약
// ============================================

console.log("\n--- 4. 클래스 타입 제약 ---\n");

class Animal {
  constructor(public name: string) {}
}

class Dog extends Animal {
  bark(): void {
    console.log(`  ${this.name}: 멍멍!`);
  }
}

class Cat extends Animal {
  meow(): void {
    console.log(`  ${this.name}: 야옹~`);
  }
}

// T는 Animal 클래스 또는 그 서브클래스여야 함
function createAnimal<T extends Animal>(
  AnimalClass: new (name: string) => T,
  name: string
): T {
  return new AnimalClass(name);
}

const dog = createAnimal(Dog, "멍멍이");
dog.bark();

const cat = createAnimal(Cat, "야옹이");
cat.meow();

// ============================================
// 5. 배열 제약
// ============================================

console.log("\n--- 5. 배열 제약 조건 ---\n");

// T[]를 제약으로 사용
function getFirstTwo<T>(arr: T[]): [T, T] | undefined {
  if (arr.length < 2) {
    return undefined;
  }
  return [arr[0], arr[1]];
}

const numbers = [1, 2, 3, 4, 5];
const words = ["hello", "world", "typescript"];

console.log(`첫 두 숫자:`, getFirstTwo(numbers));
console.log(`첫 두 단어:`, getFirstTwo(words));

// 최소 길이를 가진 배열
function requireMinLength<T, N extends number>(
  arr: T[],
  minLength: N
): arr is T[] & { length: N } {
  return arr.length >= minLength;
}

const shortArray = [1, 2];
const longArray = [1, 2, 3, 4, 5];

if (requireMinLength(longArray, 3)) {
  console.log(`배열이 최소 길이를 만족합니다: ${longArray.length}개`);
}

// ============================================
// 6. 함수 타입 제약
// ============================================

console.log("\n--- 6. 함수 타입 제약 ---\n");

// T는 함수 타입이어야 함
function callTwice<T extends (...args: any[]) => any>(
  fn: T,
  ...args: Parameters<T>
): void {
  fn(...args);
  fn(...args);
}

function greet(name: string): void {
  console.log(`  안녕하세요, ${name}님!`);
}

function add(a: number, b: number): number {
  console.log(`  ${a} + ${b} = ${a + b}`);
  return a + b;
}

callTwice(greet, "김철수");
callTwice(add, 5, 3);

// ============================================
// 7. 생성자 제약
// ============================================

console.log("\n--- 7. 생성자 제약 ---\n");

interface Constructable<T> {
  new (...args: any[]): T;
}

function createInstances<T>(
  Constructor: Constructable<T>,
  count: number
): T[] {
  const instances: T[] = [];
  for (let i = 0; i < count; i++) {
    instances.push(new Constructor());
  }
  return instances;
}

class Counter {
  private static count = 0;
  public id: number;

  constructor() {
    this.id = ++Counter.count;
  }
}

const counters = createInstances(Counter, 3);
counters.forEach((c) => console.log(`  Counter ID: ${c.id}`));

// ============================================
// 8. 재귀적 제약
// ============================================

console.log("\n--- 8. 재귀적 제약 ---\n");

interface TreeNode<T> {
  value: T;
  children?: TreeNode<T>[];
}

function printTree<T>(node: TreeNode<T>, depth = 0): void {
  const indent = "  ".repeat(depth);
  console.log(`${indent}- ${node.value}`);

  if (node.children) {
    node.children.forEach((child) => printTree(child, depth + 1));
  }
}

const tree: TreeNode<string> = {
  value: "root",
  children: [
    {
      value: "child1",
      children: [{ value: "grandchild1" }, { value: "grandchild2" }]
    },
    { value: "child2" }
  ]
};

printTree(tree);

// ============================================
// 9. 유니온 타입 제약
// ============================================

console.log("\n--- 9. 유니온 타입 제약 ---\n");

type Primitive = string | number | boolean;

function wrapPrimitive<T extends Primitive>(value: T): { value: T; type: string } {
  return {
    value,
    type: typeof value
  };
}

console.log(`wrapPrimitive(42):`, wrapPrimitive(42));
console.log(`wrapPrimitive("hello"):`, wrapPrimitive("hello"));
console.log(`wrapPrimitive(true):`, wrapPrimitive(true));

// wrapPrimitive({}); // ❌ Error: 객체는 Primitive가 아님

// ============================================
// 10. 실용 예제: 정렬 가능한 배열
// ============================================

console.log("\n--- 10. 실용 예제: 정렬 ---\n");

interface Comparable {
  compareTo(other: this): number;
}

class Version implements Comparable {
  constructor(private major: number, private minor: number) {}

  compareTo(other: Version): number {
    if (this.major !== other.major) {
      return this.major - other.major;
    }
    return this.minor - other.minor;
  }

  toString(): string {
    return `v${this.major}.${this.minor}`;
  }
}

function sort<T extends Comparable>(items: T[]): T[] {
  return items.slice().sort((a, b) => a.compareTo(b));
}

const versions = [
  new Version(2, 1),
  new Version(1, 0),
  new Version(2, 0),
  new Version(1, 5)
];

const sorted = sort(versions);
console.log("정렬된 버전:", sorted.map((v) => v.toString()).join(", "));

// ============================================
// 11. 실용 예제: 부분 업데이트
// ============================================

console.log("\n--- 11. 부분 업데이트 ---\n");

function updateObject<T extends object, K extends keyof T>(
  obj: T,
  key: K,
  value: T[K]
): T {
  return { ...obj, [key]: value };
}

const original = {
  id: 1,
  name: "홍길동",
  email: "hong@example.com",
  age: 30
};

const updated1 = updateObject(original, "name", "김철수");
const updated2 = updateObject(original, "age", 31);

console.log(`원본:`, original);
console.log(`이름 변경:`, updated1);
console.log(`나이 변경:`, updated2);

// ============================================
// 12. 모범 사례
// ============================================

console.log("\n--- 12. 제약 조건 사용 가이드 ---\n");

console.log("✅ 제약 조건 사용 시점:");
console.log("  - 특정 속성이나 메서드가 필요할 때");
console.log("  - 타입 안정성을 높이고 싶을 때");
console.log("  - 객체 키에 안전하게 접근할 때");
console.log("  - 클래스 계층 구조에서 작업할 때");

console.log("\n✅ 제약 조건 종류:");
console.log("  - extends Interface: 특정 구조 요구");
console.log("  - extends keyof: 객체 키 제한");
console.log("  - extends Class: 클래스 계층 제한");
console.log("  - extends 유니온: 허용 타입 제한");

console.log("\n💡 Tip: 적절한 제약으로 타입 안정성과 유연성의 균형을 맞추세요!");
