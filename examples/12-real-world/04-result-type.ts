/**
 * Chapter 12-04: Result/Either 타입 패턴
 *
 * 예외 대신 Result 타입을 사용하여 명시적인 에러 처리를 합니다.
 * 함수형 프로그래밍 스타일로 에러를 값으로 다룹니다.
 */

console.log("=== Result 타입 패턴 예제 ===\n");

// 기본 Result 타입 정의
type Result<T, E = Error> =
  | { ok: true; value: T }
  | { ok: false; error: E };

// Result 생성 헬퍼 함수
function Ok<T>(value: T): Result<T, never> {
  return { ok: true, value };
}

function Err<E>(error: E): Result<never, E> {
  return { ok: false, error };
}

// 기본 사용 예제
function divide(a: number, b: number): Result<number, string> {
  if (b === 0) {
    return Err("0으로 나눌 수 없습니다");
  }
  return Ok(a / b);
}

console.log("1. 기본 Result 타입:");
const result1 = divide(10, 2);
if (result1.ok) {
  console.log("  성공:", result1.value);
} else {
  console.log("  실패:", result1.error);
}

const result2 = divide(10, 0);
if (result2.ok) {
  console.log("  성공:", result2.value);
} else {
  console.log("  실패:", result2.error);
}
console.log();

// Result 유틸리티 함수들
class ResultUtils {
  static map<T, U, E>(result: Result<T, E>, fn: (value: T) => U): Result<U, E> {
    if (result.ok) {
      return Ok(fn(result.value));
    }
    return result;
  }

  static flatMap<T, U, E>(
    result: Result<T, E>,
    fn: (value: T) => Result<U, E>
  ): Result<U, E> {
    if (result.ok) {
      return fn(result.value);
    }
    return result;
  }

  static unwrap<T, E>(result: Result<T, E>): T {
    if (result.ok) {
      return result.value;
    }
    throw result.error;
  }

  static unwrapOr<T, E>(result: Result<T, E>, defaultValue: T): T {
    return result.ok ? result.value : defaultValue;
  }
}

console.log("2. Result 유틸리티:");
const num = divide(20, 4);
const doubled = ResultUtils.map(num, (n) => n * 2);
console.log("  doubled:", doubled);

const defaultValue = ResultUtils.unwrapOr(divide(10, 0), 0);
console.log("  기본값 사용:", defaultValue);
console.log();

// 체이닝 예제
function parseNumber(str: string): Result<number, string> {
  const num = Number(str);
  if (isNaN(num)) {
    return Err(`"${str}"는 숫자가 아닙니다`);
  }
  return Ok(num);
}

function isPositive(num: number): Result<number, string> {
  if (num <= 0) {
    return Err("양수가 아닙니다");
  }
  return Ok(num);
}

function sqrt(num: number): Result<number, string> {
  return Ok(Math.sqrt(num));
}

console.log("3. Result 체이닝:");
function processNumber(str: string): Result<number, string> {
  return ResultUtils.flatMap(
    parseNumber(str),
    (num) => ResultUtils.flatMap(
      isPositive(num),
      (positive) => sqrt(positive)
    )
  );
}

console.log("  processNumber('16'):", processNumber("16"));
console.log("  processNumber('-4'):", processNumber("-4"));
console.log("  processNumber('abc'):", processNumber("abc"));
console.log();

// 비동기 Result
type AsyncResult<T, E = Error> = Promise<Result<T, E>>;

async function fetchUser(id: number): AsyncResult<{ id: number; name: string }, string> {
  await new Promise((resolve) => setTimeout(resolve, 50));

  if (id <= 0) {
    return Err("유효하지 않은 ID입니다");
  }

  if (id === 404) {
    return Err("사용자를 찾을 수 없습니다");
  }

  return Ok({ id, name: `사용자 ${id}` });
}

async function getUserEmail(userId: number): AsyncResult<string, string> {
  await new Promise((resolve) => setTimeout(resolve, 50));
  return Ok(`user${userId}@example.com`);
}

console.log("4. 비동기 Result:");
(async () => {
  const userResult = await fetchUser(1);
  if (userResult.ok) {
    console.log("  사용자:", userResult.value);

    const emailResult = await getUserEmail(userResult.value.id);
    if (emailResult.ok) {
      console.log("  이메일:", emailResult.value);
    }
  }

  const notFoundResult = await fetchUser(404);
  if (!notFoundResult.ok) {
    console.log("  오류:", notFoundResult.error);
  }
  console.log();
})();

