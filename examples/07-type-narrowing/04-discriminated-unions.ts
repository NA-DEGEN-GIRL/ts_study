/**
 * Chapter 07-04: 판별된 유니온 (Discriminated Unions)
 *
 * 공통 리터럴 타입 속성을 사용하여 유니온 타입을 구별하고,
 * 모든 케이스를 처리했는지 컴파일 타임에 검사합니다.
 */

console.log("=== 판별된 유니온 예제 ===\n");

// 도형 예제: 판별자로 kind 사용
interface Circle {
  kind: "circle";
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

function getArea(shape: Shape): number {
  switch (shape.kind) {
    case "circle":
      // shape는 Circle 타입
      return Math.PI * shape.radius ** 2;
    case "rectangle":
      // shape는 Rectangle 타입
      return shape.width * shape.height;
    case "triangle":
      // shape는 Triangle 타입
      return (shape.base * shape.height) / 2;
  }
}

console.log("1. 도형 면적 계산:");
const circle: Circle = { kind: "circle", radius: 5 };
const rectangle: Rectangle = { kind: "rectangle", width: 4, height: 6 };
const triangle: Triangle = { kind: "triangle", base: 8, height: 3 };

console.log("  원 면적:", getArea(circle).toFixed(2));
console.log("  직사각형 면적:", getArea(rectangle));
console.log("  삼각형 면적:", getArea(triangle));
console.log();

// 철저한 검사 (Exhaustive Check)
function assertNever(value: never): never {
  throw new Error(`처리되지 않은 케이스: ${JSON.stringify(value)}`);
}

function getShapeDescription(shape: Shape): string {
  switch (shape.kind) {
    case "circle":
      return `원 (반지름: ${shape.radius})`;
    case "rectangle":
      return `직사각형 (${shape.width}x${shape.height})`;
    case "triangle":
      return `삼각형 (밑변: ${shape.base}, 높이: ${shape.height})`;
    default:
      // 모든 케이스를 처리하지 않으면 컴파일 에러
      return assertNever(shape);
  }
}

console.log("2. 철저한 타입 검사:");
console.log("  ", getShapeDescription(circle));
console.log("  ", getShapeDescription(rectangle));
console.log("  ", getShapeDescription(triangle));
console.log();

// API 응답 처리 예제
interface LoadingState {
  status: "loading";
}

interface SuccessState {
  status: "success";
  data: string[];
}

interface ErrorState {
  status: "error";
  error: string;
}

type ApiState = LoadingState | SuccessState | ErrorState;

function renderApiState(state: ApiState): string {
  switch (state.status) {
    case "loading":
      return "로딩 중...";
    case "success":
      return `데이터: ${state.data.join(", ")}`;
    case "error":
      return `오류: ${state.error}`;
  }
}

console.log("3. API 상태 처리:");
const loadingState: ApiState = { status: "loading" };
const successState: ApiState = {
  status: "success",
  data: ["항목1", "항목2", "항목3"]
};
const errorState: ApiState = { status: "error", error: "네트워크 오류" };

console.log("  ", renderApiState(loadingState));
console.log("  ", renderApiState(successState));
console.log("  ", renderApiState(errorState));
console.log();

// 복잡한 이벤트 시스템
type ButtonClickEvent = {
  type: "click";
  x: number;
  y: number;
};

type TextInputEvent = {
  type: "input";
  value: string;
};

type FormSubmitEvent = {
  type: "submit";
  formData: Record<string, string>;
};

type AppEvent = ButtonClickEvent | TextInputEvent | FormSubmitEvent;

function handleEvent(event: AppEvent): string {
  switch (event.type) {
    case "click":
      return `클릭 이벤트: (${event.x}, ${event.y})`;
    case "input":
      return `입력 이벤트: "${event.value}"`;
    case "submit":
      const entries = Object.entries(event.formData);
      return `제출 이벤트: ${entries.length}개 필드`;
    default:
      return assertNever(event);
  }
}

console.log("4. 이벤트 처리:");
console.log("  ", handleEvent({ type: "click", x: 100, y: 200 }));
console.log("  ", handleEvent({ type: "input", value: "TypeScript" }));
console.log("  ", handleEvent({ type: "submit", formData: { name: "홍길동", email: "hong@example.com" } }));
