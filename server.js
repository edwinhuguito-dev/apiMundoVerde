const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

// --- Debug mínimo para Render ---
console.log("1) Iniciando server.js");
console.log("2) MONGO_URI existe:", !!process.env.MONGO_URI);

// --- Conexión Mongo ---
mongoose
  .connect(process.env.MONGO_URI, { serverSelectionTimeoutMS: 8000 })
  .then(() => console.log("✅ Conectado a MongoDB Atlas"))
  .catch((err) => console.log("❌ Error MongoDB:", err.message));

// --- Esperar a Mongo antes de atender /api ---
let mongoReady = false;

mongoose.connection.on("connected", () => {
  mongoReady = true;
  console.log("✅ Mongo listo");
});

app.use((req, res, next) => {
  if (!mongoReady && req.path.startsWith("/api/")) {
    return res.status(503).json({ ok: false, msg: "Mongo aún no está listo, reintenta" });
  }
  next();
});

// --- Rutas ---
app.get("/", (req, res) => {
  res.send("PAFINAL API OK");
});

// Punto 2 (GET con parámetro)
app.get("/api/servicio", (req, res) => {
  const dato = req.query.dato;
  if (!dato) {
    return res.status(400).json({ ok: false, msg: "Falta parametro ?dato=" });
  }
  return res.json({ ok: true, recibido: dato });
});

// Modelo + endpoint maestro (Punto 3)
const Categoria = mongoose.model(
  "Categoria",
  new mongoose.Schema({
    nombre: String,
    descripcion: String,
  }),
  "categorias"
);

app.get("/api/categorias", async (req, res) => {
  try {
    const lista = await Categoria.find().sort({ nombre: 1 });
    res.json(lista);
  } catch (err) {
    res.status(500).json({ ok: false, msg: err.message });
  }
});

// --- Server ---
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log("Servidor en puerto", PORT));