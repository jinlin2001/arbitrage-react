declare var bootstrap: any;
const container = document.querySelector('.toast-container');
const toast_css =
  'toast align-items-center fw-bold m-0 border-0 rounded-0 bg-dark';
const WARNING_CSS = `${toast_css} text-warning`;
const INFO_CSS = `${toast_css} text-white`;

function showToast(msg: string, autohide = true) {
  const toast = document.createElement('div');
  toast.className = autohide ? WARNING_CSS : INFO_CSS;
  toast.innerHTML = `<div class="d-flex"><div class="toast-body text-break">${msg}</div><button type="button" class="btn-close btn-close-white m-auto shadow-none" data-bs-dismiss="toast"></button>
  </div>`;
  container!.appendChild(toast);
  new bootstrap.Toast(toast, { autohide }).show();
}
export { showToast };
