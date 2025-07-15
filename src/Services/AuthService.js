import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "./conexion";

// Función para validar email
const isValidEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

// Función para validar contraseña
const isValidPassword = (password) => {
  return password.length >= 8;
};
// Función para iniciar sesión
// Utiliza AsyncStorage para almacenar el token de usuario
export const loginUser = async (email, password) => {
  // Validaciones antes de la petición
  if (!email || !password) {
    return {
      success: false,
      error: { message: "Email y contraseña son requeridos" }
    };
  }

  if (!isValidEmail(email)) {
    return {
      success: false,
      error: { message: "Por favor ingresa un email válido" }
    };
  }

  try {
    const response = await api.post("/login", { email, password });
    const { token } = response.data;

    await AsyncStorage.setItem("userToken", token);

    return { success: true, token };
  } catch (error) {
    console.error(
      "Error de login",
      error.response ? error.response.data : error.message
    );
    return {
      success: false,
      error: error.response ? error.response.data : { message: "Error de conexión" },
    };
  }
};
// Función para obtener el perfil del usuario
export const logoutUser = async () => {
  try {
    await api.post("/logout");
    await AsyncStorage.removeItem("userToken");
    return { success: true };
  } catch (error) {
    console.log(
      "Error al cerrar sesión",
      error.response ? error.response.data : error.message
    );
    return {
      success: false,
      error: error.response ? error.response.data : { message: "Error al cerrar sesión" },
    };
  }
};
// Función para registrar un nuevo usuario
export const registerUser = async (name, email, password, role = 'user') => {
  // Validaciones frontend antes de enviar
  if (!name || !email || !password) {
    return {
      success: false,
      error: { errors: { 
        ...(!name && { name: ["El nombre es requerido"] }),
        ...(!email && { email: ["El email es requerido"] }),
        ...(!password && { password: ["La contraseña es requerida"] })
      }}
    };
  }

  if (!isValidEmail(email)) {
    return {
      success: false,
      error: { errors: { email: ["Por favor ingresa un email válido"] } }
    };
  }

  if (!isValidPassword(password)) {
    return {
      success: false,
      error: { errors: { password: ["La contraseña debe tener al menos 8 caracteres"] } }
    };
  }

  try {
    const response = await api.post("/register", { 
      name,
      email, 
      password,
      role 
    });
    
    // Opcional: Login automático después del registro
    const loginResult = await loginUser(email, password);
    if (!loginResult.success) {
      return loginResult;
    }

    return { 
      success: true, 
      data: response.data,
      token: loginResult.token
    };
  } catch (error) {
    console.error(
      "Error de registro",
      error.response ? error.response.data : error.message
    );
    
    // Manejo específico de errores de conexión
    if (!error.response) {
      return {
        success: false,
        error: { errors: { general: ["Error de conexión con el servidor"] } }
      };
    }
    
    return {
      success: false,
      error: error.response.data
    };
  }
};