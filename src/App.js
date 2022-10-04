import './App.css';
import {Route ,Routes, Navigate, useLocation } from 'react-router-dom'
import Login from './components/views/auth/Login'
import {lazy, Suspense} from 'react'
import Register from './components/views/auth/Register'
import Registered from './components/views/Registered'
import { AnimatePresence, motion } from 'framer-motion';
import Tasks from './components/views/Tasks'



function RequireAuth({children}){
    if(!localStorage.getItem('token')){
        return (
            <Navigate to='/login' replace={true} />
        )
    }
    
    return children
    
}

const Error404 = lazy(()=> import('./components/views/Error404'))

const pageTransition ={
    in:{
        opacity:1
    },
    out:{
        opacity:0
    }
}

export default function App(){

    const location = useLocation()

    return(
    <AnimatePresence>     
        <Routes location={location} key={location.pathname}>
            <Route 
                path='/' 
                element={
                    <RequireAuth>
                        <motion.div 
                            className='page'
                            initial='out'
                            animate='in'
                            exit='out'
                            variants={pageTransition} 
                            >
                            <Tasks/>
                        </motion.div>
                    </RequireAuth>} />
            <Route 
                path='/login' 
                element={   
                    <motion.div 
                            className='page'
                            initial='out'
                            animate='in'
                            exit='out'
                            variants={pageTransition} 
                            >                
                        <Login/>
                    </motion.div> } 
                / >
            <Route 
                path='/register' 
                element={ 
                    <motion.div 
                            className='page'
                            initial='out'
                            animate='in'
                            exit='out'
                            variants={pageTransition} 
                            >                       
                        <Register/>
                    </motion.div>    
                        }                         
                    />
            <Route 
                path='/registered/:teamID' 
                element={ 
                    <motion.div 
                            className='page'
                            initial='out'
                            animate='in'
                            exit='out'
                            variants={pageTransition} 
                            >                       
                        <Registered/>
                    </motion.div>    
                        }                         
                    />
            <Route 
                path='*' 
                element={
                    <motion.div 
                            className='page'
                            initial='out'
                            animate='in'
                            exit='out'
                            variants={pageTransition} 
                            >   
                        <Suspense fallback={<>...</>}>
                            <Error404/>
                        </Suspense>                     
                    </motion.div>    
                        } 
                    />
        </Routes>  
    </AnimatePresence>
    )    
}
