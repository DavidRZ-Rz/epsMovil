import { View, Text, TextInput, StyleSheet, Alert, ActivityIndicator } from "react-native";
import BottonComponent from "../../Components/BotonComponent";
import React, { useState } from "react";
import { registerUser } from "../../src/Services/AuthService";

export default function RegistroScreen({ navigation }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    role: ""
  });

  const validateFields = () => {
    const newErrors = {
      name: !name ? "El nombre es requerido" : "",
      email: !email ? "El email es requerido" : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? "Email inválido" : "",
      password: !password ? "La contraseña es requerida" : password.length < 8 ? "Mínimo 8 caracteres" : "",
      role: !role ? "El rol es requerido" : ""
    };
    
    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error !== "");
  };

  const handleRegister = async () => {
    if (!validateFields()) return;

    setLoading(true);

    try {
      const result = await registerUser(name, email, password, role);
      
      if (result.success) {
        Alert.alert("Éxito", "Registro de usuario exitoso", [
          {
            text: "OK",
            onPress: () => navigation.navigate("login")
          },
        ]);
      } else {
        // Manejo de errores del backend
        if (result.error?.errors) {
          const backendErrors = {};
          Object.keys(result.error.errors).forEach(key => {
            backendErrors[key] = result.error.errors[key].join(', ');
          });
          setErrors(prev => ({...prev, ...backendErrors}));
        }
        
        Alert.alert(
          "Error de Registro",
          result.error?.message || "Ocurrió un error al registrar el usuario."
        );
      }
    } catch (error) {
      console.error("Error inesperado al registrar usuario:", error);
      Alert.alert(
        "Error",
        "Ocurrió un error inesperado. Por favor, inténtalo de nuevo más tarde."
      );
    } finally {
      setLoading(false);
    }
  };
 
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registrarse</Text>
      
      <TextInput
        style={[styles.input, errors.name && styles.errorInput]}
        placeholder="Nombre"
        value={name}
        onChangeText={(text) => {
          setName(text);
          setErrors(prev => ({...prev, name: ""}));
        }}
      />
      {errors.name ? <Text style={styles.errorText}>{errors.name}</Text> : null}
      
      <TextInput
        style={[styles.input, errors.email && styles.errorInput]}
        placeholder="Correo Electrónico"
        value={email}
        onChangeText={(text) => {
          setEmail(text);
          setErrors(prev => ({...prev, email: ""}));
        }}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      {errors.email ? <Text style={styles.errorText}>{errors.email}</Text> : null}
      
      <TextInput
        style={[styles.input, errors.password && styles.errorInput]}
        placeholder="Contraseña"
        value={password}
        onChangeText={(text) => {
          setPassword(text);
          setErrors(prev => ({...prev, password: ""}));
        }}
        secureTextEntry
      />
      {errors.password ? <Text style={styles.errorText}>{errors.password}</Text> : null}
      
      <TextInput
        style={[styles.input, errors.role && styles.errorInput]}
        placeholder="Rol (ej. user, admin)"
        value={role}
        onChangeText={(text) => {
          setRole(text);
          setErrors(prev => ({...prev, role: ""}));
        }}
      />
      {errors.role ? <Text style={styles.errorText}>{errors.role}</Text> : null}

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <BottonComponent
          title={"Registrar"}
          onPress={handleRegister}
        />
      )}
      
      <BottonComponent
        title="Ir a Login"
        onPress={() => navigation.navigate("login")}
        style={styles.secondaryButton}
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
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  input: {
    width: "100%",
    height: 50,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 10,
    backgroundColor: '#f9f9f9',
  },
  errorInput: {
    borderColor: 'red',
  },
  errorText: {
    width: '100%',
    color: 'red',
    marginBottom: 10,
    paddingLeft: 10,
    fontSize: 12,
  },
  secondaryButton: {
    marginTop: 15,
    backgroundColor: '#e0e0e0',
  },
});