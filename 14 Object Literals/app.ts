/**
 * 📘 UNDERSTANDING OBJECT LITERAL TYPES IN TYPESCRIPT
 * 
 * Think of an Object Literal Type as a "blueprint" or a "contract" for an object.
 * It defines the exact shape (property names and their types) that an object must have.
 */

// ==========================================
// 1. Implicit Type Inference (TypeScript guesses)
// ==========================================
// When you create a plain object, TypeScript automatically infers its type based on the values.
const person = {
    name: "Aditya",
    age: 25
};
// If you hover over `person`, TypeScript knows its type is:
// { name: string; age: number }


// ==========================================
// 2. Explicit Object Literal Type (You define the blueprint)
// ==========================================
// You explicitly tell TypeScript what properties are required and what types they must be.
let employee: {
    id: number;
    name: string;
    department: string;
};

// Now, `employee` MUST match this structure exactly:
employee = {
    id: 101,
    name: "John Doe",
    department: "Engineering"
};

// employee = { id: 102 }; // ❌ Error: 'name' and 'department' are missing!
// employee = { id: 102, name: "Alice", department: "HR", extra: true }; // ❌ Error: 'extra' doesn't exist in the type!


// ==========================================
// 3. Optional Properties (`?`)
// ==========================================
// Sometimes, a property is not mandatory. Add a `?` after its name to make it optional.
let product: {
    id: number;
    name: string;
    description?: string; // Optional property
};

product = {
    id: 1,
    name: "Wireless Mouse" // Allowed even without a description!
};


// ==========================================
// 4. Readonly Properties (`readonly`)
// ==========================================
// To prevent a property from being changed after the object is created, prefix it with `readonly`.
let car: {
    readonly brand: string;
    model: string;
};

car = {
    brand: "Tesla",
    model: "Model 3"
};

// car.brand = "BMW"; // ❌ Error: Cannot assign to 'brand' because it is a read-only property.
car.model = "Model Y";  // ✅ Allowed!


// ==========================================
// 5. Specific Values as Types (Literal Types)
// ==========================================
// You can restrict a property to only accept specific values, rather than any string or number.
let order: {
    id: number;
    status: "pending" | "shipped" | "delivered"; // Only these exact values are allowed
};

order = {
    id: 5432,
    status: "shipped" // ✅ Allowed
};

// order.status = "cancelled"; // ❌ Error: Type '"cancelled"' is not assignable to type '"pending" | "shipped" | "delivered"'.