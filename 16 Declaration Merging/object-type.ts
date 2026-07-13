/**
 * 📘 THE `object` TYPE vs SPECIFIC OBJECT TYPES IN TYPESCRIPT
 * 
 * In JavaScript, objects are dynamic — you can add or modify properties at any time.
 * However, TypeScript is strictly typed.
 */

// =========================================================
// 1. The Generic `object` Type (The Problem)
// =========================================================
/**
 * If you type an object as the lowercase `object`, you are telling TypeScript:
 * "This variable is a generic object, but I am not specifying what properties it has."
 * 
 * Because of this, TypeScript will NOT let you read or write any properties on it!
 */

const obj: object = { name: "Aditya" };

// ❌ TypeScript Compiler Errors:
// console.log(obj.name); // Error: Property 'name' does not exist on type 'object'.
// obj.age = 21;         // Error: Property 'age' does not exist on type 'object'.


// =========================================================
// How to fix this? (Solutions)
// =========================================================

// --- Solution A: Use an Object Literal Type (Recommended for fixed shapes) ---
// If you know what properties your object should have, define them explicitly.
// Use optional properties (`?`) if you want to add them later.
const user: { name: string; age?: number } = { name: "Aditya" };

// Now you can safely assign and read properties:
user.age = 21; // ✅ Allowed (because 'age' is defined as optional)


// --- Solution B: Use an Index Signature (For truly dynamic objects) ---
// If you want an object where you can add ANY key dynamically, define the type of keys and values.
const dynamicObj: { [key: string]: any } = { name: "Aditya" };

// You can add any properties you want:
dynamicObj.age = 21; 
dynamicObj.isStudent = true;
dynamicObj.hobbies = ["Coding", "Reading"];


// --- Solution C: Use `Record<string, any>` (Alternative to Index Signature) ---
// `Record` is a built-in utility type that behaves exactly like an index signature.
const recordObj: Record<string, any> = { name: "Aditya" };

// Add properties dynamically:
recordObj.age = 21;
recordObj.city = "Bangalore";


// =========================================================
// Summary:
// - `object` (lowercase) means "any object, but we don't know its properties". Avoid using it to read/write properties.
// - `{ name: string }` defines a specific structure.
// - `{ [key: string]: any }` or `Record<string, any>` allows dynamic additions just like JavaScript.
// =========================================================
export {};