# Statically vs Dynamically Typed Languages

## Statically Typed Languages
In statically typed languages, type checking is performed at **compile-time**. The type of a variable is known and checked before the program is executed.

*   **Characteristics:**
    *   Variables must be declared with a specific data type (or the type must be inferable by the compiler).
    *   Once a variable is declared with a type, it cannot hold values of other types.
    *   Type errors are caught early during compilation, before the code runs.
*   **Examples:** Java, C++, TypeScript, Go, Rust, Swift.
*   **Pros:**
    *   Fewer runtime type errors (better reliability).
    *   Better editor tooling (autocompletion, refactoring, navigation).
    *   Optimization opportunities for compilers.
*   **Cons:**
    *   More verbose code (requires writing types).
    *   Slower initial development/prototyping speed due to strict compiler checks.

---

## Dynamically Typed Languages
In dynamically typed languages, type checking is performed at **runtime**. The type of a variable is associated with its runtime value, not the variable declaration itself.

*   **Characteristics:**
    *   Variables do not need type declarations.
    *   A single variable can hold different data types at different times during execution.
    *   Type errors are only discovered when that specific line of code is executed.
*   **Examples:** JavaScript, Python, Ruby, PHP, dynamic Lisp.
*   **Pros:**
    *   Faster prototyping and development speed.
    *   More concise and flexible code.
*   **Cons:**
    *   Type errors can pass silently to production and occur at runtime.
    *   Lesser support for advanced code intelligence/refactoring in IDEs.

---

# Strongly vs Weakly Typed Languages

While static vs dynamic typing is about **when** types are checked (compile-time vs runtime), strong vs weak typing is about **how strictly** type rules are enforced (implicit conversion vs strict errors).

## Strongly Typed Languages
In strongly typed languages, type rules are strictly enforced, and implicit type conversions (coercions) are generally not allowed.

*   **Characteristics:**
    *   Performing operations on mismatched types (e.g., adding a string and an integer) triggers an error instead of automatically converting types.
    *   Explicit type conversion (casting) is required to mix types.
*   **Examples:** Python (Dynamically & Strongly typed), Java (Statically & Strongly typed).
*   **Example (Python):**
    ```python
    # This will throw a TypeError
    result = "5" + 2 
    ```

---

## Weakly Typed Languages
In weakly typed languages, type rules are loose, and the language will perform implicit type conversions (coercions) behind the scenes to make operations succeed.

*   **Characteristics:**
    *   Implicit conversions can sometimes lead to silent bugs or unexpected behavior (e.g., `"5" + 2 = "52"`).
    *   More forgiving syntax, reducing type-related boilerplate.
*   **Examples:** JavaScript (Dynamically & Weakly typed), C (Statically & Weakly typed).
*   **Example (JavaScript):**
    ```javascript
    // JavaScript implicitly coerces the number 2 to a string
    let result = "5" + 2; // result is "52" (string)
    ```

