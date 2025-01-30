import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import "./../Client/index.css";
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
const ModifierProduit = ({ setMise_a_Jour_produit, produit }) => {
  const [openDialogP, setOpenDialogP] = React.useState(false);
  const Swal = require("sweetalert2");
  const [nom, setnom] = useState(produit?.nom);
  const [prix, setPrix] = useState(produit?.prix);
  const handleCloseP = () => {
    setOpenDialogP(false);
  };
  const handleClickOpenP = () => {
    setOpenDialogP(true);
  };
  const EditProduit = () => {
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nom: nom,
        prix: prix,
        admine_id: localStorage.getItem("admine_id"),
      }),
    };
    if (nom !== produit.nom || prix !== produit.prix) {
      fetch(
        `http://localhost:5000/produit-put/${produit.produit_id}`,
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
          setMise_a_Jour_produit(data);
          handleCloseP();
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

  return (
    <div>
      <Button
        onClick={handleClickOpenP}
        sx={{ bgcolor: "#4A6D85 ", color: "white" }}
      >
        Modifier
      </Button>
      <BootstrapDialog
        onClose={handleCloseP}
        aria-labelledby="customized-dialog-title"
        open={openDialogP}
      >
        <DialogTitle id="customized-dialog-title">
          Modifier un produit
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleCloseP}
          sx={(theme) => ({
            position: "absolute",
            right: 8,
            top: 8,
            color: theme.palette.grey[500],
          })}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent className="flex flex-col  min-h-[200px]  ">
          <TextField
            label="nom "
            fullWidth
            value={nom}
            onChange={(e) => {
              setnom(e.target.value);
            }}
          />
          <div className="h-10"></div>
          <TextField
            label="prix"
            value={prix}
            fullWidth
            className="flex flex-col  min-h-[100px]"
            onChange={(e) => {
              setPrix(e.target.value);
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={EditProduit}>Modifier</Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
};

export default ModifierProduit;
