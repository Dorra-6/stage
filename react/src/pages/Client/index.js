import React, { useEffect, useState } from "react";
import "../../Components/AppBar";

import AjouterClients from "./AjouterClients";
import { Button } from "@mui/material";
import { ClassNames } from "@emotion/react";
import ModifierClient from "./ModifierClient";

function Client() {
  const [open, setOpen] = React.useState(false);
  // const [openM, setOpenM] = React.useState(false);
  const [client, setClient] = React.useState([]);
  const [mise_a_Jour, setMise_a_Jour] = useState("");
  const [nom_prenom, setnom_prenom] = useState("");
  const [adresse, setadresse] = useState("");
  const handleClickOpen = () => {
    setOpen(true);
  };
  // const handleClickOpenM = () => {
  //   setOpenM(true);
  // };

  useEffect(() => {
    fetch("http://localhost:5000/client-get")
      .then((response) => response.json())
      .then((data) => {
        setClient(data);
      });
  }, [mise_a_Jour]);
  const Delete = (id) => {
    fetch(`http://localhost:5000/client-delete/${id}`, { method: "DELETE" })
      .then((response) => response.json())
      .then((data) => {
        setMise_a_Jour(data);
      });
  };

  return (
    <div>
      <div>
        <Button
          sx={{
            marginTop: "40px",
            marginLeft: "1300px",
            bgcolor: "#ba68c8",
            color: "white",
            bgcolor: ["#854F6C"],
          }}
          onClick={handleClickOpen}
        >
          AJOUTER un client
        </Button>
        <AjouterClients {...{ setOpen, open, setMise_a_Jour }} />
      </div>
      <section className="ml-[350px] mt-20 ">
        {client.length == 0 ? (
          <h1 className="mt-[100px] font-bold text-[35px]">
            vous n'avez pas des clients
          </h1>
        ) : (
          <table className="w-full border-separate" style={{ borderSpacing: "10px" }}>
            <thead>
              <tr>
                <th>Nom et Prénom</th>
                <th>Adress</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {client.map((client) => (
                <tr key={client.client_id}>
                  <td>{client.nom_prenom}</td>
                  <td>{client.adresse}</td>
                  <td>
                    
                    
                    {/* <ModifierClient {...{ setOpenM, openM, setMise_a_Jour }} /> */}
                    <ModifierClient {...{ setMise_a_Jour, client}} />

                    
                  </td>
                  <td>
                    <Button
                      variant="contained"
                      style={{ backgroundColor: "red" }}
                      onClick={() => {
                        Delete(client.client_id);
                      }}
                    >
                      Supprimer
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
      <section></section>
    </div>
  );
}

export default Client;
