/**
 * Chapter 11-04: 병렬 비동기 처리
 *
 * Promise.all, Promise.race, Promise.allSettled, Promise.any를 사용하여
 * 여러 비동기 작업을 병렬로 처리하는 방법을 학습합니다.
 */

console.log("=== 병렬 비동기 처리 예제 ===\n");

// 유틸리티 함수
function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function fetchData(id: number, delayMs: number): Promise<string> {
  await delay(delayMs);
  return `데이터 ${id}`;
}

// Promise.all - 모든 Promise가 완료될 때까지 대기
async function usePromiseAll(): Promise<void> {
  console.log("1. Promise.all:");
  console.log("  작업 시작...");

  const start = Date.now();

  const results = await Promise.all([
    fetchData(1, 100),
    fetchData(2, 150),
    fetchData(3, 80)
  ]);

  const elapsed = Date.now() - start;

  console.log("  결과:", results);
  console.log(`  소요 시간: ${elapsed}ms (가장 긴 작업 기준)`);
}

usePromiseAll();

// Promise.all 타입 추론
interface User {
  id: number;
  name: string;
}

interface Post {
  id: number;
  title: string;
}

async function fetchUser(id: number): Promise<User> {
  await delay(100);
  return { id, name: `사용자 ${id}` };
}

async function fetchPosts(userId: number): Promise<Post[]> {
  await delay(100);
  return [
    { id: 1, title: "첫 번째 글" },
    { id: 2, title: "두 번째 글" }
  ];
}

async function fetchUserAndPosts(): Promise<void> {
  console.log("\n2. Promise.all 타입 추론:");

  const [user, posts] = await Promise.all([
    fetchUser(1),
    fetchPosts(1)
  ]);

  console.log("  사용자:", user.name);
  console.log("  게시글 수:", posts.length);
}

setTimeout(() => {
  fetchUserAndPosts();
}, 200);

// Promise.race - 가장 먼저 완료되는 Promise
async function usePromiseRace(): Promise<void> {
  console.log("\n3. Promise.race:");

  const result = await Promise.race([
    fetchData(1, 150).then(d => ({ data: d, source: "느림" })),
    fetchData(2, 50).then(d => ({ data: d, source: "빠름" })),
    fetchData(3, 100).then(d => ({ data: d, source: "중간" }))
  ]);

  console.log("  가장 빠른 결과:", result);
}

setTimeout(() => {
  usePromiseRace();
}, 450);

// Promise.race로 타임아웃 구현
async function withTimeout<T>(
  promise: Promise<T>,
  timeoutMs: number
): Promise<T> {
  return Promise.race([
    promise,
    new Promise<T>((_, reject) =>
      setTimeout(() => reject(new Error("타임아웃")), timeoutMs)
    )
  ]);
}

async function useTimeout(): Promise<void> {
  console.log("\n4. 타임아웃 구현:");

  try {
    const result = await withTimeout(fetchData(1, 50), 100);
    console.log("  성공:", result);
  } catch (error) {
    console.log("  실패:", (error as Error).message);
  }

  try {
    const result = await withTimeout(fetchData(2, 200), 100);
    console.log("  성공:", result);
  } catch (error) {
    console.log("  실패:", (error as Error).message);
  }
}

setTimeout(() => {
  useTimeout();
}, 650);

// Promise.allSettled - 성공/실패 관계없이 모든 결과
async function usePromiseAllSettled(): Promise<void> {
  console.log("\n5. Promise.allSettled:");

  const promises = [
    fetchData(1, 50),
    Promise.reject(new Error("에러 발생")),
    fetchData(2, 50),
    Promise.reject(new Error("또 다른 에러"))
  ];

  const results = await Promise.allSettled(promises);

  results.forEach((result, index) => {
    if (result.status === "fulfilled") {
      console.log(`  Promise ${index + 1} 성공:`, result.value);
    } else {
      console.log(`  Promise ${index + 1} 실패:`, result.reason.message);
    }
  });
}

setTimeout(() => {
  usePromiseAllSettled();
}, 950);

