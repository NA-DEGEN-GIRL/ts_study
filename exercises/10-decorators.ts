/**
 * 챕터 10: 데코레이터
 *
 * 이 챕터에서는 TypeScript의 데코레이터 (Decorator)를 학습합니다:
 * - 클래스 데코레이터
 * - 메서드 데코레이터
 * - 프로퍼티 데코레이터
 * - 데코레이터 팩토리
 *
 * 참고: tsconfig.json에서 experimentalDecorators: true 필요
 */

// 연습 1: 클래스 데코레이터 (Decorator)
// TODO: 클래스에 타임스탬프를 추가하는 데코레이터를 작성하세요
// 클래스 데코레이터는 생성자를 받아서 수정된 클래스를 반환합니다
// 기존 클래스를 확장하여 timestamp 속성을 추가하세요
// 힌트: return class extends constructor { timestamp = new Date(); }
function WithTimestamp<T extends { new(...args: any[]): {} }>(constructor: T) {
  // 기존 클래스를 확장하여 timestamp 속성을 추가하세요
  // 힌트: return class extends constructor { ... }
}

// TODO: 데코레이터를 적용하세요
// @WithTimestamp
class User {
  constructor(public name: string) {}
}

// 연습 2: 메서드 데코레이터 (Decorator)
// TODO: 메서드 실행 시간을 측정하는 데코레이터를 작성하세요
// 메서드 데코레이터는 descriptor를 수정하여 메서드 동작을 변경합니다
function Measure(
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor
) {
  // 원본 메서드를 저장하세요
  const originalMethod = descriptor.value;

  // descriptor.value를 새로운 함수로 교체하세요
  // 실행 전후 시간을 측정하여 콘솔에 출력하세요
  // performance.now()로 시간을 측정합니다
  descriptor.value = function(...args: any[]) {
    // 여기에 구현하세요
  };

  return descriptor;
}

class Calculator {
  // TODO: @Measure 데코레이터를 적용하세요
  // @Measure
  fibonacci(n: number): number {
    if (n <= 1) return n;
    return this.fibonacci(n - 1) + this.fibonacci(n - 2);
  }
}

// 연습 3: 프로퍼티 데코레이터 (Decorator)
// TODO: 프로퍼티의 최소/최대값을 검증하는 데코레이터를 작성하세요
// 프로퍼티 데코레이터는 getter/setter를 정의하여 값 검증을 수행합니다
function Range(min: number, max: number) {
  return function(target: any, propertyKey: string) {
    let value: number;

    // getter와 setter를 정의하세요
    const getter = function() {
      return value;
    };

    const setter = function(newValue: number) {
      // min과 max 범위를 벗어나면 에러를 던지세요
      // 그렇지 않으면 value에 할당하세요
    };

    // Object.defineProperty를 사용하여 적용하세요
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

  // TODO: @Range(0, 100) 데코레이터를 적용하세요
  // @Range(0, 100)
  discountPercent: number;

  constructor(name: string, discount: number) {
    this.name = name;
    this.discountPercent = discount;
  }
}

// 연습 4: 데코레이터 팩토리 (Decorator Factory)
// TODO: 로그 레벨을 설정할 수 있는 데코레이터 팩토리를 작성하세요
// 데코레이터 팩토리는 매개변수를 받아서 데코레이터를 반환하는 함수입니다
function Log(level: "info" | "warn" | "error") {
  // 데코레이터를 반환하는 팩토리 함수입니다
  return function(
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value;

    descriptor.value = function(...args: any[]) {
      // level에 따라 다른 로그를 출력하세요
      console.log(`[${level.toUpperCase()}] ${propertyKey} 호출됨, 인자:`, args);
      return originalMethod.apply(this, args);
    };

    return descriptor;
  };
}

class OrderService {
  // TODO: @Log("info") 데코레이터를 적용하세요
  // @Log("info")
  createOrder(productId: string, quantity: number): string {
    return `주문 생성: ${productId} x ${quantity}`;
  }

  // TODO: @Log("error") 데코레이터를 적용하세요
  // @Log("error")
  cancelOrder(orderId: string): void {
    console.log(`주문 취소: ${orderId}`);
  }
}

// 연습 5: 여러 데코레이터 조합
// TODO: Readonly 데코레이터를 만들고 다른 데코레이터와 조합하세요
function Readonly(target: any, propertyKey: string) {
  // writable: false로 설정하세요
}

class Config {
  // TODO: @Readonly 데코레이터를 적용하세요
  // @Readonly
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
// config.apiUrl = "new-url"; // 에러가 발생해야 함 (주석 해제하여 테스트)
