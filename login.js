import { store } from "./script.js";

// Esta funcion recibe los datos de los inputs y comprueba que el usuario exista
// Retorna el mensaje de error o de confirmacion de acceso que se escribira en la funcion
// que lo ha llamado
// Tambien se desabilita el boton de registro y se habilitan los de lista de usuarios y
// el de borrar usuarios

function login(email, pass) {
  const data = store.find((value) => value.email === email && value.pass);
  if (!data) return "Usuario no encontrado";
  if (data.pass !== pass) return "Contraseña no válida";
  const loginButton = document.querySelector("#btn-login");
  // Las siguientes 5 lineas controlan si el usuario esta logeado o no y cambian el
  // texto y el color del boton
  loginButton.textContent = "LogOut";
  loginButton.classList.add("btn-danger");
  loginButton.classList.remove("btn-success");
  event.currentTarget.classList.add("d-none");
  event.currentTarget.classList.remove("d-flex");
  disabledEnabledButtons("#btn-list", "enabled");
  disabledEnabledButtons("#btn-delete", "enabled");
  disabledEnabledButtons("#btn-register", "disabled");
  return `Bienvenido de nuevo ${email}`;
}

// Esta funcion desabilita o habilita los botones dependiendo de los parametros que reciba
function disabledEnabledButtons(id, option) {
  const data = document.querySelector(id);
  if (option === "disabled") {
    data.setAttribute(option, true);
    return;
  }
  data.removeAttribute("disabled");
}

// Borra el mensaje de error o de confirmacion que se muestra al principio
function dataRemoveLogin() {
  const dataremove = document.querySelectorAll("#message-show p");
  dataremove.forEach((value) => {
    value.remove();
  });
}

// Comprueba que los datos recibidos sean correctos si son correctos llama a la funcion
// login que comprueba si existe el usuario. Al finalizar muestra el resultado al principio
// del formulario ya sea un error o la confirmacion de logeo

function checkDataLogin(form) {
  let datatrue = false;
  const stringResult = document.querySelector("#message-show");
  const email = document.querySelector("#login-mail");
  const pass = document.querySelector("#login-pass");
  if (email.value !== "" && pass.value !== "") {
    datatrue = true;
  }
  if (!datatrue) {
    dataRemoveLogin();
    stringResult.insertAdjacentHTML(
      "beforeend",
      "<p class='text-center'><b>Los campos email y contraseña no pueden estar vacíos</b></p>"
    );
    return;
  }
  const result = login(email.value, pass.value);
  dataRemoveLogin();
  stringResult.insertAdjacentHTML(
    "beforeend",
    `<p class="text-center"><b>${result}</b></p>`
  );
  clearInputs(form);
}

// Recibe como parametro la id del formulario a vaciar y vacia los inputs text
function clearInputs(data) {
  const clear = document.querySelectorAll(`${data} *`);
  clear.forEach((value) => {
    if (
      value.value !== "Enviar" &&
      value.value !== "Entrar" &&
      value.value !== "Borrar"
    )
      value.value = "";
  });
}

// Esta funcion desencadena todo el proceso de logeo al hacer click en el boton
// de enviar del formulario de login

function eventLogin() {
  const data = document.querySelector("#form-login");
  data.addEventListener("submit", (event) => {
    event.preventDefault();
    checkDataLogin("#form-login");
  });
}

export { eventLogin, clearInputs };
