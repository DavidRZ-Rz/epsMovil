import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, Alert } from "react-native";
import BottonComponent from "../../Components/BotonComponent";
import { loginUser } from "../../src/Services/AuthService"; // Asegúrate de que la ruta sea correcta

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);

    try {
      const result = await loginUser(email, password);
      if (result.success) {
        Alert.alert("Éxito", "Inicio de sesión exitoso", [
          {
            text: "OK",
            onPress: () => {
              console.log("Login exitoso, redirigiendo automaticamente...");
            },
          },
        ]);
      } else {
        Alert.alert(
          "Error de Login",
          result.message || "Ocurrio un error al iniciar sesión."
        );
      }
    } catch (error) {
      console.error("Error inesperado al iniciar sesión:", error);
      Alert.alert(
        "Error",
        "Ocurrió un error inesperado. Por favor, inténtalo de nuevo más tarde."
      );
    } finally {
      setLoading(false); // siempre desctiva el indicador de carga
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Iniciar Sesión</Text>
      <TextInput
        style={styles.input}
        placeholder="Correo Electrónico"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        editable={!loading}
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        editable={!loading}
      />
      <BottonComponent
        title={"Ingresar"}
        onPress={handleLogin}
        disabled={loading}
      />
      <BottonComponent
        title={"Registrarse"}
        onPress={() => navigation.navigate("Registro")}
        style={styles.registerButton}
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
  registerButton: {
    backgroundColor: "#28a745",
  },
});
