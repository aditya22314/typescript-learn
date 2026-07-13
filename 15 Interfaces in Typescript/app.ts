/**
 *  UNDERSTANDING INTERFACES IN TYPESCRIPT
 * 
 * An Interface is a way to define a custom type that describes the "shape" of an object.
 * It acts as a contract that objects must adhere to. 
 * 
 *  Why use Interfaces instead of inline Object Literal Types?
 * 1. Reusability: You define the structure once and reuse it across multiple objects/files.
 * 2. Readability: Keeps your code clean and avoids bulky inline definitions.
 * 3. Extendability: Interfaces can inherit from other interfaces using the `extends` keyword.
 * 
 *  HOVER VERBOSITY NOTE (How to inspect):
 * - Clean Tooltips: By default, when you hover over `user` (line 33), VS Code will only show 
 *   `const user: User` instead of expanding the entire object type. This is done to keep tooltips compact.
 * - Inspecting Details:
 *   1. Hover directly over `User` to see its immediate properties.
 *   2. Hold Cmd (macOS) or Ctrl (Windows/Linux) and hover over the `User` type name to see a detailed, expanded preview of its structure.
 *   3. Cmd/Ctrl + Click (or press F12) on `User` to jump directly to its definition.
 */

interface User {
    name: String
    age: number
    email: string
    isStudent: boolean
    address: {
        street: string
        pinCode: number
    }
}

const user: User = {
    name: "Aditya",
    age: 21,
    email: "[EMAIL_ADDRESS]",
    isStudent: true,
    address: {
        street: "123 Main St",
        pinCode: 123456
    }
}