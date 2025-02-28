const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Registro de usuario
const registerUser = async (req, res) => {
    const { username, password, role } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: "Todos los campos son obligatorios." });
    }

    const userExists = await User.findOne({ username });
    if (userExists) {
        return res.status(400).json({ message: "El usuario ya existe." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ username, password: hashedPassword, role });

    if (newUser) {
        res.status(201).json({ message: "Usuario registrado correctamente." });
    } else {
        res.status(400).json({ message: "Error al registrar usuario." });
    }
};

// Inicio de sesión
const loginUser = async (req, res) => {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) {
        return res.status(400).json({ message: "Usuario o contraseña incorrectos." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(400).json({ message: "Usuario o contraseña incorrectos." });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.json({ token, username: user.username, role: user.role });
};

module.exports = { registerUser, loginUser };
