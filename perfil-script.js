let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
let usuarioIndex = usuarios.length - 1;
let usuarioAtual = usuarios[usuarioIndex];

const profilePic = document.getElementById("profilePic");
const photoInput = document.getElementById("photoInput");

const userName = document.getElementById("user-name");
const userEmail = document.getElementById("user-email");
const displayName = document.getElementById("display-name");
const displayEmail = document.getElementById("display-email");
const displayPassword = document.getElementById("display-password");

const editName = document.getElementById("edit-name");
const editEmail = document.getElementById("edit-email");
const editPassword = document.getElementById("edit-password");

const editBtn = document.getElementById("editBtn");
const saveBtn = document.getElementById("saveBtn");
const cancelBtn = document.getElementById("cancelBtn");

// ==================== CARREGAR DADOS ====================
function carregarDados() {
  if (usuarioAtual) {
    userName.textContent = usuarioAtual.nome || "Nome do Usuário";
    userEmail.textContent = usuarioAtual.email;
    displayName.textContent = usuarioAtual.nome;
    displayEmail.textContent = usuarioAtual.email;
    displayPassword.textContent = "••••••••";

    // Carrega foto se existir
    if (usuarioAtual.foto) {
      profilePic.innerHTML = `<img src="${usuarioAtual.foto}" alt="Foto de Perfil">`;
    }
  }
}
carregarDados();

// ==================== TROCA DE FOTO ====================
document.getElementById("changePhotoBtn").addEventListener("click", () => {
  photoInput.click();
});

photoInput.addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (ev) => {
      profilePic.innerHTML = `<img src="${ev.target.result}" alt="Foto">`;
      // Salva foto no localStorage
      usuarioAtual.foto = ev.target.result;
      usuarios[usuarioIndex] = usuarioAtual;
      localStorage.setItem("usuarios", JSON.stringify(usuarios));
    };
    reader.readAsDataURL(file);
  }
});

// ==================== EDITAR PERFIL ====================
editBtn.addEventListener("click", () => {
  editName.value = usuarioAtual.nome || "";
  editEmail.value = usuarioAtual.email || "";
  editPassword.value = "";

  displayName.hidden = true;
  displayEmail.hidden = true;
  displayPassword.hidden = true;

  editName.hidden = false;
  editEmail.hidden = false;
  editPassword.hidden = false;

  editBtn.hidden = true;
  saveBtn.hidden = false;
  cancelBtn.hidden = false;
});

// ==================== SALVAR ALTERAÇÕES ====================
saveBtn.addEventListener("click", () => {
  if (editName.value.trim() === "" || editEmail.value.trim() === "") {
    alert("Nome e Email são obrigatórios!");
    return;
  }

  usuarioAtual.nome = editName.value.trim();
  usuarioAtual.email = editEmail.value.trim();

  if (editPassword.value.trim() !== "") {
    usuarioAtual.senha = editPassword.value.trim();
  }

  usuarios[usuarioIndex] = usuarioAtual;
  localStorage.setItem("usuarios", JSON.stringify(usuarios));

  alert("✅ Alterações salvas com sucesso!");
  location.reload(); // Atualiza a tela
});

// ==================== CANCELAR ====================
cancelBtn.addEventListener("click", () => {
  location.reload();
});

// ==================== EXCLUIR PERFIL ====================
document.getElementById("deleteProfileBtn").addEventListener("click", () => {
  if (confirm("⚠️ Tem certeza que deseja excluir seu perfil? Essa ação não pode ser desfeita!")) {
    localStorage.removeItem("usuarios");
    alert("Perfil excluído com sucesso!");
    window.location.href = "index.html";
  }
});