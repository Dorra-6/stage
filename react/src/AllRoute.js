import React from "react";
import { BrowserRouter, Route, Routes } from "react-router";
import Client from "./pages/Client";
import Commande from "./pages/Commandes";
import NoPage from "./pages/NoPage";
import DrawerLeft from "./Components/DrawerLeft";
import Welcome from "./pages/Welcome/index";
import MenuAppBar from "./Components/AppBar";
import Produit from "./pages/Produit";
import Profile from "./pages/Profile";
import Historique from "./pages/Historique";

function AllRoute({ setConnexion }) {
  return (
    <BrowserRouter>
      <div style={{ textAlign: "center" }}>
        <MenuAppBar setConnexion={setConnexion} />
        <DrawerLeft />

        <Routes>
          <Route index element={<Welcome />} />
          <Route path="/Client" element={<Client />} />
          <Route path="/Commande" element={<Commande />} />
          <Route path="/Profile" element={<Profile />} />
          <Route path="/Produit" element={<Produit />} />
          <Route path="/Historique" element={<Historique />} />

          <Route path="*" element={<NoPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default AllRoute;
