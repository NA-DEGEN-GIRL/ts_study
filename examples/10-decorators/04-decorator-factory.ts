/**
 * Chapter 10-04: 데코레이터 팩토리 (Decorator Factories)
 *
 * 파라미터를 받아 커스터마이즈된 데코레이터를 반환하는 팩토리 함수를 만듭니다.
 * 재사용 가능하고 설정 가능한 데코레이터를 작성할 수 있습니다.
 */

console.log("=== 데코레이터 팩토리 예제 ===\n");

// 기본 데코레이터 팩토리
function log(prefix: string) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = function (...args: any[]) {
      console.log(`  [${prefix}] ${propertyKey} 호출됨`);
      const result = originalMethod.apply(this, args);
      console.log(`  [${prefix}] 결과: ${result}`);
      return result;
    };

    return descriptor;
  };
}

class Calculator {
  @log("CALC")
  add(a: number, b: number): number {
    return a + b;
  }

  @log("MATH")
  multiply(a: number, b: number): number {
    return a * b;
  }
}

console.log("1. 파라미터화된 로깅 데코레이터:");
const calc = new Calculator();
calc.add(5, 3);
calc.multiply(4, 6);
console.log();

// 재시도 팩토리
function retry(attempts: number, delay: number = 0) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      for (let i = 0; i < attempts; i++) {
        try {
          return await originalMethod.apply(this, args);
        } catch (error) {
          console.log(`  [RETRY] 시도 ${i + 1}/${attempts} 실패`);
          if (i === attempts - 1) {
            throw error;
          }
          if (delay > 0) {
            await new Promise(resolve => setTimeout(resolve, delay));
          }
        }
      }
    };

    return descriptor;
  };
}

class NetworkService {
  private attempt = 0;

  @retry(3, 100)
  async fetchData(): Promise<string> {
    this.attempt++;
    if (this.attempt < 3) {
      throw new Error("연결 실패");
    }
    return "데이터 수신 완료";
  }
}

console.log("2. 재시도 데코레이터 팩토리:");
const network = new NetworkService();
network.fetchData()
  .then(result => console.log("  성공:", result))
  .catch(error => console.log("  실패:", error.message));

// 타임아웃 데코레이터 팩토리
function timeout(ms: number) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      return Promise.race([
        originalMethod.apply(this, args),
        new Promise((_, reject) =>
          setTimeout(() => reject(new Error(`${propertyKey} 타임아웃 (${ms}ms)`)), ms)
        )
      ]);
    };

    return descriptor;
  };
}

class AsyncOperations {
  @timeout(1000)
  async slowOperation(): Promise<string> {
    await new Promise(resolve => setTimeout(resolve, 2000));
    return "완료";
  }

  @timeout(2000)
  async fastOperation(): Promise<string> {
    await new Promise(resolve => setTimeout(resolve, 500));
    return "완료";
  }
}

console.log("\n3. 타임아웃 데코레이터 팩토리:");
const async = new AsyncOperations();

async.slowOperation()
  .then(result => console.log("  느린 작업:", result))
  .catch(error => console.log("  느린 작업:", error.message));

async.fastOperation()
  .then(result => console.log("  빠른 작업:", result))
  .catch(error => console.log("  빠른 작업:", error.message));

// 유효성 검증 팩토리
function validate(...validators: Array<(value: any) => boolean>) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = function (...args: any[]) {
      for (let i = 0; i < args.length; i++) {
        if (validators[i] && !validators[i](args[i])) {
          throw new Error(`${propertyKey}의 ${i + 1}번째 인자가 유효하지 않습니다`);
        }
      }
      return originalMethod.apply(this, args);
    };

    return descriptor;
  };
}

const isPositive = (n: number) => n > 0;
const isString = (s: any) => typeof s === "string";
const isEmail = (s: string) => s.includes("@");

class UserService {
  @validate(isString, isEmail)
  createUser(name: string, email: string): object {
    return { name, email, id: Date.now() };
  }

  @validate(isPositive)
  setAge(age: number): void {
    console.log(`  나이 설정: ${age}`);
  }
}

setTimeout(() => {
  console.log("\n4. 유효성 검증 팩토리:");
  const service = new UserService();

  try {
    console.log("  정상:", service.createUser("김철수", "kim@example.com"));
    service.setAge(25);
    service.createUser("", "invalid-email");
  } catch (error) {
    console.log("  오류:", (error as Error).message);
  }
  console.log();
}, 1500);

// 캐시 팩토리
function cache(ttl: number = Infinity) {
  const cacheStore = new Map<string, { value: any; timestamp: number }>();

  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = function (...args: any[]) {
      const key = JSON.stringify(args);
      const cached = cacheStore.get(key);

      if (cached && Date.now() - cached.timestamp < ttl) {
        console.log(`  [CACHE] 히트: ${propertyKey}(${args.join(", ")})`);
        return cached.value;
      }

      const result = originalMethod.apply(this, args);
      cacheStore.set(key, { value: result, timestamp: Date.now() });
      console.log(`  [CACHE] 미스: ${propertyKey}(${args.join(", ")})`);
      return result;
    };

    return descriptor;
  };
}

class DataService {
  @cache(5000) // 5초 TTL
  fetchUser(id: number): object {
    return { id, name: `User ${id}`, timestamp: Date.now() };
  }

  @cache() // 무한 TTL
  getConfig(): object {
    return { version: "1.0.0", timestamp: Date.now() };
  }
}

setTimeout(() => {
  console.log("5. 캐시 데코레이터 팩토리:");
  const data = new DataService();

  console.log("  첫 번째 호출:", data.fetchUser(1));
  console.log("  두 번째 호출:", data.fetchUser(1));
  console.log("  다른 ID:", data.fetchUser(2));
  console.log();
}, 1500);

// 권한 검사 팩토리
function authorize(...roles: string[]) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = function (this: any, ...args: any[]) {
      const userRole = this.role || "guest";

      if (!roles.includes(userRole)) {
        throw new Error(`${propertyKey} 실행 권한이 없습니다 (필요: ${roles.join(", ")})`);
      }

      return originalMethod.apply(this, args);
    };

    return descriptor;
  };
}

class AdminPanel {
  constructor(public role: string) {}

  @authorize("admin")
  deleteUser(id: number): void {
    console.log(`  사용자 ${id} 삭제됨`);
  }

  @authorize("admin", "moderator")
  banUser(id: number): void {
    console.log(`  사용자 ${id} 차단됨`);
  }

  @authorize("admin", "moderator", "user")
  viewProfile(id: number): void {
    console.log(`  사용자 ${id} 프로필 조회`);
  }
}

setTimeout(() => {
  console.log("6. 권한 검사 팩토리:");
  const admin = new AdminPanel("admin");
  const user = new AdminPanel("user");

  admin.deleteUser(1);
  admin.viewProfile(2);

  try {
    user.deleteUser(3);
  } catch (error) {
    console.log("  ", (error as Error).message);
  }
  console.log();
}, 1500);

// 데코레이터 조합 팩토리
function combine(...decorators: MethodDecorator[]) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    decorators.forEach(decorator => {
      decorator(target, propertyKey, descriptor);
    });
    return descriptor;
  };
}

setTimeout(() => {
  console.log("7. 데코레이터 조합:");
  console.log("  여러 데코레이터를 하나로 결합할 수 있습니다");
}, 1500);
