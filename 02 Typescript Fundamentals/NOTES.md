# Types

> [!NOTE]
> In the browser, we cannot directly execute a file with TypeScript syntax like `let str: number = 5` because browsers do not support or understand TypeScript syntax natively.
> However, running it with tools like Node.js (or modern TypeScript runners/transpilers in the terminal) works because TypeScript is compiled or stripped of its type annotations, leaving plain JavaScript to execute. Browsers require the TypeScript code to be compiled into plain JavaScript first before running it.

> [!TIP]
> If we assign a value with a wrong type (e.g., assigning a string to a variable typed as a number), TypeScript will flag a compilation error. This error shows up in the compiler's output/trace, complete with a unique TypeScript error code (e.g., `TS2322`). You can look up these error codes in the official TypeScript repository or error code databases online to understand exactly what went wrong and how to fix it.


# 📘 Compiling TypeScript to JavaScript

## 🚀 Installing TypeScript Compiler

TypeScript is available as an npm package.

Install it globally:

```bash
npm install -g typescript
```

Check installation:

```bash
tsc -v
```

`tsc` stands for **TypeScript Compiler**.

---

# 🔨 TypeScript TSC Commands

## Check Version

```bash
tsc -v
```

## Compile a File

```bash
tsc filepath.ts
```

Compiles the TypeScript file into JavaScript.

Output:

```bash
filepath.js
```

---

## Target JavaScript Version

### ES6+

Modern syntax is preserved:

```js
let age = 20;
const name = "Kaushik";
```

### Below ES6 (ES5, ES3)

Older syntax is generated:

```js
var age = 20;
var name = "Kaushik";
```

-> Older syntax has better compatibility with old browsers.

---

## Useful Commands

### Type Check Only

```bash
tsc --noEmit
```

-> Checks for errors.
-> No `.js` file is generated.

### Don't Generate JS if Errors Exist

```bash
tsc --noEmitOnError
```

-> If errors exist, no JavaScript file is created.

---

# ⚙️ tsconfig.json

Create a configuration file:

```bash
tsc --init
```

When a `tsconfig.json` exists:

-> TypeScript uses the settings inside it.
-> VS Code also uses those settings for the project.

Compile all TypeScript files:

```bash
tsc
```

Watch for file changes:

```bash
tsc --watch
```

or

```bash
tsc -w
```

---

# ❌ Declaration Error

When no `tsconfig.json` exists and files are not modules (no import/export), TypeScript treats all files as part of the same global scope.

Example:

file1.ts

```ts
let age = 20;
```

file2.ts

```ts
let age = 30;
```

Error:

```text
Cannot redeclare block-scoped variable 'age'
```

---

# ✅ How to Fix

## Method 1

Create a `tsconfig.json`.

This enables module-based configuration and proper file scoping.

---

## Method 2

Add:

```ts
export {};
```

This makes the file a module and creates its own scope.

---

# ⚔️ Compiler vs Transpiler

## Compiler

A compiler converts source code into another form.

Traditionally:

```text
High-Level Language
        ↓
Machine Code
```

Compilation is not a single process.

It contains multiple phases such as:

```text
Lexing
↓
Parsing
↓
Type Checking
↓
Transformations
↓
Output Generation
```

---

## Transpiler

A transpiler converts one high-level language into another high-level language.

Example:

```text
Modern JavaScript
        ↓
       Babel
        ↓
Older JavaScript
```

Example:

```js
const age = 20;
```

↓

```js
var age = 20;
```

---

## TSC: Compiler or Transpiler?

TypeScript's `tsc` is a **compiler**.

Fun Fact:

👉 Transpilation is just one phase of the TypeScript compilation process.

---

# 🔬 How TypeScript Compiles to JavaScript

Input:

```ts
const age: number = 20;
```

Compilation Flow:

```text
index.ts
   ↓
Lexing (Tokenizer)
   ↓
Parsing
   ↓
AST Creation
   ↓
Type Checking
   ↓
Transformations
   ↓
TypeScript → JavaScript
```

---

## 1️⃣ Lexing (Tokenizer)

Breaks source code into tokens.

Example:

```ts
const age: number = 20;
```

Tokens:

```text
const
age
:
number
=
20
;
```

---

## 2️⃣ Parsing

Provides structure to the tokens using an AST (Abstract Syntax Tree).

AST is a tree representation of code.

Example:

```ts
const age: number = 20;
```

AST:

```text
VariableDeclaration
├── Name: age
├── Type: number
└── Value: 20
```

### Tree Visualization

```text
const age: number = 20;
        ↓
       AST

 VariableDeclaration
      /      \
    age       20
```

---

## 3️⃣ Type Checking

Checks whether the types are valid.

Example:

```ts
let age: number = "hello";
```

Error:

```text
Type 'string' is not assignable to type 'number'
```

---

## 4️⃣ Transformations

Transforms TypeScript into JavaScript.

This is where the transpilation phase happens.

Example:

```ts
const age: number = 20;
```

Transforms to:

```js
const age = 20;
```

---

# 📝 Notes

✅ Browsers understand JavaScript, not TypeScript.

✅ TypeScript must be compiled before running in a browser.

✅ `tsc` is a compiler.

✅ Transpilation is one phase of compilation.

✅ Type annotations are removed during transformation.

### One-Line Summary

> TypeScript first checks your code for errors and then converts it into plain JavaScript.
