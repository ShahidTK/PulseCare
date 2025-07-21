import React from 'react'
import { assets } from '../assets/assets/assets'

const Footer = () => {
  return (
    <div className='md:mx-10'>
    <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm '>

        {/* left section */}
      <div >
          <p className='mb-5 cursor-pointer text-blue-700 text-2xl font-bold'>PulseCare</p>
         <p className='w-full md:w-2/3 text-gray-600 leading-6'>Book appointments easily with trusted doctors and get quality care at your convenience. Stay connected with us for better healthcare services anytime, anywhere.</p>
      </div>
      
      {/* middle section */}
      <div>
            <p className='text-xl font-medium mb-5'>Company</p>
            <ul className='flex flex-col gap-2 text-gray-600'>
                <li>Home</li>
                <li>About Us</li>
                <li>Contact Us</li>
                <li>Privacy Policy</li>
            </ul>
      </div>

      {/* right section */}
      <div>
            <p className='text-xl font-medium mb-5'>Get in Touch</p>
            <ul className='flex flex-col gap-2 text-gray-600'>
                <li>+1-234-556-324</li>
                <li>pulsecare@gmail.com</li>
            </ul>
      </div>
        {/* copyright text */}
    </div>
      <div>
            <hr />
            <p className='py-5 text:sm text-center'>Copyright 2024@ PulseCare - All Right Reserved.</p>
      </div>
    </div>
  )
}

export default Footer
