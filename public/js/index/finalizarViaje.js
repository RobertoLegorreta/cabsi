function finalizarViaje(){
	$('#pasajero').css('display', 'none');
	$('#conectar').css('display', 'block');
	ubicacionPasajero.setMap(null);
	ubicacionQuiereIr.setMap(null);

	firebase.database().ref('choferes/' + IDUsuario + '/peticion').set(null);
	firebase.database().ref('choferes/' + IDUsuario + '/estado').set('libre');
}
