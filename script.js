
document.addEventListener("DOMContentLoaded", function () {
    // ---- INICIO DE SESIÓN ----
    const loginForm = document.getElementById("form-lx28");
    if (loginForm) {
        loginForm.addEventListener("submit", function (event) {
            event.preventDefault();
            const username = document.getElementById("user-vb62").value.trim();
            const password = document.getElementById("pass-kt84").value.trim();
            const loginMessage = document.getElementById("loginMessage");

            if (username === "" || password === "") {
                loginMessage.textContent = "Por favor, completa todos los campos.";
                loginMessage.style.color = "red";
                return;
            }

            // Simulación de autenticación con localStorage
            const users = JSON.parse(localStorage.getItem("users")) || [];
            const user = users.find(user => user.username === username && user.password === password);

            if (user) {
                localStorage.setItem("loggedIn", "true");
                window.location.href = "panel.html";
            } else {
                loginMessage.textContent = "Usuario o contraseña incorrectos.";
                loginMessage.style.color = "red";
            }
        });
    }

    // ---- REGISTRO DE USUARIOS ----
    const registerForm = document.getElementById("registroForm");
    if (registerForm) {
        registerForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const username = document.getElementById("username").value.trim();
            const password = document.getElementById("password").value.trim();
            const confirmPassword = document.getElementById("confirm-password").value.trim();
            const role = document.getElementById("role").value;
            const registroMessage = document.getElementById("registroMessage");

            // Validaciones
            if (username === "" || password === "" || confirmPassword === "") {
                registroMessage.textContent = "Todos los campos son obligatorios.";
                registroMessage.style.color = "red";
                return;
            }

            if (password !== confirmPassword) {
                registroMessage.textContent = "Las contraseñas no coinciden.";
                registroMessage.style.color = "red";
                return;
            }

            if (password.length < 6) {
                registroMessage.textContent = "La contraseña debe tener al menos 6 caracteres.";
                registroMessage.style.color = "red";
                return;
            }

            const users = JSON.parse(localStorage.getItem("users")) || [];
            const userExists = users.some(user => user.username === username);

            if (userExists) {
                registroMessage.textContent = "El nombre de usuario ya está registrado.";
                registroMessage.style.color = "red";
                return;
            }

            // Guardar usuario (esto será reemplazado por el backend en el futuro)
            users.push({ username, password, role });
            localStorage.setItem("users", JSON.stringify(users));

            registroMessage.textContent = "Registro exitoso. Redirigiendo...";
            registroMessage.style.color = "green";

            setTimeout(() => {
                window.location.href = "index.html";
            }, 2000);
        });
    }
});
