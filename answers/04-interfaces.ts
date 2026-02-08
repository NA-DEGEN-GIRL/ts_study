/**
 * 챕터 4: 인터페이스 - 정답
 *
 * 이 챕터에서는 인터페이스 (Interface)를 학습합니다:
 * - 인터페이스 정의와 사용
 * - 인터페이스 확장
 * - 선택적 속성과 읽기 전용 속성
 * - 판별 유니온 (Discriminated Union)
 */

// 연습 1: 기본 인터페이스 (Interface) 정의
// 풀이: interface 키워드로 객체의 구조를 정의합니다
// 인터페이스는 객체가 가져야 할 속성과 메서드의 타입을 명시합니다
interface Person {
  name: string;
  age: number;
  email?: string;  // ?로 선택적 속성을 표시
}

const person1: Person = {
  name: "김철수",
  age: 30,
  email: "kim@example.com"
};

// 연습 2: 인터페이스 확장
// 풀이: extends 키워드로 기존 인터페이스를 확장합니다
// 기존 인터페이스의 모든 속성을 상속받고, 새로운 속성을 추가할 수 있습니다
interface Employee extends Person {
  readonly employeeId: number;  // readonly로 읽기 전용 속성 (초기화 후 변경 불가)
  department: string;
}

const employee1: Employee = {
  name: "박영희",
  age: 28,
  employeeId: 1001,
  department: "개발팀"
};

// 연습 3: 함수 시그니처를 가진 인터페이스
// 풀이: 인터페이스에 메서드 시그니처를 정의할 수 있습니다
// 객체가 특정 메서드를 구현하도록 강제할 수 있습니다
interface Calculator {
  add(a: number, b: number): number;
  subtract(a: number, b: number): number;
  multiply(a: number, b: number): number;
  divide(a: number, b: number): number;
}

const calculator: Calculator = {
  add: (a, b) => a + b,
  subtract: (a, b) => a - b,
  multiply: (a, b) => a * b,
  divide: (a, b) => a / b
};

// 연습 4: 판별 유니온 (Discriminated Union)
// 풀이: type 속성으로 타입을 구별할 수 있어 타입 가드 (Type Guard)가 자동으로 작동합니다
// 공통 속성(type)의 값으로 어떤 타입인지 판별하는 패턴입니다
interface CreditCardPayment {
  type: "credit";
  cardNumber: string;
  cvv: string;
}

interface BankTransferPayment {
  type: "bank";
  accountNumber: string;
  bankCode: string;
}

interface CashPayment {
  type: "cash";
  amount: number;
}

type Payment = CreditCardPayment | BankTransferPayment | CashPayment;

function processPayment(payment: Payment): string {
  // type 속성으로 분기하면 각 블록에서 타입이 좁혀집니다
  switch (payment.type) {
    case "credit":
      return `신용카드: ${payment.cardNumber}`;
    case "bank":
      return `계좌이체: ${payment.accountNumber} (${payment.bankCode})`;
    case "cash":
      return `현금: ${payment.amount}원`;
  }
}

// 연습 5: 인덱스 시그니처 (Index Signature)
// 풀이: [key: string]: Type 형식으로 동적 속성을 정의합니다
// 미리 정의되지 않은 속성에도 접근할 수 있도록 허용합니다
interface DynamicObject {
  [key: string]: string | number | boolean;
}

const config: DynamicObject = {
  apiUrl: "https://api.example.com",
  timeout: 3000,
  debug: true
};

// 테스트 케이스
console.log('=== 챕터 4: 인터페이스 ===');
console.log('사람:', person1);
console.log('직원:', employee1);
console.log('계산:', calculator.add(10, 5), calculator.multiply(3, 4));
console.log('신용카드 결제:', processPayment({ type: "credit", cardNumber: "1234", cvv: "123" }));
console.log('계좌이체:', processPayment({ type: "bank", accountNumber: "5678", bankCode: "001" }));
console.log('현금:', processPayment({ type: "cash", amount: 50000 }));
console.log('설정:', config);
