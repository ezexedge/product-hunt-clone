import React , {useState,useContext}from 'react';
import { css } from '@emotion/core'
import Router,{useRouter} from 'next/router'
import FileUploader from 'react-firebase-file-uploader'
import Layout from '../components/layout/Layout'
import {Formulario, Campo, InputSubmit, Error } from '../components/ui/Formulario'


import {FirebaseContext} from '../firebase'
//validaciones

import useValidacion from '../hooks/useValidacion'
import validarCrearProducto from '../validacion/validarCrearProducto'

const STATE_INICIAL = {
    nombre :'',
    empresa: '',
    url: '',
    descripcion: ''
}

const NuevoProducto = () => {

    const [error,guardarError] = useState(false)
    const [nombreImagen , guardarNombre] = useState('')
    const [subiendo,guardarSubiendo] = useState(false)
    const [progreso ,guardarProgreso] = useState(0)
    const [urlImagen,guardarUrlImagen] = useState('') 


    const  {valores,errores, submitForm,handleSubmit,handleChange,handleBlur } = useValidacion(STATE_INICIAL,validarCrearProducto,crearProducto)

    const {nombre,empresa,imagen,url,descripcion} = valores
    const router = useRouter()

    const {usuario,firebase} = useContext(FirebaseContext)

    async function crearProducto(){

        if(!usuario){
            return router.push('/')
        }

        const producto = {
            nombre,
            empresa,
            url,
            urlImagen,
            descripcion,
            votos:0,
            comentarios: [],
            creado: Date.now()
        }
        //lo insertamos en la base de datos
        firebase.db.collection('productos').add(producto)

        return router.push('/')
    }

    const handleUploadStart = () => {
        guardarProgreso(0);
        guardarSubiendo(true);
    }
  
    const handleProgress = progreso => guardarProgreso({ progreso });
  
    const handleUploadError = error => {
        guardarSubiendo(error);
        console.error(error);
    };
  
    const handleUploadSuccess = nombre => {
        guardarProgreso(100);
        guardarSubiendo(false);
        guardarNombre(nombre)
        firebase
            .storage
            .ref("productos")
            .child(nombre)
            .getDownloadURL()
            .then(url => {
              console.log(url);
              guardarUrlImagen(url);
            } );
    }

    return (  
        <div>
            <Layout>
                <>
                <h1
                css={css`
                
                text-align: center;
                margin-top: 5rem;

                `}
                >Nuevo producto</h1>
                <Formulario
                onSubmit={handleSubmit}
                noValidate
                >
                
                <fieldset>
                    <legend>Informacion general</legend>
                    <Campo>
                        <label>Nombre</label>
                        <input 
                        type="text"
                         id="nombre" 
                         placeholder="tu nombre"
                          name="nombre" 
                         value={nombre}
                         onChange={handleChange}
                         onBlur={handleBlur}
                        />
                    </Campo>

                     {errores.nombre && <Error>{errores.nombre}</Error> }
                
                     <Campo>
                     <label>Empresa</label>
                     <input 
                     type="text"
                      id="empresa" 
                      placeholder="nombre de empresa"
                       name="empresa" 
                      value={empresa}
                      onChange={handleChange}
                      onBlur={handleBlur}
                     />
                 </Campo>

                  {errores.empresa && <Error>{errores.empresa}</Error> }
            
                  <Campo>
                  <label>imagen</label>
                  <FileUploader
                  accept="image/*"
                  id="imagen"
                  name="imagen"
                  randomizeFilename
                  storageRef={firebase.storage.ref("productos")}
                  onUploadStart={handleUploadStart}
                  onUploadError={handleUploadError}
                  onUploadSuccess={handleUploadSuccess}
                  onProgress={handleProgress}
                  />
              </Campo>
         
               <Campo>
               <label>url</label>
               <input 
               type="url"
                id="url" 
                placeholder="ingrese url"
                 name="url" 
                value={url}
                onChange={handleChange}
                onBlur={handleBlur}
               />
           </Campo>

            {errores.url && <Error>{errores.url}</Error> }

            </fieldset>

            <fieldset>
                <legend>sobre tu producto</legend>

                <Campo>
                <label>descripcion</label>
                <textarea 
                 id="descripcion" 
                  name="descripcion" 
                 value={descripcion}
                 onChange={handleChange}
                 onBlur={handleBlur}
                />
            </Campo>
 
             {errores.descripcion && <Error>{errores.descripcion}</Error> }
 
            </fieldset>
             
            {error && <Error>{error}</Error>}

            <InputSubmit

            type="submit"
            value="crear producto"

            />
                </Formulario>
                
                </>
            </Layout>
            </div>
    
    );
}
export default NuevoProducto;