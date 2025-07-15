import { View, Text, TextInput, StyleSheet, Alert, ActivityIndicator, ScrollView, TouchableOpacity } from "react-native";
import BottonComponent from "../../Components/BotonComponent";
import React, { useState } from "react";
import { registerUser } from "../../src/Services/AuthService";
import { MaterialIcons } from "@expo/vector-icons";

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
  const [showPassword, setShowPassword] = useState(false);
/**
 * Valida todos los campos del formulario de registro.
 * Retorna true si todos los campos son válidos, false si hay errores
 */
const validateFields = () => {
  // Objeto para almacenar los mensajes de error
  const newErrors = {
    // Validación del nombre: verifica que no esté vacío
    name: !name ? "El nombre es requerido" : "",
    
    // Validación del email:
    // 1. Verifica que no esté vacío
    // 2. Verifica formato con expresión regular estándar para emails
    email: !email 
      ? "El email es requerido" 
      : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) 
        ? "Email inválido" 
        : "",
    
    // Validación de la contraseña:
    // 1. Verifica que no esté vacía
    // 2. Verifica longitud mínima de 8 caracteres
    password: !password 
      ? "La contraseña es requerida" 
      : password.length < 8 
        ? "Mínimo 8 caracteres" 
        : "",
    
    // Validación del rol: verifica que se haya seleccionado uno
    role: !role ? "El rol es requerido" : ""
  };
  
  // Actualiza el estado de errores con las validaciones encontradas
  setErrors(newErrors);
  
  // Retorna true si no hay errores (todos los strings de error están vacíos)
  return !Object.values(newErrors).some(error => error !== "");
};

/**
 * Maneja el proceso completo de registro de usuario:
 * 1. Valida los campos del formulario
 * 2. Envía los datos al servidor
 * 3. Maneja la respuesta (éxito/error)
 * 4. Navega a login en caso de éxito
 */
