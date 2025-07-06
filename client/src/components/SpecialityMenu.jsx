import React from 'react'
import { specialityData } from '../assets/assets/assets'
import { Link } from 'react-router-dom'
const SpecialityMenu = () => {
  return (
    <div className='flex flex-col items-center gap-4 py-16 text-gray-800' id='speciality' >
        <h1 className='text-3xl font-medium'>Find by speciality</h1>
        <p className='w-1/3 text-center text-sm'>Lorem ipsum dolor sit amet consectetur adipisicing elit. <br /> Obcaecati reiciendis unde ipsam dignissimos quo</p>
        <div className='flex flex-row sm:justify-center gap-4 pt-5 w-full overflow-scroll'>
            {specialityData.map((item, index)=>(
                <Link onClick={()=> scrollTo(0, 0)} className='flex flex-col items-center text-xs cursor-pointer flex-shrink-0 hover:translate-y-[-10px] transition-all duration-500' to={`/doctors/${item.speciality}`}>
                    <img className='w-16 sm:w-24 mb-2' src={item.image} alt="" />
                    <p className='mt-2 text-center'>{item.speciality}</p>
                </Link>
            ))}
        </div>
    </div>
  )
}

export default SpecialityMenu
