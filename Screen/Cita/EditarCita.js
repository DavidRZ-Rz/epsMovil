import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Alert,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import { crearCita, editarCita } from "../../src/Services/CitasService";
import { useNavigation, useRoute } from "@react-navigation/native";
import { listarDoctor } from "../../src/Services/DoctorService";
import { listarPaciente } from "../../src/Services/ActividadService";

/**
 * Componente para crear o editar una cita médica
 * Maneja tanto la creación como la edición mediante el parámetro de ruta 'cita'
 */
export default function EditarCita() {
  // Hooks de navegación y ruta
  const navigation = useNavigation();
  const route = useRoute();
  
  // Obtiene los datos de la cita si está en modo edición
  const cita = route.params?.cita;

  // Estados del formulario
  const [fecha, setFecha] = useState(cita?.fecha || "");
  const [hora, setHora] = useState(cita?.hora || "");
  const [doctor_id, setDoctorId] = useState(cita?.doctor_id || "");
  const [paciente_id, setPacienteId] = useState(cita?.paciente_id || "");
  const [doctores, setDoctores] = useState([]); // Lista de doctores disponibles
  const [pacientes, setPacientes] = useState([]); // Lista de pacientes disponibles
  const [loading, setLoading] = useState(false); // Estado de carga

  // Bandera para determinar si es edición o creación
  const esEdicion = !!cita;

  /**
   * Efecto para cargar la lista de doctores al montar el componente
   */
  useEffect(() => {
    const cargarDoctores = async () => {
      const result = await listarDoctor();
      if (result.success) {
        setDoctores(result.data);
      } else {
        Alert.alert(
          "Error",
          result.message || "No se pudieron cargar los doctores"
        );
      }
    };
    cargarDoctores();
  }, []);

  /**
   * Efecto para cargar la lista de pacientes al montar el componente
   */
  useEffect(() => {
    const cargarPacientes = async () => {
      const result = await listarPaciente();
      if (result.success) {
        setPacientes(result.data);
      } else {
        Alert.alert(
          "Error",
          result.message || "No se pudieron cargar los pacientes"
        );
      }
    };
    cargarPacientes();
  }, []);

  /**
   * Maneja el envío del formulario para crear o editar una cita
   */
  const handleGuardar = async () => {
    // Validación básica de campos requeridos
    if (!fecha || !hora || !doctor_id || !paciente_id) {
      Alert.alert("Error", "Por favor completa todos los campos");
      return;
    }

    setLoading(true);

    try {
      let result;
      
      // Decide si llamar a editar o crear según el modo
      if (esEdicion) {
        result = await editarCita(cita.id, {
          fecha,
          hora,
          idDoctor: parseInt(doctor_id),
          idPaciente: parseInt(paciente_id),
        });
      } else {
        result = await crearCita({
          fecha,
          hora,
          idDoctor: parseInt(doctor_id),
          idPaciente: parseInt(paciente_id),
        });
      }

      // Manejo de la respuesta exitosa
      if (result?.success) {
        Alert.alert(
          "Éxito",
          `Cita ${esEdicion ? "editada" : "creada"} correctamente`
        );
        navigation.goBack();
      } else {
        // Procesamiento de errores del backend
        let errorMsg = "No se pudo guardar la cita";
        
        // Maneja diferentes formatos de mensaje de error
        if (typeof result.message === "object") {
          errorMsg = Object.entries(result.message)
            .map(([key, val]) => `${key}: ${val.join(", ")}`)
            .join("\n");
        } else if (typeof result.message === "string") {
          errorMsg = result.message;
        }

        Alert.alert("Error", errorMsg);
      }
    } catch (error) {
      // Manejo de errores inesperados
      Alert.alert("Error", "No se pudo guardar la cita");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* Título dinámico según el modo (edición/creación) */}
      <Text style={styles.title}>
        {esEdicion ? "Editar Cita" : "Nueva Cita"}
      </Text>

      {/* Selector de doctor */}
      <Picker
        selectedValue={doctor_id}
        onValueChange={(itemValue) => setDoctorId(itemValue)}
        style={styles.input}
      >
        <Picker.Item label="Seleccione un Doctor" value="" />
        {doctores.map((doctor) => (
          <Picker.Item
            key={doctor.id}
            label={`${doctor.nombre} ${doctor.apellido}`}
            value={doctor.id}
          />
        ))}
      </Picker>

      {/* Selector de paciente */}
      <Picker
        selectedValue={paciente_id}
        onValueChange={(itemValue) => setPacienteId(itemValue)}
        style={styles.input}
      >
        <Picker.Item label="Seleccione un Paciente" value="" />
        {pacientes.map((paciente) => (
          <Picker.Item
            key={paciente.id}
            label={`${paciente.nombre} ${paciente.apellido}`}
            value={paciente.id}
          />
        ))}
      </Picker>

      {/* Campo para la fecha */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Fecha:</Text>
        <TextInput
          style={styles.input}
          value={fecha}
          onChangeText={setFecha}
          placeholder="YYYY-MM-DD"
        />
      </View>

      {/* Campo para la hora */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Hora:</Text>
        <TextInput
          style={styles.input}
          value={hora}
          onChangeText={setHora}
          placeholder="HH:MM AM/PM"
        />
      </View>

      {/* Botón de guardar con indicador de carga */}
      <TouchableOpacity
        style={styles.button}
        onPress={handleGuardar}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>
            {esEdicion ? "Guardar Cambios" : "Registrar Cita"}
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7FA",
    padding: 20,
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2C3E50",
    textAlign: "center",
    marginBottom: 30,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    color: "#7F8C8D",
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: "#D0D7DE",
    backgroundColor: "#fff",
    padding: Platform.OS === "ios" ? 12 : 10,
    borderRadius: 8,
    fontSize: 16,
    color: "#2C3E50",
  },
  button: {
    backgroundColor: "#1976D2",
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 10,
  },
});
