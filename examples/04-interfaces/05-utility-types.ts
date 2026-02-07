/**
 * Chapter 04 - Interfaces
 * 05-utility-types.ts - 유틸리티 타입
 *
 * TypeScript 내장 유틸리티 타입을 학습합니다.
 * Partial, Required, Pick, Omit, Record 등을 실습합니다.
 */

console.log("=== 유틸리티 타입 (Utility Types) ===\n");

// ============================================
// 1. Partial<T> - 모든 속성을 선택적으로
// ============================================

console.log("--- 1. Partial<T> ---\n");

interface User {
  id: number;
  name: string;
  email: string;
  age: number;
}

// 모든 속성이 선택적이 됨
type PartialUser = Partial<User>;

function updateUser(id: number, updates: PartialUser): void {
  console.log(`사용자 ${id} 업데이트:`);
  if (updates.name) console.log(`  이름: ${updates.name}`);
  if (updates.email) console.log(`  이메일: ${updates.email}`);
  if (updates.age) console.log(`  나이: ${updates.age}`);
}

updateUser(1, { name: "김철수" });
updateUser(2, { email: "new@example.com", age: 30 });

// ============================================
// 2. Required<T> - 모든 속성을 필수로
// ============================================

console.log("\n--- 2. Required<T> ---\n");

interface Config {
  host?: string;
  port?: number;
  ssl?: boolean;
}

// 모든 속성이 필수가 됨
type RequiredConfig = Required<Config>;

const fullConfig: RequiredConfig = {
  host: "localhost",
  port: 3000,
  ssl: true
};

console.log(`서버 설정:`);
console.log(`  호스트: ${fullConfig.host}`);
console.log(`  포트: ${fullConfig.port}`);
console.log(`  SSL: ${fullConfig.ssl}`);

// ============================================
// 3. Readonly<T> - 모든 속성을 읽기 전용으로
// ============================================

console.log("\n--- 3. Readonly<T> ---\n");

type ReadonlyUser = Readonly<User>;

const user: ReadonlyUser = {
  id: 1,
  name: "이영희",
  email: "lee@example.com",
  age: 28
};

console.log(`읽기 전용 사용자: ${user.name}`);
// user.name = "박민수"; // ❌ Error: Cannot assign to 'name'

// ============================================
// 4. Pick<T, K> - 특정 속성만 선택
// ============================================

console.log("\n--- 4. Pick<T, K> ---\n");

// User에서 id와 name만 선택
type UserPreview = Pick<User, "id" | "name">;

const preview: UserPreview = {
  id: 1,
  name: "홍길동"
  // email과 age는 포함되지 않음
};

console.log(`사용자 미리보기: ${preview.id} - ${preview.name}`);

// ============================================
// 5. Omit<T, K> - 특정 속성 제외
// ============================================

console.log("\n--- 5. Omit<T, K> ---\n");

// User에서 age를 제외
type UserWithoutAge = Omit<User, "age">;

const userWithoutAge: UserWithoutAge = {
  id: 2,
  name: "최지은",
  email: "choi@example.com"
  // age는 포함되지 않음
};

console.log(`사용자 (나이 제외): ${userWithoutAge.name} (${userWithoutAge.email})`);

// ============================================
// 6. Record<K, T> - 키-값 쌍 타입 생성
// ============================================

console.log("\n--- 6. Record<K, T> ---\n");

type Role = "admin" | "user" | "guest";
type RolePermissions = Record<Role, string[]>;

const permissions: RolePermissions = {
  admin: ["read", "write", "delete"],
  user: ["read", "write"],
  guest: ["read"]
};

console.log("권한 설정:");
console.log(`  관리자: [${permissions.admin.join(", ")}]`);
console.log(`  사용자: [${permissions.user.join(", ")}]`);
console.log(`  게스트: [${permissions.guest.join(", ")}]`);

// Record로 객체 타입 빠르게 정의
type UserMap = Record<string, User>;

const users: UserMap = {
  "user1": { id: 1, name: "김철수", email: "kim@example.com", age: 30 },
  "user2": { id: 2, name: "이영희", email: "lee@example.com", age: 28 }
};

console.log("\n사용자 맵:");
console.log(`  user1: ${users.user1.name}`);
console.log(`  user2: ${users.user2.name}`);

// ============================================
// 7. Extract<T, U> - 조건에 맞는 타입 추출
// ============================================

console.log("\n--- 7. Extract<T, U> ---\n");

type AllTypes = string | number | boolean | (() => void);

// 함수 타입만 추출
type FunctionTypes = Extract<AllTypes, Function>;

// 프리미티브 타입만 추출
type PrimitiveTypes = Extract<AllTypes, string | number>;

