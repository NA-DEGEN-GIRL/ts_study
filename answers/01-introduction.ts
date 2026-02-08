/**
 * 챕터 1: TypeScript 소개 - 정답
 *
 * 이 챕터에서는 TypeScript의 기본 개념을 학습합니다:
 * - 타입 (Type) 명시 변수 선언
 * - 타입이 지정된 함수 작성
 * - 타입 에러 수정
 */

// 연습 1: 타입이 명시된 변수를 선언하세요
// 풀이: 콜론(:) 뒤에 타입 (Type)을 명시합니다
const name: string = "홍길동";

// 풀이: number 타입은 정수와 실수 모두 포함합니다
const age: number = 25;

// 풀이: boolean 타입은 true 또는 false만 가능합니다
const isStudent: boolean = true;

// 연습 2: 타입이 지정된 함수를 작성하세요
// 풀이: 매개변수에 타입을 명시하고, 함수 괄호 뒤에 반환 타입을 명시합니다
// 이렇게 하면 잘못된 타입의 인자를 전달하거나 잘못된 값을 반환할 때 컴파일 에러가 발생합니다
function add(a: number, b: number): number {
  return a + b;
}

// 연습 3: 타입 에러를 수정하세요
// 풀이: person 매개변수에 string 타입을 명시해야 합니다
// 타입을 명시하지 않으면 암시적으로 any가 되어 strict 모드에서 에러가 발생합니다
// toUpperCase()는 string 메서드이므로 string 타입을 지정해야 합니다
function greet(person: string): string {
  return "안녕하세요, " + person.toUpperCase();
}

// 연습 4: 배열 타입을 사용하세요
// 풀이: number[] 또는 Array<number> 형식으로 배열 타입을 명시합니다
// 이렇게 하면 배열에 number가 아닌 다른 타입의 값을 넣으려 할 때 에러가 발생합니다
const numbers: number[] = [1, 2, 3, 4, 5];

// 연습 5: 객체 타입을 정의하세요
// 풀이: type 키워드로 객체의 구조를 정의합니다
// 객체가 가져야 할 속성과 각 속성의 타입을 지정합니다
type User = {
  name: string;
  age: number;
};

const user: User = {
  name: "김철수",
  age: 30
};

// 테스트 케이스
console.log('=== 챕터 1: TypeScript 소개 ===');
console.log('이름:', name);
console.log('나이:', age);
console.log('학생 여부:', isStudent);
console.log('3 + 5 =', add(3, 5));
console.log('인사:', greet('typescript'));
console.log('숫자들:', numbers);
console.log('사용자:', user);
