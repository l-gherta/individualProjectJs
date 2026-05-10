/**
 * Returns an integer priority rank where lower means higher priority.
 * @param {import("../types.js").TaskPriority} priority
 * @returns {number}
 */
function priorityRank(priority) {
  if (priority === "High") return 0;
  if (priority === "Medium") return 1;
  return 2;
}

/**
 * Applies filter, search, and sort to task data.
 * @param {import("../types.js").Task[]} tasks
 * @param {import("../types.js").ViewOptions} options
 * @returns {import("../types.js").Task[]}
 */
export function buildVisibleTasks(tasks, options) {
  const normalizedQuery = options.query.trim().toLowerCase();
  const filtered = tasks.filter((task) => {
    const filterPass =
      options.filter === "all" ||
      (options.filter === "active" && !task.completed) ||
      (options.filter === "completed" && task.completed);

    const searchPass =
      !normalizedQuery ||
      task.title.toLowerCase().includes(normalizedQuery) ||
      task.category.toLowerCase().includes(normalizedQuery) ||
      task.priority.toLowerCase().includes(normalizedQuery);

    return filterPass && searchPass;
  });

  const sorted = [...filtered];
  sorted.sort((left, right) => {
    if (options.sort === "oldest") {
      return left.createdAt.localeCompare(right.createdAt);
    }

    if (options.sort === "dueDate") {
      return left.dueDate.localeCompare(right.dueDate);
    }

    if (options.sort === "priority") {
      return priorityRank(left.priority) - priorityRank(right.priority);
    }

    if (options.sort === "alphabetical") {
      return left.title.localeCompare(right.title);
    }

    return right.createdAt.localeCompare(left.createdAt);
  });

  return sorted;
}

/**
 * Calculates task statistics.
 * @param {import("../types.js").Task[]} tasks
 * @returns {import("../types.js").TaskStats}
 */
export function getTaskStats(tasks) {
  const completed = tasks.filter((task) => task.completed).length;
  return {
    total: tasks.length,
    completed,
    active: tasks.length - completed
  };
}
