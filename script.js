const form = document.getElementById("loginForm");
const message = document.getElementById("message");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  if (email && password) {
    message.textContent = "Login realizado com sucesso!";
    message.style.color = "green";
    
    setTimeout(() => {
      window.location.href = "home.html";   // ← Redireciona para a home
    }, 800);
    form.reset();
  } else {
    message.textContent = "Preencha todos os campos.";
    message.style.color = "red";
  }
});