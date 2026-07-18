// ============================================================================
// TypeScript - Structural Typing vs. Nominal Typing (Layman to Deep-Dive)
// ============================================================================

/**
 * 📖 PART 1: THE LAYMAN ANALOGY
 * ----------------------------------------------------------------------------
 * 🦆 STRUCTURAL TYPING (What TypeScript uses)
 * "If it walks like a duck and quacks like a duck, it's a duck."
 * Type safety is determined by the SHAPE/STRUCTURE of the data, not its name.
 * 
 * 🪪 NOMINAL TYPING (What Java, C++, Swift use)
 * "Even if it looks, walks, and sounds like a duck, if its passport says
 * 'Goose', then it is a Goose. Period."
 * Type safety is determined by the NAME/DECLARATION of the type.
 */

// ============================================================================
// 🧱 PART 2: STRUCTURAL TYPING IN ACTION (TypeScript Default)
// ============================================================================

interface Vector2D {
    x: number;
    y: number;
}

interface Point2D {
    x: number;
    y: number;
}

// 💻 Layman explanation:
// Even though Vector2D and Point2D have different names, they have the exact
// same structure (x: number, y: number). TypeScript considers them identical!

function printCoordinates(point: Point2D) {
    console.log(`Coordinates: (${point.x}, ${point.y})`);
}

const velocity: Vector2D = { x: 10, y: -5 };

// This is 100% legal in TypeScript because velocity matches the shape of Point2D!
printCoordinates(velocity); 


/**
 * 🧐 THE "MORE IS OKAY" RULE (Subtyping / Shape Compatibility)
 * ------------------------------------------------------------
 * A type is compatible with another if it has AT LEAST all the properties
 * of the target type. It can have more properties (extra properties are ignored).
 */

interface Point3D {
    x: number;
    y: number;
    z: number;
}

const spacePoint: Point3D = { x: 1, y: 2, z: 3 };

// Works! Point3D has x and y. The extra z is just ignored inside printCoordinates.
printCoordinates(spacePoint); 


/**
 * ⚠️ GOTCHA: Excess Property Checking
 * -----------------------------------
 * When you assign an object literal DIRECTLY, TypeScript performs a strict
 * "excess property check" to catch typos.
 */

// ❌ COMPILER ERROR: Object literal may only specify known properties!
// printCoordinates({ x: 1, y: 2, z: 3 }); 

// Good practice workaround: Assign to a variable first (like spacePoint above), 
// or pass only the required properties.


// ============================================================================
// 🛡️ PART 3: SIMULATING NOMINAL TYPING IN TYPESCRIPT (Deep-Dive)
// ============================================================================

/**
 * ❓ Why would we want Nominal Typing?
 * Imagine we have a banking system. We have USD amounts and EUR amounts.
 * Both are represented by `number` under the hood. 
 * Without nominal typing, we can accidentally pass USD into a EUR function!
 */

type SimpleUSD = number;
type SimpleEUR = number;

function convertEURtoINR(amount: SimpleEUR): number {
    return amount * 90; // mock rate
}

const myDollars: SimpleUSD = 100;

// ❌ OOPS! We accidentally passed USD. TypeScript did not warn us because both are just 'number'.
const rawResult = convertEURtoINR(myDollars); 
console.log(`Unsafe conversion: ${rawResult}`);


/**
 * 🚀 Solution: BRANDED TYPES (also called Tagged Types or Nominal Emulation)
 * ----------------------------------------------------------------------------
 * We intercept the type checker by attaching a unique "brand" property
 * to the types. The brand only exists at compile-time (zero runtime overhead!).
 */

// Define the nominal types using intersection types (&) with a unique brand
type USD = number & { readonly __brand: unique symbol };
type EUR = number & { readonly __brand: unique symbol };

// Helper "type-cast" creators since you cannot construct branded primitives directly
function makeUSD(amount: number): USD {
    return amount as USD;
}

function makeEUR(amount: number): EUR {
    return amount as EUR;
}

// Now let's implement the safe conversion function:
function safeConvertEURtoINR(amount: EUR): number {
    return amount * 90;
}

const secureUSD = makeUSD(100);
const secureEUR = makeEUR(100);

// 1. Correct call:
const safeResult = safeConvertEURtoINR(secureEUR);
console.log(`Safe EUR to INR conversion: ${safeResult}`);

// 2. Incorrect call (TypeScript catches this!):
// ❌ COMPILER ERROR: Argument of type 'USD' is not assignable to parameter of type 'EUR'.
// safeConvertEURtoINR(secureUSD); 


/**
 * 🎯 Summary Table:
 * 
 * | Feature | Structural Typing (TypeScript) | Nominal Typing (C++/Java/Simulated) |
 * |---------|--------------------------------|--------------------------------------|
 * | Basis   | Shape / Structure of properties| Declared name of the class / type    |
 * | Concept | "Duck Typing"                  | "Identity Typing"                    |
 * | Flex    | Extremely flexible, easy mocks | Rigid, highly explicit, very secure  |
 * | TS Use  | Default behavior               | Achieved via Branded/Tagged types    |
 */