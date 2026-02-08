/**
 * 챕터 12: 실전 프로젝트 패턴 - 정답
 *
 * 이 챕터에서는 실무에서 자주 사용하는 고급 TypeScript 패턴을 학습합니다:
 * - Result 타입 (에러 처리)
 * - 타입 안전한 Event Emitter
 * - API 응답 타입
 * - Builder 패턴
 */

// 연습 1: Result 타입 (Rust-style 에러 처리)
// 풀이: 판별 유니온 (Discriminated Union)으로 성공/실패를 명시적으로 처리합니다
// try-catch 대신 Result 타입을 사용하면 에러 처리를 강제할 수 있습니다
type Result<T, E = Error> =
  | { ok: true; value: T }
  | { ok: false; error: E };

function Ok<T>(value: T): Result<T, never> {
  return { ok: true, value };
}

function Err<E>(error: E): Result<never, E> {
  return { ok: false, error };
}

// 풀이: Result 타입을 사용하면 에러 처리를 명시적으로 할 수 있습니다
// 함수 호출자는 반드시 ok 속성을 확인하여 성공/실패를 처리해야 합니다
function divide(a: number, b: number): Result<number, string> {
  if (b === 0) {
    return Err("0으로 나눌 수 없습니다");
  }
  return Ok(a / b);
}

// 연습 2: 타입 안전한 Event Emitter
// 풀이: 제네릭 (Generic)으로 이벤트 맵을 받아서 타입 안전한 이벤트 시스템을 구현합니다
// 각 이벤트 이름과 페이로드 타입을 매핑하여, 잘못된 이벤트나 페이로드를 사용하면 컴파일 에러가 발생합니다
interface Events {
  userLogin: { userId: string; timestamp: Date };
  userLogout: { userId: string };
  dataUpdated: { table: string; rowCount: number };
}

class TypeSafeEventEmitter<T extends Record<string, any>> {
  private listeners: { [K in keyof T]?: Array<(payload: T[K]) => void> } = {};

  on<K extends keyof T>(event: K, callback: (payload: T[K]) => void): void {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event]!.push(callback);
  }

  emit<K extends keyof T>(event: K, payload: T[K]): void {
    const callbacks = this.listeners[event];
    if (callbacks) {
      callbacks.forEach(callback => callback(payload));
    }
  }

  off<K extends keyof T>(event: K, callback: (payload: T[K]) => void): void {
    const callbacks = this.listeners[event];
    if (callbacks) {
      this.listeners[event] = callbacks.filter(cb => cb !== callback) as any;
    }
  }
}

// 연습 3: API 응답 타입
// 해설: 엔드포인트와 응답 타입을 매핑하여 타입 안전한 API 클라이언트를 만듭니다
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

class ApiClient {
  async get<K extends keyof ApiEndpoints>(
    endpoint: K
  ): Promise<ApiEndpoints[K]> {
    // Mock 데이터 반환
    if (endpoint === "/users") {
      return [{ id: "1", name: "김철수", email: "kim@example.com" }] as any;
    }
    if (endpoint === "/products") {
      return [{ id: "1", name: "노트북", price: 1500000 }] as any;
    }
    throw new Error(`알 수 없는 엔드포인트: ${endpoint}`);
  }
}

// 연습 4: Builder 패턴
// 풀이: Fluent API로 객체를 단계적으로 구성합니다
// 메서드 체이닝으로 가독성 좋게 복잡한 객체를 생성할 수 있습니다
interface HttpRequest {
  url: string;
  method: "GET" | "POST" | "PUT" | "DELETE";
  headers?: Record<string, string>;
  body?: any;
  timeout?: number;
}

class HttpRequestBuilder {
  private request: Partial<HttpRequest> = {};

  url(url: string): this {
    this.request.url = url;
    return this;
  }

  method(method: HttpRequest["method"]): this {
    this.request.method = method;
    return this;
  }

  header(key: string, value: string): this {
    if (!this.request.headers) {
      this.request.headers = {};
    }
    this.request.headers[key] = value;
    return this;
  }

  body(body: any): this {
    this.request.body = body;
    return this;
  }

  build(): HttpRequest {
    if (!this.request.url || !this.request.method) {
      throw new Error("URL과 method는 필수입니다.");
    }
    return this.request as HttpRequest;
  }
}

// 연습 5: Branded Types (명목적 타이핑)
// 풀이: 구조적으로는 같지만 의미적으로 다른 타입을 구분합니다
// UserId와 ProductId는 모두 string이지만, 서로 호환되지 않아 실수를 방지합니다
type Brand<K, T> = K & { __brand: T };

type UserId = Brand<string, "UserId">;
type ProductId = Brand<string, "ProductId">;

function createUserId(id: string): UserId {
  // 실제로는 검증 로직을 추가할 수 있습니다
  return id as UserId;
}

function createProductId(id: string): ProductId {
  return id as ProductId;
}

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
// console.log(getUserById(productId)); // 타입 에러! UserId가 필요한데 ProductId를 전달
