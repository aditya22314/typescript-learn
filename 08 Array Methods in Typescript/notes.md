# Array Methods in TypeScript

TypeScript provides robust type safety and automatic type inference when using standard JavaScript array methods (like `.map()`, `.filter()`, and `.reduce()`).

---

## 1. Type Inference in Array Methods

When working with typed arrays in TypeScript, the type checker automatically propagates types through array methods. You rarely need to write explicit type annotations for callback parameters or the resulting arrays.

### Example: `.map()`
The `.map()` method transforms an array of type `T[]` into an array of type `U[]` based on the return type of the callback function.

```typescript
let a: number[] = [2, 5, 6];

// TypeScript automatically infers:
// - 'el' is of type 'number' (matching the elements of 'a')
// - 'mapped' is of type 'string[]' (because 'el.toString()' returns a string)
let mapped = a.map((el) => el.toString()); 

console.log(mapped); // Output: ["2", "5", "6"]
```

---

## 2. Common Array Methods and Type Inference

Here is how type inference works across other common array methods:

### A. `.filter()`
The `.filter()` method returns a new array containing elements that match a predicate. The returned array maintains the same type `T[]` as the source array.

```typescript
let numbers: number[] = [1, 2, 3, 4];

// 'evenNumbers' is inferred as 'number[]'
let evenNumbers = numbers.filter((num) => num % 2 === 0);
```

### B. `.reduce()`
The `.reduce()` method reduces an array to a single value. The type of the accumulator (and the final result) is inferred from the **initial value** argument passed to `.reduce()`.

```typescript
let numbers: number[] = [1, 2, 3];

// The initial value is 0 (a number), so 'sum' is inferred as 'number'
let sum = numbers.reduce((acc, curr) => acc + curr, 0);

// If the initial value is a string, the result is inferred as 'string'
let combinedString = numbers.reduce((acc, curr) => acc + curr.toString(), "");
```

---

## 3. Troubleshooting: Why is my array method return type `any[]`?

If your array method returns `any[]`, check the following:
1.  **File extension:** Ensure your file is saved with a `.ts` extension (not `.js`), so TypeScript is actively checking it.
2.  **Source Array Type:** If the source array was initialized as an empty array without explicit types (e.g., `let a = [];`), TypeScript infers it as `any[]`. Consequently, any transformations on it will result in `any[]`.
    *   *Fix:* Annotate the source array, e.g., `let a: number[] = [];`.
