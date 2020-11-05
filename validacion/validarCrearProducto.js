export default function ValidarCrearProducto(valores){


    let errores = {}


    if(!valores.nombre){
        errores.nombre = 'el nombre es obligatorio'
    }


   if(!valores.empresa){
       errores.empresa = 'Nombre de empresa es obligatorio'
   }

   if(!valores.url){
       errores.url = 'la url del producto es obligatoria'

   }else if( !/^(ftp|http|https):\/\/[^ "]+$/.test(valores.url)){
        errores.url = 'url no valida o mal formateada'
   }

   if(!valores.descripcion){
       errores.descripcion = 'agrega una descripcion al producto'
   }



return errores
}
