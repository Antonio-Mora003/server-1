require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

// Configuración
app.use(express.json());
app.use(cors());

// Conectar a MongoDB
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB conectado"))
  .catch(err => console.error(err));

// Rutas
app.use("/api/users", require("./routes/userRoutes"));

// Iniciar servidor
const PORT = process.env.PORT || 10000;

app.get("/", (req, res) => {
    res.send("Servidor funcionando correctamente");
});
const path = require("path");

// Servir archivos estáticos
app.use(express.static(path.join(__dirname, "frontend")));

// Servir el archivo index.html en la raíz
app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "index.html"));
});


app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));
