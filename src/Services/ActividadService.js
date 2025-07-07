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


// Docotores

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
    await api.delete(`/eliminarDoctor/${id}`);
    return { success: true };
  } catch (error) {
    console.log(
      "Error al eliminar doctor: ",
      error.message ? error.response.data : error.message
    );
    return {
      success: false,
      message: error.response ? error.response.data : "Error de conexión",
    };
  }
};

export const crearDoctor = async (data) => {
  try {
    const response = await api.post("/crearDoctor", data);
    return { success: true, data: response.data };
  } catch {
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

export const EditarDoctor = async (id, data) => {
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

