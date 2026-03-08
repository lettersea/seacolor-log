# 工程化改造计划：支持 ESM + CJS 双格式构建

## 背景与目标

当前项目 `seacolor-log` 是纯 ESM 格式（`"type": "module"`），需要通过工程化改造支持：
1. 同时输出 ESM 和 CJS 两种格式
2. 提供 TypeScript 类型声明（`.d.ts`）
3. 支持 `import` 和 `require` 两种引入方式
4. 保持对现有 ESM 用户的向后兼容

## 技术选型

使用 **TypeScript Compiler (tsc)** 作为构建工具：
- 可直接从 JS 文件生成 `.d.ts` 类型声明
- 同时支持编译为 ESM 和 CJS
- 无需额外打包工具，适合简单库

## 文件结构变更

### 当前结构
```
seacolor-log/
├── package.json
├── main.js
├── core/
│   ├── basic-styles.js
│   └── utils.js
└── test/
    └── basic-styles.test.js
```

### 新结构
```
seacolor-log/
├── package.json              # 更新 exports 映射
├── tsconfig.base.json        # TypeScript 基础配置
├── tsconfig.esm.json         # ESM 构建配置
├── tsconfig.cjs.json         # CJS 构建配置
├── src/                      # 源码目录（原文件移入）
│   ├── index.js              # main.js 重命名
│   ├── index.d.ts            # 手动类型声明
│   └── core/
│       ├── basic-styles.js
│       └── utils.js
├── dist/                     # 构建输出（gitignore）
│   ├── esm/                  # ESM 格式
│   ├── cjs/                  # CJS 格式
│   └── types/                # 类型声明
└── test/
    └── basic-styles.test.js  # 更新导入路径
```

## package.json 关键变更

```json
{
  "name": "seacolor-log",
  "version": "1.0.1",
  "description": "a light style library for terminal input in node by ANSI escape code",
  "main": "./dist/cjs/index.js",
  "module": "./dist/esm/index.js",
  "types": "./dist/types/index.d.ts",
  "exports": {
    ".": {
      "import": {
        "types": "./dist/esm/index.d.ts",
        "default": "./dist/esm/index.js"
      },
      "require": {
        "types": "./dist/cjs/index.d.ts",
        "default": "./dist/cjs/index.js"
      }
    }
  },
  "files": [
    "dist/**/*",
    "package.json",
    "README.md"
  ],
  "scripts": {
    "build": "npm run clean && npm run build:esm && npm run build:cjs && npm run build:types",
    "build:esm": "tsc -p tsconfig.esm.json",
    "build:cjs": "tsc -p tsconfig.cjs.json",
    "build:types": "tsc -p tsconfig.types.json",
    "clean": "rm -rf dist",
    "prepublishOnly": "npm run build && npm test",
    "test": "NODE_OPTIONS=--experimental-vm-modules jest"
  },
  "devDependencies": {
    "@types/node": "^20.0.0",
    "jest": "^30.2.0",
    "typescript": "^5.3.0"
  }
}
```

## TypeScript 配置

### tsconfig.base.json
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["ES2020"],
    "moduleResolution": "node",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true,
    "outDir": "./dist",
    "rootDir": "./src",
    "allowJs": true,
    "checkJs": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist", "test"]
}
```

### tsconfig.esm.json
```json
{
  "extends": "./tsconfig.base.json",
  "compilerOptions": {
    "module": "ES2020",
    "outDir": "./dist/esm",
    "declarationDir": "./dist/esm"
  }
}
```

### tsconfig.cjs.json
```json
{
  "extends": "./tsconfig.base.json",
  "compilerOptions": {
    "module": "CommonJS",
    "outDir": "./dist/cjs",
    "declarationDir": "./dist/cjs"
  }
}
```

### tsconfig.types.json
```json
{
  "extends": "./tsconfig.base.json",
  "compilerOptions": {
    "emitDeclarationOnly": true,
    "declarationDir": "./dist/types"
  }
}
```

## 类型声明文件 (src/index.d.ts)

```typescript
export interface SeacolorProxy {
  (text: string): string;
  [style: string]: SeacolorProxy;
  enabled: boolean;
  styles: Set<string>;
}

declare const seacolor: SeacolorProxy;
export default seacolor;
```

## 关键文件修改清单

| 文件路径 | 操作 | 说明 |
|---------|------|------|
| `package.json` | 修改 | 添加 exports 映射、更新 scripts、添加 devDependencies |
| `main.js` | 移动/重命名 | 移至 `src/index.js` |
| `core/basic-styles.js` | 移动 | 移至 `src/core/basic-styles.js` |
| `core/utils.js` | 移动 | 移至 `src/core/utils.js` |
| `test/basic-styles.test.js` | 修改 | 更新导入路径为 `../src/index.js` |
| `tsconfig.base.json` | 新增 | TypeScript 基础配置 |
| `tsconfig.esm.json` | 新增 | ESM 构建配置 |
| `tsconfig.cjs.json` | 新增 | CJS 构建配置 |
| `tsconfig.types.json` | 新增 | 类型声明构建配置 |
| `src/index.d.ts` | 新增 | 手动类型声明文件 |
| `.gitignore` | 修改 | 添加 `dist/` 目录 |

## 构建与验证

### 构建命令
```bash
npm run build
```

### 验证步骤
1. 运行构建：`npm run build`
2. 检查输出目录结构：`ls -la dist/`
3. 运行测试：`npm test`
4. 验证 ESM 导入：`node --input-type=module -e "import s from './dist/esm/index.js'; console.log(s.red('test'))"`
5. 验证 CJS 导入：`node -e "const s = require('./dist/cjs/index.js'); console.log(s.default.red('test'))"`

### npm 发布
- `npm run prepublishOnly` 会自动执行构建和测试
- 发布时仅包含 `dist/`、`package.json`、`README.md`
