/**
 * 챕터 9: 모듈 - 정답
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
// 해설: export 키워드를 선언 앞에 붙이거나, 별도로 export 문을 작성합니다

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

// 해설: 중괄호 안에 여러 항목을 나열하여 한 번에 export
export { MAX_RETRY, DEFAULT_HEADERS };

// 연습 2: 타입만 export/import
// 해설: type 키워드를 붙이면 타입만 export/import하여 번들 크기를 줄일 수 있습니다
export type UserId = string;
export type ProductId = number;

export interface User {
  id: UserId;
  name: string;
}

// 연습 3: export as (별칭으로 export)
// 해설: as 키워드로 다른 이름으로 export할 수 있습니다
function validateEmailInternal(email: string): boolean {
  return email.includes("@");
}

export { validateEmailInternal as validateEmail };

// 연습 4: namespace를 사용한 구조화
// 해설: namespace로 관련된 기능을 논리적으로 그룹화합니다
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
// 해설: declare global로 전역 타입을 확장할 수 있습니다
// 주의: 실제 프로젝트에서는 신중하게 사용해야 합니다
declare global {
  interface String {
    truncate(maxLength: number): string;
  }
}

// 해설: 프로토타입에 실제 구현을 추가합니다
String.prototype.truncate = function(this: string, maxLength: number): string {
  if (this.length <= maxLength) return this;
  return this.slice(0, maxLength) + "...";
};

// 연습 6: import 패턴 (개념적)
// 해설: TypeScript/ES6 모듈의 다양한 import 패턴들

/*
=== Import 패턴 정리 ===

1. 명명된 import
   import { API_URL, TIMEOUT } from './config';

2. 모든 export를 네임스페이스로 import
   import * as Config from './config';
   사용: Config.API_URL, Config.TIMEOUT

3. 타입만 import (TypeScript 전용)
   import type { User, UserId } from './types';
   런타임 코드 없이 타입만 가져옴

4. 값과 타입 함께 import
   import { type User, createUser } from './user';

5. 기본 export import
   import React from 'react';

6. 기본 + 명명된 export 함께 import
   import React, { useState, useEffect } from 'react';

7. 별칭 사용
   import { validateEmailInternal as checkEmail } from './utils';

8. 사이드 이펙트만 실행 (import만 하고 사용 안 함)
   import './styles.css';
   import './polyfills';

9. 동적 import (Promise 반환)
   const module = await import('./heavy-module');
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
