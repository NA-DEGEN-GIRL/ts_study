/**
 * Chapter 06 - Generics
 * 02-generic-classes.ts - 제네릭 클래스
 *
 * 이 파일에서 배울 내용:
 * - 제네릭 클래스 (Generic Class) - 클래스 (Class) 선언 시 타입 매개변수 사용
 * - 타입 안전한 컬렉션 (Collection) - Stack, Queue 등의 자료구조
 * - 다중 제네릭 타입 - <K, V> 형태로 여러 타입 매개변수
 * - 제네릭 제약 (Generic Constraint) - extends로 타입 범위 제한
 * 왜 필요한가? 재사용 가능하고 타입 안전한 클래스 구현
 */

console.log("=== 제네릭 클래스 (Generic Classes) ===\n");

// ============================================
// 1. 기본 제네릭 클래스
// ============================================

console.log("--- 1. 기본 제네릭 클래스 ---\n");

class Box<T> {
  private value: T;

  constructor(value: T) {
    this.value = value;
  }

  getValue(): T {
    return this.value;
  }

  setValue(value: T): void {
    this.value = value;
  }
}

const numberBox = new Box<number>(42);
const stringBox = new Box<string>("TypeScript");
const booleanBox = new Box<boolean>(true);

console.log(`Number Box: ${numberBox.getValue()}`);
console.log(`String Box: ${stringBox.getValue()}`);
console.log(`Boolean Box: ${booleanBox.getValue()}`);

numberBox.setValue(100);
console.log(`Updated Number Box: ${numberBox.getValue()}`);

// ============================================
// 2. 제네릭 스택 (Stack) 구현
// ============================================

console.log("\n--- 2. 제네릭 스택 ---\n");

class Stack<T> {
  private items: T[] = [];

  push(item: T): void {
    this.items.push(item);
  }

  pop(): T | undefined {
    return this.items.pop();
  }

  peek(): T | undefined {
    return this.items[this.items.length - 1];
  }

  isEmpty(): boolean {
    return this.items.length === 0;
  }

  size(): number {
    return this.items.length;
  }

  clear(): void {
    this.items = [];
  }
}

const numberStack = new Stack<number>();
numberStack.push(1);
numberStack.push(2);
numberStack.push(3);

console.log(`스택 크기: ${numberStack.size()}`);
console.log(`peek: ${numberStack.peek()}`);
console.log(`pop: ${numberStack.pop()}`);
console.log(`pop: ${numberStack.pop()}`);
console.log(`스택 크기: ${numberStack.size()}`);

const stringStack = new Stack<string>();
stringStack.push("first");
stringStack.push("second");
console.log(`문자열 스택 pop: ${stringStack.pop()}`);

// ============================================
// 3. 제네릭 큐 (Queue) 구현
// ============================================

console.log("\n--- 3. 제네릭 큐 ---\n");

class Queue<T> {
  private items: T[] = [];

  enqueue(item: T): void {
    this.items.push(item);
  }

  dequeue(): T | undefined {
    return this.items.shift();
  }

  front(): T | undefined {
    return this.items[0];
  }

  isEmpty(): boolean {
    return this.items.length === 0;
  }

  size(): number {
    return this.items.length;
  }
}

const queue = new Queue<string>();
queue.enqueue("첫 번째");
queue.enqueue("두 번째");
queue.enqueue("세 번째");

console.log(`큐 크기: ${queue.size()}`);
console.log(`front: ${queue.front()}`);
console.log(`dequeue: ${queue.dequeue()}`);
console.log(`dequeue: ${queue.dequeue()}`);
console.log(`큐 크기: ${queue.size()}`);

// ============================================
// 4. 제네릭 키-값 저장소
// ============================================

console.log("\n--- 4. 제네릭 키-값 저장소 ---\n");

class KeyValueStore<K, V> {
  private store = new Map<K, V>();

  set(key: K, value: V): void {
    this.store.set(key, value);
  }

  get(key: K): V | undefined {
    return this.store.get(key);
  }

  has(key: K): boolean {
    return this.store.has(key);
  }

  delete(key: K): boolean {
    return this.store.delete(key);
  }

  keys(): K[] {
    return Array.from(this.store.keys());
  }

  values(): V[] {
    return Array.from(this.store.values());
  }

  size(): number {
    return this.store.size;
  }
}

interface User {
  id: number;
  name: string;
  email: string;
}

const userStore = new KeyValueStore<number, User>();
userStore.set(1, { id: 1, name: "김철수", email: "kim@example.com" });
userStore.set(2, { id: 2, name: "이영희", email: "lee@example.com" });

console.log(`사용자 1:`, userStore.get(1));
console.log(`사용자 2:`, userStore.get(2));
console.log(`저장소 크기: ${userStore.size()}`);
console.log(`모든 ID:`, userStore.keys());

// ============================================
// 5. 제네릭 링크드 리스트
// ============================================

