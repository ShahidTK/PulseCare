import React, { useContext, useState } from 'react'
import {assets} from '../assets/assets.js' 
import { AdminContext } from '../context/AdminContext.jsx'
import axios from 'axios'
import { toast } from 'react-toastify'
import { DoctorContext } from '../context/DoctorContext.jsx'
const Login = () => {

    const [state, setState] = useState('Admin')
    const {setAToken, backendUrl} = useContext(AdminContext)
    const {setDToken, dToken} = useContext(DoctorContext)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const onSubmitHandler = async (event) => {
        event.preventDefault()
        try{
          if(state==='Admin'){
            const {data} = await axios.post(backendUrl + '/api/admin/login', {email, password}) 
            if(data.success){
                setAToken(data.token);
                localStorage.setItem('aToken', data.token)  
            }  else {
                toast.error(data.message)
            }
            // doctor login
          } else{
            const {data} = await axios.post(backendUrl + '/api/doctor/login', {email, password}) 
            if(data.success){
                console.log(data.token)
                setDToken(data.token);
                localStorage.setItem('dToken', data.token)  
            }  else {
                toast.error(data.message)
            }
          }
        } catch(error){
          console.log(error.message)
        }
    }

  return (
    <form onSubmit={onSubmitHandler} className='min-h-[80vh] flex items-center'>
      <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border-none rounded-xl text-[#5E5E5E] text-sm shadow-lg'>
        <p className='text-2xl font-semibold m-auto'><span className='text-primary'> {state} </span> Login </p>
        <div className='w-full'>
            <p>Email</p>
            <input onChange={(e)=> setEmail(e.target.value)} value = {email} className='border border-[#DADADA] rounded w-full p-2 mt-1' type="email" required/>
        </div>
        <div className='w-full'>
            <p>Password</p>
            <input onChange={(e)=> setPassword(e.target.value)} value = {password} className='border border-[#DADADA] rounded w-full p-2 mt-1'  type="text" required/>
        </div>
        <button className=' cursor-pointer bg-primary text-white w-full py-2 rounded-md text-base' type="submit" > Login</button>
        {
            state==='Admin'
            ? <p>Doctor Login <span className='text-primary underline cursor-pointer' onClick={()=> setState('Doctor')}>Click here</span> </p>
            : <p>Admin Login <span className='text-primary underline cursor-pointer'  onClick={()=>  setState('Admin')}>Click here</span></p>
        }
      </div>
    </form>
  )
}

export default Login
