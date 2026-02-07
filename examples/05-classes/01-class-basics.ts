/**
 * Chapter 05 - Classes
 * 01-class-basics.ts - 클래스 기초
 *
 * TypeScript 클래스의 기본 문법을 학습합니다.
 * 속성, 생성자, 메서드, this 키워드를 다룹니다.
 */

console.log("=== TypeScript 클래스 기초 ===\n");

// ============================================
// 1. 기본 클래스 선언
// ============================================

console.log("--- 1. 기본 클래스 ---\n");

class Person {
  name: string;
  age: number;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }

  greet(): void {
    console.log(`  안녕하세요, ${this.name}입니다. ${this.age}세입니다.`);
  }
}

const person1 = new Person("김철수", 30);
const person2 = new Person("이영희", 28);

person1.greet();
person2.greet();

// ============================================
// 2. 메서드 정의
// ============================================

console.log("\n--- 2. 메서드 ---\n");

class Calculator {
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
    if (b === 0) {
      throw new Error("0으로 나눌 수 없습니다");
    }
    return a / b;
  }
}

const calc = new Calculator();
console.log(`5 + 3 = ${calc.add(5, 3)}`);
console.log(`10 - 4 = ${calc.subtract(10, 4)}`);
console.log(`6 × 7 = ${calc.multiply(6, 7)}`);
console.log(`100 ÷ 4 = ${calc.divide(100, 4)}`);

// ============================================
// 3. Getter와 Setter
// ============================================

console.log("\n--- 3. Getter와 Setter ---\n");

class Rectangle {
  private _width: number;
  private _height: number;

  constructor(width: number, height: number) {
    this._width = width;
    this._height = height;
  }

  get width(): number {
    return this._width;
  }

  set width(value: number) {
    if (value <= 0) {
      throw new Error("너비는 양수여야 합니다");
    }
    this._width = value;
  }

  get height(): number {
    return this._height;
  }

  set height(value: number) {
    if (value <= 0) {
      throw new Error("높이는 양수여야 합니다");
    }
    this._height = value;
  }

  get area(): number {
    return this._width * this._height;
  }

  get perimeter(): number {
    return 2 * (this._width + this._height);
  }
}

const rect = new Rectangle(10, 5);
console.log(`사각형: ${rect.width} × ${rect.height}`);
console.log(`넓이: ${rect.area}`);
console.log(`둘레: ${rect.perimeter}`);

rect.width = 15;
console.log(`\n너비 변경 후: ${rect.width} × ${rect.height}`);
console.log(`넓이: ${rect.area}`);

// ============================================
// 4. 정적 멤버 (Static Members)
// ============================================

console.log("\n--- 4. 정적 멤버 ---\n");

class MathUtils {
  static readonly PI = 3.14159;

  static square(x: number): number {
    return x * x;
  }

  static cube(x: number): number {
    return x * x * x;
  }

  static circleArea(radius: number): number {
    return MathUtils.PI * MathUtils.square(radius);
  }
}

// 인스턴스 생성 없이 직접 호출
console.log(`π = ${MathUtils.PI}`);
console.log(`5의 제곱 = ${MathUtils.square(5)}`);
console.log(`3의 세제곱 = ${MathUtils.cube(3)}`);
console.log(`반지름 10인 원의 넓이 = ${MathUtils.circleArea(10).toFixed(2)}`);

// ============================================
// 5. 클래스 표현식
// ============================================

console.log("\n--- 5. 클래스 표현식 ---\n");

const Animal = class {
  name: string;

  constructor(name: string) {
    this.name = name;
  }

  makeSound(): void {
    console.log(`  ${this.name}가 소리를 냅니다`);
  }
};

const cat = new Animal("고양이");
cat.makeSound();

// ============================================
// 6. this 타입
// ============================================

console.log("\n--- 6. this 타입 ---\n");

class Counter {
  private count = 0;

  increment(): this {
    this.count++;
    return this;
  }

  decrement(): this {
    this.count--;
    return this;
  }

  getValue(): number {
    return this.count;
  }
}

const counter = new Counter();

// 메서드 체이닝
counter.increment().increment().increment().decrement();
console.log(`카운터 값: ${counter.getValue()}`);

// ============================================
// 7. 읽기 전용 속성
// ============================================

console.log("\n--- 7. 읽기 전용 속성 ---\n");

class User {
  readonly id: number;
  name: string;

  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }
}

const user = new User(1, "홍길동");
console.log(`사용자: ${user.name} (ID: ${user.id})`);

user.name = "김철수"; // ✅ 가능
// user.id = 2; // ❌ Error: Cannot assign to 'id'
console.log(`변경된 이름: ${user.name}`);

// ============================================
// 8. 선택적 속성
// ============================================

console.log("\n--- 8. 선택적 속성 ---\n");

class Product {
  name: string;
  price: number;
  description?: string; // 선택적 속성

  constructor(name: string, price: number, description?: string) {
    this.name = name;
    this.price = price;
    this.description = description;
  }

  display(): void {
    console.log(`  상품: ${this.name} - ${this.price.toLocaleString()}원`);
    if (this.description) {
      console.log(`  설명: ${this.description}`);
    }
  }
}

const product1 = new Product("노트북", 1500000, "고성능 노트북");
const product2 = new Product("마우스", 30000);

product1.display();
product2.display();

// ============================================
// 9. 인덱스 시그니처
// ============================================

console.log("\n--- 9. 인덱스 시그니처 ---\n");

class Dictionary {
  [key: string]: string | ((key: string) => string | undefined) | ((key: string, value: string) => void);

  get(key: string): string | undefined {
    const value = this[key];
    return typeof value === "string" ? value : undefined;
  }

  set(key: string, value: string): void {
    this[key] = value;
  }
}

const dict = new Dictionary();
dict.set("hello", "안녕하세요");
dict.set("goodbye", "안녕히 가세요");

console.log(`hello: ${dict.get("hello")}`);
console.log(`goodbye: ${dict.get("goodbye")}`);

// ============================================
// 10. 클래스 타입
// ============================================

console.log("\n--- 10. 클래스를 타입으로 사용 ---\n");

class Point {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  distance(other: Point): number {
    const dx = this.x - other.x;
    const dy = this.y - other.y;
    return Math.sqrt(dx * dx + dy * dy);
  }
}

// Point 클래스를 타입으로 사용
function printPoint(point: Point): void {
  console.log(`  좌표: (${point.x}, ${point.y})`);
}

const p1 = new Point(0, 0);
const p2 = new Point(3, 4);

printPoint(p1);
printPoint(p2);
console.log(`두 점 사이 거리: ${p1.distance(p2)}`);

console.log("\n✅ 클래스 기초 학습 완료!");
