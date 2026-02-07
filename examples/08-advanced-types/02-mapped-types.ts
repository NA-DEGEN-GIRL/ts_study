/**
 * Chapter 08-02: 매핑된 타입 (Mapped Types)
 *
 * 기존 타입을 변환하여 새로운 타입을 생성합니다.
 * [K in keyof T] 문법으로 모든 속성을 순회하며 변환할 수 있습니다.
 */

console.log("=== 매핑된 타입 예제 ===\n");

// 기본 매핑된 타입: Readonly 구현
type MyReadonly<T> = {
  readonly [K in keyof T]: T[K];
};

interface User {
  id: number;
  name: string;
  email: string;
}

type ReadonlyUser = MyReadonly<User>;

const user: ReadonlyUser = {
  id: 1,
  name: "김철수",
  email: "kim@example.com"
};

console.log("1. Readonly 타입:");
console.log("  사용자:", user);
// user.name = "이영희"; // 오류: readonly 속성은 수정 불가
console.log("  (readonly 속성이므로 수정 불가)");
console.log();

// Partial 타입 구현
type MyPartial<T> = {
  [K in keyof T]?: T[K];
};

type PartialUser = MyPartial<User>;

function updateUser(user: User, updates: PartialUser): User {
  return { ...user, ...updates };
}

console.log("2. Partial 타입:");
const originalUser: User = { id: 1, name: "박민수", email: "park@example.com" };
const updatedUser = updateUser(originalUser, { name: "박철수" });
console.log("  원본:", originalUser);
console.log("  업데이트:", updatedUser);
console.log();

// Required 타입 구현
type MyRequired<T> = {
  [K in keyof T]-?: T[K]; // -? 로 선택적 속성 제거
};

interface OptionalConfig {
  host?: string;
  port?: number;
  debug?: boolean;
}

type RequiredConfig = MyRequired<OptionalConfig>;

const config: RequiredConfig = {
  host: "localhost",
  port: 3000,
  debug: true
};

console.log("3. Required 타입:");
console.log("  설정:", config);
console.log();

// Pick 타입 구현
type MyPick<T, K extends keyof T> = {
  [P in K]: T[P];
};

type UserPreview = MyPick<User, "id" | "name">;

function showPreview(user: UserPreview): string {
  return `${user.id}: ${user.name}`;
}

console.log("4. Pick 타입:");
console.log("  ", showPreview({ id: 1, name: "홍길동" }));
console.log();

// Omit 타입 구현
type MyOmit<T, K extends keyof T> = {
  [P in keyof T as P extends K ? never : P]: T[P];
};

type UserWithoutEmail = MyOmit<User, "email">;

const userWithoutEmail: UserWithoutEmail = {
  id: 2,
  name: "이순신"
};

console.log("5. Omit 타입:");
console.log("  이메일 제외:", userWithoutEmail);
console.log();

// 키 재매핑 (Key Remapping)
type Getters<T> = {
  [K in keyof T as `get${Capitalize<string & K>}`]: () => T[K];
};

type UserGetters = Getters<User>;
// { getId: () => number; getName: () => string; getEmail: () => string }

console.log("6. 키 재매핑 (Getters 패턴):");
console.log("  UserGetters는 getId, getName, getEmail 메서드를 가짐");
console.log();

// 조건부 속성 필터링
type FilterByType<T, U> = {
  [K in keyof T as T[K] extends U ? K : never]: T[K];
};

interface MixedTypes {
  id: number;
  name: string;
  age: number;
  active: boolean;
  email: string;
}

type StringProps = FilterByType<MixedTypes, string>;
// { name: string; email: string }

type NumberProps = FilterByType<MixedTypes, number>;
// { id: number; age: number }

console.log("7. 타입별 속성 필터링:");
console.log("  StringProps: name, email");
console.log("  NumberProps: id, age");
console.log();

// 실용적인 예제: 이벤트 맵
interface Events {
  click: { x: number; y: number };
  input: { value: string };
  submit: { formData: Record<string, string> };
}

type EventHandlers = {
  [K in keyof Events as `on${Capitalize<K>}`]: (event: Events[K]) => void;
};

const handlers: EventHandlers = {
  onClick: (event) => console.log(`  클릭: (${event.x}, ${event.y})`),
  onInput: (event) => console.log(`  입력: ${event.value}`),
  onSubmit: (event) => console.log(`  제출: ${Object.keys(event.formData).length}개 필드`)
};

console.log("8. 이벤트 핸들러 매핑:");
handlers.onClick({ x: 100, y: 200 });
handlers.onInput({ value: "TypeScript" });
handlers.onSubmit({ formData: { name: "홍길동" } });
