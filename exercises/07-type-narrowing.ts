/**
 * 챕터 7: 타입 좁히기
 *
 * 이 챕터에서는 타입 좁히기(Type Narrowing)를 학습합니다:
 * - typeof 타입 가드
 * - instanceof 타입 가드
 * - 사용자 정의 타입 가드
 * - Discriminated Union
 * - Exhaustiveness Checking
 */

// 연습 1: typeof 타입 가드
// TODO: 숫자 또는 문자열을 받아서 처리하는 함수를 작성하세요
// 숫자면 2배로, 문자열이면 대문자로 변환
function process(value: number | string) {
  // 구현하세요
}

// 연습 2: instanceof 타입 가드
class Dog {
  bark() { return "멍멍!"; }
}

class Cat {
  meow() { return "야옹!"; }
}

// TODO: Dog 또는 Cat을 받아서 적절한 소리를 반환하는 함수
function makeSound(animal: Dog | Cat): string {
  // instanceof를 사용하여 구현하세요
  return "";
}

// 연습 3: 사용자 정의 타입 가드
interface Circle {
  kind: "circle";
  radius: number;
}

interface Square {
  kind: "square";
  sideLength: number;
}

type Shape = Circle | Square;

// TODO: Shape가 Circle인지 확인하는 타입 가드 함수를 작성하세요
// 반환 타입에 "is" 키워드를 사용하세요
function isCircle(shape: Shape) {
  // 구현하세요
}

// TODO: 타입 가드를 사용하여 면적을 계산하는 함수
function getArea(shape: Shape): number {
  // isCircle을 사용하여 구현하세요
  return 0;
}

// 연습 4: Discriminated Union으로 타입 좁히기
interface Success {
  status: "success";
  data: string;
}

interface Error {
  status: "error";
  message: string;
}

interface Loading {
  status: "loading";
}

type ApiResponse = Success | Error | Loading;

// TODO: status로 타입을 좁혀서 적절한 메시지를 반환하세요
function handleResponse(response: ApiResponse): string {
  // switch 문을 사용하여 구현하세요
  return "";
}

// 연습 5: Exhaustiveness Checking (완전성 검사)
// TODO: 위의 handleResponse 함수에 never 타입을 사용하여
// 모든 케이스를 처리했는지 컴파일 타임에 확인하세요
function assertNever(value: never): never {
  throw new Error(`예상하지 못한 값: ${value}`);
}

function handleResponseComplete(response: ApiResponse): string {
  // switch 문의 default에서 assertNever를 사용하세요
  // 새로운 status가 추가되면 컴파일 에러가 발생합니다
  return "";
}

// 테스트 케이스
console.log('=== 챕터 7: 타입 좁히기 ===');
console.log('process(10):', process(10));
console.log('process("hello"):', process("hello"));

const dog = new Dog();
const cat = new Cat();
console.log('개 소리:', makeSound(dog));
console.log('고양이 소리:', makeSound(cat));

const circle: Circle = { kind: "circle", radius: 5 };
const square: Square = { kind: "square", sideLength: 4 };
console.log('원 면적:', getArea(circle));
console.log('정사각형 면적:', getArea(square));

console.log('성공:', handleResponse({ status: "success", data: "데이터" }));
console.log('에러:', handleResponse({ status: "error", message: "오류 발생" }));
console.log('로딩:', handleResponse({ status: "loading" }));
console.log('완전성 검사:', handleResponseComplete({ status: "success", data: "OK" }));
