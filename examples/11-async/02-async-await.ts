/**
 * Chapter 11-02: async/await
 *
 * async/await 문법을 사용하여 비동기 코드를 동기 코드처럼 작성합니다.
 * Promise보다 읽기 쉽고 디버깅하기 좋은 코드를 만들 수 있습니다.
 */

console.log("=== async/await 예제 ===\n");

// 기본 async 함수
async function basicAsync(): Promise<string> {
  return "Hello, async!";
}

console.log("1. 기본 async 함수:");
basicAsync().then((result) => {
  console.log("  ", result);
});

// await로 Promise 기다리기
function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function withAwait(): Promise<void> {
  console.log("\n2. await로 Promise 기다리기:");
  console.log("  시작...");
  await delay(100);
  console.log("  100ms 경과!");
  await delay(100);
  console.log("  200ms 경과!");
}

withAwait();

// 값 반환하기
async function fetchNumber(): Promise<number> {
  await delay(100);
  return 42;
}

async function useNumber(): Promise<void> {
  console.log("\n3. async/await로 값 받기:");
  const num = await fetchNumber();
  console.log("  받은 숫자:", num);
  const doubled = num * 2;
  console.log("  두 배:", doubled);
}

setTimeout(() => {
  useNumber();
}, 250);

// 타입이 있는 async 함수
interface User {
  id: number;
  name: string;
  email: string;
}

async function fetchUser(id: number): Promise<User> {
  await delay(100);
  return {
    id,
    name: "김철수",
    email: "kim@example.com"
  };
}

async function getUserInfo(): Promise<void> {
  console.log("\n4. 타입이 있는 async 함수:");
  const user = await fetchUser(1);
  console.log("  사용자 ID:", user.id);
  console.log("  이름:", user.name);
  console.log("  이메일:", user.email);
}

setTimeout(() => {
  getUserInfo();
}, 500);

// 순차 실행
async function sequential(): Promise<void> {
  console.log("\n5. 순차 실행:");

  const start = Date.now();

  console.log("  작업 1 시작...");
  await delay(100);
  console.log("  작업 1 완료");

  console.log("  작업 2 시작...");
  await delay(100);
  console.log("  작업 2 완료");

  const elapsed = Date.now() - start;
  console.log(`  총 소요 시간: ${elapsed}ms`);
}

setTimeout(() => {
  sequential();
}, 750);

// 병렬 실행
async function parallel(): Promise<void> {
  console.log("\n6. 병렬 실행:");

  const start = Date.now();

  const [result1, result2] = await Promise.all([
    delay(100).then(() => "작업 1 완료"),
    delay(100).then(() => "작업 2 완료")
  ]);

  console.log("  ", result1);
  console.log("  ", result2);

  const elapsed = Date.now() - start;
  console.log(`  총 소요 시간: ${elapsed}ms`);
}

setTimeout(() => {
  parallel();
}, 1100);

// 에러 처리
async function mightFail(shouldFail: boolean): Promise<string> {
  await delay(50);
  if (shouldFail) {
    throw new Error("작업 실패!");
  }
  return "작업 성공!";
}

async function handleErrors(): Promise<void> {
  console.log("\n7. 에러 처리:");

  try {
    const result1 = await mightFail(false);
    console.log("  ", result1);
  } catch (error) {
    console.log("  오류:", (error as Error).message);
  }

  try {
    const result2 = await mightFail(true);
    console.log("  ", result2);
  } catch (error) {
    console.log("  오류:", (error as Error).message);
  }
}

setTimeout(() => {
  handleErrors();
}, 1350);

// 여러 Promise 처리
interface Post {
  id: number;
  title: string;
}

async function fetchPosts(): Promise<Post[]> {
  await delay(100);
  return [
    { id: 1, title: "첫 번째 글" },
    { id: 2, title: "두 번째 글" },
    { id: 3, title: "세 번째 글" }
  ];
}

async function processPosts(): Promise<void> {
  console.log("\n8. 여러 Promise 처리:");
  const posts = await fetchPosts();

  console.log("  게시글 목록:");
  for (const post of posts) {
    console.log(`    ${post.id}. ${post.title}`);
  }
}

setTimeout(() => {
  processPosts();
}, 1550);

// 실용적인 예제: 데이터 파이프라인
interface RawData {
  value: number;
}

interface ProcessedData {
  value: number;
  doubled: number;
  squared: number;
}

async function fetchData(): Promise<RawData> {
  await delay(50);
  return { value: 10 };
}

async function processData(data: RawData): Promise<ProcessedData> {
  await delay(50);
  return {
    value: data.value,
    doubled: data.value * 2,
    squared: data.value ** 2
  };
}

async function saveData(data: ProcessedData): Promise<void> {
  await delay(50);
  console.log("  데이터 저장됨:", data);
}

async function dataPipeline(): Promise<void> {
  console.log("\n9. 데이터 파이프라인:");
  console.log("  1. 데이터 가져오기...");
  const rawData = await fetchData();

  console.log("  2. 데이터 처리하기...");
  const processed = await processData(rawData);

  console.log("  3. 데이터 저장하기...");
  await saveData(processed);

  console.log("  파이프라인 완료!");
}

setTimeout(() => {
  dataPipeline();
}, 1800);

// async IIFE (즉시 실행 함수)
setTimeout(() => {
  console.log("\n10. async IIFE:");

  (async () => {
    const value = await Promise.resolve(100);
    console.log("  즉시 실행된 async 함수:", value);
  })();
}, 2050);

// 조건부 await
async function conditionalAwait(useAsync: boolean): Promise<number> {
  if (useAsync) {
    return await fetchNumber();
  }
  return 0;
}

setTimeout(async () => {
  console.log("\n11. 조건부 await:");
  const result1 = await conditionalAwait(true);
  const result2 = await conditionalAwait(false);
  console.log("  비동기 결과:", result1);
  console.log("  동기 결과:", result2);

  console.log("\n모든 async/await 예제 완료!");
}, 2250);
