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
} from "../../src/Services/ConsultorioService";

export default function EditarConsultorioScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const consultorio = route.params?.consultorio;

  const [numero, setNumero] = useState(consultorio?.numero || "");
  const [piso, setPiso] = useState(consultorio?.piso || "");
  const [loading, setLoading] = useState(false);

  const esEdicion = !!consultorio;

  const handleGuardar = async () => {
    if ((!numero, !piso)) {
      Alert.alert("Error", "Por favor completa todos los campos");
      return;
    }

    setLoading(true);

    try {
      let result;
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

      if (result.success) {
        Alert.alert(
          "Éxito",
          `${piso}  se ha ${
            esEdicion ? "editado" : "registrado"
          } correctamente`
        );
        navigation.goBack();
      } else {
        Alert.alert(
          "Error",
          result.message || "No se pudo guardar el consultorio"
        );
      }
    } catch (error) {
      Alert.alert("Error", "Ocurrió un error al guardar el consultorio");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>
        {esEdicion ? "Editar Especilidad" : "Nueva Especialidad"}
      </Text>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Numero del Consultorio</Text>
        <TextInput
          style={styles.input}
          value={numero}
          onChangeText={setNumero}
          placeholder="Numero del Consultorio"
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Piso Consultorio</Text>
        <TextInput
          style={[styles.input, styles.multilineInput]}
          value={piso}
          onChangeText={setPiso}
          placeholder="Piso Consultorio"
        />
      </View>

      <TouchableOpacity
        style={styles.saveButton}
        onPress={handleGuardar}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.saveButtonText}>
            {esEdicion ? "Guardar Cambios" : "Registrar Especialidad"}
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
