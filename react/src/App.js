import React, { useEffect, useState } from "react";
import Signin from "./Login/Signin";
import CreationCompte from "./Login/CreationCompte";
import AllRoute from "./AllRoute";
import "./index.css";

function App() {
  const [connexion, setConnexion] = React.useState(false);
  const [LoginOrCreationCompte, setLoginOrCreationCompte] =
    React.useState(true);
  useEffect(() => {
    setConnexion(localStorage.getItem("admine_id"));
  }, [connexion]);

  return (
    <div>
      {!connexion ? (
        LoginOrCreationCompte ? (
          <Signin
            {...{setLoginOrCreationCompte}}
            setConnexion={setConnexion}
          />
        ) : (
          <CreationCompte setLoginOrCreationCompte={setLoginOrCreationCompte} />
        )
      ) : (
        <AllRoute setConnexion={setConnexion}/>
      )}
    </div>
  );
}

export default App;
