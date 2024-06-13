import React from 'react'

const Sidebar = () => {
  return (
    <div className='flex left-0 h-full'>
      <div className='flex flex-col w-64 h-full bg-gray-800'>
        <div className='flex items-center justify-center h-14 border-b border-gray-700'>
          <h1 className='text-white'>Sidebar</h1>
        </div>
        <div className='flex flex-col p-4'>
          <a href='#' className='text-white hover:bg-gray-700 p-2 rounded'>
            Dashboard
          </a>
          <a href='#' className='text-white hover:bg-gray-700 p-2 rounded'>
            Users
          </a>
          <a href='#' className='text-white hover:bg-gray-700 p-2 rounded'>
            Products
          </a>
          <a href='#' className='text-white hover:bg-gray-700 p-2 rounded'>
            Orders
          </a>
        </div>
      </div>
    </div>
  )
}

export default Sidebar