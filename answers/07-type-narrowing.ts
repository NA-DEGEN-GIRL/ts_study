/**
 * 챕터 7: 타입 좁히기 - 정답
 *
 * 이 챕터에서는 타입 좁히기 (Type Narrowing)를 학습합니다:
 * - typeof 타입 가드 (Type Guard)
 * - instanceof 타입 가드
 * - 사용자 정의 타입 가드
 * - 판별 유니온 (Discriminated Union)
 * - 완전성 검사 (Exhaustiveness Checking)
 */

// 연습 1: typeof 타입 가드 (Type Guard)
// 풀이: typeof 연산자로 런타임에 타입을 체크하면 TypeScript가 타입을 좁힙니다
// if 문 안에서는 value가 number 타입으로 좁혀지므로 number 메서드를 안전하게 사용할 수 있습니다
function process(value: number | string): number | string {
  if (typeof value === "number") {
    return value * 2;
  }
  return value.toUpperCase();
}

// 연습 2: instanceof 타입 가드
class Dog {
  bark() { return "멍멍!"; }
}

class Cat {
  meow() { return "야옹!"; }
}

// 해설: instanceof로 클래스 인스턴스를 체크하면 타입이 좁혀집니다
function makeSound(animal: Dog | Cat): string {
  if (animal instanceof Dog) {
    return animal.bark();
  }
  return animal.meow();
}

// 연습 3: 사용자 정의 타입 가드 (Type Guard)
interface Circle {
  kind: "circle";
  radius: number;
}

interface Square {
  kind: "square";
  sideLength: number;
}

type Shape = Circle | Square;

// 풀이: "value is Type" 형식의 반환 타입으로 사용자 정의 타입 가드를 만듭니다
// 함수가 true를 반환하면 TypeScript는 해당 값이 Circle 타입임을 알게 됩니다
function isCircle(shape: Shape): shape is Circle {
  return shape.kind === "circle";
}

function getArea(shape: Shape): number {
  if (isCircle(shape)) {
    return Math.PI * shape.radius ** 2;
  }
  return shape.sideLength ** 2;
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

// 해설: 공통 속성(status)으로 타입을 구별하는 Discriminated Union 패턴
function handleResponse(response: ApiResponse): string {
  switch (response.status) {
    case "success":
      return `성공: ${response.data}`;
    case "error":
      return `에러: ${response.message}`;
    case "loading":
      return "로딩 중...";
  }
}

// 연습 5: 완전성 검사 (Exhaustiveness Checking)
// 풀이: never 타입을 사용하여 모든 케이스를 처리했는지 컴파일 타임에 확인
// never는 "절대 발생할 수 없는" 타입입니다
function assertNever(value: never): never {
  throw new Error(`예상하지 못한 값: ${value}`);
}

function handleResponseComplete(response: ApiResponse): string {
  switch (response.status) {
    case "success":
      return `성공: ${response.data}`;
    case "error":
      return `에러: ${response.message}`;
    case "loading":
      return "로딩 중...";
    default:
      // 모든 케이스를 처리했으면 여기는 never 타입이 됩니다
      // 만약 새로운 status가 추가되면 컴파일 에러가 발생하여 누락을 방지합니다
      return assertNever(response);
  }
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
