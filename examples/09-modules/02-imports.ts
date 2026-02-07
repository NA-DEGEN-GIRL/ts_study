/**
 * Chapter 09-02: 모듈 가져오기 (Imports)
 *
 * 다른 모듈에서 내보낸 값, 타입, 인터페이스를 가져오는 방법을 학습합니다.
 * 01-exports.ts에서 내보낸 항목들을 import합니다.
 */

console.log("=== 모듈 가져오기 예제 ===\n");

// Named Import - 상수
import { API_URL, API_VERSION } from "./01-exports";

console.log("1. Named Import - 상수:");
console.log("  API_URL:", API_URL);
console.log("  API_VERSION:", API_VERSION);
console.log();

// Named Import - 타입과 인터페이스
import { User, Product, UserRole } from "./01-exports";

const user: User = {
  id: 1,
  name: "홍길동",
  email: "hong@example.com"
};

const product: Product = {
  id: 101,
  name: "노트북",
  price: 1500000
};

const role: UserRole = "admin";

console.log("2. Named Import - 타입:");
console.log("  사용자:", user);
console.log("  상품:", product);
console.log("  역할:", role);
console.log();

// Named Import - 함수
import { formatUser, calculateTotal } from "./01-exports";

console.log("3. Named Import - 함수:");
console.log("  ", formatUser(user));
console.log("  주문 총액:", calculateTotal(product.price, 2));
console.log();

// Named Import - 클래스
import { UserManager } from "./01-exports";

const manager = new UserManager();
manager.addUser(user);
manager.addUser({ id: 2, name: "김영수", email: "kim@example.com" });

console.log("  총 사용자 수:", manager.getUserCount());
console.log();

// Import 별칭
import { API_KEY as SecretKey } from "./01-exports";

console.log("4. Import 별칭:");
console.log("  SecretKey:", SecretKey);
console.log();

// 네임스페이스 Import (전체 가져오기)
import * as Exports from "./01-exports";

console.log("5. 네임스페이스 Import:");
console.log("  Exports.API_URL:", Exports.API_URL);
console.log("  Exports.calculateTotal(100, 5):", Exports.calculateTotal(100, 5));
console.log();

// Default Import
import Logger from "./01-exports";

const logger = new Logger("[IMPORT]");
console.log("6. Default Import:");
logger.log("모듈 가져오기 성공");
logger.error("테스트 오류 메시지");
console.log();

// 혼합 Import (default + named)
import DefaultLogger, { config, utils } from "./01-exports";

console.log("7. 혼합 Import:");
console.log("  config:", config);
console.log("  utils.capitalize('module'):", utils.capitalize("module"));

const mixedLogger = new DefaultLogger("[MIXED]");
mixedLogger.log("기본 + Named 임포트 사용");
console.log();

// 타입만 가져오기 (type-only import)
import type { UserId } from "./01-exports";

const userId: UserId = 42;
console.log("8. 타입만 가져오기:");
console.log("  userId:", userId);
console.log("  (UserId 타입은 컴파일 후 제거됨)");
console.log();

// 실용적인 예제: 모듈 재구성
console.log("9. 실용적인 사용 예제:");

interface Order {
  user: User;
  product: Product;
  quantity: number;
}

function processOrder(order: Order): void {
  const total = calculateTotal(order.product.price, order.quantity);
  const userInfo = formatUser(order.user);

  console.log("  주문 처리:");
  console.log("    사용자:", userInfo);
  console.log("    상품:", order.product.name);
  console.log("    수량:", order.quantity);
  console.log("    총액:", total.toLocaleString() + "원");
}

const order: Order = {
  user: { id: 1, name: "이철수", email: "lee@example.com" },
  product: { id: 201, name: "마우스", price: 35000 },
  quantity: 3
};

processOrder(order);
