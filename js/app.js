//Variables
const email = document.querySelector("#email");
const asunto = document.querySelector("#asunto");
const mensaje = document.querySelector("#mensaje");
const formulario = document.querySelector("#enviar-mail");
//Botones
const btnEnviar = document.querySelector("#enviar");
const btnReset = document.querySelector("#resetBtn");

//Globales
const expresionRegular = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

eventListeners();

//EVENTOS
function eventListeners() {
	//Inicio de la app
	document.addEventListener("DOMContentLoaded", iniciarApp);
	//Campos del formulario
	email.addEventListener("blur", validarFormulario);
	asunto.addEventListener("blur", validarFormulario);
	mensaje.addEventListener("blur", validarFormulario);
	//Enviar mail
	formulario.addEventListener("submit", enviarEmail);
	//Boton de reset
	resetBtn.addEventListener("click", resetearFormulario);
}

//FUNCIONES
//-->Iniciar app
function iniciarApp() {
	//Desabilitar el envio
	btnEnviar.disabled = true;
	btnEnviar.classList.add("cursor-not-allowed", "opacity-50");
}

//-->Validar formulario
function validarFormulario(e) {
	//Campos que NO son mails
	if (e.target.value.length > 0) {
		const error = document.querySelector("p.error");
		if (error) {
			//Eliminar los errores...
			error.remove();
		}
		//Si está bien...
		e.target.classList.remove("border", "border-red-500");
		e.target.classList.add("border", "border-green-500");
	} else {
		//Si está mal....
		e.target.classList.remove("border", "border-green-500");
		e.target.classList.add("border", "border-red-500");
		mostrarError("Todos los campos son obligatorios");
	}

	//Validando email
	if (e.target.type === "email") {
		if (expresionRegular.test(e.target.value)) {
			//Eliminar los errores
			const error = document.querySelector("p.error");
			if (error) {
				error.remove();
			}
			//Si está bien...
			e.target.classList.remove("border", "border-red-500");
			e.target.classList.add("border", "border-green-500");
		} else {
			//Si está mal...
			e.target.classList.remove("border", "border-green-500");
			e.target.classList.add("border", "border-red-500");
			mostrarError("Email no válido");
		}
	}

	if (
		expresionRegular.test(email.value) &&
		asunto.value !== "" &&
		mensaje.value !== ""
	) {
		//Habilitar el envio
		btnEnviar.disabled = false;
		btnEnviar.classList.remove("cursor-not-allowed", "opacity-50");
	}
}

//-->Mostrar error
function mostrarError(mensaje) {
	const mensajeError = document.createElement("p");
	mensajeError.textContent = mensaje;
	mensajeError.classList.add(
		"border",
		"border-red-500",
		"background-red-100",
		"text-red-500",
		"p-3",
		"mt-5",
		"text-center",
		"error"
	);

	const errores = document.querySelectorAll(".error");
	if (errores.length === 0) {
		formulario.appendChild(mensajeError);
	}
}

//--> Enviar formulario
function enviarEmail(e) {
	e.preventDefault();

	// Spinner al presionar Enviar
	const spinner = document.querySelector("#spinner");
	spinner.style.display = "flex";
	// Ocultar Spinner y mostrar mensaje de enviado
	setTimeout(() => {
		spinner.style.display = "none";
		//Mensaje de envío correcto
		const parrafo = document.createElement("p");
		parrafo.textContent = "El mensaje se envió correctamente";
		parrafo.classList.add(
			"text-center",
			"my-10",
			"p-2",
			"bg-green-500",
			"text-white",
			"font-bold",
			"uppercase"
		);
		//Inserto el párrafo antes del spinner
		formulario.insertBefore(parrafo, spinner);

		setTimeout(() => {
			parrafo.remove(); //elimina el párrafo
			resetearFormulario();
		}, 4000);
	}, 2000);
}

//--> Resetear el formulario
function resetearFormulario() {
	formulario.reset();
	email.classList.remove("border", "border-green-500");
	email.classList.remove("border", "border-red-500");
	asunto.classList.remove("border", "border-green-500");
	asunto.classList.remove("border", "border-red-500");
	mensaje.classList.remove("border", "border-green-500");
	mensaje.classList.remove("border", "border-red-500");

	iniciarApp();
}
