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
function AjouterClients({ setOpen, open, setMise_a_Jour }) {
  const handleClose = () => {
    setOpen(false);
  };
  const Swal = require("sweetalert2");

  const [nom_prenom, setnom_prenom] = useState("");
  const [adresse, setadresse] = useState("");

  const CreationClient = () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nom_prenom: nom_prenom,
        adresse: adresse,
        admine_id: localStorage.getItem("admine_id"),
      }),
    };
    if (nom_prenom.length > 0 && adresse.length > 0) {
      fetch("http://localhost:5000/client-post", requestOptions)
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
          handleClose();
        });
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "remplir tous les champs!",
        customClass: {
          popup: "my-custom-popup-class",
          container: "my-custom-container-class",
        },
      });
    }
  };
  return (
    <BootstrapDialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={open}
    >
      <DialogTitle id="customized-dialog-title">Ajouter un client</DialogTitle>
      <IconButton
        aria-label="close"
        onClick={handleClose}
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
          onChange={(e) => {
            setnom_prenom(e.target.value);
          }}
        />
        <div className="h-10"></div>
        <TextField
          label="adresse"
          fullWidth
          onChange={(e) => {
            setadresse(e.target.value);
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={CreationClient}>AJOUTER</Button>
      </DialogActions>
    </BootstrapDialog>
  );
}

export default AjouterClients;
