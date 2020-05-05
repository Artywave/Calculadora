var calculadora = {

	pantalla: document.getElementById("display"),
	valorPantalla: "0",
	operacion: "",
	valorUno: 0,
	valorDos: 0,
	valorTres: 0,
	resultado: 0,
	teclaIgual: false,

	inicio: (function(){
		this.eventoAccionTeclado(".tecla");
		this.eventoFuncionTeclado();
	}),

	// Eventos de accion de las teclas
//Evento El hacer click con el boton del mouse
eventoAccionTeclado: function(mouse){
	var x = document.querySelectorAll(mouse);
	for (var i = 0; i < x.length; i++) {
		x[i].onmousedown = this.eventoPushTecla;
		x[i].onmouseup = this.eventoUpTecla;
	};
},

//Evento al preionarr la tecla
eventoPushTecla: function(event){
	calculadora.pushTecla(event.target);
},
//evento al soltar la tecla
eventoUpTecla: function(event){
	 calculadora.upTecla(event.target);
},

  // Formato de las teclas al realizar la accion
//control de tamaños de las teclas al precionarlas

pushTecla: function(tecla){
	var x = tecla.id;
	if (x =="1" || x == "2" || x == "3" || x == "0" || x == "igual" || x == "punto"){
		tecla.style.width = "28%";
		tecla.style.height = "62px";
	}else if (x == "mas") {
		tecla.style.width = "88%";
		tecla.style.height = "98%";
	} else {
		tecla.style.width = "21%";
		tecla.style.height = "62px";
	}
},
//control de tamaños de las teclas al soltarlas
upTecla: function(tecla){
	var x = tecla.id;
	if (x =="1" || x == "2" || x == "3" || x == "0" || x == "igual" || x == "punto"){
		tecla.style.width = "29%";
		tecla.style.height = "62.91px";
	}else if (x == "mas") {
		tecla.style.width = "90%";
		tecla.style.height = "100%";
	} else {
		tecla.style.width = "22%";
		tecla.style.height = "62.91px";
	}
},

/*Llamar al elemneto del documento HTML, con la accionde click
y que aparesca en la pantalla*/
eventoFuncionTeclado: function(){
	document.getElementById("0").addEventListener("click", function(){
		calculadora.ingresaNumero("0");
	});
	document.getElementById("1").addEventListener("click", function(){
		calculadora.ingresaNumero("1");
	});
	document.getElementById("2").addEventListener("click", function(){
		calculadora.ingresaNumero("2");
	});
	document.getElementById("3").addEventListener("click", function(){
		calculadora.ingresaNumero("3");
	});
	document.getElementById("4").addEventListener("click", function(){
		calculadora.ingresaNumero("4");
	});
	document.getElementById("5").addEventListener("click", function(){
		calculadora.ingresaNumero("5");
	});
	document.getElementById("6").addEventListener("click", function(){
		calculadora.ingresaNumero("6");
	});
	document.getElementById("7").addEventListener("click", function(){
		calculadora.ingresaNumero("7");
	});
	document.getElementById("8").addEventListener("click", function(){
		calculadora.ingresaNumero("8");
	});
	document.getElementById("9").addEventListener("click", function(){
		calculadora.ingresaNumero("9");
	});
	document.getElementById("on").addEventListener("click", function(){
		calculadora.limpiarPantalla();
	});
	document.getElementById("sign").addEventListener("click", function(){
		calculadora.cambiarSigno();
	});
	document.getElementById("raiz").addEventListener("click", function(){
		calculadora.realizaOperacion("raiz");
	});
	document.getElementById("dividido").addEventListener("click", function(){
		calculadora.realizaOperacion("/");
	});
	document.getElementById("por").addEventListener("click", function(){
		calculadora.realizaOperacion("*");
	});
	document.getElementById("menos").addEventListener("click", function(){
		calculadora.realizaOperacion("-");
	});
	document.getElementById("mas").addEventListener("click", function(){
		calculadora.realizaOperacion("+");
	});
	document.getElementById("igual").addEventListener("click", function(){
		calculadora.muestraResultado();
	});
	document.getElementById("punto").addEventListener("click", function(){
		calculadora.ingresaPunto();
	});
},

/*Limpiando la pantalla*/
 limpiarPantalla: function(){
	 this.valorPantalla = "0";
	 this.operacion = "";
	 this.valorUno = 0;
	 this.valorDos = 0;
	 this.valorTres = 0;
	 this.resultado = 0;
	 this.teclaIgual = false;
	 this.actualizarValor();
 },
/*Cambiando el signo */
cambiarSigno: function(){
	if (this.valorPantalla != "0"){
		var aux;
		if (this.valorPantalla.charAt(0)=="-"){
			aux = this.valorPantalla.slice(1);
		}else {
			aux = "-" + this.valorPantalla;
		}
		this.valorPantalla = "";
		this.valorPantalla = aux;
		this.actualizarValor();
	}
},
/*Ingresando el punto*/
ingresaPunto: function(){
	if (this.valorPantalla.indexOf(".")== -1){
		if(this.valorPantalla == ""){
			this.valorPantalla== this.valorPantalla + "0.";
		}else{
			this.valorPantalla = this.valorPantalla + ".";
		}
		this.actualizarValor();
	}
},
/*Ingresando los numeros en la pantalla*/
ingresaNumero: function(valor){
	if (this.valorPantalla.length < 9){
		if (this.valorPantalla == "0"){
			this.valorPantalla = "";
			this.valorPantalla = this.valorPantalla + valor;
		}else {
			this.valorPantalla = this.valorPantalla + valor;
		}
		this.actualizarValor();
	}
},
/*Funcion para realizar las operaciones*/
realizaOperacion: function(oper){
	this.valorUno = parseFloat(this.valorPantalla);
	this.valorPantalla = "";
	this.operacion = oper;
	this.teclaIgual = false;
	this.actualizarValor();
},
/*Mostrar el resultado de las operaciones cunado se de click sobre
la tecla Igual*/
muestraResultado: function(){
	if(!this.teclaIgual){
		this.valorDos = parseFloat(this.valorPantalla);
		this.valorTres = this.valorDos;
		this.realizarOperacion(this.valorUno, this.valorDos, this.operacion);
	}else {
		this.realizarOperacion(this.valorUno, this.valorTres, this.operacion);
	}
	this.valorUno = this.resultado;
	this.valorPantalla = "";

	if (this.resultado.toString().length < 9){
		this.valorPantalla = this.resultado.toString();
	}else {
		this.valorPantalla = this.resultado.toString().slice(0,8) + "...";
	}
	this.teclaIgual = true;
	this.actualizarValor();
},

/*Dando las instrucciones para las teclas de las operaciones*/
realizarOperacion: function(valorUno, valorDos, operacion){
	switch (operacion) {
		case "+":
		  this.resultado = eval(valorUno + valorDos);
			break;
		case "-":
		  this.resultado = eval(valorUno - valorDos);
			break;
		case "*":
			this.resultado = eval(valorUno * valorDos);
			break;
		case "/":
			this.resultado = eval(valorUno / valorDos);
			break;
		case "raiz":
			this.operacion = eval(Math.sqrt(valorUno));
			break;
	}
},
/*Intruccion para que se actualice el valor de la pantalla */
actualizarValor: function(){
	this.pantalla.innerHTML = this.valorPantalla;
}

};
/*lamando a la funcion inicio del metodo calculadora*/
calculadora.inicio();
