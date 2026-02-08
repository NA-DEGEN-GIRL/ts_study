/**
 * Chapter 02 - Basic Types
 * 02-arrays-tuples.ts - 배열과 튜플
 *
 * 이 파일에서 배울 내용:
 * - 배열 (Array) 타입 선언 방법 (number[], Array<number>)
 * - 튜플 (Tuple) 타입 - 고정된 길이와 각 위치별 타입을 가진 배열
 * - 읽기 전용 (Readonly) 배열 - 변경 불가능한 배열
 * - 배열 vs 튜플 사용 시점의 차이
 */

console.log("=== 배열과 튜플 ===\n");

// ============================================
// 1. 배열 타입 선언 방법 - 두 가지 문법 방식
// ============================================

console.log("--- 1. 배열 타입 선언 ---\n");

// 방법 1: 타입[] 문법 (더 간결하고 일반적)
let numbers: number[] = [1, 2, 3, 4, 5];
let fruits: string[] = ["사과", "바나나", "체리"];

// 방법 2: Array<타입> 제네릭 (Generic) 문법
let scores: Array<number> = [90, 85, 88, 92];
let names: Array<string> = ["김철수", "이영희", "박민수"];

console.log(`숫자 배열: [${numbers.join(", ")}]`);
console.log(`과일 배열: [${fruits.join(", ")}]`);
console.log(`점수 배열: [${scores.join(", ")}]`);
console.log(`이름 배열: [${names.join(", ")}]`);

// ============================================
// 2. 배열 메서드 활용
// ============================================

console.log("\n--- 2. 배열 메서드 ---\n");

let languages: string[] = ["JavaScript", "TypeScript", "Python"];

// 요소 추가
languages.push("Rust");
console.log(`push 후: [${languages.join(", ")}]`);

// 요소 제거
let removed = languages.pop();
console.log(`pop: "${removed}" 제거됨`);
console.log(`pop 후: [${languages.join(", ")}]`);

// 배열 변환
let uppercased = languages.map(lang => lang.toUpperCase());
console.log(`대문자 변환: [${uppercased.join(", ")}]`);

// 배열 필터링
let longNames = languages.filter(lang => lang.length > 6);
console.log(`7자 이상: [${longNames.join(", ")}]`);

// ============================================
// 3. 다차원 배열
// ============================================

console.log("\n--- 3. 다차원 배열 ---\n");

// 2차원 배열
let matrix: number[][] = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
];

console.log("3×3 행렬:");
matrix.forEach(row => {
  console.log(`  [${row.join(", ")}]`);
});

// ============================================
// 4. 튜플 (Tuple) - 고정된 길이와 타입을 가진 배열
// ============================================

console.log("\n--- 4. 튜플 타입 ---\n");

// 튜플 (Tuple): 각 위치마다 타입이 정해진 배열
// 왜 필요한가? 서로 다른 타입의 값을 순서대로 안전하게 저장
let person: [string, number, boolean] = ["홍길동", 30, true];

console.log(`이름: ${person[0]} (타입: string)`);
console.log(`나이: ${person[1]} (타입: number)`);
console.log(`활성화: ${person[2]} (타입: boolean)`);

// 구조 분해 할당
let [personName, age, isActive] = person;
console.log(`\n구조 분해: ${personName}, ${age}세, 활성화=${isActive}`);

// ============================================
// 5. 튜플의 실용적 활용
// ============================================

console.log("\n--- 5. 튜플 활용 예제 ---\n");

// 좌표 표현
type Point = [number, number];
let coordinate: Point = [10, 20];
console.log(`좌표: (${coordinate[0]}, ${coordinate[1]})`);

// RGB 색상
type RGB = [number, number, number];
let color: RGB = [255, 128, 0];
console.log(`RGB 색상: rgb(${color[0]}, ${color[1]}, ${color[2]})`);

// 키-값 쌍
type KeyValue = [string, number];
let entry: KeyValue = ["age", 25];
console.log(`엔트리: ${entry[0]} = ${entry[1]}`);

// ============================================
// 6. 읽기 전용 배열 (Readonly Array)
// ============================================

console.log("\n--- 6. 읽기 전용 배열 ---\n");

// ReadonlyArray - 변경 불가능한 배열
let readonlyNumbers: ReadonlyArray<number> = [1, 2, 3, 4, 5];
// readonlyNumbers.push(6); // ❌ Error: Property 'push' does not exist
// readonlyNumbers[0] = 10; // ❌ Error: Index signature is readonly

console.log(`읽기 전용 배열: [${readonlyNumbers.join(", ")}]`);

// readonly 수정자 사용
let immutableArray: readonly number[] = [10, 20, 30];
console.log(`불변 배열: [${immutableArray.join(", ")}]`);

// ============================================
// 7. 읽기 전용 튜플
// ============================================

console.log("\n--- 7. 읽기 전용 튜플 ---\n");

let readonlyTuple: readonly [string, number] = ["고정", 100];
// readonlyTuple[0] = "변경"; // ❌ Error: Cannot assign to '0'

console.log(`읽기 전용 튜플: [${readonlyTuple[0]}, ${readonlyTuple[1]}]`);

// ============================================
// 8. 배열 vs 튜플 사용 시점
// ============================================

console.log("\n--- 8. 배열 vs 튜플 ---\n");

console.log("✅ 배열 사용:");
console.log("  - 동일한 타입의 여러 요소");
console.log("  - 길이가 가변적");
console.log("  - 요소 추가/제거 필요");

console.log("\n✅ 튜플 사용:");
console.log("  - 고정된 개수의 요소");
console.log("  - 각 위치마다 타입이 다름");
console.log("  - 구조적 데이터 표현 (좌표, RGB 등)");
