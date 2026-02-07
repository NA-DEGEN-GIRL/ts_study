/**
 * Chapter 05 - Classes
 * 04-implements.ts - 인터페이스 구현
 *
 * 클래스에서 인터페이스를 구현하는 방법을 학습합니다.
 * 다중 인터페이스 구현과 인터페이스와 추상 클래스의 조합을 다룹니다.
 */

console.log("=== 인터페이스 구현 (Implements) ===\n");

// ============================================
// 1. 기본 인터페이스 구현
// ============================================

console.log("--- 1. 기본 인터페이스 구현 ---\n");

interface Printable {
  print(): void;
}

class PrintableDocument implements Printable {
  constructor(private content: string) {}

  print(): void {
    console.log(`  문서 출력: ${this.content}`);
  }
}

const doc = new PrintableDocument("TypeScript 가이드");
doc.print();

// ============================================
// 2. 다중 인터페이스 구현
// ============================================

console.log("\n--- 2. 다중 인터페이스 구현 ---\n");

interface Loggable {
  log(message: string): void;
}

interface Saveable {
  save(path: string): void;
}

class TextFile implements Loggable, Saveable {
  constructor(private name: string, private content: string) {}

  log(message: string): void {
    console.log(`  [${this.name}] ${message}`);
  }

  save(path: string): void {
    console.log(`  "${this.name}" 저장: ${path}`);
  }

  getContent(): string {
    return this.content;
  }
}

const textFile = new TextFile("readme.txt", "Hello TypeScript");
textFile.log("파일 생성됨");
textFile.save("/documents/readme.txt");

// ============================================
// 3. 인터페이스로 클래스 형태 정의
// ============================================

console.log("\n--- 3. 인터페이스로 클래스 형태 정의 ---\n");

interface User {
  id: number;
  name: string;
  email: string;
  getRole(): string;
}

class Admin implements User {
  constructor(
    public id: number,
    public name: string,
    public email: string
  ) {}

  getRole(): string {
    return "관리자";
  }

  manageUsers(): void {
    console.log(`  ${this.name}가 사용자를 관리합니다`);
  }
}

class RegularUser implements User {
  constructor(
    public id: number,
    public name: string,
    public email: string
  ) {}

  getRole(): string {
    return "일반 사용자";
  }
}

const admin = new Admin(1, "김철수", "admin@example.com");
const user = new RegularUser(2, "이영희", "user@example.com");

console.log(`${admin.name}: ${admin.getRole()}`);
admin.manageUsers();

console.log(`${user.name}: ${user.getRole()}`);

// ============================================
// 4. 인터페이스와 추상 클래스 조합
// ============================================

console.log("\n--- 4. 인터페이스 + 추상 클래스 ---\n");

interface Vehicle {
  brand: string;
  model: string;
  start(): void;
  stop(): void;
}

abstract class AbstractVehicle implements Vehicle {
  constructor(public brand: string, public model: string) {}

  start(): void {
    console.log(`  ${this.brand} ${this.model} 시동 켜기`);
  }

  stop(): void {
    console.log(`  ${this.brand} ${this.model} 시동 끄기`);
  }

  // 추상 메서드 - 서브클래스에서 구현
  abstract drive(): void;
}

class Car extends AbstractVehicle {
  drive(): void {
    console.log(`  ${this.brand} ${this.model}가 도로를 달립니다`);
  }
}

class Boat extends AbstractVehicle {
  drive(): void {
    console.log(`  ${this.brand} ${this.model}가 물 위를 항해합니다`);
  }
}

const car = new Car("현대", "소나타");
car.start();
car.drive();
car.stop();

console.log();

const boat = new Boat("삼성", "요트");
boat.start();
boat.drive();
boat.stop();

// ============================================
// 5. 실용 예제: 결제 시스템
// ============================================

console.log("\n--- 5. 결제 시스템 예제 ---\n");

interface PaymentMethod {
  processPayment(amount: number): boolean;
  refund(amount: number): boolean;
}

class CreditCard implements PaymentMethod {
  constructor(
    private cardNumber: string,
    private cardHolder: string
  ) {}

  processPayment(amount: number): boolean {
    console.log(`  신용카드 결제: ${amount.toLocaleString()}원`);
    console.log(`  카드: ${this.cardNumber.slice(-4)}, ${this.cardHolder}`);
    return true;
  }

  refund(amount: number): boolean {
    console.log(`  신용카드 환불: ${amount.toLocaleString()}원`);
    return true;
  }
}

class PayPal implements PaymentMethod {
  constructor(private email: string) {}

  processPayment(amount: number): boolean {
    console.log(`  PayPal 결제: ${amount.toLocaleString()}원`);
    console.log(`  계정: ${this.email}`);
    return true;
  }

