/**
 * Chapter 08-03: 템플릿 리터럴 타입 (Template Literal Types)
 *
 * 문자열 리터럴 타입을 조합하여 새로운 문자열 타입을 생성합니다.
 * 타입 안전한 문자열 기반 API를 만들 수 있습니다.
 */

console.log("=== 템플릿 리터럴 타입 예제 ===\n");

// 기본 템플릿 리터럴 타입
type Greeting = `Hello ${string}`;

function greet(message: Greeting): void {
  console.log("  ", message);
}

console.log("1. 기본 템플릿 리터럴:");
greet("Hello World");
greet("Hello TypeScript");
// greet("Hi there"); // 오류: "Hello"로 시작해야 함
console.log();

// 이벤트 이름 생성
type EventName = "click" | "input" | "submit";
type OnEvent = `on${Capitalize<EventName>}`;
// "onClick" | "onInput" | "onSubmit"

const eventHandlers: Record<OnEvent, () => void> = {
  onClick: () => console.log("  클릭 이벤트"),
  onInput: () => console.log("  입력 이벤트"),
  onSubmit: () => console.log("  제출 이벤트")
};

console.log("2. 이벤트 핸들러 이름:");
eventHandlers.onClick();
eventHandlers.onInput();
eventHandlers.onSubmit();
console.log();

// CSS 속성 타입
type CSSProperty = "color" | "background" | "border";
type CSSValue = string;
type CSSDeclaration = `${CSSProperty}: ${CSSValue}`;

function applyStyle(declaration: CSSDeclaration): void {
  console.log(`  스타일 적용: ${declaration}`);
}

console.log("3. CSS 스타일 선언:");
applyStyle("color: red");
applyStyle("background: blue");
applyStyle("border: 1px solid black");
console.log();

// HTTP 메서드와 경로 조합
type Method = "GET" | "POST" | "PUT" | "DELETE";
type Path = "/users" | "/posts" | "/comments";
type Endpoint = `${Method} ${Path}`;

function handleRequest(endpoint: Endpoint): void {
  console.log(`  요청 처리: ${endpoint}`);
}

console.log("4. HTTP 엔드포인트:");
handleRequest("GET /users");
handleRequest("POST /posts");
handleRequest("DELETE /comments");
console.log();

// 타입 안전한 쿼리 빌더
type Operator = "equals" | "contains" | "startsWith";
type Field = "name" | "email" | "age";
type QueryKey = `${Field}_${Operator}`;

type Query = {
  [K in QueryKey]?: string | number;
};

function buildQuery(query: Query): string {
  const conditions = Object.entries(query)
    .map(([key, value]) => `${key}=${value}`)
    .join(", ");
  return `Query: ${conditions}`;
}

console.log("5. 타입 안전한 쿼리:");
const query: Query = {
  name_contains: "김",
  age_equals: 30,
  email_startsWith: "admin"
};
console.log("  ", buildQuery(query));
console.log();

// 색상 코드 생성
type RGB = 0 | 1 | 2 | 3 | 4 | 5;
type ColorChannel = "r" | "g" | "b";
type ColorKey = `${ColorChannel}${RGB}`;

type Color = {
  [K in ColorKey]?: number;
};

console.log("6. 색상 채널 키:");
const color: Color = {
  r0: 255,
  g1: 128,
  b2: 64
};
console.log("  색상:", color);
console.log();

// 실용적인 예제: 다국어 키
type Language = "ko" | "en" | "ja";
type MessageKey = "welcome" | "goodbye" | "thankyou";
type TranslationKey = `${MessageKey}_${Language}`;

type Translations = {
  [K in TranslationKey]: string;
};

const translations: Translations = {
  welcome_ko: "환영합니다",
  welcome_en: "Welcome",
  welcome_ja: "ようこそ",
  goodbye_ko: "안녕히 가세요",
  goodbye_en: "Goodbye",
  goodbye_ja: "さようなら",
  thankyou_ko: "감사합니다",
  thankyou_en: "Thank you",
  thankyou_ja: "ありがとう"
};

function translate(key: MessageKey, lang: Language): string {
  const translationKey = `${key}_${lang}` as TranslationKey;
  return translations[translationKey];
}

console.log("7. 다국어 번역:");
console.log("  한국어:", translate("welcome", "ko"));
console.log("  영어:", translate("goodbye", "en"));
console.log("  일본어:", translate("thankyou", "ja"));
console.log();

// 버전 문자열 타입
type Major = 1 | 2 | 3;
type Minor = 0 | 1 | 2;
type Patch = 0 | 1 | 2 | 3 | 4;
type Version = `${Major}.${Minor}.${Patch}`;

function checkVersion(version: Version): void {
  console.log(`  버전 확인: v${version}`);
}

console.log("8. 버전 문자열:");
checkVersion("1.0.0");
checkVersion("2.1.3");
checkVersion("3.2.4");
