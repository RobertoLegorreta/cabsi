function desconectar(){
	$('#conectar').css('background', '#EA4E51');
	$('#conectar').text('CONECTAR');
	$('#conectar').removeClass();
	$('#conectar').addClass('conectar');

	//Cambiamos el ícono de manera temporal
	miUbicacion.setIcon({url: 'objetos/mapa/conductor.png',  scaledSize: new google.maps.Size(17, 17)});

	//Dejamos de mandar la ubicación al servidor
	clearInterval(subirTaxiServidor);

	//Borramos la ubicación de la base de datos
	firebase.database().ref('ubicacionTaxi/' + IDUsuario).set(null);

	//Ponemos estado en desconectado
	firebase.database().ref('choferes/' + IDUsuario + '/estado').set('ocupado');
}