  refund(amount: number): boolean {
    console.log(`  PayPal 환불: ${amount.toLocaleString()}원`);
    return true;
  }
}

class PaymentProcessor {
  processTransaction(method: PaymentMethod, amount: number): void {
    console.log("\n=== 결제 처리 시작 ===");
    const success = method.processPayment(amount);
    if (success) {
      console.log("✅ 결제 완료\n");
    } else {
      console.log("❌ 결제 실패\n");
    }
  }
}

const processor = new PaymentProcessor();

const creditCard = new CreditCard("1234-5678-9012-3456", "김철수");
processor.processTransaction(creditCard, 50000);

const paypal = new PayPal("user@example.com");
processor.processTransaction(paypal, 30000);

// ============================================
// 6. 실용 예제: 로거 시스템
// ============================================

console.log("--- 6. 로거 시스템 ---\n");

interface Logger {
  info(message: string): void;
  warn(message: string): void;
  error(message: string): void;
}

class ConsoleLogger implements Logger {
  info(message: string): void {
    console.log(`  [INFO] ${message}`);
  }

  warn(message: string): void {
    console.log(`  [WARN] ${message}`);
  }

  error(message: string): void {
    console.log(`  [ERROR] ${message}`);
  }
}

class FileLogger implements Logger {
  constructor(private filename: string) {}

  info(message: string): void {
    this.writeToFile(`[INFO] ${message}`);
  }

  warn(message: string): void {
    this.writeToFile(`[WARN] ${message}`);
  }

  error(message: string): void {
    this.writeToFile(`[ERROR] ${message}`);
  }

  private writeToFile(message: string): void {
    console.log(`  ${this.filename}에 기록: ${message}`);
  }
}

class Application {
  constructor(private logger: Logger) {}

  run(): void {
    this.logger.info("애플리케이션 시작");
    this.logger.warn("메모리 사용량 높음");
    this.logger.error("데이터베이스 연결 실패");
  }
}

console.log("콘솔 로거:");
const app1 = new Application(new ConsoleLogger());
app1.run();

console.log("\n파일 로거:");
const app2 = new Application(new FileLogger("app.log"));
app2.run();

// ============================================
// 7. 인터페이스 확장과 구현
// ============================================

console.log("\n--- 7. 인터페이스 확장과 구현 ---\n");

interface Named {
  name: string;
}

interface Aged {
  age: number;
}

// 여러 인터페이스를 확장한 인터페이스
interface Person extends Named, Aged {
  email: string;
}

class Employee implements Person {
  constructor(
    public name: string,
    public age: number,
    public email: string,
    public employeeId: number
  ) {}

  introduce(): void {
    console.log(`  ${this.name} (${this.age}세)`);
    console.log(`  사번: ${this.employeeId}, 이메일: ${this.email}`);
  }
}

const employee = new Employee("박민수", 32, "park@example.com", 12345);
employee.introduce();

// ============================================
// 8. 생성자 인터페이스
// ============================================

console.log("\n--- 8. 생성자 인터페이스 ---\n");

interface Constructable<T> {
  new (...args: any[]): T;
}

function createInstance<T>(Constructor: Constructable<T>, ...args: any[]): T {
  return new Constructor(...args);
}

class Product {
  constructor(public name: string, public price: number) {}

  display(): void {
    console.log(`  ${this.name}: ${this.price.toLocaleString()}원`);
  }
}

const product = createInstance(Product, "노트북", 1500000);
product.display();

// ============================================
// 9. 클래스와 인터페이스의 구조적 타이핑
// ============================================

console.log("\n--- 9. 구조적 타이핑 ---\n");

interface Point {
  x: number;
  y: number;
}

class Vector {
  constructor(public x: number, public y: number) {}
}

// Vector 클래스는 Point 인터페이스를 구현하지 않았지만
// 구조가 일치하므로 호환됨
function printPoint(point: Point): void {
  console.log(`  좌표: (${point.x}, ${point.y})`);
}

const vector = new Vector(10, 20);
printPoint(vector); // ✅ 구조적으로 호환됨

// ============================================
// 10. 모범 사례
// ============================================

console.log("\n--- 10. 모범 사례 ---\n");

console.log("✅ 인터페이스 구현 사용 시점:");
console.log("  - 클래스가 특정 계약을 준수하도록 강제");
console.log("  - 다중 상속이 필요할 때");
console.log("  - 의존성 역전 원칙 (DIP) 적용");
console.log("  - 모의 객체(Mock) 생성 용이");
console.log("  - 플러그인 시스템 구현");

console.log("\n💡 Tip: 인터페이스로 추상화하고 클래스로 구현하세요!");
