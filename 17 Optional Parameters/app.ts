// ==========================================
// TypeScript - Optional Parameters
// ==========================================

/**
 * 1. What are Optional Parameters?
 * --------------------------------
 * In TypeScript, by default, every parameter defined in a function is required.
 * If you call a function with fewer or more arguments than specified, 
 * TypeScript will throw a compilation error.
 * 
 * To make a parameter optional, you append a question mark (?) after the parameter name.
 * 
 * Rules:
 * - Optional parameters MUST be declared AFTER any required parameters.
 * - Under the hood, an optional parameter has a union type of its declared type and `undefined`.
 */

// Example 1: Basic function with an optional parameter
function greet(name: string, greeting?: string): string {
    // If 'greeting' is not provided, it will be 'undefined'
    if (greeting) {
        return `${greeting}, ${name}!`;
    }
    return `Hello, ${name}!`;
}

console.log(greet("Alice"));                  // Output: Hello, Alice! (greeting is undefined)
console.log(greet("Bob", "Good morning"));     // Output: Good morning, Bob!


/**
 * 2. Optional Parameters vs Default Parameters
 * --------------------------------------------
 * A default parameter automatically makes the parameter optional, and provides 
 * a default value if the argument is omitted or passed as `undefined`.
 * 
 * Note: You do NOT use the '?' symbol when defining a default value.
 */

// Example 2: Function using a default parameter
function greetWithDefault(name: string, greeting: string = "Hello"): string {
    return `${greeting}, ${name}!`;
}

console.log(greetWithDefault("Charlie"));                 // Output: Hello, Charlie!
console.log(greetWithDefault("Diana", "Welcome"));        // Output: Welcome, Diana!


/**
 * 3. Ordering Rules
 * -----------------
 * Required parameters cannot follow optional parameters. 
 * The optional parameter must always come last.
 */

// ❌ INVALID: This will cause a compiler error
// function invalidGreet(greeting?: string, name: string) { ... }

// Correct ordering:
function validGreet(name: string, greeting?: string) {
    console.log(`${greeting || "Hello"}, ${name}`);
}


/**
 * 4. Optional Parameters in Callbacks / Arrow Functions
 * -----------------------------------------------------
 * You can also use optional parameters in arrow functions and callback types.
 */

const logMessage = (message: string, prefix?: string): void => {
    const formatted = prefix ? `[${prefix}] ${message}` : message;
    console.log(formatted);
};

logMessage("System startup");               // Output: System startup
logMessage("File not found", "ERROR");     // Output: [ERROR] File not found


/**
 * 5. Practical Real-World Example
 * -------------------------------
 * Let's write a function that formats user info, where the middle name and age are optional.
 */

interface UserProfile {
    firstName: string;
    lastName: string;
    middleName?: string; // Optional property in interface
    age?: number;        // Optional property in interface
}

function printUserProfile(user: UserProfile): void {
    let fullName = user.firstName;
    
    if (user.middleName) {
        fullName += ` ${user.middleName}`;
    }
    
    fullName += ` ${user.lastName}`;
    
    console.log(`User: ${fullName}`);
    if (user.age !== undefined) {
        console.log(`Age: ${user.age}`);
    } else {
        console.log("Age: Not specified");
    }
}

printUserProfile({ firstName: "John", lastName: "Doe" });
// Output:
// User: John Doe
// Age: Not specified

printUserProfile({ firstName: "Jane", middleName: "Marie", lastName: "Smith", age: 28 });
// Output:
// User: Jane Marie Smith
// Age: 28