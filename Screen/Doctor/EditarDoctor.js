import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useNavigation, useRoute } from "@react-navigation/native";
import { crearDoctor, editarDoctor } from "../../src/Services/DoctorService";
import { listarEspecialidad } from "../../src/Services/EspecialidadService";
import { ListarConsultorio } from "../../src/Services/ConsultorioService";

export default function EditarDoctorScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const doctor = route.params?.doctor;

  const [nombre, setNombre] = useState(doctor?.nombre || "");
  const [apellido, setApellido] = useState(doctor?.apellido || "");
  const [consultorio_id, setConsultorioId] = useState(
    doctor?.consultorio_id || ""
  );
  const [especialidad_id, setEspecialidadId] = useState(
    doctor?.especialidad_id || ""
  );
  const [loading, setLoading] = useState(false);
  const [especialidades, setEspecialidades] = useState([]);
  const [consultorios, setConsultorios] = useState([]);

  useEffect(() => {
    const cargarConsultorios = async () => {
      const result = await ListarConsultorio();
      if (result.success) {
        setConsultorios(result.data);
      } else {
        Alert.alert(
          "Error",
          result.message || "No se pudieron cargar los consultorios"
        );
      }
    };
    cargarConsultorios();
  }, []);
  useEffect(() => {
    const cargarEspecialidades = async () => {
      const result = await listarEspecialidad();
      if (result.success) {
        setEspecialidades(result.data);
      } else {
        Alert.alert(
          "Error",
          result.message || "No se pudieron cargar las especialidades"
        );
      }
    };
    cargarEspecialidades();
  }, []);

  const esEdicion = !!doctor;

  const handleGuardar = async () => {
    if (!nombre || !apellido || !especialidad_id || !consultorio_id) {
      Alert.alert("Error", "Por favor completa todos los campos");
      return;
    }

    setLoading(true);

    try {
      let result;
      if (esEdicion) {
        result = await editarDoctor(doctor.id, {
          nombre: nombre, // Quité parseFloat
          apellido: apellido, // Quité parseFloat
          idEspecialidad: parseInt(especialidad_id),
          idConsultorio: parseInt(consultorio_id),
        });
      } else {
        result = await crearDoctor({
          nombre: nombre,
          apellido: apellido,
          idEspecialidad: parseInt(especialidad_id),
          idConsultorio: parseInt(consultorio_id),
        });
      }

      if (result?.success) {
        Alert.alert(
          "Éxito",
          `Doctor ${esEdicion ? "editado" : "creado"} correctamente`
        );
        navigation.goBack();
      } else {
        let errorMsg = "No se pudo guardar el doctor";

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
      Alert.alert(
        "Error",
        "Ocurrió un error al guardar el doctor. Por favor, inténtalo de nuevo más tarde."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {esEdicion ? "Editar Doctor" : "Nuevo Doctor"}
      </Text>
      <Picker
        selectedValue={especialidad_id}
        onValueChange={(itemValue) => setEspecialidadId(itemValue)}
        style={styles.input}
      >
        <Picker.Item label="Seleccione una especialidad" value="" />
        {especialidades.map((especialidad) => (
          <Picker.Item
            key={especialidad.id}
            label={`${especialidad.nombre}`}
            value={especialidad.id.toString()}
          />
        ))}
      </Picker>
      <Picker
        selectedValue={consultorio_id}
        onValueChange={(itemValue) => setConsultorioId(itemValue)}
        style={styles.input}
      >
        <Picker.Item label="Seleccione un consultorio" value="" />
        {consultorios.map((consultorio) => (
          <Picker.Item
            key={consultorio.id}
            label={`${consultorio.numero}`}
            value={consultorio.id.toString()}
          />
        ))}
      </Picker>
      <TextInput
        placeholder="Nombre"
        value={nombre}
        onChangeText={setNombre}
        style={styles.input}
      />
      <TextInput
        placeholder="Apellido"
        value={apellido}
        onChangeText={setApellido}
        style={styles.input}
      />

      <TouchableOpacity
        style={styles.saveButton}
        onPress={handleGuardar}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.saveButtonText}>
            {esEdicion ? "Guardar Cambios" : "Registrar Doctor"}
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#aaa",
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
  },
  saveButton: {
    backgroundColor: "#1976D2",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  saveButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});
