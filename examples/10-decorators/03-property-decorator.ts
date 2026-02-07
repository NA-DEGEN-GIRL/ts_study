/**
 * Chapter 10-03: 속성 데코레이터 (Property Decorators)
 *
 * 클래스 속성에 메타데이터를 추가하거나 동작을 수정하는 데코레이터를 만듭니다.
 * 유효성 검증, 직렬화, 반응성 등에 활용됩니다.
 */

console.log("=== 속성 데코레이터 예제 ===\n");

// 기본 속성 데코레이터
function logProperty(target: any, propertyKey: string) {
  console.log(`  @logProperty 적용됨: ${target.constructor.name}.${propertyKey}`);
}

class User {
  @logProperty
  name: string;

  @logProperty
  email: string;

  constructor(name: string, email: string) {
    this.name = name;
    this.email = email;
  }
}

console.log("1. 기본 속성 데코레이터:");
const user = new User("김철수", "kim@example.com");
console.log("  사용자:", user);
console.log();

// 필수 속성 마킹
const requiredMetadataKey = Symbol("required");

function required(target: any, propertyKey: string) {
  if (!target[requiredMetadataKey]) {
    target[requiredMetadataKey] = [];
  }
  target[requiredMetadataKey].push(propertyKey);
}

function validate(target: any): void {
  const requiredProperties = target.constructor.prototype[requiredMetadataKey] || [];

  for (const prop of requiredProperties) {
    if (!target[prop]) {
      console.log(`  [VALIDATION] 필수 속성 누락: ${prop}`);
    }
  }
}

class Product {
  @required
  name!: string;

  @required
  price!: number;

  description?: string;

  constructor(data: Partial<Product>) {
    Object.assign(this, data);
    validate(this);
  }
}

console.log("2. 필수 속성 검증:");
const product1 = new Product({ name: "노트북", price: 1500000 });
console.log("  정상 상품:", product1);

const product2 = new Product({ name: "마우스" } as any);
console.log("  불완전한 상품:", product2);
console.log();

// 기본값 설정 데코레이터
function defaultValue(value: any) {
  return function (target: any, propertyKey: string) {
    let val = value;

    Object.defineProperty(target, propertyKey, {
      get() {
        return val;
      },
      set(newVal) {
        val = newVal !== undefined ? newVal : value;
      },
      enumerable: true,
      configurable: true
    });
  };
}

class Configuration {
  @defaultValue("localhost")
  host!: string;

  @defaultValue(3000)
  port!: number;

  @defaultValue(true)
  debug!: boolean;
}

console.log("3. 기본값 설정 데코레이터:");
const config1 = new Configuration();
console.log("  기본 설정:", config1);

const config2 = new Configuration();
config2.host = "example.com";
config2.port = 8080;
console.log("  사용자 설정:", config2);
console.log();

// 읽기 전용 속성
function readonly(target: any, propertyKey: string) {
  let value: any;

  Object.defineProperty(target, propertyKey, {
    get() {
      return value;
    },
    set(newValue: any) {
      if (value === undefined) {
        value = newValue;
      }
      // 이미 값이 설정되어 있으면 무시
    },
    enumerable: true,
    configurable: true
  });
}

class Constants {
  @readonly
  API_URL: string = "https://api.example.com";

  @readonly
  VERSION: string = "1.0.0";
}

console.log("4. 읽기 전용 데코레이터:");
const constants = new Constants();
console.log("  API_URL:", constants.API_URL);
console.log("  VERSION:", constants.VERSION);
console.log("  (속성 수정 시도는 무시됨)");
console.log();

// 포맷팅 데코레이터
function format(formatter: (value: any) => any) {
  return function (target: any, propertyKey: string) {
    let value: any;

    Object.defineProperty(target, propertyKey, {
      get() {
        return value;
      },
      set(newValue: any) {
        value = formatter(newValue);
      },
      enumerable: true,
      configurable: true
    });
  };
}

class Person {
  @format((value: string) => value.toUpperCase())
  name!: string;

  @format((value: string) => value.toLowerCase())
  email!: string;

  @format((value: number) => Math.max(0, value))
  age!: number;
}

console.log("5. 포맷팅 데코레이터:");
const person = new Person();
person.name = "kim chulsu";
person.email = "KIM@EXAMPLE.COM";
person.age = -5;
console.log("  이름 (대문자):", person.name);
console.log("  이메일 (소문자):", person.email);
console.log("  나이 (최소 0):", person.age);
console.log();

// 관찰 가능한 속성 (Observable)
function observable(target: any, propertyKey: string) {
  const listeners = new Set<(value: any) => void>();
  let value: any;

  Object.defineProperty(target, propertyKey, {
    get() {
      return value;
    },
    set(newValue: any) {
      const oldValue = value;
      value = newValue;
      if (oldValue !== newValue) {
        listeners.forEach(listener => listener(newValue));
      }
    },
    enumerable: true,
    configurable: true
  });

  // 리스너 등록 메서드 추가
  const subscribeKey = `subscribe${propertyKey.charAt(0).toUpperCase() + propertyKey.slice(1)}`;
  target[subscribeKey] = function (listener: (value: any) => void) {
    listeners.add(listener);
  };
}

class Store {
  @observable
  count!: number;

  subscribeCount!: (listener: (value: number) => void) => void;
}

console.log("6. 관찰 가능한 속성:");
const store = new Store();
store.subscribeCount((newValue) => {
  console.log(`  [OBSERVER] count 변경됨: ${newValue}`);
});

store.count = 0;
store.count = 1;
store.count = 2;
console.log();

// 메타데이터 저장
const metadataKey = Symbol("propertyMetadata");

function metadata(data: any) {
  return function (target: any, propertyKey: string) {
    if (!target[metadataKey]) {
      target[metadataKey] = {};
    }
    target[metadataKey][propertyKey] = data;
  };
}

class DatabaseModel {
  @metadata({ type: "number", primary: true })
  id!: number;

  @metadata({ type: "string", maxLength: 100 })
  name!: string;

  @metadata({ type: "string", unique: true })
  email!: string;
}

console.log("7. 메타데이터 저장:");
const model = new DatabaseModel();
const metadata_store = (model.constructor.prototype as any)[metadataKey] || {};
const idMeta = metadata_store["id"];
const nameMeta = metadata_store["name"];
const emailMeta = metadata_store["email"];

console.log("  id 메타데이터:", idMeta);
console.log("  name 메타데이터:", nameMeta);
console.log("  email 메타데이터:", emailMeta);
console.log();

// 타입 검증
function typeCheck(expectedType: string) {
  return function (target: any, propertyKey: string) {
    let value: any;

    Object.defineProperty(target, propertyKey, {
      get() {
        return value;
      },
      set(newValue: any) {
        if (typeof newValue !== expectedType) {
          throw new Error(
            `${propertyKey}는 ${expectedType} 타입이어야 합니다 (받은 값: ${typeof newValue})`
          );
        }
        value = newValue;
      },
      enumerable: true,
      configurable: true
    });
  };
}

class TypedData {
  @typeCheck("string")
  name!: string;

  @typeCheck("number")
  age!: number;
}

console.log("8. 타입 검증 데코레이터:");
const typed = new TypedData();
typed.name = "이영희";
typed.age = 25;
console.log("  정상:", typed);

try {
  typed.age = "invalid" as any;
} catch (error) {
  console.log("  오류:", (error as Error).message);
}
