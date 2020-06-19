import { store, delUsers } from "./script.js";

// Esta funcion coge todos los emails de la base de datos y los añade al select, previamente
// lo vacía para no duplicar los datos cada vez que se llame a la funcion

function loadElementsSelect() {
  const data = document.querySelector("#users");
  const erase = document.querySelectorAll("#users *");
  erase.forEach((value) => value.remove());
  store.forEach((value, index) => {
    if (index === 0) {
      data.insertAdjacentHTML(
        "beforeend",
        `<option value="${index}" selected>${value.email}</option>`
      );
    } else {
      data.insertAdjacentHTML(
        "beforeend",
        `<option value="${index}">${value.email}</option>`
      );
    }
  });
}

// Busca el select y lo retorna
function getDataSelect() {
  const data = document.querySelector("#users");
  return data.value;
}

// Funcion que busca el indice del email que recibe y llama a la funcion de eliminar
function deleteUserByMail(email) {
  const result = store.findIndex((value) => value.email === email);
  deleteUser(result);
}

// Funcion que elimina un usuario recibiendo el indice que ocupa en la base de datos

function deleteUser(deleteIndex) {
  let user;
  !deleteIndex ? (user = getDataSelect()) : (user = deleteIndex);
  const data = store.splice(user, 1);
  delUsers.push(data[0]);
  loadElementsSelect();
  const removeMessage = document.querySelector("#message-show p");
  if (removeMessage) removeMessage.remove();
  const message = document.querySelector("#message-show");
  const stringMessage = `<p class="text-center"><b>Usuario ${data[0].email} borrado con éxito</b></p>`;
  message.insertAdjacentHTML("beforeend", stringMessage);
  const button = document.querySelector("#deleteuser");
  button.setAttribute("disabled", true);
}

// Esta funcion recibe como parametro el objeto del array de usuasrios y muestra los datos
// en lo inputs de la pagina

function showDataUserToDelete(objData) {
  const email = document.querySelector("#deleteEmail");
  const name = document.querySelector("#deleteName");
  const surname = document.querySelector("#deleteSurname");
  const age = document.querySelector("#deleteAge");
  email.value = objData.email;
  name.value = objData.name;
  surname.value = objData.surname;
  age.value = objData.age;
}

// Esta funcion carga inicialmente los usuarios en un select, luego al hacer click en el
// boton de borrar del formulario, desencadena todo el proceso de eliminar un usuario.
// Finalmente deshabilita el boton de enviar que no se activara hasta que se seleccione un
// nuevo usuario y oculta los inputs que muestran los datos de los usuarios
function eventDelete() {
  loadElementsSelect();
  const data = document.querySelector("#form-delete");
  data.addEventListener("submit", (event) => {
    event.preventDefault();
    deleteUser();
    const clearInputs = document.querySelectorAll("#userdata [type='text']");
    clearInputs.forEach((value) => {
      value.value = "";
    });
    const data = document.querySelector("#form-delete [type='submit']");
    data.setAttribute("disabled", true);
    const clearSelected = document.querySelector("#users");
    clearSelected.value = "";
    const hideData = document.querySelector("#userdata");
    hideData.classList.remove("d-flex");
    hideData.classList.add("d-none");
  });
}
// Funcion que muestra los datos del usuario que se ha seleccionado en el select

function changeUserToDelete() {
  const selectUser = document.querySelector("#users");
  selectUser.addEventListener("change", (event) => {
    event.preventDefault();
    const data = document.querySelector("#userdata");
    data.classList.remove("d-none");
    data.classList.add("d-flex");
    const email = selectUser.value;
    showDataUserToDelete(store[email]);
    const enableButton = document.querySelector("#submit-delete");
    enableButton.removeAttribute("disabled");
  });
}

export {
  loadElementsSelect,
  deleteUser,
  deleteUserByMail,
  showDataUserToDelete,
  eventDelete,
  changeUserToDelete,
};
