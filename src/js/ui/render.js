/**
 * Escapes user input before injecting it into HTML.
 * @param {string} value
 * @returns {string}
 */
function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

/**
 * Formats ISO-like dates for user-facing output.
 * @param {string} value
 * @returns {string}
 */
function formatDate(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  }).format(date);
}

/**
 * Creates a task card element.
 * @param {import("../types.js").Task} task
 * @returns {HTMLLIElement}
 */
function createTaskCard(task) {
  const li = document.createElement("li");
  li.className = `task-card task-card--priority-${task.priority.toLowerCase()}${task.completed ? " task-card--completed" : ""}`;
  li.dataset.taskId = task.id;

  li.innerHTML = `
    <div class="task-card__top">
      <div>
        <p class="task-card__title ${task.completed ? "task-card__title--done" : ""}">${escapeHtml(task.title)}</p>
      </div>
      <span class="tag tag--${task.priority.toLowerCase()}">${task.priority}</span>
    </div>
    <div class="task-card__facts" aria-label="Task details">
      <span class="task-card__fact-label">Created</span>
      <span class="task-card__fact-value">${formatDate(task.createdAt)}</span>
      <span class="task-card__fact-label">Due</span>
      <span class="task-card__fact-value">${formatDate(task.dueDate)}</span>
    </div>
    <div class="task-card__meta">
      <span class="tag">${escapeHtml(task.category)}</span>
      <span class="tag ${task.completed ? "tag--status-completed" : "tag--status-active"}">${task.completed ? "Completed" : "Active"}</span>
      <span>Due ${formatDate(task.dueDate)}</span>
    </div>
    <div class="task-card__footer">
      <div class="task-card__actions">
        <button class="btn btn--ghost" data-action="toggle" type="button">${task.completed ? "Mark Active" : "Mark Done"}</button>
        <button class="btn btn--ghost" data-action="edit" type="button">Edit</button>
      </div>
      <button class="btn btn--danger" data-action="delete" type="button">Delete</button>
    </div>
  `;

  return li;
}

/**
 * Renders the whole task list.
 * @param {HTMLElement} listElement
 * @param {import("../types.js").Task[]} tasks
 */
export function renderTaskList(listElement, tasks) {
  listElement.innerHTML = "";
  const fragment = document.createDocumentFragment();

  tasks.forEach((task) => {
    fragment.appendChild(createTaskCard(task));
  });

  listElement.appendChild(fragment);
}

/**
 * Renders summary statistic cards.
 * @param {HTMLElement} statsElement
 * @param {import("../types.js").TaskStats} stats
 */
export function renderStats(statsElement, stats) {
  statsElement.innerHTML = `
    <div class="chip">
      <strong>${stats.total}</strong>
      <span>Total tasks</span>
    </div>
    <div class="chip">
      <strong>${stats.active}</strong>
      <span>Currently active</span>
    </div>
    <div class="chip">
      <strong>${stats.completed}</strong>
      <span>Completed items</span>
    </div>
  `;
}

/**
 * Updates tab states based on the selected filter.
 * @param {NodeListOf<HTMLButtonElement>} tabs
 * @param {import("../types.js").TaskFilter} activeFilter
 */
export function renderActiveTab(tabs, activeFilter) {
  tabs.forEach((tab) => {
    const isActive = tab.dataset.filter === activeFilter;
    tab.classList.toggle("tab--active", isActive);
    tab.setAttribute("aria-selected", String(isActive));
  });
}
