import React from 'react'

export default  function Welcome() {
  return (
    <div className='mt-[100px] font-bold text-[35px]'>
      welcome {localStorage.getItem("nom")} {localStorage.getItem("prenom")} 
      </div>
  )
}
