/**
 * 챕터 6: 제네릭
 *
 * 이 챕터에서는 제네릭 (Generic)을 학습합니다:
 * - 제네릭 함수
 * - 제네릭 클래스
 * - 제네릭 제약 조건
 * - 유틸리티 타입 (Utility Type) 만들기
 */

// 연습 1: 제네릭 (Generic) 함수
// TODO: 배열의 첫 번째 요소를 반환하는 제네릭 함수를 작성하세요
// <T> 구문으로 타입 매개변수를 선언합니다
// 빈 배열이면 undefined를 반환
// 예: function first<T>(arr: T[]): T | undefined
function first<T>(arr) {
  // 구현하세요
}

// 연습 2: 제네릭 (Generic) 클래스
// TODO: Stack 클래스를 제네릭으로 구현하세요
// 클래스 이름 뒤에 <T>를 붙여서 제네릭 클래스를 만듭니다
// 메서드: push(item), pop(), peek(), isEmpty()
class Stack<T> {
  // 여기에 구현하세요
}

// 연습 3: 제네릭 (Generic) 제약 조건
// TODO: length 속성을 가진 타입만 받는 제네릭 함수를 작성하세요
// extends를 사용하여 제약 조건을 추가하세요
// 예: function getLength<T extends { length: number }>(item: T): number
function getLength<T>(item) {
  // 구현하세요
  return 0;
}

// 연습 4: 여러 제네릭 (Generic) 타입 매개변수
// TODO: 객체에서 특정 키의 값을 가져오는 함수를 작성하세요
// K extends keyof T를 사용하여 T 객체의 키만 허용하도록 제약하세요
// keyof는 객체의 모든 키를 유니온 타입으로 추출합니다
// 예: function getProperty<T, K extends keyof T>(obj: T, key: K): T[K]
function getProperty<T, K>(obj, key) {
  // 구현하세요
}

// 연습 5: 커스텀 유틸리티 타입 (Utility Type)
// TODO: 객체의 모든 속성을 optional로 만드는 DeepPartial 타입을 만드세요
// Partial과 달리 중첩된 객체도 모두 optional로 만들어야 합니다
// 조건부 타입 (Conditional Type)과 매핑 타입 (Mapped Type)을 사용합니다
type DeepPartial<T> = any; // 여기를 구현하세요

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

// TODO: DeepPartial을 사용하여 부분 설정만 제공할 수 있도록 하세요
const partialConfig: DeepPartial<Config> = undefined;

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
