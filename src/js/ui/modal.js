/**
 * Manages open/close and data population for the task edit modal.
 */
export class EditModal {
  /**
   * @param {HTMLDialogElement} dialog
   */
  constructor(dialog) {
    this.dialog = dialog;
    this.form = /** @type {HTMLFormElement} */ (dialog.querySelector("#edit-task-form"));
    this.idField = /** @type {HTMLInputElement} */ (dialog.querySelector("#edit-id"));
    this.titleField = /** @type {HTMLInputElement} */ (dialog.querySelector("#edit-title"));
    this.categoryField = /** @type {HTMLSelectElement} */ (dialog.querySelector("#edit-category"));
    this.priorityField = /** @type {HTMLSelectElement} */ (dialog.querySelector("#edit-priority"));
    this.dueDateField = /** @type {HTMLInputElement} */ (dialog.querySelector("#edit-dueDate"));
    this.errorField = /** @type {HTMLParagraphElement} */ (dialog.querySelector("#edit-error"));
    this.closeButton = /** @type {HTMLButtonElement} */ (dialog.querySelector("#close-modal"));
  }

  /**
   * Registers internal modal events.
   */
  bindClose() {
    this.closeButton.addEventListener("click", () => this.close());
    this.dialog.addEventListener("click", (event) => {
      if (event.target === this.dialog) {
        this.close();
      }
    });
  }

  /**
   * Opens modal with task values.
   * @param {import("../types.js").EditableTaskPayload} task
   */
  open(task) {
    this.idField.value = task.id;
    this.titleField.value = task.title;
    this.categoryField.value = task.category;
    this.priorityField.value = task.priority;
    this.dueDateField.value = task.dueDate;
    this.errorField.textContent = "";
    this.dialog.showModal();
  }

  /**
   * Closes modal.
   */
  close() {
    if (this.dialog.open) {
      this.dialog.close();
    }
    this.form.reset();
    this.errorField.textContent = "";
  }

  /**
   * Shows a validation error inside modal.
   * @param {string} message
   */
  showError(message) {
    this.errorField.textContent = message;
  }

  /**
   * Returns current form payload.
   * @returns {import("../types.js").EditableTaskPayload}
   */
  getPayload() {
    return {
      id: this.idField.value,
      title: this.titleField.value,
      category: this.categoryField.value,
      priority: /** @type {import("../types.js").TaskPriority} */ (this.priorityField.value),
      dueDate: this.dueDateField.value
    };
  }
}
