const form = document.getElementById("loginForm");
const message = document.getElementById("message");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");

// Função para remover erros visuais
function removeErrorStyles() {
  emailInput.classList.remove("input-error");
  passwordInput.classList.remove("input-error");
}

// ====================== LOGIN ======================
form.addEventListener("submit", function (e) {
  e.preventDefault();

  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();

  // Remove estilos de erro anteriores
  removeErrorStyles();

  if (!email || !password) {
    message.textContent = "Preencha todos os campos.";
    message.style.color = "red";
    return;
  }

  // Pega usuários do localStorage
  const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
  const usuarioEncontrado = usuarios.find(user => user.email === email);

  if (usuarioEncontrado && usuarioEncontrado.senha === password) {
    // Login OK
    message.textContent = "Login realizado com sucesso! ✅";
    message.style.color = "green";

    setTimeout(() => {
      window.location.href = "home.html";
    }, 1000);
  } else {
    // Login falhou
    message.textContent = "Email ou senha incorretos.";
    message.style.color = "red";

    // Adiciona borda vermelha + animação de tremida
    emailInput.classList.add("input-error");
    passwordInput.classList.add("input-error");
  }
});

// Remove o erro visual quando o usuário começar a digitar
emailInput.addEventListener("input", removeErrorStyles);
passwordInput.addEventListener("input", removeErrorStyles);

// ====================== BOTÕES SOCIAIS ======================
document.getElementById("google-btn").addEventListener("click", () => {
  message.textContent = "Conectando com Google...";
  message.style.color = "#4285f4";
  setTimeout(() => {
    alert("✅ Login com Google simulado com sucesso!");
    window.location.href = "home.html";
  }, 800);
});

document.getElementById("facebook-btn").addEventListener("click", () => {
  message.textContent = "Conectando com Facebook...";
  message.style.color = "#1877f2";
  setTimeout(() => {
    alert("✅ Login com Facebook simulado com sucesso!");
    window.location.href = "home.html";
  }, 800);
});

document.getElementById("x-btn").addEventListener("click", () => {
  message.textContent = "Conectando com X...";
  message.style.color = "#000";
  setTimeout(() => {
    alert("✅ Login com X simulado com sucesso!");
    window.location.href = "home.html";
  }, 800);
});

// ====================== CRIAR CONTA ======================
document.getElementById("create-account-link").addEventListener("click", function(e) {
  e.preventDefault();
  
  const nome = prompt("Digite seu nome completo:");
  if (!nome) return;

  const email = prompt("Digite seu e-mail para cadastro:");
  if (!email) return;

  const senha = prompt("Digite uma senha (mínimo 4 caracteres):");
  if (!senha || senha.length < 4) {
    alert("Senha muito curta!");
    return;
  }

  let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

  if (usuarios.some(user => user.email === email)) {
    alert("❌ Este email já está cadastrado!");
    return;
  }

  usuarios.push({ nome, email, senha });
  localStorage.setItem("usuarios", JSON.stringify(usuarios));

  alert(`✅ Conta criada com sucesso!\nEmail: ${email}`);
});

// ====================== ESQUECEU A SENHA ======================
document.querySelector(".forgot").addEventListener("click", function(e) {
  e.preventDefault();
  const email = prompt("Digite o email da sua conta:");
  if (!email) return;

  const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
  const usuario = usuarios.find(user => user.email === email);

  if (usuario) {
    alert(`Senha recuperada!\nSua senha é: ${usuario.senha}`);
  } else {
    alert("Email não encontrado.");
  }
});