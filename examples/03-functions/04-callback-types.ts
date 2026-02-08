/**
 * Chapter 03 - Functions
 * 04-callback-types.ts - 콜백과 고차 함수
 *
 * 이 파일에서 배울 내용:
 * - 콜백 (Callback) 함수 - 다른 함수에 인자로 전달되는 함수
 * - 고차 함수 (Higher-Order Function) - 함수를 받거나 반환하는 함수
 * - 함수 합성 (Function Composition) - 여러 함수를 조합
 * - 파이프라인 (Pipeline) 패턴 - 데이터를 순차적으로 변환
 * 왜 필요한가? 코드 재사용성과 함수형 프로그래밍 스타일 구현
 */

console.log("=== 콜백 타입과 고차 함수 ===\n");

// ============================================
// 1. 기본 콜백 타입
// ============================================

console.log("--- 1. 기본 콜백 함수 ---\n");

// 콜백 함수를 매개변수로 받는 함수
function executeCallback(callback: () => void): void {
  console.log("  콜백 실행 전");
  callback();
  console.log("  콜백 실행 후");
}

executeCallback(() => {
  console.log("  >> 콜백 함수가 실행되었습니다!");
});

// ============================================
// 2. 매개변수가 있는 콜백
// ============================================

console.log("\n--- 2. 매개변수가 있는 콜백 ---\n");

function processNumbers(
  numbers: number[],
  callback: (num: number) => void
): void {
  numbers.forEach((num) => callback(num));
}

processNumbers([1, 2, 3, 4, 5], (num) => {
  console.log(`  숫자: ${num}, 제곱: ${num * num}`);
});

// ============================================
// 3. 반환값이 있는 콜백
// ============================================

console.log("\n--- 3. 반환값이 있는 콜백 ---\n");

function mapArray<T, U>(
  items: T[],
  transformer: (item: T) => U
): U[] {
  return items.map(transformer);
}

const numbers = [1, 2, 3, 4, 5];
const doubled = mapArray(numbers, (n) => n * 2);
const stringified = mapArray(numbers, (n) => `#${n}`);

console.log(`원본: [${numbers.join(", ")}]`);
console.log(`2배: [${doubled.join(", ")}]`);
console.log(`문자열: [${stringified.join(", ")}]`);

// ============================================
// 4. 콜백 타입 별칭
// ============================================

console.log("\n--- 4. 콜백 타입 별칭 ---\n");

// 재사용 가능한 콜백 타입 정의
type Predicate<T> = (item: T) => boolean;
type TransformerFn<T, U> = (item: T) => U;
type Consumer<T> = (item: T) => void;

function filter<T>(items: T[], predicate: Predicate<T>): T[] {
  return items.filter(predicate);
}

function forEach<T>(items: T[], consumer: Consumer<T>): void {
  items.forEach(consumer);
}

const words = ["apple", "banana", "cherry", "date"];
const longWords = filter(words, (word) => word.length > 5);

console.log(`긴 단어 (6자 이상): [${longWords.join(", ")}]`);

forEach(longWords, (word) => {
  console.log(`  - ${word.toUpperCase()}`);
});

// ============================================
// 5. 비동기 콜백
// ============================================

console.log("\n--- 5. 비동기 콜백 ---\n");

type AsyncCallback = (result: string) => void;

function fetchData(url: string, onSuccess: AsyncCallback, onError: AsyncCallback): void {
  console.log(`  데이터 요청: ${url}`);

  // 비동기 작업 시뮬레이션
  setTimeout(() => {
    if (url.includes("success")) {
      onSuccess("데이터 로드 성공!");
    } else {
      onError("데이터 로드 실패!");
    }
  }, 100);
}

fetchData(
  "/api/success",
  (result) => console.log(`  ✅ ${result}`),
  (error) => console.log(`  ❌ ${error}`)
);

// ============================================
// 6. 고차 함수 - 함수를 반환
// ============================================

console.log("\n--- 6. 함수를 반환하는 고차 함수 ---\n");

// 클로저를 활용한 함수 생성
function makeAdder(x: number): (y: number) => number {
  return (y: number) => x + y;
}

const add5 = makeAdder(5);
const add10 = makeAdder(10);

console.log(`add5(3) = ${add5(3)}`);
console.log(`add10(3) = ${add10(3)}`);

