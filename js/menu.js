/* constante para saldo mostrado en pantalla */
const saldoHTML = document.getElementById("saldo");

/* constante para mensaje de redirección */
const mensaje = document.getElementById("mensaje");

/* Obtenemos el saldo desde localStorage del inicio de sesión */
/* si no existe es 0 */
const saldo = Number(localStorage.getItem("saldo")) || 0;

/* Mostramos el saldo en pantalla */
saldoHTML.textContent = `$${saldo}`;

/* Función reutilizable para mostrar mensaje y redirigir */
function redirigir(texto, url) {

    /* Mostramos mensaje informativo */
    mensaje.textContent = `Redirigiendo a ${texto}...`;

    /* tiempo de 1 segundo antes de redirigir */
   setTimeout(function() {
    window.location.href = url;
}, 1000);
}

/* Evento redirección botón Depositar */
document.getElementById("deposit").addEventListener("click", function(e) {
    e.preventDefault();
    redirigir("depósito", "deposit.html");
});

/* Evento redirección botón Enviar Dinero */
document.getElementById("sendmoney").addEventListener("click", function(e) {
    e.preventDefault();
    redirigir("enviar dinero", "sendmoney.html");
});

/* Evento redirección botón Últimos Movimientos */
document.getElementById("transactions").addEventListener("click", function(e) {
    e.preventDefault();
    redirigir("últimos movimientos", "transactions.html");
});
