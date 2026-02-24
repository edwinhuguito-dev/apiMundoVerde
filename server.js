
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");


const app = express();
app.use(cors());
app.use(express.json());

const MONGODB_URI = process.env.MONGODB_URI;

// 1) Conexión a MongoDB Atlas
mongoose
  .connect(MONGODB_URI)
  .then(() => console.log("✅ Conectado a MongoDB"))
  .catch((err) => console.error("Error MongoDB:", err.message));

// 2) Esquemas / modelos
const categoriaSchema = new mongoose.Schema(
  {
    nombre: { type: String, required: true },
    descripcion: { type: String, required: true },
  },
  { timestamps: true }
);

const plantaSchema = new mongoose.Schema(
  {
    nombre: { type: String, required: true },
    agua: { type: String, required: true },
    humedad: { type: String, required: true },
    suelo: { type: String, required: true },
    luz: { type: String, required: true },
    cuidados: { type: String, required: true },
    categoriaId: { type: mongoose.Schema.Types.ObjectId, ref: "Categoria", required: true },
  },
  { timestamps: true }
);

const Categoria = mongoose.model("Categoria", categoriaSchema);
const Planta = mongoose.model("Planta", plantaSchema);

// 3) Endpoints maestro–detalle
// Maestro: listar categorías
app.get("/api/categorias", async (req, res) => {
  try {
    const categorias = await Categoria.find().sort({ nombre: 1 });
    res.json(categorias);
  } catch (e) {
    res.status(500).json({ ok:false, mensaje:"Error al listar categorias" });
  }
});

// Detalle: listar plantas por categoriaId (GET con parámetro)
app.get("/api/plantas", async (req, res) => {
  const { categoriaId } = req.query;

  if (!categoriaId) {
    return res.status(400).json({ ok: false, mensaje: "Falta el parámetro categoriaId" });
  }

  const plantas = await Planta.find({ categoriaId }).sort({ nombre: 1 });
  res.json({ ok: true, data: plantas });
});

// Detalle: 1 planta por id (si lo necesitas)
app.get("/api/planta", async (req, res) => {
  const { id } = req.query;
  if (!id) return res.status(400).json({ ok: false, mensaje: "Falta el parámetro id" });

  const planta = await Planta.findById(id);
  if (!planta) return res.status(404).json({ ok: false, mensaje: "No existe esa planta" });

  res.json({ ok: true, data: planta });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Servidor activo en puerto", PORT));