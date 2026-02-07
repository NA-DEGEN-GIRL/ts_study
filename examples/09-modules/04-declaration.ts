/**
 * Chapter 09-04: 타입 선언 파일 (Declaration Files)
 *
 * .d.ts 파일의 사용법과 외부 라이브러리의 타입을 정의하는 방법을 학습합니다.
 * 컴파일 후 타입 정보만 남기는 선언 파일을 만들 수 있습니다.
 */

console.log("=== 타입 선언 파일 예제 ===\n");

// 전역 타입 선언 (일반적으로 .d.ts 파일에 작성)
declare global {
  interface Window {
    customAPI: {
      version: string;
      getData: () => string;
    };
  }

  const GLOBAL_CONSTANT: string;
}

// 모듈 확장 (Module Augmentation)
declare module "./01-exports" {
  export interface User {
    // 기존 User 인터페이스에 속성 추가
    age?: number;
  }
}

console.log("1. 전역 타입 선언:");
console.log("  Window.customAPI와 GLOBAL_CONSTANT 타입이 선언됨");
console.log("  (브라우저 환경에서만 실제 값 사용 가능)");
console.log();

// 외부 모듈 타입 선언 시뮬레이션
// 실제로는 별도의 .d.ts 파일에 작성
declare module "external-lib" {
  export interface Config {
    apiKey: string;
    endpoint: string;
  }

  export function initialize(config: Config): void;
  export function fetchData(id: number): Promise<any>;
}

console.log("2. 외부 모듈 타입 선언:");
console.log("  'external-lib' 모듈의 타입이 선언됨");
console.log();

// 네임스페이스 선언
declare namespace MathUtils {
  function add(a: number, b: number): number;
  function multiply(a: number, b: number): number;

  interface Point {
    x: number;
    y: number;
  }

  class Calculator {
    calculate(expr: string): number;
  }
}

console.log("3. 네임스페이스 선언:");
console.log("  MathUtils 네임스페이스의 타입이 선언됨");
console.log();

// 타입 선언과 구현 분리 예제
interface Calculator {
  add(a: number, b: number): number;
  subtract(a: number, b: number): number;
  multiply(a: number, b: number): number;
  divide(a: number, b: number): number;
}

// 구현
class CalculatorImpl implements Calculator {
  add(a: number, b: number): number {
    return a + b;
  }

  subtract(a: number, b: number): number {
    return a - b;
  }

  multiply(a: number, b: number): number {
    return a * b;
  }

  divide(a: number, b: number): number {
    if (b === 0) throw new Error("0으로 나눌 수 없습니다");
    return a / b;
  }
}

console.log("4. 타입 선언과 구현 분리:");
const calc = new CalculatorImpl();
console.log("  10 + 5 =", calc.add(10, 5));
console.log("  10 - 5 =", calc.subtract(10, 5));
console.log("  10 * 5 =", calc.multiply(10, 5));
console.log("  10 / 5 =", calc.divide(10, 5));
console.log();

// Ambient 선언 예제
declare const BUILD_VERSION: string;
declare const API_ENDPOINT: string;

console.log("5. Ambient 선언:");
console.log("  BUILD_VERSION과 API_ENDPOINT가 외부에서 제공됨");
console.log("  (빌드 도구나 환경 변수에서 주입)");
console.log();

// UMD 모듈 타입 선언
export as namespace MyLibrary;

export interface LibraryConfig {
  debug: boolean;
  timeout: number;
}

export function init(config: LibraryConfig): void {
  console.log("  라이브러리 초기화:", config);
}

export class Service {
  constructor(private name: string) {}

  getName(): string {
    return this.name;
  }
}

console.log("6. UMD 모듈 선언:");
console.log("  전역 변수와 모듈 방식 모두 지원");
init({ debug: true, timeout: 5000 });
const service = new Service("MyService");
console.log("  서비스 이름:", service.getName());
console.log();

// 타입 전용 import/export
export type { Calculator };
export type CalculatorType = Calculator;

console.log("7. 타입 전용 내보내기:");
console.log("  Calculator 타입만 내보냄 (런타임 코드 없음)");
console.log();

// 실용적인 예제: API 클라이언트 타입 선언
interface ApiClient {
  get<T>(url: string): Promise<T>;
  post<T>(url: string, data: any): Promise<T>;
  put<T>(url: string, data: any): Promise<T>;
  delete<T>(url: string): Promise<T>;
}

class HttpClient implements ApiClient {
  async get<T>(url: string): Promise<T> {
    console.log(`  GET ${url}`);
    return {} as T;
  }

  async post<T>(url: string, data: any): Promise<T> {
    console.log(`  POST ${url}`, data);
    return {} as T;
  }

  async put<T>(url: string, data: any): Promise<T> {
    console.log(`  PUT ${url}`, data);
    return {} as T;
  }

  async delete<T>(url: string): Promise<T> {
    console.log(`  DELETE ${url}`);
    return {} as T;
  }
}

console.log("8. API 클라이언트 타입 선언:");
const client = new HttpClient();
client.get("/users");
client.post("/users", { name: "홍길동" });
console.log();

console.log("타입 선언 파일 예제 완료!");
console.log("실제 프로젝트에서는 .d.ts 파일을 별도로 작성합니다.");
