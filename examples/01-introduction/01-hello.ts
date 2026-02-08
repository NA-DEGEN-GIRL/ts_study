/**
 * Chapter 01 - Introduction to TypeScript
 * 01-hello.ts - 첫 번째 TypeScript 프로그램
 *
 * 이 파일에서 배울 내용:
 * - TypeScript의 기본 문법과 타입 (Type) 시스템
 * - 변수 선언 시 타입 지정 방법
 * - 타입 안정성 (Type Safety)이 주는 이점
 * - 함수의 매개변수와 반환 타입 (Return Type) 지정
 */

// ============================================
// 1. 기본 변수 선언과 타입 지정
// ============================================

// 명시적 타입 지정
const greeting: string = "안녕하세요, TypeScript!";
const version: number = 5.0;
const isStrict: boolean = true;

console.log("=== 첫 번째 TypeScript 프로그램 ===\n");
console.log(`인사말: ${greeting}`);
console.log(`버전: ${version}`);
console.log(`Strict 모드: ${isStrict}\n`);

// ============================================
// 2. 타입 안정성 (Type Safety) - 잘못된 타입 할당을 컴파일 단계에서 방지
// ============================================

// TypeScript는 컴파일 타임 (Compile Time)에 타입 오류를 잡아냅니다
// 왜 필요한가? 런타임 에러를 미리 방지하여 더 안전한 코드 작성 가능
let username: string = "김철수";
// username = 123; // ❌ Error: Type 'number' is not assignable to type 'string'

console.log("=== 타입 안정성 예제 ===\n");
console.log(`사용자 이름: ${username}`);

// ============================================
// 3. 함수의 타입 지정
// ============================================

// 매개변수와 반환 타입을 명시
function add(a: number, b: number): number {
  return a + b;
}

function greet(name: string): string {
  return `안녕하세요, ${name}님!`;
}

console.log("=== 함수 타입 지정 ===\n");
console.log(`5 + 3 = ${add(5, 3)}`);
console.log(greet("박영희"));

// ============================================
// 4. 타입 추론 (Type Inference) - 값을 보고 자동으로 타입을 결정
// ============================================

// TypeScript는 값으로부터 타입을 자동으로 추론합니다
// 왜 필요한가? 타입을 일일이 작성하지 않아도 타입 안정성 확보
let inferredString = "타입이 자동으로 추론됩니다"; // string으로 추론
let inferredNumber = 42; // number로 추론
let inferredBoolean = true; // boolean으로 추론

console.log("\n=== 타입 추론 ===\n");
console.log(`추론된 문자열: ${inferredString}`);
console.log(`추론된 숫자: ${inferredNumber}`);
console.log(`추론된 불린: ${inferredBoolean}`);

// ============================================
// 5. 객체 타입
// ============================================

// 객체의 구조를 타입으로 정의
const person: {
  name: string;
  age: number;
  email: string;
} = {
  name: "이지은",
  age: 28,
  email: "jieun@example.com"
};

console.log("\n=== 객체 타입 ===\n");
console.log(`이름: ${person.name}, 나이: ${person.age}, 이메일: ${person.email}`);

console.log("\n✅ TypeScript 프로그램이 성공적으로 실행되었습니다!");
