# Literal Types and Template Literal Types

TypeScript allows you to use specific values as types. This is known as **Literal Types**. 

---

## 1. What are Literal Types?

A literal type restricts a variable to hold only a **specific value** (e.g., a specific string, number, or boolean), rather than any value of a general type (like `string` or `number`).

Typically, literal types are combined with **Union Types** to represent a finite set of allowed values.

### String Literal Types
```typescript
// Define a union of allowed string literal values
type availableFruit = "Apple" | "Orange" | "Mango" | "Grapes";

let fruits: availableFruit = "Apple"; // Valid
let myFruit: availableFruit = "Orange"; // Valid

// Error: Type '"Banana"' is not assignable to type 'availableFruit'.
// let badFruit: availableFruit = "Banana"; 
```

### Numeric & Boolean Literal Types
You can also use numbers and booleans as literal types:
```typescript
type DiceRoll = 1 | 2 | 3 | 4 | 5 | 6;
let roll: DiceRoll = 3; // Valid

type EnabledState = true;
// let state: EnabledState = false; // Error!
```

---

## 2. Template Literal Types

**Template Literal Types** build on string literal types. They allow you to construct new string types by combining literal types inside template strings.

TypeScript will expand union types inside template literals into all possible string combinations.

### Example: API Endpoints
```typescript
// Define a union of resource names
type Resources = "user" | "posts" | "comments";

// Construct endpoints starting with '/api/' followed by any resource
type endpoints = `/api/${Resources}`;

// 'endpoints' expands to: "/api/user" | "/api/posts" | "/api/comments"

let api: endpoints = "/api/user"; // Valid

// Error: Type '"/api/products"' is not assignable to type '"/api/user" | "/api/posts" | "/api/comments"'.
// let badApi: endpoints = "/api/products"; 
```
