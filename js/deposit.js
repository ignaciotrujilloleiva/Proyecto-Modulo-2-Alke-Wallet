/* Espera a que todo el documento HTML esté completamente cargado */
$(document).ready(function () {
    /* Selectores de jQuery */
    const $inputMonto = $("#monto");
    const $boton = $("#btnDepositar");

    /* Escucha los eventos cuando se ingresan datos al input */
    $inputMonto.on("input", function () {
        /* Capturamos el valor actual del input */
        let valor = $(this).val();
        
        /* Validación para habilitar el botón */
        /* .prop() se usa para manejar propiedades como "disabled */
        if (valor <= 1000) {
            $boton.prop("disabled", true);
        } else {
            $boton.prop("disabled", false);
        }
    });

    /* Función para cuando se haga clic en el botón depositar */
    $boton.click(function (e) {
        /* Evita que el formulario se envíe y recargue la página */
        e.preventDefault();

        /* Manejo del Saldo desde localStorage*/
        let saldo = Number(localStorage.getItem("saldo")) || 0;
        /* Obtenemos el monto ingresado por el usuario */
        let monto = Number($inputMonto.val());

        /* Sumamos y guardamos el nuevo saldo */
        saldo += monto;
        /* Guardamos el nuevo saldo en localStorage */
        localStorage.setItem("saldo", saldo);

        /* Manejo del Historial de Movimientos */

        /* Obtenemos los movimientos guardados en localStorage */
        let datosHistorial = localStorage.getItem("movimientos");
        /* Obtenemos los datos o creamos una lista vacía si no existe */
        let movimientos = datosHistorial ? JSON.parse(datosHistorial) : [];

        /* Agregamos el nuevo movimiento */
        movimientos.push(`+ $${monto.toLocaleString()} Depósito`);

        /* Guardamos la lista actualizada de movimientos */
        localStorage.setItem("movimientos", JSON.stringify(movimientos));

        /* Redirección al menú */
        window.location.href = "menu.html";
    });
});
