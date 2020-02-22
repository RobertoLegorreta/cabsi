function cantidadUsuarios(){
	firebase.database().ref('usuarios').once('value', function(data){
		var usuarios = data.val();
		
		var bandera = 0;

		for(valor in usuarios){
			bandera++;
		}

		console.log('Cantidad de usuarios: ' + bandera);
	});
}

function cantidadConductores(){
	firebase.database().ref('choferes').once('value', function(data){
		var usuarios = data.val();
		
		var bandera = 0;

		for(valor in usuarios){
			bandera++;
		}

		console.log('Cantidad de conductores: ' + bandera);
	});
}

