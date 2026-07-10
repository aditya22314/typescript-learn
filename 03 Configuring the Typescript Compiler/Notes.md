# TypeScript Compiler Target Options

## 1. Default Output Target (Historic vs. Modern)

* **Historically (Older TS versions like v4.x and below):**
  * If you compile without a `tsconfig.json` or without specifying a `--target` flag, TypeScript defaults to **ES3** (or later **ES5**).
  * This downlevels modern constructs like `let` and `const` to `var`, and converts features like arrow functions and classes to ES3/ES5-compatible functions and prototypes.
* **Currently (Modern TS versions like v6.x):**
  * The default compiler target is modern (e.g., **ES2025**).
  * This retains modern JS features like `let` and `const` directly in the output without converting them to `var`.

---

## 2. How to Configure the Target

### Option A: Via Command Line Flags
You can specify the target on-the-fly when running the command:
```bash
# Force compilation down to ES5 (converts let/const to var)
tsc --target es5 app.ts

# Target modern ES6 / ES2015
tsc --target es2015 app.ts
```

### Option B: Via `tsconfig.json` (Recommended)
If you are using an older version of TypeScript (or want to standardize the target for your project), you can configure this in your project's `tsconfig.json` file:

```json
{
  "compilerOptions": {
    "target": "ES6" /* Specify ECMAScript target version: 'ES3', 'ES5', 'ES2015' (ES6), 'ES2020', etc. */
  }
}
```

#### Common Target Values:
* `"ES3"` / `"ES5"`: Converts code to older JavaScript (uses `var`).
* `"ES6"` / `"ES2015"`: Retains modern features like `let`, `const`, classes, and arrow functions.
* `"ESNext"`: Targets the latest ECMAScript features supported by your version of TypeScript.

---

## 3. Running `tsc` vs. `tsc [filename]` (Configuration Conflicts)

If you have a `tsconfig.json` in your workspace, you might notice different behaviors depending on how you run the compiler:

* **Running `tsc` (Project Compilation):**
  * Compiles the entire project based on the configuration and file inclusions defined in `tsconfig.json`.
* **Running `tsc app.ts` (Single File Compilation):**
  * Compiles only the specified file using default options, ignoring `tsconfig.json`.
  * **Important:** In modern TypeScript versions (v5.6+), specifying files on the command line while a `tsconfig.json` is present will trigger a protective error (**TS5112**):
    ```
    error TS5112: tsconfig.json is present but will not be loaded if files are specified on commandline. Use '--ignoreConfig' to skip this error.
    ```
  * **Solution:** 
    * If you want to use the config, simply run `tsc` without any file arguments.
    * If you want to force compiling that single file while ignoring the configuration, add the `--ignoreConfig` flag:
      ```bash
      tsc app.ts --ignoreConfig
      ```
