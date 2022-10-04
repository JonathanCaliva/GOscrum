import React,{useState, useEffect} from 'react'
import {useFormik} from 'formik'
import *as Yup from 'yup'
import { useNavigate, Link } from 'react-router-dom'
import {v4 as uuidv4} from 'uuid'
import {Switch, FormControlLabel } from '@mui/material'
import '../Auth.style.css'

const {REACT_APP_API_ENDPOINT} = process.env

export default function Register(){

    const [data,setData] = useState()

    const navigate = useNavigate()

    useEffect(()=>{
        fetch(`${REACT_APP_API_ENDPOINT}/auth/data`).then(response=> response.json()).then(data => setData(data.result))
    },[])

    const required = '* Campo obligatorio'

    const formik = useFormik({
        initialValues:{
            username:'',
            password:'',
            email:'',
            teamID:'',
            role:'',
            continent:'',
            region:'',
            switch: false
        },
        validationSchema: Yup.object().shape({
            username:Yup.string().min(4,'La cantidad minima de caracteres es 4').required(required),
            password:Yup.string().required(required),
            email:Yup.string().email('Debe ser un email valido').required(required),
            role:Yup.string().required(required),
            continent:Yup.string().required(required),
            region:Yup.string().required(required)
        }),
        onSubmit:()=>{
           const teamID= !values.teamID ? uuidv4() : values.teamID
           fetch(`${REACT_APP_API_ENDPOINT}/auth/register`,{
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
                user:{
                    userName: values.username,
                    password :values.password,
                    email:values.email,
                    teamID: teamID,
                    role:values.role,
                    continent: values.continent,
                    region:values.region
                }
            })
           }).then(response => response.json()).then(data=> navigate('/registered/' + data.result.user.teamID,{replace:true}))
        }
    })

    const {handleSubmit, handleChange, errors, values, touched, handleBlur} = formik

    function handleChangeContinent(e){
        formik.setFieldValue('continent', e)  
        if(e !== 'America') formik.setFieldValue('region', 'Otro')  
    }


    return(
        <div className='auth'>
            <form onSubmit={handleSubmit} >
                <h1>Registro</h1>
                <div>
                    <label>Nombre de usuario</label>
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
                    <label>Email</label>
                    <input 
                    name='email' 
                    type='email' 
                    value={values.email} 
                    onChange={handleChange } 
                    onBlur={handleBlur}
                    />
                    {errors.email && touched.email && <div>{errors.email}</div>}
                </div>
                <FormControlLabel
                    control={
                        <Switch
                            value={values.switch}
                            onChange={()=> formik.setFieldValue('switch', !formik.values.switch)}
                            name='switch'
                            color='secondary'
                        />
                    }
                    label='Perteneces a un equipo ya creado'
                />
                {values.switch && (
                <div>
                    <label>Introduce el identificador de equipo</label>
                    <input  
                        type='text' 
                        name='teamID' 
                        value={values.teamID}  
                        onChange={handleChange}
                    />
                </div>
                )}
                <div>
                    <label>Rol</label>
                    <select 
                    name='role'
                    value={values.role} 
                    onChange={handleChange } 
                    onBlur={handleBlur}
                    >
                        <option value=''>Seleccionar Role</option>
                        {data?.Rol.map(option=>(
                            <option value={option} key={option} >{option}</option>
                        ))}
                    </select>
                    {errors.role && touched.role && <div>{errors.role}</div>}
                </div>               
                <div>
                    <label>Continente</label>
                    <select 
                    name='continent'
                    value={values.continent} 
                    onChange={e => handleChangeContinent(e.target.value) } 
                    onBlur={handleBlur}
                    >
                        <option value=''>Seleccionar continente</option>
                        {data?.continente.map(option=>(
                            <option value={option} key={option} >{option}</option>
                        ))}
                    </select>
                    {errors.continent && touched.continent && <div>{errors.continent}</div>}
                </div>
                {values.continent === 'America' && ( 
                <div>
                    <label>Region</label>
                    <select 
                    name='region'
                    value={values.region} 
                    onChange={handleChange } 
                    onBlur={handleBlur}
                    >
                        <option value='' >Seleccionar Region</option>
                        {data?.region.map(option=>(
                            <option value={option} key={option} >{option}</option>
                        ))}
                    </select>
                    {errors.region && touched.region && <div>{errors.region}</div>}
                </div>)}
                <div>
                    <button type='submit' >Enviar</button>
                </div>
                <div>
                    <Link to='/login'>Iniciar sesión</Link>
                </div>
            </form>
        </div>
    )
}