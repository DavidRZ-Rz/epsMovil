import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function NuevaCita({ navigation }) {
  const [paciente, setPaciente] = useState("");
  const [fecha, setFecha] = useState("");
  const [hora, setHora] = useState("");

  const handleGuardar = () => {
    const nuevaCita = {
      id: Date.now(), // o usa un generador único si tienes backend
      paciente,
      fecha,
      hora,
    };
    console.log("Nueva cita creada:", nuevaCita);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nueva Cita</Text>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Paciente:</Text>
        <TextInput
          style={styles.input}
          value={paciente}
          onChangeText={setPaciente}
          placeholder="Nombre del paciente"
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Fecha:</Text>
        <TextInput
          style={styles.input}
          value={fecha}
          onChangeText={setFecha}
          placeholder="YYYY-MM-DD"
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Hora:</Text>
        <TextInput
          style={styles.input}
          value={hora}
          onChangeText={setHora}
          placeholder="HH:MM AM/PM"
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleGuardar}>
        <Ionicons name="save-outline" size={20} color="#fff" />
        <Text style={styles.buttonText}>Guardar Cita</Text>
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