// 설정을 받아 함수를 반환
function makeGreeter(greeting: string): (name: string) => string {
  return (name: string) => `${greeting}, ${name}님!`;
}

const hello = makeGreeter("안녕하세요");
const welcome = makeGreeter("환영합니다");

console.log(hello("김철수"));
console.log(welcome("이영희"));

// ============================================
// 7. 함수 합성 (Function Composition)
// ============================================

console.log("\n--- 7. 함수 합성 ---\n");

type UnaryFunction<T, U> = (arg: T) => U;

function compose<A, B, C>(
  f: UnaryFunction<B, C>,
  g: UnaryFunction<A, B>
): UnaryFunction<A, C> {
  return (arg: A) => f(g(arg));
}

const double = (x: number): number => x * 2;
const addOne = (x: number): number => x + 1;

const doubleThenAddOne = compose(addOne, double);
const addOneThenDouble = compose(double, addOne);

console.log(`doubleThenAddOne(5) = ${doubleThenAddOne(5)}`); // (5 * 2) + 1 = 11
console.log(`addOneThenDouble(5) = ${addOneThenDouble(5)}`); // (5 + 1) * 2 = 12

// ============================================
// 8. 실용 예제: 이벤트 핸들러
// ============================================

console.log("\n--- 8. 이벤트 핸들러 예제 ---\n");

type EventHandler<T> = (event: T) => void;

interface ClickEvent {
  x: number;
  y: number;
  button: "left" | "right";
}

interface KeyEvent {
  key: string;
  ctrlKey: boolean;
}

function onClick(handler: EventHandler<ClickEvent>): void {
  const mockEvent: ClickEvent = { x: 100, y: 200, button: "left" };
  handler(mockEvent);
}

function onKeyPress(handler: EventHandler<KeyEvent>): void {
  const mockEvent: KeyEvent = { key: "Enter", ctrlKey: false };
  handler(mockEvent);
}

onClick((event) => {
  console.log(`  클릭: (${event.x}, ${event.y}), 버튼: ${event.button}`);
});

onKeyPress((event) => {
  console.log(`  키 입력: ${event.key}, Ctrl: ${event.ctrlKey}`);
});

// ============================================
// 9. 실용 예제: 배열 유틸리티
// ============================================

console.log("\n--- 9. 배열 유틸리티 함수 ---\n");

function reduce<T, U>(
  items: T[],
  reducer: (accumulator: U, current: T) => U,
  initialValue: U
): U {
  let result = initialValue;
  for (const item of items) {
    result = reducer(result, item);
  }
  return result;
}

const nums = [1, 2, 3, 4, 5];

const sum = reduce(nums, (acc, n) => acc + n, 0);
const product = reduce(nums, (acc, n) => acc * n, 1);
const concatenated = reduce(nums, (acc, n) => acc + String(n), "");

console.log(`합계: ${sum}`);
console.log(`곱: ${product}`);
console.log(`연결: "${concatenated}"`);

// ============================================
// 10. 실용 예제: 파이프라인
// ============================================

console.log("\n--- 10. 파이프라인 패턴 ---\n");

function pipe<T>(...functions: ((arg: T) => T)[]): (arg: T) => T {
  return (arg: T) => functions.reduce((value, fn) => fn(value), arg);
}

const trim = (s: string): string => s.trim();
const lowercase = (s: string): string => s.toLowerCase();
const removeSpaces = (s: string): string => s.replace(/\s+/g, "-");

const slugify = pipe(trim, lowercase, removeSpaces);

const title = "  Hello World TypeScript  ";
console.log(`원본: "${title}"`);
console.log(`변환: "${slugify(title)}"`);

// ============================================
// 11. 모범 사례
// ============================================

console.log("\n--- 11. 콜백 사용 모범 사례 ---\n");

console.log("✅ 콜백 함수 사용 시점:");
console.log("  - 비동기 작업 처리");
console.log("  - 이벤트 핸들링");
console.log("  - 배열 변환/필터링");
console.log("  - 커스터마이징 가능한 동작");

console.log("\n✅ 고차 함수 사용 시점:");
console.log("  - 함수 재사용성 향상");
console.log("  - 설정 기반 함수 생성");
console.log("  - 함수 합성과 파이프라인");
console.log("  - 의존성 주입");

console.log("\n💡 Tip: 콜백보다 Promise/async-await를 선호하세요!");
