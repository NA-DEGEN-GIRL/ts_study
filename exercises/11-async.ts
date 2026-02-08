/**
 * 챕터 11: 비동기 프로그래밍
 *
 * 이 챕터에서는 TypeScript에서 비동기 코드를 타입 안전하게 작성하는 방법을 학습합니다:
 * - 프로미스 (Promise) 타이핑
 * - async/await
 * - 에러 처리
 * - 프로미스 조합
 */

// 연습 1: 프로미스 (Promise) 타이핑
// TODO: 사용자 데이터를 가져오는 함수를 작성하세요
// Promise의 제네릭 타입을 명시해야 합니다
// 예: function fetchUser(id: number): Promise<User>
interface User {
  id: number;
  name: string;
  email: string;
}

function fetchUser(id: number) {
  // TODO: Promise<User> 타입을 반환하도록 수정하세요
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
// TODO: async 함수로 여러 비동기 작업을 순차적으로 실행하세요
// async 함수는 자동으로 Promise를 반환합니다
async function getUserProfile(userId: number) {
  // TODO: fetchUser를 호출하고 결과를 User 타입으로 받으세요
  // await 키워드로 Promise의 결과를 기다립니다
  // 그리고 사용자 이름을 포함한 프로필 문자열을 반환하세요
  return "";
}

// 연습 3: 에러 처리
// TODO: 실패할 수 있는 API 호출을 안전하게 처리하세요
interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

async function fetchData(url: string): Promise<ApiResponse<any>> {
  // TODO: try-catch를 사용하여 에러를 처리하세요
  // 성공하면 { success: true, data: ... }
  // 실패하면 { success: false, error: ... } 를 반환
  try {
    // 실제로는 fetch(url)를 사용
    if (url.includes("error")) {
      throw new Error("API 호출 실패");
    }
    return { success: true, data: { message: "성공" } };
  } catch (error) {
    // TODO: error를 적절히 처리하세요
    // error는 unknown 타입이므로 타입 가드 (Type Guard)를 사용하세요
    return { success: false, error: "" };
  }
}

// 연습 4: Promise.all로 병렬 실행
// TODO: 여러 사용자를 동시에 가져오는 함수를 작성하세요
// Promise.all은 Promise 배열을 받아서 모든 결과의 배열을 반환합니다
async function fetchMultipleUsers(ids: number[]) {
  // TODO: Promise.all을 사용하여 모든 사용자를 동시에 가져오세요
  // 반환 타입은 Promise<User[]>이어야 합니다
}

// 연습 5: 커스텀 타입 가드 (Type Guard)로 에러 처리
// TODO: unknown 타입의 에러를 안전하게 처리하는 헬퍼 함수
function isError(error: unknown): error is Error {
  // TODO: error가 Error 인스턴스인지 확인하는 타입 가드
  // instanceof를 사용하세요
  return false;
}

function getErrorMessage(error: unknown): string {
  // TODO: isError를 사용하여 안전하게 에러 메시지를 추출하세요
  // Error 객체면 message를, 아니면 문자열로 변환하세요
  return "";
}

async function safeApiCall(url: string): Promise<string> {
  try {
    const response = await fetchData(url);
    if (!response.success) {
      throw new Error(response.error || "알 수 없는 오류");
    }
    return "성공";
  } catch (error) {
    // TODO: getErrorMessage를 사용하여 에러 메시지를 반환하세요
    return "";
  }
}

// 연습 6: Retry 로직 (고급)
// TODO: 실패 시 재시도하는 함수를 작성하세요
// 제네릭 (Generic)과 async/await를 사용하여 재시도 로직을 구현합니다
async function retry<T>(
  fn: () => Promise<T>,
  maxAttempts: number = 3
): Promise<T> {
  // TODO: 최대 maxAttempts번까지 재시도하는 로직을 구현하세요
  // try-catch로 에러를 잡고, 성공하면 결과를 반환하세요
  // 모든 시도가 실패하면 마지막 에러를 던지세요
  let lastError: any;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    // 여기에 구현하세요
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
