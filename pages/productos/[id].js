import React , {useEffect,useContext,useState} from 'react';
import {useRouter} from 'next/router'
import Error404 from '../../components/layout/404'
import Layout from '../../components/layout/Layout'
import {FirebaseContext} from '../../firebase'
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

    return ( 
    <Layout>
        <>
        {error && <Error404/>}
        </>
    </Layout>
     );
}
 
export default Productos;