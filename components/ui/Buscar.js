import React, { useState } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/core'
import Router from 'next/router'

const InputText = styled.input`
    border: 1px solid var(--gris3);
    padding: 1rem;
    min-width: 300px;

`

const InputSubmit = styled.button`

    height: 3rem;
    width: 3rem;
    display: block;
    background-size: 4rem;
    background-image: url('/static/img/buscar.png');
    background-repeat: no-repeat;
    position: absolute;
    right: 1rem;
    background-color: white;
    border: none;
    top: 1px;
    &:hover{
        cursor: pointer;
    }
`

const Buscar = () => {

    const [busqueda,guardarBusqueda] = useState('')


    const buscarProducto = event => {
        event.preventDefault()

        if(busqueda.trim() === '')return


        Router.push({
            pathname: '/buscar',
            query: {q : busqueda}
        })

       // console.log('buscando ....',busqueda)
    }

    return ( 
        <form 
            css={css`
                position: relative;
            `}

            onSubmit={buscarProducto}
        >
            <InputText type="text" placeholder="buscar productos" 
            onChange={e=>guardarBusqueda(e.target.value)}
            />

            <InputSubmit type="submit"></InputSubmit>
        </form>

     );
}
 
export default Buscar;