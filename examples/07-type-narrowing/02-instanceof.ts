/**
 * Chapter 07-02: instanceof 타입 가드
 *
 * instanceof 연산자를 사용하여 클래스 인스턴스를 구별하고
 * 타입을 좁히는 방법을 학습합니다.
 */

console.log("=== instanceof 타입 가드 예제 ===\n");

// 기본 클래스 계층 구조
class Animal {
  constructor(public name: string) {}

  makeSound(): string {
    return "Some sound";
  }
}

class Dog extends Animal {
  bark(): string {
    return `${this.name}: 멍멍!`;
  }
}

class Cat extends Animal {
  meow(): string {
    return `${this.name}: 야옹~`;
  }
}

// instanceof를 사용한 타입 가드
function handleAnimal(animal: Animal): string {
  if (animal instanceof Dog) {
    // 이 블록 안에서 animal은 Dog 타입
    return animal.bark();
  } else if (animal instanceof Cat) {
    // 이 블록 안에서 animal은 Cat 타입
    return animal.meow();
  } else {
    return animal.makeSound();
  }
}

console.log("1. 기본 instanceof 타입 가드:");
const dog = new Dog("뭉치");
const cat = new Cat("나비");
const animal = new Animal("동물");

console.log("  ", handleAnimal(dog));
console.log("  ", handleAnimal(cat));
console.log("  ", handleAnimal(animal));
console.log();

// 에러 처리에서의 instanceof
class ValidationError extends Error {
  constructor(public field: string, message: string) {
    super(message);
    this.name = "ValidationError";
  }
}

class NetworkError extends Error {
  constructor(public statusCode: number, message: string) {
    super(message);
    this.name = "NetworkError";
  }
}

function handleError(error: Error): string {
  if (error instanceof ValidationError) {
    return `검증 오류 [${error.field}]: ${error.message}`;
  } else if (error instanceof NetworkError) {
    return `네트워크 오류 [${error.statusCode}]: ${error.message}`;
  } else {
    return `일반 오류: ${error.message}`;
  }
}

console.log("2. 에러 처리에서의 instanceof:");
console.log("  ", handleError(new ValidationError("email", "잘못된 이메일")));
console.log("  ", handleError(new NetworkError(404, "페이지를 찾을 수 없음")));
console.log("  ", handleError(new Error("알 수 없는 오류")));
console.log();

// 실용적인 예제: 도형 계산
abstract class Shape {
  abstract getArea(): number;
}

class Circle extends Shape {
  constructor(public radius: number) {
    super();
  }

  getArea(): number {
    return Math.PI * this.radius ** 2;
  }
}

class Rectangle extends Shape {
  constructor(public width: number, public height: number) {
    super();
  }

  getArea(): number {
    return this.width * this.height;
  }
}

function describeShape(shape: Shape): string {
  const area = shape.getArea().toFixed(2);

  if (shape instanceof Circle) {
    return `원 (반지름: ${shape.radius}, 면적: ${area})`;
  } else if (shape instanceof Rectangle) {
    return `직사각형 (${shape.width}x${shape.height}, 면적: ${area})`;
  } else {
    return `도형 (면적: ${area})`;
  }
}

console.log("3. 도형 계산:");
const circle = new Circle(5);
const rectangle = new Rectangle(4, 6);

console.log("  ", describeShape(circle));
console.log("  ", describeShape(rectangle));
