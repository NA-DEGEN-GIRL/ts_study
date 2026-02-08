/**
 * 챕터 2: 기본 타입
 *
 * 이 챕터에서는 TypeScript의 기본 타입들을 학습합니다:
 * - 원시 타입 (Type): string, number, boolean, null, undefined
 * - 열거형 (Enum)
 * - 타입 단언 (Type Assertion)
 * - any vs unknown
 */

// 연습 1: 적절한 타입을 사용하세요
// TODO: 각 변수에 적절한 타입을 명시하세요
// 예: let productName: string = "노트북";
let productName = "노트북";
let price = 1500000;
let inStock = true;
let discount = null;
let deliveryDate = undefined;

// 연습 2: 열거형 (Enum)을 사용하세요
// TODO: 주문 상태를 나타내는 OrderStatus enum을 만드세요
// 값: PENDING, PROCESSING, SHIPPED, DELIVERED, CANCELLED
// 예: enum OrderStatus { PENDING, PROCESSING }
enum OrderStatus {
  // 여기에 구현하세요
}

// TODO: 현재 주문 상태를 저장하는 변수를 만드세요
// 예: const currentStatus: OrderStatus = OrderStatus.PROCESSING;
const currentStatus = undefined;

// 연습 3: 타입 단언 (Type Assertion)을 사용하세요
// TODO: DOM API를 사용할 때 타입 단언이 필요합니다
// getElementById는 HTMLElement | null을 반환하므로 구체적인 타입으로 단언해야 합니다
function getInputValue(id: string): string {
  // TODO: input 엘리먼트를 가져와서 HTMLInputElement로 단언하고 value를 반환하세요
  // as 키워드를 사용하여 타입을 단언하세요
  // 예: const inputElement = element as { value: string };
  const element = { value: "테스트" }; // 실제로는 document.getElementById(id)
  // 여기에 타입 단언을 구현하세요
  return "";
}

// 연습 4: any vs unknown
// TODO: any와 unknown의 차이를 이해하고 안전한 코드를 작성하세요
function processValue(value: unknown): string {
  // TODO: unknown 타입의 값을 안전하게 처리하세요
  // typeof 체크를 통해 타입을 좁혀야 합니다 (이것을 타입 가드 (Type Guard)라고 합니다)
  // string이면 대문자로, number면 문자열로, 그 외는 "알 수 없음"을 반환
  // 예: if (typeof value === "string") { return value.toUpperCase(); }
  return "";
}

// 연습 5: 튜플 (Tuple) 타입을 사용하세요
// TODO: [string, number, boolean] 형태의 튜플 타입을 정의하고 사용하세요
// 튜플은 고정된 길이와 각 위치마다 정해진 타입을 가진 배열입니다
// 예: type ProductInfo = [string, number, boolean];
type ProductInfo = any; // 여기를 수정하세요

const laptop: ProductInfo = undefined; // ["노트북", 1500000, true] 형태로 할당

// 테스트 케이스
console.log('=== 챕터 2: 기본 타입 ===');
console.log('제품:', productName, '가격:', price, '재고:', inStock);
console.log('주문 상태:', currentStatus);
console.log('입력값:', getInputValue('test'));
console.log('처리 결과 (문자열):', processValue("hello"));
console.log('처리 결과 (숫자):', processValue(42));
console.log('처리 결과 (기타):', processValue({}));
console.log('제품 정보:', laptop);
