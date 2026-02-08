/**
 * Chapter 02 - Basic Types
 * 03-enums.ts - 열거형 (Enums)
 *
 * 이 파일에서 배울 내용:
 * - 열거형 (Enum) - 관련된 상수들의 집합을 이름으로 정의
 * - 숫자 열거형 (Numeric Enum)과 문자열 열거형 (String Enum)
 * - const 열거형 - 컴파일 시 인라인으로 치환되는 열거형
 * - 역방향 매핑 (Reverse Mapping) - 값으로 이름 찾기
 */

console.log("=== TypeScript 열거형 (Enums) ===\n");

// ============================================
// 1. 숫자 열거형 (Numeric Enum) - 자동으로 0부터 시작하는 숫자 할당
// ============================================

console.log("--- 1. 숫자 열거형 ---\n");
// 왜 필요한가? 매직 넘버 대신 의미 있는 이름으로 상수 관리

enum Direction {
  Up,    // 0
  Down,  // 1
  Left,  // 2
  Right  // 3
}

let playerDirection: Direction = Direction.Up;
console.log(`플레이어 방향: ${Direction[playerDirection]} (값: ${playerDirection})`);

// 모든 열거형 값 출력
console.log(`\n방향 목록:`);
console.log(`  Up: ${Direction.Up}`);
console.log(`  Down: ${Direction.Down}`);
console.log(`  Left: ${Direction.Left}`);
console.log(`  Right: ${Direction.Right}`);

// ============================================
// 2. 초기값 지정
// ============================================

console.log("\n--- 2. 초기값 지정 ---\n");

enum Status {
  Pending = 1,    // 1부터 시작
  Processing,     // 2
  Success,        // 3
  Failed          // 4
}

console.log(`상태 코드:`);
console.log(`  Pending: ${Status.Pending}`);
console.log(`  Processing: ${Status.Processing}`);
console.log(`  Success: ${Status.Success}`);
console.log(`  Failed: ${Status.Failed}`);

// ============================================
// 3. 문자열 열거형 (String Enum)
// ============================================

console.log("\n--- 3. 문자열 열거형 ---\n");

enum LogLevel {
  ERROR = "ERROR",
  WARN = "WARN",
  INFO = "INFO",
  DEBUG = "DEBUG"
}

function log(level: LogLevel, message: string): void {
  console.log(`[${level}] ${message}`);
}

log(LogLevel.INFO, "애플리케이션 시작");
log(LogLevel.WARN, "메모리 사용량 높음");
log(LogLevel.ERROR, "데이터베이스 연결 실패");

// ============================================
// 4. 혼합 열거형 (Heterogeneous Enum)
// ============================================

console.log("\n--- 4. 혼합 열거형 ---\n");

// 권장되지 않지만 가능함
enum Mixed {
  No = 0,
  Yes = "YES"
}

console.log(`혼합 열거형: No=${Mixed.No}, Yes="${Mixed.Yes}"`);

// ============================================
// 5. 계산된 멤버와 상수 멤버
// ============================================

console.log("\n--- 5. 계산된 멤버 ---\n");

enum FileAccess {
  None = 0,
  Read = 1 << 0,      // 1
  Write = 1 << 1,     // 2
  ReadWrite = Read | Write  // 3
}

console.log(`파일 권한 (비트 플래그):`);
console.log(`  None: ${FileAccess.None}`);
console.log(`  Read: ${FileAccess.Read}`);
console.log(`  Write: ${FileAccess.Write}`);
console.log(`  ReadWrite: ${FileAccess.ReadWrite}`);

// ============================================
// 6. const 열거형 (Const Enum)
// ============================================

console.log("\n--- 6. const 열거형 ---\n");

const enum Color {
  Red = "#FF0000",
  Green = "#00FF00",
  Blue = "#0000FF"
}

// const enum은 컴파일 시 인라인으로 치환되어 런타임 코드가 없음
let favoriteColor: Color = Color.Blue;
console.log(`좋아하는 색상: ${favoriteColor}`);

// ============================================
// 7. 역방향 매핑 (Reverse Mapping)
// ============================================

console.log("\n--- 7. 역방향 매핑 ---\n");

enum Priority {
  Low = 1,
  Medium = 2,
  High = 3
}

// 숫자 열거형은 역방향 매핑 지원
console.log(`Priority[1]: ${Priority[1]}`); // "Low"
console.log(`Priority[2]: ${Priority[2]}`); // "Medium"
console.log(`Priority[3]: ${Priority[3]}`); // "High"

console.log(`Priority.High: ${Priority.High}`); // 3

// 문자열 열거형은 역방향 매핑 미지원
// console.log(LogLevel["ERROR"]); // undefined

// ============================================
// 8. 실용적인 예제
// ============================================

console.log("\n--- 8. 실용 예제: 주문 시스템 ---\n");

enum OrderStatus {
  Created = "CREATED",
  Paid = "PAID",
  Shipped = "SHIPPED",
  Delivered = "DELIVERED",
  Cancelled = "CANCELLED"
}

interface Order {
  id: number;
  status: OrderStatus;
  total: number;
}

const orders: Order[] = [
  { id: 1, status: OrderStatus.Delivered, total: 50000 },
  { id: 2, status: OrderStatus.Shipped, total: 30000 },
  { id: 3, status: OrderStatus.Paid, total: 80000 }
];

console.log("주문 목록:");
orders.forEach(order => {
  console.log(`  주문 #${order.id}: ${order.status} - ${order.total.toLocaleString()}원`);
});

// ============================================
// 9. Enum vs Union Type
// ============================================

console.log("\n--- 9. Enum vs Union Type ---\n");

// Union Type 대안
type DirectionUnion = "UP" | "DOWN" | "LEFT" | "RIGHT";
let direction: DirectionUnion = "UP";

console.log("✅ Enum 사용 시점:");
console.log("  - 관련된 상수의 그룹");
console.log("  - 역방향 매핑 필요");
console.log("  - 런타임에 enum 객체 접근 필요");

console.log("\n✅ Union Type 사용 시점:");
console.log("  - 간단한 문자열 상수");
console.log("  - 트리 쉐이킹 최적화 필요");
console.log("  - 번들 크기 최소화");
