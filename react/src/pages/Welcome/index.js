import React from 'react'

export default  function Welcome() {
  return (
    <div className='mt-[100px] font-bold text-[35px] bg-[#2C3E50] text-white'>
      welcome {localStorage.getItem("nom")} {localStorage.getItem("prenom")} 
      </div>
  )
}
