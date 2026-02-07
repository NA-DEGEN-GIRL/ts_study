/**
 * 챕터 3: 함수
 *
 * 이 챕터에서는 TypeScript의 함수 타이핑을 학습합니다:
 * - 매개변수와 반환 타입
 * - 선택적 매개변수와 기본 매개변수
 * - Rest 매개변수
 * - 함수 오버로드
 */

// 연습 1: 화살표 함수에 타입 지정하기
// TODO: 두 숫자를 곱하는 화살표 함수를 작성하세요
// 매개변수와 반환 타입을 명시해야 합니다
const multiply = undefined;

// 연습 2: 선택적 매개변수와 기본 매개변수
// TODO: 사용자 정보를 출력하는 함수를 작성하세요
// name은 필수, age는 선택적, country는 기본값 "대한민국"
function printUserInfo(name, age, country) {
  // 구현하세요
  return "";
}

// 연습 3: Rest 매개변수
// TODO: 여러 개의 숫자를 받아서 평균을 계산하는 함수를 작성하세요
function average(...numbers) {
  // 구현하세요
  return 0;
}

// 연습 4: 함수 오버로드
// TODO: 함수 오버로드를 사용하여 타입 안전성을 높이세요
// number를 받으면 number를 반환하고
// string을 받으면 string을 반환하는 함수
// 오버로드 시그니처를 먼저 작성하고 구현 시그니처를 작성하세요
function double(value) {
  // 구현하세요
}

// 연습 5: 함수 타입 표현식
// TODO: 콜백 함수를 받는 고차 함수를 작성하세요
// 배열과 변환 함수를 받아서 각 요소를 변환한 새 배열을 반환
function mapArray<T, U>(arr: T[], fn): U[] {
  // TODO: fn의 타입을 정의하고 구현하세요
  return [];
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
