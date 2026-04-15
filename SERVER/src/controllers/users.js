const bcrypt = require("bcrypt");
const userModel = require("../db/models/users");

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ message: "Todos los campos son requeridos" });
    }

    const existUser = await userByEmail(email);

    if (existUser) {
      return res.status(400).json({ message: "El usuario ya existe" });
    }

    const password_hash = await bcrypt.hash(passsword, 10);

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
    const { id } = req.params;
    const { name, password } = req.body;

    const updateData = {
      name,
    };

    if (password && password.trim() !== "") {
      updateData.password_hash = password
        ? await bcrypt.hash(password, 10)
        : undefined;
    }

    await userModel.updateUser(id, updateData);

    return res
      .status(200)
      .json({ message: "Usuario actualizado correctamete" });
  } catch (error) {
    console.error("Error al actualizar el usuario:", error);
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

    return res.status(200).json({ message: "Inicio de sesión exitoso" });
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
  }
};

module.exports = { registerUser, updateUser, deleteUser, loginUser };
