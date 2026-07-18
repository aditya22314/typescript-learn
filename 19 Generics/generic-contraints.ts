function echo<T>(a: T) {
    return a;
}

//We can give anything we want no constraints
echo(1)
echo("Hello")

//Genreic with constraints 

interface Lengthwise {
    length: number;
}

/**
 * An echo function that constrains the type `T` to types that have a `length` property.
 * 
 * By using `<T extends Lengthwise>`, we restrict the inputs to only those types that 
 * satisfy the `Lengthwise` interface (such as strings, arrays, or objects with a `length` property).
 * 
 * @template T - A type that must extend/satisfy the `Lengthwise` interface.
 * @param a - An argument of type `T`.
 * @returns The same argument of type `T`.
 */
function echoWithConstraint<T extends Lengthwise>(a: T): T {
    console.log(`Length: ${a.length}`);
    return a;
}

// Valid arguments (all have a .length property)
echoWithConstraint("Hello");       // String has a length property
echoWithConstraint([1, 2, 3]);     // Array has a length property
echoWithConstraint({ length: 4 }); // Object has a length property

// Invalid arguments (will cause compilation errors)
// @ts-expect-error - Argument of type 'number' is not assignable to parameter of type 'Lengthwise'.
echoWithConstraint(10);

// @ts-expect-error - Argument of type 'boolean' is not assignable to parameter of type 'Lengthwise'.
echoWithConstraint(true);

/**
 * Example 2: Using the `keyof` operator inside constraints.
 * 
 * We want a function that retrieves a property value from an object given a property name.
 * To ensure type safety, we want to constrain the property name to ONLY valid keys of the object.
 * 
 * By using `K extends keyof T`, we constrain the type parameter `K` to only be one of 
 * the keys of the object type `T`.
 * 
 * @template T - The type of the object.
 * @template K - A type representing one of the keys of `T`.
 */
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
    return obj[key];
}

const user = {
    name: "Aditya",
    age: 25
};

// Valid calls:
const username = getProperty(user, "name"); // Valid: type of username is inferred as string
const userage = getProperty(user, "age");   // Valid: type of userage is inferred as number

// Invalid calls:
// @ts-expect-error - Argument of type '"email"' is not assignable to parameter of type '"name" | "age"'.
getProperty(user, "email"); // Invalid: "email" does not exist on the user object