console.log("\n--- 5. 제네릭 링크드 리스트 ---\n");

class ListNode<T> {
  constructor(public value: T, public next: ListNode<T> | null = null) {}
}

class LinkedList<T> {
  private head: ListNode<T> | null = null;
  private length = 0;

  append(value: T): void {
    const newNode = new ListNode(value);

    if (!this.head) {
      this.head = newNode;
    } else {
      let current = this.head;
      while (current.next) {
        current = current.next;
      }
      current.next = newNode;
    }

    this.length++;
  }

  toArray(): T[] {
    const result: T[] = [];
    let current = this.head;

    while (current) {
      result.push(current.value);
      current = current.next;
    }

    return result;
  }

  getLength(): number {
    return this.length;
  }
}

const list = new LinkedList<number>();
list.append(1);
list.append(2);
list.append(3);

console.log(`리스트: [${list.toArray().join(", ")}]`);
console.log(`길이: ${list.getLength()}`);

// ============================================
// 6. 제네릭과 상속
// ============================================

console.log("\n--- 6. 제네릭과 상속 ---\n");

class Container<T> {
  constructor(protected value: T) {}

  getValue(): T {
    return this.value;
  }
}

class NumberContainer extends Container<number> {
  double(): number {
    return this.value * 2;
  }
}

class StringContainer extends Container<string> {
  uppercase(): string {
    return this.value.toUpperCase();
  }
}

const numContainer = new NumberContainer(5);
console.log(`값: ${numContainer.getValue()}`);
console.log(`2배: ${numContainer.double()}`);

const strContainer = new StringContainer("hello");
console.log(`값: ${strContainer.getValue()}`);
console.log(`대문자: ${strContainer.uppercase()}`);

// ============================================
// 7. 제네릭 인터페이스 구현
// ============================================

console.log("\n--- 7. 제네릭 인터페이스 구현 ---\n");

interface Repository<T> {
  add(item: T): void;
  findById(id: number): T | undefined;
  getAll(): T[];
  remove(id: number): boolean;
}

interface Product {
  id: number;
  name: string;
  price: number;
}

class ProductRepository implements Repository<Product> {
  private products: Product[] = [];

  add(item: Product): void {
    this.products.push(item);
    console.log(`  상품 추가: ${item.name}`);
  }

  findById(id: number): Product | undefined {
    return this.products.find((p) => p.id === id);
  }

  getAll(): Product[] {
    return this.products;
  }

  remove(id: number): boolean {
    const index = this.products.findIndex((p) => p.id === id);
    if (index !== -1) {
      this.products.splice(index, 1);
      return true;
    }
    return false;
  }
}

const productRepo = new ProductRepository();
productRepo.add({ id: 1, name: "노트북", price: 1500000 });
productRepo.add({ id: 2, name: "마우스", price: 30000 });

console.log(`전체 상품:`, productRepo.getAll());
console.log(`ID 1 상품:`, productRepo.findById(1));

// ============================================
// 8. 정적 멤버와 제네릭
// ============================================

console.log("\n--- 8. 정적 멤버와 제네릭 ---\n");

class Wrapper<T> {
  constructor(public value: T) {}

  // 정적 메서드는 클래스의 제네릭 타입을 사용할 수 없음
  // 자체 제네릭 타입 필요
  static wrap<U>(value: U): Wrapper<U> {
    return new Wrapper(value);
  }
}

const wrapped1 = Wrapper.wrap(42);
const wrapped2 = Wrapper.wrap("hello");

console.log(`wrapped1: ${wrapped1.value}`);
console.log(`wrapped2: ${wrapped2.value}`);

// ============================================
// 9. 실용 예제: 옵저버 패턴
// ============================================

console.log("\n--- 9. 옵저버 패턴 ---\n");

class Observable<T> {
  private observers: Array<(data: T) => void> = [];

  subscribe(observer: (data: T) => void): void {
    this.observers.push(observer);
  }

  notify(data: T): void {
    this.observers.forEach((observer) => observer(data));
  }
}

const numberObservable = new Observable<number>();

numberObservable.subscribe((num) => {
  console.log(`  옵저버 1: ${num}`);
});

numberObservable.subscribe((num) => {
  console.log(`  옵저버 2: ${num * 2}`);
});

console.log("알림 전송:");
numberObservable.notify(10);

// ============================================
// 10. 모범 사례
// ============================================

console.log("\n--- 10. 제네릭 클래스 사용 가이드 ---\n");

console.log("✅ 제네릭 클래스 사용 시점:");
console.log("  - 데이터 구조 (Stack, Queue, Tree 등)");
console.log("  - 컬렉션 클래스");
console.log("  - 저장소 패턴 (Repository)");
console.log("  - 래퍼 클래스");
console.log("  - 옵저버 패턴");

console.log("\n💡 Tip: 제네릭으로 타입 안전한 재사용 가능한 클래스를 만드세요!");
