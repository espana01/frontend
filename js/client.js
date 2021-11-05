var urlRest1 = 'https://g2c41fba02d4035-db202110241306.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/client/client';

$('#formularioCliente').on("click", function(event) {
    event.preventDefault();

});

function cargarDatosTable() {
    $.ajax({
        url: urlRest1,
        type: 'GET',
        datatype: 'JSON',
        success: function(response) {
            var tTable =
                '<tr>' +
                '<th>Id</th>' +
                '<th>Nombre</th>' +
                '<th>Email</th>' +
                '<th>Edad</th>' +
                '<th>Acciones</th>' +
                '</tr>'

            var myItems = response.items;
            var valor = '';
            for (i = 0; i < myItems.length; i++) {
                valor +=
                    '<tr>' +
                    '<td>' + myItems[i].id + '</td>' +
                    '<td>' + myItems[i].name + '</td>' +
                    '<td>' + myItems[i].email + '</td>' +
                    '<td>' + myItems[i].age + '</td>' +
                    '<td>' + '<button class="btn btn-danger" onclick="borrarCliente(' + myItems[i].id + ')">Borrar</button>' +
                    '<button class="btn btn-warning" onclick="detalleCliente(' + myItems[i].id + ')">Detalles</button>' +
                    '</td>' +
                    '</tr>';
            }
            $('#headrCliente').html(tTable);
            $('#tbodyCliente').html(valor);
        }
    });
}

function crearCliente() {
    var datosFormulario = {
        id: $('#myId').val(),
        name: $('#name').val(),
        email: $('#email').val(),
        age: $('#age').val()
    };

    var datosFormularioJson = JSON.stringify(datosFormulario);

    $.ajax({
        url: urlRest1,
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

function borrarCliente(idCliente) {
    var datos = {
        id: idCliente
    };
    var datosFormularioJson = JSON.stringify(datos);

    $.ajax({
        url: urlRest1,
        type: 'DELETE',
        data: datosFormularioJson,
        datatype: 'JSON',
        contentType: 'application/json',
        success: function(response) {
            console.log(response)
            cargarDatosTable();
            alert("Se ha borrado")
        }
    });

}

function detalleCliente(idCliente) {
    $.ajax({
        url: urlRest1 + '/' + idCliente,
        type: 'GET',
        datatype: 'JSON',
        contentType: 'application/json',
        success: function(response) {
            var myItem = response.items[0];
            console.log(myItem);
            var valor = '<strong>Id: </strong>' + myItem.id + ' <br>' +
                '<strong>Nombre: </strong>' + myItem.name + ' <br>' +
                '<strong>Email: </strong>' + myItem.email + ' <br>' +
                '<strong>Edad: </strong>' + myItem.age + ' <br>' +
                '<button class="btn btn-warning" onclick="cargarFormulario(' + myItem.id + ')">Editar</button>';
            $('#detallesCliente').show();
            $('#detallesCliente').html(valor);
        }
    });
}

function cargarFormulario(idCliente) {
    $.ajax({
        url: urlRest1 + '/' + idCliente,
        type: 'GET',
        datatype: 'JSON',
        success: function(response) {
            var myItem = response.items[0];
            $('#myId').val(myItem.id);
            $('#name').val(myItem.name);
            $('#email').val(myItem.email);
            $('#age').val(myItem.age);

            var valor = '<input id="btnActualizar" type="submit" onclick="actualizarCliente(' + myItem.id + ')" value="Actualizar" class="btn-warning">';
            $('#btnFormulario').html(valor);

            $('#myId1').prop('disabled', true);

        }
    });

}

function actualizarCliente(idCliente) {
    var datosFormulario = {
        id: idCliente,
        name: $('#name').val(),
        email: $('#email').val(),
        age: $('#age').val()
    };

    var datosFormularioJson = JSON.stringify(datosFormulario);
    $.ajax({
        url: urlRest1,
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
    $('#detallesCliente').hide();
}

function limpiarFormulario() {
    $('#formularioCliente')[0].reset();

}