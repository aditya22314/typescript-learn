/**
 * A generic type representing a union of two types `T` and `U`, with default type parameters.
 * 
 * Generic defaults allow you to make type parameters optional. If a caller does not provide
 * a type argument, the default type will be used instead.
 * 
 * - `T` defaults to `string` if not specified.
 * - `U` defaults to `number` if not specified.
 * 
 * @template T - The first type parameter (defaults to `string`).
 * @template U - The second type parameter (defaults to `number`).
 */
type DynamicType<T = string, U = number> = T | U

/**
 * Scenario 1: Using both defaults.
 * 
 * Since no type arguments are provided, it resolves to `string | number`.
 */
const valDefault: DynamicType = "Aditya" // Or any number, e.g., 25

/**
 * Scenario 2: Overriding the first default, keeping the second default.
 * 
 * `T` is specified as `boolean`, while `U` defaults to `number`. 
 * Resolves to `boolean | number`.
 */
const valPartial: DynamicType<boolean> = true // Or any number, e.g., 100

/**
 * Scenario 3: Overriding both defaults.
 * 
 * `T` is specified as `boolean` and `U` as `string`.
 * Resolves to `boolean | string`.
 */
const valFull: DynamicType<boolean, string> = "Hello" // Or a boolean, e.g., false