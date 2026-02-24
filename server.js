const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Conectado a MongoDB Atlas"))
  .catch((err) => console.log("Error MongoDB:", err.message));


app.get("/api/servicio", (req, res) => {
  const dato = req.query.dato; // <-- parámetro GET
  if (!dato) {
    return res.status(400).json({ ok: false, msg: "Falta parametro ?dato=" });
  }
  return res.json({ ok: true, recibido: dato });
});

const PORT = process.env.PORT || 3001;
app.get("/", (req, res) => {
  res.send("PAFINAL API OK");
});
app.listen(PORT, () => {
  console.log("Servidor en puerto", PORT);
});
