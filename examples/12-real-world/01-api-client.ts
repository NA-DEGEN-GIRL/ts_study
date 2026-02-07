/**
 * Chapter 12-01: 타입 안전한 API 클라이언트
 *
 * 제네릭을 활용하여 타입 안전한 HTTP 클라이언트를 구현합니다.
 * 요청/응답 타입을 명시하여 컴파일 타임에 오류를 잡을 수 있습니다.
 */

console.log("=== 타입 안전한 API 클라이언트 예제 ===\n");

// API 응답 타입
interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  timestamp: number;
}

// API 에러 클래스
class ApiError extends Error {
  constructor(
    public statusCode: number,
    message: string,
    public response?: any
  ) {
    super(message);
    this.name = "ApiError";
  }
}

// HTTP 메서드 타입
type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

// 요청 옵션
interface RequestOptions {
  headers?: Record<string, string>;
  timeout?: number;
}

// 제네릭 API 클라이언트
class ApiClient {
  constructor(protected baseUrl: string = "") {}

  protected async request<T>(
    method: HttpMethod,
    path: string,
    data?: any,
    options?: RequestOptions
  ): Promise<ApiResponse<T>> {
    // 실제 구현에서는 fetch를 사용
    // 여기서는 시뮬레이션
    await this.delay(100);

    console.log(`  ${method} ${this.baseUrl}${path}`);
    if (data) {
      console.log("  요청 데이터:", data);
    }

    // GET 요청인 경우 빈 객체를 반환
    const responseData = (method === "GET" && !data) ? {} as T : data as T;

    return {
      success: true,
      data: responseData,
      timestamp: Date.now()
    };
  }

  async get<T>(path: string, options?: RequestOptions): Promise<T> {
    const response = await this.request<T>("GET", path, undefined, options);
    if (!response.success || !response.data) {
      throw new ApiError(400, response.error || "요청 실패");
    }
    return response.data;
  }

  async post<T>(path: string, data: any, options?: RequestOptions): Promise<T> {
    const response = await this.request<T>("POST", path, data, options);
    if (!response.success || !response.data) {
      throw new ApiError(400, response.error || "요청 실패");
    }
    return response.data;
  }

  async put<T>(path: string, data: any, options?: RequestOptions): Promise<T> {
    const response = await this.request<T>("PUT", path, data, options);
    if (!response.success || !response.data) {
      throw new ApiError(400, response.error || "요청 실패");
    }
    return response.data;
  }

  async delete<T>(path: string, options?: RequestOptions): Promise<T> {
    const response = await this.request<T>("DELETE", path, undefined, options);
    if (!response.success || !response.data) {
      throw new ApiError(400, response.error || "요청 실패");
    }
    return response.data;
  }

  protected delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}

// 도메인 모델
interface User {
  id: number;
  name: string;
  email: string;
}

interface CreateUserDto {
  name: string;
  email: string;
}

interface UpdateUserDto {
  name?: string;
  email?: string;
}

interface Post {
  id: number;
  userId: number;
  title: string;
  content: string;
}

// 타입 안전한 서비스 레이어
class UserService {
  constructor(private client: ApiClient) {}

  async getUser(id: number): Promise<User> {
    return this.client.get<User>(`/users/${id}`);
  }

  async createUser(dto: CreateUserDto): Promise<User> {
    return this.client.post<User>("/users", dto);
  }

  async updateUser(id: number, dto: UpdateUserDto): Promise<User> {
    return this.client.put<User>(`/users/${id}`, dto);
  }

  async deleteUser(id: number): Promise<void> {
    return this.client.delete<void>(`/users/${id}`);
  }

  async getUserPosts(userId: number): Promise<Post[]> {
    return this.client.get<Post[]>(`/users/${userId}/posts`);
  }
}

// 사용 예제
async function example1(): Promise<void> {
  console.log("1. 기본 API 호출:");

  const client = new ApiClient("https://api.example.com");
  const userService = new UserService(client);

  // 사용자 생성
  const newUser = await userService.createUser({
    name: "김철수",
    email: "kim@example.com"
  });
  console.log("  생성된 사용자:", newUser);
}

example1();

// 페이지네이션 응답
interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
}

interface PaginationParams {
  page?: number;
  pageSize?: number;
}

