const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Conectado a MongoDB Atlas"))
  .catch((err) => console.log("Error MongoDB:", err.message));

// PUNTO 2: recibir parámetro por GET
// Ejemplo: http://localhost:3000/api/servicio?dato=hola
app.get("/api/servicio", (req, res) => {
  const dato = req.query.dato; // <-- parámetro GET
  if (!dato) {
    return res.status(400).json({ ok: false, msg: "Falta parametro ?dato=" });
  }
  return res.json({ ok: true, recibido: dato });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log("Servidor en puerto", PORT);
});