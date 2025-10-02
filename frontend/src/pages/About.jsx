import React from 'react'
import Title from '../components/Title'
import {assets} from '../assets/assets'
import NewsLetterBox from '../components/NewsLetterBox'

const About = () => {
  return (
    <div>
      <div className='text-2xl text-center pt-8 border-t'>
        <Title text_1={"ABOUT"} text_2={"US"}/>
      </div>
      <div className='my-10 flex flex-col md:flex-row gap-16'>
        <img src={assets.about_img} className='w-full md:max-w-[450px]' alt="" />
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
          <p>Forever was born out of a passion to help you find the perfect clothing for your wardrobe. We believe that fashion should be accessible to all, and that everyone should have the opportunity to express their unique style.</p>
          <p>Our mission is to provide a platform for fashion enthusiasts to discover the latest trends, browse a wide selection of clothing, and find the perfect items to complete your wardrobe.</p>
          <b className='text-gray-800'>Our Mission</b>
          <p>Our mission is to provide a platform for fashion enthusiasts to discover the latest trends, browse a wide selection of clothing, and find the perfect items to complete your wardrobe.</p>
        </div>
      </div>

      <div className='text-xl py-4'>
        <Title text_1={"WHY"} text_2={"CHOOSE US"}/>
      </div>

      <div className='flex flex-col md:flex-row text-sm mb-20'>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b className='text-gray-600'>Quality Assurance:</b>
          <p>We meticusly source our clothing from reputable brands, ensuring that each item meets our strict quality standards.</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b className='text-gray-600'>Convenience:</b>
          <p>With our user-friendly website, you can easily browse our selection, add items to your cart, and checkout with just a few clicks.</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b className='text-gray-600'>Exceptional Customer Service:</b>
          <p>Our dedicated customer service team is available to assist you with any questions or concerns, ensuring a seamless shopping experience.</p>
        </div>
      </div>

      <NewsLetterBox />
    </div>
  )
}

export default About
