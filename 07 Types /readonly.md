# The `readonly` Modifier in TypeScript

TypeScript provides the `readonly` keyword to mark properties, arrays, and tuples as immutable (read-only). This helps prevent accidental modifications to data at compile-time.

---

## 1. Read-Only Properties in Objects/Interfaces

You can mark specific properties of an object or interface as `readonly`. Once initialized, these properties cannot be reassigned.

```typescript
interface User {
    readonly id: number;
    username: string;
}

let user: User = {
    id: 101,
    username: "alice"
};

user.username = "bob"; // Allowed

// Error: Cannot assign to 'id' because it is a read-only property.
// user.id = 102; 
```

---

## 2. Read-Only Arrays (`ReadonlyArray<T>` or `readonly T[]`)

To prevent arrays from being modified (preventing assignments to indices or using mutator methods like `.push()`, `.pop()`, `.reverse()`, etc.), you can prefix the array type with `readonly` or use `ReadonlyArray<T>`.

```typescript
// Both declarations are equivalent
let numbers: readonly number[] = [1, 2, 3];
let values: ReadonlyArray<string> = ["a", "b"];

// Error: Index signature in type 'readonly number[]' only permits reading.
// numbers[0] = 10; 

// Error: Property 'push' does not exist on type 'readonly number[]'.
// numbers.push(4); 
```

---

## 3. Read-Only Tuples

As discussed in tuples, using mutation methods on regular tuples is allowed by the compiler. Marking a tuple as `readonly` fully enforces immutability.

```typescript
let point: readonly [number, number] = [10, 20];

// Error: Property 'push' does not exist on type 'readonly [number, number]'.
// point.push(30); 
```

---

## 4. The `Readonly<T>` Utility Type

Instead of manually marking every property of a type or interface as `readonly`, you can wrap the type in the built-in `Readonly<T>` utility type. This constructs a type with all properties of `T` set to `readonly`.

```typescript
interface Car {
    make: string;
    model: string;
}

let myCar: Readonly<Car> = {
    make: "Tesla",
    model: "Model 3"
};

// Error: Cannot assign to 'make' because it is a read-only property.
// myCar.make = "Ford"; 
```
