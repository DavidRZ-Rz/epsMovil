import api from "./conexion";

export const listarPaciente = async () => {
  try {
    const response = await api.get("/listarPacientes");
    return { success: true, data: response.data };
  } catch (error) {
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

export const eliminarPaciente = async (id) => {
  try {
    await api.delete(`/eliminarPaciente/${id}`);
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

export const crearPaciente = async (data) => {
  try {
    const response = await api.post("/crearPaciente", data);
    return { success: true, data: response.data };
  } catch {
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

export const EditarPaciente = async (id, data) => {
  try {
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


