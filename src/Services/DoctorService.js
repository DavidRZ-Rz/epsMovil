import api from "./conexion";

// Docotores
// Doctores
export const listarDoctor = async () => {
  try {
    const response = await api.get("/listarDoctores");
    return { success: true, data: response.data };
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

export const eliminarDoctor = async (id) => {
  try {
    const response = await api.delete(`/eliminarDoctor/${id}`);
    return {
      success: true,
      message: "Doctor eliminado correctamente",
    };
  } catch (error) {
    console.log("Error al eliminar doctor:", error);

    let errorMessage = "Error de conexión";

    if (error.response) {
      if (error.response.status === 409) {
        errorMessage =
          "No se puede eliminar el doctor porque tiene citas programadas";
      } else {
        errorMessage =
          error.response.data?.message || "Error al eliminar el doctor";
      }
    } else if (error.message) {
      errorMessage = error.message;
    }

    return {
      success: false,
      message: errorMessage,
    };
  }
};

export const crearDoctor = async (data) => {
  try {
    const response = await api.post("/crearDoctor", data);
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

export const editarDoctor = async (id, data) => {
  try {
    const response = await api.put(`/editarDoctor/${id}`, data);
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
