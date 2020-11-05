import React , {useState}from 'react';
import { css } from '@emotion/core'
import Router from 'next/router'
import Layout from '../components/layout/Layout'
import {Formulario, Campo, InputSubmit, Error } from '../components/ui/Formulario'


import firebase from '../firebase'
//validaciones

import useValidacion from '../hooks/useValidacion'
import validarIniciarSesion from '../validacion/validarIniciarSesion'

const STATE_INICIAL = {
    email: '',
    password: ''
}

const Login = () => {
    const [error,guardarError] = useState(false)


    const  {valores,errores, submitForm,handleSubmit,handleChange,handleBlur } = useValidacion(STATE_INICIAL,validarIniciarSesion,iniciarSesion)

    const {email,password} = valores


   async function iniciarSesion(){
       try{
       const usuario = await firebase.login(email,password)
       console.log(usuario) 
       Router.push('/')

       }catch(error){
        console.log('hubo un error al iniciar sesion',error.message)
        guardarError(error.message)
       }
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
                >Iniciar sesion</h1>
                <Formulario
                onSubmit={handleSubmit}
                noValidate
                >
                
                
                    
                    <Campo>
                    <label>Email</label>
                    <input type="email" id="email" placeholder="tu email" name="email"
                    value={email}
                    onChange={handleChange}
                    onBlur={handleBlur}

                    />
                </Campo>
                {errores.email && <Error>{errores.email}</Error> }



                <Campo>
                <label>Password</label>
                <input type="password" id="password" placeholder="tu password" name="password" 
                value={password}
                onChange={handleChange}
                onBlur={handleBlur}

                />
            </Campo>

            {errores.password && <Error>{errores.password}</Error> }
            {error && <Error>{error}</Error>}

            <InputSubmit

            type="submit"
            value="iniciar sesion"

            />
                </Formulario>
                
                </>
            </Layout>
            </div>
    
    );
}
 
export default Login;