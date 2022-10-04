import React from 'react'
import { useNavigate, Link } from 'react-router-dom'
import {useFormik} from 'formik'
import *as Yup from 'yup'
import swal from '../../../../utils/swal'
import '../Auth.style.css'

const {REACT_APP_API_ENDPOINT} = process.env

export default function Login(){

    const navigate = useNavigate()

    const required = '* El campo es obligatorio'

    const formik = useFormik({
        initialValues:{
            username:'',
            password:''
        },
        validationSchema: Yup.object().shape({
            username: Yup.string().required(required),
            password: Yup.string().required(required)
        }),
        onSubmit:()=>{
            fetch(`${REACT_APP_API_ENDPOINT}/auth/login`,{
             method: 'POST',
             headers: {
                 'Content-Type' : 'application/json'
             },
             body: JSON.stringify({               
                     userName: values.username,
                     password :values.password,                
             })
            }).then(response => response.json())
              .then(data=>{
                console.log(data,'DATA LOGIN')
                if(data.status_code === 200){
                localStorage.setItem('username', data.result.user.userName)
                localStorage.setItem('token', data.result.token)
                localStorage.setItem('teamID',data.result.user.teamID)
                navigate('/',{replace:true})
                }else{
                    resetForm()
                    swal()
                }
            })
         }
    })

    const {handleSubmit, handleChange, errors, values, touched, handleBlur,resetForm} = formik


    return(
        <div className='auth'>
            <form onSubmit={handleSubmit} >
                <h1>Iniciar Sesion</h1>
                <div>
                    <label>Usuario</label>
                    <input 
                    name='username' 
                    type='text' 
                    value={values.username} 
                    onChange={handleChange } 
                    onBlur={handleBlur}
                    />
                    {errors.username && touched.username && <div>{errors.username}</div>}
                </div>
                <div>
                    <label>Contraseña</label>
                    <input 
                        name='password' 
                        type='password' 
                        value={values.password} 
                        onChange={handleChange} 
                        onBlur={handleBlur}
                        />
                        {errors.password && touched.password && <div>{errors.password}</div>}
                </div>
                <div>
                    <button type='submit' >Enviar</button>
                </div>
                <div>
                    <Link to='/register'>
                        Registrarme
                    </Link>
                </div>
            </form>
        </div>
    )
}