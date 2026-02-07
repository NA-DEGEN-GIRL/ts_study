/**
 * Chapter 11-03: 비동기 에러 처리
 *
 * async/await에서 try/catch를 사용한 에러 처리와
 * 커스텀 에러 타입을 만드는 방법을 학습합니다.
 */

console.log("=== 비동기 에러 처리 예제 ===\n");

// 기본 try/catch
async function basicErrorHandling(): Promise<void> {
  console.log("1. 기본 try/catch:");

  try {
    await Promise.reject(new Error("에러 발생!"));
  } catch (error) {
    console.log("  에러 잡음:", (error as Error).message);
  }
}

basicErrorHandling();

// 커스텀 에러 클래스
class ValidationError extends Error {
  constructor(public field: string, message: string) {
    super(message);
    this.name = "ValidationError";
  }
}

class NetworkError extends Error {
  constructor(public statusCode: number, message: string) {
    super(message);
    this.name = "NetworkError";
  }
}

class DatabaseError extends Error {
  constructor(public query: string, message: string) {
    super(message);
    this.name = "DatabaseError";
  }
}

async function customErrors(): Promise<void> {
  console.log("\n2. 커스텀 에러 클래스:");

  try {
    throw new ValidationError("email", "유효하지 않은 이메일");
  } catch (error) {
    if (error instanceof ValidationError) {
      console.log(`  검증 오류 [${error.field}]:`, error.message);
    }
  }

  try {
    throw new NetworkError(404, "페이지를 찾을 수 없음");
  } catch (error) {
    if (error instanceof NetworkError) {
      console.log(`  네트워크 오류 [${error.statusCode}]:`, error.message);
    }
  }
}

setTimeout(() => {
  customErrors();
}, 50);

// 에러 타입별 처리
async function fetchData(id: number): Promise<string> {
  if (id < 0) {
    throw new ValidationError("id", "ID는 양수여야 합니다");
  }
  if (id === 404) {
    throw new NetworkError(404, "데이터를 찾을 수 없습니다");
  }
  if (id === 500) {
    throw new DatabaseError("SELECT * FROM users", "데이터베이스 연결 실패");
  }
  return `데이터 ${id}`;
}

async function handleDifferentErrors(): Promise<void> {
  console.log("\n3. 에러 타입별 처리:");

  const ids = [-1, 404, 500, 1];

  for (const id of ids) {
    try {
      const data = await fetchData(id);
      console.log(`  성공 [ID ${id}]:`, data);
    } catch (error) {
      if (error instanceof ValidationError) {
        console.log(`  검증 실패 [ID ${id}]:`, error.message);
      } else if (error instanceof NetworkError) {
        console.log(`  네트워크 실패 [ID ${id}]:`, error.message);
      } else if (error instanceof DatabaseError) {
        console.log(`  데이터베이스 실패 [ID ${id}]:`, error.message);
      } else {
        console.log(`  알 수 없는 오류 [ID ${id}]:`, error);
      }
    }
  }
}

setTimeout(() => {
  handleDifferentErrors();
}, 100);

// Promise.catch vs try/catch
async function catchComparison(): Promise<void> {
  console.log("\n4. Promise.catch vs try/catch:");

  // Promise.catch 사용
  await Promise.reject(new Error("에러 1"))
    .catch((error) => {
      console.log("  Promise.catch:", error.message);
    });

  // try/catch 사용
  try {
    await Promise.reject(new Error("에러 2"));
  } catch (error) {
    console.log("  try/catch:", (error as Error).message);
  }
}

setTimeout(() => {
  catchComparison();
}, 200);

// 에러 재시도 로직
async function retryableOperation(attempt: number): Promise<string> {
  if (attempt < 3) {
    throw new Error(`시도 ${attempt} 실패`);
  }
  return "성공!";
}

async function retryWithBackoff(maxRetries: number = 3): Promise<void> {
  console.log("\n5. 에러 재시도 로직:");

  for (let i = 1; i <= maxRetries; i++) {
    try {
      const result = await retryableOperation(i);
      console.log(`  시도 ${i}:`, result);
      break;
    } catch (error) {
      console.log(`  시도 ${i}:`, (error as Error).message);
      if (i === maxRetries) {
        console.log("  최대 재시도 횟수 초과");
      }
    }
  }
}

