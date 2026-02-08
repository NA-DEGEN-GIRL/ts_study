/**
 * 챕터 4: 인터페이스
 *
 * 이 챕터에서는 인터페이스 (Interface)를 학습합니다:
 * - 인터페이스 정의와 사용
 * - 인터페이스 확장
 * - 선택적 속성과 읽기 전용 속성
 * - 판별 유니온 (Discriminated Union)
 */

// 연습 1: 기본 인터페이스 정의
// TODO: Person 인터페이스 (Interface)를 정의하세요
// 속성: name(string), age(number), email(선택적, string)
// 선택적 속성은 ? 기호를 사용합니다
// 예: interface Person { name: string; age: number; email?: string; }
interface Person {
  // 여기에 구현하세요
}

const person1: Person = undefined;

// 연습 2: 인터페이스 확장
// TODO: Employee 인터페이스를 만들어서 Person을 확장하세요
// extends 키워드를 사용하여 기존 인터페이스를 확장합니다
// 추가 속성: employeeId(number, 읽기 전용), department(string)
// readonly 키워드로 읽기 전용 속성을 만듭니다
// 예: interface Employee extends Person { readonly employeeId: number; }
interface Employee {
  // 여기에 구현하세요
}

const employee1: Employee = undefined;

// 연습 3: 함수 시그니처를 가진 인터페이스
// TODO: Calculator 인터페이스를 정의하세요
// 메서드: add, subtract, multiply, divide (모두 두 개의 number를 받아 number 반환)
// 예: interface Calculator { add(a: number, b: number): number; }
interface Calculator {
  // 여기에 구현하세요
}

const calculator: Calculator = undefined;

// 연습 4: 판별 유니온 (Discriminated Union)
// TODO: 결제 방법을 나타내는 타입을 만드세요
// CreditCard: type="credit", cardNumber(string), cvv(string)
// BankTransfer: type="bank", accountNumber(string), bankCode(string)
// Cash: type="cash", amount(number)
// type 속성이 판별자(discriminant) 역할을 합니다
// 예: interface CreditCardPayment { type: "credit"; cardNumber: string; cvv: string; }
interface CreditCardPayment {
  // 여기에 구현하세요
}

interface BankTransferPayment {
  // 여기에 구현하세요
}

interface CashPayment {
  // 여기에 구현하세요
}

type Payment = CreditCardPayment | BankTransferPayment | CashPayment;

// TODO: Payment 타입을 받아서 결제 정보를 문자열로 반환하는 함수
// type 속성으로 분기 처리하세요 (switch 문 사용)
function processPayment(payment: Payment): string {
  // type 속성으로 분기 처리하세요
  return "";
}

// 연습 5: 인덱스 시그니처 (Index Signature)
// TODO: 동적 속성을 가질 수 있는 인터페이스를 정의하세요
// 문자열 키로 모든 속성에 접근 가능하고, 값은 string | number | boolean
// 인덱스 시그니처는 [key: string]: Type 형식으로 작성합니다
// 예: interface DynamicObject { [key: string]: string | number | boolean; }
interface DynamicObject {
  // 여기에 구현하세요
}

const config: DynamicObject = undefined;

// 테스트 케이스
console.log('=== 챕터 4: 인터페이스 ===');
console.log('사람:', person1);
console.log('직원:', employee1);
console.log('계산:', calculator.add(10, 5), calculator.multiply(3, 4));
console.log('신용카드 결제:', processPayment({ type: "credit", cardNumber: "1234", cvv: "123" }));
console.log('계좌이체:', processPayment({ type: "bank", accountNumber: "5678", bankCode: "001" }));
console.log('현금:', processPayment({ type: "cash", amount: 50000 }));
console.log('설정:', config);
