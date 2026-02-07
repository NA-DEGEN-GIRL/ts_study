/**
 * 챕터 2: 기본 타입 - 정답
 *
 * 이 챕터에서는 TypeScript의 기본 타입들을 학습합니다:
 * - 원시 타입 (string, number, boolean, null, undefined)
 * - Enum
 * - Type Assertion
 * - any vs unknown
 */

// 연습 1: 적절한 타입을 사용하세요
// 해설: TypeScript는 타입 추론을 하지만, 명시적으로 타입을 지정할 수도 있습니다
let productName: string = "노트북";
let price: number = 1500000;
let inStock: boolean = true;
let discount: null = null;
let deliveryDate: undefined = undefined;

// 연습 2: Enum을 사용하세요
// 해설: Enum은 관련된 상수들을 그룹화합니다. 기본적으로 0부터 시작하는 숫자가 할당됩니다
enum OrderStatus {
  PENDING,     // 0
  PROCESSING,  // 1
  SHIPPED,     // 2
  DELIVERED,   // 3
  CANCELLED    // 4
}

// 해설: Enum 멤버를 값으로 사용할 수 있습니다
const currentStatus: OrderStatus = OrderStatus.PROCESSING;

// 연습 3: Type Assertion을 사용하세요
// 해설: as 키워드로 타입을 단언합니다. 개발자가 타입을 더 잘 알고 있을 때 사용합니다
function getInputValue(id: string): string {
  const element = { value: "테스트" };
  // 실제 환경에서는: const element = document.getElementById(id) as HTMLInputElement;
  const inputElement = element as { value: string };
  return inputElement.value;
}

// 연습 4: any vs unknown
// 해설: unknown은 any와 달리 타입 체크를 강제합니다. 더 안전한 타입입니다
function processValue(value: unknown): string {
  // typeof를 사용하여 타입 가드를 적용합니다
  if (typeof value === "string") {
    return value.toUpperCase();
  }
  if (typeof value === "number") {
    return String(value);
  }
  return "알 수 없음";
}

// 연습 5: Tuple 타입을 사용하세요
// 해설: Tuple은 고정된 길이와 각 위치마다 다른 타입을 가질 수 있는 배열입니다
type ProductInfo = [string, number, boolean];

const laptop: ProductInfo = ["노트북", 1500000, true];

// 테스트 케이스
console.log('=== 챕터 2: 기본 타입 ===');
console.log('제품:', productName, '가격:', price, '재고:', inStock);
console.log('주문 상태:', currentStatus);
console.log('입력값:', getInputValue('test'));
console.log('처리 결과 (문자열):', processValue("hello"));
console.log('처리 결과 (숫자):', processValue(42));
console.log('처리 결과 (기타):', processValue({}));
console.log('제품 정보:', laptop);