setTimeout(() => {
  retryWithBackoff();
}, 250);

// 여러 Promise 에러 처리
async function multiplePromiseErrors(): Promise<void> {
  console.log("\n6. 여러 Promise 에러 처리:");

  const promises = [
    Promise.resolve("성공 1"),
    Promise.reject(new Error("실패 1")),
    Promise.resolve("성공 2"),
    Promise.reject(new Error("실패 2"))
  ];

  // Promise.allSettled로 모든 결과 처리
  const results = await Promise.allSettled(promises);

  results.forEach((result, index) => {
    if (result.status === "fulfilled") {
      console.log(`  Promise ${index + 1}:`, result.value);
    } else {
      console.log(`  Promise ${index + 1} 실패:`, result.reason.message);
    }
  });
}

setTimeout(() => {
  multiplePromiseErrors();
}, 300);

// 실용적인 예제: API 클라이언트 에러 처리
interface ApiResponse<T> {
  data?: T;
  error?: string;
}

class ApiClient {
  async get<T>(url: string): Promise<T> {
    try {
      // 시뮬레이션: 특정 URL에서 에러 발생
      if (url.includes("error")) {
        throw new NetworkError(500, "서버 오류");
      }

      return { message: `GET ${url}` } as T;
    } catch (error) {
      if (error instanceof NetworkError) {
        throw error;
      }
      throw new Error(`알 수 없는 오류: ${error}`);
    }
  }

  async post<T>(url: string, data: any): Promise<T> {
    if (!data || Object.keys(data).length === 0) {
      throw new ValidationError("data", "데이터가 비어있습니다");
    }

    return { message: `POST ${url}`, data } as T;
  }
}

async function useApiClient(): Promise<void> {
  console.log("\n7. API 클라이언트 에러 처리:");
  const client = new ApiClient();

  // 성공 케이스
  try {
    const result = await client.get("/users");
    console.log("  GET 성공:", result);
  } catch (error) {
    console.log("  GET 실패:", (error as Error).message);
  }

  // 네트워크 에러
  try {
    await client.get("/error");
  } catch (error) {
    if (error instanceof NetworkError) {
      console.log(`  네트워크 에러 [${error.statusCode}]:`, error.message);
    }
  }

  // 검증 에러
  try {
    await client.post("/users", {});
  } catch (error) {
    if (error instanceof ValidationError) {
      console.log(`  검증 에러 [${error.field}]:`, error.message);
    }
  }
}

setTimeout(() => {
  useApiClient();
}, 350);

// finally를 사용한 정리 작업
async function withFinally(): Promise<void> {
  console.log("\n8. finally를 사용한 정리:");

  let resource = "리소스 열림";

  try {
    console.log("  ", resource);
    throw new Error("작업 중 에러");
  } catch (error) {
    console.log("  에러:", (error as Error).message);
  } finally {
    resource = "리소스 닫힘";
    console.log("  정리:", resource);
  }
}

setTimeout(() => {
  withFinally();
}, 400);

// 에러 래핑
class ApplicationError extends Error {
  constructor(
    public code: string,
    message: string,
    public originalError?: Error
  ) {
    super(message);
    this.name = "ApplicationError";
  }
}

async function wrapErrors(): Promise<void> {
  console.log("\n9. 에러 래핑:");

  try {
    try {
      throw new Error("낮은 수준의 에러");
    } catch (error) {
      throw new ApplicationError(
        "APP_001",
        "애플리케이션 에러 발생",
        error as Error
      );
    }
  } catch (error) {
    if (error instanceof ApplicationError) {
      console.log(`  에러 코드: ${error.code}`);
      console.log(`  메시지: ${error.message}`);
      console.log(`  원본 에러: ${error.originalError?.message}`);
    }
  }
}

setTimeout(() => {
  wrapErrors();
  console.log("\n모든 에러 처리 예제 완료!");
}, 450);
