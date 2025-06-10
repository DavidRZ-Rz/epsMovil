import { View, Text, TextInput, StyleSheet } from "react-native";
import BottonComponent from "../../Components/BotonComponent";
import React, { useState } from "react";

export default function RegistroScreen({ navigation }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState(""); // Asumiendo que el rol es un campo adicional
  const [confirmar, setConfirmar] = useState("");
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registrarse</Text>
      <TextInput
        style={styles.input}
        placeholder="Nombre"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Correo Electrónico"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="Confirmar Contraseña"
        value={confirmar}
        onChangeText={setConfirmar}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="Rol"
        value={role}
        onChangeText={setRole}
      />
      <BottonComponent
        title="Registrarse"
        onPress={() => {
          // Aquí puedes agregar la lógica para registrar al usuario
          console.log("Registrarse con:", name, email, password, role);
        }}
      />
      <BottonComponent
        title="Ir a Login"
        onPress={() => navigation.navigate("login")}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    width: "100%",
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
});
