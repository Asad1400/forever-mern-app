import React from 'react'

const Title = ({text_1, text_2}) => {
  return (
    <div className='inline-flex items-center gap-2 mb-3'>
      <p className='w-9 sm:w-11 h-[1px] bg-gray-700'></p>
      <p className='text-gray-500'>{text_1} <span className='text-gray-700 front-medium'>{text_2}</span></p>
      <p className='w-9 sm:w-11 h-[1px] bg-gray-700'></p>
    </div>
  )
}

export default Title
