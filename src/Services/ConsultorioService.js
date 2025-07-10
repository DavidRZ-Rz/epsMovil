import api from "./conexion";


// Consultorios

export const ListarConsultorio = async () => {
  try {
    const response = await api.get("/listarConsultorios");
    return { success: true, data: response.data };
  } catch (error) {
    console.log(
      "Error al listar Consultorio: ",
      error.response ? error.response.data : error.message
    );
    return {
      success: false,
      message: error.response ? error.response.data : "Error de conexión",
    };
  }
};

export const eliminarConsultorio = async (id) => {
  try {
    await api.delete(`/eliminarConsultorio/${id}`);
    return { success: true };
  } catch (error) {
    console.log(
      "Error al eliminar Consultorio: ",
      error.message ? error.response.data : error.message
    );
    return {
      success: false,
      message: error.response ? error.response.data : "Error de conexión",
    };
  }
};

export const crearConsultorio = async (data) => {
  try {
    const response = await api.post("/crearConsultorio", data);
    return { success: true, data: response.data };
  } catch {
    console.log(
      "Error al crear consultorio: ",
      error.response ? error.response.data : error.message
    );
    return {
      success: false,
      message: error.response ? error.response.data : "Error de conexión",
    };
  }
};

export const editarConsultorio = async (id, data) => {
  try {
    const response = await api.put(`/editarConsultorio/${id}`, data);
    return { success: true, data: response.data };
  } catch (error) {
    console.log(
      "Error al editar consultorio: ",
      error.response ? error.response.data : error.message
    );
    return {
      success: false,
      message: error.response ? error.response.data : "Error de conexión",
    };
  }
};

