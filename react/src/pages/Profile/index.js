import {
  Box,
  Button,
  Card,
  CssBaseline,
  FormControl,
  FormLabel,
  Stack,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import ModifierClient from "../Client/ModifierClient";
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
    backgroundImage:
      "radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))",
    backgroundRepeat: "no-repeat",
    ...theme.applyStyles("dark", {
      backgroundImage:
        "radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))",
    }),
  },
}));
function Profile() {
  const Swal = require("sweetalert2");
  const [nom, setnom] = useState(localStorage.getItem("nom"));
  const [prenom, setprenom] = useState(localStorage.getItem("prenom"));
  const [mot_de_passe, setmot_de_passe] = useState(
    localStorage.getItem("mot_de_passe")
  );
  const [email, setemail] = useState(localStorage.getItem("email"));
  const [reset, setReset] = useState("");
  const [admine, setAdmine] = useState("");

  const modified = () => {
    if (
      nom !== localStorage.getItem("nom") ||
      prenom !== localStorage.getItem("prenom") ||
      mot_de_passe !== localStorage.getItem("mot_de_passe") ||
      email !== localStorage.getItem("email")
    ) {
      const requestOptions = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nom: nom,
          prenom: prenom,
          mot_de_passe: mot_de_passe,
          email: email,
        }),
      };

      fetch(
        `http://localhost:5000/admine-put/${localStorage.getItem("admine_id")}`,
        requestOptions
      )
        .then((response) => response.json())
        .then((data) => {
          localStorage.setItem("nom", nom);
          localStorage.setItem("prenom", prenom);
          localStorage.setItem("mot_de_passe", mot_de_passe);
          localStorage.setItem("email", email);

          Swal.fire({
            icon: "success",
            text: "modifications effectué!",
            customClass: {
              popup: "my-custom-popup-class",
              container: "my-custom-container-class",
            },
          });
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
    <div className="ml-64 size-auto">
      <Box>
        <CssBaseline enableColorScheme />
        <SignUpContainer direction="column" justifyContent="space-between">
          <Card variant="outlined">
            <Typography
              component="h1"
              variant="h3"
              sx={{
                width: "100%",
                fontSize: "clamp(2rem, 10vw, 2.15rem)",
                marginBottom: 5,
              }}
            >
              Votre profile
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <FormControl>
                <FormLabel>Nom </FormLabel>
                <TextField
                  fullWidth
                  value={nom}
                  onChange={(e) => {
                    setnom(e.target.value);
                  }}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Prenom</FormLabel>
                <TextField
                  fullWidth
                  value={prenom}
                  onChange={(e) => {
                    setprenom(e.target.value);
                  }}
                />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="email">Email</FormLabel>
                <TextField
                  fullWidth
                  value={email}
                  onChange={(e) => {
                    setemail(e.target.value);
                  }}
                />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="password">Mot de passe</FormLabel>

                <TextField
                  value={mot_de_passe}
                  fullWidth
                  onChange={(e) => {
                    setmot_de_passe(e.target.value);
                  }}
                />
              </FormControl>

              <Button
                fullWidth
                sx={{ bgcolor: "#4A6D85 ", color: "white" }}
                onClick={() => {
                  modified();
                }}
              >
                Modifier
              </Button>
            </Box>
          </Card>
        </SignUpContainer>
      </Box>
    </div>
  );
}

export default Profile;
