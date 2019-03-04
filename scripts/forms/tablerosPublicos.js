const serviceUrl = 'http://127.0.0.1:8000/';


var app = new Vue({
    el: '#app',
    data: {
        tableros: {},
        usuario: {}
    }, methods: {
    }
});


function listarTableros() {

    $.ajax({
        url: serviceUrl + "tableros/listarTablerosUsuario/",
        type: "GET",
        headers: {"Authorization": "Token "+localStorage.pruebaCookies},
        success: function (result) {
            app.tableros = result.data;
            console.log(result.data)
        },
        error: function (error) {
            console.log(error);
        }
    });

}

function obtenerUsuario() {

    $.ajax({
        url: serviceUrl + "usuarios/obtenerUsuario/",
        headers: {"Authorization": "Token "+localStorage.pruebaCookies},
        type: "GET",
        success: function (result) {
            app.usuario = result;
        },
        error: function (error) {
            console.log(error);
            console.log(localStorage.pruebaCookies);
        }
    });

}

function habilitarBoton(idTarjeta){
    var id= "#Boton"+idTarjeta;
    $(id).css("display", "block");

}

function actualizarTarjeta(idTarjeta){
    var input = "#Input"+idTarjeta;
    var contenido = $(input).val();
    var id= "#Boton"+idTarjeta;

    elementData = {
		'idTarjeta': idTarjeta,
		'contenido': $(input).val()
    }
    
    $.ajax({
        url: serviceUrl + "tableros/modificarTarjeta/",
        type: "POST",
        headers: {"Authorization": "Token "+localStorage.pruebaCookies},
        data: elementData,
        success: function (result) {
            $(id).css("display", "none");

        },
        error: function (error) {
            console.log(error);
        }
    });

}

$(document).ready(function () {
    listarTableros();
    obtenerUsuario()
});