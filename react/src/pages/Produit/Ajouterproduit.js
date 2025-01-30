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
const Ajouterproduit = ({
  openDialog,
  setOpenDialog,
  setMise_a_Jour_produit,
}) => {
  const handleClose = () => {
    setOpenDialog(false);
  };
  const Swal = require("sweetalert2");
  const [nom, setnom] = useState("");
  const [prix, setPrix] = useState("");
  const CreationProduit = () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nom: nom,
        prix: prix,
        image: "",
        admine_id: localStorage.getItem("admine_id"),
      }),
    };
    nom.length > 0 && prix.length > 0
      ? fetch("http://localhost:5000/produit-post", requestOptions)
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
            handleClose();
          })
      : Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "remplir tous les champs!",
          customClass: {
            popup: "my-custom-popup-class",
            container: "my-custom-container-class",
          },
        });
  };
  return (
    <div>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={openDialog}
      >
        <DialogTitle id="customized-dialog-title">
          Ajouter un produit
        </DialogTitle>
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
        <DialogContent className="flex flex-col  min-h-[200px]  ">
          <TextField
            label="nom "
            fullWidth
            onChange={(e) => {
              setnom(e.target.value);
            }}
          />
          <div className="h-10"></div>
          <TextField
            label="prix"
            fullWidth
            className="flex flex-col  min-h-[100px]  "
            onChange={(e) => {
              setPrix(e.target.value);
            }}
          />
          {/* <TextField label="image" fullWidth onChange={(e) => { 
                  setImage(e.target.value)
                  }}/> */}
        </DialogContent>
        <DialogActions>
          <Button onClick={CreationProduit}>AJOUTER</Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
};

export default Ajouterproduit;
