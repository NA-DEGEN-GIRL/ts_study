/**
 * Chapter 10-02: 메서드 데코레이터 (Method Decorators)
 *
 * 메서드의 동작을 수정하거나 확장하는 데코레이터를 만듭니다.
 * 로깅, 성능 측정, 캐싱, 에러 처리 등에 활용됩니다.
 */

console.log("=== 메서드 데코레이터 예제 ===\n");

// 기본 메서드 데코레이터: 로깅
function log(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;

  descriptor.value = function (...args: any[]) {
    console.log(`  [LOG] ${propertyKey} 호출됨`);
    console.log(`  [LOG] 인자:`, args);
    const result = originalMethod.apply(this, args);
    console.log(`  [LOG] 결과:`, result);
    return result;
  };

  return descriptor;
}

class Calculator {
  @log
  add(a: number, b: number): number {
    return a + b;
  }

  @log
  multiply(a: number, b: number): number {
    return a * b;
  }
}

console.log("1. 로깅 데코레이터:");
const calc = new Calculator();
calc.add(5, 3);
calc.multiply(4, 7);
console.log();

// 성능 측정 데코레이터
function measure(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;

  descriptor.value = function (...args: any[]) {
    const start = performance.now();
    const result = originalMethod.apply(this, args);
    const end = performance.now();
    console.log(`  [PERF] ${propertyKey} 실행 시간: ${(end - start).toFixed(2)}ms`);
    return result;
  };

  return descriptor;
}

class DataProcessor {
  @measure
  processData(size: number): number[] {
    const data = Array.from({ length: size }, (_, i) => i);
    return data.map(x => x * 2);
  }
}

console.log("2. 성능 측정 데코레이터:");
const processor = new DataProcessor();
processor.processData(10000);
console.log();

// 에러 처리 데코레이터
function catchError(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;

  descriptor.value = function (...args: any[]) {
    try {
      return originalMethod.apply(this, args);
    } catch (error) {
      console.log(`  [ERROR] ${propertyKey}에서 오류 발생:`, (error as Error).message);
      return null;
    }
  };

  return descriptor;
}

class FileHandler {
  @catchError
  readFile(filename: string): string {
    if (!filename) {
      throw new Error("파일명이 필요합니다");
    }
    return `${filename}의 내용`;
  }

  @catchError
  parseJSON(json: string): object {
    return JSON.parse(json);
  }
}

console.log("3. 에러 처리 데코레이터:");
const handler = new FileHandler();
console.log("  정상:", handler.readFile("test.txt"));
console.log("  오류:", handler.readFile(""));
console.log("  파싱 오류:", handler.parseJSON("invalid json"));
console.log();

// 캐싱 데코레이터
function memoize(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;
  const cache = new Map<string, any>();

  descriptor.value = function (...args: any[]) {
    const key = JSON.stringify(args);

    if (cache.has(key)) {
      console.log(`  [CACHE] 캐시에서 반환: ${propertyKey}(${args.join(", ")})`);
      return cache.get(key);
    }

    const result = originalMethod.apply(this, args);
    cache.set(key, result);
    console.log(`  [CACHE] 계산 후 캐싱: ${propertyKey}(${args.join(", ")})`);
    return result;
  };

  return descriptor;
}

class MathOperations {
  @memoize
  fibonacci(n: number): number {
    if (n <= 1) return n;
    return this.fibonacci(n - 1) + this.fibonacci(n - 2);
  }

  @memoize
  factorial(n: number): number {
    if (n <= 1) return 1;
    return n * this.factorial(n - 1);
  }
}

console.log("4. 캐싱 데코레이터:");
const math = new MathOperations();
console.log("  fibonacci(10):", math.fibonacci(10));
console.log("  fibonacci(10) 재호출:", math.fibonacci(10));
console.log("  factorial(5):", math.factorial(5));
console.log("  factorial(5) 재호출:", math.factorial(5));
console.log();

// 유효성 검증 데코레이터
function validate(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;

  descriptor.value = function (...args: any[]) {
    for (const arg of args) {
      if (arg === null || arg === undefined) {
        throw new Error(`${propertyKey}: null 또는 undefined 인자는 허용되지 않습니다`);
      }
    }
    return originalMethod.apply(this, args);
  };

  return descriptor;
}

class UserService {
  @validate
  createUser(name: string, email: string): object {
    return { name, email, id: Date.now() };
  }
}

console.log("5. 유효성 검증 데코레이터:");
const service = new UserService();
try {
  console.log("  정상:", service.createUser("김철수", "kim@example.com"));
  console.log("  오류:", service.createUser("", null as any));
} catch (error) {
  console.log("  ", (error as Error).message);
}
console.log();

// 다중 데코레이터 조합
class ComplexService {
  @log
  @measure
  @catchError
  complexOperation(data: string): string {
    console.log("    실제 작업 수행 중...");
    return data.toUpperCase();
  }
}

console.log("6. 다중 데코레이터 조합:");
const complex = new ComplexService();
complex.complexOperation("typescript");
console.log();

// 파라미터화된 데코레이터
function retry(times: number) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      for (let i = 0; i < times; i++) {
        try {
          return await originalMethod.apply(this, args);
        } catch (error) {
          console.log(`  [RETRY] 시도 ${i + 1}/${times} 실패`);
          if (i === times - 1) throw error;
        }
      }
    };

    return descriptor;
  };
}

class ApiClient {
  private attempt = 0;

  @retry(3)
  async fetchData(url: string): Promise<string> {
    this.attempt++;
    if (this.attempt < 3) {
      throw new Error("네트워크 오류");
    }
    return `데이터: ${url}`;
  }
}

console.log("7. 재시도 데코레이터:");
const api = new ApiClient();
api.fetchData("/api/users")
  .then(data => console.log("  성공:", data))
  .catch(error => console.log("  실패:", error.message));
