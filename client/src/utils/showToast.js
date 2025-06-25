export function showToast(message, type = "info") {
  const toastRoot = document.getElementById("daisy-toast-root");
  if (!toastRoot) return;

  const toast = document.createElement("div");
  toast.className = `alert alert-${type} text-sm shadow-lg`;
  toast.innerHTML = `<span>${message}</span>`;

  toastRoot.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 3000);
}
