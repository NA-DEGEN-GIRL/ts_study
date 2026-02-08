/**
 * Chapter 07-01: typeof 타입 가드
 *
 * 이 파일에서 배울 내용:
 * - 타입 가드 (Type Guard) - 조건문으로 타입을 좁히는 기법
 * - typeof 연산자 - "string", "number", "boolean" 등의 타입 확인
 * - 타입 좁히기 (Type Narrowing) - 유니온 (Union) 타입을 구체적 타입으로 좁힘
 * - Array.isArray() - 배열 여부 확인
 * 왜 필요한가? 유니온 타입에서 각 타입의 메서드를 안전하게 사용하기 위해
 */

console.log("=== typeof 타입 가드 예제 ===\n");

// 기본 typeof 타입 가드
function processValue(value: string | number): string {
  if (typeof value === "string") {
    // 이 블록 안에서 value는 string 타입으로 좁혀집니다
    return value.toUpperCase();
  } else {
    // 이 블록 안에서 value는 number 타입으로 좁혀집니다
    return value.toFixed(2);
  }
}

console.log("1. 기본 typeof 타입 가드:");
console.log("  processValue('hello'):", processValue("hello"));
console.log("  processValue(42.12345):", processValue(42.12345));
console.log();

// 복잡한 유니온 타입 처리
function formatInput(input: string | number | boolean | null): string {
  if (typeof input === "string") {
    return `문자열: "${input}"`;
  } else if (typeof input === "number") {
    return `숫자: ${input}`;
  } else if (typeof input === "boolean") {
    return `불린: ${input ? "참" : "거짓"}`;
  } else {
    return "null 값";
  }
}

console.log("2. 복잡한 유니온 타입:");
console.log("  formatInput('TypeScript'):", formatInput("TypeScript"));
console.log("  formatInput(100):", formatInput(100));
console.log("  formatInput(true):", formatInput(true));
console.log("  formatInput(null):", formatInput(null));
console.log();

// 배열과 객체 타입 가드
function describe(value: string | number[] | object): string {
  if (typeof value === "string") {
    return `문자열 길이: ${value.length}`;
  } else if (Array.isArray(value)) {
    // typeof로는 배열을 구별할 수 없으므로 Array.isArray 사용
    return `배열 요소 개수: ${value.length}`;
  } else {
    return `객체 키 개수: ${Object.keys(value).length}`;
  }
}

console.log("3. 배열과 객체 타입 가드:");
console.log("  describe('Hello'):", describe("Hello"));
console.log("  describe([1, 2, 3]):", describe([1, 2, 3]));
console.log("  describe({ a: 1, b: 2 }):", describe({ a: 1, b: 2 }));
console.log();

// 실용적인 예제: 설정값 처리
type ConfigValue = string | number | boolean | undefined;

interface Config {
  timeout: ConfigValue;
  retries: ConfigValue;
  debug: ConfigValue;
}

function getConfigValue(value: ConfigValue, defaultValue: string | number | boolean): string | number | boolean {
  if (typeof value === "undefined") {
    return defaultValue;
  }
  return value;
}

console.log("4. 설정값 처리 (undefined 체크):");
const config: Config = {
  timeout: 5000,
  retries: undefined,
  debug: true
};

console.log("  timeout:", getConfigValue(config.timeout, 3000));
console.log("  retries:", getConfigValue(config.retries, 3));
console.log("  debug:", getConfigValue(config.debug, false));
