const express = require("express");
const app = express();
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
    res.json(data.rows);
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
    const sql = `INSERT INTO admine (nom, prenom, motDePasse,email)
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
      const { nom, prenom } = req.body;
      const sql = `INSERT INTO client (nom, prenom)
  VALUES ('${nom}', '${prenom}')`;
      const data = await client.query(sql);
      res.json("post new admine") 
    } catch (err) {
      console.log(err); 
    }
});
app.put("/client-put/:id", async (req,res) => { 
    try {
      const { nom, prenom } = req.body;
      const id = req.params.id;
      const sql =`UPDATE client
      SET nom = '${nom}', prenom = '${prenom}'
      WHERE admine_id =${id}`
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
  console.log("serveur run on port 5000");
});
