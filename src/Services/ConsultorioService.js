import api from "./conexion"; // Importa la configuración de Axios para llamadas HTTP al backend

// =======================
// Servicio: Listar Consultorios
// =======================
export const ListarConsultorio = async () => {
  try {
    const response = await api.get("/listarConsultorios"); // Llama al endpoint GET
    return { success: true, data: response.data }; // Devuelve los datos si la respuesta fue exitosa
  } catch (error) {
    // Manejo de errores
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

// =======================
// Servicio: Eliminar Consultorio por ID
// =======================
export const eliminarConsultorio = async (id) => {
  try {
    await api.delete(`/eliminarConsultorio/${id}`); // Llama al endpoint DELETE con ID
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

// =======================
// Servicio: Crear nuevo Consultorio
// =======================
export const crearConsultorio = async (data) => {
  try {
    const response = await api.post("/crearConsultorio", data); // Llama al endpoint POST con los datos
    return { success: true, data: response.data };
  } catch (error) { // ← Aquí estaba mal, se agregó el parámetro `error`
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

// =======================
// Servicio: Editar Consultorio por ID
// =======================
export const editarConsultorio = async (id, data) => {
  try {
    const response = await api.put(`/editarConsultorio/${id}`, data); // PUT con ID y nuevos datos
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
