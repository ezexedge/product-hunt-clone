import React , {useEffect,useState} from 'react';
import Layout from '../components/layout/Layout'
import {useRouter} from 'next/router'
import DetallesProducto from '../components/layout/DetallesProducto'
import useProductos from '../hooks/useProductos'

const Buscar = () => {

const router = useRouter()

const {query : {q }} = router

const {productos} = useProductos('creado')
const [resultados,guardarResultados] = useState([])


useEffect(() => {
    if(q){
        const busqueda = q.toLowerCase()
        const filtro = productos.filter(producto => {
            return (
                producto.nombre.toLowerCase().includes(busqueda) || producto.descripcion.toLowerCase().includes(busqueda)
    
                )
        })    
        guardarResultados(filtro)

    }
    
    //console.l(og(busqueda)
   // console.log(filtro)


},[q,productos])

console.log(productos)

console.log(q)

    return (  
        <>
         <Layout>
          <div className="listado-productos">

            <div className="contenedor">

                  <div className="bg-white">
                    {resultados.map(resultado => (
                      <DetallesProducto
                      key={resultado.id}
                      producto={resultado}
                      />
                    ))} 
                  </div>
            
            </div>

          </div>        
      </Layout>
        </>
    );
}
 
export default Buscar;