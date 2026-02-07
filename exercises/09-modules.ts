/**
 * 챕터 9: 모듈
 *
 * 이 챕터에서는 TypeScript의 모듈 시스템을 학습합니다:
 * - export/import 패턴
 * - 기본 export vs 명명된 export
 * - namespace
 * - 모듈 증강 (Module Augmentation)
 *
 * 참고: 단일 파일 연습이므로 개념적으로 학습합니다.
 */

// 연습 1: 명명된 export
// TODO: 다음과 같이 여러 항목을 export하는 예제를 작성하세요

// 방법 1: 선언과 동시에 export
export const API_URL = "https://api.example.com";
export const TIMEOUT = 3000;

export interface ApiConfig {
  url: string;
  timeout: number;
}

export function createConfig(): ApiConfig {
  return { url: API_URL, timeout: TIMEOUT };
}

// 방법 2: 한 번에 export
const MAX_RETRY = 3;
const DEFAULT_HEADERS = { "Content-Type": "application/json" };

// TODO: 위 두 상수를 한 번에 export하세요
export { MAX_RETRY, DEFAULT_HEADERS };

// 연습 2: 타입만 export/import
// TODO: type 키워드를 사용하여 타입만 export하세요
// 런타임에는 제거되지만 타입 체킹에는 사용됩니다
export type UserId = string;
export type ProductId = number;

export interface User {
  id: UserId;
  name: string;
}

// 연습 3: export as (별칭으로 export)
// TODO: 내부 이름과 다른 이름으로 export하세요
function validateEmailInternal(email: string): boolean {
  return email.includes("@");
}

// TODO: validateEmail이라는 이름으로 export하세요
export { validateEmailInternal as validateEmail };

// 연습 4: namespace를 사용한 구조화
// TODO: 관련된 타입과 함수들을 namespace로 그룹화하세요
export namespace MathUtils {
  export function add(a: number, b: number): number {
    return a + b;
  }

  export function subtract(a: number, b: number): number {
    return a - b;
  }

  export const PI = 3.14159;
}

// 연습 5: 모듈 증강 개념
// TODO: 기존 타입을 확장하는 개념을 이해하세요
// 실제로는 다른 파일의 모듈을 확장할 때 사용합니다

// 글로벌 스코프 확장 예제
declare global {
  interface String {
    // TODO: String 타입에 truncate 메서드를 추가하는 선언을 작성하세요
    truncate(maxLength: number): string;
  }
}

// 실제 구현 (선언과 별도)
String.prototype.truncate = function(this: string, maxLength: number): string {
  if (this.length <= maxLength) return this;
  return this.slice(0, maxLength) + "...";
};

// 연습 6: import 패턴 (개념적)
// 실제 import는 다른 파일에서 하지만, 여기서는 주석으로 패턴을 설명합니다

/*
// 개별 import
import { API_URL, TIMEOUT } from './config';

// 모든 export를 하나의 객체로 import
import * as Config from './config';
Config.API_URL;

// 타입만 import
import type { User, UserId } from './types';

// 기본 export와 명명된 export 함께 import
import defaultExport, { namedExport } from './module';

// 별칭 사용
import { validateEmailInternal as checkEmail } from './utils';
*/

// 테스트 케이스
console.log('=== 챕터 9: 모듈 ===');
console.log('API 설정:', createConfig());
console.log('최대 재시도:', MAX_RETRY);
console.log('기본 헤더:', DEFAULT_HEADERS);
console.log('이메일 검증:', validateEmail("test@example.com"));
console.log('수학 유틸:', MathUtils.add(5, 3), MathUtils.PI);
console.log('문자열 truncate:', "Hello, World!".truncate(8));

// 타입 사용 예제
const userId: UserId = "user_123";
const user: User = { id: userId, name: "김철수" };
console.log('사용자:', user);
