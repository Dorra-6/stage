import React, { useEffect, useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import image from "./produit.jpg";
import DialogCard from "./DialogCard";

function Commande() {
  const [nom_prenom, setnom_prenom] = useState("");
  const [client, setClient] = useState([]);
  const [produit, setproduit] = useState([]);
  const [ouvre, setOuvre] = React.useState(false);
  const [produitTemporaire, setproduitTemporaire] = React.useState([]);
  // const [PrixTotale, setPrixTotale] = React.useState(0);
  // const [nom_client, setnom_client] = useState("");
  const [table, setTable] = useState([]);

  const Swal = require("sweetalert2");
  const PostNewCommande = () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        prixt: table.reduce((sum, table) => sum + table.total, 0),
        nom_client: nom_prenom,
        admine_id: localStorage.getItem("admine_id"),
      }),
    };
    if (nom_prenom.length === 0) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "il faut sélectionner un client!",
      });
    } else {
      fetch("http://localhost:5000/commande-post", requestOptions)
        .then((response) => response.json())
        .then((data) => setTable([]));
    }
  };
  const handleClickOpen = () => {
    setOuvre(true);
  };

  const handleChange = (e) => {
    setnom_prenom(e.target.value);
  };

  useEffect(() => {
    fetch(`http://localhost:5000/client-get/${localStorage.getItem("admine_id")}`)
      .then((response) => response.json())
      .then((data) => {
        setClient(data);
      });
  }, []);
  useEffect(() => {
    fetch(`http://localhost:5000/produit-get/${localStorage.getItem("admine_id")}`)
      .then((response) => response.json())
      .then((data) => {
        setproduit(data);
      });
  }, []);
  const handleRemove = (index) => {
    const newTable = [...table.slice(0, index), ...table.slice(index + 1)];

    setTable(newTable);
    // table.slice(index,1)
  };
  console.log(table);
  return (
    <div className="flex justify-center flex-col ">
      <div className="mt-5">
        <FormControl
          sx={{
            m: 1,
            minWidth: 120,
            // bgcolor: ["#92817A"]
          }}
          size="medium"
        >
          <InputLabel
            id="demo-select-small-label"
            // sx={{ color: "white" }}
          >
            clients
          </InputLabel>
          <Select
            labelId="demo-select-small-label"
            id="demo-select-small"
            value={nom_prenom}
            label="Nom et Prenom"
            onChange={handleChange}
          >
            {client.map((client) => (
              <MenuItem value={client.nom_prenom}>{client.nom_prenom}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>

      <div className="flex mt-5 ml-[250px] ">
        <div className="ml-3 flex flex-wrap w-[63%] border-r-[6px] border-balck ">
          {produit.map((produit) => (
            <Card
              className="mb-3 mr-3"
              sx={{ minWidth: 250 }}
              // key={produit.id}
            >
              <CardMedia
                sx={{ height: 140 }}
                image={image}
                title="Bon Appeti"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {produit.nom}
                </Typography>
              </CardContent>
              <CardActions className="flex justify-between">
                <Button
                  sx={{ bgcolor: "#4A6D85 ", color: "white" }}
                  onClick={() => {
                    handleClickOpen();
                    setproduitTemporaire(produit);
                  }}
                >
                  ADD
                </Button>
                <div className="text-[25px]">{produit.prix} $</div>
              </CardActions>
            </Card>
          ))}
        </div>
        <DialogCard
          {...{ ouvre, setOuvre, produitTemporaire, table, setTable }}
        />
        <div className="flex ml-10">
          {table.length === 0 ? (
            <h1 className="ml-20 , mt-40 ">
              <b>vous n'avez pas des commandes</b>
            </h1>
          ) : (
            <table
              className="w-full border-separate  grow h-6"
              style={{ borderSpacing: "30px" }}
            >
              <thead>
                <tr>
                  <th>Nom</th>
                  <th>Quantité</th>
                  <th>prix</th>
                  <th>Remove</th>
                </tr>
              </thead>
              <tbody>
                {table.map((table, index) => (
                  <tr key={index}>
                    <td>{table.nom}</td>
                    <td>{table.count}</td>
                    <td>{table.total} $</td>
                    <td>
                      <Button
                        sx={{ bgcolor: "#D94F4F", color: "white" }}
                        onClick={() => handleRemove(index)}
                      >
                        Remove
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td className="font-bold">Totale:</td>
                  <td>
                    {table.reduce((sum, table) => sum + table.total, 0)} $
                  </td>
                  <br />
                  <th>
                    <Button
                      sx={{ bgcolor: "#4A6D85 ", color: "white" }}
                      onClick={PostNewCommande}
                    >
                      {" "}
                      Commander
                    </Button>
                  </th>
                </tr>
              </tfoot>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

export default Commande;
