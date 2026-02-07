/**
 * 챕터 6: 제네릭 - 정답
 *
 * 이 챕터에서는 제네릭을 학습합니다:
 * - 제네릭 함수
 * - 제네릭 클래스
 * - 제네릭 제약 조건
 * - 유틸리티 타입 만들기
 */

// 연습 1: 제네릭 함수
// 해설: <T> 구문으로 타입 매개변수를 선언합니다
function first<T>(arr: T[]): T | undefined {
  return arr[0];
}

// 연습 2: 제네릭 클래스
// 해설: 클래스 이름 뒤에 <T>를 붙여서 제네릭 클래스를 만듭니다
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
}

// 연습 3: 제네릭 제약 조건
// 해설: extends를 사용하여 제네릭 타입에 제약을 추가합니다
function getLength<T extends { length: number }>(item: T): number {
  return item.length;
}

// 연습 4: 여러 제네릭 타입 매개변수
// 해설: keyof 연산자로 객체의 키 타입을 추출하고, extends로 제약합니다
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

// 연습 5: 커스텀 유틸리티 타입
// 해설: 조건부 타입과 mapped type을 사용하여 재귀적으로 모든 속성을 optional로 만듭니다
type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

interface Config {
  database: {
    host: string;
    port: number;
  };
  cache: {
    enabled: boolean;
    ttl: number;
  };
}

// 해설: DeepPartial을 사용하면 중첩된 객체의 속성도 모두 선택적이 됩니다
const partialConfig: DeepPartial<Config> = {
  database: {
    host: "localhost"
    // port는 생략 가능
  }
  // cache는 전체 생략 가능
};

// 테스트 케이스
console.log('=== 챕터 6: 제네릭 ===');
console.log('첫 번째 숫자:', first([1, 2, 3]));
console.log('첫 번째 문자열:', first(['a', 'b', 'c']));
console.log('빈 배열:', first([]));

const numberStack = new Stack<number>();
numberStack.push(1);
numberStack.push(2);
numberStack.push(3);
console.log('스택 peek:', numberStack.peek());
console.log('스택 pop:', numberStack.pop());

console.log('문자열 길이:', getLength("hello"));
console.log('배열 길이:', getLength([1, 2, 3, 4]));

const user = { name: "김철수", age: 30, email: "kim@example.com" };
console.log('이름:', getProperty(user, "name"));
console.log('나이:', getProperty(user, "age"));

console.log('부분 설정:', partialConfig);