class PaginatedApiClient extends ApiClient {
  protected async request<T>(
    method: HttpMethod,
    path: string,
    data?: any,
    options?: RequestOptions
  ): Promise<ApiResponse<T>> {
    await this.delay(100);

    console.log(`  ${method} ${this.baseUrl}${path}`);

    // 페이지네이션 경로에 대한 특별 처리
    if (path.includes('/users') && path.includes('page=')) {
      const mockPaginatedData = {
        items: [],
        total: 0,
        page: 1,
        pageSize: 10
      } as unknown as T;

      return {
        success: true,
        data: mockPaginatedData,
        timestamp: Date.now()
      };
    }

    return {
      success: true,
      data: data as T,
      timestamp: Date.now()
    };
  }

  async getPaginated<T>(
    path: string,
    params?: PaginationParams
  ): Promise<PaginatedResponse<T>> {
    const queryString = params
      ? `?page=${params.page || 1}&pageSize=${params.pageSize || 10}`
      : "";

    return this.get<PaginatedResponse<T>>(`${path}${queryString}`);
  }
}

async function example2(): Promise<void> {
  console.log("\n2. 페이지네이션:");

  const client = new PaginatedApiClient("https://api.example.com");

  const result = await client.getPaginated<User>("/users", {
    page: 1,
    pageSize: 10
  });

  console.log("  페이지:", result);
}

setTimeout(() => {
  example2();
}, 150);

// 인터셉터 패턴
type RequestInterceptor = (config: any) => any;
type ResponseInterceptor<T> = (response: ApiResponse<T>) => ApiResponse<T>;

class InterceptableApiClient extends ApiClient {
  private requestInterceptors: RequestInterceptor[] = [];
  private responseInterceptors: ResponseInterceptor<any>[] = [];

  addRequestInterceptor(interceptor: RequestInterceptor): void {
    this.requestInterceptors.push(interceptor);
  }

  addResponseInterceptor<T>(interceptor: ResponseInterceptor<T>): void {
    this.responseInterceptors.push(interceptor);
  }
}

async function example3(): Promise<void> {
  console.log("\n3. 인터셉터:");

  const client = new InterceptableApiClient("https://api.example.com");

  client.addRequestInterceptor((config) => {
    console.log("  [요청 인터셉터] 토큰 추가");
    return config;
  });

  client.addResponseInterceptor((response) => {
    console.log("  [응답 인터셉터] 응답 처리");
    return response;
  });

  await client.get<User>("/users/1");
}

setTimeout(() => {
  example3();
}, 300);

// 타입 안전한 쿼리 빌더
class QueryBuilder {
  private params: Record<string, any> = {};

  where(field: string, value: any): this {
    this.params[field] = value;
    return this;
  }

  limit(count: number): this {
    this.params.limit = count;
    return this;
  }

  offset(count: number): this {
    this.params.offset = count;
    return this;
  }

  build(): string {
    const queryString = Object.entries(this.params)
      .map(([key, value]) => `${key}=${value}`)
      .join("&");
    return queryString ? `?${queryString}` : "";
  }
}

async function example4(): Promise<void> {
  console.log("\n4. 쿼리 빌더:");

  const query = new QueryBuilder()
    .where("status", "active")
    .where("role", "admin")
    .limit(10)
    .offset(0)
    .build();

  console.log("  쿼리:", query);

  const client = new ApiClient("https://api.example.com");
  const users = await client.get<User[]>(`/users${query}`);
}

setTimeout(() => {
  example4();
}, 450);

// 캐싱 API 클라이언트
class CachedApiClient extends ApiClient {
  private cache = new Map<string, { data: any; timestamp: number }>();
  private cacheTTL = 60000; // 1분

  async get<T>(path: string, options?: RequestOptions): Promise<T> {
    const cached = this.cache.get(path);

    if (cached && Date.now() - cached.timestamp < this.cacheTTL) {
      console.log("  [캐시] 히트:", path);
      return cached.data;
    }

    console.log("  [캐시] 미스:", path);
    const data = await super.get<T>(path, options);
    this.cache.set(path, { data, timestamp: Date.now() });
    return data;
  }

  clearCache(): void {
    this.cache.clear();
    console.log("  캐시 클리어됨");
  }
}

async function example5(): Promise<void> {
  console.log("\n5. 캐싱:");

  const client = new CachedApiClient("https://api.example.com");

  await client.get<User>("/users/1");
  await client.get<User>("/users/1"); // 캐시에서 반환
  client.clearCache();
  await client.get<User>("/users/1"); // 다시 요청
}

setTimeout(() => {
  example5();
}, 600);

setTimeout(() => {
  console.log("\n모든 API 클라이언트 예제 완료!");
}, 900);
