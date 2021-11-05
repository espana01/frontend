var urlRest = 'https://g2c41fba02d4035-db202110241306.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/audience/audience';

$('#formularioAuditorio').on("click", function(event) {
    event.preventDefault();

});

function cargarDatosTable() {
    $.ajax({
        url: urlRest,
        type: 'GET',
        datatype: 'JSON',
        success: function(response) {
            var tTable =
                '<tr>' +
                '<th>Id</th>' +
                '<th>Propietario</th>' +
                '<th>Capacidad</th>' +
                '<th>Categoria_id</th>' +
                '<th>Nombre</th>' +
                '<th>Acciones</th>' +
                '</tr>'

            var myItems = response.items;
            var valor = '';
            for (i = 0; i < myItems.length; i++) {
                valor +=
                    '<tr>' +
                    '<td>' + myItems[i].id + '</td>' +
                    '<td>' + myItems[i].owner + '</td>' +
                    '<td>' + myItems[i].capacity + '</td>' +
                    '<td>' + myItems[i].category_id + '</td>' +
                    '<td>' + myItems[i].name + '</td>' +
                    '<td>' + '<button class="btn btn-danger" onclick="borrarAuditorio(' + myItems[i].id + ')">Borrar</button>' +
                    '<button class="btn btn-warning" onclick="detalleAuditorio(' + myItems[i].id + ')">Detalles</button>' +
                    '</td>' +
                    '</tr>';
            }
            $('#headr').html(tTable);
            $('#tbodyAuditorio').html(valor);
        }
    });
}

function crearAuditorio() {
    var datosFormulario = {
        id: $('#myId').val(),
        owner: $('#owner').val(),
        capacity: $('#capacity').val(),
        category_id: $('#category_id').val(),
        name: $('#name').val()
    };

    var datosFormularioJson = JSON.stringify(datosFormulario);

    $.ajax({
        url: urlRest,
        type: 'POST',
        data: datosFormularioJson,
        datatype: 'JSON',
        contentType: 'application/json',
        success: function(response) {
            console.log(response);
            limpiarFormulario();
            cargarDatosTable();
            alert("Se Guardaron los datos");
        }
    });
}

function borrarAuditorio(idAuditorio) {
    var datos = {
        id: idAuditorio
    };
    var datosFormularioJson = JSON.stringify(datos);

    $.ajax({
        url: urlRest,
        type: 'DELETE',
        data: datosFormularioJson,
        datatype: 'JSON',
        contentType: 'application/json',
        success: function(response) {
            console.log(response);
            cargarDatosTable();
        }
    });

}

function detalleAuditorio(idAuditorio) {
    $.ajax({
        url: urlRest + '/' + idAuditorio,
        type: 'GET',
        datatype: 'JSON',
        success: function(response) {
            var myItem = response.items[0];
            var valor = '<strong>Id: </strong>' + myItem.id + ' <br>' +
                '<strong>Propietario: </strong>' + myItem.owner + ' <br>' +
                '<strong>Capacidad: </strong>' + myItem.capacity + ' <br>' +
                '<strong>Categoria_id: </strong>' + myItem.category_id + ' <br>' +
                '<strong>Nombre: </strong>' + myItem.name + ' <br>' +
                '<button class="btn btn-warning" onclick="cargarFormulario(' + myItem.id + ')">Editar</button>';
            $('#detallesAuditorio').show();
            $('#detallesAuditorio').html(valor);
        }
    });
}

function cargarFormulario(idAuditorio) {
    $.ajax({
        url: urlRest + '/' + idAuditorio,
        type: 'GET',
        datatype: 'JSON',
        success: function(response) {
            var myItem = response.items[0];
            $('#myId').val(myItem.id);
            $('#owner').val(myItem.owner);
            $('#capacity').val(myItem.capacity);
            $('#category_id').val(myItem.category_id);
            $('#name').val(myItem.name);

            var valor = '<input id="btnActualizar" type="submit" onclick="actualizarAuditorio(' + myItem.id + ')" value="Actualizar" class="btn-warning">';
            $('#btnFormulario').html(valor);

            $('#myId').prop('disabled', true);

        }
    });

}

function actualizarAuditorio(idAuditorio) {
    var datosFormulario = {
        id: idAuditorio,
        owner: $('#owner').val(),
        capacity: $('#capacity').val(),
        category_id: $('#category_id').val(),
        name: $('#name').val()
    };

    var datosFormularioJson = JSON.stringify(datosFormulario);
    $.ajax({
        url: urlRest,
        type: 'PUT',
        data: datosFormularioJson,
        datatype: 'JSON',
        contentType: 'application/json',
        success: function(response) {
            cargarDatosTable();
            limpiarFormulario();
            alert("Se Actualizaron los datos");
        }
    });
    var valor = '<input id="btnCrear" type="submit" onclick="crearAuditorio()" value="Crear" class="btn btn-primary"> ';
    $('#btnFormulario').html(valor);

    $('#myId').prop('disabled', false);
    $('#detallesAuditorio').hide();
}

function limpiarFormulario() {
    $('#formularioAuditorio')[0].reset();

}