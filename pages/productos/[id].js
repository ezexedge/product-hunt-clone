import React , {useEffect,useContext,useState} from 'react';
import {useRouter} from 'next/router'
import Error404 from '../../components/layout/404'
import Layout from '../../components/layout/Layout'
import {FirebaseContext} from '../../firebase'
import {css} from '@emotion/core'
import styled from '@emotion/styled'


const ContenedorProducto = styled.div`

    @media(min-width:768px){
        display:grid;
        grid-template-columns: 2fr 1fr;
        column: 2rem;
    }


`

const Productos = () => {

    const [producto,guardarProducto] = useState({})
    const [error,guardarError] = useState(false)

    const  router = useRouter()
    const {query : {id}} = router

     const {firebase} = useContext(FirebaseContext)

    useEffect(()=>{
        if(id){
        
            const obtenerProducto = async() => {
                const productQuery = await firebase.db.collection('productos').doc(id)
                const producto  = await productQuery.get()

                if(producto.exists){
                    guardarProducto(producto.data())
                }else{
                    guardarError(true)
                }
                guardarProducto(producto.data())

            }

            obtenerProducto()


        }
    },[id])


    const  {comentarios,descripcion,empresa,nombre,url,urlImagen,votos,creado} = producto


    return ( 
    <Layout>
        <>
        {error && <Error404/>}

        {Object.keys(producto).length === 0 ? 'cargando...' : null}


        <div className="contenedor">
            <h1 css={css`
            text-align:center;
            margin-top: 5rem;

            
    `}>{nombre}</h1>
        </div>
        <ContenedorProducto>

            <div>
                1
            </div>
            <aside>
                2
            </aside>

        </ContenedorProducto>

        </>
    </Layout>
     );
}
 
export default Productos;