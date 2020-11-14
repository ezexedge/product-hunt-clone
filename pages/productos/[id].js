import React , {useEffect,useContext,useState} from 'react';
import {useRouter} from 'next/router'
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { es } from 'date-fns/locale';
import Error404 from '../../components/layout/404'
import Layout from '../../components/layout/Layout'
import {FirebaseContext} from '../../firebase'
import {css} from '@emotion/core'
import styled from '@emotion/styled'
import {Campo , InputSubmit} from '../../components/ui/Formulario'
import Boton from '../../components/ui/Boton'

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

     const {firebase,usuario} = useContext(FirebaseContext)

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
    },[id,producto])


    const  {comentarios,descripcion,empresa,nombre,url,urlImagen,votos,creado,creador,haVotado} = producto
    console.log(producto)
    

    const votarProducto = () => {

        if(!usuario){
            return router.push('/login')
        }

        const nuevoTotal = votos + 1

        if(haVotado.includes(usuario.uid)) return 

        const nuevoHaVotado = [...haVotado, usuario.uid]

        firebase.db.collection('productos').doc(id).update({votos : nuevoTotal,
        haVotado: nuevoHaVotado
        })

        

        console.log(nuevoTotal  )
        guardarProducto({
            ...producto,
            votos : nuevoTotal
        })

        console.log(producto)
    }

    return ( 
    <Layout>
        <>
        {Object.keys(producto).length === 0 ? 'cargando...' : null}

        {error ? <Error404/> : (
             <div className="contenedor">
            <h1 css={css`
            text-align:center;
            margin-top: 5rem;

            
    `}>{nombre}</h1>
        

        <ContenedorProducto>
        <p>Publicado por {creador ? creador.nombre : ''}  de {empresa}</p>

            <div>

            <img src={urlImagen} />
                <p>{descripcion}</p>
                <h2>Agrega tu comentario</h2>
                {usuario && (
                    <>
                    
                    <form>
                        <Campo>
                                <input
                                        type="text"
                                        name="mensaje"
                                        //        onChange={comentarioChange}
                                     />
                                        </Campo>
                                        <InputSubmit
                                            type="submit"
                                            value="Agregar Comentario"
                                        />
                                    </form>
                    
                    
                    </>
                )}
               

                                    <h2 css={css`
                                        margin: 2rem 0;
                 
                 `}>Comentarios</h2>
                { comentarios ? comentarios.map(comentario => (
                    <li>
                        <p>{comentario.nombre}</p>
                       <p>Escrito por : {comentario.usuarioNombre}</p>
                        
                    </li>
                )) : 'no hay comentarios'}
            </div>
            <aside>
                <Boton 
                target="_blank"
                bgColor="true"
                href={url}
                >Visitas URL</Boton>

                {usuario && (
                <Boton
                onClick={votarProducto}
                >Votar</Boton>
                )}


                <p
                css={css`

                text-align:center;
                
                `}
                >{votos} Votos</p>
            </aside>

        </ContenedorProducto>
        </div>
        ) }



     

        </>
    </Layout>
     );
}
 
export default Productos;