/**
 * Chapter 08-04: 재귀 타입 (Recursive Types)
 *
 * 자기 자신을 참조하는 타입을 정의하여 중첩된 구조를 표현합니다.
 * JSON, 트리, 중첩 객체 경로 등을 타입 안전하게 다룰 수 있습니다.
 */

console.log("=== 재귀 타입 예제 ===\n");

// JSON 타입 정의
type JSONValue =
  | string
  | number
  | boolean
  | null
  | JSONValue[]
  | { [key: string]: JSONValue };

const jsonData: JSONValue = {
  name: "TypeScript",
  version: 4.9,
  features: ["types", "interfaces", "generics"],
  config: {
    strict: true,
    target: "ES2020",
    options: {
      sourceMap: true
    }
  }
};

console.log("1. JSON 타입:");
console.log("  ", JSON.stringify(jsonData, null, 2));
console.log();

// 중첩 배열 평탄화
type NestedArray<T> = T | NestedArray<T>[];

function flattenArray<T>(arr: NestedArray<T>[]): T[] {
  const result: T[] = [];

  function flatten(item: NestedArray<T>): void {
    if (Array.isArray(item)) {
      item.forEach(flatten);
    } else {
      result.push(item);
    }
  }

  arr.forEach(flatten);
  return result;
}

console.log("2. 중첩 배열 평탄화:");
const nestedNumbers: NestedArray<number>[] = [1, [2, [3, 4]], [5, [6, [7, 8]]]];
console.log("  중첩 배열:", nestedNumbers);
console.log("  평탄화:", flattenArray(nestedNumbers));
console.log();

// Deep Partial 타입
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

interface Config {
  server: {
    host: string;
    port: number;
    ssl: {
      enabled: boolean;
      cert: string;
    };
  };
  database: {
    host: string;
    port: number;
  };
}

const partialConfig: DeepPartial<Config> = {
  server: {
    ssl: {
      enabled: true
      // cert는 선택적
    }
    // port는 선택적
  }
  // database는 선택적
};

console.log("3. Deep Partial:");
console.log("  부분 설정:", partialConfig);
console.log();

// 트리 구조
interface TreeNode<T> {
  value: T;
  children?: TreeNode<T>[];
}

const fileTree: TreeNode<string> = {
  value: "root",
  children: [
    {
      value: "src",
      children: [
        { value: "index.ts" },
        { value: "utils.ts" }
      ]
    },
    {
      value: "tests",
      children: [
        { value: "index.test.ts" }
      ]
    }
  ]
};

function printTree<T>(node: TreeNode<T>, indent: string = ""): void {
  console.log(`${indent}${node.value}`);
  if (node.children) {
    node.children.forEach(child => printTree(child, indent + "  "));
  }
}

console.log("4. 트리 구조:");
printTree(fileTree);
console.log();

// 중첩 객체 경로 타입
type Path<T> = T extends object
  ? {
      [K in keyof T]: K extends string
        ? T[K] extends object
          ? K | `${K}.${Path<T[K]>}`
          : K
        : never;
    }[keyof T]
  : never;

interface User {
  id: number;
  profile: {
    name: string;
    address: {
      city: string;
      country: string;
    };
  };
  settings: {
    theme: string;
  };
}

type UserPath = Path<User>;
// "id" | "profile" | "profile.name" | "profile.address" | "profile.address.city" | ...

function getNestedValue<T>(obj: T, path: Path<T>): any {
  const keys = (path as string).split(".");
  let result: any = obj;

  for (const key of keys) {
    result = result[key];
  }

  return result;
}

console.log("5. 중첩 객체 경로:");
const user: User = {
  id: 1,
  profile: {
    name: "김철수",
    address: {
      city: "서울",
      country: "대한민국"
    }
  },
  settings: {
    theme: "dark"
  }
};

console.log("  id:", getNestedValue(user, "id"));
console.log("  profile.name:", getNestedValue(user, "profile.name"));
console.log("  profile.address.city:", getNestedValue(user, "profile.address.city"));
console.log();

// 연결 리스트
interface LinkedListNode<T> {
  value: T;
  next?: LinkedListNode<T>;
}

function printList<T>(node: LinkedListNode<T> | undefined): void {
  const values: T[] = [];
  let current = node;

  while (current) {
    values.push(current.value);
    current = current.next;
  }

  console.log("  ", values.join(" -> "));
}

console.log("6. 연결 리스트:");
const list: LinkedListNode<number> = {
  value: 1,
  next: {
    value: 2,
    next: {
      value: 3,
      next: {
        value: 4
      }
    }
  }
};

printList(list);
