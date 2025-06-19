import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert, StyleSheet } from "react-native";

export default function EditarPacienteScreen() {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [cedula, setCedula] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const handleSubmit = () => {
    if (!nombre || !apellido || !cedula || !email || !telefono) {
      Alert.alert("Error", "Por favor completa todos los campos");
      return;
    }

    Alert.alert(
      "Paciente registrado",
      `${nombre} ${apellido} se han realizado los cambios exitosamente.`
    );

    setNombre("");
    setApellido("");
    setCedula("");
    setEmail("");
    setTelefono("");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Editar Paciente</Text>

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
        placeholder="Cédula"
        value={cedula}
        onChangeText={setCedula}
        keyboardType="numeric"
        style={styles.input}
      />
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="string"
        style={styles.input}
      />
      <TextInput
        placeholder="Teléfono"
        value={telefono}
        onChangeText={setTelefono}
        keyboardType="phone-pad"
        style={styles.input}
      />

      <Button title="Guardar Cambios" onPress={handleSubmit} />
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
});