import React, { useState, useContext, useEffect } from 'react'
import { AppContext } from '../context/Appcontext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const navigate = useNavigate()
  const [state, setState] = useState('Sign Up')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const {backendUrl, token, setToken} = useContext(AppContext)

  const onSubmitHandler = async (event)=>{
    event.preventDefault()
    try{
      if(state === 'Sign Up'){
        const {data} = await axios.post(backendUrl + '/api/user/register', {name, password, email})
        if(data.success){
          localStorage.setItem('token', data.token)
          setToken(data.token)
          console.log("login success")
        }  else{
          toast.error(data.message)
        }
      } else{
        const {data} = await axios.post(backendUrl + '/api/user/login', {password, email})
        if(data.success){
          localStorage.setItem('token', data.token)
          setToken(data.token)
          toast.success("logged in successsfully")
        }  else{
          toast.error(data.message)
        }
      }

    } catch(error){
      toast.error(error.message)
    }
  }

  useEffect(()=> {
    if(token){
      navigate('/')
    }
  }, [token])
  return (
    
    <form onSubmit={onSubmitHandler} className='min-h-[80vh] flex items-center'>
      <div className='flex flex-col m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-zinc-600 text-sm shadow-lg gap-3'>
        <p className='text-2xl font-semibold'>{state==='Sign Up' ? "Create Account" : "Login"}</p>
        <p>Please {state=='Sign Up'? "Sign up" : "Login"} to book appointment</p>
        {
          state==='Sign Up' && <div className='w-full'>
          <p>Full Name</p>
          <input className='border border-zinc-300 rounded w-full p-2 mt-1' type="text" onChange={(e)=> {
              setName(e.target.value)
          }} value={name}/>
        </div>
        
        }
        
        <div className='w-full'>
          <p>Email</p>
          <input className='border border-zinc-300 rounded w-full p-2 mt-1' type="email" onChange={(e)=> {
              setEmail(e.target.value)
          }} value={email}/>
        </div>
        <div className='w-full'>
          <p>Password</p>
          <input className='border border-zinc-300 rounded w-full p-2 mt-1' type="password" onChange={(e)=> {
              setPassword(e.target.value)
          }} value={password}/>
        </div>
        <button type='submit' className='bg-primary text-white py-2 cursor-pointer  w-full rounded-md text-base mt-2'>{state==='Sign Up' ? "Create Account" : "Login"}</button>
        {
          state==='Sign Up'
          ? <p>Already have an account ? <span className='text-primary underline cursor-pointer' onClick={()=> setState('Login')}>Login here</span></p>
          : <p>Create an new account? <span className='text-primary underline cursor-pointer' onClick={()=> setState('Sign Up')}>click here</span></p>

      }
      </div>


    </form>
  )
}

export default Login
