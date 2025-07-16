import api from "./conexion"; // Importa la configuración de Axios para realizar peticiones HTTP

// =======================
// Servicio: Listar Doctores
// =======================
export const listarDoctor = async () => {
  try {
    const response = await api.get("/listarDoctores"); // Solicita todos los doctores
    return { success: true, data: response.data }; // Devuelve los datos en caso de éxito
  } catch (error) {
    console.log(
      "Error al listar doctor: ",
      error.response ? error.response.data : error.message
    );
    return {
      success: false,
      message: error.response ? error.response.data : "Error de conexión",
    };
  }
};

// =======================
// Servicio: Eliminar Doctor por ID
// =======================
export const eliminarDoctor = async (id) => {
  try {
    const response = await api.delete(`/eliminarDoctor/${id}`); // Elimina doctor por su ID
    return {
      success: true,
      message: "Doctor eliminado correctamente", // Mensaje personalizado en caso de éxito
    };
  } catch (error) {
    console.log("Error al eliminar doctor:", error);

    let errorMessage = "Error de conexión"; // Mensaje por defecto

    // Manejo personalizado para errores específicos
    if (error.response) {
      if (error.response.status === 409) {
        // Si el doctor tiene citas, se retorna un mensaje específico
        errorMessage =
          "No se puede eliminar el doctor porque tiene citas programadas";
      } else {
        // Otro error del servidor
        errorMessage =
          error.response.data?.message || "Error al eliminar el doctor";
      }
    } else if (error.message) {
      // Error genérico
      errorMessage = error.message;
    }

    return {
      success: false,
      message: errorMessage,
    };
  }
};

// =======================
// Servicio: Crear nuevo Doctor
// =======================
export const crearDoctor = async (data) => {
  try {
    const response = await api.post("/crearDoctor", data); // Envía los datos al servidor
    return { success: true, data: response.data };
  } catch (error) {
    console.log(
      "Error al crear doctor: ",
      error.response ? error.response.data : error.message
    );
    return {
      success: false,
      message: error.response ? error.response.data : "Error de conexión",
    };
  }
};

// =======================
// Servicio: Editar Doctor por ID
// =======================
export const editarDoctor = async (id, data) => {
  try {
    const response = await api.put(`/editarDoctor/${id}`, data); // Edita los datos de un doctor existente
    return { success: true, data: response.data };
  } catch (error) {
    console.log(
      "Error al editar doctor: ",
      error.response ? error.response.data : error.message
    );
    return {
      success: false,
      message: error.response ? error.response.data : "Error de conexión",
    };
  }
};
