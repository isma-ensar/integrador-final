function valida_envia() {
    if (document.formulario.nombre.value.length == 0) {
        alert("Tiene que escribir su nombre")
        document.formulario.nombre.focus()
        return 0;
    }

    if (document.formulario.apellido.value.length == 0) {
        alert("Tiene que escribir su apellido")
        document.formulario.apellido.focus()
        return 0;
    }

    if (document.formulario.correoEl.value.length == 0) {
        alert("Tiene que escribir su correo electrónico")
        document.formulario.correoEl.focus()
        return 0;
    }

    numero = document.formulario.numero.value
    numero = validarEntero(numero)
    document.formulario.numero.value = numero
    if (numero == "") {
        alert("Tiene que introducir un número de teléfono.")
        document.formulario.numero.focus()
        return 0;                
    }

    if (document.formulario.genero.selectedIndex == 0) {
        alert("Por favor determinar género.")
        document.formulario.genero.focus()
        return 0;
    }

    if (document.formulario.pref.selectedIndex == 0) {
        alert("Por favor determinar preferencia.")
        document.formulario.pref.focus()
        return 0;
    }

    alert("Muchas gracias por enviar el formulario");
    document.formulario.submit();
}

function validarEntero(valor) {
    valor = parseInt(valor)

    if (isNaN(valor)) {
        return ""
    } else {
        return valor
    }
}