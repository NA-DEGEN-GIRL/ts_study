/**
 * Chapter 04 - Interfaces
 * 04-discriminated-unions.ts - 판별 유니온 (Discriminated Unions)
 *
 * 판별 유니온 패턴을 학습합니다.
 * 태그된 유니온을 사용하여 타입 안전한 분기 처리를 구현합니다.
 */

console.log("=== 판별 유니온 (Discriminated Unions) ===\n");

// ============================================
// 1. 기본 판별 유니온
// ============================================

console.log("--- 1. 기본 판별 유니온 ---\n");

interface Circle {
  kind: "circle"; // 판별자 (discriminant)
  radius: number;
}

interface Rectangle {
  kind: "rectangle";
  width: number;
  height: number;
}

interface Triangle {
  kind: "triangle";
  base: number;
  height: number;
}

type Shape = Circle | Rectangle | Triangle;

function calculateArea(shape: Shape): number {
  switch (shape.kind) {
    case "circle":
      return Math.PI * shape.radius ** 2;
    case "rectangle":
      return shape.width * shape.height;
    case "triangle":
      return (shape.base * shape.height) / 2;
  }
}

const circle: Circle = { kind: "circle", radius: 10 };
const rectangle: Rectangle = { kind: "rectangle", width: 20, height: 10 };
const triangle: Triangle = { kind: "triangle", base: 15, height: 8 };

console.log(`원의 넓이: ${calculateArea(circle).toFixed(2)}`);
console.log(`사각형의 넓이: ${calculateArea(rectangle)}`);
console.log(`삼각형의 넓이: ${calculateArea(triangle)}`);

// ============================================
// 2. 완전성 체크 (Exhaustiveness Checking)
// ============================================

console.log("\n--- 2. 완전성 체크 ---\n");

function getShapeDescription(shape: Shape): string {
  switch (shape.kind) {
    case "circle":
      return `반지름 ${shape.radius}인 원`;
    case "rectangle":
      return `${shape.width} × ${shape.height} 사각형`;
    case "triangle":
      return `밑변 ${shape.base}, 높이 ${shape.height}인 삼각형`;
    default:
      // 모든 케이스를 처리했다면 여기는 도달 불가
      const _exhaustiveCheck: never = shape;
      return _exhaustiveCheck;
  }
}

console.log(getShapeDescription(circle));
console.log(getShapeDescription(rectangle));
console.log(getShapeDescription(triangle));

// ============================================
// 3. API 응답 패턴
// ============================================

console.log("\n--- 3. API 응답 패턴 ---\n");

interface Loading {
  state: "loading";
}

interface Success<T> {
  state: "success";
  data: T;
}

interface Failure {
  state: "error";
  error: string;
}

type AsyncState<T> = Loading | Success<T> | Failure;

interface UserData {
  id: number;
  name: string;
  email: string;
}

function handleApiResponse(response: AsyncState<UserData>): void {
  switch (response.state) {
    case "loading":
      console.log("  로딩 중...");
      break;
    case "success":
      console.log(`  성공: ${response.data.name} (${response.data.email})`);
      break;
    case "error":
      console.log(`  에러: ${response.error}`);
      break;
  }
}

handleApiResponse({ state: "loading" });
handleApiResponse({
  state: "success",
  data: { id: 1, name: "김철수", email: "kim@example.com" }
});
handleApiResponse({ state: "error", error: "네트워크 오류" });

// ============================================
// 4. 이벤트 시스템
// ============================================

console.log("\n--- 4. 이벤트 시스템 ---\n");

interface LoginEvent {
  type: "login";
  username: string;
  timestamp: number;
}

interface LogoutEvent {
  type: "logout";
  username: string;
  duration: number;
}

interface AppErrorEvent {
  type: "error";
  message: string;
  code: number;
}

type AppEvent = LoginEvent | LogoutEvent | AppErrorEvent;

function logEvent(event: AppEvent): void {
  switch (event.type) {
    case "login":
      console.log(`  [로그인] ${event.username} - ${new Date(event.timestamp).toLocaleTimeString()}`);
      break;
    case "logout":
      console.log(`  [로그아웃] ${event.username} - 세션 시간: ${event.duration}초`);
      break;
    case "error":
      console.log(`  [에러] ${event.message} (코드: ${event.code})`);
      break;
  }
}

logEvent({ type: "login", username: "user001", timestamp: Date.now() });
logEvent({ type: "logout", username: "user001", duration: 3600 });
logEvent({ type: "error", message: "인증 실패", code: 401 });

// ============================================
// 5. 결제 처리 예제
// ============================================

console.log("\n--- 5. 결제 처리 ---\n");

interface CreditCardPayment {
  method: "creditCard";
  cardNumber: string;
  cvv: string;
}

interface PayPalPayment {
  method: "paypal";
  email: string;
}

interface BankTransferPayment {
  method: "bankTransfer";
  accountNumber: string;
  bankCode: string;
}

type Payment = CreditCardPayment | PayPalPayment | BankTransferPayment;

