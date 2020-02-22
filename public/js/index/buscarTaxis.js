function buscarTaxistas(){
	var taxistas = [];
	var buscarTaxis = setInterval(function(){
		firebase.database().ref('ubicacionTaxi').once('value', function(taxis){
		
			//Borramos todos los taxis para no sobreescribir	
			for(var i = 0; i < taxistas.length; i++){
				taxistas[i].setMap(null);
			}	
			
			if(taxis.val() != null){
				var index = 0;
				$.each( taxis.val(), function( key, value ){

					//Generamos los taxis
					if(key != IDUsuario){
					  	var marcador = new google.maps.Marker({
				            position: {lat: value.lat, lng: value.lng },
				            icon: {url: 'objetos/mapa/taxi.png', scaledSize: new google.maps.Size(35, 35)},
				            map: map,
			      		});
			      		taxistas[index] = marcador;
			     		index++;
		     		}
				});
			}	
			
		});
	}, 4000);
}