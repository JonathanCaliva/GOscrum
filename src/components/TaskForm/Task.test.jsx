import {render,screen} from '@testing-library/react'
import TaskForm from './TaskForm.jsx'

it('renderiza un h2',()=>{
    render(<TaskForm />)

    expect(screen.getByRole('heading',{level:2, name:'Crear tarea'})).toBeInTheDocument()
})