/* Captura de elementos en constantes */
/* Select donde se elige el contacto */
const select = document.getElementById("ContactSelect");
/* Input donde se ingresa el monto a enviar */
const montoInput = document.getElementById("LabelMonto");
/* Botón para enviar dinero */
const enviarBtn = document.getElementById("btnEnviarDinero");

/* inputs para el modal */
const nombre = document.getElementById("nombre");
const cbu = document.getElementById("cbu");
const alias = document.getElementById("alias");
const banco = document.getElementById("banco");
/* Botón para guardar contacto */
const guardarContacto = document.getElementById("btnguardarContacto");

/* funcion para validar Envio */
/* habilita el boton al esta seleccionado un contacto en la barra select y un monto ingresado mayor a 1000 */
function validarEnvio() {
    enviarBtn.disabled =
        select.selectedIndex === 0 || montoInput.value < 1000;
}
/* eventos para habilitar el boton para enviar dinero */
select.addEventListener("change", validarEnvio);
montoInput.addEventListener("input", validarEnvio);

/* funcion para cargar los contactos desde el localstorage y que no se pierdan al recargar */
function cargarContactos() {
    const contactos = JSON.parse(localStorage.getItem("contactos")) || [];

    contactos.forEach(contacto => {
        const option = document.createElement("option");
        option.textContent = `${contacto.nombre} - ${contacto.banco}`;
        option.value = contacto.alias;
        select.appendChild(option);
    });
}

/* Se ejecuta al cargar la página */
cargarContactos();




/* Agregar un contacto con los datos del modal */
guardarContacto.addEventListener("click", () => {

    if (!nombre.value || !cbu.value || !alias.value || !banco.value) {
        alert("Completa todos los campos");
        return;
    }
    const contacto = {
        nombre: nombre.value,
        cbu: cbu.value,
        alias: alias.value,
        banco: banco.value
    };

    /* Obtiene contactos existentes desde el localStorage y lo convierte a una lista */
    let contactos = JSON.parse(localStorage.getItem("contactos")) || [];
    /* Agrega el nuevo contacto */
    contactos.push(contacto);
    /* Guarda en localStorage */
    localStorage.setItem("contactos", JSON.stringify(contactos));

    /* Agrega el contacto al select */
    const option = document.createElement("option");
    option.textContent = `${contacto.nombre} - ${contacto.banco}`;
    option.value = contacto.alias;
    select.appendChild(option);

    /* cambia el contenido del modal por " " */
    nombre.value = "";
    cbu.value = "";
    alias.value = "";
    banco.value = "";

    /* esconde el modal */
    const modal = bootstrap.Modal.getInstance(
        document.getElementById("modalContacto")
    );
    modal.hide();

    alert("Contacto agregado correctamente");
});

/* Envio de dinero */
/* Evento del boton enviar dinero */
enviarBtn.addEventListener("click", (e) => {

    e.preventDefault();

    /* Convierte el monto a número */
    const monto = Number(montoInput.value);
    /* obtiene el saldo desde el local storage */
    let saldo = Number(localStorage.getItem("saldo"));
    /* verifica si el saldo es menor que el monto a enviar */
    if (monto > saldo) {
        alert("Saldo insuficiente");
        return;
    }

    /* Descuenta el saldo */
    saldo -= monto;
    /* Guarda el nuevo saldo */
    localStorage.setItem("saldo", saldo);

    /* obtiene los movimiento del localStorage y los convierte en un lista */
    let movimientos = JSON.parse(localStorage.getItem("movimientos")) || [];
    /* Agrega nuevo movimiento a la lista */
    movimientos.push(`- $${monto} Envío a ${select.options[select.selectedIndex].text}`);
    /*actualiza la lista de Movimientos*/
    localStorage.setItem("movimientos", JSON.stringify(movimientos));

    alert("Envío realizado con éxito");
    /* Redirige al menú principal */
    window.location.href = "menu.html";
});
