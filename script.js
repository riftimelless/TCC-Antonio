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
  const nome = "João Silva";
  const email = "joao.silva@gmail.com";
  
  salvarUsuarioSocial(nome, email, "Google");
});

document.getElementById("facebook-btn").addEventListener("click", () => {
  const nome = "Maria Oliveira";
  const email = "maria.oliveira@facebook.com";
  
  salvarUsuarioSocial(nome, email, "Facebook");
});

document.getElementById("x-btn").addEventListener("click", () => {
  const nome = "Pedro Santos";
  const email = "pedro.santos@x.com";
  
  salvarUsuarioSocial(nome, email, "X");
});

// Função auxiliar para salvar usuário de login social
function salvarUsuarioSocial(nome, email, provedor) {
  let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

  // Verifica se já existe usuário com esse email
  const usuarioExistente = usuarios.findIndex(u => u.email === email);

  if (usuarioExistente !== -1) {
    // Atualiza o usuário existente
    usuarios[usuarioExistente].nome = nome;
  } else {
    // Cria novo usuário
    usuarios.push({
      nome: nome,
      email: email,
      senha: "social_login", // senha fictícia
      provedor: provedor
    });
  }

  localStorage.setItem("usuarios", JSON.stringify(usuarios));

  message.textContent = `Conectando com ${provedor}...`;
  message.style.color = "#2f5bd3";

  setTimeout(() => {
    window.location.href = "home.html";
  }, 800);
}

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