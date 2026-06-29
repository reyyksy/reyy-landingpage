document.addEventListener('DOMContentLoaded', () => {
  const buttons = document.querySelectorAll('.link-btn');

  buttons.forEach((button) => {
    button.classList.add('is-ready');
  });
});
