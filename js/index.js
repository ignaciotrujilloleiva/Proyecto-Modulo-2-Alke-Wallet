/* Credenciales pre cargadas*/
const USER = "admin@mail.com";
const PASS = "1234";

/* En jQuery, esperamos a que el documento HTML esté listo */
$(document).ready(function () {

    /* Evento para "¿Problemas con su clave?" */
    /* Captura del click del enlace usando jQuery */
    $("#recordar").click(function (e) {
        e.preventDefault();
        /* Muestra un mensaje con las credenciales simuladas */
        alert(`Por favor, no vuelva a olvidar sus credenciales\nEmail: ${USER}\nContraseña: ${PASS}`);
    });

    /* Evento submit del formulario de login */
    $("#loginForm").submit(function (e) {
        e.preventDefault();

        /* Captura de valores de los inputs */
        const email = $("#email").val();
        const password = $("#password").val();

        /* Validación de Credenciales */
        if (email === USER && password === PASS) {
            
            /* Mostramos mensaje de éxito */
            /* .text() cambia el contenido */
            /* .attr("class", ...) cambia la clase CSS */
            $("#mensaje").text("Has iniciado tu sesión")
                         .attr("class", "text-success");

            /* Guardado de datos en Local Storage */
            localStorage.setItem("saldo", 100000);
            localStorage.setItem("movimientos", JSON.stringify([
                "+ $20.000 Depósito",
                "- $5.000 Envío",
                "+ $10.000 Depósito"
            ]));

            /* Redirección con retraso */
            setTimeout(() => {
                window.location.href = "menu.html";
            }, 1000);

        } else {
            // Mensaje de error si credenciales son incorrectas
            $("#mensaje").text("Credenciales incorrectas")
                         .attr("class", "text-danger");
        }
    });
});
