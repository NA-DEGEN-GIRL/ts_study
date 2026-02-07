/**
 * Chapter 04 - Interfaces
 * 03-type-alias.ts - 타입 별칭
 *
 * 타입 별칭(Type Alias)과 유니온/교차 타입을 학습합니다.
 * 인터페이스와의 차이점과 각각의 사용 시점을 이해합니다.
 */

console.log("=== 타입 별칭 (Type Alias) ===\n");

// ============================================
// 1. 기본 타입 별칭
// ============================================

console.log("--- 1. 기본 타입 별칭 ---\n");

// 프리미티브 타입 별칭
type ID = string | number;
type Age = number;
type Email = string;

let userId: ID = "USER_001";
let userAge: Age = 25;
let userEmail: Email = "user@example.com";

console.log(`사용자 ID: ${userId}`);
console.log(`나이: ${userAge}`);
console.log(`이메일: ${userEmail}`);

// 숫자 ID로 변경 가능
userId = 12345;
console.log(`변경된 ID: ${userId}`);

// ============================================
// 2. 객체 타입 별칭
// ============================================

console.log("\n--- 2. 객체 타입 별칭 ---\n");

type User = {
  id: number;
  name: string;
  email: string;
};

const user: User = {
  id: 1,
  name: "김철수",
  email: "kim@example.com"
};

console.log(`사용자: ${user.name} (${user.email})`);

// ============================================
// 3. 유니온 타입 (Union Types)
// ============================================

console.log("\n--- 3. 유니온 타입 (A | B) ---\n");

type Status = "pending" | "success" | "error";
type Result = string | number | boolean;

function handleStatus(status: Status): void {
  console.log(`  상태: ${status}`);
}

handleStatus("pending");
handleStatus("success");
// handleStatus("loading"); // ❌ Error

function processResult(result: Result): void {
  console.log(`  결과 (${typeof result}): ${result}`);
}

processResult("성공");
processResult(42);
processResult(true);

// ============================================
// 4. 교차 타입 (Intersection Types)
// ============================================

console.log("\n--- 4. 교차 타입 (A & B) ---\n");

type Person = {
  name: string;
  age: number;
};

type Employee = {
  employeeId: number;
  department: string;
};

// Person과 Employee의 모든 속성을 가짐
type Staff = Person & Employee;

const staff: Staff = {
  name: "이영희",
  age: 30,
  employeeId: 12345,
  department: "개발팀"
};

console.log(`직원: ${staff.name} (${staff.age}세)`);
console.log(`사번: ${staff.employeeId}, 부서: ${staff.department}`);

// ============================================
// 5. 함수 타입 별칭
// ============================================

console.log("\n--- 5. 함수 타입 별칭 ---\n");

type BinaryOperation = (a: number, b: number) => number;
type Predicate<T> = (item: T) => boolean;
type TransformerFn<T, U> = (input: T) => U;

const add: BinaryOperation = (a, b) => a + b;
const isEven: Predicate<number> = (n) => n % 2 === 0;
const toStringFn: TransformerFn<number, string> = (n) => `숫자: ${n}`;

console.log(`add(5, 3) = ${add(5, 3)}`);
console.log(`isEven(4) = ${isEven(4)}`);
console.log(`toStringFn(42) = ${toStringFn(42)}`);

// ============================================
// 6. 튜플 타입 별칭
// ============================================

console.log("\n--- 6. 튜플 타입 ---\n");

type Point2D = [number, number];
type Point3D = [number, number, number];
type RGB = [number, number, number];
type RGBA = [number, number, number, number];

const point: Point2D = [10, 20];
const color: RGB = [255, 128, 0];

console.log(`좌표: (${point[0]}, ${point[1]})`);
console.log(`색상: rgb(${color[0]}, ${color[1]}, ${color[2]})`);

// ============================================
// 7. 배열 타입 별칭
// ============================================

console.log("\n--- 7. 배열 타입 ---\n");

type StringArray = string[];
type NumberMatrix = number[][];
type UserList = User[];

const fruits: StringArray = ["사과", "바나나", "체리"];
const matrix: NumberMatrix = [
  [1, 2, 3],
  [4, 5, 6]
];

console.log(`과일: [${fruits.join(", ")}]`);
console.log(`행렬:`, matrix);

// ============================================
// 8. 유니온과 교차 타입 조합
// ============================================

