# Tuples in TypeScript

A **Tuple** is a special type of array in TypeScript with a fixed number of elements, where the type of each element at a specific index is predefined.

---

## 1. Declaring a Tuple

Unlike a regular array where all elements share the same type or union of types, a tuple allows you to specify the exact type for each index position.

```typescript
// A tuple containing exactly a number (id) and a string (role name)
let userRole: [number, string] = [1, "admin"];

// Accessing elements has exact type safety:
let id = userRole[0];    // typed as number
let role = userRole[1];  // typed as string
```

---

## 2. Tuples vs. Regular Arrays

| Feature | Regular Array (`(string \| number)[]`) | Tuple (`[string, number]`) |
| :--- | :--- | :--- |
| **Length** | Flexible (can grow/shrink) | Fixed |
| **Order** | Elements of any type in any position | Strict position-based typing |
| **Inference** | Inferred when initialized with mixed elements | Must be explicitly declared |

```typescript
// Regular Array: Any order, any length
let arr: (string | number)[] = ["admin", 1, 2, "editor"];

// Tuple: Exact order, exact length
let tuple: [string, number] = ["admin", 1]; 
```

---

## 3. The `push`/`pop` Caveat (Type System Limitation)

TypeScript's type system does not prevent you from using array mutation methods like `.push()`, `.pop()`, `.shift()`, or `.unshift()` on tuples at runtime. This is a known loophole/limitation in TypeScript.

```typescript
let person: [string, number] = ["Alice", 30];

// This is allowed by the compiler!
person.push("engineer"); 

// person is now ["Alice", 30, "engineer"] at runtime.
console.log(person); 

// However, TypeScript still prevents you from accessing it by index:
// Error: Tuple type '[string, number]' of length '2' has no element at index '2'.
// console.log(person[2]); 
```

### Preventing Mutations with `readonly`
To completely secure a tuple against mutations (including `.push()`), you can declare it as `readonly`:

```typescript
let strictPerson: readonly [string, number] = ["Alice", 30];

// Error: Property 'push' does not exist on type 'readonly [string, number]'.
// strictPerson.push("engineer"); 
```
