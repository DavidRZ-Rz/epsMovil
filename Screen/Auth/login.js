import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  ScrollView,
  Platform,
  KeyboardAvoidingView,
  TouchableOpacity,
  Image,
  Dimensions,
  ActivityIndicator
} from "react-native";
import BottonComponent from "../../Components/BotonComponent";
import { loginUser } from "../../src/Services/AuthService";
import { MaterialIcons } from "@expo/vector-icons";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({
    email: "",
    password: ""
  });

  /**
 * Valida los campos del formulario de login (email y contraseña)
 *  Retorna true si todos los campos son válidos, false si hay errores
 * retornar un booleano indicando si los campos son válidos o no
 */
const validateFields = () => {
  // Objeto para almacenar los mensajes de error
  const newErrors = {
    // Validación del email:
    // 1. Verifica que no esté vacío
    // 2. Verifica que tenga formato de email válido usando una expresión regular
    email: !email 
      ? "El email es requerido" 
      : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) 
        ? "Email inválido" 
        : "",
    
    // Validación de la contraseña:
    // Verifica que no esté vacía
    password: !password 
      ? "La contraseña es requerida" 
      : ""
  };
  
  // Actualiza el estado de errores con las validaciones encontradas
  setErrors(newErrors);
  
  // Retorna true si no hay errores (todos los strings de error están vacíos)
  return !Object.values(newErrors).some(error => error !== "");
};

/**
 * Maneja el proceso de login del usuario:
 * 1. Valida los campos
 * 2. Realiza la llamada a la API
 * 3. Maneja las respuestas (éxito/error)
 */
const handleLogin = async () => {
  // Valida los campos y sale si hay errores
  if (!validateFields()) return;
  
  // Activa el estado de loading (para mostrar spinner/indicador)
  setLoading(true);

  try {
    // Intenta hacer login llamando a la función loginUser (API call)
    const result = await loginUser(email, password);
    
    // Si el login fue exitoso
    if (result.success) {
      Alert.alert("Éxito", "Inicio de sesión exitoso");
    } else {
      // Muestra mensaje de error específico de la API o uno por defecto
      Alert.alert(
        "Error de Login",
        result.message || "Credenciales incorrectas. Por favor, inténtalo de nuevo."
      );
    }
  } catch (error) {
    // Captura errores inesperados (problemas de red, errores del servidor, etc.)
    console.error("Error inesperado al iniciar sesión:", error);
    Alert.alert(
      "Error",
      "Ocurrió un error inesperado. Por favor, inténtalo de nuevo más tarde."
    );
  } finally {
    // Siempre desactiva el loading al finalizar (tanto en éxito como en error)
    setLoading(false);
  }
};

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.keyboardAvoidingContainer}
      keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.container}>
          {/* Header con fondo azul */}
          <View style={styles.header}>
            <Image
              source={require("../../assets/logo.png")}
              style={styles.logo}
              resizeMode="contain"
            />
            <Text style={styles.title}>Bienvenido</Text>
            <Text style={styles.subtitle}>Inicia sesión con tus credenciales</Text>
          </View>

          {/* Formulario */}
          <View style={styles.formContainer}>
            {/* Campo Email */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Correo Electrónico</Text>
              <View style={[styles.inputWrapper, errors.email && styles.errorInput]}>
                <MaterialIcons name="email" size={20} color="#7f8c8d" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="tucorreo@ejemplo.com"
                  placeholderTextColor="#95a5a6"
                  value={email}
                  onChangeText={(text) => {
                    setEmail(text);
                    setErrors(prev => ({...prev, email: ""}));
                  }}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  editable={!loading}
                  autoCorrect={false}
                />
              </View>
              {errors.email ? <Text style={styles.errorText}>{errors.email}</Text> : null}
            </View>

            {/* Campo Contraseña */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Contraseña</Text>
              <View style={[styles.inputWrapper, errors.password && styles.errorInput]}>
                <MaterialIcons name="lock" size={20} color="#7f8c8d" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Ingresa tu contraseña"
                  placeholderTextColor="#95a5a6"
                  value={password}
                  onChangeText={(text) => {
                    setPassword(text);
                    setErrors(prev => ({...prev, password: ""}));
                  }}
                  secureTextEntry={!showPassword}
                  editable={!loading}
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

            {/* Olvidé mi contraseña */}
            <TouchableOpacity 
              style={styles.forgotPasswordButton}
              onPress={() => navigation.navigate("RecuperarContraseña")}
              disabled={loading}
            >
              <Text style={styles.forgotPasswordText}>¿Olvidaste tu contraseña?</Text>
            </TouchableOpacity>

            {/* Botón de Login */}
            {loading ? (
              <ActivityIndicator size="large" color="#4A90E2" style={styles.loader} />
            ) : (
              <BottonComponent
                title={"Ingresar"}
                onPress={handleLogin}
                style={styles.loginButton}
                textStyle={styles.buttonText}
              />
            )}
          </View>

          {/* Enlace a registro */}
          <View style={styles.footer}>
            <Text style={styles.registerText}>¿No tienes una cuenta?</Text>
            <TouchableOpacity 
              onPress={() => navigation.navigate("Registro")}
              disabled={loading}
            >
              <Text style={styles.registerLink}>Regístrate aquí</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  keyboardAvoidingContainer: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    alignItems: 'center',
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
  logo: {
    width: width * 0.25,
    height: width * 0.25,
    marginBottom: 15,
  },
  title: {
    fontSize: 24,
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
  errorInput: {
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
  forgotPasswordButton: {
    alignSelf: 'flex-end',
    marginBottom: 25,
  },
  forgotPasswordText: {
    color: '#4A90E2',
    fontSize: 14,
    fontWeight: '500',
  },
  loginButton: {
    backgroundColor: '#4A90E2',
    borderRadius: 10,
    paddingVertical: 15,
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
    marginVertical: 20,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 30,
  },
  registerText: {
    color: '#7f8c8d',
    marginRight: 5,
  },
  registerLink: {
    color: '#4A90E2',
    fontWeight: '600',
  },
});