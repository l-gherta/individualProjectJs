const ALLOWED_CATEGORIES = ["Study", "Work", "Personal", "Health"];
const ALLOWED_PRIORITIES = ["High", "Medium", "Low"];

/**
 * Validates a task payload and returns field-level messages.
 * @param {import("../types.js").TaskPayload | import("../types.js").EditableTaskPayload} payload
 * @returns {{isValid:boolean,errors:import("../types.js").ValidationErrors}}
 */
export function validateTask(payload) {
  /** @type {import("../types.js").ValidationErrors} */
  const errors = {};
  const trimmedTitle = payload.title.trim();

  if (!trimmedTitle) {
    errors.title = "Title is required.";
  } else if (trimmedTitle.length < 3) {
    errors.title = "Title must have at least 3 characters.";
  } else if (trimmedTitle.length > 80) {
    errors.title = "Title must be shorter than 80 characters.";
  }

  if (!ALLOWED_CATEGORIES.includes(payload.category)) {
    errors.category = "Please choose a valid category.";
  }

  if (!ALLOWED_PRIORITIES.includes(payload.priority)) {
    errors.priority = "Please choose a valid priority.";
  }

  if (!payload.dueDate) {
    errors.dueDate = "Due date is required.";
  } else {
    const parsedDate = new Date(payload.dueDate);
    if (Number.isNaN(parsedDate.getTime())) {
      errors.dueDate = "Due date format is invalid.";
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}
