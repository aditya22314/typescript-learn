/**
 *  MODULE DETECTION IN TYPESCRIPT (`moduleDetection` Compiler Option)
 * 
 * In JavaScript and TypeScript, a file can either be a "Script" or a "Module".
 * 
 * - Script: Variables declared here are GLOBAL. (Causes "Cannot redeclare variable" errors across files).
 * - Module: Variables declared here are LOCAL to the file.
 * 
 * Historically, TypeScript considered a file a "Module" ONLY if it contained an `import` or `export` statement.
 * If it didn't, it was treated as a "Script", and its variables leaked into the global scope.
 * 
 * The `moduleDetection` option in `tsconfig.json` gives you control over how TypeScript decides this.
 * It has three possible values: `legacy`, `auto`, and `force`.
 */

// =========================================================
// 1. "legacy" (The Old Behavior)
// =========================================================
/**
 * How it works: A file is ONLY considered a module if it has at least one `import` or `export`.
 * 
 * Example Scenario (with `moduleDetection: "legacy"`):
 */

// If this file had NO imports or exports:
const myGlobalVar = "Hello World"; // ⚠️ This would be GLOBAL!
// If another file also had `const myGlobalVar = "Hello World";`, TypeScript would throw an error:
//  "Cannot redeclare block-scoped variable 'myGlobalVar'."

// Hacky fix used in legacy codebases to force the file to become a module:
export { }; // 👈 This dummy export makes the file a module, keeping variables local.


// =========================================================
// 2. "auto" (The Modern Default - TS 4.7+)
// =========================================================
/**
 * How it works: TypeScript is smarter about deciding if a file is a module.
 * 
 * A file is considered a module if ANY of the following are true:
 * 1. It has an `import` or `export` (same as legacy).
 * 2. You have `"type": "module"` set in your `package.json`.
 * 3. You are using certain JSX configurations (like `--jsx react-jsx`).
 * 
 * Why it's good: If you are building a modern Node app with `"type": "module"`,
 * you no longer need to write `export {}` at the top of empty/script files just
 * to stop variables from leaking globally!
 */


// =========================================================
// 3. "force" (Strict / Bundler Mode)
// =========================================================
/**
 * How it works: TypeScript treats EVERY single file as a module, no matter what.
 * 
 * Why use it?
 * If you are using a modern bundler (like Vite, Webpack, esbuild) or a framework (Next.js, Nuxt),
 * they already wrap every file in a module scope. Setting `moduleDetection: "force"` makes 
 * TypeScript's behavior match the behavior of your bundler perfectly.
 * 
 * With `"force"`, you will NEVER get accidental global variable conflicts between files,
 * even if they have no imports, exports, or `package.json` configurations.
 */

// Example: Under `moduleDetection: "force"`, this variable is automatically local to this file.
// No `export {}` needed!
const myLocalVar = "I am safe and local!";

// Note: If you actually WANT a global variable under "force", you have to explicitly declare it:
declare global {
    var myTrueGlobalVar: string;
}