/* En jQuery, esperamos a que el documento HTML esté listo */
$(document).ready(function () {
    /* Obtenemos el saldo desde localStorage */
    const saldo = Number(localStorage.getItem("saldo")) || 0;

    /* Mostramos el saldo en pantalla usando jQuery */
    $("#saldo").text(`$${saldo}`);

    /* Función reutilizable para mostrar mensaje y redirigir */
    function redirigir(texto, url) {
        /* Selecciona el párrafo con id="mensaje */
        $("#mensaje").text(`Redirigiendo a ${texto}...`);

        /* tiempo de 1 segundo antes de redirigir */
        setTimeout(function() {
            window.location.href = url;
        }, 1000);
    }

    /* Eventos de redirección con jQuery */
    /* Se capturan los clicks de los botones por ID y se usa el método .click */
    $("#deposit").click(function(e) {
        /* Evita que el enlace <a> recargue la página */
        e.preventDefault();
        /* Llama a la función redirigir */
        redirigir("depósito", "deposit.html");
    });

    $("#sendmoney").click(function(e) {
        e.preventDefault();
        redirigir("enviar dinero", "sendmoney.html");
    });

    $("#transactions").click(function(e) {
        e.preventDefault();
        redirigir("últimos movimientos", "transactions.html");
    });
});
