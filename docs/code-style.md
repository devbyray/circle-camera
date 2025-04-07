# This document is a guide for writing code in this project

General guidelines:
- Always add code comments.
- Always use simple languages, be friendly, informal and avoid jargon.
- Always use code according to this guide.
- Always use the same language for the same task.
- Always use the same style for the same task.

For JavaScript code we use the following style guide:
- Readable code over clever code
- Use `const` and `let` instead of `var`
- Use `===` instead of `==`
- Use `//` for comments
- Use `camelCase` for variables and functions
- Use `PascalCase` for classes
- Split complex code into smaller functions
- Use `import` and `export` for modules
- Use `async` and `await` for promises
- Use `try` and `catch` for error handling
- Use `console.log` for debugging

For .NET code we use the following style guide:
- Readable code over clever code
- Use `PascalCase` for classes and methods
- Use `camelCase` for variables and parameters
- Use `try` and `catch` for error handling
- Use `Console.WriteLine` for debugging

For CSS code we use the following style guide:
- Readable code over clever code
- Use `kebab-case` for class names
- Avoid #IDs and inline styles
- Never use `!important`
- Use `rem` for over `px`
- Use `//` for comments
- Use `flexbox` for layout
- Use `BEM` for naming conventions
- Variables should be defined as CSS variables
- Use `@media` queries for responsiveness

For Vue code we use the following style guide:
- Readable code over clever code
- Use `PascalCase` for components
- Use `camelCase` for props
- Use `kebab-case` for events
- Use `v-bind` for dynamic attributes
- Use `v-model` for two-way data binding
- Use `v-if` and `v-else` for conditional rendering
- Use `v-for` for rendering lists
- Use `v-on` for event handling
- The order of a one file component should be: `script`, `template`, `style`
- Use `@click` for click events
- Use `@submit` for submit events
- Use `@change` for change events
- Use `@input` for input events
- Register component events with `const emits = defineEmits(['event'])`
- Use `ref` for accessing DOM elements
- Use `provide` and `inject` for passing data between components
- Use `reactive` for reactive objects and use them as a store
- Use `computed` for derived data
- Keep components small and focused
- Use `props` for passing data to child components
- Use `slots` for passing content to child components
- Use `watch` for watching reactive objects
- Use `setup` for composition API