var urlRest = 'https://g2c41fba02d4035-db202110241306.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/message/message';

$('#formularioMensajes').on("click", function(event) {
    event.preventDefault();

});

function cargarDatosTable() {
    $.ajax({
        url: urlRest,
        type: 'GET',
        datatype: 'JSON',
        success: function(response) {
            var tTable1 =
                '<tr>' +
                '<th>Id</th>' +
                '<th>Mensajes</th>'

            var myItems = response.items;
            var valor = '';
            for (i = 0; i < myItems.length; i++) {
                valor +=
                    '<tr>' +
                    '<td>' + myItems[i].id + '</td>' +
                    '<td>' + myItems[i].messagetext + '</td>' +
                    '<td>' + '<button class="btn btn-danger" onclick="borrarMensajes(' + myItems[i].id + ')">Borrar</button>' +
                    '<button class="btn btn-warning" onclick="detalleMensajes(' + myItems[i].id + ')">Detalles</button>' +
                    '</td>' +
                    '</tr>';
            }
            $('#headrMensaje').html(tTable1);
            $('#tbodyMensaje').html(valor);
        }
    });
}

function crearMensajes() {
    var datosFormulario = {
        id: $('#myId').val(),
        messagetext: $('#messagetext').val()
    };

    var datosFormularioJson = JSON.stringify(datosFormulario);

    $.ajax({
        url: urlRest,
        type: 'POST',
        data: datosFormularioJson,
        datatype: 'JSON',
        contentType: 'application/json',
        success: function(response) {
            limpiarFormulario();
            cargarDatosTable();
            alert("Se Guardaron los datos");
        }
    });
}

function borrarMensajes(idMensajes) {
    var datos = {
        id: idMensajes
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

function detalleMensajes(idMensajes) {
    $.ajax({
        url: urlRest + '/' + idMensajes,
        type: 'GET',
        datatype: 'JSON',
        success: function(response) {
            var myItem = response.items[0];
            var valor = '<strong>Id: </strong>' + myItem.id + ' <br>' +
                '<strong>Mensajes: </strong>' + myItem.messagetext + ' <br>' +
                '<button class="btn btn-warning" onclick="cargarFormulario(' + myItem.id + ')">Editar</button>';
            $('#detallesMensajes').show();
            $('#detallesMensajes').html(valor);
        }
    });
}

function cargarFormulario(idMensajes) {
    $.ajax({
        url: urlRest + '/' + idMensajes,
        type: 'GET',
        datatype: 'JSON',
        success: function(response) {
            var myItem = response.items[0];
            $('#myId').val(myItem.id);
            $('#messagetext').val(myItem.messagetext);

            var valor = '<input id="btnActualizar" type="submit" onclick="actualizarMensajes(' + myItem.id + ')" value="Actualizar" class=" btn-warning">';
            $('#btnFormulario').html(valor);

            $('#myId').prop('disabled', true);

        }
    });

}

function actualizarMensajes(idMensajes) {
    var datosFormulario = {
        id: idMensajes,
        messagetext: $('#messagetext').val()

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
    var valor = '<input id="btnCrear" type="submit" onclick="crearCliente()" value="Crear" class="btn btn-primary"> ';
    $('#btnFormulario').html(valor);

    $('#myId').prop('disabled', false);
    $('#detallesMensajes').hide();
}

function limpiarFormulario() {
    $('#formularioMensajes')[0].reset();

}