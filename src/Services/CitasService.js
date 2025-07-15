import api from "./conexion";

// citas
 
// Función para listar citas
// Realiza una petición GET a la API para obtener todas las citas
export const listarCita= async () => {
  try {
    const response = await api.get("/listarCitas");
    return { success: true, data: response.data };
  } catch (error) {
    console.log(
      "Error al listar Cita: ",
      error.response ? error.response.data : error.message
    );
    return {
      success: false,
      message: error.response ? error.response.data : "Error de conexión",
    };
  }
};

// Función para obtener los detalles de una cita específica
// Realiza una petición GET a la API para obtener los detalles de una cita por ID
export const eliminarCita = async (id) => {
  try {
    await api.delete(`/eliminarCita/${id}`);
    return { success: true };
  } catch (error) {
    console.log(
      "Error al eliminar Cita: ",
      error.response ? error.response.data : error.message
    );
    return {
      success: false,
      message: error.response ? error.response.data : "Error de conexión",
    };
  }
};

// Función para crear una nueva cita
// Realiza una petición POST a la API para crear una nueva cita
export const crearCita = async (data) => {
  try {
    const response = await api.post("/crearCita", data);
    return { success: true, data: response.data };
  } catch (error) {
    console.log(
      "Error al crear Cita: ",
      error.response ? error.response.data : error.message
    );
    return {
      success: false,
      message: error.response ? error.response.data : "Error de conexión",
    };
  }
};

// Función para editar una cita existente
// Realiza una petición PUT a la API para actualizar los detalles de una cita por ID
export const editarCita = async (id, data) => {
  try {
    const response = await api.put(`/editarCita/${id}`, data);
    return { success: true, data: response.data };
  } catch (error) {
    console.log(
      "Error al editar Cita: ",
      error.response ? error.response.data : error.message
    );
    return {
      success: false,
      message: error.response ? error.response.data : "Error de conexión",
    };
  }
};

