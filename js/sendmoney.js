/* En jQuery, esperamos a que el documento HTML esté listo */
$(document).ready(function () {
    /* Selectores de jQuery */
    /* Se guarda en una constante con $ para indicar que es un objeto jQuery */
    const $select = $("#ContactSelect");
    const $montoInput = $("#LabelMonto");
    const $enviarBtn = $("#btnEnviarDinero");
    const $guardarContacto = $("#btnguardarContacto");

    /* Inputs del modal */
    const $nombre = $("#nombre");
    const $cbu = $("#cbu");
    const $alias = $("#alias");
    const $banco = $("#banco");

    /* Función para validar Envío */
    function validarEnvio() {
        /* selectedIndex !== 0 valida que NO esté seleccionada la opción por defecto */
        /* $montoInput.val() >= 1000 valida que el monto mínimo sea 1000 */
        const esValido = $select.prop("selectedIndex") !== 0 && $montoInput.val() >= 1000;
        /* .prop("disabled", True o False) permite habilitar o deshabilitar el botón */
        $enviarBtn.prop("disabled", !esValido);
    }

    /* Eventos para habilitar el botón */

    /* se valida cuando cambia el contacto seleccionado */
    $select.on("change", validarEnvio);
    /* se valida cuando el usuario escribe el monto */
    $montoInput.on("input", validarEnvio);

    /* Función para cargar los contactos */
    function cargarContactos() {
        const contactos = JSON.parse(localStorage.getItem("contactos")) || [];
        
        /* Recorremos cada contacto guardado */
        contactos.forEach(contacto => {
            /* Se crea dinámicamente una opción <option> usando jQuery */
            $select.append($('<option>', {
                value: contacto.alias,
                text: `${contacto.nombre} - ${contacto.banco}`
            }));
        });
    }

    cargarContactos();

    /* Agregar un contacto con los datos del modal */
    $guardarContacto.click(function () {
        /* Valida que los campos no esten vacios */
        if (!$nombre.val() || !$cbu.val() || !$alias.val() || !$banco.val()) {
            alert("Completa todos los campos");
            return;
        }

        /* Se crea un contacto con los datos ingresados */
        const contacto = {
            nombre: $nombre.val(),
            cbu: $cbu.val(),
            alias: $alias.val(),
            banco: $banco.val()
        };

        /* Se obtienen los contactos existentes, se cargan a la lista y despues va al localStorage */
        let contactos = JSON.parse(localStorage.getItem("contactos")) || [];
        contactos.push(contacto);
        localStorage.setItem("contactos", JSON.stringify(contactos));

        /* Se agrega el contacto al <select> */
        $select.append($('<option>', {
            value: contacto.alias,
            text: `${contacto.nombre} - ${contacto.banco}`
        }));

        /* Se limpian los inputs del modal */
        $nombre.val(""); $cbu.val(""); $alias.val(""); $banco.val("");

        /* Esconder el modal usando la instancia de Bootstrap */
        /* Se mantiene el uso de javascript por inconvenientes con las versiones de jQuery */
        const modalElement = document.getElementById("modalContacto");
        const modal = bootstrap.Modal.getInstance(modalElement);
        /* Se oculta el modal */
        modal.hide();

        /* Confirmación al usuario */
        alert("Contacto agregado correctamente");
    });

    /* Envío de dinero */
    $enviarBtn.click(function (e) {
        e.preventDefault();

        /* Se obtiene el monto ingresado */
        const monto = Number($montoInput.val());
        /* Se obtiene el saldo actual desde localStorage */
        let saldo = Number(localStorage.getItem("saldo"));

        /* Validación de saldo suficiente */
        if (monto > saldo) {
            alert("Saldo insuficiente");
            return;
        }

        /* Se descuenta el monto del saldo y se guarda en el localStorage*/
        saldo -= monto;
        localStorage.setItem("saldo", saldo);

        /* Se obtiene el historial de movimientos */
        let movimientos = JSON.parse(localStorage.getItem("movimientos")) || [];
        /* Se obtiene el texto del contacto seleccionado */
        const contactoTexto = $select.find("option:selected").text();
        
        /* Se agrega el nuevo movimiento al historial y se guarda en localStorage */
        movimientos.push(`- $${monto.toLocaleString()} Envío a ${contactoTexto}`);
        localStorage.setItem("movimientos", JSON.stringify(movimientos));

        alert("Envío realizado con éxito");
        window.location.href = "menu.html";
    });
});
