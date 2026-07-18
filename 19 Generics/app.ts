/**
 * Represents the literal type 'string'.
 */
type str = 'string'

/**
 * Represents the literal type 'number'.
 */
type num = 'number'

/**
 * Represents the literal type 'boolean'.
 */
type bool = 'boolean'

/**
 * Defines a structural type with an `id` property.
 */
type abc = {
    /** Unique identifier string. */
    id: string
}

/**
 * A category object conforming to the `abc` structure.
 */
const category: abc = {
    id: "String"
}

// type DynamicType<Test> = Test

// const a: DynamicType<60> = 60

/**
 * A generic type representing an array of type `T`.
 * 
 * @template T The type of elements in the array.
 */
type DynamicType<T> = T[]

/**
 * An array of strings defined using the generic `DynamicType`.
 */
let a: DynamicType<string> = ["Hello", "World"]

/**
 * An array of numbers defined using the generic `DynamicType`.
 */
let b: DynamicType<number> = [1, 2, 3, 4]

/**
 * An array of booleans defined using the generic `DynamicType`.
 */
let c: DynamicType<boolean> = [true, false]


