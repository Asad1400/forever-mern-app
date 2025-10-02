import React from 'react'

const NewsLetterBox = () => {

    const onSubmitHandler = (e) => {
        e.preventDefault();
    }

  return (
    <div className='text-center'>
        <p className='text-2xl font-medium text-gray-600'>Subscribe now & get 20% off</p>
        <p className='text-gray-400 mt-2'>Enter your Email to get discounts</p>
        <form action="" onSubmit={onSubmitHandler} className='w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 pl-3 border-2 border-gray-100'>
            <input className='w-full sm:flex-1 outline-none' type="email" placeholder='Enter your Email'/>
            <button type='Submit' className='bg-black text-white text-xs px-10 py-4 hover:scale-105 transition ease-in-out'>SUSCRIBE</button>
        </form>
    </div>
  )
}

export default NewsLetterBox
