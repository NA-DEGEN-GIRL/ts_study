/**
 * Chapter 12-02: 빌더 패턴 (Builder Pattern)
 *
 * 메서드 체이닝을 사용하여 복잡한 객체를 단계적으로 생성합니다.
 * 타입 안전성을 유지하면서 유연한 API를 제공합니다.
 */

console.log("=== 빌더 패턴 예제 ===\n");

// 기본 빌더 패턴
interface User {
  name: string;
  email: string;
  age?: number;
  address?: string;
  phone?: string;
}

class UserBuilder {
  private user: Partial<User> = {};

  setName(name: string): this {
    this.user.name = name;
    return this;
  }

  setEmail(email: string): this {
    this.user.email = email;
    return this;
  }

  setAge(age: number): this {
    this.user.age = age;
    return this;
  }

  setAddress(address: string): this {
    this.user.address = address;
    return this;
  }

  setPhone(phone: string): this {
    this.user.phone = phone;
    return this;
  }

  build(): User {
    if (!this.user.name || !this.user.email) {
      throw new Error("name과 email은 필수입니다");
    }
    return this.user as User;
  }
}

console.log("1. 기본 빌더 패턴:");
const user = new UserBuilder()
  .setName("김철수")
  .setEmail("kim@example.com")
  .setAge(30)
  .setAddress("서울시 강남구")
  .build();

console.log("  사용자:", user);
console.log();

// SQL 쿼리 빌더
class QueryBuilder {
  private query: {
    select?: string[];
    from?: string;
    where?: string[];
    orderBy?: string;
    limit?: number;
  } = {};

  select(...fields: string[]): this {
    this.query.select = fields;
    return this;
  }

  from(table: string): this {
    this.query.from = table;
    return this;
  }

  where(condition: string): this {
    if (!this.query.where) {
      this.query.where = [];
    }
    this.query.where.push(condition);
    return this;
  }

  orderBy(field: string, direction: "ASC" | "DESC" = "ASC"): this {
    this.query.orderBy = `${field} ${direction}`;
    return this;
  }

  limit(count: number): this {
    this.query.limit = count;
    return this;
  }

  build(): string {
    const parts: string[] = [];

    if (this.query.select) {
      parts.push(`SELECT ${this.query.select.join(", ")}`);
    } else {
      parts.push("SELECT *");
    }

    if (this.query.from) {
      parts.push(`FROM ${this.query.from}`);
    }

    if (this.query.where && this.query.where.length > 0) {
      parts.push(`WHERE ${this.query.where.join(" AND ")}`);
    }

    if (this.query.orderBy) {
      parts.push(`ORDER BY ${this.query.orderBy}`);
    }

    if (this.query.limit) {
      parts.push(`LIMIT ${this.query.limit}`);
    }

    return parts.join(" ");
  }
}

console.log("2. SQL 쿼리 빌더:");
const query = new QueryBuilder()
  .select("id", "name", "email")
  .from("users")
  .where("age > 18")
  .where("status = 'active'")
  .orderBy("created_at", "DESC")
  .limit(10)
  .build();

console.log("  쿼리:", query);
console.log();

// HTML 빌더
class HtmlBuilder {
  private elements: string[] = [];

  div(content: string): this {
    this.elements.push(`<div>${content}</div>`);
    return this;
  }

  p(content: string): this {
    this.elements.push(`<p>${content}</p>`);
    return this;
  }

  h1(content: string): this {
    this.elements.push(`<h1>${content}</h1>`);
    return this;
  }

  a(href: string, text: string): this {
    this.elements.push(`<a href="${href}">${text}</a>`);
    return this;
  }

  custom(tag: string, content: string): this {
    this.elements.push(`<${tag}>${content}</${tag}>`);
    return this;
  }

  build(): string {
    return this.elements.join("\n");
  }
}

console.log("3. HTML 빌더:");
const html = new HtmlBuilder()
  .h1("환영합니다")
  .p("TypeScript 빌더 패턴 예제입니다.")
  .div("컨텐츠 영역")
  .a("https://example.com", "링크 클릭")
  .build();

console.log("  HTML:", html);
console.log();

// 설정 빌더
interface ServerConfig {
  host: string;
  port: number;
  ssl: boolean;
  timeout: number;
  maxConnections: number;
  database?: {
    host: string;
    port: number;
    name: string;
  };
}

class ConfigBuilder {
  private config: Partial<ServerConfig> = {
    host: "localhost",
    port: 3000,
    ssl: false,
    timeout: 5000,
    maxConnections: 100
  };

  setHost(host: string): this {
    this.config.host = host;
    return this;
  }

  setPort(port: number): this {
    this.config.port = port;
    return this;
  }

  enableSSL(): this {
    this.config.ssl = true;
    return this;
  }

  setTimeout(ms: number): this {
    this.config.timeout = ms;
    return this;
  }

  setMaxConnections(count: number): this {
    this.config.maxConnections = count;
    return this;
  }

