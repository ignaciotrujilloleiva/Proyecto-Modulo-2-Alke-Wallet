
/* Credenciales previamente guardadas */
const USER = "admin@mail.com";
const PASS = "1234";


/* Constante para capturar lo que se encuentra en <form> */
const form = document.getElementById("loginForm");
/* Constante Mensaje para enviar mensaje a usuario mediante un <p> vacio */
const mensaje = document.getElementById("mensaje");
/* Constante para recordar credenciales */
const recordar = document.getElementById("recordar");
/* uso de If para enviar mensaje si hay evento click en <a> ¿problemas con su clave?" */
if (recordar) {
    recordar.addEventListener("click", function (e) {
        e.preventDefault();

        /* Mensaje de alerta con las credenciales */
        alert(`Por favor, no vuelva a olvidar sus credenciales
            Email:
            ${USER}
            Contraseña: 
            ${PASS}`);
    });
}

/* Escuchamos el evento submit en el boton de inicio de sesion del formulario */
form.addEventListener("submit", function (e) {
    e.preventDefault();

    /* Capturamos el valor del input email y password */
    /* Se cambia de queryselector a getElementById */
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    /* Validación de Credenciales */
    if (email === USER && password === PASS) {
        mensaje.textContent = "Haz iniciado tu sesión";
        mensaje.className = "text-success";

        /* Guardado de datos para que recuerde el saldo inicial */
        localStorage.setItem("saldo", 100000);
        /* Crea una lista vacia para futuros movimientos */
        /* Se quitan los datos de la lista en la hoja transactions.html */
        localStorage.setItem("movimientos", JSON.stringify([
            "+ $20.000 Depósito",
            "- $5.000 Envío",
            "+ $10.000 Depósito"
        ]));

        /* se redirecciona a la pagina menu, se ralentiza 1 segundo el cambio */
        setTimeout(() => {
            window.location.href = "menu.html";
        }, 1000);
    } /* se entrega el mensaje de error */else {
        mensaje.textContent = "Credenciales incorrectas";
        mensaje.className = "text-danger";
    }
});
