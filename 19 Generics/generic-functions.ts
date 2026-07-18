/**
 * A generic identity function.
 * 
 * Generics allow us to write a function that can accept any type `T` and 
 * guarantee that the return type is the exact same type as the input argument.
 * 
 * @template T - The placeholder type determined when the function is called.
 * @param data - The input value of type `T`.
 * @returns The input value of type `T`.
 */
function getValue<T>(data: T): T {
    return data
}

/**
 * Calling `getValue` explicitly passing `string` as the type argument.
 * The variable `ad` is typed as `string`.
 */
const ad = getValue<string>("Aditya");

/**
 * Calling `getValue` explicitly passing `number` as the type argument.
 * The variable `ba` is typed as `number`.
 */
const ba = getValue<number>(12);

console.log(ad, ba)