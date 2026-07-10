# Top Types and Bottom Types

In type theory and type systems (like TypeScript's), types can be organized into a hierarchy. At the very top and bottom of this hierarchy sit special types known as **Top Types** and **Bottom Types**.

---

## 1. Top Types (Universal Types)

A **Top Type** is a type that is a supertype of every other type in the type system. This means that **every possible value** in the language can be assigned to a variable of a top type.

In TypeScript, there are two top types: `any` and `unknown`.

### A. `any`
The `any` type acts as a escape hatch from the type checker. It represents any value and allows you to perform any operation on it without compile-time checks.

*   **Behavior:** You can assign anything to it, and you can assign it to anything. You can also access any properties or call any methods on it.
*   **Drawback:** It completely disables type safety, defeating the purpose of TypeScript.
*   **Example:**
    ```typescript
    let value: any = 10;
    value.foo(); // Compiles fine, but might crash at runtime!
    ```

### B. `unknown`
The `unknown` type is the type-safe sibling of `any`. Like `any`, any value can be assigned to `unknown`. However, unlike `any`, you cannot perform any operations on a value of type `unknown` without first narrowing or asserting its type.

*   **Behavior:** You must perform type checking (e.g., using `typeof`, `instanceof`, or user-defined type guards) before using it.
*   **Example:**
    ```typescript
    let value: unknown = "Hello World";
    
    // Error: Object is of type 'unknown'.
    // console.log(value.toUpperCase()); 
    
    if (typeof value === "string") {
        console.log(value.toUpperCase()); // Safe and allowed!
    }
    ```

---

## 2. Bottom Types

A **Bottom Type** is a type that has no values and is a subtype of every other type. Because it contains no values, a variable of a bottom type can never be assigned a value (except another bottom type).

In TypeScript, the bottom type is `never`.

### `never`
The `never` type represents values that will never occur.

*   **Common Use Cases:**
    1.  **Functions that never return:** Functions that throw an error or have an infinite loop.
        ```typescript
        function throwError(message: string): never {
            throw new Error(message);
        }
        
        function infiniteLoop(): never {
            while (true) {}
        }
        ```
    2.  **Exhaustive type checking:** Ensuring that all cases of a union type are handled. If a new type is added to the union, the compiler will flag a type error at the `never` assignment.
        ```typescript
        type Shape = Square | Circle;
        
        function getArea(shape: Shape) {
            switch (shape.kind) {
                case "square":
                    return shape.size * shape.size;
                case "circle":
                    return Math.PI * shape.radius ** 2;
                default:
                    // If shape has been narrowed down fully, 'shape' is of type 'never' here.
                    const _exhaustiveCheck: never = shape;
                    return _exhaustiveCheck;
            }
        }
        ```

---

## Summary Comparison

| Concept | Type | Description | Assignment Rule |
| :--- | :--- | :--- | :--- |
| **Top Type** | `any` / `unknown` | Supertype of all types. Contains all values. | You can assign **anything** to it. |
| **Bottom Type** | `never` | Subtype of all types. Contains no values. | You can assign it to **anything**, but you can assign **nothing** to it. |