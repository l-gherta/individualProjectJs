let timeoutId;

/**
 * Displays short user feedback in a toast.
 * @param {HTMLElement} toastElement
 * @param {string} message
 */
export function showToast(toastElement, message) {
  clearTimeout(timeoutId);
  toastElement.textContent = message;
  toastElement.classList.add("toast--show");

  timeoutId = setTimeout(() => {
    toastElement.classList.remove("toast--show");
  }, 1800);
}
