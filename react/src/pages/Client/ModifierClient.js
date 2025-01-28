import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import "./index.css";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  styled,
  TextField,
} from "@mui/material";
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));
// const ModifierClient = ({setOpenM,openM,setMise_a_Jour , id}) => {
const ModifierClient = ({ setMise_a_Jour, client }) => {
  const handleCloseM = () => {
    setOpenM(false);
  };
  const [openM, setOpenM] = React.useState(false);

  const Swal = require("sweetalert2");
  const [nom_prenom, setnom_prenom] = useState(client?.nom_prenom);
  const [adresse, setadresse] = useState(client?.adresse);
  const Modifier = () => {
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nom_prenom: nom_prenom,
        adresse: adresse,
        admine_id: localStorage.getItem("admine_id"),
      }),
    };
    if (nom_prenom != client.nom_prenom || adresse != client.adresse) {
      fetch(
        `http://localhost:5000/client-put/${client.client_id}`,
        requestOptions
      )
        .then((response) => response.json())
        .then((data) => {
          Swal.fire({
            title: data,
            icon: "success",
            draggable: true,
            customClass: {
              popup: "my-custom-popup-class",
              container: "my-custom-container-class",
            },
          });
          setMise_a_Jour(data);
          handleCloseM();
        })
        .catch((error) => {
          console.error("Erreur lors de la requête:", error);
        });
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "faire au moins une modification!",
        customClass: {
          popup: "my-custom-popup-class",
          container: "my-custom-container-class",
        },
      });
    }
  };
  const handleClickOpenM = () => {
    setOpenM(true);
  };
  return (
    <div>
      <Button
        onClick={handleClickOpenM}
        variant="contained"
        sx={{ bgcolor: "#4A6D85 "}}
      >
        Modifier
      </Button>
      <BootstrapDialog
        onClose={handleCloseM}
        aria-labelledby="customized-dialog-title"
        open={openM}
      >
        <DialogTitle id="customized-dialog-title">
          <h3>Modifier </h3>
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleCloseM}
          sx={(theme) => ({
            position: "absolute",
            right: 8,
            top: 8,
            color: theme.palette.grey[500],
          })}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers className="flex flex-col  min-h-[200px]  ">
          <TextField
            label="nom et prenom"
            fullWidth
            value={nom_prenom}
            onChange={(e) => {
              console.log(e);
              setnom_prenom(e.target.value);
            }}
          />
          <div className="h-10"></div>
          <TextField
            label="adresse"
            value={adresse}
            fullWidth
            onChange={(e) => {
              setadresse(e.target.value);
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={Modifier}>Enregistrer</Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
};

export default ModifierClient;
