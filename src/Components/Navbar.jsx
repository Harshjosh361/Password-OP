import React from 'react'

function Navbar() {
  return (
    <div className='bg-slate-500 flex justify-around items-center text-white px-10 py-2'>
      <div className='text-xl'>
        <span>&lt;</span>
        <span>Pass<span className='text-green-500'>OP/</span></span>
        <span>&gt;</span>
       </div>
      <div className='flex justify-center items-center gap-1 text-xl'>
        <h2>Github </h2>
        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg" height={20} width={20}/>  
      </div>
    </div>
  )
}

export default Navbar
