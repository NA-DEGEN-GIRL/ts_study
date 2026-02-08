/**
 * Chapter 10-01: 클래스 데코레이터 (Class Decorators)
 *
 * 이 파일에서 배울 내용:
 * - 데코레이터 (Decorator) - 클래스나 메서드를 수정/확장하는 함수 (@기호 사용)
 * - 클래스 데코레이터 - 클래스 정의 자체를 변경하거나 기능 추가
 * - 메타데이터 (Metadata) 추가 - 클래스에 추가 정보 저장
 * - 싱글톤 (Singleton) 패턴 - 데코레이터로 인스턴스 하나만 생성
 * 왜 필요한가? 코드 중복 없이 클래스에 공통 기능 추가 가능
 */

console.log("=== 클래스 데코레이터 예제 ===\n");

// 기본 클래스 데코레이터
function sealed(constructor: Function) {
  console.log(`  @sealed 적용됨: ${constructor.name}`);
  Object.seal(constructor);
  Object.seal(constructor.prototype);
}

@sealed
class SealedClass {
  constructor(public name: string) {}
}

console.log("1. 기본 클래스 데코레이터 (@sealed):");
const sealed1 = new SealedClass("테스트");
console.log("  인스턴스 생성:", sealed1.name);
console.log();

// 클래스에 메타데이터 추가
function component(name: string) {
  return function <T extends { new (...args: any[]): {} }>(constructor: T) {
    return class extends constructor {
      componentName = name;
      createdAt = new Date();
    };
  };
}

@component("UserComponent")
class UserComponent {
  constructor(public userId: number) {}
}

console.log("2. 메타데이터 추가 데코레이터:");
const userComp = new UserComponent(123) as any;
console.log("  userId:", userComp.userId);
console.log("  componentName:", userComp.componentName);
console.log("  createdAt:", userComp.createdAt.toISOString());
console.log();

// 로깅 데코레이터
function logged<T extends { new (...args: any[]): {} }>(constructor: T) {
  return class extends constructor {
    constructor(...args: any[]) {
      super(...args);
      console.log(`  [LOG] ${constructor.name} 인스턴스 생성됨`);
      console.log(`  [LOG] 인자:`, args);
    }
  };
}

@logged
class User {
  constructor(public name: string, public email: string) {}
}

console.log("3. 로깅 데코레이터:");
const user = new User("김철수", "kim@example.com");
console.log("  사용자:", user);
console.log();

// 싱글톤 패턴 데코레이터
function singleton<T extends { new (...args: any[]): {} }>(constructor: T) {
  let instance: any;

  return class extends constructor {
    constructor(...args: any[]) {
      if (instance) {
        return instance;
      }
      super(...args);
      instance = this;
    }
  } as T;
}

@singleton
class DatabaseConnection {
  constructor(public connectionString: string) {
    console.log("  데이터베이스 연결 생성:", connectionString);
  }
}

console.log("4. 싱글톤 데코레이터:");
const db1 = new DatabaseConnection("localhost:5432");
const db2 = new DatabaseConnection("remote:5432");
console.log("  db1 === db2:", db1 === db2);
console.log();

// 타임스탬프 데코레이터
function timestamped<T extends { new (...args: any[]): {} }>(constructor: T) {
  return class extends constructor {
    timestamp = Date.now();

    getAge() {
      return Date.now() - this.timestamp;
    }
  };
}

@timestamped
class Product {
  constructor(public name: string, public price: number) {}
}

console.log("5. 타임스탬프 데코레이터:");
const product = new Product("노트북", 1500000) as any;
console.log("  상품:", product.name);
setTimeout(() => {
  console.log("  생성된 지", product.getAge(), "ms 경과");
}, 100);

// 검증 데코레이터
function validated<T extends { new (...args: any[]): {} }>(constructor: T) {
  const original = constructor;

  const newConstructor: any = function (...args: any[]) {
    console.log("  [VALIDATION] 인스턴스 생성 전 검증 수행");
    const instance: any = new original(...args);

    // 검증 로직
    for (const key in instance) {
      if (instance[key] === null || instance[key] === undefined) {
        throw new Error(`속성 '${key}'는 null이나 undefined일 수 없습니다`);
      }
    }

    console.log("  [VALIDATION] 검증 완료");
    return instance;
  };

  newConstructor.prototype = original.prototype;
  return newConstructor;
}

@validated
class ValidatedUser {
  constructor(public name: string, public age: number) {}
}

console.log("\n6. 검증 데코레이터:");
try {
  const validUser = new ValidatedUser("이영희", 25);
  console.log("  유효한 사용자:", validUser);
} catch (error) {
  console.log("  오류:", (error as Error).message);
}
console.log();

// 다중 데코레이터
function first(constructor: Function) {
  console.log("  @first 적용됨");
}

function second(constructor: Function) {
  console.log("  @second 적용됨");
}

console.log("7. 다중 데코레이터 (아래에서 위로 실행):");
@first
@second
class MultiDecorated {}

console.log("  (데코레이터는 아래에서 위로 실행됩니다)");
