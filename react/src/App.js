import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Signin from './Login/Signin'
import CreationCompte from './Login/CreationCompte'
import AllRoute from './AllRoute'


function App() {
  const [connexion, setConnexion] = React.useState(true)
  const [LoginOrCreationCompte, setLoginOrCreationCompte] = React.useState(true)
  
  return (
    <div>
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