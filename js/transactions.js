/* En jQuery, esperamos a que el documento HTML esté listo */
$(document).ready(function () {
    /* Obtenemos los movimientos guardados en localstorage */
    const movimientos = JSON.parse(localStorage.getItem("movimientos")) || [];

    /* Recorremos cada movimiento y lo agregamos a la lista */
    movimientos.forEach(movimiento => {
        
        /* Creamos dinámicamente un elemento <li> usando jQuery */
        const $li = $("<li></li>")
            /*  Agregamos la clase de Bootstrap para que tenga estilo de lista */
            .addClass("list-group-item")
            /* Asignamos el texto del movimiento */
            .text(movimiento);           

        /* Agregamos el nuevo 'hijo' a la lista UL */
        $("#listMovimientos").append($li);
    });

    /* Opcional: Si no hay movimientos, mostrar un mensaje */
    /* Agregamos un <li> informativo directamente como HTM */
    if (movimientos.length === 0) {
        $("#listMovimientos").append('<li class="list-group-item text-muted text-center">No hay movimientos registrados</li>');
    }
});
