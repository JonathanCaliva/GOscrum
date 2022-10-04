import React from 'react'
import {useNavigate} from 'react-router-dom'
import './Header.style.css'

export default function Header(){

    const navigate = useNavigate()

    function handleLogOut(){
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        localStorage.removeItem('teamID')
        navigate('/')
    }

    const username = localStorage.getItem('username')

    return(
       <header>
        <span>GO Scrum</span>
        <div className='wrapper_right-header'>
            <div>{username}</div>
            <div onClick={()=> handleLogOut() }>x</div>
        </div>
       </header> 
    )
}