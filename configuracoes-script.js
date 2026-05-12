// Limpar dados
document.getElementById("clearData").addEventListener("click", () => {
  if (confirm("Tem certeza que deseja limpar TODOS os dados do app?")) {
    localStorage.clear();
    alert("✅ Todos os dados foram limpos!");
    window.location.href = "index.html";
  }
});