/* Capturamos la lista UL */
const lista = document.getElementById("listMovimientos");

/* Obtenemos los movimientos guardados en localstorage */
const movimientos = JSON.parse(localStorage.getItem("movimientos")) || [];

/* Recorremos cada movimiento en la lista del localstorage*/
movimientos.forEach(movimiento => {

    /* Crea un nuevo elemento a la lista por cada movimiento */
    const li = document.createElement("li");

    /* Aplicamos clase Bootstrap para que se vea como lista*/
    li.className = "list-group-item";

    /* le asigna el texto de la lista */
    li.textContent = movimiento;

    /* agrega un hijo en la lista con el texto del movimiento */
    lista.appendChild(li);
});
