import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div>
        <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 ml-10 my-10 mt-20 text-sm'>
            <div>
                <img src={assets.logo} className='w-32 mb-5' alt="Forever-Footer-Logo" />
                <p className='w-full md:w-2/3 text-gray-600'>The best place to buy amazing clothes.</p>
            </div>

            <div>
                <p className='text-xl font-medium mb-5'>COMPANY</p>
                <ul className='flex flex-col gap-1 text-gray-600'>
                    <li>HOME</li>
                    <li>ABOUT US</li>
                    <li>DELIVERY</li>
                    <li>PRICE</li>
                </ul>
            </div>

            <div>
                <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
                <ul className='flex flex-col gap-1 text-gray-600'>
                    <li>+1-234-567-890</li>
                    <li>contacts@forever.com</li>
                </ul>
            </div>
        </div>
        <div>
            <hr />
            <p className='py-4 text-center text-xs'>Copyright 2024@ forever.com - All Rights Reserved</p>
        </div>
    </div>
  )
}

export default Footer
