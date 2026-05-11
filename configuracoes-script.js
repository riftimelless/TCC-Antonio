const darkModeToggle = document.getElementById("darkModeToggle");

// Carregar estado do dark mode
if (localStorage.getItem("darkMode") === "true") {
  document.body.classList.add("dark-mode");
  darkModeToggle.checked = true;
}

// Ativar/Desativar Modo Escuro
darkModeToggle.addEventListener("change", () => {
  if (darkModeToggle.checked) {
    document.body.classList.add("dark-mode");
    localStorage.setItem("darkMode", "true");
  } else {
    document.body.classList.remove("dark-mode");
    localStorage.setItem("darkMode", "false");
  }
});

// Limpar dados
document.getElementById("clearData").addEventListener("click", () => {
  if (confirm("Tem certeza que deseja limpar TODOS os dados do aplicativo?")) {
    localStorage.clear();
    alert("✅ Todos os dados foram limpos!");
    window.location.href = "index.html";
  }
});