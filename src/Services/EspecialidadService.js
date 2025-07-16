import api from "./conexion"; // Axios configurado para consumir la API

// =======================
// Servicio: Listar Especialidades
// =======================
export const listarEspecialidad = async () => {
  try {
    const response = await api.get("/listarEspecialidades");
    return { success: true, data: response.data };
  } catch (error) {
    console.log(
      "Error al listar Especialidad: ",
      error.response ? error.response.data : error.message
    );
    return {
      success: false,
      message: error.response ? error.response.data : "Error de conexión",
    };
  }
};

// =======================
// Servicio: Eliminar Especialidad por ID
// =======================
export const eliminarEspecialidad = async (id) => {
  try {
    await api.delete(`/eliminarEspecialidad/${id}`);
    return { success: true };
  } catch (error) {
    console.log(
      "Error al eliminar especialidad: ",
      error.response ? error.response.data : error.message
    );
    return {
      success: false,
      message: error.response ? error.response.data : "Error de conexión",
    };
  }
};

// =======================
// Servicio: Crear nueva Especialidad
// =======================
export const crearEspecialidad = async (data) => {
  try {
    const response = await api.post("/crearEspecialidad", data);
    return { success: true, data: response.data };
  } catch (error) { // ← Aquí faltaba poner `error` como parámetro
    console.log(
      "Error al crear especialidad: ",
      error.response ? error.response.data : error.message
    );
    return {
      success: false,
      message: error.response ? error.response.data : "Error de conexión",
    };
  }
};

// =======================
// Servicio: Editar Especialidad por ID
// =======================
export const editarEspecialidad = async (id, data) => {
  try {
    const response = await api.put(`/editarEspecialidad/${id}`, data);
    return { success: true, data: response.data };
  } catch (error) {
    console.log(
      "Error al editar especialidad: ",
      error.response ? error.response.data : error.message
    );
    return {
      success: false,
      message: error.response ? error.response.data : "Error de conexión",
    };
  }
};

// =======================
// Servicio: Buscar una Especialidad por ID
// =======================
export const buscarEspecialidad = async (id) => {
  try {
    const response = await api.get(`/listarEspecialidades/${id}`);
    return { success: true, data: response.data };
  } catch (error) {
    console.log(
      "Error al buscar especialidad: ",
      error.response ? error.response.data : error.message
    );
    return {
      success: false,
      message: error.response ? error.response.data : "Error de conexión",
    };
  }
};
