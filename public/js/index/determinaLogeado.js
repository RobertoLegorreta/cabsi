var IDUsuario;
function determinarLogeado(){
	firebase.auth().onAuthStateChanged(function(user){
	  	if (user){
	  		//Creamos una variable global con el UID
	  		IDUsuario = user.uid;

	  		//Obtenemos el nombre del usuario para ponerlo en el menú
	  		firebase.database().ref('choferes/' + IDUsuario + '/nombre').once('value', function(data){
	  			$('#usuario').text(data.val());
	  		});

	  		//Escuchamos todas las peticiones que se generen en nuestro perfil
	  		firebase.database().ref('choferes/' + IDUsuario + '/peticion').on('value', function(snapshot){
				if(snapshot.val() != null){
					solicitud(snapshot);
				}else{
					//Si nos había llegado la solicitud y fue cancelada por el usuario, borramos los datos de la solicitud
					if(ubicacionPasajero != null){
						rechazarSolicitud();
					}
				}
			});

			//Escuchamos los cambios de código para usuarios de la misma cuenta
			firebase.database().ref('choferes/' + IDUsuario + '/codigoUsuarioActual').on('value', function(codigo){
				if(codigo.val() != null){
					var codigoSesion = localStorage.getItem('codigoSesion');
				
					if(codigo.val() != codigoSesion){
						//Cerrar sesión si se detectó otro inicio
						menuCerrarSesion();
					}
				}
			});


	 	}else{
		    location.href = "signup.html"
	  	}
	});
}