# Array Typing in TypeScript

TypeScript allows you to specify the types of values that an array can contain. This ensures type safety when accessing or modifying array elements.

---

## 1. Syntax Options

There are two primary ways to declare array types in TypeScript:

### A. The Square Bracket Syntax (`type[]`)
This is the most common and preferred syntax. You write the element type followed by `[]`.

```typescript
let arr: number[] = [12, 13];
```

### B. The Generic Array Syntax (`Array<type>`)
This syntax uses the global `Array` interface with a generic parameter. It is behaviorally identical to the square bracket syntax.

```typescript
let arr: Array<number> = [12, 13];
```

---

## 2. Dynamic Operations and Type Safety

Once an array is typed, TypeScript ensures that any elements added or modified conform to that type.

### Example:
```typescript
let arr: number[] = [12, 13];

// This is valid because 15 is a number
arr.push(15); 

// Error: Argument of type 'string' is not assignable to parameter of type 'number'.
// arr.push("hello"); 
```

---

## 3. Type Inference with Arrays

If you don't explicitly annotate the array type, TypeScript will attempt to infer it based on the initial elements.

```typescript
// TypeScript infers this as number[]
let numbers = [1, 2, 3]; 

// TypeScript infers this as (string | number)[] (Union Type)
let mixed = [1, "two", 3]; 

// WARNING: If you initialize an empty array without annotations, 
// TypeScript might infer it as any[], which disables type checks.
let emptyList = []; // type: any[]
emptyList.push(1);  // works
emptyList.push("a"); // works
```

---

## 4. Autocomplete with Mixed/Union Arrays

When you have an array containing multiple types (such as `(string | number)[]`), accessing any element returns a union type (`string | number`). 

Because TypeScript does not track the specific type at each index for basic arrays, it will only suggest **common methods** that exist on both types.

### Example:
```typescript
let b = ["1", 2]; // Inferred as (string | number)[]

// TypeScript only suggests methods common to both string and number:
// - toLocaleString()
// - toString()
// - valueOf()
b[0].toLocaleString(); 
```

### How to use type-specific methods:

If you want to use type-specific methods (like `toUpperCase()` on a string or `toFixed()` on a number), you have two options:

1.  **Type Narrowing (Conditional Checks):** Use type guards to check the type before using specific methods.
    ```typescript
    if (typeof b[0] === "string") {
        console.log(b[0].toUpperCase()); // Validated as string
    }
    ```

2.  **Use Tuples:** If you know the exact positions and types of the elements, declare the array as a **Tuple** instead of a regular array.
    ```typescript
    let b: [string, number] = ["1", 2];
    b[0].toUpperCase(); // Valid because b[0] is explicitly typed as string
    b[1].toFixed();     // Valid because b[1] is explicitly typed as number
    ```

