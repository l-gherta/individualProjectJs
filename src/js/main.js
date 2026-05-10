import {TaskStore} from "./state/taskStore.js";
import {EditModal} from "./ui/modal.js";
import {renderActiveTab, renderStats, renderTaskList} from "./ui/render.js";
import {showToast} from "./ui/toast.js";
import {loadTasks, saveTasks} from "./utils/storage.js";
import {buildVisibleTasks, getTaskStats} from "./utils/tasks.js";
import {validateTask} from "./utils/validation.js";

/** @type {import("./types.js").TaskFilter} */
let filter = "all";
/** @type {import("./types.js").TaskSort} */
let sort = "newest";
let query = "";

const store = new TaskStore(loadTasks());

const listElement = /** @type {HTMLUListElement} */ (document.getElementById("task-list"));
const statsElement = /** @type {HTMLElement} */ (document.getElementById("stats"));
const emptyStateElement = /** @type {HTMLElement} */ (document.getElementById("empty-state"));
const resultSummaryElement = /** @type {HTMLElement} */ (document.getElementById("result-summary"));
const createForm = /** @type {HTMLFormElement} */ (document.getElementById("create-task-form"));
const createError = /** @type {HTMLElement} */ (document.getElementById("create-error"));
const dueDateInput = /** @type {HTMLInputElement} */ (document.getElementById("dueDate"));
const searchInput = /** @type {HTMLInputElement} */ (document.getElementById("search"));
const sortInput = /** @type {HTMLSelectElement} */ (document.getElementById("sort"));
const clearCompletedButton = /** @type {HTMLButtonElement} */ (document.getElementById("clear-completed"));
const filterTabs = /** @type {NodeListOf<HTMLButtonElement>} */ (document.querySelectorAll(".tab"));
const editDialog = /** @type {HTMLDialogElement} */ (document.getElementById("edit-modal"));
const toastElement = /** @type {HTMLElement} */ (document.getElementById("toast"));

const editModal = new EditModal(editDialog);

/**
 * Returns today's date in input-compatible format.
 * @returns {string}
 */
function getTodayString() {
    return new Date().toISOString().split("T")[0];
}

/**
 * Sets default values after load or reset.
 */
function setFormDefaults() {
    dueDateInput.value = getTodayString();
}

/**
 * Persists current task state and refreshes the interface.
 */
function syncApp() {
    saveTasks(store.getTasks());
    renderApp();
}

/**
 * Re-renders list and stats from current UI state.
 */
function renderApp() {
    const tasks = store.getTasks();
    const visibleTasks = buildVisibleTasks(tasks, {filter, sort, query});
    const stats = getTaskStats(tasks);

    renderTaskList(listElement, visibleTasks);
    renderStats(statsElement, stats);
    renderActiveTab(filterTabs, filter);

    emptyStateElement.style.display = visibleTasks.length ? "none" : "block";
    emptyStateElement.hidden = visibleTasks.length !== 0;
    resultSummaryElement.textContent = `Showing ${visibleTasks.length} of ${tasks.length} task${tasks.length === 1 ? "" : "s"}.`;
}

/**
 * Collects create form fields into a normalized payload.
 * @returns {import("./types.js").TaskPayload}
 */
function getCreatePayload() {
    const formData = new FormData(createForm);
    return {
        title: String(formData.get("title") ?? ""),
        category: String(formData.get("category") ?? ""),
        priority: String(formData.get("priority") ?? ""),
        dueDate: String(formData.get("dueDate") ?? "")
    };
}

/**
 * Handles add task form submission.
 * @param {SubmitEvent} event
 */
function onCreateSubmit(event) {
    event.preventDefault();
    const payload = getCreatePayload();
    const {isValid, errors} = validateTask(payload);

    if (!isValid) {
        createError.textContent = Object.values(errors)[0];
        return;
    }

    createError.textContent = "";
    store.addTask(payload);
    createForm.reset();
    setFormDefaults();
    syncApp();
    showToast(toastElement, "Task created and saved.");
}

/**
 * Handles clicks on task action buttons with event delegation.
 * @param {MouseEvent} event
 */
function onTaskAction(event) {
    const target = /** @type {HTMLElement} */ (event.target);
    const button = target.closest("button[data-action]");
    if (!button) return;

    const card = button.closest("[data-task-id]");
    if (!card) return;

    const taskId = card.getAttribute("data-task-id");
    if (!taskId) return;

    const action = button.getAttribute("data-action");
    if (action === "toggle") {
        store.toggleTask(taskId);
        syncApp();
        showToast(toastElement, "Task status updated.");
        return;
    }

    if (action === "delete") {
        store.deleteTask(taskId);
        syncApp();
        showToast(toastElement, "Task deleted.");
        return;
    }

    if (action === "edit") {
        const task = store.getTasks().find((item) => item.id === taskId);
        if (!task) return;

        editModal.open({
            id: task.id,
            title: task.title,
            category: task.category,
            priority: task.priority,
            dueDate: task.dueDate
        });
    }
}

/**
 * Handles edit task submission.
 * @param {SubmitEvent} event
 */
function onEditSubmit(event) {
    event.preventDefault();
    const payload = editModal.getPayload();
    const {isValid, errors} = validateTask(payload);

    if (!isValid) {
        editModal.showError(Object.values(errors)[0]);
        return;
    }

    store.updateTask(payload.id, payload);
    editModal.close();
    syncApp();
    showToast(toastElement, "Task updated.");
}

/**
 * Initializes event listeners.
 */
function bindEvents() {
    createForm.addEventListener("submit", onCreateSubmit);
    listElement.addEventListener("click", onTaskAction);

    searchInput.addEventListener("input", () => {
        query = searchInput.value;
        renderApp();
    });

    sortInput.addEventListener("change", () => {
        sort = /** @type {import("./types.js").TaskSort} */ (sortInput.value);
        renderApp();
    });

    filterTabs.forEach((tab) => {
        tab.addEventListener("click", () => {
            filter = /** @type {import("./types.js").TaskFilter} */ (tab.dataset.filter ?? "all");
            renderApp();
        });
    });

    clearCompletedButton.addEventListener("click", () => {
        const removed = store.clearCompleted();
        syncApp();
        showToast(toastElement, removed ? "Completed tasks removed." : "No completed tasks to remove.");
    });

    editModal.form.addEventListener("submit", onEditSubmit);
    editModal.bindClose();
}

setFormDefaults();
bindEvents();
renderApp();
