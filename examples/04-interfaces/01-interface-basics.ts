/**
 * Chapter 04 - Interfaces
 * 01-interface-basics.ts - 인터페이스 기초
 *
 * 인터페이스의 기본 개념과 사용법을 학습합니다.
 * 선택적 속성, 읽기 전용 속성, 인덱스 시그니처를 다룹니다.
 */

console.log("=== 인터페이스 기초 ===\n");

// ============================================
// 1. 기본 인터페이스
// ============================================

console.log("--- 1. 기본 인터페이스 ---\n");

interface User {
  id: number;
  name: string;
  email: string;
}

const user1: User = {
  id: 1,
  name: "김철수",
  email: "kim@example.com"
};

console.log(`사용자: ${user1.name} (${user1.email})`);

// 인터페이스를 사용하는 함수
function printUser(user: User): void {
  console.log(`  ID: ${user.id}`);
  console.log(`  이름: ${user.name}`);
  console.log(`  이메일: ${user.email}`);
}

printUser(user1);

// ============================================
// 2. 선택적 속성 (Optional Properties)
// ============================================

console.log("\n--- 2. 선택적 속성 (?) ---\n");

interface Product {
  id: number;
  name: string;
  price: number;
  description?: string; // 선택적 속성
  discount?: number;
}

const product1: Product = {
  id: 1,
  name: "노트북",
  price: 1500000
};

const product2: Product = {
  id: 2,
  name: "마우스",
  price: 30000,
  description: "무선 마우스",
  discount: 0.1
};

function displayProduct(product: Product): void {
  console.log(`\n상품: ${product.name}`);
  console.log(`  가격: ${product.price.toLocaleString()}원`);

  if (product.description) {
    console.log(`  설명: ${product.description}`);
  }

  if (product.discount) {
    const finalPrice = product.price * (1 - product.discount);
    console.log(`  할인가: ${finalPrice.toLocaleString()}원`);
  }
}

displayProduct(product1);
displayProduct(product2);

// ============================================
// 3. 읽기 전용 속성 (Readonly Properties)
// ============================================

console.log("\n--- 3. 읽기 전용 속성 (readonly) ---\n");

interface Config {
  readonly apiUrl: string;
  readonly timeout: number;
  retries?: number;
}

const config: Config = {
  apiUrl: "https://api.example.com",
  timeout: 5000,
  retries: 3
};

console.log(`API URL: ${config.apiUrl}`);
console.log(`타임아웃: ${config.timeout}ms`);

// config.apiUrl = "https://new-api.com"; // ❌ Error: Cannot assign to 'apiUrl'
// config.timeout = 10000; // ❌ Error: Cannot assign to 'timeout'

config.retries = 5; // ✅ 읽기 전용이 아닌 속성은 변경 가능
console.log(`재시도 횟수 변경: ${config.retries}`);

// ============================================
// 4. 함수 타입 인터페이스
// ============================================

console.log("\n--- 4. 함수 타입 인터페이스 ---\n");

interface Calculate {
  (a: number, b: number): number;
}

const add: Calculate = (a, b) => a + b;
const multiply: Calculate = (a, b) => a * b;

console.log(`add(5, 3) = ${add(5, 3)}`);
console.log(`multiply(5, 3) = ${multiply(5, 3)}`);

// 메서드를 가진 인터페이스
interface Calculator {
  add(a: number, b: number): number;
  subtract(a: number, b: number): number;
}

const calculator: Calculator = {
  add(a, b) {
    return a + b;
  },
  subtract(a, b) {
    return a - b;
  }
};

console.log(`calculator.add(10, 5) = ${calculator.add(10, 5)}`);
console.log(`calculator.subtract(10, 5) = ${calculator.subtract(10, 5)}`);

// ============================================
// 5. 인덱스 시그니처 (Index Signatures)
// ============================================

console.log("\n--- 5. 인덱스 시그니처 ---\n");

// 문자열 인덱스
interface StringDictionary {
  [key: string]: string;
}

const dictionary: StringDictionary = {
  hello: "안녕하세요",
  goodbye: "안녕히 가세요",
  thanks: "감사합니다"
};

