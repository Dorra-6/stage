const express = require("express");
const cors = require('cors');
const app = express();
app.use(cors());
const pg = require("pg");
const connectionString = "postgresql://postgres:DA972021@localhost:5432/stage1";
const client = new pg.Client({
  connectionString,
});
app.use(express.json())
// admine
app.get("/admine-get", async (req, res) => {
  try {
    const sql = "SELECT * FROM admine";
    const data = await client.query(sql);
    res.json({message : data.rows});
  } catch (err) {
    console.log(err);
  }
});
app.delete("/admine-delete/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const sql = `DELETE FROM admine WHERE admine_id =${id}`;
    const data = await client.query(sql);
    res.json("admine avec l'id " + id + " a ete supprimé");
  } catch (err) {
    console.log(err);
  }
});
app.post("/admine-post", async (req, res) => {
  try {
    const { nom, prenom, motDePasse, email } = req.body;
    const sql = `INSERT INTO admine (nom, prenom, mot_de_passe, email)
VALUES ('${nom}', '${prenom}', '${motDePasse}','${email}')`;
    const data = await client.query(sql);
    res.json("post new admine")
  } catch (err) {
    console.log(err);
  }
});
app.put("/admine-put/:id", async (req,res) => { 
    try {
      const { nom, prenom, motDePasse, email } = req.body;
      const id = req.params.id;
      const sql =`UPDATE admine
      SET nom = '${nom}', prenom = '${prenom}', motDePasse ='${motDePasse}',email ='${email}'
      WHERE admine_id =${id}`
      const data = await client.query(sql);
      res.json("la colonne modifié est d'id "+id)
      
    }
    catch (err){
        console.log(err);
    }
 });
app.post("/admine-Login", async (req,res) => { 
  try {
    const { motDePasse,email } = req.body;
    const sql =`SELECT * FROM admine
WHERE  mot_de_passe ='${motDePasse}' and email='${email}'`
    const data = await client.query(sql);
    res.json(data.rows)
  }
  catch (err){
    console.log(err);
  }
 })
/// client
app.get("/client-get",async (req,res) => {
    try {
        const sql = "SELECT * FROM client";
        const data = await client.query(sql);
        res.json(data.rows);
      } catch (err) {
        console.log(err);
      }
  })
app.delete("/client-delete/:id",async(req,res) => { 
    try {
          const id = req.params.id;
          const sql = `DELETE FROM client WHERE client_id =${id}`;
          const data = await client.query(sql);
          res.json("client avec l'id " + id + " a ete supprimé");
        } catch (err) {
          console.log(err);
        }
});  
app.post("/client-post", async (req, res) => {
    try {
      const { nom_prenom, adresse, admine_id } = req.body;
      const sql = `INSERT INTO client (nom_prenom, adresse ,admine_id)
  VALUES ('${nom_prenom}', '${adresse}', '${admine_id}')`;
       await client.query(sql);
      res.json("post new client") 
    } catch (err) {
      console.log(err); 
    }
});
app.put("/client-put/:id", async (req,res) => { 
    try {
      const { nom_prenom, adresse } = req.body;
      const id = req.params.id;
      const sql =`UPDATE client
      SET nom_prenom = '${nom_prenom}', adresse = '${adresse}'
      WHERE client_id =${id}`
       await client.query(sql);
      res.json("la colonne modifié est d'id "+id)
    }
    catch (err){
        console.log(err);
    }
 });



app.get("/produit-get", async (req, res) => {
  try {
    const sql = "SELECT * FROM produits";
    const data = await client.query(sql);
    res.json({message : data.rows});
  } catch (err) {
    console.log(err);
  }
});
app.delete("/produit-delete/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const sql = `DELETE FROM produits WHERE produit_id =${id}`;
    const data = await client.query(sql);
    res.json("produit avec l'id " + id + " a ete supprimé");
  } catch (err) {
    console.log(err);
  }
});
app.post("/produit-post", async (req, res) => {
  try {
    const { nom, image, prix, admine_id } = req.body;
    const sql = `INSERT INTO produits (nom, image, prix, admine_id)
VALUES ('${nom}', '${image}', '${prix}','${admine_id}')`;
    const data = await client.query(sql);
    res.json("post new produit")
  } catch (err) {
    console.log(err);
  }
});
app.put("/produit-put/:id", async (req,res) => { 
  try {
    const { nom, image , prix } = req.body;
    const id = req.params.id;
    const sql =`UPDATE produits
    SET nom = '${nom}', image = '${image}' , prix = '${prix}'
    WHERE produit_id =${id}`
    const data = await client.query(sql);
    res.json("la colonne modifié est d'id "+id)
    
  }
  catch (err){
      console.log(err);
  }
});
client.connect().then(() => {
  console.log("conencter avec db");
});
app.listen(5000, () => {
  console.log("serveur run on http://localhost:5000");
});