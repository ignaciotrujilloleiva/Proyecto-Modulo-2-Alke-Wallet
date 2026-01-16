/* se deja como constante los datos en el formulario */
const form = document.getElementById("depositForm");
/* se deja como constante el input */
const inputMonto = document.getElementById("monto");
/* se deja como constante boton depositar */
const boton = document.getElementById("btnDepositar");

/* escucha los eventos del cuando se ingresan datos al input */
inputMonto.addEventListener("input", function () {
/* captura lo que esta en la caja del input */    
    let valor = inputMonto.value;
    /* Validación para habilitar el botón si el numero en la caja es mayor que 1000 */
    if (valor <= 1000) {
        boton.disabled = true;
    } else {
        boton.disabled = false;
    }
});

/* Funcion para cuando se haga click en el boton depositar */
boton.addEventListener("click", function (e) {
    e.preventDefault();

    /* se deja como variable el saldo guardado en la memoria */
    let saldoGuardado = localStorage.getItem("saldo");
    /* se convierte a numero el dato traido de la memoria */
    let saldo = Number(saldoGuardado);
    /* se deja como numero el dato ingresado en el inputMonto */
    let monto = Number(inputMonto.value);

    /* se suma y se guarda el nuevo monto y lo guarda en la memoria*/
    saldo = saldo + monto;
    localStorage.setItem("saldo", saldo);

    /* trae los datos de los movimientos desde la memoria en forma de texto */
    let datosHistorial = localStorage.getItem("movimientos");
    /* se convierte los datos del historial a una lista */
    let movimientos = JSON.parse(datosHistorial);

    /* agregamos nuevos movimiento a la lista en forma de texto */
    movimientos.push("+ $" + monto + " Depósito");

    /* guardamos la nueva lista en forma de texto */
    localStorage.setItem("movimientos", JSON.stringify(movimientos));

    /* redirección a pagina menu*/
    window.location.href = "menu.html";
});