function processPayment(payment: Payment, amount: number): void {
  console.log(`\n결제 금액: ${amount.toLocaleString()}원`);

  switch (payment.method) {
    case "creditCard":
      console.log(`  신용카드 결제: ${payment.cardNumber.slice(-4)}`);
      break;
    case "paypal":
      console.log(`  PayPal 결제: ${payment.email}`);
      break;
    case "bankTransfer":
      console.log(`  계좌이체: ${payment.bankCode} - ${payment.accountNumber}`);
      break;
  }
}

processPayment({ method: "creditCard", cardNumber: "1234-5678-9012-3456", cvv: "123" }, 50000);
processPayment({ method: "paypal", email: "user@example.com" }, 30000);
processPayment({ method: "bankTransfer", accountNumber: "123-456-789", bankCode: "004" }, 100000);

// ============================================
// 6. 폼 필드 검증
// ============================================

console.log("\n--- 6. 폼 필드 검증 ---\n");

interface ValidField {
  status: "valid";
  value: string;
}

interface InvalidField {
  status: "invalid";
  value: string;
  errors: string[];
}

interface PendingField {
  status: "pending";
  value: string;
}

type FieldState = ValidField | InvalidField | PendingField;

function renderFieldState(field: FieldState): void {
  switch (field.status) {
    case "valid":
      console.log(`  ✅ ${field.value} (유효함)`);
      break;
    case "invalid":
      console.log(`  ❌ ${field.value} - 오류: ${field.errors.join(", ")}`);
      break;
    case "pending":
      console.log(`  ⏳ ${field.value} (검증 중...)`);
      break;
  }
}

renderFieldState({ status: "valid", value: "user@example.com" });
renderFieldState({
  status: "invalid",
  value: "invalid-email",
  errors: ["올바른 이메일 형식이 아닙니다"]
});
renderFieldState({ status: "pending", value: "checking@example.com" });

// ============================================
// 7. 상태 머신 패턴
// ============================================

console.log("\n--- 7. 상태 머신 ---\n");

interface IdleState {
  status: "idle";
}

interface LoadingState {
  status: "loading";
  progress: number;
}

interface SuccessState {
  status: "success";
  result: string;
}

interface FailureState {
  status: "failure";
  error: string;
  retryable: boolean;
}

type StateMachine = IdleState | LoadingState | SuccessState | FailureState;

function getStateMessage(state: StateMachine): string {
  switch (state.status) {
    case "idle":
      return "대기 중";
    case "loading":
      return `로딩 중... ${state.progress}%`;
    case "success":
      return `완료: ${state.result}`;
    case "failure":
      return `실패: ${state.error}${state.retryable ? " (재시도 가능)" : ""}`;
  }
}

console.log(getStateMessage({ status: "idle" }));
console.log(getStateMessage({ status: "loading", progress: 50 }));
console.log(getStateMessage({ status: "success", result: "데이터 로드 완료" }));
console.log(getStateMessage({
  status: "failure",
  error: "네트워크 오류",
  retryable: true
}));

// ============================================
// 8. 알림 시스템
// ============================================

console.log("\n--- 8. 알림 시스템 ---\n");

interface InfoNotification {
  type: "info";
  message: string;
}

interface WarningNotification {
  type: "warning";
  message: string;
  dismissible: boolean;
}

interface ErrorNotification {
  type: "error";
  message: string;
  errorCode: string;
}

type AppNotification = InfoNotification | WarningNotification | ErrorNotification;

function displayNotification(notification: AppNotification): void {
  const prefix = {
    info: "ℹ️",
    warning: "⚠️",
    error: "❌"
  }[notification.type];

  console.log(`  ${prefix} ${notification.message}`);

  if (notification.type === "warning" && notification.dismissible) {
    console.log("    [닫기 가능]");
  }

  if (notification.type === "error") {
    console.log(`    에러 코드: ${notification.errorCode}`);
  }
}

displayNotification({ type: "info", message: "업데이트가 있습니다" });
displayNotification({
  type: "warning",
  message: "저장하지 않은 변경사항이 있습니다",
  dismissible: true
});
displayNotification({
  type: "error",
  message: "서버에 연결할 수 없습니다",
  errorCode: "ERR_CONNECTION"
});

// ============================================
// 9. 모범 사례
// ============================================

console.log("\n--- 9. 모범 사례 ---\n");

console.log("✅ 판별 유니온 사용 시점:");
console.log("  - 여러 상태를 표현할 때");
console.log("  - API 응답 처리");
console.log("  - 이벤트 시스템");
console.log("  - 상태 머신 구현");
console.log("  - 다형성 데이터 모델");

console.log("\n✅ 판별자 선택:");
console.log("  - 명확하고 설명적인 이름 사용");
console.log("  - 문자열 리터럴 타입 권장");
console.log("  - 일관된 속성 이름 (type, kind, status 등)");

console.log("\n💡 Tip: switch 문으로 완전성 체크를 활용하세요!");
