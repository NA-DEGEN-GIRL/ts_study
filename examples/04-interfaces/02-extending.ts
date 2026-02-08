/**
 * Chapter 04 - Interfaces
 * 02-extending.ts - 인터페이스 확장
 *
 * 이 파일에서 배울 내용:
 * - 인터페이스 확장 (Interface Extending) - extends 키워드로 기존 인터페이스 (Interface) 상속
 * - 다중 확장 - 여러 인터페이스를 동시에 확장
 * - 선언 병합 (Declaration Merging) - 같은 이름의 인터페이스 자동 병합
 * - 속성 재정의 (Property Override) - 확장 시 타입 좁히기
 * 왜 필요한가? 코드 재사용과 타입 계층 구조 구현
 */

console.log("=== 인터페이스 확장 (Extending Interfaces) ===\n");

// ============================================
// 1. 기본 인터페이스 확장
// ============================================

console.log("--- 1. 단일 인터페이스 확장 ---\n");

interface Animal {
  name: string;
  age: number;
}

// Animal을 확장하여 새로운 속성 추가
interface Dog extends Animal {
  breed: string;
  bark(): void;
}

const myDog: Dog = {
  name: "멍멍이",
  age: 3,
  breed: "골든 리트리버",
  bark() {
    console.log("  멍멍!");
  }
};

console.log(`강아지: ${myDog.name}, ${myDog.age}세, 품종: ${myDog.breed}`);
myDog.bark();

// ============================================
// 2. 다중 인터페이스 확장
// ============================================

console.log("\n--- 2. 다중 인터페이스 확장 ---\n");

interface Flyable {
  fly(): void;
  maxAltitude: number;
}

interface Swimmable {
  swim(): void;
  maxDepth: number;
}

// 여러 인터페이스를 동시에 확장
interface Duck extends Animal, Flyable, Swimmable {
  quack(): void;
}

const duck: Duck = {
  name: "도날드",
  age: 2,
  maxAltitude: 1000,
  maxDepth: 10,
  fly() {
    console.log("  날아갑니다!");
  },
  swim() {
    console.log("  수영합니다!");
  },
  quack() {
    console.log("  꽥꽥!");
  }
};

console.log(`오리: ${duck.name}, ${duck.age}세`);
console.log(`최대 고도: ${duck.maxAltitude}m, 최대 수심: ${duck.maxDepth}m`);
duck.fly();
duck.swim();
duck.quack();

// ============================================
// 3. 인터페이스 체인 확장
// ============================================

console.log("\n--- 3. 인터페이스 체인 확장 ---\n");

interface Entity {
  id: number;
  createdAt: Date;
}

interface Nameable extends Entity {
  name: string;
}

interface Person extends Nameable {
  email: string;
  age: number;
}

const person: Person = {
  id: 1,
  createdAt: new Date(),
  name: "김철수",
  email: "kim@example.com",
  age: 30
};

console.log(`ID: ${person.id}`);
console.log(`이름: ${person.name}, 이메일: ${person.email}`);
console.log(`생성일: ${person.createdAt.toLocaleDateString("ko-KR")}`);

// ============================================
// 4. 속성 오버라이드
// ============================================

console.log("\n--- 4. 속성 타입 좁히기 ---\n");

interface Vehicle {
  model: string;
  year: number;
  status: string | number; // 넓은 타입
}

interface Car extends Vehicle {
  status: number; // 더 구체적인 타입으로 좁힘
  doors: number;
}

const myCar: Car = {
  model: "소나타",
  year: 2024,
  status: 1, // number만 허용
  doors: 4
};

console.log(`차량: ${myCar.model} (${myCar.year})`);
console.log(`상태 코드: ${myCar.status}, 문 개수: ${myCar.doors}`);

// ============================================
// 5. 선언 병합 (Declaration Merging)
// ============================================

console.log("\n--- 5. 선언 병합 ---\n");

interface User {
  id: number;
  name: string;
}

// 같은 이름의 인터페이스를 다시 선언하면 병합됨
interface User {
  email: string;
  age: number;
}

// 두 선언이 병합되어 모든 속성을 가짐
const user: User = {
  id: 1,
  name: "이영희",
  email: "lee@example.com",
  age: 28
};

console.log(`사용자: ${user.name} (${user.email})`);
console.log(`ID: ${user.id}, 나이: ${user.age}`);

