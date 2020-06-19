const store = [
  {
    email: "susopc1981@gmail.com",
    pass: "a",
    age: 19,
    name: "Suso",
    surname: "",
  },
  {
    email: "juanandres@hotmail.com",
    pass: "pass2",
    age: 20,
    name: "Juan Andres",
    surname: "",
  },
  {
    email: "carlinhos@live.com",
    pass: "pass3",
    age: 33,
    name: "Carlos",
    surname: "",
  },
  {
    email: "pericodelospalotes@gmail.com",
    pass: "pass4",
    age: 55,
    name: "Perico",
    surname: "",
  },
  {
    email: "odooutrodia@nonmeacordo.com",
    pass: "pass5",
    age: 34,
    name: "O outro",
    surname: "",
  },
  {
    email: "felipe@gmail.com",
    pass: "password",
    age: 19,
    name: "Felipe",
    surname: "",
  },
  {
    email: "maria@hotmail.com",
    pass: "pass2",
    age: 20,
    name: "Maria Jose",
    surname: "",
  },
  {
    email: "Luis@live.com",
    pass: "pass3",
    age: 33,
    name: "Luis",
    surname: "",
  },
  {
    email: "miguel@gmail.com",
    pass: "pass4",
    age: 55,
    name: "Miguel",
    surname: "",
  },
  {
    email: "juan1@nonmeacordo.com",
    pass: "pass5",
    age: 34,
    name: "juan1",
    surname: "",
  },
  {
    email: "juan2@nonmeacordo.com",
    pass: "pass5",
    age: 34,
    name: "juan",
    surname: "",
  },
];
const delUsers = [];

import { eventLogin } from "./login.js";
import { eventRegister } from "./register.js";
import { eventDelete, changeUserToDelete } from "./delete.js";
import {
  listUsers,
  clearNavTable,
  changeQtyUsers,
  selectUserTable,
  deleteUserTable,
} from "./list.js";
import { nextPage, previousPage, lastPage, firstPage } from "./nav-table.js";

// Funcion que muestra la tabla del listado de usuarios y carga los datos en dicha tabla
//al hacer click en el boton de listado

function eventListUsers() {
  const data = document.querySelector("#btn-list");
  const shown = document.querySelector("#shown-select");
  data.addEventListener("click", (event) => {
    event.preventDefault();
    data.setAttribute("disabled", true);
    clearNavTable();
    listUsers(0, shown.value - 1);
    const removeMessage = document.querySelector("#message-show p");
    if (removeMessage) removeMessage.remove(); // Elimina el contenido del div de mostrar errores
    const hideFormDelete = document.querySelector("#optionDelete");
    const list = document.querySelector("#shown");
    hideFormDelete.classList.remove("d-flex");
    hideFormDelete.classList.add("d-none");
    list.classList.remove("d-none");
  });
}

// Funcion que muestra el formulario de registro y oculta el de login, dado que solo
// se puede acceder a este desde la principal que es cuando se muestra el formulario
// de login

function showRegisterForm() {
  const data = document.querySelector("#btn-register");
  data.addEventListener("click", (event) => {
    event.preventDefault();
    const dataShow = document.querySelector("#form-register");
    const login = document.querySelector("#form-login");
    const removeMessage = document.querySelector("#message-show p");
    if (removeMessage) removeMessage.remove(); // Elimina el contenido del div de mostrar errores
    login.classList.remove("d-flex");
    login.classList.add("d-none");
    dataShow.classList.remove("d-none");
    dataShow.classList.add("d-flex");
  });
}

// Muestra el formulario de login y oculta el de registro

function showLoginForm() {
  const data = document.querySelector("#btn-login");
  data.addEventListener("click", (event) => {
    event.preventDefault();
    const dataShow = document.querySelector("#form-login");
    const register = document.querySelector("#form-register");
    const list = document.querySelector("#shown");
    const deleted = document.querySelector("#form-delete");
    list.classList.remove("d-flex");
    list.classList.add("d-none");
    if (data.textContent === "LogOut") {
      // Si esta logeado, se desconecta "virtualmente"
      data.textContent = "LogIn";
      data.classList.remove("btn-danger");
      data.classList.add("btn-success");
    }
    const btnReg = document.querySelector("#btn-register");
    btnReg.removeAttribute("disabled");
    const btnList = document.querySelector("#btn-list");
    btnList.setAttribute("disabled", true);
    const btnDel = document.querySelector("#btn-delete");
    btnDel.setAttribute("disabled", true);
    const removeMessage = document.querySelector("#message-show p");
    if (removeMessage) removeMessage.remove(); // Elimina el contenido del div de mostrar errores
    dataShow.classList.remove("d-none");
    dataShow.classList.add("d-flex");
    register.classList.remove("d-flex");
    register.classList.add("d-none");
    deleted.classList.add("d-none");
    deleted.classList.remove("d-flex");
  });
}

// Funcion que muestra el formulario para eliminar un usuario de un select
// Oculta el resto de formulario

function selectUserToDelete() {
  const data = document.querySelector("#btn-delete");
  data.addEventListener("click", (event) => {
    event.preventDefault();
    const dataTotal = document.querySelector("#optionDelete");
    const showForm = document.querySelector("#form-delete");
    const hideList = document.querySelector("#shown");
    const showBtnList = document.querySelector("#btn-list");
    const removeMessage = document.querySelector("#message-show p");
    if (removeMessage) removeMessage.remove(); // Elimina el contenido del div de mostrar errores
    showBtnList.removeAttribute("disabled", true);
    dataTotal.classList.remove("d-none");
    dataTotal.classList.add("d-flex");
    hideList.classList.add("d-none");
    showForm.classList.add("d-flex");
    showForm.classList.remove("d-none");
    const clearSelected = document.querySelector("#users");
    clearSelected.value = "";
  });
}

changeUserToDelete();
selectUserToDelete();
deleteUserTable();
selectUserTable();
showLoginForm();
showRegisterForm();
lastPage();
firstPage();
previousPage();
nextPage();
changeQtyUsers();
eventLogin();
eventRegister();
eventDelete();
eventListUsers();

export { store, delUsers };
