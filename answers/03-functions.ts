/**
 * 챕터 3: 함수 - 정답
 *
 * 이 챕터에서는 TypeScript의 함수 타이핑을 학습합니다:
 * - 매개변수와 반환 타입
 * - 선택적 매개변수와 기본 매개변수
 * - Rest 매개변수
 * - 함수 오버로드
 */

// 연습 1: 화살표 함수에 타입 지정하기
// 해설: 화살표 함수도 일반 함수와 동일하게 타입을 지정합니다
const multiply = (a: number, b: number): number => a * b;

// 연습 2: 선택적 매개변수와 기본 매개변수
// 해설: ?를 사용하여 선택적 매개변수를, = 을 사용하여 기본값을 지정합니다
function printUserInfo(
  name: string,
  age?: number,
  country: string = "대한민국"
): string {
  const ageStr = age ? `${age}세` : "나이 미상";
  return `${name}, ${ageStr}, ${country}`;
}

// 연습 3: Rest 매개변수
// 해설: ...를 사용하여 가변 인자를 배열로 받습니다
function average(...numbers: number[]): number {
  if (numbers.length === 0) return 0;
  const sum = numbers.reduce((acc, n) => acc + n, 0);
  return sum / numbers.length;
}

// 연습 4: 함수 오버로드
// 해설: 함수 오버로드를 사용하여 입력 타입에 따라 반환 타입을 다르게 지정합니다
// 오버로드 시그니처 (구현 없음)
function double(value: number): number;
function double(value: string): string;
// 구현 시그니처 (가장 일반적인 타입)
function double(value: number | string): number | string {
  if (typeof value === "number") {
    return value * 2;
  }
  return value + value;
}

// 연습 5: 함수 타입 표현식
// 해설: (param: Type) => ReturnType 형식으로 함수 타입을 정의합니다
function mapArray<T, U>(arr: T[], fn: (item: T) => U): U[] {
  return arr.map(fn);
}

// 테스트 케이스
console.log('=== 챕터 3: 함수 ===');
console.log('5 * 3 =', multiply(5, 3));
console.log(printUserInfo("김철수"));
console.log(printUserInfo("박영희", 25));
console.log(printUserInfo("이민수", 30, "미국"));
console.log('평균:', average(10, 20, 30, 40, 50));
console.log('double(5) =', double(5));
console.log('double("hello") =', double("hello"));
console.log('mapArray:', mapArray([1, 2, 3], (n) => n * 2));
console.log('mapArray:', mapArray(["a", "b"], (s) => s.toUpperCase()));
