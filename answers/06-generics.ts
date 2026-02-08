/**
 * 챕터 6: 제네릭 - 정답
 *
 * 이 챕터에서는 제네릭 (Generic)을 학습합니다:
 * - 제네릭 함수
 * - 제네릭 클래스
 * - 제네릭 제약 조건
 * - 유틸리티 타입 (Utility Type) 만들기
 */

// 연습 1: 제네릭 (Generic) 함수
// 풀이: <T> 구문으로 타입 매개변수를 선언합니다
// 제네릭을 사용하면 다양한 타입에 대해 재사용 가능한 함수를 만들 수 있습니다
// T는 함수 호출 시점에 실제 타입으로 결정됩니다
function first<T>(arr: T[]): T | undefined {
  return arr[0];
}

// 연습 2: 제네릭 (Generic) 클래스
// 풀이: 클래스 이름 뒤에 <T>를 붙여서 제네릭 클래스를 만듭니다
// 제네릭 클래스를 사용하면 다양한 타입의 데이터를 다루는 재사용 가능한 클래스를 만들 수 있습니다
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

// 연습 3: 제네릭 (Generic) 제약 조건
// 풀이: extends를 사용하여 제네릭 타입에 제약을 추가합니다
// T가 반드시 length 속성을 가져야 한다고 제약하여, 함수 내부에서 안전하게 length를 사용할 수 있습니다
function getLength<T extends { length: number }>(item: T): number {
  return item.length;
}

// 연습 4: 여러 제네릭 (Generic) 타입 매개변수
// 풀이: keyof 연산자로 객체의 키 타입을 추출하고, extends로 제약합니다
// K extends keyof T는 K가 T의 실제 키 중 하나여야 한다는 제약입니다
// 이를 통해 존재하지 않는 키에 접근하는 것을 방지합니다
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

// 연습 5: 커스텀 유틸리티 타입 (Utility Type)
// 풀이: 조건부 타입 (Conditional Type)과 매핑 타입 (Mapped Type)을 사용하여 재귀적으로 모든 속성을 optional로 만듭니다
// [P in keyof T]?: 모든 속성을 선택적으로 만듭니다
// T[P] extends object ? DeepPartial<T[P]> : T[P]: 속성이 객체면 재귀적으로 DeepPartial 적용
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

// 풀이: DeepPartial을 사용하면 중첩된 객체의 속성도 모두 선택적이 됩니다
// 설정의 일부만 제공해도 타입 에러가 발생하지 않습니다
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
