# Useful tsconfig.json Compiler Options

This document covers some commonly used compiler options in TypeScript, explaining what they do and how to configure them.

---

## 1. `noEmitOnError`
By default, even if there are compilation or type errors in your TypeScript files, `tsc` will still generate (emit) the compiled JavaScript files. 

* **What it does:** When set to `true`, the compiler will **not** output any JavaScript files if there is even a single type or syntax error.
* **Why use it:** It ensures that only clean, error-free code gets built and deployed to production.
* **`tsconfig.json` configuration:**
  ```json
  {
    "compilerOptions": {
      "noEmitOnError": true
    }
  }
  ```
* **Command Line Flag:** 
  ```bash
  tsc --noEmitOnError app.ts
  ```

---

## 2. `pretty`
Controls the formatting and styling of compiler error messages in your terminal.

* **What it does:** When set to `true`, TypeScript uses colors, clean alignment, and context headers to make error messages and code frames highly readable.
* **Why use it:** Makes debugging in the terminal significantly faster and easier on the eyes. (Enabled by default in modern TS versions).
* **`tsconfig.json` configuration:**
  ```json
  {
    "compilerOptions": {
      "pretty": true
    }
  }
  ```
* **Command Line Flag:** 
  ```bash
  tsc --pretty app.ts
  ```

---

## 3. `removeComments`
Controls whether comments written in your TypeScript files are preserved in the output JavaScript.

* **What it does:** When set to `true`, it strips all comments (single-line `//` and multi-line `/* */`) from the generated JavaScript files.
* **Why use it:** Reduces the file size of your emitted JavaScript assets for production.
* **`tsconfig.json` configuration:**
  ```json
  {
    "compilerOptions": {
      "removeComments": true
    }
  }
  ```
* **Command Line Flag:** 
  ```bash
  tsc --removeComments app.ts
  ```

---

## 4. `outDir`
By default, `tsc` emits compiled JavaScript files in the same directory as the source TypeScript files.

* **What it does:** Specifies the output directory where all emitted JavaScript files (and optionally `.d.ts` declarations or source maps) should be redirected.
* **Why use it:** Keeps your source files cleanly separated from the built/compiled assets (e.g., separating `/src` from `/dist`).
* **`tsconfig.json` configuration:**
  ```json
  {
    "compilerOptions": {
      "outDir": "./dist" // Redirects emitted files to a folder named 'dist'
    }
  }
  ```
* **Command Line Flag:** 
  ```bash
  tsc --outDir ./dist app.ts
  ```

---

## 5. `strict`
Enables a broad range of type-checking behaviors that guarantee stronger type safety.

* **What it does:** When set to `true` (which is the default in modern TypeScript v6+ projects initialized via `tsc --init`), the compiler enforces strict null checks, prevents implicit `any` types, ensures variables are assigned before use, and more.
* **Why use it:** Turning this on catches a large class of common programming bugs at compile time.
* **Setting to `false`:** If you are migrating a legacy JS project or testing code compilation that has type/null errors, you can set it to `false` to disable these checks. For example, variables used before assignment will compile into `app.js` without emitting compilation errors.
* **`tsconfig.json` configuration:**
  ```json
  {
    "compilerOptions": {
      "strict": false // Disables strict type-checking checks
    }
  }
  ```
* **Command Line Flag:** 
  ```bash
  tsc --strict false app.ts
  ```

---

## 6. `strictNullChecks`
Controls how `null` and `undefined` are treated in your types.

* **What it does:** 
  * When `false` (default if `"strict": false`), `null` and `undefined` are effectively ignored by the type checker. You can assign them to variables of any type (e.g. assigning `null` to a `string`).
  * When `true` (automatically enabled if `"strict": true`), `null` and `undefined` have their own distinct types. Assigning them to other types or invoking methods on potentially `null`/`undefined` values triggers compilation errors.
* **Why use it:** Prevents the classic "cannot read property of undefined" runtime crashes by forcing you to explicitly handle cases where values might be missing.
* **`tsconfig.json` configuration:**
  ```json
  {
    "compilerOptions": {
      "strictNullChecks": true
    }
  }
  ```
* **Command Line Flag:** 
  ```bash
  tsc --strictNullChecks app.ts
  ```


