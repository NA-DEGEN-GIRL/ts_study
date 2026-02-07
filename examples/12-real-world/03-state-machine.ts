/**
 * Chapter 12-03: 타입 안전한 상태 머신 (State Machine)
 *
 * 판별된 유니온을 사용하여 타입 안전한 상태 머신을 구현합니다.
 * 각 상태에서 허용되는 전환만 타입 시스템으로 보장합니다.
 */

console.log("=== 타입 안전한 상태 머신 예제 ===\n");

// 기본 상태 머신: 신호등
type TrafficLightState =
  | { status: "red"; duration: number }
  | { status: "yellow"; duration: number }
  | { status: "green"; duration: number };

class TrafficLight {
  private state: TrafficLightState;

  constructor() {
    this.state = { status: "red", duration: 30 };
  }

  getState(): TrafficLightState {
    return this.state;
  }

  next(): void {
    switch (this.state.status) {
      case "red":
        this.state = { status: "green", duration: 25 };
        break;
      case "green":
        this.state = { status: "yellow", duration: 5 };
        break;
      case "yellow":
        this.state = { status: "red", duration: 30 };
        break;
    }
  }

  describe(): string {
    return `${this.state.status.toUpperCase()} (${this.state.duration}초)`;
  }
}

console.log("1. 신호등 상태 머신:");
const light = new TrafficLight();
console.log("  초기 상태:", light.describe());
light.next();
console.log("  다음 상태:", light.describe());
light.next();
console.log("  다음 상태:", light.describe());
console.log();

// 주문 상태 머신
type OrderState =
  | { status: "pending"; createdAt: Date }
  | { status: "paid"; paidAt: Date; amount: number }
  | { status: "shipped"; shippedAt: Date; trackingNumber: string }
  | { status: "delivered"; deliveredAt: Date }
  | { status: "cancelled"; cancelledAt: Date; reason: string };

type OrderEvent =
  | { type: "PAY"; amount: number }
  | { type: "SHIP"; trackingNumber: string }
  | { type: "DELIVER" }
  | { type: "CANCEL"; reason: string };

class Order {
  private state: OrderState;

  constructor(private id: string) {
    this.state = { status: "pending", createdAt: new Date() };
  }

  getState(): OrderState {
    return this.state;
  }

  transition(event: OrderEvent): void {
    switch (this.state.status) {
      case "pending":
        if (event.type === "PAY") {
          this.state = {
            status: "paid",
            paidAt: new Date(),
            amount: event.amount
          };
        } else if (event.type === "CANCEL") {
          this.state = {
            status: "cancelled",
            cancelledAt: new Date(),
            reason: event.reason
          };
        }
        break;

      case "paid":
        if (event.type === "SHIP") {
          this.state = {
            status: "shipped",
            shippedAt: new Date(),
            trackingNumber: event.trackingNumber
          };
        } else if (event.type === "CANCEL") {
          this.state = {
            status: "cancelled",
            cancelledAt: new Date(),
            reason: event.reason
          };
        }
        break;

      case "shipped":
        if (event.type === "DELIVER") {
          this.state = {
            status: "delivered",
            deliveredAt: new Date()
          };
        }
        break;

      case "delivered":
      case "cancelled":
        console.log("  최종 상태에서는 전환할 수 없습니다");
        break;
    }
  }

  describe(): string {
    switch (this.state.status) {
      case "pending":
        return `주문 대기 중 (${this.state.createdAt.toISOString()})`;
      case "paid":
        return `결제 완료 (금액: ${this.state.amount}원)`;
      case "shipped":
        return `배송 중 (송장: ${this.state.trackingNumber})`;
      case "delivered":
        return `배송 완료 (${this.state.deliveredAt.toISOString()})`;
      case "cancelled":
        return `취소됨 (사유: ${this.state.reason})`;
    }
  }
}

console.log("2. 주문 상태 머신:");
const order = new Order("ORD-001");
console.log("  ", order.describe());

order.transition({ type: "PAY", amount: 50000 });
console.log("  ", order.describe());

order.transition({ type: "SHIP", trackingNumber: "TRK-123456" });
console.log("  ", order.describe());

order.transition({ type: "DELIVER" });
console.log("  ", order.describe());
console.log();

// 사용자 인증 상태 머신
type AuthState =
  | { status: "anonymous" }
  | { status: "authenticating"; username: string }
  | { status: "authenticated"; user: { id: number; username: string; token: string } }
  | { status: "error"; message: string };

type AuthEvent =
  | { type: "LOGIN"; username: string; password: string }
  | { type: "LOGIN_SUCCESS"; user: { id: number; username: string; token: string } }
  | { type: "LOGIN_FAILURE"; message: string }
  | { type: "LOGOUT" };

class AuthStateMachine {
  private state: AuthState = { status: "anonymous" };

  getState(): AuthState {
    return this.state;
  }

