//Variable que utilizo para darle seguimiento al setInterval();
var subirTaxiServidor;

function conectar(){

	firebase.database().ref('choferes/' + IDUsuario + '/vehiculo').once('value', function(snapshot){
		
		if(snapshot.val() != null){
			if(snapshot.val().modelo != null && snapshot.val().numeroPlaca != null && snapshot.val().numeroTaxi != null){
				$('#conectar').css('background', 'black');
				$('#conectar').text('DESCONECTAR');
				$('#conectar').removeClass();
				$('#conectar').addClass('desconectar');

				//Cambia el ícono de manera temporal
				miUbicacion.setIcon({url: 'objetos/mapa/taxiDestacado.png',  scaledSize: new google.maps.Size(45, 45)});

				//Subimos ubicación del taxi al servidor
				firebase.database().ref('ubicacionTaxi/' + IDUsuario).set({lat: miUbicacion.position.lat(), lng: miUbicacion.position.lng()});
				
				//Ponemos estado en libre
				firebase.database().ref('choferes/' + IDUsuario + '/estado').set('libre');

				//Subimos la ubicación del taxi al servidor cada 5 segundos
				subirTaxiServidor = setInterval(function(){
					firebase.database().ref('ubicacionTaxi/' + IDUsuario).set({lat: miUbicacion.position.lat(), lng: miUbicacion.position.lng()});
				}, 5000);
			}else{
				//TODO: Generar notificación
				alert('Necesita registrar correctamente su vehículo, número de placa y número de taxi para poderse conectar');//TODO: Cambiar alert por notificación
			}
		}else{
			//TODO: Genera notificación
			alert('Necesita registrar correctamente su vehículo, número de placa y número de taxi para poderse conectar');//TODO: Cambiar alert por notificacion
		}
	});
}
