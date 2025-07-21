import React from 'react'
import { assets } from '../assets/assets/assets'

const About = () => {
  return (
    <div>
      <div className='text-center text-2xl pt-10 text-gray-500'>
      <p>ABOUT <span className='text-gray-700 font-medium'>US</span></p>
      </div>

      <div className='my-10 flex flex-col md:flex-row gap-12'>
        <img className='w-full md:max-w-[360px]' src={assets.about_image} alt="" />
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-sm text-gray-600'>
          <p>We are dedicated to making healthcare simple, accessible, and convenient for everyone.
          Our platform connects patients with trusted and experienced doctors across various specialties.
          With easy appointment booking, secure payments, and reliable medical care, we aim to enhance your healthcare experience.
          Whether it’s routine check-ups or specialist consultations, we ensure you get the right care at the right time.
          Our mission is to bridge the gap between patients and quality healthcare with trust and transparency.</p>
          <p>We believe that healthcare should be simple and stress-free. Through our platform, patients can find the right specialists, view their profiles, check availability, and book appointments in just a few clicks. With secure payment options and reliable support, we ensure a smooth experience for both patients and doctors. Our commitment is to bring trust, convenience, and care together on one platform.</p>
          <b className='text-gray-800'>Our Vision</b>
          <p>We envision a healthcare system where booking an appointment is effortless, waiting times are minimized, and every patient can easily access trusted doctors. By combining technology with compassion, we aim to make quality healthcare more convenient, transparent, and available to all.</p>
        </div>
      </div>

      <div>
         <p>WHY <span className='text-gray-700 font-semibold'>CHOOSE US</span></p>
      </div>

      <div className='flex flex-col md:flex-row mt-2 mb-20'>
        <div className='border px-16 py-8 sm:py-16 flex flex-col gap-5 hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer'>
          <b>Efficiency</b>
          <p>Save time with quick appointment booking and instant confirmations.
          Access trusted doctors without long waiting hours.
          Streamlined processes ensure a smooth healthcare experience.</p>
        </div>
        <div className='border px-16 py-8 sm:py-16 flex flex-col gap-5 hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer'>
          <b>Convenience</b>
          <p>Book appointments anytime, from anywhere, with just a few clicks.
            View doctor profiles, availability, and fees in one place.
            Secure payments and easy rescheduling at your fingertips.</p>
        </div>
        <div className='border px-16 py-8 sm:py-16 flex flex-col gap-5 hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer'>
        <b>Personalization</b>
        <p>Get matched with doctors based on your specific health needs.
          Receive reminders and updates tailored to your appointments.
          Enjoy a patient-focused approach that prioritizes your well-being.</p>
        </div>
      </div>
    </div>
  )
}

export default About
