import api from "./conexion";

// Especilidades 


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

export const eliminarEspecialidad = async (id) => {
  try {
    await api.delete(`/eliminarEspecialidad/${id}`);
    return { success: true };
  } catch (error) {
    console.log(
      "Error al eliminar especialidad: ",
      error.message ? error.response.data : error.message
    );
    return {
      success: false,
      message: error.response ? error.response.data : "Error de conexión",
    };
  }
};

export const crearEspecialidad = async (data) => {
  try {
    const response = await api.post("/crearEspecialidad", data);
    return { success: true, data: response.data };
  } catch {
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