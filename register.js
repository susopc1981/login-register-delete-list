import { store } from "./script.js";
import { clearInputs } from "./login.js";

// Recibe los parametros del formulario y comprueba que el usuario no exista en la base
// de datos. Si no existe lo añade. Finalmente retorna el mensaje de confirmacion o el
// de fallo

function register(email, pass, age, name, surname) {
  const data = store.find((value) => value.email === email);
  if (data) return `El usuario ${data.email} ya existe`;
  const finalUser = { email, pass, age, name, surname };
  store.push(finalUser);
  event.currentTarget.style = "display:none;";
  return `Usuario ${email} registrado con éxito`;
}

// Captura los datos de los inputs y hace las comprobaciones pertinentes. Que sea mayor de
// 18 años, las contraseñas deben coincidir y que los campos nombre, email y contraseña
// no esten vacios. Finalmente retorna el mensaje de fallo o confirmacion
// Al finalizar la funcion, te muestra el formulario de login

function checkDataRegister(form) {
  let datatrue = false;
  const message = document.querySelector("#message-show");
  const name = document.querySelector("#register-name");
  const pass = document.querySelector("#register-pass");
  const pass2 = document.querySelector("#register-pass2");
  const age = document.querySelector("#register-age");
  const surname = document.querySelector("#register-surname");
  const email = document.querySelector("#register-mail");
  const finalAge = Number.isNaN(parseInt(age.value));
  if (parseInt(age.value) < 18 || finalAge === true) {
    dataRemoveRegister();
    message.insertAdjacentHTML(
      "beforeend",
      "<p class='text-center'><b>La edad debe ser un numero igual o mayor de 18</b></p>"
    );
    return;
  }
  if (pass.value !== pass2.value) {
    dataRemoveRegister();
    message.insertAdjacentHTML(
      "beforeend",
      "<p class='text-center'><b>Las contraseñas deben coincidir</b></p>"
    );
    return;
  }
  if (name.value !== "" && pass.value !== "" && email.value !== "")
    datatrue = true;
  if (!datatrue) {
    dataRemoveRegister();
    message.insertAdjacentHTML(
      "beforeend",
      `<p class='text-center'><b>Los campos nombre, email y contraseña no pueden estar vacíos</b></p>`
    );
    return;
  }

  // Si los datos son correctos, llama a la funcion register para que añadir el usuario
  // a la base de datos
  const result = register(
    email.value,
    pass.value,
    age.value,
    name.value,
    surname.value
  );
  dataRemoveRegister();
  message.insertAdjacentHTML(
    "beforeend",
    `<p class='text-center'><b>${result}</b></p>`
  );
  const loginForm = document.querySelector("#form-login");
  const registerForm = document.querySelector("#form-register");
  loginForm.classList.remove("d-none");
  loginForm.classList.add("d-flex");
  registerForm.classList.remove("d-flex");
  registerForm.classList.add("d-none");
  clearInputs(form);
}

// Borra el mensaje que de fallo
function dataRemoveRegister() {
  const dataremove = document.querySelectorAll("#message-show p");
  dataremove.forEach((value) => {
    value.remove();
  });
}

// Esta funcion desencadena todo el proceso de registro al hacer click en el boton
// de enviar del formulario de registro

function eventRegister() {
  const data = document.querySelector("#form-register");
  data.addEventListener("submit", (event) => {
    event.preventDefault();
    checkDataRegister("#form-register");
  });
}

export { eventRegister };
