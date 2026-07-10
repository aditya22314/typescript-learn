# Initializing a TypeScript Project

To manage compiling a TypeScript project effectively, you need a configuration file called `tsconfig.json`. 

You can automatically generate this file using the TypeScript CLI.

---

## 1. How to Initialize the Project

Navigate to your project root folder in the terminal and run:

```bash
tsc --init
```

---

## 2. What `tsc --init` Does
1. **Creates a `tsconfig.json` file** in the directory where the command was executed.
2. **Generates default/recommended settings** pre-configured for your TypeScript project.
3. **Populates commented-out options** to serve as built-in documentation for other compiler settings you might want to enable later.

---

## 3. Why `tsconfig.json` is Necessary
* **Enables project-wide compilation:** With a config file present, you can simply run `tsc` in the terminal to compile all TypeScript files in the project instead of specifying files individually (e.g. `tsc app.ts`).
* **Saves custom configurations:** You can customize compiler targets (e.g., `"target": "ES6"`), set output directories (e.g., `"outDir": "./dist"`), enable strict type checking (`"strict": true`), and manage which files to include/exclude from the build.