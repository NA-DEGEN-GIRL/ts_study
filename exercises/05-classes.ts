/**
 * 챕터 5: 클래스
 *
 * 이 챕터에서는 TypeScript의 클래스를 학습합니다:
 * - 클래스 정의와 접근 제한자
 * - 추상 클래스
 * - 인터페이스 구현
 * - Getter/Setter
 */

// 연습 1: 기본 클래스와 접근 제한자
// TODO: BankAccount 클래스를 만드세요
// private balance(number), public accountHolder(string), readonly accountNumber(string)
// 메서드: deposit(amount), withdraw(amount), getBalance()
class BankAccount {
  // 여기에 구현하세요
}

// 연습 2: 추상 클래스
// TODO: 추상 클래스 Shape를 만드세요
// 추상 메서드: getArea(), getPerimeter()
// 일반 메서드: describe() - 이름과 면적을 출력
abstract class Shape {
  // 여기에 구현하세요
}

// TODO: Rectangle 클래스로 Shape를 구현하세요
class Rectangle {
  // 여기에 구현하세요
}

// 연습 3: 인터페이스 구현
// TODO: Printable 인터페이스를 정의하세요
interface Printable {
  // print(): void 메서드
}

// TODO: Document 클래스가 Printable을 구현하도록 하세요
class Document {
  // 여기에 구현하세요
}

// 연습 4: Getter와 Setter
// TODO: 온도를 섭씨와 화씨로 관리하는 Temperature 클래스를 만드세요
// private celsius 속성
// get/set fahrenheit (화씨 = 섭씨 * 9/5 + 32)
class Temperature {
  // 여기에 구현하세요
}

// 연습 5: Static 멤버
// TODO: Counter 클래스에 static 속성과 메서드를 추가하세요
// static count: 전체 카운터 개수
// increment(), decrement(): 인스턴스 카운터
// static getTotalCount(): 전체 카운터 반환
class Counter {
  // 여기에 구현하세요
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
