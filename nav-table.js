import { store } from "./script.js";
import { clearNavTable, listUsers } from "./list.js";

// Estas 4 funciones manejan la barra de navegacion de la tabla de usuarios. Cada vez que
// se hace click en un boton de la barra, recarga los datos y llama a la funcion que
// muestra los datos y calcula los parametros que esta necesita para enviarselos

function nextPage() {
  const data = document.querySelector("#next");
  const shown = document.querySelector("#shown-select");
  data.addEventListener("click", (event) => {
    event.preventDefault();
    const newstart = document.querySelector("#current").getAttribute("value");
    const start = parseInt(newstart) * parseInt(shown.value);
    clearNavTable();
    listUsers(start, parseInt(shown.value) + start - 1);
  });
}

function previousPage() {
  const data = document.querySelector("#previous");
  const shown = document.querySelector("#shown-select");
  data.addEventListener("click", (event) => {
    event.preventDefault();
    const newStart = document.querySelector("#current").getAttribute("value");
    const newPage = parseInt(newStart) - 2;
    const start = newPage * parseInt(shown.value);
    clearNavTable();
    listUsers(start, parseInt(shown.value) + start - 1);
  });
}

function firstPage() {
  const data = document.querySelector("#first");
  const shown = document.querySelector("#shown-select");
  data.addEventListener("click", (event) => {
    event.preventDefault();
    clearNavTable();
    listUsers(0, parseInt(shown.value) - 1);
  });
}

function lastPage() {
  const data = document.querySelector("#last");
  const shown = document.querySelector("#shown-select");
  data.addEventListener("click", (event) => {
    event.preventDefault();
    clearNavTable();
    let result = store.length % shown.value;
    if (result === 0) result = shown.value;
    listUsers(store.length - result, store.length - 1);
  });
}

export { lastPage, firstPage, nextPage, previousPage };
