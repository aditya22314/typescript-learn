/**
 * A generic type that represents the intersection of two types, `T` and `U`.
 * 
 * This means an object of type `DynamicTypes<T, U>` must satisfy the properties of both `T` and `U`.
 * 
 * @template T - The first type parameter.
 * @template U - The second type parameter.
 */
type DynamicTypes<T, U> = T & U

/**
 * ⚠️ WHY DOES THIS CAUSE A COMPILATION ERROR AND RESOLVE TO `never`?
 * 
 * 1. Passing `string` for `T` and `number` for `U` evaluates `T & U` to `string & number`.
 * 2. An intersection of two primitive types (`string & number`) is impossible because
 *    a value cannot be both a primitive string and a primitive number at the same time.
 * 3. Therefore, TypeScript resolves `string & number` to `never`.
 * 4. Assigning the object `{ name: "Aditya", age: 25 }` to a variable of type `never` 
 *    fails because `never` has no instances.
 * 
 * To fix this, you should pass object shapes rather than primitives:
 * ```typescript
 * const correctObj: DynamicTypes<{ name: string }, { age: number }> = {
 *     name: "Aditya",
 *     age: 25
 * }
 * ```
 */
// @ts-expect-error - Type '{ name: string; age: number; }' is not assignable to type 'never'.
const obj: DynamicTypes<string, number> = {
    name: "Aditya",
    age: 25
}

/**
 * A generic type that represents the union of two types, `T` and `U`.
 * 
 * This means a variable of type `DynamicUnionTypes<T, U>` can satisfy either `T` OR `U`.
 * 
 * @template T - The first type parameter.
 * @template U - The second type parameter.
 */
type DynamicUnionTypes<T, U> = T | U

/**
 * Case 1: Union of Primitive Types
 * 
 * Q: How does `DynamicUnionTypes<string, number>` resolve?
 * A: It resolves to the union type `string | number`.
 * 
 * Unlike the intersection (`string & number`) which resolves to `never` (because a value 
 * cannot be both a string and a number at the same time), a union type (`string | number`) 
 * is completely valid. It specifies that a value must be EITHER a string OR a number. 
 * Therefore, it does NOT resolve to `never`.
 */
const unionPrimitive1: DynamicUnionTypes<string, number> = "Aditya" // Valid (string)
const unionPrimitive2: DynamicUnionTypes<string, number> = 25       // Valid (number)

/**
 * Case 2: Union of Object Types
 * 
 * `DynamicUnionTypes<{ name: string }, { age: number }>` resolves to 
 * `{ name: string } | { age: number }`.
 * 
 * A variable of this type can contain:
 * - Just `{ name: string }`
 * - Just `{ age: number }`
 * - Both `{ name: string; age: number }` (excess properties allowed since it satisfies the union)
 */
const unionObj1: DynamicUnionTypes<{ name: string }, { age: number }> = {
    name: "Aditya"
} // Valid: satisfies the first part of the union

const unionObj2: DynamicUnionTypes<{ name: string }, { age: number }> = {
    age: 25
} // Valid: satisfies the second part of the union

const unionObj3: DynamicUnionTypes<{ name: string }, { age: number }> = {
    name: "Aditya",
    age: 25
} // Valid: satisfies both parts of the union





