
const serviceUrl = 'http://127.0.0.1:8000/';


var app = new Vue({
    el: '#app',
    data: {
        solicitudes: {},
    }, methods: {
    }
});


function listarSolicitudes() {

    $.ajax({
        url: serviceUrl + "tableros/listar_solicitudes/",
        type: "GET",
        headers: {"Authorization": "Token "+localStorage.pruebaCookies},
        success: function (result) {
            app.solicitudes = result.data.info;
            console.log(result.data.info)
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


function aprobarSolicitud(idSolicitud){

    elementData = {
		'solicitud': idSolicitud,
    }
    
    $.ajax({
        url: serviceUrl + "tableros/aprobar_solicitudes/",
        type: "POST",
        headers: {"Authorization": "Token "+localStorage.pruebaCookies},
        data: elementData,
        success: function (result) {
            console.log('LO HIZO')
            window.location.replace("../site/");


        },
        error: function (error) {
            console.log(error);
        }
    });

}

$(document).ready(function () {
    listarSolicitudes();
    obtenerUsuario()
});