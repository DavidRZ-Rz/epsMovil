import React, {useState} from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  crearConsultorio,
  editarConsultorio,
} from "../../src/Services/ConsultorioService";// Funciones para interactuar con la API

// Componente para registrar o editar un consultorio
export default function EditarConsultorioScreen() {
  const navigation = useNavigation(); // Hook para navegar
  const route = useRoute(); // Hook para obtener parámetros de navegación
  const consultorio = route.params?.consultorio; // Consultorio recibido desde la pantalla anterior (si existe)

  // Estados para formulario
  const [numero, setNumero] = useState(consultorio?.numero || ""); // Número del consultorio
  const [piso, setPiso] = useState(consultorio?.piso || "");       // Piso del consultorio
  const [loading, setLoading] = useState(false);                   // Estado de carga (mientras se guarda)

  const esEdicion = !!consultorio; // Si hay un consultorio, estamos en modo edición

  // Función para guardar los datos (crear o editar)
  const handleGuardar = async () => {
    // Validación: ambos campos son requeridos
    if (!numero || !piso) {
      Alert.alert("Error", "Por favor completa todos los campos");
      return;
    }

    setLoading(true); // Activa estado de carga

    try {
      let result;

      // Si es edición, llama a editarConsultorio; si no, crea uno nuevo
      if (esEdicion) {
        result = await editarConsultorio(consultorio.id, {
          numero,
          piso,
        });
      } else {
        result = await crearConsultorio({
          numero,
          piso,
        });
      }

      // Verifica si la operación fue exitosa
      if (result.success) {
        Alert.alert(
          "Éxito",
          `${piso} se ha ${esEdicion ? "editado" : "registrado"} correctamente`
        );
        navigation.goBack(); // Vuelve a la pantalla anterior
      } else {
        Alert.alert(
          "Error",
          result.message || "No se pudo guardar el consultorio"
        );
      }
    } catch (error) {
      Alert.alert("Error", "Ocurrió un error al guardar el consultorio");
    } finally {
      setLoading(false); // Finaliza estado de carga
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Título: cambia según si es edición o registro */}
      <Text style={styles.title}>
        {esEdicion ? "Editar Consultorio" : "Nuevo Consultorio"}
      </Text>

      {/* Campo para ingresar el número del consultorio */}
      <View style={styles.formGroup}>
        <Text style={styles.label}>Numero del Consultorio</Text>
        <TextInput
          style={styles.input}
          value={numero}
          onChangeText={setNumero}
          placeholder="Numero del Consultorio"
        />
      </View>

      {/* Campo para ingresar el piso del consultorio */}
      <View style={styles.formGroup}>
        <Text style={styles.label}>Piso Consultorio</Text>
        <TextInput
          style={[styles.input, styles.multilineInput]}
          value={piso}
          onChangeText={setPiso}
          placeholder="Piso Consultorio"
        />
      </View>

      {/* Botón para guardar cambios o registrar */}
      <TouchableOpacity
        style={styles.saveButton}
        onPress={handleGuardar}
        disabled={loading}
      >
        {/* Muestra indicador de carga si está cargando */}
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.saveButtonText}>
            {esEdicion ? "Guardar Cambios" : "Registrar Consultorio"}
          </Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
}


const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#f5f5f5",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 30,
    textAlign: "center",
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#444",
    marginBottom: 8,
  },
  input: {
    backgroundColor: "white",
    height: 50,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  multilineInput: {
    height: 120,
    textAlignVertical: "top",
    paddingTop: 15,
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
