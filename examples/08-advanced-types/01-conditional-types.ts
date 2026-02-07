/**
 * Chapter 08-01: 조건부 타입 (Conditional Types)
 *
 * T extends U ? X : Y 문법을 사용하여 조건에 따라 다른 타입을 반환합니다.
 * infer 키워드로 타입을 추출할 수 있습니다.
 */

console.log("=== 조건부 타입 예제 ===\n");

// 기본 조건부 타입
type IsString<T> = T extends string ? "yes" : "no";

type Test1 = IsString<string>; // "yes"
type Test2 = IsString<number>; // "no"

console.log("1. 기본 조건부 타입:");
console.log("  IsString<string>:", "yes" as Test1);
console.log("  IsString<number>:", "no" as Test2);
console.log();

// 조건부 타입으로 null/undefined 제거
type MyNonNullable<T> = T extends null | undefined ? never : T;

type Test3 = MyNonNullable<string | null>; // string
type Test4 = MyNonNullable<number | undefined>; // number

function processNonNullable(value: MyNonNullable<string | null>): string {
  return value.toUpperCase();
}

console.log("2. NonNullable 타입:");
console.log("  processNonNullable('hello'):", processNonNullable("hello"));
console.log();

// infer 키워드로 타입 추출
type UnpackPromise<T> = T extends Promise<infer U> ? U : T;

type Test5 = UnpackPromise<Promise<string>>; // string
type Test6 = UnpackPromise<number>; // number

async function getValue(): Promise<number> {
  return 42;
}

console.log("3. Promise 타입 추출:");
// 런타임에서 타입 확인은 불가능하지만, 컴파일 타임에 타입이 결정됨
console.log("  UnpackPromise<Promise<number>>는 number 타입");
console.log("  UnpackPromise<string>는 string 타입");
console.log();

// 배열 요소 타입 추출
type ElementType<T> = T extends (infer U)[] ? U : T;

type Test7 = ElementType<string[]>; // string
type Test8 = ElementType<number>; // number

function getFirstElement<T>(arr: T[]): ElementType<T[]> {
  return arr[0];
}

console.log("4. 배열 요소 타입 추출:");
console.log("  getFirstElement([1, 2, 3]):", getFirstElement([1, 2, 3]));
console.log("  getFirstElement(['a', 'b']):", getFirstElement(["a", "b"]));
console.log();

// 함수 반환 타입 추출
type MyReturnType<T> = T extends (...args: any[]) => infer R ? R : never;

function getString(): string {
  return "hello";
}

function getNumber(): number {
  return 42;
}

type Test9 = MyReturnType<typeof getString>; // string
type Test10 = MyReturnType<typeof getNumber>; // number

console.log("5. 함수 반환 타입 추출:");
console.log("  getString의 반환 타입은 string");
console.log("  getNumber의 반환 타입은 number");
console.log();

// 실용적인 예제: API 응답 타입 변환
type ApiResponse<T> = {
  success: true;
  data: T;
} | {
  success: false;
  error: string;
};

type ExtractData<T> = T extends ApiResponse<infer U> ? U : never;

type UserResponse = ApiResponse<{ id: number; name: string }>;
type UserData = ExtractData<UserResponse>; // { id: number; name: string }

function handleResponse<T>(response: ApiResponse<T>): T | null {
  if (response.success) {
    return response.data;
  }
  console.log("  오류:", response.error);
  return null;
}

console.log("6. API 응답 처리:");
const successResponse: UserResponse = {
  success: true,
  data: { id: 1, name: "김철수" }
};
const failResponse: UserResponse = {
  success: false,
  error: "사용자를 찾을 수 없음"
};

console.log("  성공 응답:", handleResponse(successResponse));
console.log("  실패 응답:", handleResponse(failResponse));
console.log();

// 복잡한 조건부 타입: 중첩
type Flatten<T> = T extends Array<infer U>
  ? U extends Array<infer V>
    ? V
    : U
  : T;

type Test11 = Flatten<number[]>; // number
type Test12 = Flatten<number[][]>; // number
type Test13 = Flatten<string>; // string

console.log("7. 중첩 배열 평탄화:");
console.log("  Flatten<number[]>는 number");
console.log("  Flatten<number[][]>는 number");
console.log("  Flatten<string>는 string");
