/**
 * Chapter 01 - Introduction to TypeScript
 * 03-compiler-options.ts - 컴파일러 옵션과 Strict 모드
 *
 * TypeScript 컴파일러 옵션, 특히 strict 모드가 무엇을 체크하는지 배웁니다.
 * tsconfig.json의 "strict: true"가 활성화하는 여러 옵션들을 실습합니다.
 */

console.log("=== TypeScript Strict 모드 데모 ===\n");

// ============================================
// 1. noImplicitAny - 암묵적 any 금지
// ============================================

console.log("--- 1. noImplicitAny ---");
console.log("암묵적 any 타입을 허용하지 않습니다.\n");

// ❌ strict 모드에서는 에러
// function log(message) { // Error: Parameter 'message' implicitly has an 'any' type
//   console.log(message);
// }

// ✅ 올바른 방법: 타입 명시
function log(message: string): void {
  console.log(`로그: ${message}`);
}

log("타입이 명시된 함수 호출");

// ============================================
// 2. strictNullChecks - null과 undefined 엄격 체크
// ============================================

console.log("\n--- 2. strictNullChecks ---");
console.log("null과 undefined를 다른 타입에 할당할 수 없습니다.\n");

let username: string = "홍길동";
// username = null; // ❌ Error: Type 'null' is not assignable to type 'string'

// ✅ null을 허용하려면 명시적으로 유니온 타입 사용
let nullableUsername: string | null = "김영희";
console.log(`Nullable 변수: ${nullableUsername}`);

// null 체크 후 안전하게 사용
if (nullableUsername !== null) {
  console.log(`이름 길이: ${nullableUsername.length}`);
}

nullableUsername = null; // null 할당 허용됨
if (nullableUsername === null) {
  console.log("이름이 null로 설정되었습니다.");
}

// ============================================
// 3. strictFunctionTypes - 함수 타입 엄격 체크
// ============================================

console.log("\n--- 3. strictFunctionTypes ---");
console.log("함수 매개변수의 반공변성을 엄격하게 체크합니다.\n");

type Logger = (message: string | number) => void;

const stringLogger: Logger = (message) => {
  console.log(`메시지: ${message}`);
};

stringLogger("문자열 로그");
stringLogger(12345);

// ============================================
// 4. noImplicitThis - 암묵적 this 금지
// ============================================

console.log("\n--- 4. noImplicitThis ---");
console.log("this의 타입을 명시해야 합니다.\n");

interface Person {
  name: string;
  greet(this: Person): void;
}

const person: Person = {
  name: "이철수",
  greet(this: Person) {
    console.log(`안녕하세요, 저는 ${this.name}입니다.`);
  }
};

person.greet();

// ============================================
// 5. alwaysStrict - "use strict" 자동 추가
// ============================================

console.log("\n--- 5. alwaysStrict ---");
console.log("모든 파일에 'use strict'를 자동으로 추가합니다.\n");
console.log("✅ JavaScript 엄격 모드가 활성화됩니다.");

// ============================================
// 6. strictBindCallApply - bind/call/apply 엄격 체크
// ============================================

console.log("\n--- 6. strictBindCallApply ---");
console.log("bind, call, apply의 타입을 엄격하게 체크합니다.\n");

function multiply(a: number, b: number): number {
  return a * b;
}

// ✅ 올바른 타입으로 호출
const result = multiply.call(null, 5, 3);
console.log(`multiply.call(null, 5, 3) = ${result}`);

// ❌ 잘못된 타입으로 호출하면 에러
// multiply.call(null, "5", "3"); // Error

// ============================================
// 7. strictPropertyInitialization - 속성 초기화 체크
// ============================================

console.log("\n--- 7. strictPropertyInitialization ---");
console.log("클래스 속성이 생성자에서 초기화되는지 체크합니다.\n");

class User {
  name: string; // 반드시 초기화되어야 함
  age: number;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }
}

const user = new User("박민지", 25);
console.log(`사용자: ${user.name}, 나이: ${user.age}`);

// ============================================
// 8. Strict 모드의 이점
// ============================================

console.log("\n=== Strict 모드의 이점 ===\n");
console.log("✅ 런타임 에러를 컴파일 타임에 미리 발견");
console.log("✅ null/undefined 관련 버그 예방");
console.log("✅ 타입 안정성 극대화");
console.log("✅ 코드 품질과 유지보수성 향상");
console.log("✅ IDE 자동완성과 리팩토링 지원 강화");

console.log("\n💡 권장사항: 새 프로젝트는 항상 strict: true로 시작하세요!");
