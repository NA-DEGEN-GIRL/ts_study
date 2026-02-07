/**
 * Chapter 09-01: 모듈 내보내기 (Exports)
 *
 * TypeScript 모듈 시스템에서 값, 타입, 인터페이스를 내보내는 방법을 학습합니다.
 * 이 파일은 02-imports.ts에서 import하여 사용됩니다.
 */

console.log("=== 모듈 내보내기 예제 ===\n");

// Named Export - 상수
export const API_URL = "https://api.example.com";
export const API_VERSION = "v1";

console.log("1. 상수 내보내기:");
console.log("  API_URL:", API_URL);
console.log("  API_VERSION:", API_VERSION);
console.log();

// Named Export - 인터페이스
export interface User {
  id: number;
  name: string;
  email: string;
}

export interface Product {
  id: number;
  name: string;
  price: number;
}

// Named Export - 타입
export type UserId = number;
export type UserRole = "admin" | "user" | "guest";

// Named Export - 함수
export function formatUser(user: User): string {
  return `${user.name} (${user.email})`;
}

export function calculateTotal(price: number, quantity: number): number {
  return price * quantity;
}

console.log("2. 함수 내보내기:");
const sampleUser: User = { id: 1, name: "김철수", email: "kim@example.com" };
console.log("  ", formatUser(sampleUser));
console.log("  calculateTotal(100, 3):", calculateTotal(100, 3));
console.log();

// Named Export - 클래스
export class UserManager {
  private users: User[] = [];

  addUser(user: User): void {
    this.users.push(user);
    console.log(`  사용자 추가됨: ${user.name}`);
  }

  getUser(id: number): User | undefined {
    return this.users.find(u => u.id === id);
  }

  getUserCount(): number {
    return this.users.length;
  }
}

console.log("3. 클래스 내보내기:");
const manager = new UserManager();
manager.addUser({ id: 1, name: "이영희", email: "lee@example.com" });
manager.addUser({ id: 2, name: "박민수", email: "park@example.com" });
console.log("  총 사용자 수:", manager.getUserCount());
console.log();

// Export 별칭
const SECRET_KEY = "abc123";
export { SECRET_KEY as API_KEY };

// 그룹 Export
export const config = {
  timeout: 5000,
  retries: 3
};

export const utils = {
  isEmail: (email: string) => email.includes("@"),
  capitalize: (str: string) => str.charAt(0).toUpperCase() + str.slice(1)
};

console.log("4. 그룹 내보내기:");
console.log("  config:", config);
console.log("  utils.isEmail('test@example.com'):", utils.isEmail("test@example.com"));
console.log("  utils.capitalize('typescript'):", utils.capitalize("typescript"));
console.log();

// Default Export
export default class Logger {
  private prefix: string;

  constructor(prefix: string = "[LOG]") {
    this.prefix = prefix;
  }

  log(message: string): void {
    console.log(`${this.prefix} ${message}`);
  }

  error(message: string): void {
    console.log(`${this.prefix} ERROR: ${message}`);
  }
}

console.log("5. 기본 내보내기 (Default Export):");
const logger = new Logger("[APP]");
logger.log("애플리케이션 시작");
logger.error("오류 발생");