// 커스텀 에러 타입
type ValidationError = {
  type: "validation";
  field: string;
  message: string;
};

type NetworkError = {
  type: "network";
  statusCode: number;
  message: string;
};

type AppError = ValidationError | NetworkError;

function validateEmail(email: string): Result<string, ValidationError> {
  if (!email.includes("@")) {
    return Err({
      type: "validation",
      field: "email",
      message: "유효한 이메일 주소가 아닙니다"
    });
  }
  return Ok(email);
}

function validateAge(age: number): Result<number, ValidationError> {
  if (age < 0 || age > 150) {
    return Err({
      type: "validation",
      field: "age",
      message: "나이는 0에서 150 사이여야 합니다"
    });
  }
  return Ok(age);
}

setTimeout(() => {
  console.log("5. 커스텀 에러 타입:");

  const emailResult = validateEmail("test@example.com");
  console.log("  이메일 검증:", emailResult);

  const invalidEmail = validateEmail("invalid");
  console.log("  잘못된 이메일:", invalidEmail);

  const ageResult = validateAge(25);
  console.log("  나이 검증:", ageResult);

  const invalidAge = validateAge(200);
  console.log("  잘못된 나이:", invalidAge);
  console.log();
}, 150);

// 실용적인 예제: 폼 검증
interface UserForm {
  name: string;
  email: string;
  age: number;
}

type FormError = {
  field: keyof UserForm;
  message: string;
};

function validateName(name: string): Result<string, FormError> {
  if (name.trim().length === 0) {
    return Err({ field: "name", message: "이름을 입력해주세요" });
  }
  if (name.length < 2) {
    return Err({ field: "name", message: "이름은 2자 이상이어야 합니다" });
  }
  return Ok(name);
}

function validateUserEmail(email: string): Result<string, FormError> {
  if (!email.includes("@")) {
    return Err({ field: "email", message: "유효한 이메일을 입력해주세요" });
  }
  return Ok(email);
}

function validateUserAge(age: number): Result<number, FormError> {
  if (age < 18) {
    return Err({ field: "age", message: "18세 이상이어야 합니다" });
  }
  return Ok(age);
}

function validateForm(form: UserForm): Result<UserForm, FormError[]> {
  const errors: FormError[] = [];

  const nameResult = validateName(form.name);
  if (!nameResult.ok) {
    errors.push(nameResult.error);
  }

  const emailResult = validateUserEmail(form.email);
  if (!emailResult.ok) {
    errors.push(emailResult.error);
  }

  const ageResult = validateUserAge(form.age);
  if (!ageResult.ok) {
    errors.push(ageResult.error);
  }

  if (errors.length > 0) {
    return Err(errors);
  }

  return Ok(form);
}

setTimeout(() => {
  console.log("6. 폼 검증:");

  const validForm: UserForm = {
    name: "김철수",
    email: "kim@example.com",
    age: 25
  };
  console.log("  유효한 폼:", validateForm(validForm));

  const invalidForm: UserForm = {
    name: "A",
    email: "invalid",
    age: 15
  };
  const result = validateForm(invalidForm);
  if (!result.ok) {
    console.log("  검증 오류:");
    result.error.forEach((err) => {
      console.log(`    ${err.field}: ${err.message}`);
    });
  }
  console.log();
}, 200);

// Option 타입 (null 대신 사용)
type Option<T> = { some: true; value: T } | { some: false };

function Some<T>(value: T): Option<T> {
  return { some: true, value };
}

function None<T>(): Option<T> {
  return { some: false };
}

function findById<T extends { id: number }>(
  items: T[],
  id: number
): Option<T> {
  const item = items.find((i) => i.id === id);
  return item ? Some(item) : None();
}

setTimeout(() => {
  console.log("7. Option 타입:");

  const users = [
    { id: 1, name: "김철수" },
    { id: 2, name: "이영희" }
  ];

  const found = findById(users, 1);
  if (found.some) {
    console.log("  찾음:", found.value);
  } else {
    console.log("  찾지 못함");
  }

  const notFound = findById(users, 999);
  if (notFound.some) {
    console.log("  찾음:", notFound.value);
  } else {
    console.log("  찾지 못함");
  }

  console.log("\n모든 Result 타입 예제 완료!");
}, 250);
