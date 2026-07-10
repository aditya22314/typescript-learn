# Type Aliases in TypeScript

A **Type Alias** allows you to create a custom name for any shape or type. It is declared using the `type` keyword. Type aliases make code more readable, reusable, and maintainable by avoiding repetitive type definitions.

---

## 1. Basic Syntax

```typescript
type AliasName = TypeDefinition;
```

---

## 2. Common Use Cases

### A. Primitive Type Aliases
You can create aliases for basic primitives to give them more semantic meaning in your code.
```typescript
type UserID = string;
type Age = number;

let userId: UserID = "usr_99812";
```

### B. Union Type Aliases
Type aliases are extremely useful for grouping union types so you don't have to repeat them in multiple parameter signatures.
```typescript
type ID = string | number;
type Status = "pending" | "approved" | "rejected";

function updateStatus(id: ID, status: Status) {
    // ...
}
```

### C. Object Type Aliases
You can define the shape of objects.
```typescript
type Point = {
    x: number;
    y: number;
};

const coordinate: Point = { x: 10, y: 20 };
```

### D. Function Type Aliases
You can define signatures for functions.
```typescript
type GreetFunction = (name: string) => string;

const sayHello: GreetFunction = (name) => `Hello, ${name}!`;
```

---

## 3. Extending Type Aliases (Intersections)

While you cannot redeclare a type alias to add new fields, you can extend a type alias by creating an **Intersection Type** using the `&` operator.

```typescript
type Person = {
    name: string;
};

// Extending Person using intersection (&)
type Employee = Person & {
    employeeId: number;
};

const newEmployee: Employee = {
    name: "Alice",
    employeeId: 4501
};
```

---

## 4. Type Aliases vs. Interfaces

Both `type` and `interface` can define object shapes, but they have key differences:

| Feature | Type Alias (`type`) | Interface (`interface`) |
| :--- | :--- | :--- |
| **Scope** | Can represent any type (primitives, unions, tuples, objects, functions). | Limited to describing object structures and function signatures. |
| **Extensibility** | Extended via Intersection (`&`). | Extended via Inheritance (`extends`). |
| **Declaration Merging** | Cannot be redeclared. Re-declaring the same type name will throw an error. | Can be declared multiple times; TypeScript will merge them automatically. |

### Example of Declaration Merging (Interfaces only):
```typescript
interface Window {
    title: string;
}
interface Window {
    ts: number;
}
// Merged into: { title: string; ts: number; }
```