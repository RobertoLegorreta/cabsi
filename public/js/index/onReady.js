$(document).on('ready', function(){

	//Checamos si usuario está logeado
	determinarLogeado();

	//Damos seguimiento a los taxistas activos
	buscarTaxistas();

	$(document).on('click', '#menu', function(){
		desplegarMenu();
	});

	$(document).on('click', '#oscureceMenu', function(){
		ocultarMenu();
	});

	$(document).on('click', '.conectar', function(){
		conectar();
	});

	$(document).on('click', '.desconectar', function(){
		desconectar();
	});

	// MENÚ
	$(document).on('click', '#editarPerfil', function(){
		menuEditarPerfil();
	});

	$(document).on('click', '#editarVehiculo', function(){
		menuEditarVehiculo();
	});

	$(document).on('click', '#cerrarSesion', function(){
		menuCerrarSesion();
	});

	// CONDUCTOR CONECTADO
	$(document).on('click', '#rechazar', function(){
		rechazarSolicitud();
	});

	$(document).on('click', '#aceptar', function(){
		aceptarSolicitud();
	});

	$(document).on('click', '#finalizarViaje', function(){
		finalizarViaje();
	});
});