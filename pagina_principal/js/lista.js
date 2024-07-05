 // Función para cargar los helados al cargar la página
 window.onload = function () {
    // Realizar una solicitud GET a la ruta /helados
    fetch('/helados')
        // Procesar la respuesta como JSON
        .then(function (response) {
            return response.json();
        })
        // Cuando se obtienen los datos JSON
        .then(function (data) {
            // Obtener una referencia al elemento HTML con el ID 'helados-list'
            var heladosList = document.getElementById('helados-list');
            // Iterar sobre cada helado en los datos recibidos
            data.forEach(function (helado) {
                // Crear una nueva fila de tabla
                var row = document.createElement('tr');
                // Establecer el contenido HTML de la fila con los datos del helado
                row.innerHTML = '<td>' + helado.nombre + '</td>' +
                    '<td>' + helado.descripcion + '</td>' +
                    '<td>' + helado.sabor + '</td>' +
                    '<td>' + helado.tipo + '</td>' +
                    '<td>' + helado.cobertura + '</td>' +
                    '<td>' + helado.precio + '</td>' +
                    '<td>' + '<img src="/img/' + helado.imagen + '" alt="helado" >"' + '</td>' +
                    '<td>' +
                    '<button onclick="prepararEliminar(' + helado.id + ') " data-bs-toggle="modal" data-bs-target="#eliminarModal">Eliminar</button>' +
                    '<button onclick="verDetalles(\'' + helado.id + '\') " data-bs-toggle="modal" data-bs-target="#detallesModal ">Ver Detalle</button>' +
                    '</td>';
                heladosList.appendChild(row);
            });
        });





   

 

};