  setDatabase(host: string, port: number, name: string): this {
    this.config.database = { host, port, name };
    return this;
  }

  build(): ServerConfig {
    return this.config as ServerConfig;
  }
}

console.log("4. 설정 빌더:");
const config = new ConfigBuilder()
  .setHost("example.com")
  .setPort(8080)
  .enableSSL()
  .setTimeout(10000)
  .setDatabase("db.example.com", 5432, "myapp")
  .build();

console.log("  설정:", config);
console.log();

// 이메일 빌더
interface Email {
  from: string;
  to: string[];
  cc?: string[];
  bcc?: string[];
  subject: string;
  body: string;
  attachments?: string[];
}

class EmailBuilder {
  private email: Partial<Email> = {
    to: [],
    cc: [],
    bcc: [],
    attachments: []
  };

  from(address: string): this {
    this.email.from = address;
    return this;
  }

  to(...addresses: string[]): this {
    this.email.to!.push(...addresses);
    return this;
  }

  cc(...addresses: string[]): this {
    this.email.cc!.push(...addresses);
    return this;
  }

  bcc(...addresses: string[]): this {
    this.email.bcc!.push(...addresses);
    return this;
  }

  subject(subject: string): this {
    this.email.subject = subject;
    return this;
  }

  body(body: string): this {
    this.email.body = body;
    return this;
  }

  attach(...files: string[]): this {
    this.email.attachments!.push(...files);
    return this;
  }

  build(): Email {
    if (!this.email.from || !this.email.subject || !this.email.body) {
      throw new Error("from, subject, body는 필수입니다");
    }
    if (this.email.to!.length === 0) {
      throw new Error("최소 한 명의 수신자가 필요합니다");
    }
    return this.email as Email;
  }
}

console.log("5. 이메일 빌더:");
const email = new EmailBuilder()
  .from("sender@example.com")
  .to("user1@example.com", "user2@example.com")
  .cc("admin@example.com")
  .subject("중요한 알림")
  .body("안녕하세요, TypeScript 빌더 패턴 예제입니다.")
  .attach("document.pdf", "image.png")
  .build();

console.log("  이메일:", email);
console.log();

// HTTP 요청 빌더
interface HttpRequest {
  method: "GET" | "POST" | "PUT" | "DELETE";
  url: string;
  headers: Record<string, string>;
  body?: any;
  timeout: number;
}

class RequestBuilder {
  private request: Partial<HttpRequest> = {
    headers: {},
    timeout: 5000
  };

  get(url: string): this {
    this.request.method = "GET";
    this.request.url = url;
    return this;
  }

  post(url: string): this {
    this.request.method = "POST";
    this.request.url = url;
    return this;
  }

  header(key: string, value: string): this {
    this.request.headers![key] = value;
    return this;
  }

  auth(token: string): this {
    this.request.headers!["Authorization"] = `Bearer ${token}`;
    return this;
  }

  json(data: any): this {
    this.request.body = data;
    this.request.headers!["Content-Type"] = "application/json";
    return this;
  }

  timeout(ms: number): this {
    this.request.timeout = ms;
    return this;
  }

  build(): HttpRequest {
    if (!this.request.method || !this.request.url) {
      throw new Error("method와 url은 필수입니다");
    }
    return this.request as HttpRequest;
  }
}

console.log("6. HTTP 요청 빌더:");
const request = new RequestBuilder()
  .post("https://api.example.com/users")
  .auth("abc123token")
  .header("Accept", "application/json")
  .json({ name: "이영희", email: "lee@example.com" })
  .timeout(10000)
  .build();

console.log("  요청:", request);
console.log();

// 유창한 검증 빌더
class ValidationBuilder<T> {
  private rules: Array<(value: T) => boolean | string> = [];

  required(): this {
    this.rules.push((value) => {
      return value !== null && value !== undefined || "값이 필요합니다";
    });
    return this;
  }

  min(minValue: number): this {
    this.rules.push((value) => {
      return (value as any) >= minValue || `최소값은 ${minValue}입니다`;
    });
    return this;
  }

  max(maxValue: number): this {
    this.rules.push((value) => {
      return (value as any) <= maxValue || `최대값은 ${maxValue}입니다`;
    });
    return this;
  }

  validate(value: T): { valid: boolean; errors: string[] } {
    const errors: string[] = [];

    for (const rule of this.rules) {
      const result = rule(value);
      if (result !== true) {
        errors.push(result as string);
      }
    }

    return {
      valid: errors.length === 0,
      errors
    };
  }
}

console.log("7. 검증 빌더:");
const ageValidator = new ValidationBuilder<number>()
  .required()
  .min(18)
  .max(100);

console.log("  나이 25 검증:", ageValidator.validate(25));
console.log("  나이 15 검증:", ageValidator.validate(15));
console.log();

console.log("모든 빌더 패턴 예제 완료!");
