const bar = document.getElementById('bar');
const openBtn = document.getElementById('open');
const input = document.getElementById('q');
const clear = document.getElementById('clear');
const hint = document.getElementById('hint');

const isOpen = () => bar.classList.contains('active');

function openBar() {
  bar.classList.add('active');
  openBtn.setAttribute('aria-expanded', 'true');
  input.tabIndex = clear.tabIndex = 0;            // reachable by keyboard only when open
  hint.innerHTML = 'Press <kbd>Esc</kbd> to close';
  setTimeout(() => input.focus(), 350);           // wait for the bar to start growing
}

function closeBar() {
  input.value = '';
  bar.classList.remove('active');
  openBtn.setAttribute('aria-expanded', 'false');
  input.tabIndex = clear.tabIndex = -1;
  input.blur();
  hint.innerHTML = 'Click the icon or press <kbd>/</kbd>';
}

openBtn.addEventListener('click', () => (isOpen() ? input.focus() : openBar()));

clear.addEventListener('click', () => {           // 1st click clears the text, 2nd closes the bar
  if (input.value) { input.value = ''; input.focus(); }
  else closeBar();
});

input.addEventListener('blur', () => {            // click outside with empty text = close
  setTimeout(() => {
    if (!input.value && !bar.contains(document.activeElement)) closeBar();
  }, 150);
});

bar.addEventListener('submit', e => {
  e.preventDefault();
  hint.textContent = input.value ? `Searching for "${input.value}"...` : 'Type something first';
});

addEventListener('keydown', e => {
  if (e.key === 'Escape' && isOpen()) closeBar();
  if (e.key === '/' && !isOpen()) { e.preventDefault(); openBar(); }
});
