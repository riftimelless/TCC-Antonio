const menuBtn = document.getElementById('menuBtn');
const closeBtn = document.getElementById('closeBtn');
const sidebar = document.getElementById('sidebar');
const overlay = document.getElementById('overlay');

// Abrir menu
menuBtn.addEventListener('click', () => {
  sidebar.classList.add('open');
  overlay.classList.add('active');
});

// Fechar menu
function closeMenu() {
  sidebar.classList.remove('open');
  overlay.classList.remove('active');
}

closeBtn.addEventListener('click', closeMenu);
overlay.addEventListener('click', closeMenu);

// Sair
document.getElementById('logout').addEventListener('click', () => {
  if (confirm('Deseja realmente sair?')) {
    window.location.href = 'index.html';
  }
});