// ============================================
// 6. 실용 예제: CRUD 인터페이스
// ============================================

console.log("\n--- 6. CRUD 인터페이스 패턴 ---\n");

interface Timestamps {
  createdAt: Date;
  updatedAt: Date;
}

interface BaseEntity extends Timestamps {
  id: number;
}

interface Product extends BaseEntity {
  name: string;
  price: number;
  category: string;
}

const product: Product = {
  id: 1,
  name: "노트북",
  price: 1500000,
  category: "전자제품",
  createdAt: new Date("2024-01-01"),
  updatedAt: new Date()
};

console.log(`상품: ${product.name}`);
console.log(`가격: ${product.price.toLocaleString()}원`);
console.log(`카테고리: ${product.category}`);
console.log(`생성: ${product.createdAt.toLocaleDateString("ko-KR")}`);

// ============================================
// 7. 실용 예제: API 응답 타입
// ============================================

console.log("\n--- 7. API 응답 인터페이스 ---\n");

interface ApiBase {
  status: number;
  message: string;
  timestamp: number;
}

interface SuccessResponse<T> extends ApiBase {
  data: T;
}

interface ErrorResponse extends ApiBase {
  errorCode: string;
  details?: string;
}

const successRes: SuccessResponse<Product> = {
  status: 200,
  message: "성공",
  timestamp: Date.now(),
  data: product
};

const errorRes: ErrorResponse = {
  status: 404,
  message: "찾을 수 없음",
  timestamp: Date.now(),
  errorCode: "NOT_FOUND",
  details: "요청한 리소스를 찾을 수 없습니다"
};

console.log(`\n성공 응답: ${successRes.message} (${successRes.status})`);
console.log(`데이터:`, successRes.data.name);

console.log(`\n에러 응답: ${errorRes.message} (${errorRes.status})`);
console.log(`에러 코드: ${errorRes.errorCode}`);

// ============================================
// 8. 실용 예제: 이벤트 시스템
// ============================================

console.log("\n--- 8. 이벤트 인터페이스 ---\n");

interface BaseEvent {
  type: string;
  timestamp: number;
}

interface UserEvent extends BaseEvent {
  userId: number;
  username: string;
}

interface LoginEvent extends UserEvent {
  type: "login";
  ipAddress: string;
}

interface LogoutEvent extends UserEvent {
  type: "logout";
  duration: number;
}

const loginEvent: LoginEvent = {
  type: "login",
  timestamp: Date.now(),
  userId: 1,
  username: "user001",
  ipAddress: "192.168.1.1"
};

const logoutEvent: LogoutEvent = {
  type: "logout",
  timestamp: Date.now(),
  userId: 1,
  username: "user001",
  duration: 3600
};

console.log(`로그인 이벤트: ${loginEvent.username} (${loginEvent.ipAddress})`);
console.log(`로그아웃 이벤트: ${logoutEvent.username} (세션: ${logoutEvent.duration}초)`);

// ============================================
// 9. 인터페이스 확장 vs 교차 타입
// ============================================

console.log("\n--- 9. 확장 vs 교차 타입 ---\n");

// 인터페이스 확장
interface A {
  a: number;
}

interface B extends A {
  b: string;
}

// 교차 타입 (Type Intersection)
type C = {
  a: number;
};

type D = C & {
  b: string;
};

const obj1: B = { a: 1, b: "hello" };
const obj2: D = { a: 2, b: "world" };

console.log(`인터페이스 확장:`, obj1);
console.log(`교차 타입:`, obj2);

console.log("\n✅ 인터페이스 확장 장점:");
console.log("  - 명확한 상속 관계");
console.log("  - 에러 메시지가 더 명확");
console.log("  - 선언 병합 지원");

console.log("\n✅ 교차 타입 장점:");
console.log("  - 더 유연한 타입 조합");
console.log("  - 유니온 타입과 함께 사용 가능");

// ============================================
// 10. 모범 사례
// ============================================

console.log("\n--- 10. 모범 사례 ---\n");

console.log("✅ 인터페이스 확장 사용 시점:");
console.log("  - 공통 속성을 재사용할 때");
console.log("  - 계층 구조가 명확할 때");
console.log("  - 점진적으로 타입 확장할 때");
console.log("  - 라이브러리 타입 확장 (선언 병합)");

console.log("\n💡 Tip: 작은 인터페이스를 조합하여 큰 타입을 만드세요!");
