import React, { useEffect, useState } from 'react'
import Signin from './Login/Signin'
import CreationCompte from './Login/CreationCompte'
import AllRoute from './AllRoute'


function App() {
  const [connexion, setConnexion] = React.useState(false)
  const [LoginOrCreationCompte, setLoginOrCreationCompte] = React.useState(true)
  const [message, setMessage] = useState("");

  return (
    <div>
     {message && <pre>{JSON.stringify(message, null, 2)}</pre>}

      { !connexion ?
        
        LoginOrCreationCompte ?
        <Signin  {...{setLoginOrCreationCompte}}/>
        
:
<CreationCompte setLoginOrCreationCompte={setLoginOrCreationCompte}/>
:< AllRoute/>


      }
    
    
    </div>
  )
}

export default App 