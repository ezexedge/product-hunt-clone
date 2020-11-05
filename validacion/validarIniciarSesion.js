export default function ValidarIniciarSesion(valores){


    let errores = {}


    if(!valores.email){
        errores.email = 'el email es obligatorio'

    }//en el else if aplicamos expreciones regulares
    else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(valores.email)) {
        errores.email = "el email debe ser valido"
    }

    if(!valores.password){
        errores.password = "el password debe ser obligatorio"
    }else if(valores.password.length < 6){
        errores.password = "el password debe tener al menos 6 caracteres"
    }


return errores
}
