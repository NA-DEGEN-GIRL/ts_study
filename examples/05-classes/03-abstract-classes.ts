/**
 * Chapter 05 - Classes
 * 03-abstract-classes.ts - 추상 클래스
 *
 * 추상 클래스와 추상 메서드를 학습합니다.
 * 공통 기능을 정의하고 서브클래스에서 구체화하는 패턴을 다룹니다.
 */

console.log("=== 추상 클래스 (Abstract Classes) ===\n");

// ============================================
// 1. 기본 추상 클래스
// ============================================

console.log("--- 1. 기본 추상 클래스 ---\n");

abstract class Animal {
  constructor(protected name: string) {}

  // 추상 메서드 - 서브클래스에서 반드시 구현해야 함
  abstract makeSound(): void;

  // 일반 메서드 - 공통 기능
  move(distance: number): void {
    console.log(`  ${this.name}가 ${distance}m 이동합니다`);
  }
}

class Dog extends Animal {
  constructor(name: string) {
    super(name);
  }

  makeSound(): void {
    console.log(`  ${this.name}: 멍멍!`);
  }
}

class Cat extends Animal {
  constructor(name: string) {
    super(name);
  }

  makeSound(): void {
    console.log(`  ${this.name}: 야옹~`);
  }
}

// const animal = new Animal("동물"); // ❌ Error: 추상 클래스는 인스턴스화 불가

const dog = new Dog("멍멍이");
const cat = new Cat("야옹이");

dog.makeSound();
dog.move(10);

cat.makeSound();
cat.move(5);

// ============================================
// 2. 추상 속성과 메서드
// ============================================

console.log("\n--- 2. 추상 속성과 메서드 ---\n");

abstract class Shape {
  constructor(protected color: string) {}

  // 추상 메서드들
  abstract getArea(): number;
  abstract getPerimeter(): number;

  // 일반 메서드
  describe(): void {
    console.log(`  ${this.color} 도형`);
    console.log(`  넓이: ${this.getArea().toFixed(2)}`);
    console.log(`  둘레: ${this.getPerimeter().toFixed(2)}`);
  }
}

class Circle extends Shape {
  constructor(color: string, private radius: number) {
    super(color);
  }

  getArea(): number {
    return Math.PI * this.radius ** 2;
  }

  getPerimeter(): number {
    return 2 * Math.PI * this.radius;
  }
}

class Rectangle extends Shape {
  constructor(color: string, private width: number, private height: number) {
    super(color);
  }

  getArea(): number {
    return this.width * this.height;
  }

  getPerimeter(): number {
    return 2 * (this.width + this.height);
  }
}

const circle = new Circle("빨강", 10);
const rectangle = new Rectangle("파랑", 20, 10);

circle.describe();
console.log();
rectangle.describe();

// ============================================
// 3. 추상 클래스로 템플릿 메서드 패턴 구현
// ============================================

console.log("\n--- 3. 템플릿 메서드 패턴 ---\n");

abstract class DataProcessor {
  // 템플릿 메서드 - 처리 흐름을 정의
  public process(): void {
    this.loadData();
    this.validateData();
    this.transformData();
    this.saveData();
    console.log("  처리 완료\n");
  }

  // 추상 메서드들 - 서브클래스에서 구현
  protected abstract loadData(): void;
  protected abstract validateData(): void;
  protected abstract transformData(): void;
  protected abstract saveData(): void;
}

class CsvProcessor extends DataProcessor {
  protected loadData(): void {
    console.log("  CSV 파일 로드");
  }

  protected validateData(): void {
    console.log("  CSV 데이터 검증");
  }

  protected transformData(): void {
    console.log("  CSV → JSON 변환");
  }

  protected saveData(): void {
    console.log("  JSON 파일 저장");
  }
}

class XmlProcessor extends DataProcessor {
  protected loadData(): void {
    console.log("  XML 파일 로드");
  }

  protected validateData(): void {
    console.log("  XML 스키마 검증");
  }

  protected transformData(): void {
    console.log("  XML → JSON 변환");
  }

  protected saveData(): void {
    console.log("  데이터베이스에 저장");
  }
}

console.log("CSV 처리:");
const csvProcessor = new CsvProcessor();
csvProcessor.process();

console.log("XML 처리:");
const xmlProcessor = new XmlProcessor();
xmlProcessor.process();

// ============================================
// 4. 실용 예제: HTTP 클라이언트
// ============================================

console.log("--- 4. HTTP 클라이언트 예제 ---\n");

abstract class HttpClient {
  constructor(protected baseUrl: string) {}

