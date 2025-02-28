const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config();

const router = express.Router();

// Ruta para registrar un usuario
router.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Verificar si el usuario ya existe
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "El usuario ya existe" });
        }

        // Encriptar la contraseña
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Crear nuevo usuario
        const newUser = new User({ username, email, password: hashedPassword });
        await newUser.save();

        // Generar token JWT
        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({ message: "Usuario registrado con éxito", token });
    } catch (error) {
        res.status(500).json({ message: "Error en el servidor", error });
    }
});

module.exports = router;
