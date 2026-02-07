/**
 * Chapter 05 - Classes
 * 02-access-modifiers.ts - 접근 제한자
 *
 * public, private, protected 접근 제한자를 학습합니다.
 * 매개변수 속성(parameter properties)도 함께 다룹니다.
 */

console.log("=== 접근 제한자 (Access Modifiers) ===\n");

// ============================================
// 1. public (기본값)
// ============================================

console.log("--- 1. public 접근 제한자 ---\n");

class Car {
  public brand: string; // public은 생략 가능
  public model: string;

  constructor(brand: string, model: string) {
    this.brand = brand;
    this.model = model;
  }

  public displayInfo(): void {
    console.log(`  차량: ${this.brand} ${this.model}`);
  }
}

const car = new Car("현대", "소나타");
car.displayInfo();

// public 멤버는 외부에서 접근 가능
console.log(`브랜드: ${car.brand}`);
car.brand = "기아";
console.log(`변경된 브랜드: ${car.brand}`);

// ============================================
// 2. private - 클래스 내부에서만 접근
// ============================================

console.log("\n--- 2. private 접근 제한자 ---\n");

class BankAccount {
  private balance: number;
  public owner: string;

  constructor(owner: string, initialBalance: number) {
    this.owner = owner;
    this.balance = initialBalance;
  }

  public deposit(amount: number): void {
    if (amount > 0) {
      this.balance += amount;
      console.log(`  ${amount.toLocaleString()}원 입금 완료`);
    }
  }

  public withdraw(amount: number): boolean {
    if (amount > this.balance) {
      console.log(`  잔액 부족`);
      return false;
    }
    this.balance -= amount;
    console.log(`  ${amount.toLocaleString()}원 출금 완료`);
    return true;
  }

  public getBalance(): number {
    return this.balance;
  }
}

const account = new BankAccount("김철수", 100000);
console.log(`계좌주: ${account.owner}`);
console.log(`잔액: ${account.getBalance().toLocaleString()}원`);

account.deposit(50000);
account.withdraw(30000);
console.log(`현재 잔액: ${account.getBalance().toLocaleString()}원`);

// account.balance = 1000000; // ❌ Error: private 멤버 접근 불가

// ============================================
// 3. protected - 클래스와 서브클래스에서 접근
// ============================================

console.log("\n--- 3. protected 접근 제한자 ---\n");

class Animal {
  protected name: string;
  protected age: number;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }

  protected makeSound(): void {
    console.log("  소리를 냅니다");
  }
}

class Dog extends Animal {
  private breed: string;

  constructor(name: string, age: number, breed: string) {
    super(name, age);
    this.breed = breed;
  }

  public bark(): void {
    // protected 멤버는 서브클래스에서 접근 가능
    console.log(`  ${this.name}(${this.age}세, ${this.breed})가 짖습니다`);
    this.makeSound(); // protected 메서드 호출
  }
}

const dog = new Dog("멍멍이", 3, "골든 리트리버");
dog.bark();

// dog.name; // ❌ Error: protected 멤버는 외부에서 접근 불가
// dog.makeSound(); // ❌ Error

// ============================================
// 4. 매개변수 속성 (Parameter Properties)
// ============================================

console.log("\n--- 4. 매개변수 속성 ---\n");

// 생성자 매개변수에 접근 제한자를 사용하면 자동으로 속성이 됨
class Person {
  constructor(
    public name: string,
    private age: number,
    protected email: string
  ) {
    // 별도의 초기화 코드 불필요
  }

  public introduce(): void {
    console.log(`  ${this.name}, ${this.age}세`);
  }

  public getEmail(): string {
    return this.email;
  }
}

const person = new Person("이영희", 28, "lee@example.com");
person.introduce();

console.log(`이름 (public): ${person.name}`);
console.log(`이메일 (getter): ${person.getEmail()}`);
// console.log(person.age); // ❌ Error: private
// console.log(person.email); // ❌ Error: protected

// ============================================
// 5. private vs #private (ES2022)
// ============================================

console.log("\n--- 5. TypeScript private vs JavaScript #private ---\n");

class User {
  // TypeScript private: 컴파일 타임에만 체크
  private tsPrivate = "TS private";

  // JavaScript private: 런타임에도 private
  #jsPrivate = "JS private";

  constructor(public name: string) {}

  public showPrivates(): void {
    console.log(`  TS private: ${this.tsPrivate}`);
    console.log(`  JS private: ${this.#jsPrivate}`);
  }
}

const user = new User("홍길동");
user.showPrivates();

