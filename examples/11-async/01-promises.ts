/**
 * Chapter 11-01: Promise<T> 기본
 *
 * 이 파일에서 배울 내용:
 * - 프로미스 (Promise) - 비동기 작업의 완료 또는 실패를 나타내는 객체
 * - Promise<T> 제네릭 (Generic) - 프로미스가 반환할 값의 타입 지정
 * - then, catch, finally - 프로미스 핸들러 (Handler)
 * - Promise 체이닝 (Chaining) - 여러 비동기 작업을 순차적으로 연결
 * 왜 필요한가? 비동기 작업(API 호출, 파일 읽기 등)을 타입 안전하게 처리
 */

console.log("=== Promise 기본 예제 ===\n");

// 기본 Promise 생성
function delay(ms: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(), ms);
  });
}

console.log("1. 기본 Promise:");
console.log("  지연 시작...");
delay(100).then(() => {
  console.log("  100ms 경과!");
});

// 값을 반환하는 Promise
function fetchNumber(): Promise<number> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(42);
    }, 100);
  });
}

setTimeout(() => {
  console.log("\n2. 값을 반환하는 Promise:");
  fetchNumber().then((num) => {
    console.log("  받은 숫자:", num);
  });
}, 150);

// 타입이 있는 Promise
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

setTimeout(() => {
  console.log("\n3. 타입이 있는 Promise:");
  fetchUser(1).then((user) => {
    console.log("  사용자:", user.name);
    console.log("  이메일:", user.email);
  });
}, 300);

// Promise reject (오류 처리)
function fetchWithError(shouldFail: boolean): Promise<string> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldFail) {
        reject(new Error("데이터를 가져올 수 없습니다"));
      } else {
        resolve("성공적으로 데이터를 가져왔습니다");
      }
    }, 100);
  });
}

setTimeout(() => {
  console.log("\n4. Promise reject:");

  fetchWithError(false)
    .then((data) => console.log("  성공:", data))
    .catch((error) => console.log("  실패:", error.message));

  fetchWithError(true)
    .then((data) => console.log("  성공:", data))
    .catch((error) => console.log("  실패:", error.message));
}, 450);

// Promise 체이닝
function step1(): Promise<number> {
  return Promise.resolve(10);
}

function step2(value: number): Promise<number> {
  return Promise.resolve(value * 2);
}

function step3(value: number): Promise<string> {
  return Promise.resolve(`최종 값: ${value}`);
}

setTimeout(() => {
  console.log("\n5. Promise 체이닝:");
  step1()
    .then(step2)
    .then(step3)
    .then((result) => console.log("  ", result));
}, 600);

// 제네릭 Promise 래퍼
function wrapInPromise<T>(value: T, delay: number = 0): Promise<T> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(value), delay);
  });
}

setTimeout(() => {
  console.log("\n6. 제네릭 Promise:");

  wrapInPromise("Hello", 50).then((str) => {
    console.log("  문자열:", str);
  });

  wrapInPromise({ x: 10, y: 20 }, 50).then((point) => {
    console.log("  좌표:", point);
  });

  wrapInPromise([1, 2, 3, 4, 5], 50).then((arr) => {
    console.log("  배열:", arr);
  });
}, 750);

// 실용적인 예제: API 클라이언트
interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

class ApiClient {
  get<T>(url: string): Promise<ApiResponse<T>> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          data: { message: `GET ${url}` } as T
        });
      }, 100);
    });
  }

  post<T>(url: string, body: any): Promise<ApiResponse<T>> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          data: { message: `POST ${url}`, body } as T
        });
      }, 100);
    });
  }
}

setTimeout(() => {
  console.log("\n7. API 클라이언트:");
  const client = new ApiClient();

  client.get<User>("/users/1").then((response) => {
    if (response.success) {
      console.log("  GET 응답:", response.data);
    }
  });

  client.post<{ id: number }>("/users", { name: "이영희" }).then((response) => {
    if (response.success) {
      console.log("  POST 응답:", response.data);
    }
  });
}, 900);

// Promise.resolve와 Promise.reject
setTimeout(() => {
  console.log("\n8. Promise.resolve와 Promise.reject:");

  Promise.resolve(100).then((value) => {
    console.log("  즉시 해결:", value);
  });

  Promise.reject(new Error("즉시 거부")).catch((error) => {
    console.log("  즉시 거부:", error.message);
  });
}, 1100);

// finally 핸들러
setTimeout(() => {
  console.log("\n9. finally 핸들러:");

  fetchWithError(false)
    .then((data) => console.log("  데이터:", data))
    .catch((error) => console.log("  오류:", error.message))
    .finally(() => console.log("  정리 작업 완료"));
}, 1250);

setTimeout(() => {
  console.log("\n모든 Promise 예제 완료!");
}, 1400);
