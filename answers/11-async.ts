/**
 * 챕터 11: 비동기 프로그래밍 - 정답
 *
 * 이 챕터에서는 TypeScript에서 비동기 코드를 타입 안전하게 작성하는 방법을 학습합니다:
 * - 프로미스 (Promise) 타이핑
 * - async/await
 * - 에러 처리
 * - 프로미스 조합
 */

// 연습 1: 프로미스 (Promise) 타이핑
// 풀이: Promise<T>의 제네릭 타입 (Generic)으로 resolve될 값의 타입을 지정합니다
// Promise<User>는 이 Promise가 성공하면 User 타입의 값을 반환한다는 의미입니다
interface User {
  id: number;
  name: string;
  email: string;
}

function fetchUser(id: number): Promise<User> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id,
        name: "김철수",
        email: "kim@example.com"
      });
    }, 100);
  });
}

// 연습 2: async/await 사용
// 풀이: async 함수는 자동으로 Promise를 반환합니다
// await 키워드로 Promise가 완료될 때까지 기다리고, 결과값을 받아옵니다
async function getUserProfile(userId: number): Promise<string> {
  const user = await fetchUser(userId);
  return `${user.name} (${user.email})`;
}

// 연습 3: 에러 처리
// 해설: try-catch로 비동기 에러를 처리하고, 타입 안전한 응답을 반환합니다
interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

async function fetchData(url: string): Promise<ApiResponse<any>> {
  try {
    if (url.includes("error")) {
      throw new Error("API 호출 실패");
    }
    return { success: true, data: { message: "성공" } };
  } catch (error) {
    // unknown 타입의 error를 안전하게 처리
    const message = error instanceof Error ? error.message : String(error);
    return { success: false, error: message };
  }
}

// 연습 4: Promise.all로 병렬 실행
// 풀이: Promise.all은 Promise 배열을 받아서 모든 결과의 배열을 반환합니다
// 여러 비동기 작업을 동시에 실행하여 성능을 향상시킬 수 있습니다
async function fetchMultipleUsers(ids: number[]): Promise<User[]> {
  const promises = ids.map(id => fetchUser(id));
  return Promise.all(promises);
}

// 연습 5: 커스텀 타입 가드 (Type Guard)로 에러 처리
// 풀이: instanceof로 Error 타입인지 확인하는 타입 가드
// unknown 타입의 에러를 안전하게 처리할 수 있습니다
function isError(error: unknown): error is Error {
  return error instanceof Error;
}

function getErrorMessage(error: unknown): string {
  if (isError(error)) {
    return error.message;
  }
  return String(error);
}

async function safeApiCall(url: string): Promise<string> {
  try {
    const response = await fetchData(url);
    if (!response.success) {
      throw new Error(response.error || "알 수 없는 오류");
    }
    return "성공";
  } catch (error) {
    return getErrorMessage(error);
  }
}

// 연습 6: Retry 로직 (고급)
// 풀이: 제네릭 (Generic)과 async/await를 사용하여 재시도 로직을 구현합니다
// 실패 시 자동으로 재시도하는 패턴은 네트워크 요청 등에서 유용합니다
async function retry<T>(
  fn: () => Promise<T>,
  maxAttempts: number = 3
): Promise<T> {
  let lastError: any;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;
      if (attempt < maxAttempts) {
        console.log(`시도 ${attempt} 실패, 재시도 중...`);
      }
    }
  }

  throw lastError;
}

// 테스트 케이스 (async IIFE 사용)
(async () => {
  console.log('=== 챕터 11: 비동기 프로그래밍 ===');

  const user = await fetchUser(1);
  console.log('사용자:', user);

  const profile = await getUserProfile(1);
  console.log('프로필:', profile);

  const successData = await fetchData("https://api.example.com/data");
  console.log('API 성공:', successData);

  const errorData = await fetchData("https://api.example.com/error");
  console.log('API 실패:', errorData);

  const users = await fetchMultipleUsers([1, 2, 3]);
  console.log('여러 사용자:', users);

  const safeResult = await safeApiCall("https://api.example.com/safe");
  console.log('안전한 호출:', safeResult);

  // Retry 테스트
  let attemptCount = 0;
  const retryResult = await retry(async () => {
    attemptCount++;
    if (attemptCount < 3) {
      throw new Error(`시도 ${attemptCount} 실패`);
    }
    return "성공!";
  });
  console.log('재시도 결과:', retryResult);
})();
