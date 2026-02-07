/**
 * 챕터 5: 클래스 - 정답
 *
 * 이 챕터에서는 TypeScript의 클래스를 학습합니다:
 * - 클래스 정의와 접근 제한자
 * - 추상 클래스
 * - 인터페이스 구현
 * - Getter/Setter
 */

// 연습 1: 기본 클래스와 접근 제한자
// 해설: public(기본값), private, protected, readonly 접근 제한자를 사용합니다
class BankAccount {
  private balance: number = 0;
  public accountHolder: string;
  readonly accountNumber: string;

  constructor(accountHolder: string, accountNumber: string) {
    this.accountHolder = accountHolder;
    this.accountNumber = accountNumber;
  }

  deposit(amount: number): void {
    this.balance += amount;
  }

  withdraw(amount: number): boolean {
    if (this.balance >= amount) {
      this.balance -= amount;
      return true;
    }
    return false;
  }

  getBalance(): number {
    return this.balance;
  }
}

// 연습 2: 추상 클래스
// 해설: abstract 키워드로 추상 클래스와 추상 메서드를 정의합니다
abstract class Shape {
  constructor(public name: string) {}

  abstract getArea(): number;
  abstract getPerimeter(): number;

  describe(): string {
    return `${this.name}의 면적은 ${this.getArea()}입니다.`;
  }
}

class Rectangle extends Shape {
  constructor(name: string, private width: number, private height: number) {
    super(name);
  }

  getArea(): number {
    return this.width * this.height;
  }

  getPerimeter(): number {
    return 2 * (this.width + this.height);
  }
}

// 연습 3: 인터페이스 구현
// 해설: implements 키워드로 인터페이스를 구현합니다
interface Printable {
  print(): void;
}

class Document implements Printable {
  constructor(private title: string, private content: string) {}

  print(): void {
    console.log(`[${this.title}]`);
    console.log(this.content);
  }
}

// 연습 4: Getter와 Setter
// 해설: get/set 키워드로 접근자 속성을 정의합니다
class Temperature {
  constructor(public celsius: number) {}

  get fahrenheit(): number {
    return this.celsius * 9 / 5 + 32;
  }

  set fahrenheit(value: number) {
    this.celsius = (value - 32) * 5 / 9;
  }
}

// 연습 5: Static 멤버
// 해설: static 키워드로 클래스 레벨의 속성과 메서드를 정의합니다
class Counter {
  private static totalCount: number = 0;
  private count: number = 0;

  constructor() {
    Counter.totalCount++;
  }

  increment(): void {
    this.count++;
  }

  decrement(): void {
    this.count--;
  }

  static getTotalCount(): number {
    return Counter.totalCount;
  }
}

// 테스트 케이스
console.log('=== 챕터 5: 클래스 ===');

const account = new BankAccount("홍길동", "1234-5678");
account.deposit(10000);
account.withdraw(3000);
console.log('계좌 잔액:', account.getBalance());

const rect = new Rectangle("사각형", 10, 5);
console.log('도형:', rect.describe());

const doc = new Document("보고서", "이것은 중요한 문서입니다.");
doc.print();

const temp = new Temperature(25);
console.log('섭씨 25도는 화씨', temp.fahrenheit, '도');
temp.fahrenheit = 86;
console.log('화씨 86도는 섭씨', temp.celsius, '도');

const c1 = new Counter();
const c2 = new Counter();
c1.increment();
c1.increment();
c2.increment();
console.log('총 카운터 개수:', Counter.getTotalCount());