console.log("Extract는 유니온에서 특정 타입을 추출합니다");
console.log("  AllTypes에서 Function 추출 → (() => void)");
console.log("  AllTypes에서 string | number 추출 → string | number");

// ============================================
// 8. Exclude<T, U> - 특정 타입 제외
// ============================================

console.log("\n--- 8. Exclude<T, U> ---\n");

type Status = "pending" | "success" | "error" | "cancelled";

// 'cancelled'를 제외한 상태
type ActiveStatus = Exclude<Status, "cancelled">;

function handleStatus(status: ActiveStatus): void {
  console.log(`  활성 상태: ${status}`);
}

handleStatus("pending");
handleStatus("success");
// handleStatus("cancelled"); // ❌ Error

// ============================================
// 9. NonNullable<T> - null과 undefined 제거
// ============================================

console.log("\n--- 9. NonNullable<T> ---\n");

type MaybeString = string | null | undefined;
type DefiniteString = NonNullable<MaybeString>; // string

function processString(str: DefiniteString): void {
  console.log(`  문자열 길이: ${str.length}`);
}

processString("TypeScript");
// processString(null); // ❌ Error
// processString(undefined); // ❌ Error

// ============================================
// 10. ReturnType<T> - 함수 반환 타입 추출
// ============================================

console.log("\n--- 10. ReturnType<T> ---\n");

function createUser(name: string, age: number) {
  return {
    id: Math.random(),
    name,
    age,
    createdAt: new Date()
  };
}

// 함수의 반환 타입을 추출
type UserType = ReturnType<typeof createUser>;

const newUser: UserType = {
  id: 0.123,
  name: "박민수",
  age: 25,
  createdAt: new Date()
};

console.log(`새 사용자: ${newUser.name}, ${newUser.age}세`);

// ============================================
// 11. Parameters<T> - 함수 매개변수 타입 추출
// ============================================

console.log("\n--- 11. Parameters<T> ---\n");

function sendEmail(to: string, subject: string, body: string): void {
  console.log(`  수신: ${to}`);
  console.log(`  제목: ${subject}`);
}

// 함수의 매개변수 타입을 튜플로 추출
type EmailParams = Parameters<typeof sendEmail>;

const emailArgs: EmailParams = [
  "user@example.com",
  "환영합니다",
  "가입을 환영합니다"
];

sendEmail(...emailArgs);

// ============================================
// 12. 유틸리티 타입 조합
// ============================================

console.log("\n--- 12. 유틸리티 타입 조합 ---\n");

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  stock: number;
}

// 여러 유틸리티 타입 조합
type ProductForm = Partial<Omit<Product, "id">>;
type ProductPreview = Pick<Product, "id" | "name" | "price">;
type ReadonlyProduct = Readonly<Required<Product>>;

const productForm: ProductForm = {
  name: "새 상품",
  price: 50000
  // 다른 필드는 선택적
};

const productPreview: ProductPreview = {
  id: 1,
  name: "노트북",
  price: 1500000
};

console.log("상품 폼:", productForm);
console.log(`상품 미리보기: ${productPreview.name} - ${productPreview.price.toLocaleString()}원`);

// ============================================
// 13. 실용 예제: API 타입
// ============================================

console.log("\n--- 13. 실용 예제 ---\n");

interface ApiUser {
  id: number;
  username: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

// 생성 시: password 제외하고 id, 날짜 자동 생성
type CreateUserInput = Omit<ApiUser, "id" | "createdAt" | "updatedAt" | "password"> & {
  password: string;
};

// 업데이트 시: 모든 필드 선택적 (id 제외)
type UpdateUserInput = Partial<Omit<ApiUser, "id">>;

// 응답 시: password 제외
type UserResponse = Omit<ApiUser, "password">;

const createInput: CreateUserInput = {
  username: "newuser",
  email: "new@example.com",
  password: "secret123"
};

const updateInput: UpdateUserInput = {
  email: "updated@example.com"
};

console.log("생성 입력:", createInput.username);
console.log("업데이트 입력:", updateInput.email);

// ============================================
// 14. 모범 사례
// ============================================

console.log("\n--- 14. 모범 사례 ---\n");

console.log("✅ 유틸리티 타입 사용 시점:");
console.log("  - Partial: 업데이트 함수, 폼 입력");
console.log("  - Required: 설정 객체 완전성");
console.log("  - Pick: API 응답 일부만 필요");
console.log("  - Omit: 민감한 정보 제외");
console.log("  - Record: 동적 객체 타입");
console.log("  - ReturnType: 함수 반환값 재사용");

console.log("\n💡 Tip: 유틸리티 타입을 조합하여 복잡한 타입을 만들 수 있습니다!");
