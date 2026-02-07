/**
 * 챕터 8: 고급 타입
 *
 * 이 챕터에서는 TypeScript의 고급 타입 기능을 학습합니다:
 * - Conditional Types (조건부 타입)
 * - Mapped Types (매핑된 타입)
 * - Template Literal Types (템플릿 리터럴 타입)
 * - Utility Types 활용
 */

// 연습 1: Conditional Types
// TODO: T가 배열이면 배열 요소의 타입을, 아니면 T 그대로 반환하는 타입
type Unwrap<T> = any; // 여기를 구현하세요

// 테스트
type Test1 = Unwrap<string[]>;  // string이어야 함
type Test2 = Unwrap<number>;    // number여야 함

// 연습 2: Mapped Types
// TODO: 객체의 모든 속성을 readonly로 만들고 타입을 string으로 변환하는 타입
type Stringify<T> = any; // 여기를 구현하세요

interface User {
  id: number;
  name: string;
  age: number;
}

type StringUser = Stringify<User>;
// { readonly id: string; readonly name: string; readonly age: string; } 형태여야 함

// 연습 3: Template Literal Types
// TODO: 이벤트 이름으로 핸들러 함수명을 생성하는 타입
// "click" -> "onClick", "change" -> "onChange"
type EventName = "click" | "change" | "focus" | "blur";
type EventHandler<T extends string> = any; // 여기를 구현하세요

type ClickHandler = EventHandler<"click">;  // "onClick"이어야 함

// 연습 4: infer를 사용한 타입 추론
// TODO: 함수의 반환 타입을 추출하는 MyReturnType을 구현하세요
type MyReturnType<T> = any; // 여기를 구현하세요

function getUser() {
  return { name: "김철수", age: 30 };
}

type UserReturnType = MyReturnType<typeof getUser>;
// { name: string; age: number; } 타입이어야 함

// 연습 5: 복합적인 유틸리티 타입
// TODO: 특정 키들만 필수로 만드는 RequiredKeys 타입을 구현하세요
// Partial<T>와 Pick, Omit, Required를 조합하여 구현
type RequiredKeys<T, K extends keyof T> = any; // 여기를 구현하세요

interface Product {
  id: number;
  name: string;
  price: number;
  description?: string;
  image?: string;
}

// id와 name만 필수, 나머지는 선택적
type ProductForm = RequiredKeys<Partial<Product>, "id" | "name">;

const productForm: ProductForm = {
  id: 1,
  name: "노트북"
  // price, description, image는 선택적
};

// 연습 6: Recursive Conditional Types
// TODO: 중첩된 배열을 평탄화하는 타입
type Flatten<T> = any; // 여기를 구현하세요

type NestedArray = [1, [2, [3, 4]], 5];
type FlatArray = Flatten<NestedArray>;
// [1, 2, 3, 4, 5] 형태여야 함

// 테스트 케이스
console.log('=== 챕터 8: 고급 타입 ===');

const stringUser: StringUser = {
  id: "1",
  name: "김철수",
  age: "30"
};
console.log('문자열 사용자:', stringUser);

const userData: UserReturnType = { name: "박영희", age: 25 };
console.log('사용자 데이터:', userData);

console.log('제품 폼:', productForm);

// 타입 체크를 위한 헬퍼 함수
function checkUnwrap(): void {
  const a: Test1 = "hello";
  const b: Test2 = 42;
  console.log('Unwrap 테스트:', a, b);
}

checkUnwrap();
