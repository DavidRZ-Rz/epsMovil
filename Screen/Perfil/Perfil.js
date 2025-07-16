import { View, Text, StyleSheet, ActivityIndicator, Alert, Image, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import BottonComponent from "../../Components/BotonComponent";
import api from "../../src/Services/conexion";
import { logoutUser } from "../../src/Services/AuthService";
import { MaterialIcons } from "@expo/vector-icons";
import ediitarPerfil from "./Editarperfil";

// Componente de pantalla de perfil de usuario
export default function PerfilScreen({ navigation }) {
  // Estado para almacenar los datos del usuario
  const [usuario, setUsuario] = useState(null);
  // Estado para controlar el estado de carga
  const [loading, setLoading] = useState(true);

  // Efecto para cargar el perfil cuando el componente se monta
  useEffect(() => {
    // Función asíncrona para cargar el perfil del usuario
    const cargarPefil = async () => {
      try {
        // Obtener el token de autenticación del almacenamiento local
        const token = await AsyncStorage.getItem("userToken");
        if (!token) {
          console.log("No se encontró el token de usuario");
          return;
        }

        console.log("Intentando cargar perfil con token:", token);
        // Hacer la petición al API para obtener los datos del usuario
        const response = await api.get("/me");
        console.log("Perfil cargado exitosamente:", response.data);
        // Actualizar el estado con los datos del usuario
        setUsuario(response.data);
      } catch (error) {
        console.log("Error al cargar el perfil:", error);

        // Manejo de errores específicos de autenticación
        if (error.isAuthError || error.shouldRedirectToLogin) {
          console.log("Error de autenticación, redirigiendo a login...");
          return;
        }
        
        // Manejo de errores de respuesta del servidor
        if (error.response) {
          console.log(
            "Error response: ",
            error.response.status,
            error.response.data
          );
          Alert.alert(
            "Error al servidor",
            `Error ${error.response.status}: ${
              error.response.data?.message ||
              "Ocurrió un error al cargar el perfil."
            }`,
            [
              {
                text: "OK",
                onPress: async () => {
                  // Eliminar el token en caso de error
                  await AsyncStorage.removeItem("userToken");
                },
              },
            ]
          );
        } else if (error.request) {
          // Manejo de errores de conexión
          Alert.alert(
            "Error de conexión",
            "No se pudo conectar al servidor. Por favor, verifica tu conexión a internet.",
            [
              {
                text: "OK",
                onPress: async () => {
                  await AsyncStorage.removeItem("userToken");
                },
              },
            ]
          );
        } else {
          // Manejo de otros errores inesperados
          Alert.alert(
            "Error",
            "Ocurrió un error inesperado al cargar el perfil.",
            [
              {
                text: "OK",
                onPress: async () => {
                  await AsyncStorage.removeItem("userToken");
                },
              },
            ]
          );
        }
      } finally {
        // Independientemente del resultado, indicar que la carga ha terminado
        setLoading(false);
      }
    };
    // Agrega este listener para recargar cuando vuelva de editar
  const unsubscribe = navigation.addListener('focus', () => {
    cargarPefil();
  });

  return unsubscribe; // Limpiar el listener al desmontar
}, [navigation]); // Añade navigation como dependencia

  // Función para manejar la edición de perfil (actualmente en desarrollo)
  const handleEditProfile = () => {
     navigation.navigate("EditarPerfil", {usuario});
  };

  // Mostrar indicador de carga mientras se obtienen los datos
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4A90E2" />
      </View>
    );
  }

  // Mostrar mensaje de error si no se pudo cargar el perfil
  if (!usuario) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Perfil de Usuario</Text>
        <View style={styles.profileContainer}>
          <Text style={styles.errorText}>
            No se pudo cargar el perfil del usuario.
          </Text>
        </View>
      </View>
    );
  }

  // Renderizar la interfaz del perfil
  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        {/* Encabezado del perfil con avatar y nombre */}
        <View style={styles.header}>
          <View style={styles.avatarContainer}>
            <Image
              source={require("../../assets/logo.png")}
              style={styles.avatar}
            />
            
          </View>
          <Text style={styles.userName}>{usuario.user.name || "Usuario"}</Text>
          <Text style={styles.userRole}>{usuario.user.role || "Rol no definido"}</Text>
        </View>

        {/* Contenedor principal de la información del perfil */}
        <View style={styles.profileContainer}>
          {/* Sección de información personal */}
          <View style={styles.infoSection}>
            <Text style={styles.sectionTitle}>Información Personal</Text>
            
            {/* Item de información - Nombre */}
            <View style={styles.infoItem}>
              <MaterialIcons name="person" size={20} color="#4A90E2" />
              <Text style={styles.infoText}>{usuario.user.name || "No disponible"}</Text>
            </View>
            
            {/* Item de información - Email */}
            <View style={styles.infoItem}>
              <MaterialIcons name="email" size={20} color="#4A90E2" />
              <Text style={styles.infoText}>{usuario.user.email || "No disponible"}</Text>
            </View>
            
            {/* Item de información - Rol */}
            <View style={styles.infoItem}>
              <MaterialIcons name="work" size={20} color="#4A90E2" />
              <Text style={styles.infoText}>{usuario.user.role || "No disponible"}</Text>
            </View>
          </View>

          {/* Grupo de botones de acciones */}
          <View style={styles.buttonGroup}>
            {/* Botón para editar perfil */}
            <BottonComponent 
              title="Editar Perfil" 
              onPress={handleEditProfile} 
              style={styles.editButton}
              textStyle={styles.buttonText}
            />
            {/* Botón para cerrar sesión */}
            <BottonComponent
              title="Cerrar Sesión"
              onPress={async () => {
                await logoutUser();
              }}
              style={styles.logoutButton}
              textStyle={styles.buttonText}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F8F9FA",
  },
  header: {
    alignItems: "center",
    paddingVertical: 30,
    backgroundColor: "#4A90E2",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  avatarContainer: {
    position: "relative",
    marginBottom: 15,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: "white",
  },
  avatarOverlay: {
    position: "absolute",
    right: 0,
    bottom: 0,
    backgroundColor: "#4A90E2",
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "white",
  },
  userName: {
    fontSize: 24,
    fontWeight: "600",
    color: "white",
    marginBottom: 5,
  },
  userRole: {
    fontSize: 16,
    color: "rgba(255,255,255,0.8)",
    fontWeight: "500",
  },
  profileContainer: {
    paddingHorizontal: 25,
    marginBottom: 30,
  },
  infoSection: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 20,
    marginBottom: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#2C3E50",
    marginBottom: 15,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ECF0F1",
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  infoText: {
    fontSize: 16,
    color: "#34495E",
    marginLeft: 10,
  },
  buttonGroup: {
    marginTop: 10,
  },
  editButton: {
    backgroundColor: "#4A90E2",
    borderRadius: 8,
    paddingVertical: 14,
    marginBottom: 15,
  },
  logoutButton: {
    backgroundColor: "#E74C3C",
    borderRadius: 8,
    paddingVertical: 14,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  errorText: {
    fontSize: 16,
    color: "#E74C3C",
    textAlign: "center",
    marginVertical: 20,
  },
});