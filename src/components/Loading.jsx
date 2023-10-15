import React from 'react'

const Loading = ({color,size}) => {
  return (
    <div className='w-full flex justify-center'>
        <div className={`${size} rounded-full border-t-2 border-b-2 animate-spin border-${color}`}></div>
        </div>
  )
}

export default Loading