console.log(`dictionary["hello"] = ${dictionary["hello"]}`);
console.log(`dictionary["thanks"] = ${dictionary["thanks"]}`);

// 숫자 인덱스
interface NumberArray {
  [index: number]: string;
}

const colors: NumberArray = {
  0: "빨강",
  1: "파랑",
  2: "초록"
};

console.log(`colors[0] = ${colors[0]}`);
console.log(`colors[1] = ${colors[1]}`);

// ============================================
// 6. 혼합 인덱스 시그니처
// ============================================

console.log("\n--- 6. 고정 속성과 인덱스 시그니처 ---\n");

interface UserDatabase {
  count: number; // 고정 속성
  [username: string]: number | User; // 인덱스 시그니처
}

const userDb: UserDatabase = {
  count: 2,
  "kim": { id: 1, name: "김철수", email: "kim@example.com" },
  "lee": { id: 2, name: "이영희", email: "lee@example.com" }
};

console.log(`총 사용자 수: ${userDb.count}`);
console.log(`사용자 'kim':`, userDb["kim"]);

// ============================================
// 7. 중첩된 인터페이스
// ============================================

console.log("\n--- 7. 중첩된 인터페이스 ---\n");

interface Address {
  street: string;
  city: string;
  zipCode: string;
}

interface Person {
  name: string;
  age: number;
  address: Address; // 중첩된 인터페이스
}

const person: Person = {
  name: "박민수",
  age: 30,
  address: {
    street: "강남대로 123",
    city: "서울",
    zipCode: "06000"
  }
};

console.log(`이름: ${person.name}, 나이: ${person.age}`);
console.log(`주소: ${person.address.city} ${person.address.street}`);
console.log(`우편번호: ${person.address.zipCode}`);

// ============================================
// 8. 배열 타입 인터페이스
// ============================================

console.log("\n--- 8. 배열 타입 ---\n");

interface Post {
  id: number;
  title: string;
  author: string;
  tags: string[];
}

const post: Post = {
  id: 1,
  title: "TypeScript 배우기",
  author: "김개발",
  tags: ["typescript", "programming", "tutorial"]
};

console.log(`\n게시글: ${post.title}`);
console.log(`작성자: ${post.author}`);
console.log(`태그: [${post.tags.join(", ")}]`);

// ============================================
// 9. 인터페이스 vs 타입 별칭
// ============================================

console.log("\n--- 9. 인터페이스 vs 타입 별칭 ---\n");

// 인터페이스
interface IPoint {
  x: number;
  y: number;
}

// 타입 별칭
type TPoint = {
  x: number;
  y: number;
};

const point1: IPoint = { x: 10, y: 20 };
const point2: TPoint = { x: 30, y: 40 };

console.log(`IPoint: (${point1.x}, ${point1.y})`);
console.log(`TPoint: (${point2.x}, ${point2.y})`);

console.log("\n✅ 인터페이스 특징:");
console.log("  - 확장(extends) 가능");
console.log("  - 선언 병합 가능");
console.log("  - 객체 타입에 주로 사용");

console.log("\n✅ 타입 별칭 특징:");
console.log("  - 유니온, 튜플 등 모든 타입 표현 가능");
console.log("  - 계산된 속성 사용 가능");
console.log("  - 프리미티브 타입 별칭 가능");

// ============================================
// 10. 실용 예제
// ============================================

console.log("\n--- 10. 실용 예제: API 응답 ---\n");

interface ApiResponse<T> {
  status: number;
  message: string;
  data?: T;
  timestamp: number;
}

interface UserData {
  id: number;
  username: string;
  email: string;
}

const successResponse: ApiResponse<UserData> = {
  status: 200,
  message: "성공",
  data: {
    id: 1,
    username: "user001",
    email: "user@example.com"
  },
  timestamp: Date.now()
};

console.log(`상태: ${successResponse.status} - ${successResponse.message}`);
if (successResponse.data) {
  console.log(`사용자: ${successResponse.data.username}`);
}

console.log("\n✅ 인터페이스 학습 완료!");
