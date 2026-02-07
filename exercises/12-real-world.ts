/**
 * 챕터 12: 실전 프로젝트 패턴
 *
 * 이 챕터에서는 실무에서 자주 사용하는 고급 TypeScript 패턴을 학습합니다:
 * - Result 타입 (에러 처리)
 * - 타입 안전한 Event Emitter
 * - API 응답 타입
 * - Builder 패턴
 */

// 연습 1: Result 타입 (Rust-style 에러 처리)
// TODO: 성공 또는 실패를 나타내는 Result 타입을 구현하세요
type Result<T, E = Error> =
  | { ok: true; value: T }
  | { ok: false; error: E };

// TODO: Result를 쉽게 생성하는 헬퍼 함수들
function Ok<T>(value: T): Result<T, never> {
  // 구현하세요
  return { ok: true, value };
}

function Err<E>(error: E): Result<never, E> {
  // 구현하세요
  return { ok: false, error };
}

// TODO: Result를 사용하는 함수 예제
function divide(a: number, b: number): Result<number, string> {
  // 0으로 나누면 에러를 반환하세요
  // 그렇지 않으면 결과를 반환하세요
}

// 연습 2: 타입 안전한 Event Emitter
// TODO: 이벤트 이름과 페이로드를 타입 안전하게 관리하는 EventEmitter
interface Events {
  userLogin: { userId: string; timestamp: Date };
  userLogout: { userId: string };
  dataUpdated: { table: string; rowCount: number };
}

class TypeSafeEventEmitter<T extends Record<string, any>> {
  private listeners: { [K in keyof T]?: Array<(payload: T[K]) => void> } = {};

  // TODO: on 메서드를 구현하세요
  // 이벤트 이름과 콜백 함수를 받아서 등록합니다
  on<K extends keyof T>(event: K, callback: (payload: T[K]) => void): void {
    // 구현하세요
  }

  // TODO: emit 메서드를 구현하세요
  // 이벤트를 발생시키고 등록된 모든 콜백을 실행합니다
  emit<K extends keyof T>(event: K, payload: T[K]): void {
    // 구현하세요
  }

  // TODO: off 메서드를 구현하세요
  // 특정 콜백을 제거합니다
  off<K extends keyof T>(event: K, callback: (payload: T[K]) => void): void {
    // 구현하세요
  }
}

// 연습 3: API 응답 타입
// TODO: API 엔드포인트와 응답 타입을 매핑하는 시스템
interface ApiEndpoints {
  "/users": User[];
  "/users/:id": User;
  "/products": Product[];
  "/products/:id": Product;
}

interface User {
  id: string;
  name: string;
  email: string;
}

interface Product {
  id: string;
  name: string;
  price: number;
}

// TODO: API 클라이언트를 구현하세요
class ApiClient {
  async get<K extends keyof ApiEndpoints>(
    endpoint: K
  ): Promise<ApiEndpoints[K]> {
    // 실제로는 fetch를 사용하지만, 여기서는 Mock 데이터를 반환합니다
    // 엔드포인트에 따라 적절한 타입의 데이터를 반환하세요
    if (endpoint === "/users") {
      return [{ id: "1", name: "김철수", email: "kim@example.com" }] as any;
    }
    // TODO: 다른 엔드포인트도 처리하세요
    return null as any;
  }
}

// 연습 4: Builder 패턴
// TODO: 복잡한 객체를 단계적으로 생성하는 Builder 패턴
interface HttpRequest {
  url: string;
  method: "GET" | "POST" | "PUT" | "DELETE";
  headers?: Record<string, string>;
  body?: any;
  timeout?: number;
}

class HttpRequestBuilder {
  private request: Partial<HttpRequest> = {};

  // TODO: url 설정 메서드
  url(url: string): this {
    // 구현하세요
    return this;
  }

  // TODO: method 설정 메서드
  method(method: HttpRequest["method"]): this {
    // 구현하세요
    return this;
  }

  // TODO: header 추가 메서드
  header(key: string, value: string): this {
    // 구현하세요
    return this;
  }

  // TODO: body 설정 메서드
  body(body: any): this {
    // 구현하세요
    return this;
  }

  // TODO: build 메서드 - 필수 필드가 있는지 확인하고 반환
  build(): HttpRequest {
    if (!this.request.url || !this.request.method) {
      throw new Error("URL과 method는 필수입니다.");
    }
    return this.request as HttpRequest;
  }
}

// 연습 5: Branded Types (명목적 타이핑)
// TODO: 런타임에는 같지만 컴파일 타임에는 다른 타입으로 취급되는 Branded Type
type Brand<K, T> = K & { __brand: T };

type UserId = Brand<string, "UserId">;
type ProductId = Brand<string, "ProductId">;

// TODO: 타입 안전한 생성 함수들
function createUserId(id: string): UserId {
  // 구현하세요 (검증 로직 추가 가능)
  return id as UserId;
}

function createProductId(id: string): ProductId {
  // 구현하세요
  return id as ProductId;
}

// TODO: UserId만 받는 함수
function getUserById(id: UserId): string {
  return `사용자 ${id} 조회`;
}

// 테스트 케이스
console.log('=== 챕터 12: 실전 프로젝트 패턴 ===');

// Result 타입 테스트
const result1 = divide(10, 2);
const result2 = divide(10, 0);
console.log('나눗셈 성공:', result1);
console.log('나눗셈 실패:', result2);

// EventEmitter 테스트
const emitter = new TypeSafeEventEmitter<Events>();
emitter.on("userLogin", (payload) => {
  console.log('로그인:', payload.userId, payload.timestamp);
});
emitter.emit("userLogin", { userId: "user123", timestamp: new Date() });

// API 클라이언트 테스트
(async () => {
  const apiClient = new ApiClient();
  const users = await apiClient.get("/users");
  console.log('API 응답:', users);
})();

// Builder 패턴 테스트
const request = new HttpRequestBuilder()
  .url("https://api.example.com/data")
  .method("POST")
  .header("Content-Type", "application/json")
  .body({ key: "value" })
  .build();
console.log('HTTP 요청:', request);

// Branded Types 테스트
const userId = createUserId("user-123");
const productId = createProductId("prod-456");
console.log(getUserById(userId));
// console.log(getUserById(productId)); // 컴파일 에러!
