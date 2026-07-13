/**
 * 📘 DECLARATION MERGING IN TYPESCRIPT
 * 
 * Declaration Merging is a process where the TypeScript compiler merges two or more 
 * separate declarations with the exact same name into a single definition.
 * 
 * 💡 Key Rule: Only INTERFACES can merge. Types cannot merge.
 * 
 * =========================================================
 * 1. Basic Declaration Merging (Local Scope)
 * =========================================================
 * When interfaces are in the same scope, TypeScript automatically combines their properties.
 */

interface User {
    name: string;
}

interface User {
    age: number; // Merged with the previous definition of User
}

// Now `User` has both `name` and `age`!
const customer: User = {
    name: "Aditya",
    age: 21
};


// =========================================================
// 2. Global Declaration Merging (e.g., Extending the browser `window` object)
// =========================================================
/**
 * In modern TypeScript, files are often treated as modules (either via `export {}`, 
 * imports, or tsconfig's `moduleDetection: "force"` setting). 
 * 
 * When a file is a module, writing `interface Window` directly will only create a 
 * local interface named `Window`. It won't merge with the global browser `Window` object.
 * 
 * To add properties to the global scope (like the browser's `window` object), 
 * we must use `declare global { ... }`.
 */

declare global {
    interface Window {
        age: number; // Adds `age` to the global Window interface
    }
}

// Now we can set and access `.age` on the global `window` object without compiler errors!
window.age = 89;

console.log(window.age);

export {}; // Ensures this file is treated as a module, making `declare global` valid