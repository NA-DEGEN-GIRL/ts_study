/**
 * Chapter 02 - Basic Types
 * 01-primitives.ts - 기본 타입들 (Primitive Types)
 *
 * 이 파일에서 배울 내용:
 * - 기본 타입 (Primitive Type) - string, number, boolean
 * - 템플릿 리터럴 (Template Literal) - 백틱(`)으로 문자열 보간
 * - 다양한 진법 표현 - 16진수(0x), 2진수(0b), 8진수(0o)
 * - 타입 변환 (Type Conversion) - Number(), String(), toString()
 * 왜 필요한가? 값의 타입을 명확히 하여 의도하지 않은 연산 방지
 */

console.log("=== TypeScript 기본 타입 (Primitives) ===\n");

// ============================================
// 1. String 타입
// ============================================

console.log("--- 1. String 타입 ---\n");

let firstName: string = "김";
let lastName: string = "철수";
let fullName: string = `${firstName}${lastName}`; // 템플릿 리터럴

console.log(`이름: ${fullName}`);
console.log(`이름 길이: ${fullName.length}자`);

// 여러 줄 문자열
let multiLine: string = `
  첫 번째 줄
  두 번째 줄
  세 번째 줄
`;
console.log(`여러 줄 문자열:${multiLine}`);

// ============================================
// 2. Number 타입
// ============================================

console.log("\n--- 2. Number 타입 ---\n");

// 정수, 실수 모두 number 타입
let integer: number = 42;
let float: number = 3.14159;
let negative: number = -100;

// 다양한 진법 표현
let decimal: number = 255;
let hex: number = 0xff; // 16진수
let binary: number = 0b11111111; // 2진수
let octal: number = 0o377; // 8진수

console.log(`정수: ${integer}`);
console.log(`실수: ${float}`);
console.log(`음수: ${negative}`);
console.log(`진법 변환 (10진수 → 16진수, 2진수): ${decimal} = 0x${hex.toString(16)} = 0b${binary.toString(2)}`);

// 특수한 숫자 값
let infinity: number = Infinity;
let notANumber: number = NaN;

console.log(`무한대: ${infinity}`);
console.log(`NaN: ${notANumber}`);

// 수학 연산
let sum: number = 10 + 20;
let product: number = 5 * 6;
let quotient: number = 100 / 4;

console.log(`덧셈: 10 + 20 = ${sum}`);
console.log(`곱셈: 5 × 6 = ${product}`);
console.log(`나눗셈: 100 ÷ 4 = ${quotient}`);

// ============================================
// 3. Boolean 타입
// ============================================

console.log("\n--- 3. Boolean 타입 ---\n");

let isStudent: boolean = true;
let isGraduated: boolean = false;

console.log(`학생 여부: ${isStudent}`);
console.log(`졸업 여부: ${isGraduated}`);

// 비교 연산의 결과는 boolean
let isAdult: boolean = 25 >= 18;
let isEqual: boolean = "hello" === "hello";

console.log(`성인 여부 (25 >= 18): ${isAdult}`);
console.log(`문자열 비교 ("hello" === "hello"): ${isEqual}`);

// 논리 연산
let canVote: boolean = isAdult && !isGraduated;
console.log(`투표 가능 여부: ${canVote}`);

// ============================================
// 4. 타입 안정성 예제
// ============================================

console.log("\n--- 4. 타입 안정성 ---\n");

let age: number = 30;
// age = "thirty"; // ❌ Error: Type 'string' is not assignable to type 'number'

let message: string = "안녕하세요";
// message = 123; // ❌ Error: Type 'number' is not assignable to type 'string'

console.log("✅ 타입이 다른 값을 할당하면 컴파일 에러 발생");
console.log("✅ 런타임 전에 타입 오류를 발견할 수 있습니다");

// ============================================
// 5. 타입 변환
// ============================================

console.log("\n--- 5. 타입 변환 ---\n");

// String → Number
let strNumber: string = "42";
let convertedNumber: number = Number(strNumber);
let parsedInt: number = parseInt(strNumber);

console.log(`문자열 "${strNumber}" → 숫자 ${convertedNumber}`);
console.log(`parseInt: ${parsedInt}`);

// Number → String
let num: number = 123;
let convertedString: string = num.toString();
let templateString: string = `${num}`;

console.log(`숫자 ${num} → 문자열 "${convertedString}"`);
console.log(`템플릿 리터럴: "${templateString}"`);

// Boolean → String
let flag: boolean = true;
let flagString: string = flag.toString();

console.log(`Boolean ${flag} → 문자열 "${flagString}"`);

console.log("\n✅ 기본 타입 학습 완료!");
