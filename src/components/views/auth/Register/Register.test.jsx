import {render, screen} from '@testing-library/react'
import {MemoryRouter} from 'react-router-dom'
import {rest} from 'msw'
import {setupServer} from 'msw/node'
import Register from './Register'

const server = setupServer( rest.get('http:localhost:8080/auth/data',(_,res,ctx)=>{
    return res(
        ctx.json({
            result:{
                continente: [
                    "America",
                    "Europa",
                    "Otro"
                ],
                region: [
                    "Otro",
                    "Latam",
                    "Brasil",
                    "America del Norte"
                ],
                Rol: [
                    "Team Member",
                    "Team Leader"
                ]
            }
        })
    )
}))

beforeAll(()=> server.listen())
afterAll(()=> server.close())

it('fetch options', async ()=>{
    render(<Register />,{wrapper:MemoryRouter})

    expect(
        await screen.findByRole('option',{name:'America'})
    ).toBeInTheDocument()
})