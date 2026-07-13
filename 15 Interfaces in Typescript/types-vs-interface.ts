/**
 * 📘 TYPES vs INTERFACES in TypeScript
 *
 * Both `type` and `interface` let you define the shape of an object.
 * They look very similar, but they have some key differences.
 *
 * Rule of thumb:
 *   - Use `interface` when defining object shapes (especially for classes & APIs).
 *   - Use `type` when you need unions, intersections, or aliasing primitives/tuples.
 */


// ==========================================
// 1. Basic Syntax — They look almost the same
// ==========================================

interface IUser {
    name: string
    age: number
}

type TUser = {
    name: string
    age: number
}

// Both work the same way for defining an object shape:
const user1: IUser = { name: "Aditya", age: 21 }
const user2: TUser = { name: "Aditya", age: 21 }


// ==========================================
// 2. Type Aliasing — Something only `type` can do
// ==========================================
// `type` can alias ANY type — primitives, unions, tuples, etc.
// `interface` can ONLY describe object shapes.

type ID = string | number          // Union type — ID can be a string OR a number
type Coordinates = [number, number] // Tuple type
type Username = string              // Alias for a primitive

// interface ID = string | number  // ❌ Not possible with interface!


// ==========================================
// 3. EXTENDING — Adding more properties to an existing type/interface
// ==========================================

// --- Extending an Interface (uses `extends` keyword) ---
interface Animal {
    name: string
    legs: number
}

interface Dog extends Animal {
    breed: string
}

// Dog now has: name, legs, AND breed
const myDog: Dog = {
    name: "Bruno",
    legs: 4,
    breed: "Labrador"
}

// --- Intersection Types (uses `&` to combine/extend types) ---
// With `type`, you can't use `extends`. Instead, you use `&` (intersection) 
// to combine multiple types together.
type AnimalType = {
    name: string
    legs: number
}

// Combining AnimalType with another object shape
type DogType = AnimalType & {
    breed: string
}

// You can also intersect two completely separate types:
type CanRun = { runSpeed: number }
type CanBark = { barkVolume: number }
type SuperDog = DogType & CanRun & CanBark

// Same result — DogType has: name, legs, AND breed
const myDog2: SuperDog = {
    name: "Max",
    legs: 4,
    breed: "Poodle",
    runSpeed: 20,
    barkVolume: 100
}

// --- You can also mix! Interface extends Type, or Type intersects Interface ---
interface Cat extends AnimalType {   // Interface extending a Type ✅
    indoor: boolean
}

type Bird = Animal & {              // Type intersecting an Interface ✅
    canFly: boolean
}


// ==========================================
// 4. DECLARATION MERGING — The BIG difference! (Only Interfaces)
// ==========================================
/**
 * If you declare the same `interface` name TWICE, TypeScript MERGES them
 * into one combined interface automatically. This is called "Declaration Merging".
 *
 * Types CANNOT do this — redeclaring a `type` with the same name is an ERROR.
 *
 * 💡 When is this useful?
 *   - When a library exports an interface and you want to add extra properties
 *     to it without modifying the library's source code.
 *   - When you want to gradually build up a complex interface across multiple files.
 */

// --- Interface: Declaration Merging works! ---
interface Config {
    apiUrl: string
}

interface Config {          // Same name — TypeScript merges them!
    timeout: number
}

// Now Config has BOTH properties:
const appConfig: Config = {
    apiUrl: "https://api.example.com",
    timeout: 5000
}

// --- Type: Declaration Merging does NOT work! ---
// type Settings = { theme: string }
// type Settings = { language: string }  // ❌ Error: Duplicate identifier 'Settings'.


// ==========================================
// 5. Real-World Example of Declaration Merging
// ==========================================
/**
 * Imagine a library exports this interface:
 *
 *   interface Window {
 *       document: Document
 *       location: Location
 *   }
 *
 * In YOUR code, you can extend it without touching the library:
 *
 *   interface Window {
 *       myCustomProperty: string
 *   }
 *
 * Now `window.myCustomProperty` is recognized by TypeScript!
 * This is how libraries like Express add `req.user`, `req.session`, etc.
 */


// ==========================================
// 6. Quick Comparison Table
// ==========================================
/**
 *  Feature                    | interface          | type
 *  ---------------------------|--------------------|-------------------
 *  Object shapes              | ✅ Yes             | ✅ Yes
 *  Extend/Inherit             | ✅ extends         | ✅ & (intersection)
 *  Declaration Merging        | ✅ Yes             | ❌ No
 *  Union types (A | B)        | ❌ No              | ✅ Yes
 *  Tuple types                | ❌ No              | ✅ Yes
 *  Primitive aliases           | ❌ No              | ✅ Yes
 *  Works with classes         | ✅ implements      | ✅ implements
 *
 *  TL;DR:
 *    → Use `interface` for objects, classes, and when you need merging.
 *    → Use `type` for everything else (unions, tuples, primitives, complex combos).
 */
