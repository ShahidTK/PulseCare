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
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad ullam, magni iure iste hic, commodi eligendi odio dicta alias dolore aliquam velit. Laboriosam dicta aliquid odio facere corporis dolorem hic!
          Earum doloribus, tempora, non labore vero sint nemo temporibus numquam facilis pariatur rem fugiat deserunt eligendi est laudantium voluptatum ex! Adipisci illo culpa enim error officiis ratione eos repudiandae rem? </p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum officiis architecto qui accusamus? Suscipit, illum. adipisicing elit. Eligendi dolores sint sunt explicabo quam dolorum. Lorem ipsum dolor sit, amet consectetur  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ex, at a alias blanditiis earum quibusdam.</p>
          <b className='text-gray-800'>Our Vision</b>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat eum accusamus delectus dolore exercitationem. Doloribus modi saepe non corrupti, rem odio praesentium animi, veniam minus recusandae molestiae quisquam explicabo obcaecati.
          Ut rem iusto delectus pariatur voluptates at obcaecati est magnam, deleniti ipsa tenetur cumque. Neque consectetur vitae quae ratione, nostrum molestiae quis, dolorum minima beatae labore, incidunt cum consequuntur molestias.
          Voluptas dolores in excepturi quo repellendus, nisi neque ipsum enim accusamus fuga. Animi dolore non recusandae deleniti, est distinctio, odio, commodi magnam id harum suscipit asperiores! Incidunt fugit ipsum et!</p>
        </div>
      </div>

      <div>
         <p>WHY <span className='text-gray-700 font-semibold'>CHOOSE US</span></p>
      </div>

      <div className='flex flex-col md:flex-row mt-2 mb-20'>
        <div className='border px-16 py-8 sm:py-16 flex flex-col gap-5 hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer'>
          <b>Efficiency</b>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae, assumenda nisi fugiat maiores illum corporis?</p>
        </div>
        <div className='border px-16 py-8 sm:py-16 flex flex-col gap-5 hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer'>
          <b>Convenience</b>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt praesentium dolore magnam vitae laborum natus?</p>
        </div>
        <div className='border px-16 py-8 sm:py-16 flex flex-col gap-5 hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer'>
        <b>Personalization</b>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus aut debitis a unde ad excepturi.</p>
        </div>
      </div>
    </div>
  )
}

export default About
