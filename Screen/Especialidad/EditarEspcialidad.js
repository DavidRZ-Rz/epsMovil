import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function EditarEspecialidadScreen({ navigation, route }) {
  const { especialidad } = route.params || {};
  
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Editar Especialidad</Text>
      
      <View style={styles.formGroup}>
        <Text style={styles.label}>Nombre</Text>
        <TextInput 
          style={styles.input} 
          placeholder="Nombre de la especialidad" 
          defaultValue={especialidad?.nombre}
        />
      </View>
      
      <View style={styles.formGroup}>
        <Text style={styles.label}>Descripción</Text>
        <TextInput 
          style={[styles.input, styles.multilineInput]} 
          placeholder="Descripción" 
          multiline
          numberOfLines={4}
          defaultValue={especialidad?.descripcion}
        />
      </View>
      
      <View style={styles.formGroup}>
        <Text style={styles.label}>Duración</Text>
        <TextInput 
          style={styles.input} 
          placeholder="Duración (ej: 3 años)" 
          defaultValue={especialidad?.duracion}
        />
      </View>
      
      <TouchableOpacity
        style={styles.saveButton}
        onPress={() => alert("Especialidad guardada")}
      >
        <Text style={styles.saveButtonText}>Guardar Cambios</Text>
      </TouchableOpacity>
      
      <TouchableOpacity
        style={styles.cancelButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.cancelButtonText}>Cancelar</Text>
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
  cancelButton: {
    backgroundColor: "#f5f5f5",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 15,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  cancelButtonText: {
    color: "#666",
    fontSize: 18,
    fontWeight: "600",
  },
});