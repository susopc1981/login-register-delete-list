import { store } from "./script.js";
import { deleteUserByMail } from "./delete.js";

// Esta funcion muestra los usuarios en una tabla dependiendo de los parametros que recibe,
// estos se calculan en otra funcion, en esta recibe el index del primer parametro y el del
// ultimo. Previamente vacía la tabla, ya que cada iteracion en la barra de navegacion o
// en las opciones de muestreo recarga la tabla nuevamente
// Tambien calcula el total de paginas que se crean en relacion a la opcion de mostrar
// entradas y las muestra en la barra de navegacion de la tabla de usuarios
function listUsers(start, end) {
  const eraseTable = document.querySelectorAll("tbody *");
  if (eraseTable) {
    eraseTable.forEach((value) => value.remove());
  }
  const table = document.querySelector("tbody");
  store.forEach((value, index) => {
    if (index >= start && index <= end) {
      const stringHtml = `<tr id="${value.email}"><th scope="row">${
        index + 1
      }</th><td>${value.name}</td><td>${value.surname}</td><td>${
        value.email
      }</td><td>${value.age}</td></tr>`;

      table.insertAdjacentHTML("beforeend", stringHtml);
    }
  });
  const current = document.querySelector("#current");
  const total = document.querySelector("#total");
  const totalPage = Math.ceil(
    store.length / parseInt(document.querySelector("#shown-select").value)
  );
  total.insertAdjacentHTML("beforeend", ` ${totalPage}`);
  total.setAttribute("value", totalPage);
  let page = Math.ceil(
    end / parseInt(document.querySelector("#shown-select").value)
  );
  if (end === store.length - 1) page = totalPage;
  current.insertAdjacentHTML("beforeend", ` ${page}`);
  current.setAttribute("value", page);
  checkButton();
}

// Controla la pagina en que estas, el total de paginas y en funcion de eso, y llama
// a la funcion que deshabilita o habilita los botones de navegacion de la tabla de usuarios
function checkButton() {
  const prev = document.querySelector("#previous");
  prev.removeAttribute("disabled");
  const current = document.querySelector("#current");
  let dataCurrent;
  !current ? (dataCurrent = 1) : (dataCurrent = current.getAttribute("value"));
  let dataTotal;
  const total = document.querySelector("#total");
  !total ? (dataTotal = 1) : (dataTotal = total.getAttribute("value"));
  const next = document.querySelector("#next");
  next.removeAttribute("disabled");
  const final = document.querySelector("#last");
  final.removeAttribute("disabled");
  const first = document.querySelector("#first");
  first.removeAttribute("disabled");
  if (dataCurrent === dataTotal && dataTotal === "1") {
    disabledButton("next");
    disabledButton("previous");
    disabledButton("first");
    disabledButton("final");
    return;
  }
  if (dataCurrent === "1" || dataCurrent === "null") {
    disabledButton("first");
    disabledButton("previous");
  }
  if (dataCurrent === dataTotal) {
    disabledButton("last");
    disabledButton("next");
  }
}

// Funcion que recibe el id del boton que quiere deshabilitar
function disabledButton(id) {
  const data = document.querySelector(`#${id}`);
  data.setAttribute("disabled", true);
}

// Borra el texto que se muestra en la barra de navegacion
function clearNavTable() {
  const start = document.querySelector("#current");
  const final = document.querySelector("#total");
  const showing = document.querySelector("#showing");
  const of = document.querySelector("#of");
  start.remove();
  final.remove();
  showing.insertAdjacentHTML("afterend", `<label id="current"></label>`);
  of.insertAdjacentHTML("afterend", `<label id="total"></label>`);
}

// Funcion que recarga los datos de la tabla de usuarios en funcion de las entradas que
// le indiques que muestre por página
function changeQtyUsers() {
  const data = document.querySelector("#shown-select");
  data.addEventListener("change", (event) => {
    event.preventDefault();
    clearNavTable();
    listUsers(0, data.value - 1);
  });
}

// Funcion que crea un evento que salta cuando haces click en un usuario en la tabla
// y guarda el email, al mismo tiempo habilita un boton para borrar el usuario.

function selectUserTable() {
  const data = document.querySelector("#tableusers");
  data.addEventListener("click", (event) => {
    event.preventDefault();
    const email = event.target.parentNode;
    const finalMail = email.getAttribute("id");
    const table = document.querySelector("tbody");
    const button = document.querySelector("#deleteuser");
    button.removeAttribute("disabled");
    table.setAttribute("value", finalMail);
  });
}

// Funcion que elimina el usuario que se selecciono en la tabla anteriormente.
// Al eliminarlo, recarga el resto de usuarios en la tabla

function deleteUserTable() {
  const data = document.querySelector("#deleteuser");
  const qty = document.querySelector("#shown-select");
  data.addEventListener("click", (event) => {
    event.preventDefault();
    const data = document.querySelector("tbody");
    const finalEmail = data.getAttribute("value");
    deleteUserByMail(finalEmail);
    clearNavTable();
    listUsers(0, qty.value - 1);
  });
}

export {
  listUsers,
  clearNavTable,
  changeQtyUsers,
  selectUserTable,
  deleteUserTable,
};
