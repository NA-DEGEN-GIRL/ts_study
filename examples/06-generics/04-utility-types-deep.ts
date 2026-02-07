/**
 * Chapter 06 - Generics
 * 04-utility-types-deep.ts - 고급 유틸리티 타입 만들기
 *
 * 제네릭과 매핑된 타입을 사용하여 커스텀 유틸리티 타입을 만드는 방법을 학습합니다.
 * 실무에서 유용한 고급 타입 패턴을 다룹니다.
 */

console.log("=== 커스텀 유틸리티 타입 만들기 ===\n");

// ============================================
// 1. DeepPartial - 중첩된 객체도 선택적으로
// ============================================

console.log("--- 1. DeepPartial ---\n");

type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

interface Config {
  server: {
    host: string;
    port: number;
    ssl: {
      enabled: boolean;
      cert: string;
    };
  };
  database: {
    host: string;
    port: number;
  };
}

// 모든 중첩된 속성이 선택적이 됨
const partialConfig: DeepPartial<Config> = {
  server: {
    host: "localhost"
    // port와 ssl은 선택적
  }
};

console.log("DeepPartial: 중첩된 객체의 모든 속성을 선택적으로 만듭니다");
console.log("partialConfig:", partialConfig);

// ============================================
// 2. DeepReadonly - 중첩된 객체도 읽기 전용으로
// ============================================

console.log("\n--- 2. DeepReadonly ---\n");

type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends object ? DeepReadonly<T[P]> : T[P];
};

const readonlyConfig: DeepReadonly<Config> = {
  server: {
    host: "localhost",
    port: 3000,
    ssl: {
      enabled: true,
      cert: "/path/to/cert"
    }
  },
  database: {
    host: "db.example.com",
    port: 5432
  }
};

console.log("DeepReadonly: 중첩된 객체도 모두 읽기 전용으로 만듭니다");
// readonlyConfig.server.host = "newhost"; // ❌ Error

// ============================================
// 3. Required 중첩 버전
// ============================================

console.log("\n--- 3. DeepRequired ---\n");

type DeepRequired<T> = {
  [P in keyof T]-?: T[P] extends object ? DeepRequired<T[P]> : T[P];
};

interface PartialUser {
  name?: string;
  profile?: {
    bio?: string;
    avatar?: string;
  };
}

type FullUser = DeepRequired<PartialUser>;

const fullUser: FullUser = {
  name: "김철수",
  profile: {
    bio: "개발자",
    avatar: "/avatar.jpg"
    // 모든 속성이 필수
  }
};

console.log("DeepRequired: 중첩된 선택적 속성도 모두 필수로 만듭니다");
console.log("fullUser:", fullUser);

// ============================================
// 4. Nullable - 모든 속성을 null 가능하게
// ============================================

console.log("\n--- 4. Nullable ---\n");

type Nullable<T> = {
  [P in keyof T]: T[P] | null;
};

interface Product {
  id: number;
  name: string;
  price: number;
}

type NullableProduct = Nullable<Product>;

const product1: NullableProduct = {
  id: 1,
  name: "노트북",
  price: null // null 허용
};

console.log("Nullable: 모든 속성에 null을 허용합니다");
console.log("product1:", product1);

// ============================================
// 5. PickByType - 특정 타입의 속성만 선택
// ============================================

console.log("\n--- 5. PickByType ---\n");

type PickByType<T, U> = {
  [P in keyof T as T[P] extends U ? P : never]: T[P];
};

interface Mixed {
  id: number;
  name: string;
  age: number;
  email: string;
  active: boolean;
}

type StringProps = PickByType<Mixed, string>; // { name: string; email: string }
type NumberProps = PickByType<Mixed, number>; // { id: number; age: number }

const stringProps: StringProps = {
  name: "이영희",
  email: "lee@example.com"
};

console.log("PickByType: 특정 타입의 속성만 선택합니다");
console.log("stringProps:", stringProps);

// ============================================
// 6. OmitByType - 특정 타입의 속성 제외
// ============================================

console.log("\n--- 6. OmitByType ---\n");

type OmitByType<T, U> = {
  [P in keyof T as T[P] extends U ? never : P]: T[P];
};

type NoNumbers = OmitByType<Mixed, number>; // number 타입 속성 제외

const noNumbers: NoNumbers = {
  name: "박민수",
  email: "park@example.com",
  active: true
};

console.log("OmitByType: 특정 타입의 속성을 제외합니다");
console.log("noNumbers:", noNumbers);

// ============================================
// 7. Mutable - readonly 제거
// ============================================

console.log("\n--- 7. Mutable ---\n");

type Mutable<T> = {
  -readonly [P in keyof T]: T[P];
};

interface ReadonlyUser {
  readonly id: number;
  readonly name: string;
  email: string;
}

type MutableUser = Mutable<ReadonlyUser>;

const mutableUser: MutableUser = {
  id: 1,
  name: "홍길동",
  email: "hong@example.com"
};

mutableUser.id = 2; // ✅ 가능
mutableUser.name = "김철수"; // ✅ 가능

