const serviceUrl = 'https://natha9404.pythonanywhere.com/';
let token = '';

$('#login-btn').on('click', function (e) {
	/* Button login */
	e.preventDefault();
	login();
});

$('#registrarse-btn').on('click', function (e) {
	/* Button login */
	e.preventDefault();
	createUser();
});



function login() {
	userData = {
		'username': $('#user-name').val(),
		'password': $("#user-password").val()
	}
	$.ajax({
		url: serviceUrl + 'usuarios/login/',
		type: 'POST',
		data: userData,
		success: function (result) {
            console.log(result.token)
            let cookies = { token: result.token};
            console.log('paso');
			if (localStorage.pruebaCookies) {
				localStorage.pruebaCookies = result.token;
			} else {
				localStorage.setItem('pruebaCookies', result.token);
            }
            window.location.replace("site/");
			
		},
		error: function (error) {
			var cookies = { token: '', role: '' };
			localStorage.setItem('pruebaCookies', result.token);
            console.log(error);
            console.log('HOLAAAA');
            document.getElementById('errorname').innerHTML ="Credenciales incorrectas, intente nuevamente.";
            document.getElementById('errorname').style.display="block"
			$('#user-name').val('');
			$("#user-password").val('');
		}
	});
}


function cerrarSesion() {
	console.log('entre aqui')
	$.ajax({
		url: serviceUrl + 'usuarios/logout/',
        type: 'POST',
        headers: {"Authorization": "Token "+localStorage.pruebaCookies},
		success: function (result) {
            window.location.replace("../site/");
			
		},
		error: function (error) {
            console.log(error);
            console.log('HOLAAAA');
		}
	});
}


function createUser() {
	console.log('entre aqui')
	userData = {
		'primer_nombre': $('#first-name').val(),
		'primer_apellido': $('#segundo-nombre').val(),
		'segundo_nombre': $('#last-name').val(),
		'segundo_apellido': $('#segundo-apellido').val(),
		'numero_documento_identificacion': $('#no-documento').val(),
		'email': $('#user-name').val(),
		'password': $("#user-password").val()
	}

	$.ajax({
		url: serviceUrl + 'usuarios/createUser/',
		type: 'POST',
		data: userData,
		success: function (result) {
            window.location.replace("../frontPrueba/");
			
		},
		error: function (error) {
			document.getElementById('errorname').innerHTML ="El usuario ya existe";
            document.getElementById('errorname').style.display="block"
            console.log(error);
            console.log('HOLAAAA');
		}
	});
}
/*
$(document).ready ( function(){
	console.log('>>>>>>>>>>>>>>>>>>>>>>>> object',localStorage.linceCookie);
	if (localStorage.pruebaCookies) {
		if(JSON.parse(localStorage.pruebaCookies).token != ""){
			//window.location.replace("site/");
		}

	} 
 });*/