console.log("\n--- 8. 복합 타입 ---\n");

type Success<T> = {
  status: "success";
  data: T;
};

type Failure = {
  status: "error";
  message: string;
};

type ApiResponse<T> = Success<T> | Failure;

function handleResponse<T>(response: ApiResponse<T>): void {
  if (response.status === "success") {
    console.log(`  성공:`, response.data);
  } else {
    console.log(`  에러: ${response.message}`);
  }
}

handleResponse({ status: "success", data: { id: 1, name: "데이터" } });
handleResponse({ status: "error", message: "서버 오류" });

// ============================================
// 9. 매핑된 타입 기초
// ============================================

console.log("\n--- 9. 매핑된 타입 ---\n");

type MyReadonly<T> = {
  readonly [K in keyof T]: T[K];
};

type MyOptional<T> = {
  [K in keyof T]?: T[K];
};

type Product = {
  id: number;
  name: string;
  price: number;
};

type ReadonlyProduct = MyReadonly<Product>;
type OptionalProduct = MyOptional<Product>;

const product: ReadonlyProduct = {
  id: 1,
  name: "노트북",
  price: 1500000
};

// product.price = 1400000; // ❌ Error: readonly

const partialProduct: OptionalProduct = {
  name: "마우스"
  // id와 price는 선택적
};

console.log(`제품: ${product.name}, 가격: ${product.price.toLocaleString()}원`);
console.log(`부분 제품: ${partialProduct.name}`);

// ============================================
// 10. 타입 별칭 vs 인터페이스
// ============================================

console.log("\n--- 10. 타입 별칭 vs 인터페이스 ---\n");

// 타입 별칭 - 유니온 타입 가능
type Shape = Circle | Rectangle;

type Circle = {
  kind: "circle";
  radius: number;
};

type Rectangle = {
  kind: "rectangle";
  width: number;
  height: number;
};

// 인터페이스 - 확장과 병합 가능
interface Animal {
  name: string;
}

interface Animal {
  age: number; // 선언 병합
}

interface Dog extends Animal {
  breed: string; // 확장
}

const circle: Circle = { kind: "circle", radius: 10 };
const rect: Rectangle = { kind: "rectangle", width: 20, height: 10 };

const dog: Dog = {
  name: "멍멍이",
  age: 3,
  breed: "골든 리트리버"
};

console.log(`원: 반지름 ${circle.radius}`);
console.log(`사각형: ${rect.width} × ${rect.height}`);
console.log(`강아지: ${dog.name}, ${dog.age}세, ${dog.breed}`);

// ============================================
// 11. 실용 예제: HTTP 요청
// ============================================

console.log("\n--- 11. 실용 예제 ---\n");

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";
type HttpHeaders = Record<string, string>;
type QueryParams = Record<string, string | number>;

type RequestConfig = {
  method: HttpMethod;
  url: string;
  headers?: HttpHeaders;
  params?: QueryParams;
  body?: unknown;
};

const getRequest: RequestConfig = {
  method: "GET",
  url: "/api/users",
  params: { page: 1, limit: 10 }
};

const postRequest: RequestConfig = {
  method: "POST",
  url: "/api/users",
  headers: { "Content-Type": "application/json" },
  body: { name: "홍길동", email: "hong@example.com" }
};

console.log(`GET 요청: ${getRequest.url}`);
console.log(`  파라미터:`, getRequest.params);

console.log(`\nPOST 요청: ${postRequest.url}`);
console.log(`  헤더:`, postRequest.headers);
console.log(`  바디:`, postRequest.body);

// ============================================
// 12. 선택 가이드
// ============================================

console.log("\n--- 12. 사용 가이드 ---\n");

console.log("✅ 타입 별칭 사용 시점:");
console.log("  - 유니온 타입");
console.log("  - 튜플 타입");
console.log("  - 프리미티브 타입 별칭");
console.log("  - 함수 타입");
console.log("  - 복잡한 타입 조합");

console.log("\n✅ 인터페이스 사용 시점:");
console.log("  - 객체 형태 정의");
console.log("  - 클래스 구현");
console.log("  - 확장이 필요한 경우");
console.log("  - 선언 병합이 필요한 경우");
console.log("  - 공개 API 타입");

console.log("\n💡 Tip: 객체는 인터페이스, 그 외는 타입 별칭을 권장합니다!");