const handleRegister = async () => {
  // Valida los campos y detiene el proceso si hay errores
  if (!validateFields()) return;

  // Activa el estado de loading (muestra indicador de carga)
  setLoading(true);

  try {
    // Intenta registrar el usuario llamando al servicio registerUser
    const result = await registerUser(name, email, password, role);
    
    // Registro exitoso
    if (result.success) {
      Alert.alert(
        "Éxito", 
        "Registro de usuario exitoso", 
        [
          {
            text: "OK",
            // Navega a la pantalla de login al presionar OK
            onPress: () => navigation.navigate("login")
          },
        ]
      );
    } else {
      // Manejo de errores de validación del backend
      if (result.error?.errors) {
        // Transforma los errores del backend al formato del frontend
        const backendErrors = {};
        Object.keys(result.error.errors).forEach(key => {
          // Une múltiples mensajes de error para el mismo campo
          backendErrors[key] = result.error.errors[key].join(', '); 
        });
        // Combina errores existentes con los nuevos del backend
        setErrors(prev => ({...prev, ...backendErrors}));
      }
      
      // Muestra alerta con mensaje específico del backend o genérico
      Alert.alert(
        "Error de Registro",
        result.error?.message || "Ocurrió un error al registrar el usuario."
      );
    }
  } catch (error) {
    // Captura errores inesperados (red, servidor caído, etc.)
    console.error("Error inesperado al registrar usuario:", error);
    Alert.alert(
      "Error",
      "Ocurrió un error inesperado. Por favor, inténtalo de nuevo más tarde."
    );
  } finally {
    // Siempre desactiva el loading al finalizar
    setLoading(false);
  }
};
 
  return (
    
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Crear Cuenta</Text>
          <Text style={styles.subtitle}>Completa el formulario para registrarte</Text>
        </View>

        <View style={styles.formContainer}>
          {/* Nombre */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Nombre Completo</Text>
            <View style={[styles.inputWrapper, errors.name && styles.errorInputWrapper]}>
              <MaterialIcons name="person" size={20} color="#7f8c8d" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Ingresa tu nombre"
                value={name}
                onChangeText={(text) => {
                  setName(text);
                  setErrors(prev => ({...prev, name: ""}));
                }}
              />
            </View>
            {errors.name ? <Text style={styles.errorText}>{errors.name}</Text> : null}
          </View>

          {/* Email */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Correo Electrónico</Text>
            <View style={[styles.inputWrapper, errors.email && styles.errorInputWrapper]}>
              <MaterialIcons name="email" size={20} color="#7f8c8d" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="tucorreo@ejemplo.com"
                value={email}
                onChangeText={(text) => {
                  setEmail(text);
                  setErrors(prev => ({...prev, email: ""}));
                }}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
            {errors.email ? <Text style={styles.errorText}>{errors.email}</Text> : null}
          </View>

          {/* Contraseña */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Contraseña</Text>
            <View style={[styles.inputWrapper, errors.password && styles.errorInputWrapper]}>
              <MaterialIcons name="lock" size={20} color="#7f8c8d" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Mínimo 8 caracteres"
                value={password}
                onChangeText={(text) => {
                  setPassword(text);
                  setErrors(prev => ({...prev, password: ""}));
                }}
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity 
                style={styles.passwordToggle} 
                onPress={() => setShowPassword(!showPassword)}
              >
                <MaterialIcons 
                  name={showPassword ? "visibility" : "visibility-off"} 
                  size={20} 
                  color="#7f8c8d" 
                />
              </TouchableOpacity>
            </View>
            {errors.password ? <Text style={styles.errorText}>{errors.password}</Text> : null}
          </View>

          {/* Rol */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Rol</Text>
            <View style={[styles.inputWrapper, errors.role && styles.errorInputWrapper]}>
              <MaterialIcons name="assignment-ind" size={20} color="#7f8c8d" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Ejemplo: user, admin"
                value={role}
                onChangeText={(text) => {
                  setRole(text);
                  setErrors(prev => ({...prev, role: ""}));
                }}
              />
            </View>
            {errors.role ? <Text style={styles.errorText}>{errors.role}</Text> : null}
          </View>

          {/* Botón de Registro */}
          {loading ? (
            <ActivityIndicator size="large" color="#4A90E2" style={styles.loader} />
          ) : (
            <BottonComponent
              title={"Registrarse"}
              onPress={handleRegister}
              style={styles.primaryButton}
              textStyle={styles.buttonText}
            />
          )}

          {/* Enlace a Login */}
          <View style={styles.loginLinkContainer}>
            <Text style={styles.loginText}>¿Ya tienes una cuenta?</Text>
            <TouchableOpacity onPress={() => navigation.navigate("login")}>
              <Text style={styles.loginLink}>Inicia sesión aquí</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: '#F8F9FA',
  },
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    paddingVertical: 40,
    paddingHorizontal: 25,
    backgroundColor: '#4A90E2',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: 'white',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.9)',
  },
  formContainer: {
    paddingHorizontal: 25,
    paddingTop: 10,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2C3E50',
    marginBottom: 8,
    marginLeft: 5,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: '#ECF0F1',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },
  errorInputWrapper: {
    borderColor: '#E74C3C',
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 16,
    color: '#34495E',
  },
  passwordToggle: {
    padding: 10,
  },
  errorText: {
    color: '#E74C3C',
    fontSize: 12,
    marginTop: 5,
    marginLeft: 5,
  },
  primaryButton: {
    backgroundColor: '#4A90E2',
    borderRadius: 10,
    paddingVertical: 15,
    marginTop: 10,
    shadowColor: '#4A90E2',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  loader: {
    marginVertical: 30,
  },
  loginLinkContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  loginText: {
    color: '#7f8c8d',
    marginRight: 5,
  },
  loginLink: {
    color: '#4A90E2',
    fontWeight: '600',
  },
});