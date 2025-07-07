import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Alert,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  crearPaciente,
  EditarPaciente,
} from "../../src/Services/ActividadService";

export default function EditarPacienteScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const paciente = route.params?.paciente;

  const [nombre, setNombre] = useState(paciente?.nombre || "");
  const [apellido, setApellido] = useState(paciente?.apellido || "");
  const [documento, setDocumento] = useState(paciente?.documento || "");
  const [email, setEmail] = useState(paciente?.email || "");
  const [telefono, setTelefono] = useState(paciente?.telefono || "");
  const [loading, setLoading] = useState(false);

  const esEdicion = !!paciente;

  const handleGuardar = async () => {
    if (!nombre || !apellido || !documento || !email || !telefono) {
      Alert.alert("Error", "Por favor completa todos los campos");
      return;
    }

    setLoading(true);

    try {
      let result;
      if (esEdicion) {
        result = await EditarPaciente(paciente.id, {
          nombre,
          apellido,
          documento,
          email,
          telefono,
        });
      } else {
        result = await crearPaciente({
          nombre,
          apellido,
          documento,
          email,
          telefono,
        });
      }

      if (result.success) {
        Alert.alert(
          "Éxito",
          `${nombre} ${apellido} se ha ${esEdicion ? "editado" : "registrado"} correctamente`
        );
        navigation.goBack();
      } else {
        Alert.alert("Error", result.message || "No se pudo guardar el paciente");
      }
    } catch (error) {
      Alert.alert("Error", "Ocurrió un error al guardar el paciente");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {esEdicion ? "Editar paciente" : "Nuevo paciente"}
      </Text>

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
      <TextInput
        placeholder="Documento"
        value={documento}
        onChangeText={setDocumento}
        keyboardType="numeric"
        style={styles.input}
      />
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        style={styles.input}
      />
      <TextInput
        placeholder="Teléfono"
        value={telefono}
        onChangeText={setTelefono}
        keyboardType="phone-pad"
        style={styles.input}
      />

      <TouchableOpacity
        style={styles.boton}
        onPress={handleGuardar}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.textBoton}>
            {esEdicion ? "Guardar Cambios" : "Registrar Paciente"}
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
  boton: {
    backgroundColor: "#1976D2",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  textBoton: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});