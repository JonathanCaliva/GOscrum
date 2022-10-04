import React,{useState,useEffect} from 'react'
import {useResize} from '../../../hooks/useResize'
import Card from '../../Card/Card'
import Header from '../../Header'
import TaskForm from '../../TaskForm'
import debounce from 'lodash.debounce'
import FormControl from '@mui/material/FormControl'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Radio from '@mui/material/Radio'
import Skeleton from 'react-loading-skeleton'
import {useSelector, useDispatch} from 'react-redux'
import {getTasks,deleteTask,editTaskStatus} from '../../../store/actions/taskActions'
import 'react-loading-skeleton/dist/skeleton.css'
import './Tasks.style.css'



export default function Tasks(){

    const [list,setList] = useState(null)
    const [renderList, setRenderList] = useState(null)
    const [search, setSearch] = useState('')
    const [taskFromWho, setTaskFromWho] = useState('ALL')
    const {isPhone} = useResize()
    const dispatch = useDispatch()

    const {loading,error,tasks} = useSelector(state =>{
        return state.taskReducer
    })
  
    useEffect(()=>{
        dispatch(getTasks(taskFromWho === 'ME'? '/me' : ''))
    },[taskFromWho,dispatch])

    useEffect(()=>{
        if(tasks?.length){
            setList(tasks)
            setRenderList(tasks)
        }
    },[tasks])
    
    useEffect(()=>{
        if(search){
            setRenderList(list.filter(data=> data.title.startsWith(search)))
        }else{
            setRenderList(list)
        }
    },[search])
    
    if(error) return <div>Ocurrio un error con el servidor. Intente de nuevo .</div>

    function limitString(string){
        if(string.length > 170){
            return {string : string.slice(0,167).concat('...'), addButton :true}
        }
        return {string : string, addButton:false}
    }

    function renderAllCards(){
        return renderList?.map((data)=> <Card key={data._id} data={data} limitString={limitString} deleteCard={handleDelete} aditCardStatus={handleEditCardStatus} />)
    }

    function renderColumnCards(text){
        return renderList?.filter(data => data.status === text).map((data)=> <Card key={data._id} data={data} limitString={limitString} deleteCard={handleDelete} aditCardStatus={handleEditCardStatus} />)
    }

    function handleChangeImportance(e){
        if(e.target.value === 'ALL' || e.target.value === '' ) {
            setRenderList(list)
        }else{
        setRenderList(list.filter(data=> data.importance === e.target.value))
        }
    }

    const handleSearch = debounce(e =>{
        setSearch(e?.target?.value)
    },500)

    function handleDelete(id){
        dispatch(deleteTask(id))
    }

    function handleEditCardStatus(data){
        dispatch(editTaskStatus(data))
    }
    
    return(
        <>
        <Header/>
        <main id='tasks'>
            <TaskForm/>
            <section className='wrapper_list' >
                <div className='list_header' >
                    <h2>Mis tareas</h2>
                </div>
                <FormControl>
                    <RadioGroup 
                        row
                        aria-labelledby='demo-row-radio-buttons-group-label'
                        onChange={(e)=> setTaskFromWho(e.target.value)}
                        >
                        <FormControlLabel 
                            value='ALL'
                            control={<Radio/>}
                            label='Todas'
                        />
                        <FormControlLabel
                            value='ME'
                            control={<Radio/>}
                            label='Mis tareas'
                        />
                    </RadioGroup>
                </FormControl>
                <div>
                    <input 
                    type='text' 
                    placeholder='Buscar por tarea...' 
                    className='selectPrioridad' 
                    onChange={handleSearch}                         
                    />
                </div>
                <div>
                    <select className='selectPrioridad' name='importance' onChange={(e)=>handleChangeImportance(e)}>
                        <option value=''>Seleccionar una prioridad</option>
                        <option value='ALL'>Todas</option>
                        <option value='LOW'>Baja</option>
                        <option value='MEDIUM'>Media</option>
                        <option value='HIGH'>Alta</option>
                    </select>
                </div>
                {isPhone? renderList?.length === 0 ? <div>No hay tareas creadas</div> :
                loading ?
                    <>
                        <Skeleton height={90}/> 
                    </>
                    : (
                    <div className='list phone' >
                    {renderAllCards()}
                </div>) : (
                <div className='list_group'>
                {renderList?.length === 0 ? <div>No hay tareas creadas</div> : 
                loading ?
                    <>
                        <Skeleton height={90}/> 
                    </>:
                    <>
                        <div className='list' >
                            <h4>Nuevas</h4>
                            {renderColumnCards('NEW')}
                        </div>
                        <div className='list' >
                            <h4>En proceso</h4>
                            {renderColumnCards('IN PROGRESS')}
                        </div>
                        <div className='list' >
                            <h4>Finalizadas</h4>
                            {renderColumnCards('FINISHED')}
                        </div>
                    </>
                    }
                </div>
                )}
            </section>
        </main>
        </>
    )
}