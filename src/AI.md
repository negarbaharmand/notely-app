# AI.md

> Prompts for use and interest in this project focus on managing edge cases and validation.
---
```
What's the correct TypeScript type for a keyboard event handler on a textarea in React?
```
*Used to get `KeyboardEvent<HTMLTextAreaElement>` instead of using `any`.*

```
What is the best practice for loading data from localStorage in React?
```
*Used to learn about lazy initialization pattern with `useState(() => loadNotes())`.*

```
Should editingId state live in the parent App component or in individual NoteCard components? What are the tradeoffs?
```
*Used to decide on state lifting strategy.*


## Validation & Edge Cases

```
Should I trim whitespace from note content before saving? What about validation?
```
*Used to implement `.trim()` before validation and saving.*

```
How should I handle JSON.parse errors when loading from localStorage?
```
*Used to implement try-catch in loadNotes function.*

```
How do I make Enter key submit a form but Shift+Enter add a new line in a textarea?
```
*Used to implement keyboard shortcuts in handleKeyDown.*

```
Should I use autoFocus on the textarea when entering edit mode?
```
*Used to improve UX in edit mode.*

```
What's a good UX pattern for filtering a list in React?
```
*Used to implement status filter dropdown.*

## Testing

```
What edge cases should I test for localStorage in a React app?
```
```
What's the best way to test React components with Vitest and Testing Library?
```
```
Should I co-locate tests with components or put them in a separate test folder?
```