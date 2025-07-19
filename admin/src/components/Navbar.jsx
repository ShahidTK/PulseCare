import React, { useContext } from 'react'
import { AdminContext } from '../context/AdminContext'
import {useNavigate} from 'react-router-dom'
import { assets } from '../assets/assets'
import { DoctorContext } from '../context/DoctorContext'

const Navbar = () => {
    const {aToken, setAToken} = useContext(AdminContext)
    const {dToken, setDToken} = useContext(DoctorContext)
    const navigate = useNavigate();
    const logout = () => {
      aToken && setAToken('')
      dToken && setDToken('')
      aToken && localStorage.removeItem('aToken')
      dToken && localStorage.removeItem('dToken')
      navigate('/')
    }
  return (
    <div className='flex justify-between items-center px-4 sm:px-10 py-3'>
       <div className='flex items-center text-xs gap-2'>
            <img className='w-36 sm:w-40 cursor-pointer' src={assets.admin_logo} alt="" />
            <p className='border px-2.5 py-0.5 rounded-full border-gray-500 text-gray-600'>{aToken? 'Admin' : 'Doctor'}</p>
       </div>
       <button onClick={logout} className='bg-primary text-white text-sm px-10 py-2 rounded-full cursor-pointer'>Logout</button>
    </div>
  )
}

export default Navbar
