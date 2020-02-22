var ubicacionQuiereIr;
var ubicacionPasajero;

function solicitud(snapshot){

	$('#conectar').css('display', 'none');
	$('.solicitud').css('display', 'block');

	var pos1 = {
      		lat: snapshot.val().suUbicacion.lat,
      		lng: snapshot.val().suUbicacion.lng
   	};

   	var pos2 = {
      		lat: snapshot.val().quiereIr.lat,
      		lng: snapshot.val().quiereIr.lng
   	};

	ubicacionPasajero = new google.maps.Marker({
            position: pos1,
      		icon: {url: 'objetos/mapa/miUbicacion.png', scaledSize: new google.maps.Size(35, 35)},
            map: map,
    });

    ubicacionQuiereIr = new google.maps.Marker({
            position: pos2,
      		icon: {url: 'objetos/mapa/quieroIr.png', scaledSize: new google.maps.Size(27, 27)},
            map: map,
    });

 	var bounds = new google.maps.LatLngBounds();    
 	bounds.extend(ubicacionPasajero.position);
    bounds.extend(ubicacionQuiereIr.position);
    bounds.extend(miUbicacion.position);
	map.fitBounds(bounds);
}

function rechazarSolicitud(){
	ubicacionPasajero.setMap(null);	
	ubicacionQuiereIr.setMap(null);	
	$('.solicitud').css('display', 'none');
	$('#conectar').css('display', 'block');

	firebase.database().ref('choferes/' + IDUsuario + '/peticion/usuario').once('value',function(snapshot){

		firebase.database().ref('usuarios/' + snapshot.val() + '/peticionEstado').once('value', function(data){

			if(data.val() == null){
				firebase.database().ref('usuarios/' + snapshot.val() + '/peticionEstado').set(1);
			}else{
				firebase.database().ref('usuarios/' + snapshot.val() + '/peticionEstado').set(data.val() + 1);
			}
		});

		firebase.database().ref('choferes/' + IDUsuario + '/peticion').set(null);
		firebase.database().ref('choferes/' + IDUsuario + '/estado').set('libre');

	});

}

function aceptarSolicitud(){
	$('#pasajero').css('display', 'block');
	$('#aceptar').css('display', 'none');
	$('#rechazar').css('display', 'none');	

	firebase.database().ref('choferes/' + IDUsuario + '/peticion/usuario').once('value', function(snapshot){

		firebase.database().ref('usuarios/' + snapshot.val() + '/conductorAsignado').set(IDUsuario);

		firebase.database().ref('usuarios/' + snapshot.val()).once('value', function(data){
			$('#nombrePasajero').text(data.val().nombre);
			$('#telefonoPasajero a').text(data.val().telefono);
			$('#telefonoPasajero a').attr('href', 'tel:+1-' + data.val().telefono);
			$('.telefono').attr('href', 'tel:+1-' + data.val().telefono);
		});
	});
}

