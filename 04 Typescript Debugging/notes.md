# TypeScript Debugging & Source Maps
## 1. What are Source Maps?
When you write TypeScript, it is compiled into JavaScript to be executed by engines (like Node.js or browsers). Because the executed JavaScript looks different from your original TypeScript code, finding bugs (debugging) in the compiled file can be very difficult.
**Source Maps** are mapping files (ending in `.js.map`) that map the lines/characters of the compiled JavaScript back to your original TypeScript source code.
---
## 2. Enabling Source Maps
To generate source maps, configure your `tsconfig.json` file as follows:
```json
{
  "compilerOptions": {
    "sourceMap": true /* Create source map files for emitted JavaScript files. */
  }
}
```
### What happens when enabled:
When you run `tsc`, the compiler will emit two files for every `.ts` file:
1. `app.js` — The compiled JavaScript code.
2. `app.js.map` — The source map (JSON data mapping the JS code to the TS code).
3. The bottom of your `app.js` will contain a reference link pointing to the map:
   ```javascript
   //# sourceMappingURL=app.js.map
   ```
---
## 3. How to Debug TypeScript using Source Maps
### A. Debugging in Visual Studio Code (VS Code)
1. **Enable Source Maps** in `tsconfig.json` (as shown above).
2. Run `tsc` to compile your code and generate the `.js.map` files.
3. Open your TypeScript file (e.g. `app.ts`) and click to the left of a line number to set a **Breakpoint** (red dot).
4. Press **F5** (or click *Run and Debug* from the sidebar -> *Run and Debug* -> select *Node.js*).
5. VS Code will run the compiled JavaScript file, but the debugger will intercept it using the `.js.map` file and allow you to step through your **TypeScript** code line by line!
### B. Debugging in Chrome Developer Tools (for Web Apps)
1. Serve your web app (including the `.ts`, `.js`, and `.js.map` files).
2. Open Chrome, right-click and choose **Inspect** to open DevTools.
3. Go to the **Sources** panel.
4. Press `Ctrl + P` (or `Cmd + P` on Mac) and type your TypeScript file name (e.g., `app.ts`).
5. You can now set breakpoints directly inside the `.ts` file in Chrome DevTools and debug live in the browser.
