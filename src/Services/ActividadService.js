import api from "./conexion"; // Importa la instancia de Axios personalizada para realizar peticiones

// Servicio para listar todos los pacientes
export const listarPaciente = async () => {
  try {
    // Realiza una petición GET al backend
    const response = await api.get("/listarPacientes");
    // Devuelve los datos con éxito
    return { success: true, data: response.data };
  } catch (error) {
    // Manejo de errores con mensaje personalizado
    console.log(
      "Error al listar paciente: ",
      error.response ? error.response.data : error.message
    );
    return {
      success: false,
      message: error.response ? error.response.data : "Error de conexión",
    };
  }
};

// Servicio para eliminar un paciente por su ID
export const eliminarPaciente = async (id) => {
  try {
    // Realiza una petición DELETE al backend con el ID del paciente
    await api.delete(`/eliminarPaciente/${id}`);
    // Devuelve éxito si no hay error
    return { success: true };
  } catch (error) {
    console.log(
      "Error al eliminar paciente: ",
      error.message ? error.response.data : error.message
    );
    return {
      success: false,
      message: error.response ? error.response.data : "Error de conexión",
    };
  }
};

// Servicio para crear un nuevo paciente
export const crearPaciente = async (data) => {
  try {
    // Realiza una petición POST al backend con los datos del paciente
    const response = await api.post("/crearPaciente", data);
    // Devuelve los datos del nuevo paciente creado
    return { success: true, data: response.data };
  } catch (error) { // <- Aquí faltaba `error` como parámetro del catch
    console.log(
      "Error al crear paciente: ",
      error.response ? error.response.data : error.message
    );
    return {
      success: false,
      message: error.response ? error.response.data : "Error de conexión",
    };
  }
};

// Servicio para editar un paciente existente por su ID
export const EditarPaciente = async (id, data) => {
  try {
    // Realiza una petición PUT al backend con el ID y los nuevos datos
    const response = await api.put(`/editarPaciente/${id}`, data);
    return { success: true, data: response.data };
  } catch (error) {
    console.log(
      "Error al editar paciente: ",
      error.response ? error.response.data : error.message
    );
    return {
      success: false,
      message: error.response ? error.response.data : "Error de conexión",
    };
  }
};