// Promise.any - 첫 번째 성공하는 Promise (ES2021+)
// Note: Promise.any는 ES2021에서 도입되었습니다.
// ES2020 타겟에서는 지원되지 않으므로 주석 처리합니다.
async function usePromiseAny(): Promise<void> {
  console.log("\n6. Promise.any (ES2021+):");
  console.log("  (이 예제는 ES2021+ 필요)");

  // ES2021 미만에서는 다음과 같이 구현 가능:
  async function promiseAny<T>(promises: Promise<T>[]): Promise<T> {
    return new Promise((resolve, reject) => {
      let errors: Error[] = [];
      let completed = 0;

      promises.forEach((promise, index) => {
        promise
          .then(resolve)
          .catch(error => {
            errors[index] = error;
            completed++;
            if (completed === promises.length) {
              reject(new Error("All promises rejected"));
            }
          });
      });
    });
  }

  try {
    const result = await promiseAny([
      delay(100).then(() => Promise.reject(new Error("실패 1"))),
      delay(150).then(() => "성공!"),
      delay(200).then(() => Promise.reject(new Error("실패 2")))
    ]);
    console.log("  첫 번째 성공:", result);
  } catch (error) {
    console.log("  모두 실패");
  }
}

setTimeout(() => {
  usePromiseAny();
}, 1100);

// 실용적인 예제: 병렬 API 호출
interface Stats {
  users: number;
  posts: number;
  comments: number;
}

async function fetchUserCount(): Promise<number> {
  await delay(100);
  return 150;
}

async function fetchPostCount(): Promise<number> {
  await delay(120);
  return 320;
}

async function fetchCommentCount(): Promise<number> {
  await delay(80);
  return 890;
}

async function getDashboardStats(): Promise<void> {
  console.log("\n7. 병렬 API 호출:");
  console.log("  통계 로딩 중...");

  const start = Date.now();

  const [users, posts, comments] = await Promise.all([
    fetchUserCount(),
    fetchPostCount(),
    fetchCommentCount()
  ]);

  const elapsed = Date.now() - start;

  const stats: Stats = { users, posts, comments };
  console.log("  통계:", stats);
  console.log(`  로딩 시간: ${elapsed}ms`);
}

setTimeout(() => {
  getDashboardStats();
}, 1400);

// 배열의 비동기 처리
async function processArrayInParallel(): Promise<void> {
  console.log("\n8. 배열 병렬 처리:");

  const ids = [1, 2, 3, 4, 5];

  // 병렬 처리
  const results = await Promise.all(
    ids.map(id => fetchData(id, 50))
  );

  console.log("  결과:", results);
}

setTimeout(() => {
  processArrayInParallel();
}, 1700);

// 청크 단위 병렬 처리
async function processInChunks<T, R>(
  items: T[],
  processor: (item: T) => Promise<R>,
  chunkSize: number
): Promise<R[]> {
  const results: R[] = [];

  for (let i = 0; i < items.length; i += chunkSize) {
    const chunk = items.slice(i, i + chunkSize);
    const chunkResults = await Promise.all(chunk.map(processor));
    results.push(...chunkResults);
  }

  return results;
}

async function useChunkedProcessing(): Promise<void> {
  console.log("\n9. 청크 단위 처리:");

  const ids = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const results = await processInChunks(
    ids,
    (id) => fetchData(id, 30),
    3 // 3개씩 처리
  );

  console.log("  처리된 항목 수:", results.length);
  console.log("  처음 3개:", results.slice(0, 3));
}

setTimeout(() => {
  useChunkedProcessing();
}, 1900);

// 순차 vs 병렬 비교
async function sequential(): Promise<number> {
  const start = Date.now();

  await fetchData(1, 50);
  await fetchData(2, 50);
  await fetchData(3, 50);

  return Date.now() - start;
}

async function parallel(): Promise<number> {
  const start = Date.now();

  await Promise.all([
    fetchData(1, 50),
    fetchData(2, 50),
    fetchData(3, 50)
  ]);

  return Date.now() - start;
}

async function comparePerformance(): Promise<void> {
  console.log("\n10. 순차 vs 병렬 비교:");

  const seqTime = await sequential();
  const parTime = await parallel();

  console.log(`  순차 실행: ${seqTime}ms`);
  console.log(`  병렬 실행: ${parTime}ms`);
  console.log(`  성능 향상: ${((seqTime / parTime) * 100 - 100).toFixed(0)}%`);
}

setTimeout(() => {
  comparePerformance().then(() => {
    console.log("\n모든 병렬 처리 예제 완료!");
  });
}, 2150);
