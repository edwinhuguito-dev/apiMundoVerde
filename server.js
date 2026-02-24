const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const plantas = [
  { id: 1, nombre: "Monstera", agua: "2–3 cm seco", humedad: "Alta", suelo: "Drenante", luz: "Indirecta brillante", cuidados: "Rotar y limpiar hojas" },
  { id: 2, nombre: "Sansevieria", agua: "Cada 2–3 semanas", humedad: "Baja-media", suelo: "Cactus", luz: "Baja a brillante", cuidados: "No encharcar" },
  { id: 3, nombre: "Pothos", agua: "Semanal", humedad: "Media", suelo: "Universal drenante", luz: "Indirecta", cuidados: "Poda y esquejes" },
  { id: 4, nombre: "Ficus elastica", agua: "Capa superior seca", humedad: "Media", suelo: "Universal + perlita", luz: "Indirecta brillante", cuidados: "No mover mucho" },
  { id: 5, nombre: "Calathea", agua: "Húmedo ligero", humedad: "Alta", suelo: "Aireado", luz: "Indirecta media", cuidados: "Evitar corrientes" },
  { id: 6, nombre: "Aloe vera", agua: "Cada 2–3 semanas", humedad: "Baja", suelo: "Cactus", luz: "Mucha luz", cuidados: "Maceta con agujero" },
  { id: 7, nombre: "Helecho", agua: "Frecuente", humedad: "Alta", suelo: "Rico drenante", luz: "Indirecta", cuidados: "Rociar hojas" },
  { id: 8, nombre: "Zamioculca", agua: "Cada 2–3 semanas", humedad: "Baja-media", suelo: "Drenante", luz: "Baja", cuidados: "Resistente" },
  { id: 9, nombre: "Peace Lily", agua: "1–2/semana", humedad: "Media-alta", suelo: "Rico", luz: "Indirecta", cuidados: "Hojas caídas = agua" },
  { id: 10, nombre: "Dracaena", agua: "Capa superior seca", humedad: "Media", suelo: "Universal", luz: "Indirecta", cuidados: "Evitar exceso" },
  { id: 11, nombre: "Orquídea", agua: "7–10 días", humedad: "Media-alta", suelo: "Corteza", luz: "Indirecta brillante", cuidados: "Ventilación" },
  { id: 12, nombre: "Cactus", agua: "3–4 semanas", humedad: "Baja", suelo: "Muy drenante", luz: "Sol", cuidados: "Nada de exceso" },
  { id: 13, nombre: "Romero", agua: "Moderado", humedad: "Baja", suelo: "Arenoso", luz: "Sol", cuidados: "Buena ventilación" },
  { id: 14, nombre: "Lavanda", agua: "Moderado", humedad: "Baja", suelo: "Arenoso", luz: "Sol", cuidados: "Poda ligera" },
  { id: 15, nombre: "Areca", agua: "Superficie seca", humedad: "Media-alta", suelo: "Drenante", luz: "Indirecta brillante", cuidados: "Rociar" },
  { id: 16, nombre: "Tradescantia", agua: "Semanal", humedad: "Media", suelo: "Universal", luz: "Indirecta brillante", cuidados: "Poda frecuente" },
  { id: 17, nombre: "Begonia", agua: "Capa superior seca", humedad: "Media", suelo: "Ligero", luz: "Indirecta brillante", cuidados: "No mojar hojas" },
  { id: 18, nombre: "Croton", agua: "Regular", humedad: "Media", suelo: "Universal", luz: "Indirecta brillante", cuidados: "Más luz = más color" },
  { id: 19, nombre: "Bambú de la suerte", agua: "Cambiar semanal", humedad: "Media", suelo: "Agua o tierra", luz: "Indirecta", cuidados: "Agua limpia" },
  { id: 20, nombre: "Echeveria", agua: "2–3 semanas", humedad: "Baja", suelo: "Cactus", luz: "Mucha luz", cuidados: "Riego espaciado" },
];


app.get("/api/plantas", (req, res) => {
  res.json(plantas);
});


app.get("/api/planta", (req, res) => {
  const id = Number(req.query.id);

  if (!id) {
    return res.status(400).json({ ok: false, mensaje: "Falta el parámetro id" });
  }

  const planta = plantas.find((p) => p.id === id);

  if (!planta) {
    return res.status(404).json({ ok: false, mensaje: "No existe esa planta" });
  }

  res.json({ ok: true, data: planta });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Servidor activo en puerto", PORT));