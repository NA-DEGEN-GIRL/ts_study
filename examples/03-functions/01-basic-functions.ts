/**
 * Chapter 03 - Functions
 * 01-basic-functions.ts - 함수의 기본
 *
 * 이 파일에서 배울 내용:
 * - 함수 타입 지정 - 매개변수 (Parameter)와 반환 타입 (Return Type) 명시
 * - 화살표 함수 (Arrow Function) - 간결한 함수 표현식
 * - void 타입 - 반환값이 없는 함수
 * - 함수 타입 별칭 (Type Alias) - 재사용 가능한 함수 시그니처
 * - 고차 함수 (Higher-Order Function) - 함수를 받거나 반환하는 함수
 */

console.log("=== TypeScript 함수의 기본 ===\n");

// ============================================
// 1. 기본 함수 선언
// ============================================

console.log("--- 1. 함수 선언 ---\n");

// 매개변수와 반환 타입 명시
function add(a: number, b: number): number {
  return a + b;
}

function greet(name: string): string {
  return `안녕하세요, ${name}님!`;
}

console.log(`덧셈 결과: 5 + 3 = ${add(5, 3)}`);
console.log(`인사 메시지: ${greet("김철수")}`);

// ============================================
// 2. 반환 타입 추론
// ============================================

console.log("\n--- 2. 반환 타입 추론 ---\n");

// 반환 타입을 명시하지 않아도 추론 가능
function multiply(a: number, b: number) {
  return a * b; // number로 추론됨
}

// 하지만 명시하는 것이 좋은 관례
function divide(a: number, b: number): number {
  return a / b;
}

console.log(`곱셈 결과: 6 × 7 = ${multiply(6, 7)}`);
console.log(`나눗셈 결과: 100 ÷ 4 = ${divide(100, 4)}`);

// ============================================
// 3. 화살표 함수 (Arrow Functions)
// ============================================

console.log("\n--- 3. 화살표 함수 ---\n");

// 기본 화살표 함수
const subtract = (a: number, b: number): number => {
  return a - b;
};

// 간단한 표현식 (return 생략)
const square = (x: number): number => x * x;

// 한 줄 화살표 함수
const isEven = (n: number): boolean => n % 2 === 0;

console.log(`10 - 3 = ${subtract(10, 3)}`);
console.log(`5의 제곱 = ${square(5)}`);
console.log(`4는 짝수? ${isEven(4)}`);
console.log(`7은 짝수? ${isEven(7)}`);

// ============================================
// 4. 함수 표현식
// ============================================

console.log("\n--- 4. 함수 표현식 ---\n");

// 함수 전체의 타입 지정
const calculateArea: (width: number, height: number) => number = function (
  width,
  height
) {
  return width * height;
};

console.log(`면적 (5 × 3): ${calculateArea(5, 3)}`);

// 더 간결한 방식
const calculatePerimeter = (width: number, height: number): number => {
  return 2 * (width + height);
};

console.log(`둘레 (5 × 3): ${calculatePerimeter(5, 3)}`);

// ============================================
// 5. void 반환 타입
// ============================================

console.log("\n--- 5. void 반환 타입 ---\n");

// 반환값이 없는 함수
function logMessage(message: string): void {
  console.log(`  로그: ${message}`);
}

const printInfo = (info: string): void => {
  console.log(`  정보: ${info}`);
};

logMessage("함수 실행 중");
printInfo("TypeScript 학습 중");

// ============================================
// 6. 익명 함수와 타입 추론
// ============================================

console.log("\n--- 6. 익명 함수와 컨텍스트 타입 추론 ---\n");

const numbers = [1, 2, 3, 4, 5];

// map의 콜백에서 num 타입이 자동으로 number로 추론됨
const doubled = numbers.map((num) => num * 2);
console.log(`원본: [${numbers.join(", ")}]`);
console.log(`2배: [${doubled.join(", ")}]`);

// filter도 마찬가지
const evens = numbers.filter((num) => num % 2 === 0);
console.log(`짝수: [${evens.join(", ")}]`);

// ============================================
// 7. 함수 타입 별칭
// ============================================

console.log("\n--- 7. 함수 타입 별칭 ---\n");

// 재사용 가능한 함수 타입 정의
type BinaryOperation = (a: number, b: number) => number;

const sum: BinaryOperation = (a, b) => a + b;
const product: BinaryOperation = (a, b) => a * b;
const max: BinaryOperation = (a, b) => (a > b ? a : b);

console.log(`sum(10, 20) = ${sum(10, 20)}`);
console.log(`product(5, 6) = ${product(5, 6)}`);
console.log(`max(15, 23) = ${max(15, 23)}`);

// ============================================
// 8. 여러 매개변수 타입
// ============================================

console.log("\n--- 8. 다양한 매개변수 타입 ---\n");

function createUser(
  name: string,
  age: number,
  isActive: boolean
): { name: string; age: number; isActive: boolean } {
  return { name, age, isActive };
}

const user = createUser("이영희", 28, true);
console.log(`사용자:`, user);

// 객체를 매개변수로
interface Point {
  x: number;
  y: number;
}

function calculateDistance(p1: Point, p2: Point): number {
  const dx = p2.x - p1.x;
  const dy = p2.y - p1.y;
  return Math.sqrt(dx * dx + dy * dy);
}

const point1: Point = { x: 0, y: 0 };
const point2: Point = { x: 3, y: 4 };
console.log(`두 점 사이 거리: ${calculateDistance(point1, point2).toFixed(2)}`);

// ============================================
// 9. never 반환 타입
// ============================================

console.log("\n--- 9. never 반환 타입 ---\n");

// 항상 예외를 던지는 함수
function throwError(message: string): never {
  throw new Error(message);
}

// 무한 루프
function infiniteLoop(): never {
  while (true) {
    // 계속 실행
  }
}

console.log("never 타입: 절대 정상 종료되지 않는 함수");
console.log("  - 항상 예외를 던짐");
console.log("  - 무한 루프");

// ============================================
// 10. 고차 함수 (Higher-Order Functions)
// ============================================

console.log("\n--- 10. 고차 함수 ---\n");

// 함수를 반환하는 함수
function makeMultiplier(factor: number): (x: number) => number {
  return (x) => x * factor;
}

const double = makeMultiplier(2);
const triple = makeMultiplier(3);

console.log(`double(5) = ${double(5)}`);
console.log(`triple(5) = ${triple(5)}`);

// 함수를 매개변수로 받는 함수
function applyOperation(
  a: number,
  b: number,
  operation: (x: number, y: number) => number
): number {
  return operation(a, b);
}

console.log(`applyOperation(10, 5, sum) = ${applyOperation(10, 5, sum)}`);
console.log(
  `applyOperation(10, 5, product) = ${applyOperation(10, 5, product)}`
);

// ============================================
// 11. 모범 사례
// ============================================

console.log("\n--- 11. 함수 작성 모범 사례 ---\n");

console.log("✅ 매개변수 타입: 항상 명시");
console.log("✅ 반환 타입: 명시 권장 (특히 공개 API)");
console.log("✅ 함수 이름: 동사로 시작 (calculate, get, create 등)");
console.log("✅ 단일 책임: 한 가지 일만 수행");
console.log("✅ 순수 함수: 부작용 최소화");
