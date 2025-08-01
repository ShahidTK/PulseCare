import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/Appcontext'
import { useNavigate } from 'react-router-dom'

const RelatedDoctors = ({speciality, docId}) => {
    const navigate = useNavigate()
    const {doctors} = useContext(AppContext)

    const [relDoc, setRelDoc] = useState([])

    useEffect(()=>{
        if(doctors.length>0 && speciality){
            const doctorsData= doctors.filter((doc)=> doc.speciality === speciality && doc._id!== docId)
            setRelDoc(doctorsData)
        }
    }, [doctors, speciality, docId])
  return (
    <div className='flex flex-col items-center gap-4 my-16 text-gray-900 md:mx-10'>
      <h1 className='text-3xl font-medium'>Related Doctors</h1>
      <p className='sm:w-1/3 text-center text-sm'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil, esse!</p>
      <div  className='w-full grid  gap-4 pt-5 gap-y-6 px-3 sm:px-0'  style={{ gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))" }}>
        {relDoc.slice(0, 5).map((item)=>(
            <div onClick={()=> {navigate(`/appointment/${item._id}`); scrollTo(0, 0)}} className='border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:-translate-y-3 transform transition duration-500'>
                <img className='bg-blue-50' src={item.image} alt="" />
                <div className='p-4'>
                <div className={`flex items-center gap-2 text-sm text-center  ${item.available? 'text-green-500' : 'text-gray-500'} `}>
                        <p className={`w-2 h-2 ${item.available? 'bg-green-500' : 'bg-gray-500'} rounded-full`}></p> <p>{item.available? 'Available' : 'Not available' }</p>
                    </div>
                    <p className='text-gray-900 text-lg font-medium'>{item.name}</p>
                    <p className='text-gray-600 text-sm'>{item.speciality}</p>
                </div>
            </div>
        ))}
      </div>
      <button onClick={()=> {navigate('/doctors'); scrollTo(0,0)}} className='bg-blue-50 text-gray-600 px-12 py-3 rounded-full mt-10 cursor-pointer hover:bg-blue-200'>More</button>
    </div>
  )
}

export default RelatedDoctors
