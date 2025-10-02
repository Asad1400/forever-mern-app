import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'

const Contact = () => {
  return (
    <div>
      <div className='text-center text-2xl pt-10 border-t'>
        <Title text_1={"CONTACT"} text_2={"US"}/>
      </div>
      <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28'>
        <img src={assets.contact_img} className='w-full md:max-w-[480px]' alt="" />
        <div className='flex flex-col justify-center items-start gap-6'>
          <p className='font-semibold text-xl text-gray-600'>Our Store</p>
          <p className='text-gray-500'>57409 Lakeshore Drive New York</p>
          <p className='text-gray-500'>Tel: (415) 555-5555 <br /> Email: admin@Forever.com</p>
          <p className='font-semibold text-xl text-gray-600'>Careers at Forever</p>
          <p className='text-gray-600'>Learn more about our teams and job openings</p>
          <button className='border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition duration-500 ease-in-out'>Explore Jobs</button>
        </div>
      </div>
    </div>
  )
}

export default Contact
