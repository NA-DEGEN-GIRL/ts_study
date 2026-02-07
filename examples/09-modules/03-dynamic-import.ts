/**
 * Chapter 09-03: 동적 Import (Dynamic Imports)
 *
 * import() 함수를 사용하여 런타임에 모듈을 동적으로 로드합니다.
 * 코드 분할과 지연 로딩에 유용합니다.
 */

console.log("=== 동적 Import 예제 ===\n");

// 기본 동적 import
async function loadModule() {
  console.log("1. 기본 동적 import:");
  console.log("  모듈 로딩 중...");

  const module = await import("./01-exports");

  console.log("  모듈 로딩 완료!");
  console.log("  API_URL:", module.API_URL);
  console.log("  API_VERSION:", module.API_VERSION);
  console.log();
}

// 조건부 모듈 로딩
async function conditionalImport(loadExports: boolean) {
  console.log("2. 조건부 모듈 로딩:");

  if (loadExports) {
    const { formatUser, User } = await import("./01-exports");

    const user: User = {
      id: 1,
      name: "박영희",
      email: "park@example.com"
    };

    console.log("  ", formatUser(user));
  } else {
    console.log("  모듈을 로드하지 않음");
  }
  console.log();
}

// 지연 로딩 클래스
async function lazyLoadClass() {
  console.log("3. 클래스 지연 로딩:");

  // 필요할 때만 클래스 로드
  const { UserManager } = await import("./01-exports");

  const manager = new UserManager();
  manager.addUser({ id: 1, name: "김철수", email: "kim@example.com" });
  manager.addUser({ id: 2, name: "이영수", email: "lee@example.com" });

  console.log("  총 사용자:", manager.getUserCount());
  console.log();
}

// Default export 동적 import
async function loadDefaultExport() {
  console.log("4. Default Export 동적 로딩:");

  const LoggerModule = await import("./01-exports");
  const Logger = LoggerModule.default;

  const logger = new Logger("[DYNAMIC]");
  logger.log("동적으로 로드된 로거");
  logger.error("동적 오류 메시지");
  console.log();
}

// 에러 처리
async function importWithErrorHandling() {
  console.log("5. 에러 처리:");

  try {
    const module = await import("./01-exports");
    console.log("  모듈 로딩 성공");
    console.log("  config.timeout:", module.config.timeout);
  } catch (error) {
    console.log("  모듈 로딩 실패:", error);
  }
  console.log();
}

// 병렬 동적 import
async function parallelImports() {
  console.log("6. 병렬 동적 Import:");

  const [exportsModule] = await Promise.all([
    import("./01-exports")
  ]);

  console.log("  모든 모듈 로딩 완료");
  console.log("  API_URL:", exportsModule.API_URL);
  console.log();
}

// 실용적인 예제: 플러그인 시스템
interface Plugin {
  name: string;
  execute: () => void;
}

async function loadPlugin(pluginName: string): Promise<Plugin | null> {
  try {
    // 실제로는 동적 경로를 사용할 수 있음
    const module = await import("./01-exports");

    return {
      name: pluginName,
      execute: () => {
        const logger = new module.default(`[${pluginName}]`);
        logger.log("플러그인 실행됨");
      }
    };
  } catch (error) {
    console.log(`  플러그인 '${pluginName}' 로드 실패`);
    return null;
  }
}

async function pluginSystem() {
  console.log("7. 플러그인 시스템:");

  const plugins = await Promise.all([
    loadPlugin("Logger"),
    loadPlugin("Validator")
  ]);

  plugins.forEach(plugin => {
    if (plugin) {
      console.log(`  플러그인 로드됨: ${plugin.name}`);
      plugin.execute();
    }
  });
  console.log();
}

// 코드 분할 예제
async function codeSplitting(feature: "user" | "product") {
  console.log("8. 코드 분할:");

  switch (feature) {
    case "user": {
      const { UserManager, formatUser } = await import("./01-exports");
      const manager = new UserManager();
      console.log("  사용자 기능 로드됨");
      break;
    }
    case "product": {
      const { calculateTotal } = await import("./01-exports");
      console.log("  상품 기능 로드됨");
      console.log("  총액 계산:", calculateTotal(1000, 5));
      break;
    }
  }
  console.log();
}

// 모든 예제 실행
(async () => {
  await loadModule();
  await conditionalImport(true);
  await lazyLoadClass();
  await loadDefaultExport();
  await importWithErrorHandling();
  await parallelImports();
  await pluginSystem();
  await codeSplitting("product");

  console.log("모든 동적 Import 예제 완료!");
})();