console.log("Mutable: readonly를 제거합니다");
console.log("mutableUser:", mutableUser);

// ============================================
// 8. FunctionPropertyNames - 함수 속성 이름만 추출
// ============================================

console.log("\n--- 8. FunctionPropertyNames ---\n");

type FunctionPropertyNames<T> = {
  [K in keyof T]: T[K] extends Function ? K : never;
}[keyof T];

interface UserService {
  name: string;
  age: number;
  getUser(): void;
  updateUser(): void;
  deleteUser(): void;
}

type UserServiceMethods = FunctionPropertyNames<UserService>;
// "getUser" | "updateUser" | "deleteUser"

console.log("FunctionPropertyNames: 함수 타입 속성의 이름만 추출합니다");
console.log('UserServiceMethods = "getUser" | "updateUser" | "deleteUser"');

// ============================================
// 9. PromiseType - Promise의 resolve 타입 추출
// ============================================

console.log("\n--- 9. PromiseType ---\n");

type PromiseType<T> = T extends Promise<infer U> ? U : T;

type Example1 = PromiseType<Promise<string>>; // string
type Example2 = PromiseType<Promise<number>>; // number
type Example3 = PromiseType<boolean>; // boolean (Promise가 아님)

async function fetchUser(): Promise<{ id: number; name: string }> {
  return { id: 1, name: "김철수" };
}

type UserType = PromiseType<ReturnType<typeof fetchUser>>;
// { id: number; name: string }

console.log("PromiseType: Promise의 resolve 타입을 추출합니다");
console.log("Promise<User> → User");

// ============================================
// 10. Diff - 차집합 타입
// ============================================

console.log("\n--- 10. Diff ---\n");

type Diff<T, U> = T extends U ? never : T;

type AB = "a" | "b" | "c";
type AC = "a" | "c" | "d";

type OnlyInAB = Diff<AB, AC>; // "b"

console.log('Diff: 타입 차집합을 구합니다');
console.log('"a" | "b" | "c" - ("a" | "c" | "d") = "b"');

// ============================================
// 11. 실용 예제: API 응답 타입 변환
// ============================================

console.log("\n--- 11. API 응답 타입 변환 ---\n");

type Await<T> = T extends Promise<infer U> ? U : T;

type UnwrapArray<T> = T extends (infer U)[] ? U : T;

type ApiArray<T> = Promise<T[]>;

type ExtractData<T> = Await<UnwrapArray<Await<T>>>;

type UserArrayPromise = ApiArray<{ id: number; name: string }>;
type SingleUser = ExtractData<UserArrayPromise>;
// { id: number; name: string }

console.log("복잡한 API 응답 타입에서 실제 데이터 타입을 추출합니다");

// ============================================
// 12. 실용 예제: Form State
// ============================================

console.log("\n--- 12. Form State 타입 ---\n");

type FormState<T> = {
  [K in keyof T]: {
    value: T[K];
    error?: string;
    touched: boolean;
  };
};

interface LoginForm {
  email: string;
  password: string;
}

const loginState: FormState<LoginForm> = {
  email: {
    value: "user@example.com",
    touched: true
  },
  password: {
    value: "secret123",
    error: "비밀번호가 너무 짧습니다",
    touched: true
  }
};

console.log("FormState: 폼 필드의 상태를 관리하는 타입");
console.log("loginState:", loginState);

// ============================================
// 13. 실용 예제: Event Handler Map
// ============================================

console.log("\n--- 13. Event Handler Map ---\n");

type EventHandlerMap<T> = {
  [K in keyof T as `on${Capitalize<string & K>}`]: (value: T[K]) => void;
};

interface UserFormData {
  username: string;
  email: string;
  age: number;
}

type FormHandlers = EventHandlerMap<UserFormData>;
// {
//   onUsername: (value: string) => void;
//   onEmail: (value: string) => void;
//   onAge: (value: number) => void;
// }

const handlers: FormHandlers = {
  onUsername: (value) => console.log(`  Username changed: ${value}`),
  onEmail: (value) => console.log(`  Email changed: ${value}`),
  onAge: (value) => console.log(`  Age changed: ${value}`)
};

handlers.onUsername("newuser");
handlers.onEmail("new@example.com");
handlers.onAge(25);

// ============================================
// 14. 모범 사례
// ============================================

console.log("\n--- 14. 커스텀 유틸리티 타입 가이드 ---\n");

console.log("✅ 커스텀 유틸리티 타입 만들 때:");
console.log("  - 재사용성을 고려한 제네릭 설계");
console.log("  - 명확한 이름 사용 (의도 표현)");
console.log("  - 복잡한 타입은 단계별로 구성");
console.log("  - 타입 테스트 케이스 작성");

console.log("\n✅ 매핑된 타입 패턴:");
console.log("  - [P in keyof T]: 모든 키 순회");
console.log("  - T[P]: 속성 타입 접근");
console.log("  - -readonly, -?: 수정자 제거");
console.log("  - as: 키 이름 변환");

console.log("\n💡 Tip: 반복되는 타입 패턴을 유틸리티 타입으로 추출하세요!");