// 둘 다 외부에서 접근 불가
// console.log(user.tsPrivate); // ❌ TypeScript 에러
// console.log(user.#jsPrivate); // ❌ JavaScript 에러

// ============================================
// 6. 실용 예제: 쇼핑 카트
// ============================================

console.log("\n--- 6. 실용 예제: 쇼핑 카트 ---\n");

class ShoppingCart {
  private items: Array<{ name: string; price: number; quantity: number }> = [];

  public addItem(name: string, price: number, quantity: number = 1): void {
    this.items.push({ name, price, quantity });
    console.log(`  "${name}" ${quantity}개 추가됨`);
  }

  public removeItem(name: string): void {
    const index = this.items.findIndex((item) => item.name === name);
    if (index !== -1) {
      this.items.splice(index, 1);
      console.log(`  "${name}" 제거됨`);
    }
  }

  public getTotal(): number {
    return this.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }

  public displayItems(): void {
    console.log("\n장바구니 목록:");
    this.items.forEach((item) => {
      console.log(`  - ${item.name}: ${item.price.toLocaleString()}원 × ${item.quantity}`);
    });
    console.log(`총액: ${this.getTotal().toLocaleString()}원\n`);
  }
}

const cart = new ShoppingCart();
cart.addItem("노트북", 1500000);
cart.addItem("마우스", 30000, 2);
cart.addItem("키보드", 80000);
cart.displayItems();

cart.removeItem("마우스");
cart.displayItems();

// ============================================
// 7. 실용 예제: 인증 시스템
// ============================================

console.log("--- 7. 인증 시스템 예제 ---\n");

class AuthService {
  private users: Map<string, string> = new Map(); // username -> password
  private currentUser: string | null = null;

  public register(username: string, password: string): boolean {
    if (this.users.has(username)) {
      console.log(`  ❌ 이미 존재하는 사용자명입니다`);
      return false;
    }

    this.users.set(username, this.hashPassword(password));
    console.log(`  ✅ 회원가입 성공: ${username}`);
    return true;
  }

  public login(username: string, password: string): boolean {
    const storedPassword = this.users.get(username);
    if (!storedPassword || storedPassword !== this.hashPassword(password)) {
      console.log(`  ❌ 로그인 실패`);
      return false;
    }

    this.currentUser = username;
    console.log(`  ✅ 로그인 성공: ${username}`);
    return true;
  }

  public logout(): void {
    if (this.currentUser) {
      console.log(`  로그아웃: ${this.currentUser}`);
      this.currentUser = null;
    }
  }

  public getCurrentUser(): string | null {
    return this.currentUser;
  }

  private hashPassword(password: string): string {
    // 실제로는 bcrypt 등을 사용해야 함
    return `hashed_${password}`;
  }
}

const auth = new AuthService();
auth.register("user1", "password123");
auth.register("user2", "secret456");

auth.login("user1", "password123");
console.log(`현재 사용자: ${auth.getCurrentUser()}`);

auth.logout();
console.log(`현재 사용자: ${auth.getCurrentUser()}`);

// ============================================
// 8. 생성자 오버로딩
// ============================================

console.log("\n--- 8. 생성자 오버로딩 ---\n");

class Product {
  public id: number;
  public name: string;
  public price?: number;

  constructor(id: number, name: string);
  constructor(id: number, name: string, price: number);
  constructor(id: number, name: string, price?: number) {
    this.id = id;
    this.name = name;
    this.price = price;
  }

  public display(): void {
    if (this.price !== undefined) {
      console.log(`  ${this.name}: ${this.price.toLocaleString()}원`);
    } else {
      console.log(`  ${this.name}: 가격 미정`);
    }
  }
}

const product1 = new Product(1, "상품A", 10000);
const product2 = new Product(2, "상품B");

product1.display();
product2.display();

// ============================================
// 9. 모범 사례
// ============================================

console.log("\n--- 9. 접근 제한자 사용 가이드 ---\n");

console.log("✅ public:");
console.log("  - 기본값, 외부에서 접근 필요한 멤버");
console.log("  - 공개 API, 메서드");

console.log("\n✅ private:");
console.log("  - 클래스 내부 구현 세부사항");
console.log("  - 외부에서 접근하면 안 되는 데이터");
console.log("  - 캡슐화가 중요한 속성");

console.log("\n✅ protected:");
console.log("  - 서브클래스에서 접근 필요한 멤버");
console.log("  - 상속 계층 구조 내에서 공유");

console.log("\n✅ 매개변수 속성:");
console.log("  - 생성자 코드 간결화");
console.log("  - 작은 클래스에 적합");

console.log("\n💡 원칙: 최소 권한의 원칙 - 필요한 만큼만 공개하세요!");
