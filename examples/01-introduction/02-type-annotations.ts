/**
 * Chapter 01 - Introduction to TypeScript
 * 02-type-annotations.ts - 타입 표기와 타입 추론
 *
 * 명시적 타입 표기(Type Annotations)와 타입 추론(Type Inference)의 차이를 배웁니다.
 * 언제 타입을 명시하고, 언제 추론에 의존해야 하는지 알아봅니다.
 */

console.log("=== 타입 표기 vs 타입 추론 ===\n");

// ============================================
// 1. 명시적 타입 표기 (Explicit Type Annotations)
// ============================================

// 변수 선언 시 타입을 명시적으로 지정
let explicitString: string = "명시적 타입 지정";
let explicitNumber: number = 100;
let explicitBoolean: boolean = false;
let explicitArray: number[] = [1, 2, 3, 4, 5];

console.log("--- 명시적 타입 표기 ---");
console.log(`문자열: ${explicitString}`);
console.log(`숫자: ${explicitNumber}`);
console.log(`배열: [${explicitArray.join(", ")}]\n`);

// ============================================
// 2. 타입 추론 (Type Inference)
// ============================================

// TypeScript가 초기값으로부터 타입을 자동으로 추론
let inferredString = "타입 추론"; // string
let inferredNumber = 200; // number
let inferredBoolean = true; // boolean
let inferredArray = [10, 20, 30]; // number[]

console.log("--- 타입 추론 ---");
console.log(`문자열: ${inferredString}`);
console.log(`숫자: ${inferredNumber}`);
console.log(`배열: [${inferredArray.join(", ")}]\n`);

// ============================================
// 3. 함수의 타입 표기
// ============================================

// 매개변수와 반환 타입을 명시
function calculateArea(width: number, height: number): number {
  return width * height;
}

// 반환 타입은 추론 가능하지만, 명시하는 것이 좋은 관례
function multiply(a: number, b: number): number {
  return a * b;
}

console.log("--- 함수 타입 표기 ---");
console.log(`면적 (5 x 3): ${calculateArea(5, 3)}`);
console.log(`곱셈 (7 x 8): ${multiply(7, 8)}\n`);

// ============================================
// 4. 화살표 함수의 타입 표기
// ============================================

// 화살표 함수에서도 동일하게 타입 지정
const divide = (a: number, b: number): number => {
  return a / b;
};

const greetUser = (name: string): string => `안녕하세요, ${name}님!`;

console.log("--- 화살표 함수 ---");
console.log(`나눗셈 (100 / 4): ${divide(100, 4)}`);
console.log(greetUser("최민수"));
console.log();

// ============================================
// 5. 타입 표기가 필요한 경우
// ============================================

// 초기값이 없는 경우 반드시 타입 표기 필요
let notInitialized: string;
notInitialized = "나중에 초기화";

// 타입을 명시하지 않으면 any로 추론될 수 있음 (strict 모드에서는 에러)
// let noType; // ❌ strict 모드에서는 에러

console.log("--- 타입 표기가 필요한 경우 ---");
console.log(`나중에 초기화된 변수: ${notInitialized}\n`);

// ============================================
// 6. 복잡한 타입의 표기
// ============================================

// 유니온 타입 (여러 타입 중 하나)
let mixed: string | number;
mixed = "문자열";
console.log("--- 유니온 타입 ---");
console.log(`mixed = ${mixed} (타입: string)`);
mixed = 42;
console.log(`mixed = ${mixed} (타입: number)\n`);

// 배열의 타입 표기
let stringArray: string[] = ["사과", "바나나", "체리"];
let numberArray: Array<number> = [1, 2, 3]; // 제네릭 문법

console.log("--- 배열 타입 ---");
console.log(`과일 배열: [${stringArray.join(", ")}]`);
console.log(`숫자 배열: [${numberArray.join(", ")}]\n`);

// ============================================
// 7. 모범 사례 (Best Practices)
// ============================================

console.log("=== 모범 사례 ===\n");
console.log("✅ 함수 매개변수: 항상 타입 명시");
console.log("✅ 함수 반환 타입: 명시 권장 (문서화 + 안정성)");
console.log("✅ 변수 초기화: 추론 활용 가능");
console.log("✅ 복잡한 타입: 명시적으로 표기");
console.log("✅ 공개 API: 모든 타입 명시");
