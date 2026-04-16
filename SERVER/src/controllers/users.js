const bcrypt = require("bcrypt");
const userModel = require("../db/models/users");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ message: "Todos los campos son requeridos" });
    }

    const existUser = await userModel.userByEmail(email);

    if (existUser) {
      return res.status(400).json({ message: "El usuario ya existe" });
    }

    const password_hash = await bcrypt.hash(password, 10);

    await userModel.createUser({
      name,
      email,
      password_hash,
    });

    return res.status(201).json({ message: "Usuario creado correctamente" });
  } catch (error) {
    console.error("Error al registrar el usuario:", error);
  }
};

const updateUser = async (req, res) => {
  try {
    const { name, password } = req.body;

    const updateData = {};

    if (name && name.trim() !== "") {
      updateData.name = name.trim();
    }

    if (password && password.trim() !== "") {
      updateData.password_hash = await bcrypt.hash(password, 10);
    }

    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({ message: "No hay datos para actualizar" });
    }

    await userModel.updateUser(req.user.id, updateData);

    const updatedUser = await userModel.userById(req.user.id);

    return res.status(200).json({
      message: "Perfil actualizado correctamente",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Error al actualizar el perfil:", error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await userModel.deleteUser(id);
    return res.status(200).json({ message: "Usuario eliminado correctamente" });
  } catch (error) {
    console.error("Error al eliminar el usuario:", error);
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.userByEmail(email);

    if (!user || !(await bcrypt.compare(password, user.password_hash))) {
      return res.status(401).json({ message: "Credenciales incorrectas" });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    return res.status(200).json({ message: "Inicio de sesión exitoso", token });
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
  }
};

const getProfile = async (req, res) => {
  try {
    //Aqui ya uso el modal del userById para obtener el usuario y no el user que viene del token.
    const user = await userModel.userById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    return res.status(200).json({
      message: "Perfil obtenido correctamente",
      user,
    });
  } catch (error) {
    console.error("Error al obtener el perfil:", error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

module.exports = {
  registerUser,
  updateUser,
  deleteUser,
  loginUser,
  getProfile,
};
