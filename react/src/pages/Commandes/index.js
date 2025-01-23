import React, { useEffect, useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Dialog,
  DialogContent,
  DialogTitle,
  Stack,
  styled,
  Typography,
} from "@mui/material";
import image from "./produit.jpg";
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));
function Commande() {
  const [nom_prenom, setnom_prenom] = useState("");
  const [client, setClient] = useState([]);
  const [produit, setproduit] = useState([]);
  const [ouvre, setOuvre] = React.useState(false);

  const handleClickOpen = () => {
    setOuvre(true);
  };
  const handleClose = () => {
    setOuvre(false);
  };
  // const [reset, setReset] = useState("");
  const handleChange = (e) => {
    setnom_prenom(e.target.value);
  };
  useEffect(() => {
    fetch("http://localhost:5000/client-get")
      .then((response) => response.json())
      .then((data) => {
        setClient(data);
      });
  }, []);
  useEffect(() => {
    fetch("http://localhost:5000/produit-get")
      .then((response) => response.json())
      .then((data) => {
        setproduit(data);
      });
  }, []);
  return (
    <div className="flex justify-center flex-col">
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
              <MenuItem value={client.client_id}>{client.nom_prenom}</MenuItem>
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
                title="green iguana"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {produit.nom}
                </Typography>
              </CardContent>
              <CardActions className="flex justify-between">
                <Button variant="outlined" onClick={handleClickOpen}>
                  ADD
                </Button>
                <div className="text-[25px]">{produit.prix} $</div>
                
              </CardActions>
            </Card>
          ))}
        </div>
        <div className="flex ml-10">
           <table className="w-full border-separate  grow" style={{borderSpacing: "10px"}}>
           <thead>
    <tr>
      <th>Nom</th>
      <th>Quantité</th>
      <th>prix</th>
      <th>Remove</th>

    </tr>
  </thead>
  <tbody>
    <tr>
      <td></td>
    </tr>
  </tbody>
           </table>
        </div>
      </div>
    </div>
  );
}

export default Commande;
