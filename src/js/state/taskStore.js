/**
 * Local in-memory store for task entities.
 */
export class TaskStore {
  /**
   * @param {import("../types.js").Task[]} initialTasks
   */
  constructor(initialTasks = []) {
    /** @type {import("../types.js").Task[]} */
    this.tasks = [...initialTasks];
  }

  /**
   * Returns a snapshot of current tasks.
   * @returns {import("../types.js").Task[]}
   */
  getTasks() {
    return [...this.tasks];
  }

  /**
   * Adds a new task to the store.
   * @param {import("../types.js").TaskPayload} payload
   * @returns {import("../types.js").Task}
   */
  addTask(payload) {
    /** @type {import("../types.js").Task} */
    const task = {
      id: `task-${crypto.randomUUID()}`,
      title: payload.title.trim(),
      category: /** @type {import("../types.js").TaskCategory} */ (payload.category),
      priority: /** @type {import("../types.js").TaskPriority} */ (payload.priority),
      dueDate: payload.dueDate,
      completed: false,
      createdAt: new Date().toISOString()
    };

    this.tasks.unshift(task);
    return task;
  }

  /**
   * Toggles task completion state.
   * @param {string} id
   * @returns {boolean}
   */
  toggleTask(id) {
    const task = this.tasks.find((item) => item.id === id);
    if (!task) return false;
    task.completed = !task.completed;
    return true;
  }

  /**
   * Replaces editable task fields.
   * @param {string} id
   * @param {import("../types.js").TaskPayload} payload
   * @returns {boolean}
   */
  updateTask(id, payload) {
    const task = this.tasks.find((item) => item.id === id);
    if (!task) return false;

    task.title = payload.title.trim();
    task.category = /** @type {import("../types.js").TaskCategory} */ (payload.category);
    task.priority = /** @type {import("../types.js").TaskPriority} */ (payload.priority);
    task.dueDate = payload.dueDate;
    return true;
  }

  /**
   * Removes a task by id.
   * @param {string} id
   * @returns {boolean}
   */
  deleteTask(id) {
    const initialLength = this.tasks.length;
    this.tasks = this.tasks.filter((task) => task.id !== id);
    return this.tasks.length !== initialLength;
  }

  /**
   * Removes completed tasks.
   * @returns {number}
   */
  clearCompleted() {
    const previousLength = this.tasks.length;
    this.tasks = this.tasks.filter((task) => !task.completed);
    return previousLength - this.tasks.length;
  }
}
