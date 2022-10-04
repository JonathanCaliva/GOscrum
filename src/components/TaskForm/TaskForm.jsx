import React,{useState} from 'react'
import {useFormik} from 'formik'
import *as Yup from 'yup'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './TaskForm.style.css'

const {REACT_APP_API_ENDPOINT} = process.env

export default function TaskForm(){

    const required ='* Campo obligatorio'

    const [teamID, setTeamID] = useState(false)

    const formik = useFormik({
        initialValues:{
            title:'',
            status:'',
            importance:'',
            description:'',    
        },
        validationSchema: Yup.object().shape({
            title: Yup.string().min(6,'La cantidad minima de caracteres es 6').required(required),
            status: Yup.string().required(required),
            importance:Yup.string().required(required),
            description: Yup.string().required(required)
        }),
        onSubmit:()=>{
            fetch(`${REACT_APP_API_ENDPOINT}/task`,{
                method: 'POST',
                headers: {
                    'Content-Type' : 'application/json',
                    'Authorization' : 'Bearer ' + localStorage.getItem('token')
                },
                body: JSON.stringify({
                    task:{
                        title: values.title,
                        status :values.status,
                        importance:values.importance,
                        description: values.description
                    }
                })
               }).then(response => response.json()).then(()=>{
                resetForm()
                toast('tu tarea se creo')})
        }
    })

    const {handleSubmit, handleChange, handleBlur, errors,touched,values,resetForm} = formik

    return(
        <section className='task-form'>
            {teamID? (
                <button onClick={()=> setTeamID(false)}>{localStorage.getItem('teamID')}</button>
            ):<button onClick={()=> setTeamID(true)} >VISUALIZAR TEAM ID DE EQUIPO</button>}
            
            <br/>
            <h2>Crear tarea</h2>
            <p>Crea tus tareas</p>
            <form onSubmit={handleSubmit}>
                <div>
                    <div>
                        <input
                            name='title'
                            value={values.title}
                            onChange={handleChange}
                            placeholder='Titulo'
                            onBlur={handleBlur}
                            className={errors.title? 'errorTitle' : ''}
                        />
                            {errors.title && touched.title && <span className='errorMenssage'>{errors.title}</span>}
                            
                    </div>
                    <div>
                        <select                            
                            name='status'
                            value={values.status}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={errors.status? 'errorStatus' : ''}
                        >
                            <option value=''>Seleccionar un estado</option>
                            <option value='NEW'>Nueva</option> 
                            <option value='IN PROGRESS'>En proceso</option>
                            <option value='FINISHED'>Finalizada</option>
                        </select>
                        {errors.status && touched.status && <span className='errorMenssage'>{errors.status}</span>}
                    </div>
                    <div>
                        <select                            
                            name='importance'
                            value={values.importance}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={errors.importance? 'errorP' : ''}
                        >
                            <option value=''>Seleccionar una prioridad</option>
                            <option value='LOW'>Baja</option> 
                            <option value='MEDIUM'>Media</option>
                            <option value='HIGH'>Alta</option>
                        </select>
                        {errors.importance && touched.importance && <span className='errorMenssage'>{errors.importance}</span>}
                    </div>
                    <div>
                        <textarea 
                        name='description' 
                        value={values.description}
                        onChange={handleChange} 
                        placeholder='Descripcion...'
                        onBlur={handleBlur}
                         />
                         {errors.description && touched.description && <span className='errorMenssage'>{errors.description}</span>}
                    </div>
                </div>
                <button type='submit'>Crear</button>
            </form>
            <ToastContainer/>
        </section>
    )
}