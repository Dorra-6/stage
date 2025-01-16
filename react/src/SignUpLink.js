import React from 'react'
import { Link } from 'react-router-dom'

function SignUpLink() {
  return (
    <div>
       
      <h2 style={{ marginLeft: '0px', textAlign: 'center' }}>
        <Link to="/Signin">Sign in</Link>
      </h2>
   
    </div>
  )
}

export default SignUpLink