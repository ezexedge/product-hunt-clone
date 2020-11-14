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
    const [comentario , guardarComentario] = useState({})
    const [consultarDB, guardarConsultarDB] = useState(true)

    const  router = useRouter()
    const {query : {id}} = router

     const {firebase,usuario} = useContext(FirebaseContext)

    useEffect(()=>{
        if(id && consultarDB){
        
            const obtenerProducto = async() => {
                const productQuery = await firebase.db.collection('productos').doc(id)
                const producto  = await productQuery.get()

                if(producto.exists){
                    guardarProducto(producto.data())
                    guardarConsultarDB(false)
                }else{
                    guardarError(true)
                    guardarConsultarDB(true)
                }
                guardarProducto(producto.data())

            }

            obtenerProducto()

        }
    },[id])


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


        guardarConsultarDB(true)

    }
//crear comentarios
const comentarioChange = e => {
    guardarComentario({
        ...comentario,
        [e.target.name] : e.target.value
    })
}

const esCreador = id => {
    if(creador.id === id) {
        return true
    }
}

const agregarComentario = e => {
    e.preventDefault()

    if(!usuario){
        return router.push('/login')
    }

    comentario.usuarioId = usuario.uid
    comentario.usuarioNombre = usuario.displayName

    const nuevosComentarios = [...comentarios , comentario]

    firebase.db.collection('productos').doc(id).update({
        comentarios : nuevosComentarios
    })




    guardarComentario({
        ...producto,
        comentarios: nuevosComentarios
    })

}

const puedeBorrar = () => {
    if(!usuario) return false

    if(creador){
         if(creador.id === usuario.uid){
            return true
        }
    }
    
}


const eliminarProducto =  async () => {
    if(!usuario){
        return router.push('/login')
    }

    if(creador){
        if(creador.id !== usuario.uid){
            return router.push('/')

       }
    }
    try{
        
        await firebase.db.collection('productos').doc(id).delete()
        router.push('/')

    
    }catch(error){
        console.log(error)
    }


}

    return ( 
    <Layout>
        <>
        {(Object.keys(producto).length === 0 && !error) ? 'cargando...' : null}

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
                    
                    <form
                    onSubmit={agregarComentario}
                    >
                        <Campo>
                                <input
                                        type="text"
                                        name="comentario"
                                        onChange={comentarioChange}
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
                 
                {!comentarios ? 'aun no hay comentarios' : ( 
                    <ul>
                   { comentarios.map(comentario => (
                    <li>
                        <p>{comentario.comentario}</p>
                       <p>Escrito por : {comentario.usuarioNombre}</p>
                        {esCreador(comentario.usuarioId) && (<p
                        css={css`
                        padding: 2px;
                        background-color: red;
                        color: white;
                        `}
                        >Creador del producto</p>)}
                    </li>
                ))}
                </ul>
                )}
            
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
        {puedeBorrar() && (
            <Boton
            onClick={eliminarProducto}
            >Eliminar Producto</Boton>
        )}
        </div>
        ) }



     

        </>
    </Layout>
     );
}
 
export default Productos;