import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Stack,
  styled,
  Typography,
} from "@mui/material";
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const DialogCard = ({
  ouvre,
  setOuvre,
  produitTemporaire,
  table,
  setTable,
}) => {
  const [count, setCount] = useState(1);

  const handleClose = () => {
    setOuvre(false);
    setCount(1);
  };

  const handleAddCommande = () => {
    const newCommande = {
      nom: produitTemporaire.nom,
      count: count,
      total: produitTemporaire.prix * count,
    };
    setTable([...table, newCommande]);
  };
  return (
    <div>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={ouvre}
      >
        <DialogTitle
          sx={{ m: 0, p: 2, fontSize: 50 }}
          id="customized-dialog-title"
        >
          <Typography variant="h6"> BON APPETTI</Typography>
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
        <DialogContent dividers>
          <Stack direction="row" spacing={3}>
            <Button
              sx={{ bgcolor: "#4A6D85 ", color: "white" }}
              size="large"
              onClick={() => setCount(count + 1)}
            >
              +
            </Button>
            <Box sx={{ ml: 2, fontSize: 40, mb: 4 }}>{count}</Box>
            <Button
              style={{ backgroundColor: "#D94F4F", color: "white" }}
              size="large"
              onClick={() => setCount(count > 1 ? count - 1 : count)}
            >
              --
            </Button>
          </Stack>
        </DialogContent>
        <Button
          onClick={() => {
            handleAddCommande();
            handleClose();
          }}
          // color="black"
          // size="large"
          sx={{ bgcolor: "#4A6D85 ", color: "white" }}
        >
          {" "}
          Commander
        </Button>
      </BootstrapDialog>
    </div>
  );
};

export default DialogCard;
