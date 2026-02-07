/**
 * 챕터 10: 데코레이터 - 정답
 *
 * 이 챕터에서는 TypeScript의 데코레이터를 학습합니다:
 * - 클래스 데코레이터
 * - 메서드 데코레이터
 * - 프로퍼티 데코레이터
 * - 데코레이터 팩토리
 *
 * 참고: tsconfig.json에서 experimentalDecorators: true 필요
 */

// 연습 1: 클래스 데코레이터
// 해설: 클래스 데코레이터는 생성자를 받아서 수정된 클래스를 반환합니다
function WithTimestamp<T extends { new(...args: any[]): {} }>(constructor: T) {
  return class extends constructor {
    timestamp = new Date();
  };
}

@WithTimestamp
class User {
  constructor(public name: string) {}
}

// 연습 2: 메서드 데코레이터
// 해설: 메서드 데코레이터는 descriptor를 수정하여 메서드 동작을 변경합니다
function Measure(
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor
) {
  const originalMethod = descriptor.value;

  descriptor.value = function(...args: any[]) {
    const start = performance.now();
    const result = originalMethod.apply(this, args);
    const end = performance.now();
    console.log(`${propertyKey} 실행 시간: ${(end - start).toFixed(2)}ms`);
    return result;
  };

  return descriptor;
}

class Calculator {
  @Measure
  fibonacci(n: number): number {
    if (n <= 1) return n;
    return this.fibonacci(n - 1) + this.fibonacci(n - 2);
  }
}

// 연습 3: 프로퍼티 데코레이터
// 해설: 프로퍼티 데코레이터는 getter/setter를 정의하여 값 검증을 수행합니다
function Range(min: number, max: number) {
  return function(target: any, propertyKey: string) {
    let value: number;

    const getter = function() {
      return value;
    };

    const setter = function(newValue: number) {
      if (newValue < min || newValue > max) {
        throw new Error(`${propertyKey}는 ${min}에서 ${max} 사이여야 합니다.`);
      }
      value = newValue;
    };

    Object.defineProperty(target, propertyKey, {
      get: getter,
      set: setter,
      enumerable: true,
      configurable: true
    });
  };
}

class Product {
  name: string;

  @Range(0, 100)
  discountPercent!: number;

  constructor(name: string, discount: number) {
    this.name = name;
    this.discountPercent = discount;
  }
}

// 연습 4: 데코레이터 팩토리
// 해설: 데코레이터 팩토리는 매개변수를 받아서 데코레이터를 반환하는 함수입니다
function Log(level: "info" | "warn" | "error") {
  return function(
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value;

    descriptor.value = function(...args: any[]) {
      console.log(`[${level.toUpperCase()}] ${propertyKey} 호출됨, 인자:`, args);
      return originalMethod.apply(this, args);
    };

    return descriptor;
  };
}

class OrderService {
  @Log("info")
  createOrder(productId: string, quantity: number): string {
    return `주문 생성: ${productId} x ${quantity}`;
  }

  @Log("error")
  cancelOrder(orderId: string): void {
    console.log(`주문 취소: ${orderId}`);
  }
}

// 연습 5: 여러 데코레이터 조합
// 해설: Readonly 데코레이터로 속성을 읽기 전용으로 만듭니다
function Readonly(target: any, propertyKey: string) {
  Object.defineProperty(target, propertyKey, {
    writable: false
  });
}

class Config {
  @Readonly
  apiUrl: string = "https://api.example.com";
}

// 테스트 케이스
console.log('=== 챕터 10: 데코레이터 ===');

const user = new User("김철수") as any;
console.log('사용자:', user.name);
console.log('타임스탬프:', user.timestamp);

const calc = new Calculator();
console.log('피보나치(10):', calc.fibonacci(10));

const product = new Product("노트북", 15);
console.log('제품:', product.name, '할인:', product.discountPercent + '%');

const orderService = new OrderService();
console.log(orderService.createOrder("PROD-001", 2));
orderService.cancelOrder("ORDER-123");

const config = new Config();
console.log('설정 URL:', config.apiUrl);
// config.apiUrl = "new-url"; // 에러가 발생함 (Readonly)
