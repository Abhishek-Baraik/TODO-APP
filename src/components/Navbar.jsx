import React from 'react'

function Navbar() {
  return (
    <>
    <div className="container bg-slate-700 py-3 flex justify-between">
        <div className="logo mx-6">
            <h1 className='text-white font-bold text-2xl'>iTask</h1>
        </div>
        <ul className="flex gap-4 mx-9 text-white"> 
            <li className='hover:font-bold cursor-pointer'>Home</li>
            <li className='hover:font-bold cursor-pointer'>Your Tasks</li>
        </ul>
    </div>
    </>
  )
}

export default Navbar