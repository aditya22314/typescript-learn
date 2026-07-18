# Generics in TypeScript

**Generics** are a powerful tool in TypeScript that allow you to write reusable, flexible, and type-safe code. They enable you to define components (functions, classes, interfaces, or type aliases) that can work with a variety of types rather than a single static type, while still maintaining full type safety.

Think of generics as **types that accept parameters**, much like how functions accept arguments.

---

## 1. Why Use Generics?

Without generics, if you want a component to support multiple types, you might be tempted to use `any`:

```typescript
type DynamicType = any[];
let a: DynamicType = ["Hello", "World"]; // Works
a.push(123); // Also works! We lost type safety.
```

Using `any` removes compile-time type checking. Generics solve this by capturing the specific type provided by the caller or developer, allowing TypeScript to enforce type safety.

---

## 2. Basic Syntax and the Type Parameter

Generics are declared using angle brackets (`<T>`), where `T` is a placeholder for the type parameter (you can use any name, but `T` is the convention for "Type").

```typescript
type GenericType<T> = T;
```

---

## 3. Explaining the Examples in `app.ts`

The code in [app.ts](file:///Users/adityatejus/Documents/Learning%20Web/typescript-learn/19%20Generics/app.ts) demonstrates how generics work dynamically:

### A. Simple Type Identity
```typescript
// type DynamicType<Test> = Test
// const a: DynamicType<60> = 60
```
- Here, `DynamicType<Test>` is a generic type where whatever type is passed as `Test` is returned directly.
- Passing the numeric literal `60` as `Test` creates the literal type `60`.

### B. Generic Arrays
```typescript
type DynamicType<T> = T[];
```
- In this definition, `DynamicType` receives a type parameter `T` and constructs an array of that type (`T[]`).
- This acts as a dynamic type creator/utility.

### C. Instantiating the Generic
```typescript
// Creates type string[]
let a: DynamicType<string> = ["Hello", "World"];

// Creates type number[]
let b: DynamicType<number> = [1, 2, 3, 4];

// Creates type boolean[]
let c: DynamicType<boolean> = [true, false];
```
- `DynamicType<string>` resolves to `string[]`, preventing you from adding numbers or booleans to array `a`.
- `DynamicType<number>` resolves to `number[]`, and so on.

---

## 4. Other Common Generic Patterns

### A. Generic Functions
You can make functions generic to capture the type of the arguments passed to them.

```typescript
function identity<T>(arg: T): T {
    return arg;
}

let output1 = identity<string>("myString"); // Explicitly setting T as string
let output2 = identity(101); // Type inference automatically sets T to number
```

### B. Generic Interfaces
Interfaces can also be generic to define flexible object shapes.

```typescript
interface KeyValuePairs<K, V> {
    key: K;
    value: V;
}

let entry: KeyValuePairs<string, number> = {
    key: "Age",
    value: 30
};
```

### C. Generic Constraints
You can restrict the types that can be passed to a generic parameter by using the `extends` keyword.

```typescript
interface Lengthwise {
    length: number;
}

// T must have a length property (like string or Array)
function logLength<T extends Lengthwise>(arg: T): void {
    console.log(arg.length);
}

logLength("hello"); // Works (strings have length)
logLength([1, 2, 3]); // Works (arrays have length)
// logLength(10); // Error: number does not have a length property
```

#### Advanced Example: Keyof Constraints
You can constrain a generic parameter to only allow keys that exist on another object parameter using the `keyof` operator.

```typescript
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
    return obj[key];
}

const user = { name: "Aditya", age: 25 };

getProperty(user, "name"); // Valid (returns "Aditya")
getProperty(user, "age");  // Valid (returns 25)
// getProperty(user, "email"); // Error: "email" is not a key of user
```

---

## 5. Multiple Generic Parameters

Generics can take multiple type parameters, allowing you to define relationships between different types.

### A. Intersection with Multiple Parameters (`T & U`)
```typescript
type DynamicTypes<T, U> = T & U;
```

#### The `never` Gotcha with Primitive Types:
If you instantiate `DynamicTypes<string, number>`, the result resolves to `string & number`. 
Since it is logically impossible for a value to be both a primitive `string` and a primitive `number` simultaneously, TypeScript resolves this type to `never`. Therefore:

```typescript
// @ts-expect-error - Type '{ name: string; age: number; }' is not assignable to type 'never'.
const obj: DynamicTypes<string, number> = {
    name: "Aditya",
    age: 25
}
```

To resolve this, pass object shapes as parameters instead of primitives:
```typescript
const correctObj: DynamicTypes<{ name: string }, { age: number }> = {
    name: "Aditya",
    age: 25
}
```

---

### B. Union with Multiple Parameters (`T | U`)
```typescript
type DynamicUnionTypes<T, U> = T | U;
```

A union allows a variable to hold values that satisfy either type `T` OR type `U`.

#### 1. Union of Primitive Types
`DynamicUnionTypes<string, number>` resolves to the union type `string | number`.

Unlike the intersection (`string & number`) which resolves to `never` because a value cannot be both types simultaneously, a union type is completely valid because a value can be **either** a `string` **or** a `number`. Thus, it does not resolve to `never`.

```typescript
const unionPrimitive1: DynamicUnionTypes<string, number> = "Aditya"; // Valid (string)
const unionPrimitive2: DynamicUnionTypes<string, number> = 25;       // Valid (number)
```

#### 2. Union of Object Types
```typescript
const unionObj1: DynamicUnionTypes<{ name: string }, { age: number }> = {
    name: "Aditya"
} // Valid: satisfies { name: string }

const unionObj2: DynamicUnionTypes<{ name: string }, { age: number }> = {
    age: 25
} // Valid: satisfies { age: number }

const unionObj3: DynamicUnionTypes<{ name: string }, { age: number }> = {
    name: "Aditya",
    age: 25
} // Valid: satisfies both parts of the union
```

---

## 6. Generic Default Parameters

Just like function arguments in JavaScript, TypeScript generics can have default types. This makes the type parameters optional when instantiating the generic type.

```typescript
type DynamicType<T = string, U = number> = T | U;
```

### Usage Scenarios:

#### A. Falling Back to Both Defaults
If no type arguments are passed, both `T` and `U` fall back to their defaults (`string` and `number`), resolving to `string | number`.
```typescript
const valDefault: DynamicType = "Aditya"; // Valid
```

#### B. Overriding Only the First Default
If only one type argument is passed, it overrides `T`, while `U` still falls back to its default (`number`). This resolves to `boolean | number`.
```typescript
const valPartial: DynamicType<boolean> = true; // Valid
```

#### C. Overriding Both Defaults
If both type arguments are passed, they override both defaults. This resolves to `boolean | string`.
```typescript
const valFull: DynamicType<boolean, string> = "Hello"; // Valid
```


