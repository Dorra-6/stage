import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import Ajouterproduit from "./Ajouterproduit";
import ModifierProduit from "./ModifierProduit";

function Produit() {
  const [openDialog, setOpenDialog] = React.useState(false);
  const [mise_a_Jour_produit, setMise_a_Jour_produit] = useState("");
  const [produit, setProduit] = React.useState([]);
  console.log(produit)
  const handleClickOpen = () => {
    setOpenDialog(true);
    
  };
  useEffect(() => {
    fetch("http://localhost:5000/produit-get")
      .then((response) => response.json())
      .then((data) => {
        console.log("Données récupérées :", data);
        setProduit(data);
      })
      
  }, [mise_a_Jour_produit]);
  const DeleteProduit = (id) => {
    fetch(`http://localhost:5000/produit-delete/${id}`, { method: "DELETE" })
      .then((response) => response.json())
      .then((data) => {
        setMise_a_Jour_produit(data);
      });
  };


  return (
    <div>
      <div>
        <Button
          sx={{
            marginTop: "10px",
            marginLeft: "1300px",
            bgcolor: "#ba68c8",
            color: "white",
            bgcolor : ['#854F6C']
          }}
          onClick={handleClickOpen}
        >
          AJOUTER un produit
        </Button>
        <Ajouterproduit
          {...{ openDialog, setOpenDialog, setMise_a_Jour_produit }}
        />
      </div>
    <section className="ml-[350px] mt-20 ">
            {produit.length == 0 ? (
              <h1 className="mt-[100px] font-bold text-[35px]">
                vous n'avez pas des produits
              </h1>
            ) : (
              <table className="w-full max-h-20 border-separate" style={{ borderSpacing: "10px" }}>
                <thead>
                  <tr>
                    <th>Nom</th>
                    <th>Prix</th>
                    <th></th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                {produit?.map((produit) => 
                    <tr key={produit.produit_id}>
                      <td> 
                          {produit.nom}
                      </td>
                      <td>
                          {produit.prix} $
                      </td>
                      <td>
                      <ModifierProduit {...{ setMise_a_Jour_produit, produit}}/>
                      </td>
                      <td>
                        <Button
                          variant="contained"
                          style={{ backgroundColor: "red" }}
                          onClick={() => {
                            DeleteProduit(produit.produit_id);
                          }}
                        >
                          Supprimer
                        </Button>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}
          </section>
    </div>
  );
}

export default Produit;
