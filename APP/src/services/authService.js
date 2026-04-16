import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

// Register User, aquí se crea el usuario en la base de datos
export const registerUser = async (values) => {
  const response = await axios.post(`${API_URL}/auth/register`, {
    name: values.name,
    email: values.email,
    password: values.password,
  });
  return response.data;
};

// Login User, aquí se obtiene el token y el usuario y lo guardamos en el localStorage del navegador para mantener la sesión activa
export const loginUser = async (values) => {
  const response = await axios.post(`${API_URL}/auth/login`, {
    email: values.email,
    password: values.password,
  });

  const data = response.data;

  if (!data.token) {
    throw new Error("El backend no devolvió un token");
  }

  localStorage.setItem("token", data.token);

  if (data.user) {
    localStorage.setItem("user", JSON.stringify(data.user));
  }

  return data;
};

// Logout User, aquí se elimina el token y el user del localStorage una vez se cierre la sesión
export const logoutUser = async () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};

// isAuthenticated, aquí se verifica si el user está autenticado por token almacenado en el localStorage
export const isAuthenticated = () => {
  return !!localStorage.getItem("token");
};

// getUser, aquí se obtiene el user almacenado en el localStorage
export const getUser = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

// getProfile, aquí se obtiene el perfil del usuario
export const getProfile = async () => {
  //Tomamos el token del localstorage
  const token = localStorage.getItem("token");
  //Hago la peticion al endpoint y pasamos en el header el token, Sin token no hay acceso a la ruta.
  const response = await axios.get(`${API_URL}/users/profile`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const updateUser = async (values) => {
  //sin token no se hace nada
  const token = localStorage.getItem("token");
  // Objeto para enviar los datos al backend
  const payload = {};

  //Si el nombre no es vacío, se agrega al payload
  if (values.name && values.name.trim() !== "") {
    payload.name = values.name.trim();
  }

  //Si la contraseña no es vacía, se agrega al payload
  if (values.password && values.password.trim() !== "") {
    payload.password = values.password.trim();
  }
  //Peticion al backend y con token para autorizar
  const response = await axios.put(`${API_URL}/users/profile`, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  //Return con los datos del usuario actualizados
  return response.data;
};
