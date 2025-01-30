import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useState } from "react";

import Divider from "@mui/material/Divider";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import MuiCard from "@mui/material/Card";
import { styled } from "@mui/material/styles";

const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: "auto",
  boxShadow:
    "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
  [theme.breakpoints.up("sm")]: {
    width: "450px",
  },
  ...theme.applyStyles("dark", {
    boxShadow:
      "hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px",
  }),
}));

const SignUpContainer = styled(Stack)(({ theme }) => ({
  height: "calc((1 - var(--template-frame-height, 0)) * 100dvh)",
  minHeight: "100%",
  padding: theme.spacing(2),
  [theme.breakpoints.up("sm")]: {
    padding: theme.spacing(4),
  },
  "&::before": {
    content: '""',
    display: "block",
    position: "absolute",
    zIndex: -1,
    inset: 0,
    // backgroundImage:
    //   "radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))",
    // backgroundRepeat: "no-repeat",
    // ...theme.applyStyles("dark", {
    //   backgroundImage:
    //     "radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))",
   // }),
  },
}));

export default function CreationCompte({ setLoginOrCreationCompte }) {
  const Swal = require("sweetalert2");

  const [nom, setnom] = useState("");
  const [prenom, setprenom] = useState("");
  const [motDePasse, setmotDePasse] = useState("");
  const [email, setemail] = useState("");

  const Creation = () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nom: nom,
        prenom: prenom,
        motDePasse: motDePasse,
        email: email,
      }),
    };
    if (
      nom.length > 0 &&
      prenom.length > 0 &&
      motDePasse.length > 0 &&
      email.length > 0
    ) {
      fetch("http://localhost:5000/admine-post", requestOptions)
        .then((response) => response.json())
        .then((data) => {
          setLoginOrCreationCompte(true);
          Swal.fire({
            title: data,
            icon: "success",
            draggable: true,
          });
        });
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "remplir tous les champs!",
      });
    }
  };
  return (
    <Box sx={{ bgcolor: ["#2C3E50"] }}>
      
      <SignUpContainer direction="column" justifyContent="space-between">
        <Card variant="outlined">
          <Typography
            component="h1"
            variant="h4"
            sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}
          >
            Creation Compte
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <FormControl>
              <FormLabel htmlFor="name">Nom </FormLabel>
              <TextField
                autoComplete="name"
                name="name"
                required
                fullWidth
                id="name"
                placeholder="Jon "
                color={"primary"}
                onChange={(e) => {
                  setnom(e.target.value);
                }}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="prenom">Prenom</FormLabel>
              <TextField
                autoComplete="prenom"
                name="prenom"
                required
                fullWidth
                id="prenom"
                placeholder="Snow"
                color={"primary"}
                onChange={(e) => {
                  setprenom(e.target.value);
                }}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="email">Email</FormLabel>
              <TextField
                required
                fullWidth
                id="email"
                placeholder="your@email.com"
                name="email"
                autoComplete="email"
                variant="outlined"
                color={"primary"}
                onChange={(e) => {
                  setemail(e.target.value);
                }}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="password">Mot de passe</FormLabel>
              <TextField
                required
                fullWidth
                name="password"
                placeholder="••••••"
                type="password"
                id="password"
                autoComplete="new-password"
                variant="outlined"
                color={"primary"}
                onChange={(e) => {
                  setmotDePasse(e.target.value);
                }}
              />
            </FormControl>

            <Button fullWidth variant="contained" onClick={Creation}>
              Inscrire
            </Button>
          </Box>
          <Divider>
            <Typography sx={{ color: "text.secondary" }}>ou</Typography>
          </Divider>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Typography sx={{ textAlign: "center" }}>
              T'as dèja un compte?{" "}
              <Button
                onClick={() => {
                  setLoginOrCreationCompte(true);
                }}
              >
                Connecter
              </Button>
            </Typography>
          </Box>
        </Card>
      </SignUpContainer>
    </Box>
  );
}