  // 추상 메서드
  protected abstract request(
    method: string,
    url: string,
    data?: unknown
  ): Promise<unknown>;

  // 구체적인 HTTP 메서드들
  public async get(endpoint: string): Promise<unknown> {
    console.log(`  GET ${this.baseUrl}${endpoint}`);
    return this.request("GET", `${this.baseUrl}${endpoint}`);
  }

  public async post(endpoint: string, data: unknown): Promise<unknown> {
    console.log(`  POST ${this.baseUrl}${endpoint}`);
    return this.request("POST", `${this.baseUrl}${endpoint}`, data);
  }

  public async put(endpoint: string, data: unknown): Promise<unknown> {
    console.log(`  PUT ${this.baseUrl}${endpoint}`);
    return this.request("PUT", `${this.baseUrl}${endpoint}`, data);
  }

  public async delete(endpoint: string): Promise<unknown> {
    console.log(`  DELETE ${this.baseUrl}${endpoint}`);
    return this.request("DELETE", `${this.baseUrl}${endpoint}`);
  }
}

class FetchClient extends HttpClient {
  protected async request(
    method: string,
    url: string,
    data?: unknown
  ): Promise<unknown> {
    console.log(`    [Fetch API 사용]`);
    // 실제 구현에서는 fetch() 사용
    return { success: true, method, url, data };
  }
}

class AxiosClient extends HttpClient {
  protected async request(
    method: string,
    url: string,
    data?: unknown
  ): Promise<unknown> {
    console.log(`    [Axios 사용]`);
    // 실제 구현에서는 axios 사용
    return { success: true, method, url, data };
  }
}

const fetchClient = new FetchClient("https://api.example.com");
fetchClient.get("/users");

const axiosClient = new AxiosClient("https://api.example.com");
axiosClient.post("/users", { name: "홍길동" });

// ============================================
// 5. 실용 예제: 데이터베이스 연결
// ============================================

console.log("\n--- 5. 데이터베이스 예제 ---\n");

abstract class Database {
  protected isConnected = false;

  // 추상 메서드
  abstract connect(): void;
  abstract disconnect(): void;
  abstract query(sql: string): unknown[];

  // 공통 메서드
  public execute(sql: string): void {
    if (!this.isConnected) {
      console.log("  연결되지 않았습니다");
      return;
    }
    console.log(`  쿼리 실행: ${sql}`);
    const results = this.query(sql);
    console.log(`  결과: ${results.length}개 행`);
  }
}

class PostgreSQL extends Database {
  connect(): void {
    this.isConnected = true;
    console.log("  PostgreSQL 연결 완료");
  }

  disconnect(): void {
    this.isConnected = false;
    console.log("  PostgreSQL 연결 해제");
  }

  query(sql: string): unknown[] {
    // 실제 구현
    return [{ id: 1, name: "데이터" }];
  }
}

class MongoDB extends Database {
  connect(): void {
    this.isConnected = true;
    console.log("  MongoDB 연결 완료");
  }

  disconnect(): void {
    this.isConnected = false;
    console.log("  MongoDB 연결 해제");
  }

  query(sql: string): unknown[] {
    // 실제 구현
    return [{ _id: "123", name: "도큐먼트" }];
  }
}

const postgres = new PostgreSQL();
postgres.connect();
postgres.execute("SELECT * FROM users");
postgres.disconnect();

console.log();

const mongo = new MongoDB();
mongo.connect();
mongo.execute("db.users.find()");
mongo.disconnect();

// ============================================
// 6. 추상 클래스 vs 인터페이스
// ============================================

console.log("\n--- 6. 추상 클래스 vs 인터페이스 ---\n");

console.log("✅ 추상 클래스:");
console.log("  - 공통 구현 포함 가능");
console.log("  - 상태(필드) 포함 가능");
console.log("  - 단일 상속만 가능");
console.log("  - 생성자 정의 가능");

console.log("\n✅ 인터페이스:");
console.log("  - 구현 포함 불가 (타입만)");
console.log("  - 상태 포함 불가");
console.log("  - 다중 구현 가능");
console.log("  - 생성자 정의 불가");

// ============================================
// 7. 모범 사례
// ============================================

console.log("\n--- 7. 사용 가이드 ---\n");

console.log("✅ 추상 클래스 사용 시점:");
console.log("  - 공통 기능과 상태를 공유할 때");
console.log("  - 템플릿 메서드 패턴 구현");
console.log("  - 부분적인 구현 제공");
console.log("  - 상속 계층이 명확할 때");

console.log("\n💡 Tip: 추상 클래스로 공통 로직을 재사용하세요!");
