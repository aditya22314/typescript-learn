# Type Assertions in TypeScript

Sometimes, you will have information about the type of a value that TypeScript cannot know. In these cases, you can use a **Type Assertion** to tell the compiler to treat a value as a specific type. 

> [!IMPORTANT]
> Type assertions are purely a **compile-time** feature. They do not perform any runtime checks, casting, or data coercion. If you assert a type incorrectly, it may lead to runtime crashes.

---

## 1. Syntax

There are two ways to write type assertions in TypeScript:

### A. The `as` Syntax (Recommended)
This is the most common syntax and is compatible with JSX/TSX.
```typescript
let someValue: unknown = "this is a string";
let strLength: number = (someValue as string).length;
```

### B. The Angle-Bracket Syntax
This syntax is equivalent, but cannot be used in JSX/TSX environments as it conflicts with HTML/XML tags.
```typescript
let someValue: unknown = "this is a string";
let strLength: number = (<string>someValue).length;
```

---

## 2. Example: Accessing Specific Methods on Union Arrays

If you have a mixed array like `let check = ["Akash", 20]`, TypeScript infers its type as `(string | number)[]`. When you access `check[0]`, TypeScript treats it as `string | number`, meaning you can only access methods common to both types.

By asserting that `check[0]` is a `string`, you unlock all string-specific methods and IDE autocomplete suggestions:

```typescript
let check = ["Akash", 20]; // type: (string | number)[]

// Asserting as string to access string methods
let nameLength = (check[0] as string).length; 
```

### Autocomplete with Type Assertion:
When using `(check[0] as string).`, the editor shows string-specific suggestions:

![Type Assertion Autocomplete](/Users/adityatejus/.gemini/antigravity-ide/brain/2ea9d92b-e216-4352-b714-95d5a1844335/media__1783680218865.png)

---

## 3. Rules of Assertions

TypeScript only allows type assertions that convert to a *more specific* or *less specific* version of a type. It prevents "impossible" assertions to guard against obvious mistakes.

```typescript
// Error: Conversion of type 'string' to type 'number' may be a mistake...
// let num = "123" as number; 
```

### Double Assertion (Escape Hatch)
If you absolutely must coerce a type that TypeScript flags as impossible, you must first assert it to `unknown` or `any`:
```typescript
let num = ("123" as unknown) as number; // Compiles, but dangerous!
```

---

## 4. Const Assertions (`as const`)

A **Const Assertion** tells TypeScript to infer the most specific literal types possible for expressions, rather than wider types like `string` or `number`. Additionally, it makes all properties of objects, arrays, and tuples `readonly`.

### Example:
```typescript
// Without 'as const', 'test' would be inferred as string[]
let test = ["str", "hi"] as const; 

// The inferred type of 'test' is now: readonly ["str", "hi"]

// Error: Property 'push' does not exist on type 'readonly ["str", "hi"]'.
// test.push("new"); 
```

### Key Effects of `as const`:
1.  **No Type Widening:** Literal types are not broadened (e.g. `"str"` stays `"str"` instead of widening to `string`).
2.  **Immutability:** Arrays become read-only tuples, and object properties become `readonly`.

