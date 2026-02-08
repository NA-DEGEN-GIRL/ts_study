/**
 * 챕터 8: 고급 타입 - 정답
 *
 * 이 챕터에서는 TypeScript의 고급 타입 기능을 학습합니다:
 * - 조건부 타입 (Conditional Type)
 * - 매핑 타입 (Mapped Type)
 * - 템플릿 리터럴 타입 (Template Literal Type)
 * - 유틸리티 타입 (Utility Type) 활용
 */

// 연습 1: 조건부 타입 (Conditional Type)
// 풀이: T extends U ? X : Y 형식으로 조건부 타입을 작성합니다
// infer 키워드로 배열의 요소 타입을 추론합니다
// T가 배열이면 요소 타입 U를 반환하고, 아니면 T 그대로 반환합니다
type Unwrap<T> = T extends Array<infer U> ? U : T;

// 테스트
type Test1 = Unwrap<string[]>;  // string
type Test2 = Unwrap<number>;    // number

// 연습 2: 매핑 타입 (Mapped Type)
// 풀이: [P in keyof T]로 모든 키를 순회하고, readonly와 타입 변환을 적용합니다
// 기존 타입의 모든 속성을 변환하여 새로운 타입을 만듭니다
type Stringify<T> = {
  readonly [P in keyof T]: string;
};

interface User {
  id: number;
  name: string;
  age: number;
}

type StringUser = Stringify<User>;

// 연습 3: 템플릿 리터럴 타입 (Template Literal Type)
// 풀이: 템플릿 리터럴 타입으로 문자열 타입을 조합합니다
// Capitalize는 첫 글자를 대문자로 만드는 유틸리티 타입입니다
type EventName = "click" | "change" | "focus" | "blur";
type EventHandler<T extends string> = `on${Capitalize<T>}`;

type ClickHandler = EventHandler<"click">;  // "onClick"

// 연습 4: infer를 사용한 타입 추론 (Type Inference)
// 풀이: infer 키워드로 조건부 타입 내에서 타입을 추론합니다
// 함수 타입에서 반환 타입 R을 추론하여 반환합니다
type MyReturnType<T> = T extends (...args: any[]) => infer R ? R : never;

function getUser() {
  return { name: "김철수", age: 30 };
}

type UserReturnType = MyReturnType<typeof getUser>;

// 연습 5: 복합적인 유틸리티 타입 (Utility Type)
// 풀이: 여러 유틸리티 타입을 조합하여 새로운 타입을 만듭니다
// 1. Omit<T, K>로 K를 제외한 속성들을 가져옴 (선택적으로 만들 속성들)
// 2. Pick<T, K>로 K 속성들만 가져옴 (필수로 만들 속성들)
// 3. Required로 필수로 만듦
// 4. &로 합침 - 결과적으로 K는 필수, 나머지는 원래대로
type RequiredKeys<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>;

interface Product {
  id: number;
  name: string;
  price: number;
  description?: string;
  image?: string;
}

type ProductForm = RequiredKeys<Partial<Product>, "id" | "name">;

const productForm: ProductForm = {
  id: 1,
  name: "노트북"
};

// 연습 6: Recursive Conditional Types
// 해설: 재귀적 조건부 타입으로 중첩된 구조를 처리합니다
type Flatten<T> = T extends Array<infer U> ? Flatten<U> : T;

type NestedArray = [1, [2, [3, 4]], 5];
type FlatArray = Flatten<NestedArray>;

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
