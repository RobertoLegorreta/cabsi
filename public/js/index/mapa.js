var map;
var miUbicacion;

function initMap() {
	map = new google.maps.Map(document.getElementById('mapa'),{
	  	center: {lat: 21.5088746, lng: -104.9112965},
	  	zoom: 15,
	    streetViewControl: false,
	    mapTypeControl: false,
	    disableDefaultUI: true,
	  	styles: estiloMapa
	});
}

var bandera = 0;
if(navigator.geolocation){	
	//Llamamos para que aparezca el cuadro pidiendo rastrear al usuario de forma rápida
	setGeolocation();

	//Ponemos temporizador para seguirlo rastreando
	window.setInterval( function () {
        setGeolocation();
    }, 
	    5000 
	);

} else {
  	//El navegador no soporta geolocalización
  	handleLocationError(false, map.getCenter());
}

function setGeolocation(){
  	navigator.geolocation.getCurrentPosition(function(position) {
    	var pos = {
      		lat: position.coords.latitude,
      		lng: position.coords.longitude
    	};

    	//console.log('Dirección actual del usuario: latitut: ' + pos.lat + ' longitud' + pos.lng);

	    if(bandera == 0){
	    	map.setCenter(pos);
	    	bandera++;

	    	//Ponemos el botón de conectar, una vez que rastreamos al conductor
	    	$('#conectar').css('display', 'block');
	    }

	    //Eliminamos mi ubicación previa para no sobreescribir
	    if(miUbicacion != null){
			miUbicacion.setMap(null);
		}

		//Generamos mi ubicación
		miUbicacion = new google.maps.Marker({
            position: pos,
            map: map,
      	});

		//Determinamos el ícono a utilizar dependiendo el estatus de conectado
		if(conectado()){
			miUbicacion.setIcon({url: 'objetos/mapa/taxiDestacado.png', scaledSize: new google.maps.Size(45, 45)});
		}else{
			miUbicacion.setIcon({url: 'objetos/mapa/conductor.png', scaledSize: new google.maps.Size(17, 17)});
		}

    }, function() {
        handleLocationError(true, map.getCenter());
    });
}

//Determina si estamos conectados
function conectado(){
	if($('#conectar').text() == 'CONECTAR'){
		return false;
	}else{
		return true;
	}
}

//Se ejecuta al haber un error
function handleLocationError(browserHasGeolocation, pos) {
	// infoWindow.setPosition(pos);
	// infoWindow.setContent(browserHasGeolocation ?
	// 'Error: The Geolocation service failed.' :
 	// 'Error: Your browser doesn\'t support geolocation.');
}