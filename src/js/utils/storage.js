import { seedTasks } from "../data/seedTasks.js";

const STORAGE_KEY = "task-planner.tasks";

/**
 * Loads tasks from localStorage or falls back to demo data.
 * @returns {import("../types.js").Task[]}
 */
export function loadTasks() {
  try {
    const storedValue = localStorage.getItem(STORAGE_KEY);
    if (!storedValue) {
      return [...seedTasks];
    }

    const parsedValue = JSON.parse(storedValue);
    return Array.isArray(parsedValue) ? parsedValue : [...seedTasks];
  } catch {
    return [...seedTasks];
  }
}

/**
 * Persists tasks to localStorage.
 * @param {import("../types.js").Task[]} tasks
 */
export function saveTasks(tasks) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}
