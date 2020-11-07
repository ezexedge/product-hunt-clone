import React from 'react';
import styled from '@emotion/styled'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import {es} from 'date-fns/locale'

const Producto = styled.li`

    padding: 4rem;
    display: flex;
    justify-content: space-between;
    align-items:center;
    border-bottom: 1px solid black;

`

const DescripcionProducto = styled.div`
//flex 0 no crece y no se haga mas pequeno de 600px ,600px en la base
    flex: 0 1 600px;
    display: grid;
    grid-template-columns: 1fr 3fr;
    column-gap: 2rem;
`

const Titulo = styled.a`

    font-size: 2rem;
    font-weight: bold;
    margin: 0;
    :hover{
        cursor: pointer;
    }

`


const Comentarios = styled.div`
    margin-top: 2rem;
    display:flex;
    align-items: center;
    div{
        display: flex;
        align-items: center;
        border: 1px solid black;
        padding: .3rem 1rem;
        margin-right: 2rem;

    }
    img{
        width: 2rem;
        margin-right: 2rem;

    }
    p{
        font-size: 1.6rem;
        margin-right: 1rem;
        font-weight: 700;
        &:last-of-type{
            margin: 0;
        }
    }

`
const Votos = styled.div`
    flex: 0 0 auto;
    text-align: center;
    border: 1px solid black;
    padding: 1rem 3rem;
    div{
        font-size: 2rem;
    }

    p{
        margin: 0;
        font-size: 2rem;
        font-weight: 700;
    }

`

const Imagen = styled.img`

    width: 200px;

`


const TextoDescripcion = styled.p`

    font-size: 1.6rem;
    margin: 0;
    color: grey;


`

const DetallesProducto = ({producto}) => {

    const  {id,comentarios,descripcion,empresa,nombre,url,urlImagen,votos,creado} = producto

    return ( 

            <Producto>

            <div>
            <Imagen src={urlImagen} />
            </div>
            
            <DescripcionProducto>
            <Titulo>{nombre}</Titulo>
            <TextoDescripcion>{descripcion}</TextoDescripcion>

            <Comentarios>
                <img src="/static/img/comentario.png" />
                <p>{comentarios.length} comentarios</p>

            </Comentarios>

    <p>Publicado hace: {formatDistanceToNow(new Date(creado),{locale: es})}</p>


            </DescripcionProducto>
            <Votos>
                <div>&#9650;</div>
                <p>{votos}</p>
                </Votos>         
            </Producto>

     );
}
 
export default DetallesProducto;