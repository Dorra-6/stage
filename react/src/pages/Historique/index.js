import { Button } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import "./index.css";
function Historique() {
  const [miseAjour, setMiseAjour] = useState("");
  const [Commande, setCommande] = React.useState([]);

  useEffect(() => {
    fetch(
      `http://localhost:5000/commande-get/${localStorage.getItem("admine_id")}`
    )
      .then((response) => response.json())
      .then((data) => {
        setCommande(data);
      });
  }, [miseAjour]);
  const Effacer = (id) => {
    fetch(`http://localhost:5000/commande-delete/${id}`, { method: "DELETE" })
      .then((response) => response.json())
      .then((data) => {
        setMiseAjour(data);
      });
  };
  const printRef = useRef();

  const handlePrint = useReactToPrint({
    contentRef: printRef, // Here we pass the ref directly
    onAfterPrint: () => console.log("Print complete!"),
  });
  return (
    <div>
      <section className="ml-[350px] mt-20 border-dashed">
        {Commande.length === 0 ? (
          <h1 className="mt-[100px] font-bold text-[35px]">
            vous n'avez pas des commandes
          </h1>
        ) : (
          <>
            <table
              className="w-full border-separate"
              style={{ borderSpacing: "10px" }}
            >
              <thead>
                <tr>
                  <th>Nom de Client</th>
                  <th>Prix</th>
                  <th>Temps</th>
                </tr>
              </thead>
              <tbody>
                {Commande.map((Commande) => (
                  <tr key={Commande.commande_id}>
                    <td>{Commande.nom_client}</td>
                    <td>{Commande.prixt} $</td>
                    <td>{Commande.time}</td>
                    <td>
                      <Button
                        style={{ backgroundColor: "#D94F4F", color: "white" }}
                        onClick={() => {
                          Effacer(Commande.commande_id);
                        }}
                      >
                        Supprimer
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Button
              sx={{
                bgcolor: "#4A6D85 ",
                color: "white",
                mt: "50px",
                ml: "890px",
                width: "102px",
              }}
              onClick={handlePrint}
            >
              Imprimer
            </Button>
          </>
        )}
        <table
          ref={printRef}
          className="w-full border-separate"
          style={{ borderSpacing: "10px", display: "none" }}
        >
          <thead>
            <tr className=" flex font-bold text-green-800 text-[20px] place-content-center ml-[250px] ">
              FACTURE
            </tr>
            <tr>
              <th className="text-center align-middle ">Nom de Client</th>
              <th className="text-center align-middle "> Prix</th>
              <th className="text-center align-middle ">Temps</th>
            </tr>
          </thead>
          <tbody>
            {Commande.map((Commande) => (
              <tr key={Commande.commande_id}>
                <td className="text-center align-middle ">
                  {Commande.nom_client}
                </td>
                <td className="text-center align-middle ">
                  {Commande.prixt} $
                </td>
                <td className="text-center align-middle ">{Commande.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}

export default Historique;
