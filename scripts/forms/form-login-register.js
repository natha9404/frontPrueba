const serviceUrl = 'http://127.0.0.1:8000/';
let token = '';

$('#login-btn').on('click', function (e) {
	/* Button login */
	e.preventDefault();
	login();
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
/*
$(document).ready ( function(){
	console.log('>>>>>>>>>>>>>>>>>>>>>>>> object',localStorage.linceCookie);
	if (localStorage.pruebaCookies) {
		if(JSON.parse(localStorage.pruebaCookies).token != ""){
			//window.location.replace("site/");
		}

	} 
 });*/