  async dispatch(event: AuthEvent): Promise<void> {
    switch (this.state.status) {
      case "anonymous":
        if (event.type === "LOGIN") {
          this.state = { status: "authenticating", username: event.username };
          // 비동기 로그인 시뮬레이션
          await this.simulateLogin(event.username, event.password);
        }
        break;

      case "authenticating":
        if (event.type === "LOGIN_SUCCESS") {
          this.state = { status: "authenticated", user: event.user };
        } else if (event.type === "LOGIN_FAILURE") {
          this.state = { status: "error", message: event.message };
        }
        break;

      case "authenticated":
        if (event.type === "LOGOUT") {
          this.state = { status: "anonymous" };
        }
        break;

      case "error":
        if (event.type === "LOGIN") {
          this.state = { status: "authenticating", username: event.username };
          await this.simulateLogin(event.username, event.password);
        }
        break;
    }
  }

  private async simulateLogin(username: string, password: string): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, 100));

    if (password === "correct") {
      await this.dispatch({
        type: "LOGIN_SUCCESS",
        user: { id: 1, username, token: "abc123" }
      });
    } else {
      await this.dispatch({
        type: "LOGIN_FAILURE",
        message: "잘못된 비밀번호"
      });
    }
  }

  describe(): string {
    switch (this.state.status) {
      case "anonymous":
        return "로그인되지 않음";
      case "authenticating":
        return `인증 중: ${this.state.username}`;
      case "authenticated":
        return `로그인됨: ${this.state.user.username}`;
      case "error":
        return `오류: ${this.state.message}`;
    }
  }
}

console.log("3. 인증 상태 머신:");
(async () => {
  const auth = new AuthStateMachine();
  console.log("  ", auth.describe());

  await auth.dispatch({ type: "LOGIN", username: "kim", password: "wrong" });
  console.log("  ", auth.describe());

  await auth.dispatch({ type: "LOGIN", username: "kim", password: "correct" });
  console.log("  ", auth.describe());

  await auth.dispatch({ type: "LOGOUT" });
  console.log("  ", auth.describe());
  console.log();
})();

// 문서 편집 상태 머신
type DocumentState =
  | { status: "viewing"; lastModified?: Date }
  | { status: "editing"; content: string; startedAt: Date }
  | { status: "saving"; content: string }
  | { status: "saved"; lastSaved: Date };

class DocumentEditor {
  private state: DocumentState = { status: "viewing" };

  getState(): DocumentState {
    return this.state;
  }

  startEdit(content: string): void {
    if (this.state.status === "viewing" || this.state.status === "saved") {
      this.state = {
        status: "editing",
        content,
        startedAt: new Date()
      };
      console.log("  편집 모드 시작");
    }
  }

  updateContent(content: string): void {
    if (this.state.status === "editing") {
      this.state = {
        ...this.state,
        content
      };
      console.log("  내용 업데이트:", content);
    }
  }

  async save(): Promise<void> {
    if (this.state.status === "editing") {
      const content = this.state.content;
      this.state = { status: "saving", content };
      console.log("  저장 중...");

      await new Promise((resolve) => setTimeout(resolve, 100));

      this.state = { status: "saved", lastSaved: new Date() };
      console.log("  저장 완료");
    }
  }

  view(): void {
    if (this.state.status === "saved") {
      this.state = { status: "viewing", lastModified: this.state.lastSaved };
      console.log("  보기 모드로 전환");
    }
  }
}

setTimeout(() => {
  console.log("4. 문서 편집 상태 머신:");

  (async () => {
    const editor = new DocumentEditor();
    editor.startEdit("Hello");
    editor.updateContent("Hello, TypeScript!");
    await editor.save();
    editor.view();
    console.log();
  })();
}, 350);

// 게임 캐릭터 상태 머신
type CharacterState =
  | { status: "idle" }
  | { status: "walking"; speed: number }
  | { status: "running"; speed: number }
  | { status: "jumping"; height: number }
  | { status: "attacking"; damage: number };

class GameCharacter {
  private state: CharacterState = { status: "idle" };

  getState(): CharacterState {
    return this.state;
  }

  walk(): void {
    this.state = { status: "walking", speed: 5 };
  }

  run(): void {
    this.state = { status: "running", speed: 10 };
  }

  jump(): void {
    this.state = { status: "jumping", height: 3 };
  }

  attack(damage: number): void {
    this.state = { status: "attacking", damage };
  }

  idle(): void {
    this.state = { status: "idle" };
  }

  describe(): string {
    switch (this.state.status) {
      case "idle":
        return "대기 중";
      case "walking":
        return `걷는 중 (속도: ${this.state.speed})`;
      case "running":
        return `달리는 중 (속도: ${this.state.speed})`;
      case "jumping":
        return `점프 중 (높이: ${this.state.height})`;
      case "attacking":
        return `공격 중 (데미지: ${this.state.damage})`;
    }
  }
}

setTimeout(() => {
  console.log("5. 게임 캐릭터 상태 머신:");
  const character = new GameCharacter();
  console.log("  ", character.describe());

  character.walk();
  console.log("  ", character.describe());

  character.run();
  console.log("  ", character.describe());

  character.attack(50);
  console.log("  ", character.describe());

  character.idle();
  console.log("  ", character.describe());

  console.log("\n모든 상태 머신 예제 완료!");
}, 500);
