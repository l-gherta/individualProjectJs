# Maison Task Planner

## Overview
Maison Task Planner is a Vanilla JavaScript web application created for an individual programming project. It demonstrates practical work with the DOM, events, form validation, array processing, modular architecture, and responsive interface design.

The application allows a user to create tasks, edit them, change their status, delete them, search through them, filter them, and sort them. Task data is stored in `localStorage`, so the list remains available after the page is refreshed.

## Authors
- Student 1: `Gherta Lilian`

## Main Features
- Dynamic creation, update, and deletion of DOM elements
- Event handling for forms, buttons, search input, and filters
- Validation with user-friendly error messages
- Task list based on an array of objects
- Search, filtering, and sorting
- Modal window for editing tasks
- Color-coded task priorities and statuses
- Responsive full-page layout
- Modular JavaScript structure with JSDoc comments

## Technologies
- HTML5
- CSS3
- Vanilla JavaScript (ES6 modules)
- Node.js local server

## Project Structure
```text
individualProject/
|-- index.html
|-- package.json
|-- README.md
|-- server.js
`-- src/
    |-- js/
    |   |-- main.js
    |   |-- types.js
    |   |-- data/
    |   |   `-- seedTasks.js
    |   |-- state/
    |   |   `-- taskStore.js
    |   |-- ui/
    |   |   |-- modal.js
    |   |   |-- render.js
    |   |   `-- toast.js
    |   `-- utils/
    |       |-- storage.js
    |       |-- tasks.js
    |       `-- validation.js
    `-- styles/
        `-- main.css
```

## Installation and Launch
### Requirements
- Node.js

### Run Steps
1. Open the project folder in the terminal.
2. Start the local server:

```bash
npm run dev
```

If PowerShell blocks `npm`, use:

```bash
npm.cmd run dev
```

3. Open the browser at:

```text
http://localhost:8080
```

If port `8080` is already busy, run the project on another port:

```bash
$env:PORT=8081
npm.cmd run dev
```

Then open:

```text
http://localhost:8081
```

## How to Use
1. Enter a task title, select category, priority, and due date.
2. Click `Add Task` to create a new task.
3. Use the search field to find tasks by title, category, or priority.
4. Use the filter buttons to display all, active, or completed tasks.
5. Use the sort menu to change the order of the task list.
6. Click `Edit` to change task information.
7. Click `Mark Done` or `Mark Active` to update status.
8. Click `Delete` to remove one task.
9. Click `Clear Completed` to remove all completed tasks.

## Code Documentation
The project uses JSDoc comments in JavaScript files. Shared types are stored in:

- `src/js/types.js`

This helps keep parameter descriptions, return types, and data structures clear and consistent across modules.

## Sources
- [MDN Web Docs: DOM](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model)
- [MDN Web Docs: JavaScript Modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules)
- [MDN Web Docs: FormData](https://developer.mozilla.org/en-US/docs/Web/API/FormData)
- [MDN Web Docs: localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)
- [MDN Web Docs: HTML dialog element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog)

## Notes
- The interface uses a black-and-white editorial style with compact spacing.
- Task priority colors: `Low` - green, `Medium` - yellow, `High` - red.
- Task status colors: `Completed` - green, `Active` - red.
