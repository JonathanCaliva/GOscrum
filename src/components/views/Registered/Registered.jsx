import {useParams} from 'react-router-dom'
import {Link} from 'react-router-dom'
import './Registered.style.css'

export default function Registered(){

    const {teamID} = useParams()

    return(
        <>
            <h1 className='titulo' >GO scrum te permite que trabajes y compartas tareas con tu equipo...</h1>
            <h6 className='containerI'>El team ID de tu equipo es : {teamID} </h6>
            <Link to='/login'>
                <button className='botonI' >Iniciar Sesion</button>
            </Link>
        </>
    )
}